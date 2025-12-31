'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { mediaService } from '@/services/MediaService';
import type { MediaState } from '@/models/types';

export default function MediaPage() {
  const router = useRouter();
  const [mediaState, setMediaState] = useState<MediaState | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

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

  const hasTrack = mediaState.trackTitle !== 'Nothing playing';

  return (
    <div className="watch-container">
      <div
        className="watch-mode"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.push('/watch')}>
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <div className="meta-text">SPOTIFY</div>
          <div className="w-6" />
        </div>

        {/* Voice command hint */}
        <div className="text-center mb-4 pb-3 border-b border-black/20">
          <div className="text-sm opacity-60">Say "play", "pause", "next song"</div>
        </div>

        {/* Now playing info */}
        <div className="text-center mb-8">
          <div className="text-lg font-bold mb-2 truncate">
            {hasTrack ? mediaState.trackTitle : 'Not Playing'}
          </div>
          {hasTrack && (
            <>
              <div className="text-base opacity-60 truncate mb-4">
                {mediaState.artist}
              </div>
              <div className="meta-text">
                {formatTime(mediaState.positionSec)} / {formatTime(mediaState.durationSec)}
              </div>
            </>
          )}
        </div>

        {/* Giant play/pause button */}
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

        {/* Skip controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => handleSkip('back')}
            disabled={!hasTrack}
            className="btn-watch-outline flex-1"
          >
            <SkipBack size={32} strokeWidth={2} className="mx-auto" />
          </button>
          <button
            onClick={() => handleSkip('forward')}
            disabled={!hasTrack}
            className="btn-watch-outline flex-1"
          >
            <SkipForward size={32} strokeWidth={2} className="mx-auto" />
          </button>
        </div>

        {/* Volume indicator */}
        <div className="border-t-2 border-black pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="meta-text">VOLUME</div>
            <div className="text-lg font-bold">{mediaState.volumePercent}%</div>
          </div>
          <div className="h-3 border-2 border-black">
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${mediaState.volumePercent}%` }}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleVolumeChange(-10)}
              className="btn-watch-outline flex-1 !min-h-0 !py-2"
            >
              -
            </button>
            <button
              onClick={() => handleVolumeChange(10)}
              className="btn-watch-outline flex-1 !min-h-0 !py-2"
            >
              +
            </button>
          </div>
        </div>

        {/* Swipe hint */}
        <div className="gesture-hint gesture-hint-left">SKIP</div>
        <div className="gesture-hint gesture-hint-right">SKIP</div>
      </div>
    </div>
  );
}
