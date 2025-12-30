'use client';

import React, { useEffect, useState } from 'react';
import { healthService } from '@/services/HealthService';
import type { Integration } from '@/models/types';
import { CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';

export default function AdminIntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    const data = await healthService.getIntegrations();
    setIntegrations(data);
  };

  const handleSync = async (integrationId: string) => {
    setSyncing(integrationId);
    await healthService.syncIntegration(integrationId);

    // Poll for status update
    setTimeout(async () => {
      await loadIntegrations();
      setSyncing(null);
    }, 2000);
  };

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5" />;
      case 'syncing':
        return <Loader className="w-5 h-5 animate-spin" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      default:
        return <XCircle className="w-5 h-5 opacity-30" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Integrations</h2>
        <p className="text-sm text-gray-dark">
          Manage connected health devices and services
        </p>
      </div>

      <div className="space-y-3">
        {integrations.map((integration) => (
          <div key={integration.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(integration.status)}
                <div>
                  <div className="font-bold">{integration.name}</div>
                  <div className="text-xs text-gray-dark capitalize">
                    {integration.type} • {integration.status}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSync(integration.id)}
                disabled={
                  integration.status === 'syncing' ||
                  syncing === integration.id
                }
                className="btn-secondary px-3 py-1 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Sync Now
              </button>
            </div>

            <div className="border-t border-black pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-dark">Status:</span>
                <span className="font-medium capitalize">
                  {integration.status}
                </span>
              </div>

              {integration.lastSyncAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-dark">Last Sync:</span>
                  <span>
                    {integration.lastSyncAt.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-dark">Enabled:</span>
                <span>{integration.enabled ? 'Yes' : 'No'}</span>
              </div>
            </div>

            {/* Mock sync logs */}
            <div className="border-t border-black pt-3 mt-3">
              <div className="text-xs font-medium mb-2">Recent Sync Logs</div>
              <div className="space-y-1 text-xs text-gray-dark font-mono">
                <div>[INFO] Connection established</div>
                <div>[INFO] Fetching health data...</div>
                <div>[SUCCESS] Synced 42 data points</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Consolidation rules */}
      <div className="card">
        <h3 className="font-bold mb-3">Data Consolidation Rules</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <div className="font-medium min-w-32">Heart Rate / HRV:</div>
            <div className="text-gray-dark">Prefer wearable (Oura Ring) over phone</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="font-medium min-w-32">Sleep:</div>
            <div className="text-gray-dark">Prefer ring (Oura) for sleep tracking</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="font-medium min-w-32">Steps:</div>
            <div className="text-gray-dark">Aggregate from all sources, deduplicate by time window</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="font-medium min-w-32">Workouts:</div>
            <div className="text-gray-dark">Prefer watch recordings over phone</div>
          </div>
        </div>
      </div>
    </div>
  );
}
