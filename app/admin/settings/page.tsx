'use client';

import React from 'react';
import { clearQueue, clearCache } from '@/lib/db';
import { Trash2, Download } from 'lucide-react';

export default function AdminSettingsPage() {
  const handleClearQueue = async () => {
    if (confirm('Clear all queued actions?')) {
      await clearQueue();
      alert('Queue cleared');
    }
  };

  const handleClearCache = async () => {
    if (confirm('Clear all cached data?')) {
      await clearCache();
      alert('Cache cleared');
    }
  };

  const handleExportAll = () => {
    alert('Full data export initiated. This would download all data in production.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Settings</h2>
        <p className="text-sm text-gray-dark">
          System configuration and data management
        </p>
      </div>

      {/* Data Management */}
      <div className="card">
        <h3 className="font-bold mb-3">Data Management</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Export All Data</div>
              <div className="text-xs text-gray-dark">
                Download all health data, messages, and logs
              </div>
            </div>
            <button
              onClick={handleExportAll}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="border-t border-black pt-3 flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Clear Offline Queue</div>
              <div className="text-xs text-gray-dark">
                Remove all pending queued actions
              </div>
            </div>
            <button
              onClick={handleClearQueue}
              className="btn-secondary flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>

          <div className="border-t border-black pt-3 flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">Clear Cache</div>
              <div className="text-xs text-gray-dark">
                Remove all cached API responses
              </div>
            </div>
            <button
              onClick={handleClearCache}
              className="btn-secondary flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="card">
        <h3 className="font-bold mb-3">System Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-dark">Version:</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-dark">Environment:</span>
            <span>Development</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-dark">Database:</span>
            <span>IndexedDB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-dark">Browser:</span>
            <span>{typeof navigator !== 'undefined' ? navigator.userAgent.split(' ').slice(-1)[0] : 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card">
        <h3 className="font-bold mb-3">About WeekendWatch</h3>
        <div className="text-sm text-gray-dark space-y-2">
          <p>
            WeekendWatch V1 is a monochrome e-ink smartwatch web application demo
            with comprehensive health data integration and admin console.
          </p>
          <p>
            Built with Next.js, TypeScript, Tailwind CSS, and Zustand. All data
            is stored locally using IndexedDB.
          </p>
          <p className="mt-4 text-xs">
            © 2025 WeekendWatch. Demo application for educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
