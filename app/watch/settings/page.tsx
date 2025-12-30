'use client';

import React from 'react';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { useAppStore } from '@/stores/useAppStore';
import { ListItem } from '@/components/ui/ListItem';
import { Power, Box, Minimize, Wifi, Battery, Bluetooth } from 'lucide-react';

export default function SettingsPage() {
  const settings = useAppStore((state) => state.settings);
  const toggleOfflineMode = useAppStore((state) => state.toggleOfflineMode);
  const toggleBezelMode = useAppStore((state) => state.toggleBezelMode);
  const toggleWeekendMode = useAppStore((state) => state.toggleWeekendMode);
  const updateSettings = useAppStore((state) => state.updateSettings);

  const handleBatteryChange = (delta: number) => {
    const newPercent = Math.max(0, Math.min(100, settings.batteryPercent + delta));
    updateSettings({ batteryPercent: newPercent });
  };

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Settings" showBack backHref="/watch" />

      <main className="flex-1 overflow-auto">
        {/* Display Modes */}
        <div className="border-b-2 border-black">
          <div className="p-3 border-b border-black">
            <h3 className="font-bold text-sm">Display Modes</h3>
          </div>

          <ListItem onClick={toggleBezelMode} showChevron={false}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Box className="w-5 h-5" />
                <div>
                  <div className="font-medium">Bezel Frame</div>
                  <div className="text-xs text-gray-dark">
                    Show device outline
                  </div>
                </div>
              </div>
              <div
                className={`w-12 h-6 border-2 border-black relative transition-all ${
                  settings.bezelMode ? 'bg-black' : 'bg-white'
                }`}
              >
                <div
                  className={`absolute top-0 w-6 h-full border-r-2 border-black transition-all ${
                    settings.bezelMode
                      ? 'right-0 bg-white'
                      : 'left-0 bg-black'
                  }`}
                />
              </div>
            </div>
          </ListItem>

          <ListItem onClick={toggleWeekendMode} showChevron={false}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Minimize className="w-5 h-5" />
                <div>
                  <div className="font-medium">Weekend Mode</div>
                  <div className="text-xs text-gray-dark">
                    Essential apps only
                  </div>
                </div>
              </div>
              <div
                className={`w-12 h-6 border-2 border-black relative transition-all ${
                  settings.weekendMode ? 'bg-black' : 'bg-white'
                }`}
              >
                <div
                  className={`absolute top-0 w-6 h-full border-r-2 border-black transition-all ${
                    settings.weekendMode
                      ? 'right-0 bg-white'
                      : 'left-0 bg-black'
                  }`}
                />
              </div>
            </div>
          </ListItem>
        </div>

        {/* Connectivity */}
        <div className="border-b-2 border-black">
          <div className="p-3 border-b border-black">
            <h3 className="font-bold text-sm">Connectivity</h3>
          </div>

          <ListItem onClick={toggleOfflineMode} showChevron={false}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Power className="w-5 h-5" />
                <div>
                  <div className="font-medium">Offline Mode</div>
                  <div className="text-xs text-gray-dark">
                    {settings.offlineMode
                      ? 'Messages will be queued'
                      : 'All services online'}
                  </div>
                </div>
              </div>
              <div
                className={`w-12 h-6 border-2 border-black relative transition-all ${
                  settings.offlineMode ? 'bg-black' : 'bg-white'
                }`}
              >
                <div
                  className={`absolute top-0 w-6 h-full border-r-2 border-black transition-all ${
                    settings.offlineMode
                      ? 'right-0 bg-white'
                      : 'left-0 bg-black'
                  }`}
                />
              </div>
            </div>
          </ListItem>

          <ListItem showChevron={false}>
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">Wi-Fi</div>
                <div className="text-xs text-gray-dark">
                  {settings.connectivity.wifi ? 'Connected' : 'Disconnected'}
                </div>
              </div>
            </div>
          </ListItem>

          <ListItem showChevron={false}>
            <div className="flex items-center gap-3">
              <Bluetooth className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">Bluetooth</div>
                <div className="text-xs text-gray-dark">
                  {settings.connectivity.bluetooth ? 'On' : 'Off'}
                </div>
              </div>
            </div>
          </ListItem>
        </div>

        {/* Battery Simulator */}
        <div className="border-b-2 border-black">
          <div className="p-3 border-b border-black">
            <h3 className="font-bold text-sm">Battery Simulator</h3>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-3 mb-3">
              <Battery className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">{settings.batteryPercent}%</div>
                <div className="h-2 border border-black mt-1">
                  <div
                    className="h-full bg-black transition-all"
                    style={{ width: `${settings.batteryPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleBatteryChange(-10)}
                className="btn-secondary flex-1"
              >
                -10%
              </button>
              <button
                onClick={() => handleBatteryChange(10)}
                className="btn-secondary flex-1"
              >
                +10%
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <div className="text-xs text-gray-dark space-y-1">
            <p>WeekendWatch V1</p>
            <p>Monochrome E-ink Demo</p>
            <p>© 2025</p>
          </div>
        </div>
      </main>
    </div>
  );
}
