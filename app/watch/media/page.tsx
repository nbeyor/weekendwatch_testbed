'use client';

import React, { useState, useEffect } from 'react';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { mediaService } from '@/services/MediaService';
import type { MediaState, OutputDevice } from '@/models/types';
import { Play, Pause, SkipForward, Volume2, Watch, Car, Headphones, Speaker } from 'lucide-react';

export default function MediaPage() {
  const [mediaState, setMediaState] = useState<MediaState | null>(null);

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

  const handleSkip = async () => {
    await mediaService.skip();
    loadMediaState();
  };

  const handleVolumeChange = async (delta: number) => {
    if (!mediaState) return;
    const newVolume = Math.max(0, Math.min(100, mediaState.volumePercent + delta));
    await mediaService.setVolume(newVolume);
    loadMediaState();
  };

  const handleOutputDevice = async (device: OutputDevice) => {
    await mediaService.setOutputDevice(device);
    loadMediaState();
  };

  const getDeviceIcon = (device: OutputDevice) => {
    switch (device) {
      case 'watch':
        return Watch;
      case 'car':
        return Car;
      case 'earbuds':
        return Headphones;
      case 'speaker':
        return Speaker;
    }
  };

  const outputDevices: OutputDevice[] = ['watch', 'car', 'earbuds', 'speaker'];

  if (!mediaState) {
    return (
      <div className="flex flex-col h-screen">
        <WatchHeader title="Media" showBack backHref="/watch" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-dark">Loading...</p>
        </div>
      </div>
    );
  }

  const hasTrack = mediaState.trackTitle !== 'Nothing playing';

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Media" showBack backHref="/watch" />

      <main className="flex-1 overflow-auto p-3 space-y-4">
        {/* Now playing */}
        <div className="card text-center">
          <div className="text-xs text-gray-dark mb-2">Now Playing</div>
          <div className="font-bold text-lg mb-1">
            {mediaState.trackTitle}
          </div>
          {hasTrack && (
            <>
              <div className="text-sm text-gray-dark mb-2">
                {mediaState.artist}
              </div>
              <div className="text-xs text-gray-dark">
                {Math.floor(mediaState.positionSec / 60)}:
                {(mediaState.positionSec % 60).toString().padStart(2, '0')} /{' '}
                {Math.floor(mediaState.durationSec / 60)}:
                {(mediaState.durationSec % 60).toString().padStart(2, '0')}
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button onClick={handlePlayPause} className="btn-primary p-4">
            {mediaState.playing ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <button onClick={handleSkip} className="btn-secondary p-4" disabled={!hasTrack}>
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        {/* Volume */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4" />
            <div className="text-sm font-medium">Volume: {mediaState.volumePercent}%</div>
          </div>
          <div className="h-2 border border-black mb-2">
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${mediaState.volumePercent}%` }}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleVolumeChange(-10)} className="btn-secondary flex-1">
              -10%
            </button>
            <button onClick={() => handleVolumeChange(10)} className="btn-secondary flex-1">
              +10%
            </button>
          </div>
        </div>

        {/* Output device */}
        <div>
          <div className="text-sm font-medium mb-2">Output Device</div>
          <div className="grid grid-cols-2 gap-2">
            {outputDevices.map((device) => {
              const Icon = getDeviceIcon(device);
              const isActive = mediaState.outputDevice === device;
              return (
                <button
                  key={device}
                  onClick={() => handleOutputDevice(device)}
                  className={`border-2 border-black p-3 flex flex-col items-center gap-1 ${
                    isActive ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs capitalize">{device}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
