# WeekendWatch V1

A **monochrome e-ink smartwatch web app** with comprehensive health data integration and admin console. Built with Next.js, TypeScript, and Tailwind CSS, optimized for a small mobile viewport modeled after a watch interface.

![WeekendWatch](https://img.shields.io/badge/version-1.0.0-black?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=flat-square)

## 🎯 Overview

WeekendWatch V1 is a **communications-first weekend wearable** simulation featuring:

- **Watch Interface** - Optimized for 360×360 viewport with monochrome e-ink design
- **Admin Console** - Desktop-optimized health data dashboard with consolidation
- **Voice-First Commands** - Speech-to-text with intelligent command parsing
- **Offline-First** - IndexedDB-backed queue for offline message handling
- **Mock Services** - Complete simulation of calling, messaging, nav, payments, and media

### Design Philosophy: Monochrome E-ink

- **No color** - Only black, white, and 1-2 gray steps
- **No shadows or gradients** - Uses borders, spacing, and typography for hierarchy
- **High contrast** - Optimized for e-ink readability
- **Minimal animation** - Respects `prefers-reduced-motion`
- **Large tap targets** - Minimum 44px for accessibility

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once (CI)
npm run test:ci
```

---

## 📱 Application Structure

### Watch App (`/watch/*`)

**Viewport:** 360×360px (mobile-optimized)

- **Home** (`/watch`) - Main dashboard with app tiles
- **Communications Hub** (`/watch/comm`) - Messages, calls, and voice commands
- **Messages** (`/watch/messages`) - Threaded SMS interface with offline queue
- **Calls** (`/watch/calls`) - Recent calls and contacts
- **Voice Commands** (`/watch/voice`) - Press & hold STT interface
- **Navigation** (`/watch/nav`) - Turn-by-turn directions (textual)
- **Tap to Pay** (`/watch/pay`) - Payment token generation & transaction history
- **Media** (`/watch/media`) - Now playing with device routing
- **Health** (`/watch/health`) - Minimal health summary
- **Settings** (`/watch/settings`) - Bezel mode, weekend mode, offline mode toggles

### Admin Console (`/admin/*`)

**Viewport:** Desktop-optimized (max-width: 1280px)

- **Dashboard** (`/admin`) - KPIs, recent workouts, integration status
- **Health Data** (`/admin/health`) - Time-series charts (monochrome), sleep & workout logs
- **Integrations** (`/admin/integrations`) - Device sync status & consolidation rules
- **Settings** (`/admin/settings`) - Data management & system info

---

## 🏗️ Architecture

### Tech Stack

```
Frontend:       Next.js 16 (App Router) + React 19
Language:       TypeScript 5
Styling:        Tailwind CSS 4 (monochrome theme)
State:          Zustand
Persistence:    IndexedDB (via idb)
Icons:          lucide-react (monochrome outlines)
Testing:        Jest + React Testing Library
```

### Project Structure

```
├── app/
│   ├── watch/              # Watch interface routes
│   ├── admin/              # Admin console routes
│   ├── globals.css         # Monochrome design system
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── watch/              # Watch-specific components
│   └── admin/              # Admin-specific components
├── models/
│   ├── types.ts            # TypeScript domain models
│   └── seedData.ts         # Mock seed data
├── services/
│   ├── MessagingService.ts # Mock messaging API
│   ├── CallingService.ts   # Mock calling API
│   ├── NavService.ts       # Mock navigation API
│   ├── PaymentsService.ts  # Mock payments API
│   ├── MediaService.ts     # Mock media API
│   ├── HealthService.ts    # Mock health API
│   └── VoiceCommandService.ts # Voice command parser
├── stores/
│   └── useAppStore.ts      # Zustand state management
├── lib/
│   ├── db.ts               # IndexedDB utilities
│   └── offlineSync.ts      # Offline queue sync manager
└── __tests__/              # Unit tests
```

### Domain Models

See `models/types.ts` for complete type definitions:

- **Communication**: `Contact`, `Message`, `MessageThread`, `CallLog`
- **Navigation**: `NavRoute`, `NavStep`, `Destination`
- **Payments**: `PaymentTxn`, `PaymentToken`
- **Media**: `MediaState`, `OutputDevice`
- **Health**: `HealthEvent`, `HealthMetricSummary`, `SleepSession`, `WorkoutSession`
- **System**: `SystemSettings`, `QueuedAction`, `Toast`

### Service Layer (Mock Implementations)

All services use mock data with simulated network delays. Clean adapter pattern allows swapping in real APIs:

```typescript
interface MessagingService {
  getContacts(): Promise<Contact[]>;
  sendMessage(threadId: string, text: string): Promise<Message>;
  // ... more methods
}

export const messagingService = new MockMessagingService();
```

### Offline Queue & Sync

Messages sent while offline are queued in IndexedDB and synced when connectivity is restored:

```typescript
// In offline mode
const queuedMessage = messagingService.queueMessage(threadId, text);
await addToQueue({
  type: 'send_message',
  payload: { threadId, text, messageId: queuedMessage.id },
  status: 'pending',
  retryCount: 0,
  createdAt: new Date(),
});

// Auto-sync when back online
offlineSyncManager.startAutoSync();
```

### Voice Command Parser

Deterministic intent parser (no real LLM required):

```typescript
const command = await voiceCommandService.parseCommand('Text Sarah I\'m running late');
// { intent: 'SEND_MESSAGE', confidence: 0.9, params: { contactName: 'Sarah', text: '...' } }
```

**Supported Intents:**
- `SEND_MESSAGE` - "Text [contact] [message]"
- `CALL` - "Call [contact]"
- `NAVIGATE` - "Navigate to [destination]"
- `MEDIA_PLAY` - "Play [query]"
- `MEDIA_PAUSE` / `MEDIA_SKIP` - "Pause" / "Skip"

---

## 🎨 Monochrome Design System

### CSS Utility Classes

```css
/* Buttons */
.btn-primary     /* Black background, white text */
.btn-secondary   /* White background, black border */

/* Inputs */
.input           /* Large, high-contrast input field */

/* Lists */
.list-item       /* Border-separated list row with tap feedback */

/* Cards */
.card            /* Border-wrapped content block */

/* Layout */
.watch-container /* 360×360 constraint with min-height */
.admin-container /* Desktop-optimized max-width */

/* Bezel Frame */
.watch-bezel     /* Device outline frame (380×400) */
```

### Typography Hierarchy

- **Titles**: Bold, compact (16-24px)
- **Body**: Readable (14px)
- **Secondary**: Smaller + lighter weight (12px)
- **Monospace**: Used for codes/tokens

### Interactive States

- **Selected**: Thicker border + hatch background
- **Disabled**: Reduced opacity + dashed border
- **Active call**: Inverted (black bg, white text)
- **Hover**: Hatch background pattern

---

## 🧪 Testing

### Running Tests

```bash
# Watch mode (development)
npm test

# Single run (CI)
npm run test:ci
```

### Test Coverage

- ✅ **Voice Command Parsing** - Intent recognition, confidence scoring
- ✅ **Messaging Service** - CRUD operations, threading, search
- ✅ **Offline Queue** - Add, retrieve, update, remove, sync

### Test Examples

```typescript
it('should parse message commands correctly', async () => {
  const result = await service.parseCommand('Text Sarah I\'m running late');
  expect(result.intent).toBe('SEND_MESSAGE');
  expect(result.params.contactName).toBe('Sarah Johnson');
});

it('should queue message when offline', async () => {
  const queued = await addToQueue({
    type: 'send_message',
    payload: { threadId: 'thread-1', text: 'Test' },
    status: 'pending',
    // ...
  });
  expect(queued.status).toBe('pending');
});
```

---

## 🎭 Special Features

### 1. Bezel Mode

Toggle a device outline frame around the watch interface:

```
Settings → Display Modes → Bezel Frame
```

Renders a 380×400 border with 50px border-radius simulating a physical watch.

### 2. Weekend Mode

Minimal UI showing only essential apps (Comms, Nav, Pay):

```
Settings → Display Modes → Weekend Mode
```

Hides Media, Health, and Settings from the home screen.

### 3. Offline Mode

Simulates airplane mode with message queuing:

```
Settings → Connectivity → Offline Mode
```

Messages sent while offline are stored in IndexedDB and synced when toggled back online.

### 4. Battery Simulator

Adjust battery percentage for testing low-power states:

```
Settings → Battery Simulator → +/- 10%
```

### 5. Haptic Simulation

Visual feedback for button presses (reduced motion compatible):

```css
.active:opacity-50  /* Brief opacity drop on tap */
```

---

## 📊 Monochrome Charts (Admin Console)

Custom SVG-based line charts with no color dependencies:

### Features

- **Multiple series**: Differentiated by line style (solid/dashed/dotted)
- **Point markers**: Different shapes per series (circle/square/triangle)
- **Grid lines**: Subtle guides for readability
- **Axis labels**: Automatic scaling and formatting
- **Legend**: Text-based series identification

### Usage

```tsx
<LineChart
  series={[
    { name: 'Heart Rate', data: [...], style: 'solid' },
    { name: 'HRV', data: [...], style: 'dashed' },
  ]}
  width={800}
  height={300}
  yAxisLabel="bpm"
/>
```

---

## 🚦 2-Minute Demo Script

### 1. **Watch Interface Tour** (30s)

```
1. Open http://localhost:3000 → Click "Launch Watch Interface"
2. Observe monochrome design, time/connectivity indicators
3. Tap "Comms" → "Messages" → Open a thread
4. Send a message, observe offline queue indicator (if offline mode on)
```

### 2. **Voice Commands** (30s)

```
1. Navigate to Comms → Voice Commands
2. Type: "Text Sarah I'm running late"
3. Observe parsed intent + confidence
4. Try: "Call Mike" / "Navigate to home"
```

### 3. **Navigation & Media** (30s)

```
1. Go to Nav → Search "home" → Start navigation
2. Advance through turn-by-turn steps
3. Go to Media → Play music → Change output device
```

### 4. **Admin Console** (30s)

```
1. Navigate to /admin (or click "Open Admin Console" from home)
2. View Dashboard: KPIs, recent workouts, integration status
3. Click "Health Data" → View line chart (monochrome)
4. Try "Integrations" → Click "Sync Now" on a device
```

---

## 🔧 Configuration

### Viewport Emulation (Chrome DevTools)

For optimal watch interface testing:

1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Set dimensions: **360 × 360**
4. Set device pixel ratio: **2x**

### Environment Variables

No environment variables required. All services use mock data.

### IndexedDB Schema

Database: `weekendwatch-db`

**Stores:**
- `queuedActions` - Offline action queue
- `cache` - API response cache (5min TTL)

---

## 📝 Development Notes

### Adding a New Feature

1. **Define types** in `models/types.ts`
2. **Create service** in `services/` with mock implementation
3. **Add route** in `app/watch/` or `app/admin/`
4. **Build components** in `components/ui/` or `components/watch/`
5. **Write tests** in `__tests__/`

### Design Constraints

- **No `color` CSS** except black/white
- **No `box-shadow`**
- **No gradients** (`background: linear-gradient` forbidden)
- **No `background-color`** except white/black
- **Border-based** separation only

### Accessibility

- ✅ Keyboard navigation (admin)
- ✅ High contrast (WCAG AAA)
- ✅ Reduced motion support
- ✅ Minimum 44px tap targets
- ✅ Semantic HTML

---

## 🐛 Known Limitations

1. **Speech Recognition** - Only works in Chrome/Edge (Web Speech API)
2. **IndexedDB** - Not available in private browsing (Safari)
3. **No real integrations** - All health data is mocked
4. **No authentication** - Single demo user only
5. **No real telephony** - Calls are simulated

---

## 📄 License

Demo application for educational purposes. © 2025 WeekendWatch.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [idb](https://github.com/jakearchibald/idb)
- [Lucide React](https://lucide.dev/)

---

## 📞 Support

For issues or questions, please refer to:
- Project documentation in `/docs` (if available)
- TypeScript types in `models/types.ts`
- Service implementations in `services/`

---

**Enjoy your WeekendWatch experience! 📱⌚**
