# RealmZ / WeekendWatch V0 spec
Draft 2026-09-01 PT. Passion-project dogfood, not a company. Recency: agent + tiny Android terminal. Watch is a candidate I/O, not the product.

## Objective
Leave the smartphone for a pool afternoon / weekend stretch. Stay reachable and capable through **one conversation** (agent front door). Success is task completion with the least attention, not time on device.

## In (V0)
- Android, full Android (not Wear OS, not a custom ROM).
- One sideloaded app as the only front door. Stock OS. No firmware flash.
- Dedicated number (prepaid SIM / eSIM). Not the iPhone number. Not phone-relay.
- Rails: SMS, calls, WhatsApp. Local router picks the rail.
- Local lightweight model as **router only** (intents: message, call, music, maps, search, 2FA/status, cancel, volume, emergency). Cloud does real questions.
- Earbuds as primary I/O. Push-to-talk. Spoken + haptic confirm ("sent").
- Screen exists but is fenced: no home grid, no color dopamine, glance-only (inbound one-liner, 2FA code, map peek). Small physical screen preferred.
- Hardware class: (A) full-Android LTE watch-phone **or** (B) very small cheap Android phone / e-ink slab. Research to pick currently buyable SKUs.
- US bands (Nate is LA; T-Mobile was the 2025 first-carrier intent, not a contract).
- Dogfood on Nate: he stays on iPhone as the "left behind" phone.

## Out (V0)
- Wear OS as the V0 vehicle.
- Custom OS / bootloader / Olearis-style firmware.
- Camera mote, Eli personality, rollable screen, custom earbuds.
- Same-number / iMessage identity.
- Recorder-as-memory, always-listen, always-see.
- Raise, custom tooling, Humane-style subscription story.
- General local LLM as the assistant.
- Reviving the 2025 watch web sim as the product.

## Loop (done when)
Nate can go to the pool with this terminal + buds, no iPhone, and: receive and send a text (SMS or WhatsApp) on the dedicated number, place/take a call, ask one cloud question, play/pause audio. If a message is not trusted as sent, V0 has failed. Form factor (wrist vs pocket brick) is a finding, not a requirement.

## Open (do not invent)
- Exact SKU (watch vs small phone): Research evidence pack.
- WhatsApp as primary device vs linked-devices clone of the iPhone account.
- Which local router (tiny generative vs classifier vs constrained grammar).
- MVNO/prepaid which vendor.


## Product thinking (locked in chat, Sep 1 2026)

- **Single front door.** One agent conversation handles text, call, and dispatch. Not Messages + Phone + Siri as three doors.
- **Local LLM = router only.** Tiny on-device model classifies intents (message, call, music, maps, search, 2FA/status, cancel, volume, emergency). Cloud does real questions. Not a general local assistant (battery + Humane failure mode).
- **Android for global scale.** WhatsApp + GSM number, not iMessage. Wear OS is an app platform, not a loadable OS. Full Android + sideloaded launcher is the V0 vehicle.
- **Screen is a liability.** Prefer tiny / low-stimulation so the device cannot become a phone. Wrist *or* pocket brick; same software. Form factor is a finding.
- **Dogfood signal.** Late Aug 2026: pool week on Apple Watch only (texts, occasional calls, Siri) felt great. That tested the *jobs*, still on Apple identity. RealmZ V0 tests the same jobs on a dedicated Android number.
- **Do not rehire Olearis firmware.** Stock OS, kiosk/launcher only. Firmware was calendar burn without product risk reduction (Dec 17 2024 decision still stands).
