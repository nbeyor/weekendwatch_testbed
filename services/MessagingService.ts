import type { Contact, Message, MessageThread } from '@/models/types';
import { SEED_CONTACTS, SEED_MESSAGES, SEED_THREADS } from '@/models/seedData';

export interface MessagingService {
  getContacts(): Promise<Contact[]>;
  getThreads(): Promise<MessageThread[]>;
  getThread(threadId: string): Promise<MessageThread | null>;
  getMessagesForThread(threadId: string): Promise<Message[]>;
  sendMessage(threadId: string, text: string): Promise<Message>;
  createThread(contactId: string): Promise<MessageThread>;
  searchContacts(query: string): Promise<Contact[]>;
}

export class MockMessagingService implements MessagingService {
  private contacts: Contact[] = [...SEED_CONTACTS];
  private threads: MessageThread[] = [...SEED_THREADS];
  private messages: Message[] = [...SEED_MESSAGES];

  async getContacts(): Promise<Contact[]> {
    // Simulate network delay
    await this.delay(100);
    return [...this.contacts].sort((a, b) =>
      b.lastInteractionAt.getTime() - a.lastInteractionAt.getTime()
    );
  }

  async getThreads(): Promise<MessageThread[]> {
    await this.delay(100);

    // Enrich threads with last message
    const enrichedThreads = this.threads.map(thread => {
      const threadMessages = this.messages
        .filter(m => m.threadId === thread.id)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return {
        ...thread,
        lastMessage: threadMessages[0],
      };
    });

    return enrichedThreads.sort((a, b) =>
      b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
    );
  }

  async getThread(threadId: string): Promise<MessageThread | null> {
    await this.delay(50);
    const thread = this.threads.find(t => t.id === threadId);
    return thread || null;
  }

  async getMessagesForThread(threadId: string): Promise<Message[]> {
    await this.delay(100);
    return this.messages
      .filter(m => m.threadId === threadId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async sendMessage(threadId: string, text: string): Promise<Message> {
    await this.delay(200);

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      threadId,
      sender: 'me',
      text,
      createdAt: new Date(),
      status: 'sent',
    };

    this.messages.push(newMessage);

    // Update thread last message time
    const thread = this.threads.find(t => t.id === threadId);
    if (thread) {
      thread.lastMessageAt = newMessage.createdAt;
    }

    // Update contact last interaction
    if (thread) {
      const contactId = thread.participantIds.find(id => id !== 'me');
      if (contactId) {
        const contact = this.contacts.find(c => c.id === contactId);
        if (contact) {
          contact.lastInteractionAt = newMessage.createdAt;
        }
      }
    }

    return newMessage;
  }

  async createThread(contactId: string): Promise<MessageThread> {
    await this.delay(100);

    // Check if thread already exists
    const existingThread = this.threads.find(t =>
      t.participantIds.includes(contactId) && t.participantIds.includes('me')
    );

    if (existingThread) {
      return existingThread;
    }

    const newThread: MessageThread = {
      id: `thread-${Date.now()}`,
      participantIds: ['me', contactId],
      lastMessageAt: new Date(),
    };

    this.threads.push(newThread);
    return newThread;
  }

  async searchContacts(query: string): Promise<Contact[]> {
    await this.delay(150);

    const lowerQuery = query.toLowerCase();
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerQuery) ||
      contact.phone.includes(query)
    );
  }

  // Helper to add message to queue when offline
  queueMessage(threadId: string, text: string): Message {
    const queuedMessage: Message = {
      id: `msg-queued-${Date.now()}`,
      threadId,
      sender: 'me',
      text,
      createdAt: new Date(),
      status: 'queued',
    };

    this.messages.push(queuedMessage);
    return queuedMessage;
  }

  // Update message status (for offline sync)
  updateMessageStatus(messageId: string, status: Message['status']): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.status = status;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const messagingService = new MockMessagingService();
