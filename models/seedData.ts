import type {
  Contact,
  Message,
  MessageThread,
  CallLog,
  Destination,
  PaymentTxn,
  Integration,
  HealthEvent,
  SleepSession,
  WorkoutSession,
  User,
} from './types';

// ============================================================================
// Users
// ============================================================================

export const DEMO_USER: User = {
  id: 'user-1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  timezone: 'America/Los_Angeles',
};

// ============================================================================
// Contacts
// ============================================================================

export const SEED_CONTACTS: Contact[] = [
  {
    id: 'contact-1',
    name: 'Sarah Johnson',
    phone: '+1-555-0101',
    lastInteractionAt: new Date('2025-12-29T18:30:00'),
    avatarInitials: 'SJ',
  },
  {
    id: 'contact-2',
    name: 'Mike Davis',
    phone: '+1-555-0102',
    lastInteractionAt: new Date('2025-12-29T14:15:00'),
    avatarInitials: 'MD',
  },
  {
    id: 'contact-3',
    name: 'Emily Wilson',
    phone: '+1-555-0103',
    lastInteractionAt: new Date('2025-12-28T20:45:00'),
    avatarInitials: 'EW',
  },
  {
    id: 'contact-4',
    name: 'James Brown',
    phone: '+1-555-0104',
    lastInteractionAt: new Date('2025-12-28T11:00:00'),
    avatarInitials: 'JB',
  },
  {
    id: 'contact-5',
    name: 'Lisa Martinez',
    phone: '+1-555-0105',
    lastInteractionAt: new Date('2025-12-27T16:30:00'),
    avatarInitials: 'LM',
  },
];

// ============================================================================
// Messages & Threads
// ============================================================================

export const SEED_MESSAGES: Message[] = [
  // Thread with Sarah
  {
    id: 'msg-1',
    threadId: 'thread-1',
    sender: 'contact-1',
    text: 'Hey! Are we still on for coffee tomorrow?',
    createdAt: new Date('2025-12-29T18:25:00'),
    status: 'sent',
  },
  {
    id: 'msg-2',
    threadId: 'thread-1',
    sender: 'me',
    text: 'Yes! 10am at the usual spot?',
    createdAt: new Date('2025-12-29T18:27:00'),
    status: 'sent',
  },
  {
    id: 'msg-3',
    threadId: 'thread-1',
    sender: 'contact-1',
    text: 'Perfect! See you then.',
    createdAt: new Date('2025-12-29T18:30:00'),
    status: 'sent',
  },
  // Thread with Mike
  {
    id: 'msg-4',
    threadId: 'thread-2',
    sender: 'me',
    text: 'Got the docs. Reviewing now.',
    createdAt: new Date('2025-12-29T14:10:00'),
    status: 'sent',
  },
  {
    id: 'msg-5',
    threadId: 'thread-2',
    sender: 'contact-2',
    text: 'Great, let me know if you have questions.',
    createdAt: new Date('2025-12-29T14:15:00'),
    status: 'sent',
  },
  // Thread with Emily
  {
    id: 'msg-6',
    threadId: 'thread-3',
    sender: 'contact-3',
    text: 'Happy holidays! 🎄',
    createdAt: new Date('2025-12-28T20:45:00'),
    status: 'sent',
  },
  {
    id: 'msg-7',
    threadId: 'thread-3',
    sender: 'me',
    text: 'You too! Hope you have a great weekend.',
    createdAt: new Date('2025-12-28T20:50:00'),
    status: 'sent',
  },
];

export const SEED_THREADS: MessageThread[] = [
  {
    id: 'thread-1',
    participantIds: ['me', 'contact-1'],
    lastMessageAt: new Date('2025-12-29T18:30:00'),
  },
  {
    id: 'thread-2',
    participantIds: ['me', 'contact-2'],
    lastMessageAt: new Date('2025-12-29T14:15:00'),
  },
  {
    id: 'thread-3',
    participantIds: ['me', 'contact-3'],
    lastMessageAt: new Date('2025-12-28T20:50:00'),
  },
];

// ============================================================================
// Call Logs
// ============================================================================

export const SEED_CALL_LOGS: CallLog[] = [
  {
    id: 'call-1',
    contactId: 'contact-1',
    direction: 'out',
    status: 'completed',
    startedAt: new Date('2025-12-29T17:00:00'),
    durationSec: 245,
  },
  {
    id: 'call-2',
    contactId: 'contact-2',
    direction: 'in',
    status: 'completed',
    startedAt: new Date('2025-12-29T12:30:00'),
    durationSec: 180,
  },
  {
    id: 'call-3',
    contactId: 'contact-4',
    direction: 'in',
    status: 'missed',
    startedAt: new Date('2025-12-28T09:15:00'),
  },
  {
    id: 'call-4',
    contactId: 'contact-3',
    direction: 'out',
    status: 'completed',
    startedAt: new Date('2025-12-27T16:00:00'),
    durationSec: 420,
  },
];

// ============================================================================
// Destinations
// ============================================================================

export const SEED_DESTINATIONS: Destination[] = [
  {
    id: 'dest-1',
    label: 'Home',
    address: '123 Main St, San Francisco, CA 94102',
    lat: 37.7749,
    lon: -122.4194,
    lastUsedAt: new Date('2025-12-29T20:00:00'),
  },
  {
    id: 'dest-2',
    label: 'Office',
    address: '456 Market St, San Francisco, CA 94105',
    lat: 37.7897,
    lon: -122.3972,
    lastUsedAt: new Date('2025-12-29T08:30:00'),
  },
  {
    id: 'dest-3',
    label: 'Blue Bottle Coffee',
    address: '66 Mint St, San Francisco, CA 94103',
    lat: 37.7764,
    lon: -122.4085,
    lastUsedAt: new Date('2025-12-28T10:00:00'),
  },
];

// ============================================================================
// Payments
// ============================================================================

export const SEED_PAYMENT_TXNS: PaymentTxn[] = [
  {
    id: 'txn-1',
    merchant: 'Blue Bottle Coffee',
    amount: 6.75,
    currency: 'USD',
    createdAt: new Date('2025-12-29T09:15:00'),
    status: 'completed',
    last4: '4242',
  },
  {
    id: 'txn-2',
    merchant: 'Whole Foods Market',
    amount: 42.33,
    currency: 'USD',
    createdAt: new Date('2025-12-28T18:45:00'),
    status: 'completed',
    last4: '4242',
  },
  {
    id: 'txn-3',
    merchant: 'Lyft',
    amount: 18.50,
    currency: 'USD',
    createdAt: new Date('2025-12-28T12:20:00'),
    status: 'completed',
    last4: '4242',
  },
  {
    id: 'txn-4',
    merchant: 'Safeway',
    amount: 25.18,
    currency: 'USD',
    createdAt: new Date('2025-12-27T19:30:00'),
    status: 'completed',
    last4: '4242',
  },
];

// ============================================================================
// Integrations
// ============================================================================

export const SEED_INTEGRATIONS: Integration[] = [
  {
    id: 'int-1',
    name: 'Oura Ring',
    type: 'oura',
    status: 'connected',
    lastSyncAt: new Date('2025-12-30T02:15:00'),
    enabled: true,
  },
  {
    id: 'int-2',
    name: 'AirPods Pro',
    type: 'earbuds',
    status: 'connected',
    lastSyncAt: new Date('2025-12-29T22:30:00'),
    enabled: true,
  },
  {
    id: 'int-3',
    name: 'iPhone',
    type: 'phone',
    status: 'connected',
    lastSyncAt: new Date('2025-12-30T03:00:00'),
    enabled: true,
  },
  {
    id: 'int-4',
    name: 'WeekendWatch',
    type: 'watch',
    status: 'connected',
    lastSyncAt: new Date('2025-12-30T03:05:00'),
    enabled: true,
  },
];

// ============================================================================
// Health Events
// ============================================================================

export const SEED_HEALTH_EVENTS: HealthEvent[] = [
  // Heart rate samples
  {
    id: 'health-1',
    type: 'heartRate',
    value: 72,
    unit: 'bpm',
    sourceIntegrationId: 'int-1',
    timestamp: new Date('2025-12-30T03:00:00'),
  },
  {
    id: 'health-2',
    type: 'heartRate',
    value: 68,
    unit: 'bpm',
    sourceIntegrationId: 'int-1',
    timestamp: new Date('2025-12-30T02:30:00'),
  },
  {
    id: 'health-3',
    type: 'heartRate',
    value: 75,
    unit: 'bpm',
    sourceIntegrationId: 'int-1',
    timestamp: new Date('2025-12-30T02:00:00'),
  },
  // HRV
  {
    id: 'health-4',
    type: 'hrv',
    value: 55,
    unit: 'ms',
    sourceIntegrationId: 'int-1',
    timestamp: new Date('2025-12-30T03:00:00'),
  },
  // Steps
  {
    id: 'health-5',
    type: 'steps',
    value: 8432,
    unit: 'steps',
    sourceIntegrationId: 'int-3',
    timestamp: new Date('2025-12-29T23:59:00'),
  },
  {
    id: 'health-6',
    type: 'steps',
    value: 6821,
    unit: 'steps',
    sourceIntegrationId: 'int-3',
    timestamp: new Date('2025-12-28T23:59:00'),
  },
  // Calories
  {
    id: 'health-7',
    type: 'calories',
    value: 2340,
    unit: 'kcal',
    sourceIntegrationId: 'int-3',
    timestamp: new Date('2025-12-29T23:59:00'),
  },
  // SpO2
  {
    id: 'health-8',
    type: 'spo2',
    value: 98,
    unit: '%',
    sourceIntegrationId: 'int-1',
    timestamp: new Date('2025-12-30T03:00:00'),
  },
  // Temperature
  {
    id: 'health-9',
    type: 'temperature',
    value: 97.8,
    unit: '°F',
    sourceIntegrationId: 'int-1',
    timestamp: new Date('2025-12-30T03:00:00'),
  },
];

// ============================================================================
// Sleep Sessions
// ============================================================================

export const SEED_SLEEP_SESSIONS: SleepSession[] = [
  {
    id: 'sleep-1',
    startTime: new Date('2025-12-29T23:15:00'),
    endTime: new Date('2025-12-30T07:30:00'),
    durationMin: 495,
    score: 82,
    sourceIntegrationId: 'int-1',
    stages: {
      deep: 105,
      light: 240,
      rem: 120,
      awake: 30,
    },
  },
  {
    id: 'sleep-2',
    startTime: new Date('2025-12-28T23:00:00'),
    endTime: new Date('2025-12-29T07:00:00'),
    durationMin: 480,
    score: 78,
    sourceIntegrationId: 'int-1',
    stages: {
      deep: 95,
      light: 250,
      rem: 110,
      awake: 25,
    },
  },
  {
    id: 'sleep-3',
    startTime: new Date('2025-12-27T22:45:00'),
    endTime: new Date('2025-12-28T06:45:00'),
    durationMin: 480,
    score: 85,
    sourceIntegrationId: 'int-1',
    stages: {
      deep: 115,
      light: 235,
      rem: 115,
      awake: 15,
    },
  },
];

// ============================================================================
// Workout Sessions
// ============================================================================

export const SEED_WORKOUT_SESSIONS: WorkoutSession[] = [
  {
    id: 'workout-1',
    type: 'Running',
    startTime: new Date('2025-12-29T07:00:00'),
    endTime: new Date('2025-12-29T07:35:00'),
    durationMin: 35,
    calories: 320,
    distance: 3.2,
    avgHeartRate: 145,
    maxHeartRate: 168,
    sourceIntegrationId: 'int-4',
  },
  {
    id: 'workout-2',
    type: 'Cycling',
    startTime: new Date('2025-12-28T17:00:00'),
    endTime: new Date('2025-12-28T18:15:00'),
    durationMin: 75,
    calories: 550,
    distance: 12.5,
    avgHeartRate: 132,
    maxHeartRate: 155,
    sourceIntegrationId: 'int-4',
  },
  {
    id: 'workout-3',
    type: 'Yoga',
    startTime: new Date('2025-12-27T08:30:00'),
    endTime: new Date('2025-12-27T09:30:00'),
    durationMin: 60,
    calories: 180,
    avgHeartRate: 95,
    maxHeartRate: 115,
    sourceIntegrationId: 'int-4',
  },
];
