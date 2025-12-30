import type { MediaState, OutputDevice } from '@/models/types';

export interface MediaService {
  getMediaState(): Promise<MediaState>;
  play(query?: string): Promise<void>;
  pause(): Promise<void>;
  skip(): Promise<void>;
  setVolume(percent: number): Promise<void>;
  setOutputDevice(device: OutputDevice): Promise<void>;
}

export class MockMediaService implements MediaService {
  private state: MediaState = {
    trackTitle: 'Nothing playing',
    artist: '',
    album: '',
    playing: false,
    outputDevice: 'watch',
    volumePercent: 50,
    positionSec: 0,
    durationSec: 0,
  };

  // Mock music library
  private mockTracks = [
    {
      trackTitle: 'Midnight City',
      artist: 'M83',
      album: 'Hurry Up, We\'re Dreaming',
      durationSec: 244,
    },
    {
      trackTitle: 'Digital Love',
      artist: 'Daft Punk',
      album: 'Discovery',
      durationSec: 299,
    },
    {
      trackTitle: 'Breathe',
      artist: 'Télépopmusik',
      album: 'Genetic World',
      durationSec: 258,
    },
    {
      trackTitle: 'Sunset Lover',
      artist: 'Petit Biscuit',
      album: 'Petit Biscuit',
      durationSec: 233,
    },
    {
      trackTitle: 'Intro',
      artist: 'The xx',
      album: 'xx',
      durationSec: 128,
    },
  ];

  async getMediaState(): Promise<MediaState> {
    await this.delay(50);
    return { ...this.state };
  }

  async play(query?: string): Promise<void> {
    await this.delay(100);

    if (query) {
      // Search for track in mock library
      const lowerQuery = query.toLowerCase();
      const track = this.mockTracks.find(
        t =>
          t.trackTitle.toLowerCase().includes(lowerQuery) ||
          t.artist.toLowerCase().includes(lowerQuery) ||
          t.album?.toLowerCase().includes(lowerQuery)
      );

      if (track) {
        this.state = {
          ...this.state,
          ...track,
          playing: true,
          positionSec: 0,
        };
      } else {
        // Play a random track if query doesn't match
        const randomTrack =
          this.mockTracks[Math.floor(Math.random() * this.mockTracks.length)];
        this.state = {
          ...this.state,
          ...randomTrack,
          playing: true,
          positionSec: 0,
        };
      }
    } else {
      // Resume current track or play a random one
      if (this.state.trackTitle === 'Nothing playing') {
        const randomTrack =
          this.mockTracks[Math.floor(Math.random() * this.mockTracks.length)];
        this.state = {
          ...this.state,
          ...randomTrack,
          playing: true,
          positionSec: 0,
        };
      } else {
        this.state.playing = true;
      }
    }
  }

  async pause(): Promise<void> {
    await this.delay(50);
    this.state.playing = false;
  }

  async skip(): Promise<void> {
    await this.delay(100);

    // Get next track (random for simplicity)
    const currentIndex = this.mockTracks.findIndex(
      t => t.trackTitle === this.state.trackTitle
    );
    const nextIndex = (currentIndex + 1) % this.mockTracks.length;
    const nextTrack = this.mockTracks[nextIndex];

    this.state = {
      ...this.state,
      ...nextTrack,
      positionSec: 0,
    };
  }

  async setVolume(percent: number): Promise<void> {
    await this.delay(50);
    this.state.volumePercent = Math.max(0, Math.min(100, percent));
  }

  async setOutputDevice(device: OutputDevice): Promise<void> {
    await this.delay(100);
    this.state.outputDevice = device;
  }

  // Simulate playback progress (call periodically if playing)
  updatePosition(deltaSec: number): void {
    if (this.state.playing) {
      this.state.positionSec = Math.min(
        this.state.positionSec + deltaSec,
        this.state.durationSec
      );

      // Auto-skip to next track when current ends
      if (this.state.positionSec >= this.state.durationSec) {
        this.skip();
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mediaService = new MockMediaService();
