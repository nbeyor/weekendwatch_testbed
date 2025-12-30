'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Phone, Navigation, CreditCard, Music, Heart, Settings } from 'lucide-react';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { useAppStore } from '@/stores/useAppStore';

export default function WatchHomePage() {
  const weekendMode = useAppStore((state) => state.settings.weekendMode);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const primaryTiles = [
    {
      href: '/watch/comm',
      icon: MessageSquare,
      label: 'Comms',
      show: true,
    },
    {
      href: '/watch/nav',
      icon: Navigation,
      label: 'Nav',
      show: true,
    },
    {
      href: '/watch/pay',
      icon: CreditCard,
      label: 'Pay',
      show: true,
    },
    {
      href: '/watch/media',
      icon: Music,
      label: 'Media',
      show: !weekendMode,
    },
  ];

  const secondaryTiles = [
    {
      href: '/watch/health',
      icon: Heart,
      label: 'Health',
      show: !weekendMode,
    },
    {
      href: '/watch/settings',
      icon: Settings,
      label: 'Settings',
      show: !weekendMode,
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader />

      <main className="flex-1 overflow-auto p-4">
        {/* Date display */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {currentDate.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </h2>
          <p className="text-sm text-gray-dark">{formatDate(currentDate)}</p>
        </div>

        {weekendMode && (
          <div className="mb-4 border border-black p-2 text-center">
            <p className="text-xs font-medium">Weekend Mode Active</p>
          </div>
        )}

        {/* Primary tiles grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {primaryTiles
            .filter((tile) => tile.show)
            .map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className="card aspect-square flex flex-col items-center justify-center gap-2 hover:bg-hatch-pattern transition-all active:opacity-50"
              >
                <tile.icon className="w-8 h-8" strokeWidth={1.5} />
                <span className="text-sm font-medium">{tile.label}</span>
              </Link>
            ))}
        </div>

        {/* Secondary tiles */}
        {!weekendMode && (
          <div className="grid grid-cols-2 gap-3">
            {secondaryTiles
              .filter((tile) => tile.show)
              .map((tile) => (
                <Link
                  key={tile.href}
                  href={tile.href}
                  className="border border-black p-3 flex items-center gap-2 hover:bg-hatch-pattern transition-all active:opacity-50"
                >
                  <tile.icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{tile.label}</span>
                </Link>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
