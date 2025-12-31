'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Mic, Send } from 'lucide-react';
import { messagingService } from '@/services/MessagingService';
import { useAppStore } from '@/stores/useAppStore';
import { addToQueue } from '@/lib/db';
import type { Message, Contact } from '@/models/types';

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const threadId = params.threadId as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const offlineMode = useAppStore((state) => state.settings.offlineMode);
  const addToast = useAppStore((state) => state.addToast);

  useEffect(() => {
    loadMessages();
  }, [threadId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMessages = async () => {
    try {
      const [messagesData, thread, contactsData] = await Promise.all([
        messagingService.getMessagesForThread(threadId),
        messagingService.getThread(threadId),
        messagingService.getContacts(),
      ]);

      setMessages(messagesData);

      if (thread) {
        const contactId = thread.participantIds.find((id) => id !== 'me');
        const contactData = contactsData.find((c) => c.id === contactId);
        setContact(contactData || null);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
      addToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setSending(true);

    try {
      if (offlineMode) {
        const queuedMessage = messagingService.queueMessage(threadId, newMessage);
        await addToQueue({
          type: 'send_message',
          payload: { threadId, text: newMessage, messageId: queuedMessage.id },
          createdAt: new Date(),
          retryCount: 0,
          status: 'pending',
        });
        setMessages([...messages, queuedMessage]);
        addToast('Queued (offline)', 'info');
      } else {
        const sent = await messagingService.sendMessage(threadId, newMessage);
        setMessages([...messages, sent]);
      }
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      addToast('Send failed', 'error');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="watch-container">
        <div className="watch-mode">
          <div className="meta-text text-center">LOADING...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="watch-container flex flex-col">
      {/* Header */}
      <div className="p-2 border-b-2 border-black">
        <div className="flex items-center justify-between mb-1">
          <button onClick={() => router.push('/watch/comm')}>
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <div className="text-base font-semibold truncate flex-1 mx-2">
            {contact?.name || 'Unknown'}
          </div>
          <div className="w-4" />
        </div>
        <div className="text-xs text-center opacity-60">
          Say "message {contact?.name?.split(' ')[0] || 'them'}, [your message]"
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-auto px-2">
        {messages.length === 0 ? (
          <div className="py-4 text-center text-gray-dark">
            <div className="text-sm">No messages yet</div>
          </div>
        ) : null}

        {messages.map((message) => {
          const isOutbound = message.sender === 'me';

          return (
            <div
              key={message.id}
              className="border-b border-black/15 py-2"
            >
              <div className="flex items-start gap-1.5">
                {/* Outbound indicator (left) */}
                <div className="w-4 flex-shrink-0 pt-0.5">
                  {isOutbound ? (
                    <ChevronLeft className="w-3 h-3 opacity-60" />
                  ) : null}
                </div>

                {/* Message text (flat, no bubble) */}
                <div className="min-w-0 flex-1">
                  <div className="text-base leading-snug break-words">{message.text}</div>
                  <div className="text-xs opacity-50 mt-0.5">
                    {formatTime(message.createdAt)}
                    {message.status === 'queued' ? ' • Queued' : ''}
                  </div>
                </div>

                {/* Inbound indicator (right) */}
                <div className="w-4 flex-shrink-0 pt-0.5 flex justify-end">
                  {!isOutbound ? (
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - simplified */}
      <div className="p-2 border-t-2 border-black">
        <div className="flex gap-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Message..."
            className="flex-1 px-2 py-2 border-2 border-black text-sm"
            disabled={sending}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="btn-circle"
          >
            <Send size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
