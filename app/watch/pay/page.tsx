'use client';

import React, { useState, useEffect } from 'react';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { paymentsService } from '@/services/PaymentsService';
import type { PaymentToken, PaymentTxn } from '@/models/types';
import { CreditCard, Loader } from 'lucide-react';

export default function PayPage() {
  const [token, setToken] = useState<PaymentToken | null>(null);
  const [transactions, setTransactions] = useState<PaymentTxn[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'pay' | 'history'>('pay');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const txns = await paymentsService.getTransactions();
    setTransactions(txns.slice(0, 10));
  };

  const handleGenerateToken = async () => {
    setLoading(true);
    try {
      const newToken = await paymentsService.generatePaymentToken();
      setToken(newToken);
    } catch (error) {
      console.error('Failed to generate token:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPatternStyle = (pattern: string) => {
    const patterns: Record<string, string> = {
      grid: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)',
      diagonal: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 12px)',
      concentric: 'radial-gradient(circle, transparent 10%, rgba(0,0,0,0.05) 20%, transparent 30%, rgba(0,0,0,0.05) 40%, transparent 50%)',
      vertical: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 10px)',
      horizontal: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 10px)',
    };
    return patterns[pattern] || patterns.grid;
  };

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Tap to Pay" showBack backHref="/watch" />

      {/* Tab selector */}
      <div className="segmented-control w-full">
        <button
          onClick={() => setView('pay')}
          className={`segmented-control-item flex-1 ${view === 'pay' ? 'active' : ''}`}
        >
          Pay
        </button>
        <button
          onClick={() => setView('history')}
          className={`segmented-control-item flex-1 ${view === 'history' ? 'active' : ''}`}
        >
          History
        </button>
      </div>

      <main className="flex-1 overflow-auto p-3">
        {view === 'pay' ? (
          <div className="space-y-4">
            {!token ? (
              <div className="space-y-4">
                <div className="text-center">
                  <CreditCard className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-sm text-gray-dark">
                    Generate a payment token to proceed
                  </p>
                </div>

                <button
                  onClick={handleGenerateToken}
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin inline" />
                  ) : (
                    'Generate Payment Token'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className="aspect-square border-4 border-black flex items-center justify-center"
                  style={{
                    backgroundImage: getPatternStyle(token.pattern),
                  }}
                >
                  <div className="text-center p-4 bg-white border-2 border-black">
                    <div className="text-xs mb-1">TOKEN</div>
                    <div className="font-mono text-sm">{token.token}</div>
                  </div>
                </div>

                <div className="card">
                  <div className="text-xs text-gray-dark mb-1">Expires in</div>
                  <div className="font-medium">
                    {Math.max(
                      0,
                      Math.floor((token.expiresAt.getTime() - Date.now()) / 1000)
                    )}{' '}
                    seconds
                  </div>
                </div>

                <button onClick={() => setToken(null)} className="btn-secondary w-full">
                  Clear Token
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((txn) => (
              <div key={txn.id} className="card">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium">{txn.merchant}</div>
                  <div className="font-bold">
                    ${txn.amount.toFixed(2)}
                  </div>
                </div>
                <div className="text-xs text-gray-dark">
                  {txn.createdAt.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                  {txn.last4 && ` • •••• ${txn.last4}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
