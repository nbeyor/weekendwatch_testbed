# WeekendWatch foundation (compiled 2026-08-29)

Sources: personal Drive, personal Gmail, GitHub `nbeyor/weekendwatch_testbed`, live demo, realmzmobile.com. ChatGPT project dump still pending. Claude not yet searched in-product.

Treat current-status claims as historical unless reconfirmed.

## Through-line

Thesis has been stable since Oct 2024: a communications-first, standalone, e-ink-ish wearable so you can leave the phone behind from Friday afternoon to Sunday night. Success metric is real-world engagement, not screen time. Not a health watch. Oura is a portal, delayed until after MVP.

The *build path* changed three times:
1. Flash custom B&W Android onto an off-the-shelf VALDUS Wear OS watch (Olearis, Nov 2024–Jan 2025).
2. Pivot (Dec 17 2024, after a trusted product leader): prove the experience on a fresh Android phone / simulated small grayscale viewport first, then port to hardware. Firmware hacking was burning calendar without burning down product risk.
3. Pause (Jan 28 2025): personal reasons plus ~3 weeks stuck on technical challenges. Then a web sim in Dec 2025 (`weekendwatch_testbed`) which is the phone-first path, in the browser.

## Timeline

- **2024-07-14** Nate emails Oleg Lavrentyev (Olearis): new smartwatch project, fully independent of the phone. Nate is an iOS user but wants Android for flexibility. Oleg: watch = mobile frameworks; they have Apple Watch experience.
- **2024-10-20** Exec summary + 15-slide investor pitch written. Pitch has dummy team names and fake traction (treat as first-pass deck, not facts). Reconnects with Oleg: still thinks an off-the-shelf Android watch prototype is the start.
- **2024-10-28** Olearis shares "WeekendWatch features": buy several watches, custom Android OS, lock B&W, then features (calls, SMS, wallet, BT headset, Android Auto, WhatsApp, Spotify/YT Music, ChatGPT API, OK Google).
- **2024-11-06** MSA Olearis ↔ Tweed Collective. Work Order 1: one mobile developer, T&M, cap **$2,000**, start Nov 6. Goal: R&D of WeekendWatch. Contact: Alexander Zavialov. Developer later: Valentyn Ostopolets (Val).
- **2024-11-13** Invoice 411-1301 billed **to WeekendWatch**, $2,000 Android development.
- **2024-12-05 to 12-17** Exec summary sent to advisors/friends (Heidrick, Lexy, Ashkan, Tristan Hunt, Stuart John).
- **2024-12-07** `realmzmobile.com` is live as a GoDaddy teaser ("Unleash the power of mobile" + email capture). RealmZ is a real brand/domain, not just a ChatGPT name.
- **2024-12-12** 8-week VALDUS sprint plan (o1-drafted, Nate-owned): control the watch, grayscale as e-ink proxy, CarPlay, NFC pay, TV, LLM STT, voice messaging. Oura post-MVP.
- **2024-12-17** Pivot email: product leader said don't fight VALDUS firmware; get product features right on a phone, then come back to form factor. Revised 8-sprint / 20 hrs/week plan.
- **2025-01-06** Olearis back from holidays; Val continues. Nate asks weekly run rate.
- **2025-01-28** Nate pauses: "personal experiences leading me to believe we may need to adjust our approach" + roadmap stuck on technical challenges for 3 weeks, not burning down new risks, considering other paths.
- **2025-02-06** Wrap-up invoice $2,700 (60 hrs × $45). Paid. Meeting with Oleg Feb 11.
- **2025-02-17** Olearis asks for Clutch review; Nate found them on Upwork originally.
- **2025-12-30/31** `nbeyor/weekendwatch_testbed` shipped: Next.js monochrome e-ink watch sim, 218×218, voice-first, mock SMS/calls/nav/pay/media, weekend mode = essential apps only, plus a health admin console. Live: https://weekendwatch-testbed.vercel.app. Default branch is a Claude feature branch; no `main`.
- **2026-01** Tweed business plan lists WeekendWatch as Incubation: "Internal incubation of a hardware concept."

## Locked product (from exec summary, Nate's words)

- 5G Android standalone watch. Fri afternoon → Sunday night.
- Core: SMS, voice calls, audio messaging. No phone required.
- Media: control car and home; beam to TVs; Spotify/podcasts. Differentiator vs Apple Watch.
- NFC payments.
- Health: Oura (and similar) as a cloud portal via the watch's cellular, not a health-watch competitor. Explicitly post-MVP in the sprint plan.
- Local LLM for STT (offline when network is weak).
- E-ink touch, battery for a weekend.
- Hub of a decentralized kit: rings, earbuds, TVs, cars, speakers.
- Business sketch: $15/mo. Do not treat the $1.98B 1%-of-market math as a real model.

## What the testbed got right vs inverted

Right: communications-first, monochrome e-ink, voice, weekend-as-mode, mock pay/nav/media, phone-first simulation (the Dec 17 2024 decision).

Inverted: Weekend Mode is a toggle that *hides* nav/media. Default is a fuller smartwatch. Health admin console (Oura/sleep/workouts) is a whole app, which the 2024 plan delayed and framed as portal-not-product.

## Tools / artifacts

| What | Where |
|---|---|
| Exec summary | https://docs.google.com/document/d/1zifHk60HR8bxDMcyJ8iqE5LjWAqhOKkR2Ja9XxzPlsU |
| Pitch (treat as draft) | https://docs.google.com/presentation/d/1s7vh4TBF6doSf3z-whLtj4QJz8RNoU1ziBKlfJxJKdc |
| Olearis features spec | https://docs.google.com/document/d/1vgjBtvOVLBhFkrjO1y1-UERwUDE_oseM02vxJbhvIV0 |
| Olearis shared folder | https://drive.google.com/drive/folders/10IXC_xhqD17pZB0CfxLlxZR1xy720iXS (title: Tweed Collective LLC) |
| GitHub | https://github.com/nbeyor/weekendwatch_testbed |
| Demo | https://weekendwatch-testbed.vercel.app |
| RealmZ teaser | https://realmzmobile.com |
| No dedicated "WeekendWatch" Drive folder found; exec summary + pitch sit in My Drive root |

## Open / verify

- ChatGPT project (primary thinking surface, still being extracted)
- Claude chats (Nate said little time there)
- Whether the dedicated Drive folder has a different name
- What actually shipped on VALDUS before the pause
- Whether RealmZ is a rename, a parent brand, or a domain parking
- Current intent: resume hardware, resume the web sim, or lock thesis first
