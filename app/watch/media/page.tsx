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
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<string | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

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

  const playlistSongs: Record<string, string[]> = {
    'Workout Mix': ['Eye of the Tiger', 'Lose Yourself', 'Stronger', 'Till I Collapse'],
    'Chill Vibes': ['Sunflower', 'Electric Feel', 'Feel Good Inc', 'Float On'],
    'Study Focus': ['Weightless', 'Breathe Me', 'Pure Shores', 'Teardrop'],
    'Party Hits': ['Uptown Funk', 'Get Lucky', 'Shut Up and Dance', 'Can\'t Stop the Feeling'],
  };

  const podcastEpisodes: Record<string, string[]> = {
    'Joe Rogan Experience': ['#2091 - Elon Musk', '#2090 - Mike Tyson', '#2089 - Duncan Trussell'],
    'The Daily': ['The Sunday Read', 'A New Trump Era Begins', 'What Comes Next'],
    'SmartLess': ['Will Ferrell', 'Ryan Reynolds', 'Conan O\'Brien'],
    'Crime Junkie': ['MURDERED: Sheree Magaro', 'MISSING: Asha Degree', 'CONSPIRACY: The Dyatlov Pass'],
  };

  const radioSongs: Record<string, string[]> = {
    'Hip Hop': ['MOP - Ante Up', 'DMX - X Gon Give It To Ya', 'Wu-Tang - C.R.E.A.M.'],
    'Rock': ['AC/DC - Back in Black', 'Led Zeppelin - Stairway', 'Queen - Bohemian Rhapsody'],
    'Jazz': ['Miles Davis - So What', 'John Coltrane - Giant Steps', 'Bill Evans - Waltz for Debby'],
    'Electronic': ['Daft Punk - One More Time', 'Deadmau5 - Strobe', 'Calvin Harris - Feel So Close'],
  };

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
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Disc3 size={24} strokeWidth={2} />
              <div className="text-base font-medium">MOP - Ante Up</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show songs/episodes for a specific playlist/podcast/radio
  if (selectedPlaylist) {
    const songs = playlistSongs[selectedPlaylist] || [];
    return (
      <div className="watch-container">
        <div className="watch-mode">
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
            <button onClick={() => setSelectedPlaylist(null)}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <div className="meta-text truncate flex-1 mx-2">{selectedPlaylist.toUpperCase()}</div>
            <div className="w-4" />
          </div>
          <div className="flex-1 overflow-auto">
            {songs.map((song) => (
              <button
                key={song}
                className="w-full text-left border-b border-black/20 py-2 active:opacity-50"
              >
                <div className="text-sm">{song}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedPodcast) {
    const episodes = podcastEpisodes[selectedPodcast] || [];
    return (
      <div className="watch-container">
        <div className="watch-mode">
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
            <button onClick={() => setSelectedPodcast(null)}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <div className="meta-text truncate flex-1 mx-2">{selectedPodcast.toUpperCase()}</div>
            <div className="w-4" />
          </div>
          <div className="flex-1 overflow-auto">
            {episodes.map((episode) => (
              <button
                key={episode}
                className="w-full text-left border-b border-black/20 py-2 active:opacity-50"
              >
                <div className="text-sm">{episode}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedRadio) {
    const songs = radioSongs[selectedRadio] || [];
    return (
      <div className="watch-container">
        <div className="watch-mode">
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
            <button onClick={() => setSelectedRadio(null)}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <div className="meta-text truncate flex-1 mx-2">{selectedRadio.toUpperCase()}</div>
            <div className="w-4" />
          </div>
          <div className="flex-1 overflow-auto">
            {songs.map((song) => (
              <button
                key={song}
                className="w-full text-left border-b border-black/20 py-2 active:opacity-50"
              >
                <div className="text-sm">{song}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Category list views
  if (category === 'playlists') {
    return (
      <div className="watch-container">
        <div className="watch-mode">
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
            <button onClick={() => setCategory('main')}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <div className="meta-text">PLAYLISTS</div>
            <div className="w-4" />
          </div>
          <div className="flex-1 overflow-auto">
            {playlists.map((playlist) => (
              <button
                key={playlist}
                onClick={() => setSelectedPlaylist(playlist)}
                className="w-full text-left border-b border-black/20 py-2 active:opacity-50"
              >
                <div className="text-sm">{playlist}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (category === 'podcasts') {
    return (
      <div className="watch-container">
        <div className="watch-mode">
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
            <button onClick={() => setCategory('main')}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <div className="meta-text">PODCASTS</div>
            <div className="w-4" />
          </div>
          <div className="flex-1 overflow-auto">
            {podcasts.map((podcast) => (
              <button
                key={podcast}
                onClick={() => setSelectedPodcast(podcast)}
                className="w-full text-left border-b border-black/20 py-2 active:opacity-50"
              >
                <div className="text-sm">{podcast}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (category === 'radio') {
    return (
      <div className="watch-container">
        <div className="watch-mode">
          <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
            <button onClick={() => setCategory('main')}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <div className="meta-text">RADIO</div>
            <div className="w-4" />
          </div>
          <div className="flex-1 overflow-auto">
            {radioStations.map((station) => (
              <button
                key={station}
                onClick={() => setSelectedRadio(station)}
                className="w-full text-left border-b border-black/20 py-2 active:opacity-50"
              >
                <div className="text-sm">{station}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
