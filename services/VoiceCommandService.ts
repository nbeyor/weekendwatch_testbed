import type { ParsedCommand, CommandIntent } from '@/models/types';
import { messagingService } from './MessagingService';

export interface VoiceCommandService {
  parseCommand(text: string): Promise<ParsedCommand>;
  getSpeechRecognition(): any;
}

export class MockVoiceCommandService implements VoiceCommandService {
  async parseCommand(text: string): Promise<ParsedCommand> {
    await this.delay(100);

    const lowerText = text.toLowerCase().trim();

    // Message/Text patterns
    if (this.containsAny(lowerText, ['text', 'message', 'sms', 'send'])) {
      return this.parseMessageCommand(text, lowerText);
    }

    // Call patterns
    if (this.containsAny(lowerText, ['call', 'phone', 'dial'])) {
      return this.parseCallCommand(text, lowerText);
    }

    // Navigation patterns
    if (this.containsAny(lowerText, ['navigate', 'directions', 'go to', 'take me'])) {
      return this.parseNavigationCommand(text, lowerText);
    }

    // Media patterns
    if (this.containsAny(lowerText, ['play', 'music', 'spotify', 'song'])) {
      return this.parseMediaPlayCommand(text, lowerText);
    }

    if (this.containsAny(lowerText, ['pause', 'stop'])) {
      return {
        intent: 'MEDIA_PAUSE',
        confidence: 0.9,
        params: {},
        rawText: text,
      };
    }

    if (this.containsAny(lowerText, ['skip', 'next'])) {
      return {
        intent: 'MEDIA_SKIP',
        confidence: 0.9,
        params: {},
        rawText: text,
      };
    }

    if (this.containsAny(lowerText, ['volume'])) {
      return this.parseVolumeCommand(text, lowerText);
    }

    // Unknown command
    return {
      intent: 'UNKNOWN',
      confidence: 0.0,
      params: {},
      rawText: text,
      suggestions: [
        'Try: "Text Sarah I\'m running late"',
        'Try: "Call Mike"',
        'Try: "Navigate to home"',
        'Try: "Play some music"',
      ],
    };
  }

  getSpeechRecognition(): any {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return null;

    return new SpeechRecognition();
  }

  private async parseMessageCommand(
    text: string,
    lowerText: string
  ): Promise<ParsedCommand> {
    // Patterns:
    // "text/message <contact> <message>"
    // "send <contact> a text/message <message>"

    const contacts = await messagingService.getContacts();

    // Try to extract contact name
    let contactName: string | undefined;
    let messageText: string | undefined;
    let contactId: string | undefined;

    // Find contact mention
    for (const contact of contacts) {
      const nameLower = contact.name.toLowerCase();
      if (lowerText.includes(nameLower)) {
        contactName = contact.name;
        contactId = contact.id;

        // Extract message after contact name
        const afterContact = text.substring(
          lowerText.indexOf(nameLower) + nameLower.length
        ).trim();

        // Remove common connectors
        messageText = afterContact
          .replace(/^(that|to say|saying|:)/i, '')
          .trim();

        break;
      }
    }

    if (!contactName) {
      return {
        intent: 'SEND_MESSAGE',
        confidence: 0.4,
        params: {},
        rawText: text,
        suggestions: contacts.slice(0, 3).map(c => `Text ${c.name}`),
      };
    }

    return {
      intent: 'SEND_MESSAGE',
      confidence: messageText ? 0.9 : 0.6,
      params: {
        contactName,
        contactId,
        text: messageText,
      },
      rawText: text,
    };
  }

  private async parseCallCommand(
    text: string,
    lowerText: string
  ): Promise<ParsedCommand> {
    // Patterns: "call <contact>"

    const contacts = await messagingService.getContacts();

    // Find contact mention
    for (const contact of contacts) {
      const nameLower = contact.name.toLowerCase();
      if (lowerText.includes(nameLower)) {
        return {
          intent: 'CALL',
          confidence: 0.95,
          params: {
            contactName: contact.name,
            contactId: contact.id,
          },
          rawText: text,
        };
      }
    }

    // Check for phone number
    const phoneMatch = text.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) {
      return {
        intent: 'CALL',
        confidence: 0.8,
        params: {
          phone: phoneMatch[0],
        },
        rawText: text,
      };
    }

    return {
      intent: 'CALL',
      confidence: 0.3,
      params: {},
      rawText: text,
      suggestions: contacts.slice(0, 3).map(c => `Call ${c.name}`),
    };
  }

  private parseNavigationCommand(
    text: string,
    lowerText: string
  ): Promise<ParsedCommand> {
    // Extract destination after navigation keywords
    let destination = text;

    const navKeywords = [
      'navigate to',
      'directions to',
      'go to',
      'take me to',
      'drive to',
    ];

    for (const keyword of navKeywords) {
      const idx = lowerText.indexOf(keyword);
      if (idx !== -1) {
        destination = text.substring(idx + keyword.length).trim();
        break;
      }
    }

    return Promise.resolve({
      intent: 'NAVIGATE',
      confidence: destination.length > 2 ? 0.85 : 0.4,
      params: {
        destination,
      },
      rawText: text,
    });
  }

  private parseMediaPlayCommand(
    text: string,
    lowerText: string
  ): Promise<ParsedCommand> {
    // Extract query after play keywords
    let query = '';

    const playKeywords = ['play', 'play music', 'spotify'];

    for (const keyword of playKeywords) {
      const idx = lowerText.indexOf(keyword);
      if (idx !== -1) {
        query = text.substring(idx + keyword.length).trim();
        break;
      }
    }

    return Promise.resolve({
      intent: 'MEDIA_PLAY',
      confidence: 0.85,
      params: {
        query: query || undefined,
      },
      rawText: text,
    });
  }

  private parseVolumeCommand(text: string, lowerText: string): Promise<ParsedCommand> {
    // Extract volume level
    const numberMatch = lowerText.match(/(\d+)/);
    const volumeLevel = numberMatch ? parseInt(numberMatch[0]) : undefined;

    // Check for up/down
    const direction = lowerText.includes('up')
      ? 'up'
      : lowerText.includes('down')
      ? 'down'
      : undefined;

    return Promise.resolve({
      intent: 'MEDIA_VOLUME',
      confidence: volumeLevel !== undefined || direction !== undefined ? 0.8 : 0.5,
      params: {
        volumeLevel,
      },
      rawText: text,
    });
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(kw => text.includes(kw));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const voiceCommandService = new MockVoiceCommandService();
