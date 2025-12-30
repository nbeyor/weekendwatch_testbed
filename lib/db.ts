import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { QueuedAction } from '@/models/types';

// Database schema
interface WeekendWatchDB extends DBSchema {
  queuedActions: {
    key: string;
    value: QueuedAction;
    indexes: { 'by-status': string; 'by-created': Date };
  };
  cache: {
    key: string;
    value: {
      key: string;
      data: any;
      expiresAt: number;
    };
  };
}

const DB_NAME = 'weekendwatch-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<WeekendWatchDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<WeekendWatchDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<WeekendWatchDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Queue store
      if (!db.objectStoreNames.contains('queuedActions')) {
        const queueStore = db.createObjectStore('queuedActions', {
          keyPath: 'id',
        });
        queueStore.createIndex('by-status', 'status');
        queueStore.createIndex('by-created', 'createdAt');
      }

      // Cache store
      if (!db.objectStoreNames.contains('cache')) {
        db.createObjectStore('cache', { keyPath: 'key' });
      }
    },
  });

  return dbInstance;
}

// ============================================================================
// Queued Actions API
// ============================================================================

export async function addToQueue(action: Omit<QueuedAction, 'id'>): Promise<QueuedAction> {
  const db = await getDB();

  const queuedAction: QueuedAction = {
    ...action,
    id: `queued-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  await db.add('queuedActions', queuedAction);
  return queuedAction;
}

export async function getQueuedActions(
  status?: QueuedAction['status']
): Promise<QueuedAction[]> {
  const db = await getDB();

  if (status) {
    return db.getAllFromIndex('queuedActions', 'by-status', status);
  }

  return db.getAll('queuedActions');
}

export async function updateQueuedAction(
  id: string,
  updates: Partial<QueuedAction>
): Promise<void> {
  const db = await getDB();
  const action = await db.get('queuedActions', id);

  if (action) {
    await db.put('queuedActions', { ...action, ...updates });
  }
}

export async function removeQueuedAction(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('queuedActions', id);
}

export async function clearQueue(): Promise<void> {
  const db = await getDB();
  await db.clear('queuedActions');
}

export async function getQueueCount(): Promise<number> {
  const db = await getDB();
  return db.count('queuedActions');
}

// ============================================================================
// Cache API
// ============================================================================

export async function setCache(key: string, data: any, ttlMs: number = 300000): Promise<void> {
  const db = await getDB();

  await db.put('cache', {
    key,
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

export async function getCache<T = any>(key: string): Promise<T | null> {
  const db = await getDB();
  const cached = await db.get('cache', key);

  if (!cached) {
    return null;
  }

  // Check expiration
  if (cached.expiresAt < Date.now()) {
    await db.delete('cache', key);
    return null;
  }

  return cached.data as T;
}

export async function clearCache(): Promise<void> {
  const db = await getDB();
  await db.clear('cache');
}

export async function clearExpiredCache(): Promise<void> {
  const db = await getDB();
  const allCached = await db.getAll('cache');

  const now = Date.now();
  const expired = allCached.filter(c => c.expiresAt < now);

  for (const item of expired) {
    await db.delete('cache', item.key);
  }
}
