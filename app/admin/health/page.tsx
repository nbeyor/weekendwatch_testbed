'use client';

import React, { useEffect, useState } from 'react';
import { healthService } from '@/services/HealthService';
import { LineChart } from '@/components/admin/LineChart';
import type { HealthEvent, HealthMetricType, SleepSession, WorkoutSession } from '@/models/types';
import { Calendar, Download } from 'lucide-react';

export default function AdminHealthPage() {
  const [events, setEvents] = useState<HealthEvent[]>([]);
  const [sleepSessions, setSleepSessions] = useState<SleepSession[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<HealthMetricType>('heartRate');
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    loadData();
  }, [selectedMetric, dateRange]);

  const loadData = async () => {
    const now = new Date();
    let startDate = new Date();

    switch (dateRange) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setDate(now.getDate() - 30);
        break;
    }

    const [eventsData, sleepData, workoutData] = await Promise.all([
      healthService.getHealthEvents(startDate, now, selectedMetric),
      healthService.getSleepSessions(startDate, now),
      healthService.getWorkoutSessions(startDate, now),
    ]);

    setEvents(eventsData);
    setSleepSessions(sleepData);
    setWorkouts(workoutData);
  };

  const metricTypes: HealthMetricType[] = [
    'heartRate',
    'hrv',
    'steps',
    'calories',
    'spo2',
    'temperature',
  ];

  // Prepare chart data
  const chartData = events.slice(0, 20).reverse().map((event) => ({
    label: new Date(event.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    value: event.value,
  }));

  const handleExport = () => {
    const data = {
      events,
      sleepSessions,
      workouts,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Health Data</h2>
          <p className="text-sm text-gray-dark">
            Consolidated health metrics and analytics
          </p>
        </div>
        <button onClick={handleExport} className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Controls */}
      <div className="card space-y-3">
        <div>
          <label className="text-sm font-medium mb-2 block">Metric Type</label>
          <div className="flex flex-wrap gap-2">
            {metricTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMetric(type)}
                className={`px-3 py-1 border-2 border-black text-sm ${
                  selectedMetric === type ? 'bg-black text-white' : 'bg-white'
                }`}
              >
                {type.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Time Range</label>
          <div className="flex gap-2">
            {(['day', 'week', 'month'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 border-2 border-black text-sm capitalize ${
                  dateRange === range ? 'bg-black text-white' : 'bg-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <LineChart
          series={[
            {
              name: selectedMetric,
              data: chartData,
              style: 'solid',
            },
          ]}
          width={800}
          height={300}
          yAxisLabel={events[0]?.unit || ''}
        />
      ) : (
        <div className="card text-center text-gray-dark">
          No data available for selected metric
        </div>
      )}

      {/* Sleep sessions */}
      {sleepSessions.length > 0 && (
        <div className="card">
          <h3 className="font-bold mb-3">Sleep Sessions</h3>
          <div className="space-y-2">
            {sleepSessions.map((session) => (
              <div key={session.id} className="border border-black p-3">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">
                    {session.startTime.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="text-sm">
                    Score: <strong>{session.score}/100</strong>
                  </div>
                </div>
                <div className="text-sm text-gray-dark">
                  Duration: {(session.durationMin / 60).toFixed(1)}h
                </div>
                {session.stages && (
                  <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <div className="text-gray-dark">Deep</div>
                      <div>{session.stages.deep}m</div>
                    </div>
                    <div>
                      <div className="text-gray-dark">Light</div>
                      <div>{session.stages.light}m</div>
                    </div>
                    <div>
                      <div className="text-gray-dark">REM</div>
                      <div>{session.stages.rem}m</div>
                    </div>
                    <div>
                      <div className="text-gray-dark">Awake</div>
                      <div>{session.stages.awake}m</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw events table */}
      <div className="card">
        <h3 className="font-bold mb-3">Raw Event Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b-2 border-black">
              <tr>
                <th className="text-left p-2">Timestamp</th>
                <th className="text-left p-2">Type</th>
                <th className="text-right p-2">Value</th>
                <th className="text-left p-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 20).map((event) => (
                <tr key={event.id} className="border-b border-black">
                  <td className="p-2">
                    {event.timestamp.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="p-2">{event.type}</td>
                  <td className="p-2 text-right">
                    {event.value} {event.unit}
                  </td>
                  <td className="p-2 text-xs text-gray-dark">
                    {event.sourceIntegrationId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
