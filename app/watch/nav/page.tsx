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
          <div className="flex items-center justify-between mb-2">
            <div className="meta-text">GOOGLE MAPS</div>
            <button onClick={handleClearRoute}>
              <X size={16} strokeWidth={2} />
            </button>
          </div>

          {/* ETA and Distance */}
          <div className="text-center mb-3">
            <div className="time-large">{activeRoute.totalEtaMin} min</div>
            <div className="meta-text mt-1">
              {activeRoute.totalDistanceMiles.toFixed(1)} MI • {activeRoute.destinationLabel.toUpperCase()}
            </div>
          </div>

          {/* Giant direction arrow */}
          <div className="flex-1 flex items-center justify-center">
            <DirectionIcon size={72} strokeWidth={1.5} />
          </div>

          {/* Current instruction */}
          <div className="text-center mb-3">
            <div className="text-2xl font-bold mb-1">{currentStep.distance}</div>
            <div className="action-text">{currentStep.instruction}</div>
          </div>

          {/* Next step button or arrival */}
          {isLastStep ? (
            <div className="border-2 border-black p-3 text-center">
              <div className="text-lg font-bold">You've Arrived!</div>
              <button
                onClick={handleClearRoute}
                className="btn-watch mt-2"
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
          <div className="meta-text text-center mt-2">
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
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => router.push('/watch')}>
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <div className="meta-text">GOOGLE MAPS</div>
          <div className="w-4" />
        </div>

        {/* Voice prompt */}
        <div className="text-center mb-3 pb-2 border-b-2 border-black">
          <div className="text-xl font-bold mb-1">Where to?</div>
          <div className="text-sm opacity-60">Say "navigate to [place]"</div>
        </div>

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter destination..."
            className="w-full px-2 py-2 border-2 border-black text-base mb-2"
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
          <div className="meta-text mb-2">QUICK DESTINATIONS</div>
          <div className="space-y-1">
            {['Home', 'Work', 'Gym', 'Coffee Shop'].map((dest) => (
              <button
                key={dest}
                onClick={() => handleQuickDest(dest)}
                className="w-full border-2 border-black p-2 flex items-center gap-2 active:opacity-50"
              >
                <MapPin size={16} strokeWidth={2} />
                <span className="text-base font-medium">{dest}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
