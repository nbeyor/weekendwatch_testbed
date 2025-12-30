import type { NavRoute, Destination, NavStep } from '@/models/types';
import { SEED_DESTINATIONS } from '@/models/seedData';

export interface NavService {
  getRecentDestinations(): Promise<Destination[]>;
  searchDestination(query: string): Promise<Destination[]>;
  createRoute(destinationId: string): Promise<NavRoute>;
  getActiveRoute(): NavRoute | null;
  clearRoute(): void;
}

export class MockNavService implements NavService {
  private destinations: Destination[] = [...SEED_DESTINATIONS];
  private activeRoute: NavRoute | null = null;
  private currentStepIndex: number = 0;

  async getRecentDestinations(): Promise<Destination[]> {
    await this.delay(100);
    return [...this.destinations].sort((a, b) => {
      const aTime = a.lastUsedAt?.getTime() || 0;
      const bTime = b.lastUsedAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async searchDestination(query: string): Promise<Destination[]> {
    await this.delay(200);

    const lowerQuery = query.toLowerCase();

    // Return existing destinations that match
    const existing = this.destinations.filter(dest =>
      dest.label.toLowerCase().includes(lowerQuery) ||
      dest.address.toLowerCase().includes(lowerQuery)
    );

    // If no exact match, create a mock result
    if (existing.length === 0 && query.length > 2) {
      return [
        {
          id: `dest-search-${Date.now()}`,
          label: query,
          address: `${query}, San Francisco, CA`,
          lastUsedAt: new Date(),
        },
      ];
    }

    return existing;
  }

  async createRoute(destinationId: string): Promise<NavRoute> {
    await this.delay(300);

    const destination = this.destinations.find(d => d.id === destinationId);
    if (!destination) {
      throw new Error('Destination not found');
    }

    // Generate mock navigation steps
    const steps: NavStep[] = this.generateMockSteps(destination);

    const route: NavRoute = {
      id: `route-${Date.now()}`,
      destinationLabel: destination.label,
      steps,
      totalDistanceMiles: steps.reduce(
        (sum, step) => sum + this.parseDistance(step.distance),
        0
      ),
      totalEtaMin: steps.reduce((sum, step) => sum + step.etaMin, 0),
      createdAt: new Date(),
    };

    this.activeRoute = route;
    this.currentStepIndex = 0;

    // Update destination last used
    destination.lastUsedAt = new Date();

    return route;
  }

  getActiveRoute(): NavRoute | null {
    return this.activeRoute;
  }

  getCurrentStep(): NavStep | null {
    if (!this.activeRoute) return null;
    return this.activeRoute.steps[this.currentStepIndex] || null;
  }

  getNextStep(): NavStep | null {
    if (!this.activeRoute) return null;
    const nextIndex = this.currentStepIndex + 1;
    return this.activeRoute.steps[nextIndex] || null;
  }

  advanceToNextStep(): void {
    if (this.activeRoute && this.currentStepIndex < this.activeRoute.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  clearRoute(): void {
    this.activeRoute = null;
    this.currentStepIndex = 0;
  }

  private generateMockSteps(destination: Destination): NavStep[] {
    // Generate realistic-looking navigation steps
    const steps: NavStep[] = [
      {
        instruction: 'Head north on Current St',
        distance: '0.3 mi',
        etaMin: 1,
      },
      {
        instruction: 'Turn right onto Market St',
        distance: '0.8 mi',
        etaMin: 3,
      },
      {
        instruction: 'Continue straight for 3 blocks',
        distance: '0.4 mi',
        etaMin: 2,
      },
    ];

    // Add final step
    steps.push({
      instruction: `Arrive at ${destination.label}`,
      distance: '0.1 mi',
      etaMin: 1,
    });

    return steps;
  }

  private parseDistance(distStr: string): number {
    const match = distStr.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const navService = new MockNavService();
