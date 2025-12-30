'use client';

import React, { useEffect, useState } from 'react';
import { healthService } from '@/services/HealthService';
import { getQueueCount } from '@/lib/db';
import type { HealthMetricSummary, Integration, SleepSession, WorkoutSession } from '@/models/types';
import { Activity, Moon, Dumbbell, TrendingUp, Clock, Database, CheckCircle, AlertCircle } from 'lucide-react';

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
    setSleepSessions(sleep.slice(0, 1));
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of WeekendWatch health data and system status
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Steps */}
        <div className="admin-stat">
          <div className="flex items-center justify-between mb-3">
            <div className="admin-stat-label flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Steps Today
            </div>
          </div>
          <div className="admin-stat-value text-admin-primary">
            {stepsMetric?.currentValue?.toLocaleString() || '—'}
          </div>
          {stepsMetric?.avgValue && (
            <div className="text-sm text-gray-600 mt-2">
              7-day avg: <span className="font-semibold">{stepsMetric.avgValue.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Heart Rate */}
        <div className="admin-stat">
          <div className="flex items-center justify-between mb-3">
            <div className="admin-stat-label flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Avg Heart Rate
            </div>
          </div>
          <div className="admin-stat-value text-admin-danger">
            {hrMetric?.avgValue?.toFixed(0) || '—'}
            {hrMetric && <span className="text-xl ml-2">bpm</span>}
          </div>
          {hrMetric?.currentValue && (
            <div className="text-sm text-gray-600 mt-2">
              Current: <span className="font-semibold">{hrMetric.currentValue} bpm</span>
            </div>
          )}
        </div>

        {/* Sleep */}
        <div className="admin-stat">
          <div className="flex items-center justify-between mb-3">
            <div className="admin-stat-label flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Last Night Sleep
            </div>
          </div>
          <div className="admin-stat-value text-admin-secondary">
            {sleepLatest?.score || '—'}
            {sleepLatest && <span className="text-xl ml-2">/100</span>}
          </div>
          {sleepLatest && (
            <div className="text-sm text-gray-600 mt-2">
              Duration: <span className="font-semibold">{(sleepLatest.durationMin / 60).toFixed(1)}h</span>
            </div>
          )}
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Workouts */}
        <div className="admin-card">
          <div className="admin-card-header flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-admin-success" />
            Recent Workouts
          </div>

          {workouts.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent workouts</p>
          ) : (
            <div className="space-y-3">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="border border-admin-border rounded p-3 hover:border-admin-primary transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">{workout.type}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {workout.durationMin} min • {workout.calories} cal
                        {workout.distance && ` • ${workout.distance} mi`}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {workout.startTime.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Integration Status */}
        <div className="admin-card">
          <div className="admin-card-header flex items-center gap-2">
            <Clock className="w-5 h-5 text-admin-warning" />
            Integration Status
          </div>

          <div className="space-y-3">
            {integrations.map((int) => (
              <div
                key={int.id}
                className="border border-admin-border rounded p-3 hover:border-admin-primary transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {int.status === 'connected' ? (
                      <CheckCircle className="w-5 h-5 text-admin-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-admin-warning" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{int.name}</div>
                      {int.lastSyncAt && (
                        <div className="text-xs text-gray-500">
                          Last sync: {int.lastSyncAt.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`admin-badge ${
                      int.status === 'connected'
                        ? 'admin-badge-success'
                        : 'admin-badge-warning'
                    }`}
                  >
                    {int.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offline Queue Alert */}
      {queueCount > 0 && (
        <div className="admin-card border-l-4 border-admin-warning bg-orange-50">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-admin-warning mt-0.5" />
            <div>
              <div className="font-semibold text-gray-900">
                {queueCount} items in offline queue
              </div>
              <div className="text-sm text-gray-600 mt-1">
                These items will sync automatically when the device is back online
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
