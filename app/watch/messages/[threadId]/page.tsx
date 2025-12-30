'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mic, Send } from 'lucide-react';
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
      <div className="flex items-center justify-between p-4 border-b-2 border-black">
        <button onClick={() => router.push('/watch/comm')}>
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <div className="text-lg font-semibold truncate flex-1 mx-3">
          {contact?.name || 'Unknown'}
        </div>
        <button onClick={() => router.push('/watch/voice')}>
          <Mic size={24} strokeWidth={2} />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] ${
                message.sender === 'me'
                  ? 'bg-black text-white'
                  : 'border-2 border-black bg-white'
              } p-3`}
            >
              {/* Message text - larger, more readable */}
              <p className="text-base leading-relaxed">{message.text}</p>

              {/* Timestamp - subtle */}
              <div
                className={`text-xs mt-2 ${
                  message.sender === 'me' ? 'opacity-60' : 'opacity-40'
                }`}
              >
                {message.createdAt.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
                {message.status === 'queued' && ' • Queued'}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - simplified */}
      <div className="p-4 border-t-2 border-black">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Message..."
            className="flex-1 px-3 py-3 border-2 border-black text-base"
            disabled={sending}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="btn-circle"
          >
            <Send size={24} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
