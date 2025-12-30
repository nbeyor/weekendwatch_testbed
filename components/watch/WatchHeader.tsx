'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Bluetooth, Battery } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import Link from 'next/link';

interface WatchHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export function WatchHeader({ title, showBack, backHref }: WatchHeaderProps) {
  const settings = useAppStore((state) => state.settings);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getBatteryIcon = (percent: number) => {
    // Return text indicator for battery level
    if (percent > 75) return '█';
    if (percent > 50) return '▓';
    if (percent > 25) return '▒';
    return '░';
  };

  return (
    <header className="border-b-2 border-black p-3 bg-white">
      <div className="flex items-center justify-between">
        {/* Left: Back button or time */}
        <div className="flex-1">
          {showBack && backHref ? (
            <Link href={backHref} className="text-sm font-medium hover:opacity-70">
              ← Back
            </Link>
          ) : (
            <div className="text-sm font-medium">{formatTime(currentTime)}</div>
          )}
        </div>

        {/* Center: Title */}
        {title && (
          <div className="flex-1 text-center">
            <h1 className="text-sm font-bold truncate">{title}</h1>
          </div>
        )}

        {/* Right: Connectivity & Battery */}
        <div className="flex-1 flex items-center justify-end gap-2">
          {settings.connectivity.wifi && (
            <Wifi className="w-3 h-3" strokeWidth={2} />
          )}
          {settings.connectivity.lte && (
            <Signal className="w-3 h-3" strokeWidth={2} />
          )}
          {settings.connectivity.bluetooth && (
            <Bluetooth className="w-3 h-3" strokeWidth={2} />
          )}
          <div className="flex items-center gap-1">
            <span className="text-xs">{getBatteryIcon(settings.batteryPercent)}</span>
            <span className="text-xs font-medium">{settings.batteryPercent}%</span>
          </div>
        </div>
      </div>
    </header>
  );
}
