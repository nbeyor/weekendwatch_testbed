'use client';

import React, { useState, useEffect } from 'react';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { navService } from '@/services/NavService';
import type { NavRoute } from '@/models/types';
import { Navigation, MapPin, ArrowRight } from 'lucide-react';

export default function NavPage() {
  const [activeRoute, setActiveRoute] = useState<NavRoute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    setActiveRoute(navService.getActiveRoute());
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

  const currentStep = activeRoute?.steps[currentStepIndex];
  const nextStep = activeRoute?.steps[currentStepIndex + 1];

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Navigation" showBack backHref="/watch" />

      <main className="flex-1 overflow-auto p-3">
        {!activeRoute ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              <h2 className="text-lg font-bold">Where to?</h2>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search destination..."
                className="input"
              />
              <button onClick={handleSearch} className="btn-primary w-full">
                Search
              </button>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Recent</h3>
              <div className="space-y-2">
                {['Home', 'Office', 'Blue Bottle Coffee'].map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      setSearchQuery(dest);
                      setTimeout(handleSearch, 100);
                    }}
                    className="w-full border border-black p-2 flex items-center gap-2 hover:bg-hatch-pattern"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{dest}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-black p-3">
              <div className="text-xs text-gray-dark mb-1">Destination</div>
              <div className="font-bold">{activeRoute.destinationLabel}</div>
              <div className="text-sm text-gray-dark mt-1">
                {activeRoute.totalDistanceMiles.toFixed(1)} mi • {activeRoute.totalEtaMin} min
              </div>
            </div>

            {currentStep && (
              <div className="card bg-black text-white">
                <div className="text-xs opacity-70 mb-1">Current Step</div>
                <div className="font-medium mb-2">{currentStep.instruction}</div>
                <div className="text-sm">
                  {currentStep.distance} • ~{currentStep.etaMin} min
                </div>
              </div>
            )}

            {nextStep && (
              <div className="border border-black p-3">
                <div className="text-xs text-gray-dark mb-1">Next</div>
                <div className="text-sm">{nextStep.instruction}</div>
              </div>
            )}

            <div className="flex gap-2">
              {currentStepIndex < activeRoute.steps.length - 1 ? (
                <button onClick={handleNextStep} className="btn-primary flex-1">
                  Next Step <ArrowRight className="w-4 h-4 inline ml-1" />
                </button>
              ) : (
                <div className="card w-full text-center">
                  <div className="font-medium">Arrived!</div>
                </div>
              )}
            </div>

            <button onClick={handleClearRoute} className="btn-secondary w-full">
              Clear Route
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
