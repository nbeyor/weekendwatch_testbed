'use client';

import React, { useEffect, useState } from 'react';
import { healthService } from '@/services/HealthService';
import { getQueueCount } from '@/lib/db';
import type { HealthMetricSummary, Integration, SleepSession, WorkoutSession } from '@/models/types';
import { Activity, Moon, Dumbbell, TrendingUp, Clock, Database } from 'lucide-react';

export default function AdminDashboard() {
  const [summaries, setSummaries] = useState<HealthMetricSummary[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [sleepSessions, setSleepSessions] = useState<SleepSession[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [summ, ints, sleep, work, queue] = await Promise.all([
      healthService.getAllMetricSummaries(),
      healthService.getIntegrations(),
      healthService.getSleepSessions(),
      healthService.getWorkoutSessions(),
      getQueueCount(),
    ]);

    setSummaries(summ);
    setIntegrations(ints);
    setSleepSessions(sleep.slice(0, 1)); // Latest only
    setWorkouts(work.slice(0, 3));
    setQueueCount(queue);
  };

  const getMetric = (type: string) => {
    return summaries.find((s) => s.type === type);
  };

  const stepsMetric = getMetric('steps');
  const hrMetric = getMetric('heartRate');
  const sleepLatest = sleepSessions[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
        <p className="text-sm text-gray-dark">
          Overview of health data and system status
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-xs text-gray-dark">Steps Today</span>
          </div>
          <div className="text-2xl font-bold">
            {stepsMetric?.currentValue?.toLocaleString() || '—'}
          </div>
          {stepsMetric?.avgValue && (
            <div className="text-xs text-gray-dark mt-1">
              Avg: {stepsMetric.avgValue.toLocaleString()}
            </div>
          )}
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs text-gray-dark">Avg Heart Rate</span>
          </div>
          <div className="text-2xl font-bold">
            {hrMetric?.avgValue?.toFixed(0) || '—'}{' '}
            {hrMetric && <span className="text-sm">bpm</span>}
          </div>
          {hrMetric?.currentValue && (
            <div className="text-xs text-gray-dark mt-1">
              Current: {hrMetric.currentValue}
            </div>
          )}
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Moon className="w-4 h-4" />
            <span className="text-xs text-gray-dark">Last Night Sleep</span>
          </div>
          <div className="text-2xl font-bold">
            {sleepLatest?.score || '—'}
            {sleepLatest && <span className="text-sm">/100</span>}
          </div>
          {sleepLatest && (
            <div className="text-xs text-gray-dark mt-1">
              {(sleepLatest.durationMin / 60).toFixed(1)}h
            </div>
          )}
        </div>
      </div>

      {/* Recent workouts */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Dumbbell className="w-4 h-4" />
          <h3 className="font-bold">Recent Workouts</h3>
        </div>

        {workouts.length === 0 ? (
          <p className="text-sm text-gray-dark">No recent workouts</p>
        ) : (
          <div className="space-y-2">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="border border-black p-2 flex justify-between items-start"
              >
                <div>
                  <div className="font-medium text-sm">{workout.type}</div>
                  <div className="text-xs text-gray-dark">
                    {workout.durationMin} min • {workout.calories} cal
                    {workout.distance && ` • ${workout.distance} mi`}
                  </div>
                </div>
                <div className="text-xs text-gray-dark">
                  {workout.startTime.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integrations status */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4" />
          <h3 className="font-bold">Integration Status</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {integrations.map((int) => (
            <div key={int.id} className="border border-black p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{int.name}</span>
                <span
                  className={`text-xs px-1 border ${
                    int.status === 'connected' ? 'border-black' : 'border-gray-dark'
                  }`}
                >
                  {int.status}
                </span>
              </div>
              {int.lastSyncAt && (
                <div className="text-xs text-gray-dark">
                  {int.lastSyncAt.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Queue status */}
      {queueCount > 0 && (
        <div className="card border-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <div>
              <div className="font-medium text-sm">
                {queueCount} items in offline queue
              </div>
              <div className="text-xs text-gray-dark">
                Will sync when online
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
