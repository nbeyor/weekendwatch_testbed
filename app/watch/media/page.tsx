'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc3 } from 'lucide-react';
import { mediaService } from '@/services/MediaService';
import type { MediaState } from '@/models/types';

type MediaCategory = 'main' | 'playlists' | 'podcasts' | 'radio';

export default function MediaPage() {
  const router = useRouter();
  const [mediaState, setMediaState] = useState<MediaState | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [category, setCategory] = useState<MediaCategory>('main');

  useEffect(() => {
    loadMediaState();
    const interval = setInterval(loadMediaState, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadMediaState = async () => {
    const state = await mediaService.getMediaState();
    setMediaState(state);
  };

  const handlePlayPause = async () => {
    if (mediaState?.playing) {
      await mediaService.pause();
    } else {
      await mediaService.play();
    }
    loadMediaState();
  };

  const handleSkip = async (direction: 'forward' | 'back') => {
    if (direction === 'forward') {
      await mediaService.skip();
    } else {
      // Skip back - for now just restart
      await mediaService.play();
    }
    loadMediaState();
  };

  const handleVolumeChange = async (delta: number) => {
    if (!mediaState) return;
    const newVolume = Math.max(0, Math.min(100, mediaState.volumePercent + delta));
    await mediaService.setVolume(newVolume);
    loadMediaState();
  };

  // Swipe navigation for skip
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe threshold
    if (Math.abs(diff) > 80) {
      if (diff > 0) {
        handleSkip('forward');
      } else {
        handleSkip('back');
      }
    }

    setTouchStart(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!mediaState) {
    return (
      <div className="watch-container">
        <div className="watch-mode">
          <div className="meta-text text-center">LOADING...</div>
        </div>
      </div>
    );
  }

  const playlists = ['Workout Mix', 'Chill Vibes', 'Study Focus', 'Party Hits'];
  const podcasts = ['Joe Rogan Experience', 'The Daily', 'SmartLess', 'Crime Junkie'];
  const radioStations = ['Hip Hop', 'Rock', 'Jazz', 'Electronic'];

  // Main view
  if (category === 'main') {
    return (
      <div className="watch-container">
        <div className="watch-mode">
          {/* Header with category buttons */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
              <button onClick={() => router.push('/watch')}>
                <ArrowLeft size={16} strokeWidth={2} />
              </button>
              <div className="meta-text">SPOTIFY</div>
              <div className="w-4" />
            </div>
            <div className="flex gap-1">
              <button onClick={() => setCategory('playlists')} className="btn-watch-outline !min-h-0 !py-1 text-xs flex-1">
                PLAYLISTS
              </button>
              <button onClick={() => setCategory('podcasts')} className="btn-watch-outline !min-h-0 !py-1 text-xs flex-1">
                PODCASTS
              </button>
              <button onClick={() => setCategory('radio')} className="btn-watch-outline !min-h-0 !py-1 text-xs flex-1">
                RADIO
              </button>
            </div>
          </div>

          {/* Now Playing */}
          <div className="border-t border-b border-black/20 py-2 mb-2">
            <div className="text-xs opacity-60 mb-1">NOW PLAYING</div>
            <div className="flex items-center gap-2">
              <Disc3 size={16} strokeWidth={2} />
              <div className="text-sm truncate flex-1">MOP - Ante Up</div>
            </div>
          </div>

          {/* CLI cursor */}
          <div className="flex-1 p-2">
            <div className="flex items-center">
              <span className="text-base">&gt;</span>
              <span className="cli-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List views
  const items = category === 'playlists' ? playlists : category === 'podcasts' ? podcasts : radioStations;
  const title = category === 'playlists' ? 'PLAYLISTS' : category === 'podcasts' ? 'PODCASTS' : 'RADIO';

  return (
    <div className="watch-container">
      <div className="watch-mode">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
          <button onClick={() => setCategory('main')}>
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <div className="meta-text">{title}</div>
          <div className="w-4" />
        </div>

        {/* List */}
        <div className="flex-1 overflow-auto">
          {items.map((item) => (
            <button
              key={item}
              className="w-full text-left border-b border-black/20 py-2 active:opacity-50"
            >
              <div className="text-sm">{item}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
