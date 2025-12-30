'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { messagingService } from '@/services/MessagingService';
import { useAppStore } from '@/stores/useAppStore';
import { addToQueue } from '@/lib/db';
import type { Message, Contact } from '@/models/types';
import { Loader, Send } from 'lucide-react';

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const threadId = params.threadId as string;

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
        // Queue the message
        const queuedMessage = messagingService.queueMessage(threadId, newMessage);
        await addToQueue({
          type: 'send_message',
          payload: {
            threadId,
            text: newMessage,
            messageId: queuedMessage.id,
          },
          createdAt: new Date(),
          retryCount: 0,
          status: 'pending',
        });

        setMessages([...messages, queuedMessage]);
        addToast('Message queued (offline)', 'info');
      } else {
        // Send immediately
        const sent = await messagingService.sendMessage(threadId, newMessage);
        setMessages([...messages, sent]);
        addToast('Message sent', 'success');
      }

      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      addToast('Failed to send message', 'error');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <WatchHeader title="..." showBack backHref="/watch/messages" />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader
        title={contact?.name || 'Unknown'}
        showBack
        backHref="/watch/messages"
      />

      {/* Messages area */}
      <main className="flex-1 overflow-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] border-2 border-black p-2 ${
                message.sender === 'me' ? 'bg-black text-white' : 'bg-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'me' ? 'text-gray-light' : 'text-gray-dark'
                }`}
              >
                {message.createdAt.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
                {message.status === 'queued' && ' • Queued'}
                {message.status === 'failed' && ' • Failed'}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input area */}
      <div className="border-t-2 border-black p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="input flex-1"
            disabled={sending}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="btn-primary px-4"
          >
            {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
