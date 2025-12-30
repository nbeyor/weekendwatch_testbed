import type { PaymentTxn, PaymentToken } from '@/models/types';
import { SEED_PAYMENT_TXNS } from '@/models/seedData';

export interface PaymentsService {
  getTransactions(): Promise<PaymentTxn[]>;
  generatePaymentToken(): Promise<PaymentToken>;
  simulateTransaction(merchant: string, amount: number): Promise<PaymentTxn>;
}

export class MockPaymentsService implements PaymentsService {
  private transactions: PaymentTxn[] = [...SEED_PAYMENT_TXNS];
  private currentToken: PaymentToken | null = null;

  async getTransactions(): Promise<PaymentTxn[]> {
    await this.delay(100);
    return [...this.transactions].sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async generatePaymentToken(): Promise<PaymentToken> {
    await this.delay(200);

    // Generate a rotating visual pattern for the token
    const pattern = this.generateTokenPattern();

    const token: PaymentToken = {
      token: this.generateRandomToken(),
      expiresAt: new Date(Date.now() + 60000), // 1 minute
      pattern,
    };

    this.currentToken = token;
    return token;
  }

  async simulateTransaction(merchant: string, amount: number): Promise<PaymentTxn> {
    await this.delay(500);

    if (!this.currentToken || this.currentToken.expiresAt < new Date()) {
      throw new Error('No valid payment token');
    }

    const txn: PaymentTxn = {
      id: `txn-${Date.now()}`,
      merchant,
      amount,
      currency: 'USD',
      createdAt: new Date(),
      status: 'completed',
      last4: '4242',
    };

    this.transactions.push(txn);
    this.currentToken = null; // Invalidate token after use

    return txn;
  }

  getCurrentToken(): PaymentToken | null {
    if (this.currentToken && this.currentToken.expiresAt < new Date()) {
      this.currentToken = null;
    }
    return this.currentToken;
  }

  private generateRandomToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  private generateTokenPattern(): string {
    // Generate a simple monochrome pattern ID
    // This can be used to render different visual patterns
    const patterns = ['grid', 'diagonal', 'concentric', 'vertical', 'horizontal'];
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const paymentsService = new MockPaymentsService();
