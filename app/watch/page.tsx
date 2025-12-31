'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUp, ArrowRight as ArrowRightIcon, Mic, MapPin, Play, Pause, SkipForward, Volume2, Settings as SettingsIcon, X } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { messagingService } from '@/services/MessagingService';
import { mediaService } from '@/services/MediaService';
import { navService } from '@/services/NavService';
import type { Message, MessageThread, MediaState, NavRoute } from '@/models/types';

type WatchMode = 'time' | 'chat' | 'nav' | 'media' | 'settings';

export default function WatchHomePage() {
  const router = useRouter();
  const weekendMode = useAppStore((state) => state.settings.weekendMode);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mode, setMode] = useState<WatchMode>('time');
  const [latestMessage, setLatestMessage] = useState<Message | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Chat mode state
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [threadMessages, setThreadMessages] = useState<Map<string, any>>(new Map());

  // Media mode state
  const [mediaState, setMediaState] = useState<MediaState | null>(null);

  // Nav mode state
  const [activeRoute, setActiveRoute] = useState<NavRoute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load chat data
  useEffect(() => {
    const loadChatData = async () => {
      const [threadsData, contactsData] = await Promise.all([
        messagingService.getThreads(),
        messagingService.getContacts(),
      ]);

      const msgMap = new Map();
      for (const thread of threadsData) {
        const messages = await messagingService.getMessagesForThread(thread.id);
        if (messages.length > 0) {
          msgMap.set(thread.id, messages[messages.length - 1]);
          if (!latestMessage) {
            setLatestMessage(messages[messages.length - 1]);
          }
        }
      }

      setThreads(threadsData);
      setContacts(contactsData);
      setThreadMessages(msgMap);
    };
    loadChatData();
  }, []);

  // Load media state
  useEffect(() => {
    const loadMedia = async () => {
      const state = await mediaService.getMediaState();
      setMediaState(state);
    };
    loadMedia();

    const interval = setInterval(loadMedia, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load nav state
  useEffect(() => {
    const route = navService.getActiveRoute();
    setActiveRoute(route);
  }, []);

  // Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      const modes: WatchMode[] = weekendMode
        ? ['time', 'chat', 'settings']
        : ['time', 'chat', 'nav', 'media', 'settings'];

      const currentIndex = modes.indexOf(mode);

      if (diff > 0) {
        const nextIndex = (currentIndex + 1) % modes.length;
        setMode(modes[nextIndex]);
      } else {
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

  const formatThreadTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    if (hours < 1) return 'Now';
    if (hours < 24) return `${Math.floor(hours)}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  // Mode renderers
  const renderTimeMode = () => (
    <div
      className="watch-mode"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="meta-text text-center mb-4">{formatDate()}</div>
      <div className="flex-1 flex items-center justify-center">
        <div className="time-hero">{formatTime()}</div>
      </div>
      {latestMessage && !weekendMode && (
        <div
          className="border-t-2 border-black pt-4 cursor-pointer"
          onClick={() => setMode('chat')}
        >
          <div className="meta-text mb-2">LATEST MESSAGE</div>
          <div className="text-lg font-medium truncate">{latestMessage.sender}</div>
          <div className="text-base opacity-60 truncate">{latestMessage.text}</div>
        </div>
      )}
      <div className="gesture-hint gesture-hint-bottom">SWIPE FOR MORE</div>
    </div>
  );

  const renderChatMode = () => (
    <div
      className="watch-mode"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setMode('time')}>
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <div className="meta-text">WHATSAPP</div>
        <button onClick={() => router.push('/watch/voice')}>
          <Mic size={24} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-auto -mx-6 px-6">
        <div className="space-y-1">
          {threads.map((thread) => {
            const contactId = thread.participantIds.find((id) => id !== 'me');
            const contact = contacts.find((c) => c.id === contactId);
            const lastMsg = threadMessages.get(thread.id);

            return (
              <button
                key={thread.id}
                onClick={() => router.push(`/watch/messages/${thread.id}`)}
                className="w-full text-left border-b-2 border-black py-4 active:opacity-50"
              >
                <div className="text-lg font-semibold mb-1">
                  {contact?.name || 'Unknown'}
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="text-base opacity-60 truncate flex-1">
                    {lastMsg?.text || 'No messages'}
                  </div>
                  <div className="meta-text whitespace-nowrap">
                    {formatThreadTime(thread.lastMessageAt)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="gesture-hint gesture-hint-left">SWIPE</div>
      <div className="gesture-hint gesture-hint-right">SWIPE</div>
    </div>
  );

  const renderMediaMode = () => {
    if (!mediaState) return null;

    const hasTrack = mediaState.trackTitle !== 'Nothing playing';

    const handlePlayPause = async () => {
      if (mediaState?.playing) {
        await mediaService.pause();
      } else {
        await mediaService.play();
      }
    };

    const handleSkip = async () => {
      await mediaService.skip();
    };

    const handleVolumeChange = async (delta: number) => {
      const newVolume = Math.max(0, Math.min(100, mediaState.volumePercent + delta));
      await mediaService.setVolume(newVolume);
    };

    return (
      <div
        className="watch-mode"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMode('time')}>
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <div className="meta-text">SPOTIFY</div>
          <button onClick={() => handleVolumeChange(mediaState.volumePercent > 0 ? -100 : 50)}>
            <Volume2 size={24} strokeWidth={2} />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-lg font-bold mb-2 truncate">
            {hasTrack ? mediaState.trackTitle : 'Not Playing'}
          </div>
          {hasTrack && (
            <div className="text-base opacity-60 truncate">{mediaState.artist}</div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center bg-black text-white active:opacity-70"
          >
            {mediaState.playing ? (
              <Pause size={64} strokeWidth={2} fill="white" />
            ) : (
              <Play size={64} strokeWidth={2} fill="white" className="ml-2" />
            )}
          </button>
        </div>

        <button
          onClick={handleSkip}
          disabled={!hasTrack}
          className="btn-watch-outline"
        >
          <div className="flex items-center justify-center gap-2">
            <SkipForward size={24} strokeWidth={2} />
            SKIP
          </div>
        </button>

        <div className="gesture-hint gesture-hint-left">SWIPE</div>
        <div className="gesture-hint gesture-hint-right">SWIPE</div>
      </div>
    );
  };

  const renderNavMode = () => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) return;
      const results = await navService.searchDestination(searchQuery);
      if (results.length > 0) {
        const route = await navService.createRoute(results[0].id);
        setActiveRoute(route);
        setCurrentStepIndex(0);
        setSearchQuery('');
      }
    };

    const handleQuickDest = async (dest: string) => {
      const results = await navService.searchDestination(dest);
      if (results.length > 0) {
        const route = await navService.createRoute(results[0].id);
        setActiveRoute(route);
        setCurrentStepIndex(0);
      }
    };

    const handleNextStep = () => {
      if (activeRoute && currentStepIndex < activeRoute.steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    };

    const handleClearRoute = () => {
      navService.clearRoute();
      setActiveRoute(null);
      setCurrentStepIndex(0);
    };

    const getDirectionIcon = (instruction: string) => {
      const lower = instruction.toLowerCase();
      if (lower.includes('left')) return ArrowLeft;
      if (lower.includes('right')) return ArrowRightIcon;
      return ArrowUp;
    };

    const currentStep = activeRoute?.steps[currentStepIndex];
    const DirectionIcon = currentStep ? getDirectionIcon(currentStep.instruction) : ArrowUp;
    const isLastStep = activeRoute && currentStepIndex === activeRoute.steps.length - 1;

    if (activeRoute && currentStep) {
      return (
        <div
          className="watch-mode"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="meta-text">GOOGLE MAPS</div>
            <button onClick={handleClearRoute}>
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="time-large">{activeRoute.totalEtaMin} min</div>
            <div className="meta-text mt-1">
              {activeRoute.totalDistanceMiles.toFixed(1)} MI • {activeRoute.destinationLabel.toUpperCase()}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <DirectionIcon size={120} strokeWidth={1.5} />
          </div>

          <div className="text-center mb-6">
            <div className="text-2xl font-bold mb-2">{currentStep.distance}</div>
            <div className="action-text">{currentStep.instruction}</div>
          </div>

          {isLastStep ? (
            <button onClick={handleClearRoute} className="btn-watch">ARRIVED</button>
          ) : (
            <button onClick={handleNextStep} className="btn-watch">NEXT STEP</button>
          )}

          <div className="meta-text text-center mt-4">
            STEP {currentStepIndex + 1} OF {activeRoute.steps.length}
          </div>
        </div>
      );
    }

    return (
      <div
        className="watch-mode"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMode('time')}>
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <div className="meta-text">GOOGLE MAPS</div>
          <div className="w-6" />
        </div>

        <div className="mb-6">
          <div className="action-text text-center mb-4">Where to?</div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter destination..."
            className="w-full px-4 py-4 border-3 border-black text-lg mb-3"
          />
          <button onClick={handleSearch} disabled={!searchQuery.trim()} className="btn-watch">
            START
          </button>
        </div>

        <div className="flex-1 overflow-auto -mx-6 px-6">
          <div className="meta-text mb-3">QUICK DESTINATIONS</div>
          <div className="space-y-2">
            {['Home', 'Work', 'Gym', 'Coffee Shop'].map((dest) => (
              <button
                key={dest}
                onClick={() => handleQuickDest(dest)}
                className="w-full border-2 border-black p-4 flex items-center gap-3 active:opacity-50"
              >
                <MapPin size={24} strokeWidth={2} />
                <span className="text-lg font-medium">{dest}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="gesture-hint gesture-hint-left">SWIPE</div>
        <div className="gesture-hint gesture-hint-right">SWIPE</div>
      </div>
    );
  };

  const renderSettingsMode = () => (
    <div
      className="watch-mode"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setMode('time')}>
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <div className="meta-text">SETTINGS</div>
        <div className="w-6" />
      </div>

      <div className="context-card">
        <SettingsIcon size={80} strokeWidth={1.5} />
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
