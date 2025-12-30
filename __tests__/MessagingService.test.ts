import { MockMessagingService } from '@/services/MessagingService';

describe('MessagingService', () => {
  let service: MockMessagingService;

  beforeEach(() => {
    service = new MockMessagingService();
  });

  describe('getContacts', () => {
    it('should return all contacts sorted by last interaction', async () => {
      const contacts = await service.getContacts();

      expect(contacts).toBeDefined();
      expect(contacts.length).toBeGreaterThan(0);

      // Check that contacts are sorted by lastInteractionAt (descending)
      for (let i = 0; i < contacts.length - 1; i++) {
        expect(contacts[i].lastInteractionAt.getTime()).toBeGreaterThanOrEqual(
          contacts[i + 1].lastInteractionAt.getTime()
        );
      }
    });
  });

  describe('getThreads', () => {
    it('should return all threads with last message enriched', async () => {
      const threads = await service.getThreads();

      expect(threads).toBeDefined();
      expect(threads.length).toBeGreaterThan(0);

      // Check that threads are sorted by lastMessageAt (descending)
      for (let i = 0; i < threads.length - 1; i++) {
        expect(threads[i].lastMessageAt.getTime()).toBeGreaterThanOrEqual(
          threads[i + 1].lastMessageAt.getTime()
        );
      }

      // Check that lastMessage is present
      threads.forEach((thread) => {
        if (thread.lastMessage) {
          expect(thread.lastMessage.threadId).toBe(thread.id);
        }
      });
    });
  });

  describe('getMessagesForThread', () => {
    it('should return messages for a specific thread sorted by time', async () => {
      const threads = await service.getThreads();
      const threadId = threads[0].id;

      const messages = await service.getMessagesForThread(threadId);

      expect(messages).toBeDefined();
      expect(messages.length).toBeGreaterThan(0);

      // All messages should belong to the thread
      messages.forEach((msg) => {
        expect(msg.threadId).toBe(threadId);
      });

      // Messages should be sorted by createdAt (ascending)
      for (let i = 0; i < messages.length - 1; i++) {
        expect(messages[i].createdAt.getTime()).toBeLessThanOrEqual(
          messages[i + 1].createdAt.getTime()
        );
      }
    });
  });

  describe('sendMessage', () => {
    it('should send a message and add it to the thread', async () => {
      const threads = await service.getThreads();
      const threadId = threads[0].id;
      const messageText = 'Test message';

      const sentMessage = await service.sendMessage(threadId, messageText);

      expect(sentMessage).toBeDefined();
      expect(sentMessage.threadId).toBe(threadId);
      expect(sentMessage.text).toBe(messageText);
      expect(sentMessage.sender).toBe('me');
      expect(sentMessage.status).toBe('sent');
      expect(sentMessage.createdAt).toBeInstanceOf(Date);

      // Verify message was added to thread
      const messages = await service.getMessagesForThread(threadId);
      const found = messages.find((m) => m.id === sentMessage.id);
      expect(found).toBeDefined();
    });
  });

  describe('createThread', () => {
    it('should create a new thread with a contact', async () => {
      const contacts = await service.getContacts();
      const contactId = contacts[0].id;

      const thread = await service.createThread(contactId);

      expect(thread).toBeDefined();
      expect(thread.participantIds).toContain('me');
      expect(thread.participantIds).toContain(contactId);
    });

    it('should return existing thread if one already exists', async () => {
      const threads = await service.getThreads();
      const existingThread = threads[0];
      const contactId = existingThread.participantIds.find((id) => id !== 'me')!;

      const thread = await service.createThread(contactId);

      expect(thread.id).toBe(existingThread.id);
    });
  });

  describe('searchContacts', () => {
    it('should find contacts by name', async () => {
      const results = await service.searchContacts('Sarah');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toContain('Sarah');
    });

    it('should find contacts by phone number', async () => {
      const results = await service.searchContacts('555-0101');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].phone).toContain('555-0101');
    });

    it('should return empty array for no matches', async () => {
      const results = await service.searchContacts('NonexistentContact');

      expect(results.length).toBe(0);
    });
  });

  describe('queueMessage', () => {
    it('should queue a message with queued status', () => {
      const threadId = 'thread-1';
      const text = 'Queued message';

      const queuedMessage = service.queueMessage(threadId, text);

      expect(queuedMessage.status).toBe('queued');
      expect(queuedMessage.text).toBe(text);
      expect(queuedMessage.threadId).toBe(threadId);
    });
  });

  describe('updateMessageStatus', () => {
    it('should update message status', async () => {
      const threads = await service.getThreads();
      const messages = await service.getMessagesForThread(threads[0].id);
      const message = messages[0];

      service.updateMessageStatus(message.id, 'failed');

      const updatedMessages = await service.getMessagesForThread(threads[0].id);
      const updatedMessage = updatedMessages.find((m) => m.id === message.id);

      expect(updatedMessage?.status).toBe('failed');
    });
  });
});
