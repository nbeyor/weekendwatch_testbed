'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mic } from 'lucide-react';
import { messagingService } from '@/services/MessagingService';
import type { MessageThread } from '@/models/types';

export default function CommHubPage() {
  const router = useRouter();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [messages, setMessages] = useState<Map<string, any>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadThreads = async () => {
      const [threadsData, contactsData] = await Promise.all([
        messagingService.getThreads(),
        messagingService.getContacts(),
      ]);

      // Load last message for each thread
      const msgMap = new Map();
      for (const thread of threadsData) {
        const threadMessages = await messagingService.getMessagesForThread(thread.id);
        if (threadMessages.length > 0) {
          msgMap.set(thread.id, threadMessages[threadMessages.length - 1]);
        }
      }

      setThreads(threadsData);
      setContacts(contactsData);
      setMessages(msgMap);
      setLoading(false);
    };
    loadThreads();
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 1) return 'Now';
    if (hours < 24) return `${Math.floor(hours)}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="watch-container">
      <div className="watch-mode">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/watch')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <div className="meta-text">WHATSAPP</div>
          <button
            onClick={() => router.push('/watch/voice')}
            className="flex items-center gap-2"
          >
            <Mic size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-auto -mx-6 px-6">
          {loading ? (
            <div className="text-center mt-12">
              <div className="meta-text">LOADING...</div>
            </div>
          ) : (
            <div className="space-y-1">
              {threads.map((thread) => {
                const contactId = thread.participantIds.find((id) => id !== 'me');
                const contact = contacts.find((c) => c.id === contactId);
                const lastMsg = messages.get(thread.id);

                return (
                  <button
                    key={thread.id}
                    onClick={() => router.push(`/watch/messages/${thread.id}`)}
                    className="w-full text-left border-b-2 border-black py-4 active:opacity-50"
                  >
                    {/* Contact name - large */}
                    <div className="text-lg font-semibold mb-1">
                      {contact?.name || 'Unknown'}
                    </div>

                    {/* Last message preview */}
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-base opacity-60 truncate flex-1">
                        {lastMsg?.text || 'No messages'}
                      </div>
                      <div className="meta-text whitespace-nowrap">
                        {formatTime(thread.lastMessageAt)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Voice shortcut hint */}
        <div className="gesture-hint gesture-hint-bottom">
          TAP MIC FOR VOICE
        </div>
      </div>
    </div>
  );
}
