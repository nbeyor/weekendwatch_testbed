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
        {/* Header with buttons */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black">
          <button onClick={() => router.push('/watch')} className="flex items-center gap-1">
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <button className="btn-watch-outline !min-h-0 !py-1 px-2 text-xs flex-1 mr-1">
            RECENTS
          </button>
          <button className="btn-watch-outline !min-h-0 !py-1 px-2 text-xs flex-1">
            FAVORITES
          </button>
        </div>

        {/* CLI cursor */}
        <div className="flex-1 p-2">
          <div className="flex items-center">
            <span className="text-base">&gt;</span>
            <span className="cli-cursor"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
