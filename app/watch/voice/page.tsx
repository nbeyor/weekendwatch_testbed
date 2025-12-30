'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { VoiceInput } from '@/components/watch/VoiceInput';
import { useAppStore } from '@/stores/useAppStore';
import { messagingService } from '@/services/MessagingService';
import { callingService } from '@/services/CallingService';
import { navService } from '@/services/NavService';
import { mediaService } from '@/services/MediaService';
import type { ParsedCommand } from '@/models/types';
import { ChevronRight } from 'lucide-react';

export default function VoiceCommandsPage() {
  const router = useRouter();
  const addToast = useAppStore((state) => state.addToast);
  const [lastCommand, setLastCommand] = useState<ParsedCommand | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleCommand = async (command: ParsedCommand) => {
    setLastCommand(command);

    if (command.intent === 'UNKNOWN') {
      addToast('Command not understood', 'error');
      return;
    }

    setProcessing(true);

    try {
      switch (command.intent) {
        case 'SEND_MESSAGE':
          await handleSendMessage(command);
          break;

        case 'CALL':
          await handleCall(command);
          break;

        case 'NAVIGATE':
          await handleNavigate(command);
          break;

        case 'MEDIA_PLAY':
          await handleMediaPlay(command);
          break;

        case 'MEDIA_PAUSE':
          await mediaService.pause();
          addToast('Paused', 'success');
          break;

        case 'MEDIA_SKIP':
          await mediaService.skip();
          addToast('Skipped', 'success');
          break;

        default:
          addToast('Command not implemented', 'info');
      }
    } catch (error) {
      console.error('Command execution failed:', error);
      addToast('Command failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleSendMessage = async (command: ParsedCommand) => {
    if (!command.params.contactId) {
      addToast('Contact not found', 'error');
      return;
    }

    if (!command.params.text) {
      // Navigate to message thread for manual input
      const thread = await messagingService.createThread(
        command.params.contactId
      );
      router.push(`/watch/messages/${thread.id}`);
      return;
    }

    const thread = await messagingService.createThread(command.params.contactId);
    await messagingService.sendMessage(thread.id, command.params.text);
    addToast(`Message sent to ${command.params.contactName}`, 'success');
  };

  const handleCall = async (command: ParsedCommand) => {
    if (!command.params.contactId) {
      addToast('Contact not found', 'error');
      return;
    }

    await callingService.initiateCall(command.params.contactId);
    addToast(`Calling ${command.params.contactName}...`, 'success');
    router.push('/watch/calls');
  };

  const handleNavigate = async (command: ParsedCommand) => {
    if (!command.params.destination) {
      router.push('/watch/nav');
      return;
    }

    // Search for destination
    const results = await navService.searchDestination(
      command.params.destination
    );

    if (results.length > 0) {
      const route = await navService.createRoute(results[0].id);
      addToast(`Navigating to ${route.destinationLabel}`, 'success');
      router.push('/watch/nav');
    } else {
      addToast('Destination not found', 'error');
    }
  };

  const handleMediaPlay = async (command: ParsedCommand) => {
    await mediaService.play(command.params.query);
    addToast('Playing', 'success');
    router.push('/watch/media');
  };

  const exampleCommands = [
    'Text Sarah I\'m running late',
    'Call Mike',
    'Navigate to home',
    'Play some music',
    'Pause',
    'Skip to next song',
  ];

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Voice Commands" showBack backHref="/watch/comm" />

      <main className="flex-1 overflow-auto p-3 space-y-4">
        {/* Voice input */}
        <VoiceInput onCommand={handleCommand} />

        {/* Last command result */}
        {lastCommand && (
          <div className="border border-black p-3">
            <div className="text-xs font-medium mb-1">Last Command:</div>
            <div className="text-sm mb-2">"{lastCommand.rawText}"</div>
            <div className="text-xs text-gray-dark">
              Intent: {lastCommand.intent} ({Math.round(lastCommand.confidence * 100)}% confident)
            </div>
            {lastCommand.suggestions && lastCommand.suggestions.length > 0 && (
              <div className="mt-2 border-t border-black pt-2">
                <div className="text-xs font-medium mb-1">Suggestions:</div>
                {lastCommand.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="text-xs text-gray-dark">
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Example commands */}
        <div>
          <h3 className="font-bold text-sm mb-2">Example Commands:</h3>
          <div className="space-y-2">
            {exampleCommands.map((cmd, idx) => (
              <div
                key={idx}
                className="border border-black p-2 flex items-center justify-between text-sm"
              >
                <span>{cmd}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        {processing && (
          <div className="text-center text-sm text-gray-dark">
            Processing command...
          </div>
        )}
      </main>
    </div>
  );
}
