'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUp,
  ArrowRight as ArrowRightIcon,
  ArrowDown,
  MapPin,
  X,
} from 'lucide-react';
import { navService } from '@/services/NavService';
import type { NavRoute } from '@/models/types';

export default function NavPage() {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<NavRoute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const route = navService.getActiveRoute();
    setActiveRoute(route);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const results = await navService.searchDestination(searchQuery);
      if (results.length > 0) {
        const route = await navService.createRoute(results[0].id);
        setActiveRoute(route);
        setCurrentStepIndex(0);
        setSearchQuery('');
      }
    } catch (error) {
      console.error('Failed to create route:', error);
    }
  };

  const handleQuickDest = async (dest: string) => {
    setSearchQuery(dest);
    setTimeout(async () => {
      const results = await navService.searchDestination(dest);
      if (results.length > 0) {
        const route = await navService.createRoute(results[0].id);
        setActiveRoute(route);
        setCurrentStepIndex(0);
      }
    }, 100);
  };

  const handleNextStep = () => {
    if (activeRoute && currentStepIndex < activeRoute.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleClearRoute = () => {
    navService.clearRoute();
    setActiveRoute(null);
    setCurrentStepIndex(0);
  };

  const getDirectionIcon = (instruction: string) => {
    const lower = instruction.toLowerCase();
    if (lower.includes('left')) return ArrowLeft;
    if (lower.includes('right')) return ArrowRightIcon;
    if (lower.includes('straight') || lower.includes('continue')) return ArrowUp;
    return ArrowUp;
  };

  const currentStep = activeRoute?.steps[currentStepIndex];
  const DirectionIcon = currentStep ? getDirectionIcon(currentStep.instruction) : ArrowUp;

  // Active navigation view
  if (activeRoute && currentStep) {
    const isLastStep = currentStepIndex === activeRoute.steps.length - 1;

    return (
      <div className="watch-container">
        <div className="watch-mode">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="meta-text">GOOGLE MAPS</div>
            <button onClick={handleClearRoute}>
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          {/* ETA and Distance */}
          <div className="text-center mb-6">
            <div className="time-large">{activeRoute.totalEtaMin} min</div>
            <div className="meta-text mt-1">
              {activeRoute.totalDistanceMiles.toFixed(1)} MI • {activeRoute.destinationLabel.toUpperCase()}
            </div>
          </div>

          {/* Giant direction arrow */}
          <div className="flex-1 flex items-center justify-center">
            <DirectionIcon size={120} strokeWidth={1.5} />
          </div>

          {/* Current instruction */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold mb-2">{currentStep.distance}</div>
            <div className="action-text">{currentStep.instruction}</div>
          </div>

          {/* Next step button or arrival */}
          {isLastStep ? (
            <div className="border-2 border-black p-6 text-center">
              <div className="text-lg font-bold">You've Arrived!</div>
              <button
                onClick={handleClearRoute}
                className="btn-watch mt-4"
              >
                DONE
              </button>
            </div>
          ) : (
            <button
              onClick={handleNextStep}
              className="btn-watch"
            >
              NEXT STEP
            </button>
          )}

          {/* Step indicator */}
          <div className="meta-text text-center mt-4">
            STEP {currentStepIndex + 1} OF {activeRoute.steps.length}
          </div>
        </div>
      </div>
    );
  }

  // Search view
  return (
    <div className="watch-container">
      <div className="watch-mode">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push('/watch')}>
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <div className="meta-text">GOOGLE MAPS</div>
          <div className="w-6" />
        </div>

        {/* Voice prompt */}
        <div className="text-center mb-6 pb-4 border-b-2 border-black">
          <div className="text-xl font-bold mb-2">Where to?</div>
          <div className="text-sm opacity-60">Say "navigate to [place]"</div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter destination..."
            className="w-full px-4 py-4 border-3 border-black text-lg mb-3"
            autoFocus
          />
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            className="btn-watch"
          >
            START
          </button>
        </div>

        {/* Quick destinations */}
        <div className="flex-1 overflow-auto">
          <div className="meta-text mb-3">QUICK DESTINATIONS</div>
          <div className="space-y-2">
            {['Home', 'Work', 'Gym', 'Coffee Shop'].map((dest) => (
              <button
                key={dest}
                onClick={() => handleQuickDest(dest)}
                className="w-full border-2 border-black p-4 flex items-center gap-3 active:opacity-50"
              >
                <MapPin size={24} strokeWidth={2} />
                <span className="text-lg font-medium">{dest}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
