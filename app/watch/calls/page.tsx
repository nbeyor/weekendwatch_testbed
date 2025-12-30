'use client';

import React, { useEffect, useState } from 'react';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { ListItem } from '@/components/ui/ListItem';
import { callingService } from '@/services/CallingService';
import { messagingService } from '@/services/MessagingService';
import type { CallLog, Contact } from '@/models/types';
import { Phone, PhoneMissed, PhoneIncoming, PhoneOutgoing, Loader } from 'lucide-react';

export default function CallsPage() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [logsData, contactsData] = await Promise.all([
        callingService.getCallLogs(),
        messagingService.getContacts(),
      ]);
      setCallLogs(logsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Failed to load call logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContactName = (contactId: string): string => {
    const contact = contacts.find((c) => c.id === contactId);
    return contact?.name || 'Unknown';
  };

  const getCallIcon = (log: CallLog) => {
    if (log.status === 'missed') return PhoneMissed;
    if (log.direction === 'in') return PhoneIncoming;
    return PhoneOutgoing;
  };

  const formatDuration = (sec?: number): string => {
    if (!sec) return '';
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s.toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <WatchHeader title="Calls" showBack backHref="/watch/comm" />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Calls" showBack backHref="/watch/comm" />

      <main className="flex-1 overflow-auto">
        {callLogs.length === 0 ? (
          <div className="p-4 text-center text-gray-dark">
            <p className="text-sm">No call history</p>
          </div>
        ) : (
          <div className="border-b-2 border-black">
            {callLogs.map((log) => {
              const Icon = getCallIcon(log);
              return (
                <ListItem key={log.id} showChevron={false}>
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">
                        {getContactName(log.contactId)}
                      </div>
                      <div className="text-xs text-gray-dark">
                        {formatTime(log.startedAt)}
                        {log.durationSec && ` • ${formatDuration(log.durationSec)}`}
                      </div>
                    </div>
                    {log.status === 'missed' && (
                      <div className="text-xs border border-black px-2 py-1">
                        Missed
                      </div>
                    )}
                  </div>
                </ListItem>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
