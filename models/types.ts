// Domain models for WeekendWatch V1

// ============================================================================
// Contacts & Communication
// ============================================================================

export interface Contact {
  id: string;
  name: string;
  phone: string;
  lastInteractionAt: Date;
  avatarInitials?: string;
}

export interface MessageThread {
  id: string;
  participantIds: string[];
  lastMessageAt: Date;
  lastMessage?: Message;
}

export type MessageStatus = 'sent' | 'queued' | 'failed';

export interface Message {
  id: string;
  threadId: string;
  sender: string; // contact ID or 'me'
  text: string;
  createdAt: Date;
  status: MessageStatus;
}

export type CallDirection = 'in' | 'out';
export type CallStatus = 'missed' | 'completed' | 'declined' | 'active';

export interface CallLog {
  id: string;
  contactId: string;
  direction: CallDirection;
  status: CallStatus;
  startedAt: Date;
  durationSec?: number;
}

// ============================================================================
// Navigation
// ============================================================================

export interface NavStep {
  instruction: string;
  distance: string;
  etaMin: number;
}

export interface NavRoute {
  id: string;
  destinationLabel: string;
  steps: NavStep[];
  totalDistanceMiles: number;
  totalEtaMin: number;
  createdAt: Date;
}

export interface Destination {
  id: string;
  label: string;
  address: string;
  lat?: number;
  lon?: number;
  lastUsedAt?: Date;
}

// ============================================================================
// Payments
// ============================================================================

export type PaymentStatus = 'completed' | 'pending' | 'failed';

export interface PaymentTxn {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  createdAt: Date;
  status: PaymentStatus;
  last4?: string;
}

export interface PaymentToken {
  token: string;
  expiresAt: Date;
  pattern: string; // Visual pattern for display
}

// ============================================================================
// Media
// ============================================================================

export type OutputDevice = 'watch' | 'car' | 'earbuds' | 'speaker';

export interface MediaState {
  trackTitle: string;
  artist: string;
  album?: string;
  playing: boolean;
  outputDevice: OutputDevice;
  volumePercent: number;
  positionSec: number;
  durationSec: number;
}

// ============================================================================
// Health & Integrations
// ============================================================================

export type IntegrationStatus = 'connected' | 'disconnected' | 'syncing' | 'error';

export interface Integration {
  id: string;
  name: string;
  type: 'oura' | 'earbuds' | 'phone' | 'watch';
  status: IntegrationStatus;
  lastSyncAt?: Date;
  enabled: boolean;
}

export type HealthMetricType =
  | 'heartRate'
  | 'hrv'
  | 'steps'
  | 'sleep'
  | 'workout'
  | 'calories'
  | 'distance'
  | 'respiratoryRate'
  | 'spo2'
  | 'bloodPressure'
  | 'temperature';

export interface HealthEvent {
  id: string;
  type: HealthMetricType;
  value: number;
  unit: string;
  sourceIntegrationId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface HealthMetricSummary {
  type: HealthMetricType;
  currentValue?: number;
  avgValue?: number;
  minValue?: number;
  maxValue?: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  lastUpdated?: Date;
}

export interface SleepSession {
  id: string;
  startTime: Date;
  endTime: Date;
  durationMin: number;
  score: number; // 0-100
  sourceIntegrationId: string;
  stages?: {
    deep: number;
    light: number;
    rem: number;
    awake: number;
  };
}

export interface WorkoutSession {
  id: string;
  type: string;
  startTime: Date;
  endTime: Date;
  durationMin: number;
  calories: number;
  distance?: number;
  avgHeartRate?: number;
  maxHeartRate?: number;
  sourceIntegrationId: string;
}

// ============================================================================
// System & Settings
// ============================================================================

export interface SystemSettings {
  offlineMode: boolean;
  bezelMode: boolean;
  weekendMode: boolean;
  batteryPercent: number;
  connectivity: {
    wifi: boolean;
    lte: boolean;
    bluetooth: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email?: string;
  timezone: string;
}

// ============================================================================
// Voice Commands
// ============================================================================

export type CommandIntent =
  | 'SEND_MESSAGE'
  | 'CALL'
  | 'NAVIGATE'
  | 'MEDIA_PLAY'
  | 'MEDIA_PAUSE'
  | 'MEDIA_SKIP'
  | 'MEDIA_VOLUME'
  | 'UNKNOWN';

export interface ParsedCommand {
  intent: CommandIntent;
  confidence: number;
  params: {
    contactName?: string;
    contactId?: string;
    phone?: string;
    text?: string;
    destination?: string;
    query?: string;
    volumeLevel?: number;
  };
  rawText: string;
  suggestions?: string[];
}

// ============================================================================
// Offline Queue
// ============================================================================

export type QueuedActionType = 'send_message' | 'make_call' | 'sync_health';

export interface QueuedAction {
  id: string;
  type: QueuedActionType;
  payload: any;
  createdAt: Date;
  retryCount: number;
  status: 'pending' | 'processing' | 'failed';
}

// ============================================================================
// Notification / Toast
// ============================================================================

export type ToastType = 'info' | 'success' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  durationMs?: number;
}
