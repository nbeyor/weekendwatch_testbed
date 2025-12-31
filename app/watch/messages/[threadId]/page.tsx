'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Mic, Send, Phone } from 'lucide-react';
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

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <div className="watch-container flex flex-col">
      {/* Header with last message as topic */}
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
        {lastMessage && (
          <div className="text-xs opacity-60 truncate">
            {lastMessage.text}
          </div>
        )}
      </div>

      {/* CLI cursor area */}
      <div className="flex-1 p-2">
        <div className="flex items-center">
          <span className="text-base">&gt;</span>
          <span className="cli-cursor"></span>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="p-2 border-t-2 border-black flex gap-2">
        <button className="btn-watch flex-1 flex items-center justify-center gap-2">
          <Send size={16} strokeWidth={2} />
          SEND
        </button>
        <button className="btn-watch flex-1 flex items-center justify-center gap-2">
          <Phone size={16} strokeWidth={2} />
          CALL
        </button>
      </div>
    </div>
  );
}
