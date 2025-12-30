'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Navigation2, Music, Settings } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { messagingService } from '@/services/MessagingService';
import type { Message } from '@/models/types';

type WatchMode = 'time' | 'chat' | 'nav' | 'media' | 'settings';

export default function WatchHomePage() {
  const router = useRouter();
  const weekendMode = useAppStore((state) => state.settings.weekendMode);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mode, setMode] = useState<WatchMode>('time');
  const [latestMessage, setLatestMessage] = useState<Message | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load latest message
  useEffect(() => {
    const loadLatest = async () => {
      const threads = await messagingService.getThreads();
      if (threads.length > 0) {
        const messages = await messagingService.getMessagesForThread(threads[0].id);
        if (messages.length > 0) {
          setLatestMessage(messages[messages.length - 1]);
        }
      }
    };
    loadLatest();
  }, []);

  // Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      const modes: WatchMode[] = weekendMode
        ? ['time', 'chat', 'settings']
        : ['time', 'chat', 'nav', 'media', 'settings'];

      const currentIndex = modes.indexOf(mode);

      if (diff > 0) {
        // Swipe left - next mode
        const nextIndex = (currentIndex + 1) % modes.length;
        setMode(modes[nextIndex]);
      } else {
        // Swipe right - previous mode
        const prevIndex = (currentIndex - 1 + modes.length) % modes.length;
        setMode(modes[prevIndex]);
      }
    }

    setTouchStart(null);
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).toUpperCase();
  };

  // Mode renderers
  const renderTimeMode = () => (
    <div
      className="watch-mode"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mode indicator */}
      <div className="meta-text text-center mb-4">
        {formatDate()}
      </div>

      {/* Hero time */}
      <div className="flex-1 flex items-center justify-center">
        <div className="time-hero">{formatTime()}</div>
      </div>

      {/* Context: Latest notification */}
      {latestMessage && !weekendMode && (
        <div
          className="border-t-2 border-black pt-4 cursor-pointer"
          onClick={() => router.push('/watch/comm')}
        >
          <div className="meta-text mb-2">LATEST MESSAGE</div>
          <div className="text-lg font-medium truncate">{latestMessage.sender}</div>
          <div className="text-base opacity-60 truncate">{latestMessage.text}</div>
        </div>
      )}

      {/* Swipe hint */}
      <div className="gesture-hint gesture-hint-bottom">
        SWIPE FOR MORE
      </div>
    </div>
  );

  const renderChatMode = () => (
    <div
      className="watch-mode"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="meta-text text-center mb-4">WHATSAPP</div>

      <div className="context-card">
        <MessageSquare size={80} strokeWidth={1.5} />
        <div className="action-text mt-6">Messages</div>
        {latestMessage && (
          <div className="text-base opacity-60 mt-2 truncate w-full text-center">
            {latestMessage.sender}
          </div>
        )}
      </div>

      <button
        className="btn-watch"
        onClick={() => router.push('/watch/comm')}
      >
        OPEN
      </button>

      <div className="gesture-hint gesture-hint-left">SWIPE</div>
      <div className="gesture-hint gesture-hint-right">SWIPE</div>
    </div>
  );

  const renderNavMode = () => (
    <div
      className="watch-mode"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="meta-text text-center mb-4">GOOGLE MAPS</div>

      <div className="context-card">
        <Navigation2 size={80} strokeWidth={1.5} />
        <div className="action-text mt-6">Navigation</div>
        <div className="text-base opacity-60 mt-2">Get directions</div>
      </div>

      <button
        className="btn-watch"
        onClick={() => router.push('/watch/nav')}
      >
        START
      </button>

      <div className="gesture-hint gesture-hint-left">SWIPE</div>
      <div className="gesture-hint gesture-hint-right">SWIPE</div>
    </div>
  );

  const renderMediaMode = () => (
    <div
      className="watch-mode"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="meta-text text-center mb-4">SPOTIFY</div>

      <div className="context-card">
        <Music size={80} strokeWidth={1.5} />
        <div className="action-text mt-6">Music</div>
        <div className="text-base opacity-60 mt-2">Control playback</div>
      </div>

      <button
        className="btn-watch"
        onClick={() => router.push('/watch/media')}
      >
        OPEN
      </button>

      <div className="gesture-hint gesture-hint-left">SWIPE</div>
      <div className="gesture-hint gesture-hint-right">SWIPE</div>
    </div>
  );

  const renderSettingsMode = () => (
    <div
      className="watch-mode"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="meta-text text-center mb-4">SETTINGS</div>

      <div className="context-card">
        <Settings size={80} strokeWidth={1.5} />
        <div className="action-text mt-6">Settings</div>
        <div className="text-base opacity-60 mt-2">Customize your watch</div>
      </div>

      <button
        className="btn-watch"
        onClick={() => router.push('/watch/settings')}
      >
        OPEN
      </button>

      <div className="gesture-hint gesture-hint-left">SWIPE</div>
      <div className="gesture-hint gesture-hint-right">SWIPE</div>
    </div>
  );

  // Render current mode
  return (
    <div className="watch-container">
      {mode === 'time' && renderTimeMode()}
      {mode === 'chat' && renderChatMode()}
      {mode === 'nav' && !weekendMode && renderNavMode()}
      {mode === 'media' && !weekendMode && renderMediaMode()}
      {mode === 'settings' && renderSettingsMode()}
    </div>
  );
}
