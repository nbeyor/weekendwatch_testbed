import type { CallLog, Contact } from '@/models/types';
import { SEED_CALL_LOGS } from '@/models/seedData';

export interface CallingService {
  getCallLogs(): Promise<CallLog[]>;
  initiateCall(contactId: string): Promise<CallLog>;
  endCall(callId: string): Promise<void>;
  acceptCall(callId: string): Promise<void>;
  declineCall(callId: string): Promise<void>;
}

export class MockCallingService implements CallingService {
  private callLogs: CallLog[] = [...SEED_CALL_LOGS];
  private activeCall: CallLog | null = null;

  async getCallLogs(): Promise<CallLog[]> {
    await this.delay(100);
    return [...this.callLogs].sort((a, b) =>
      b.startedAt.getTime() - a.startedAt.getTime()
    );
  }

  async initiateCall(contactId: string): Promise<CallLog> {
    await this.delay(300);

    const newCall: CallLog = {
      id: `call-${Date.now()}`,
      contactId,
      direction: 'out',
      status: 'active',
      startedAt: new Date(),
    };

    this.callLogs.push(newCall);
    this.activeCall = newCall;

    return newCall;
  }

  async endCall(callId: string): Promise<void> {
    await this.delay(100);

    const call = this.callLogs.find(c => c.id === callId);
    if (call && call.status === 'active') {
      const durationSec = Math.floor(
        (Date.now() - call.startedAt.getTime()) / 1000
      );
      call.status = 'completed';
      call.durationSec = durationSec;

      if (this.activeCall?.id === callId) {
        this.activeCall = null;
      }
    }
  }

  async acceptCall(callId: string): Promise<void> {
    await this.delay(100);

    const call = this.callLogs.find(c => c.id === callId);
    if (call) {
      call.status = 'active';
      this.activeCall = call;
    }
  }

  async declineCall(callId: string): Promise<void> {
    await this.delay(100);

    const call = this.callLogs.find(c => c.id === callId);
    if (call) {
      call.status = 'declined';
    }
  }

  getActiveCall(): CallLog | null {
    return this.activeCall;
  }

  // Simulate incoming call (for demo purposes)
  simulateIncomingCall(contactId: string): CallLog {
    const newCall: CallLog = {
      id: `call-${Date.now()}`,
      contactId,
      direction: 'in',
      status: 'active',
      startedAt: new Date(),
    };

    this.callLogs.push(newCall);
    return newCall;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const callingService = new MockCallingService();
