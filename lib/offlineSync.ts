import {
  getQueuedActions,
  updateQueuedAction,
  removeQueuedAction,
} from './db';
import type { QueuedAction } from '@/models/types';
import { messagingService } from '@/services/MessagingService';
import { callingService } from '@/services/CallingService';

export class OfflineSyncManager {
  private isSyncing = false;
  private syncInterval: NodeJS.Timeout | null = null;

  async startAutoSync(intervalMs: number = 30000): Promise<void> {
    if (this.syncInterval) {
      return; // Already running
    }

    this.syncInterval = setInterval(async () => {
      await this.syncQueue();
    }, intervalMs);

    // Initial sync
    await this.syncQueue();
  }

  stopAutoSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  async syncQueue(): Promise<{ success: number; failed: number }> {
    if (this.isSyncing) {
      return { success: 0, failed: 0 };
    }

    this.isSyncing = true;

    try {
      const pendingActions = await getQueuedActions('pending');

      let successCount = 0;
      let failedCount = 0;

      for (const action of pendingActions) {
        try {
          await updateQueuedAction(action.id, { status: 'processing' });
          await this.processAction(action);
          await removeQueuedAction(action.id);
          successCount++;
        } catch (error) {
          console.error('Failed to process queued action:', error);
          await updateQueuedAction(action.id, {
            status: 'failed',
            retryCount: action.retryCount + 1,
          });
          failedCount++;
        }
      }

      return { success: successCount, failed: failedCount };
    } finally {
      this.isSyncing = false;
    }
  }

  private async processAction(action: QueuedAction): Promise<void> {
    switch (action.type) {
      case 'send_message':
        await messagingService.sendMessage(
          action.payload.threadId,
          action.payload.text
        );
        // Update message status from queued to sent
        if (action.payload.messageId) {
          messagingService.updateMessageStatus(action.payload.messageId, 'sent');
        }
        break;

      case 'make_call':
        await callingService.initiateCall(action.payload.contactId);
        break;

      case 'sync_health':
        // Health sync would happen here
        console.log('Syncing health data:', action.payload);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}

export const offlineSyncManager = new OfflineSyncManager();
