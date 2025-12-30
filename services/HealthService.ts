import type {
  HealthEvent,
  HealthMetricSummary,
  HealthMetricType,
  SleepSession,
  WorkoutSession,
  Integration,
} from '@/models/types';
import {
  SEED_HEALTH_EVENTS,
  SEED_SLEEP_SESSIONS,
  SEED_WORKOUT_SESSIONS,
  SEED_INTEGRATIONS,
} from '@/models/seedData';

export interface HealthService {
  getIntegrations(): Promise<Integration[]>;
  syncIntegration(integrationId: string): Promise<void>;
  getHealthEvents(
    startDate?: Date,
    endDate?: Date,
    metricType?: HealthMetricType
  ): Promise<HealthEvent[]>;
  getSleepSessions(startDate?: Date, endDate?: Date): Promise<SleepSession[]>;
  getWorkoutSessions(startDate?: Date, endDate?: Date): Promise<WorkoutSession[]>;
  getMetricSummary(metricType: HealthMetricType): Promise<HealthMetricSummary>;
  getAllMetricSummaries(): Promise<HealthMetricSummary[]>;
}

export class MockHealthService implements HealthService {
  private integrations: Integration[] = [...SEED_INTEGRATIONS];
  private healthEvents: HealthEvent[] = [...SEED_HEALTH_EVENTS];
  private sleepSessions: SleepSession[] = [...SEED_SLEEP_SESSIONS];
  private workoutSessions: WorkoutSession[] = [...SEED_WORKOUT_SESSIONS];

  async getIntegrations(): Promise<Integration[]> {
    await this.delay(100);
    return [...this.integrations];
  }

  async syncIntegration(integrationId: string): Promise<void> {
    await this.delay(1000); // Simulate sync time

    const integration = this.integrations.find(i => i.id === integrationId);
    if (integration) {
      integration.status = 'syncing';

      // Simulate sync completion after delay
      setTimeout(() => {
        integration.status = 'connected';
        integration.lastSyncAt = new Date();
      }, 1000);
    }
  }

  async getHealthEvents(
    startDate?: Date,
    endDate?: Date,
    metricType?: HealthMetricType
  ): Promise<HealthEvent[]> {
    await this.delay(150);

    let filtered = [...this.healthEvents];

    if (startDate) {
      filtered = filtered.filter(e => e.timestamp >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter(e => e.timestamp <= endDate);
    }

    if (metricType) {
      filtered = filtered.filter(e => e.type === metricType);
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getSleepSessions(startDate?: Date, endDate?: Date): Promise<SleepSession[]> {
    await this.delay(100);

    let filtered = [...this.sleepSessions];

    if (startDate) {
      filtered = filtered.filter(s => s.startTime >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter(s => s.endTime <= endDate);
    }

    return filtered.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  async getWorkoutSessions(
    startDate?: Date,
    endDate?: Date
  ): Promise<WorkoutSession[]> {
    await this.delay(100);

    let filtered = [...this.workoutSessions];

    if (startDate) {
      filtered = filtered.filter(w => w.startTime >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter(w => w.endTime <= endDate);
    }

    return filtered.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  async getMetricSummary(metricType: HealthMetricType): Promise<HealthMetricSummary> {
    await this.delay(100);

    const events = await this.getHealthEvents(undefined, undefined, metricType);

    if (events.length === 0) {
      return {
        type: metricType,
        unit: this.getUnitForMetric(metricType),
      };
    }

    const values = events.map(e => e.value);
    const currentValue = events[0]?.value;
    const avgValue = values.reduce((sum, v) => sum + v, 0) / values.length;
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Calculate trend (simplified)
    const recentAvg = values.slice(0, 3).reduce((sum, v) => sum + v, 0) / Math.min(3, values.length);
    const olderAvg = values.slice(3, 6).reduce((sum, v) => sum + v, 0) / Math.min(3, values.slice(3).length);
    const trend = recentAvg > olderAvg ? 'up' : recentAvg < olderAvg ? 'down' : 'stable';

    return {
      type: metricType,
      currentValue,
      avgValue: Math.round(avgValue * 10) / 10,
      minValue,
      maxValue,
      unit: events[0].unit,
      trend,
      lastUpdated: events[0].timestamp,
    };
  }

  async getAllMetricSummaries(): Promise<HealthMetricSummary[]> {
    await this.delay(200);

    const metricTypes: HealthMetricType[] = [
      'heartRate',
      'hrv',
      'steps',
      'sleep',
      'calories',
      'spo2',
      'temperature',
    ];

    const summaries = await Promise.all(
      metricTypes.map(type => this.getMetricSummary(type))
    );

    return summaries.filter(s => s.currentValue !== undefined);
  }

  // Add a new health event (for testing)
  async addHealthEvent(event: Omit<HealthEvent, 'id'>): Promise<HealthEvent> {
    await this.delay(100);

    const newEvent: HealthEvent = {
      ...event,
      id: `health-${Date.now()}`,
    };

    this.healthEvents.push(newEvent);
    return newEvent;
  }

  private getUnitForMetric(type: HealthMetricType): string {
    const unitMap: Record<HealthMetricType, string> = {
      heartRate: 'bpm',
      hrv: 'ms',
      steps: 'steps',
      sleep: 'min',
      workout: 'min',
      calories: 'kcal',
      distance: 'mi',
      respiratoryRate: 'brpm',
      spo2: '%',
      bloodPressure: 'mmHg',
      temperature: '°F',
    };

    return unitMap[type] || '';
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const healthService = new MockHealthService();
