import { create } from 'zustand';
import type { SystemSettings, Toast } from '@/models/types';

interface AppState {
  // System settings
  settings: SystemSettings;
  updateSettings: (settings: Partial<SystemSettings>) => void;
  toggleOfflineMode: () => void;
  toggleBezelMode: () => void;
  toggleWeekendMode: () => void;

  // Toasts/notifications
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type'], durationMs?: number) => void;
  removeToast: (id: string) => void;

  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Active call state
  activeCallId: string | null;
  setActiveCall: (callId: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial settings
  settings: {
    offlineMode: false,
    bezelMode: false,
    weekendMode: false,
    batteryPercent: 85,
    connectivity: {
      wifi: true,
      lte: true,
      bluetooth: true,
    },
  },

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),

  toggleOfflineMode: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        offlineMode: !state.settings.offlineMode,
        connectivity: {
          ...state.settings.connectivity,
          wifi: state.settings.offlineMode,
          lte: state.settings.offlineMode,
        },
      },
    })),

  toggleBezelMode: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        bezelMode: !state.settings.bezelMode,
      },
    })),

  toggleWeekendMode: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        weekendMode: !state.settings.weekendMode,
      },
    })),

  // Toasts
  toasts: [],

  addToast: (message, type = 'info', durationMs = 3000) => {
    const id = `toast-${Date.now()}`;
    const toast: Toast = { id, message, type, durationMs };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove after duration
    if (durationMs > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, durationMs);
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  // Loading
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  // Active call
  activeCallId: null,
  setActiveCall: (callId) => set({ activeCallId: callId }),
}));
