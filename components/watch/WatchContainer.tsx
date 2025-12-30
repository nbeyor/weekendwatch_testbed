'use client';

import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { ToastContainer } from '@/components/ui/Toast';

interface WatchContainerProps {
  children: React.ReactNode;
}

export function WatchContainer({ children }: WatchContainerProps) {
  const bezelMode = useAppStore((state) => state.settings.bezelMode);

  if (bezelMode) {
    return (
      <>
        <div className="watch-bezel">
          <div className="watch-bezel-screen">
            <div className="watch-container min-h-screen">{children}</div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div className="watch-container min-h-screen">{children}</div>
      <ToastContainer />
    </>
  );
}
