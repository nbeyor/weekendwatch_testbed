'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { ListItem } from '@/components/ui/ListItem';
import { messagingService } from '@/services/MessagingService';
import type { MessageThread, Contact } from '@/models/types';
import { Loader, Plus } from 'lucide-react';

export default function MessagesPage() {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [threadsData, contactsData] = await Promise.all([
        messagingService.getThreads(),
        messagingService.getContacts(),
      ]);
      setThreads(threadsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContactName = (participantIds: string[]): string => {
    const contactId = participantIds.find((id) => id !== 'me');
    const contact = contacts.find((c) => c.id === contactId);
    return contact?.name || 'Unknown';
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // Less than 1 day: show time
    if (diff < 86400000) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
    }

    // Less than 7 days: show day
    if (diff < 604800000) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    // Otherwise: show date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <WatchHeader title="Messages" showBack backHref="/watch/comm" />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Messages" showBack backHref="/watch/comm" />

      <main className="flex-1 overflow-auto">
        {threads.length === 0 ? (
          <div className="p-4 text-center text-gray-dark">
            <p className="text-sm">No messages yet</p>
          </div>
        ) : (
          <div className="border-b-2 border-black">
            {threads.map((thread) => (
              <ListItem key={thread.id} href={`/watch/messages/${thread.id}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {getContactName(thread.participantIds)}
                    </div>
                    {thread.lastMessage && (
                      <div className="text-sm text-gray-dark truncate">
                        {thread.lastMessage.sender === 'me' && 'You: '}
                        {thread.lastMessage.text}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-dark flex-shrink-0">
                    {formatTime(thread.lastMessageAt)}
                  </div>
                </div>
              </ListItem>
            ))}
          </div>
        )}
      </main>

      {/* New message button */}
      <div className="border-t-2 border-black p-3">
        <Link href="/watch/messages/new" className="btn-primary block text-center">
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Message</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
