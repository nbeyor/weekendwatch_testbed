import { addToQueue, getQueuedActions, updateQueuedAction, removeQueuedAction, clearQueue } from '@/lib/db';

describe('Offline Queue', () => {
  beforeEach(async () => {
    // Clear queue before each test
    await clearQueue();
  });

  describe('addToQueue', () => {
    it('should add an action to the queue', async () => {
      const action = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-1', text: 'Test message' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      const queued = await addToQueue(action);

      expect(queued).toBeDefined();
      expect(queued.id).toBeDefined();
      expect(queued.type).toBe('send_message');
      expect(queued.status).toBe('pending');
    });
  });

  describe('getQueuedActions', () => {
    it('should retrieve all queued actions', async () => {
      const action1 = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-1', text: 'Test 1' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      const action2 = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-2', text: 'Test 2' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      await addToQueue(action1);
      await addToQueue(action2);

      const actions = await getQueuedActions();

      expect(actions.length).toBe(2);
    });

    it('should filter actions by status', async () => {
      const pending = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-1', text: 'Pending' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      const processing = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-2', text: 'Processing' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'processing' as const,
      };

      const queued1 = await addToQueue(pending);
      await addToQueue(processing);

      const pendingActions = await getQueuedActions('pending');

      expect(pendingActions.length).toBe(1);
      expect(pendingActions[0].status).toBe('pending');
    });
  });

  describe('updateQueuedAction', () => {
    it('should update an action status', async () => {
      const action = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-1', text: 'Test' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      const queued = await addToQueue(action);

      await updateQueuedAction(queued.id, { status: 'processing' });

      const actions = await getQueuedActions();
      const updated = actions.find((a) => a.id === queued.id);

      expect(updated?.status).toBe('processing');
    });

    it('should increment retry count', async () => {
      const action = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-1', text: 'Test' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      const queued = await addToQueue(action);

      await updateQueuedAction(queued.id, { retryCount: 1 });

      const actions = await getQueuedActions();
      const updated = actions.find((a) => a.id === queued.id);

      expect(updated?.retryCount).toBe(1);
    });
  });

  describe('removeQueuedAction', () => {
    it('should remove an action from the queue', async () => {
      const action = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-1', text: 'Test' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      const queued = await addToQueue(action);

      await removeQueuedAction(queued.id);

      const actions = await getQueuedActions();
      const found = actions.find((a) => a.id === queued.id);

      expect(found).toBeUndefined();
    });
  });

  describe('clearQueue', () => {
    it('should clear all queued actions', async () => {
      const action1 = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-1', text: 'Test 1' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      const action2 = {
        type: 'send_message' as const,
        payload: { threadId: 'thread-2', text: 'Test 2' },
        createdAt: new Date(),
        retryCount: 0,
        status: 'pending' as const,
      };

      await addToQueue(action1);
      await addToQueue(action2);

      await clearQueue();

      const actions = await getQueuedActions();

      expect(actions.length).toBe(0);
    });
  });
});
