'use client';

import React, { useEffect, useState } from 'react';
import { WatchHeader } from '@/components/watch/WatchHeader';
import { healthService } from '@/services/HealthService';
import type { HealthMetricSummary } from '@/models/types';
import { Activity, Heart, TrendingUp, TrendingDown, Minus, Loader } from 'lucide-react';

export default function HealthPage() {
  const [summaries, setSummaries] = useState<HealthMetricSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await healthService.getAllMetricSummaries();
      setSummaries(data);
    } catch (error) {
      console.error('Failed to load health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />;
      case 'down':
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const formatMetricName = (type: string): string => {
    return type.replace(/([A-Z])/g, ' $1').trim();
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <WatchHeader title="Health" showBack backHref="/watch" />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <WatchHeader title="Health Summary" showBack backHref="/watch" />

      <main className="flex-1 overflow-auto p-3 space-y-3">
        {summaries.length === 0 ? (
          <div className="text-center text-gray-dark text-sm">
            No health data available
          </div>
        ) : (
          <>
            {summaries.map((summary) => (
              <div key={summary.type} className="card">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {summary.type === 'heartRate' ? (
                      <Heart className="w-4 h-4" />
                    ) : (
                      <Activity className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium capitalize">
                      {formatMetricName(summary.type)}
                    </span>
                  </div>
                  {summary.trend && getTrendIcon(summary.trend)}
                </div>

                <div className="space-y-1">
                  {summary.currentValue !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-dark">Current:</span>
                      <span className="font-medium">
                        {summary.currentValue} {summary.unit}
                      </span>
                    </div>
                  )}
                  {summary.avgValue !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-dark">Average:</span>
                      <span>{summary.avgValue} {summary.unit}</span>
                    </div>
                  )}
                  {summary.lastUpdated && (
                    <div className="text-xs text-gray-dark mt-1">
                      Updated{' '}
                      {summary.lastUpdated.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="text-center mt-4">
              <a
                href="/admin/health"
                target="_blank"
                className="text-sm text-gray-dark underline"
              >
                View detailed analytics in Admin Console →
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
