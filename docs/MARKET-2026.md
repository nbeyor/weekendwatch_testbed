# Attention-minimizing / phone-replacement / AI-wearable / dumb-phone market
## Landscape as of Monday 31 August 2026 (PT)
### Research for Nate Beyor / RealmZ / WeekendWatch
**Doctrine under test:** never optimize for usage; optimize for successful task completion with the least attention required. Pocket connectivity/compute pod + earbuds as primary voice I/O + optional screen/camera + dedicated MVNO number. Not a watch-only product. Not a recorder-as-memory.

**Method:** Web search then fetch of primary pages (company sites, The Verge, TechCrunch, Reuters/HP IR, Apple Support, Wired, Engadget, official forums). Claims below are sourced. Where a fact is not confirmed on a primary page, it is marked **unknown**. SEO/affiliate pages that contradict primary sources (e.g. blogs claiming Rabbit R1 is dead in 2026) are discarded.

---

## What the market believes in August 2026

By late August 2026 the consumer consensus, as reflected in reviews, acquisitions, and founder/operator quotes, is that **a new standalone AI gadget cannot replace a smartphone**. The category that tried — Humane AI Pin (dead, servers off 28 Feb 2025), Limitless Pendant (acquired by Meta Dec 2025, sales stopped), Friend (alive but tiny and socially radioactive), Rabbit R1 (alive, still updating, still not a phone) — proved that latency, thermal/battery physics, social awkwardness, a second phone number, cloud bricking, and a $24/month tax on basic connectivity kill “post-phone” hardware before the software can catch up. The surviving commercial bets are (a) **incumbents putting AI on things people already wear** (AirPods + Apple Intelligence, Meta Ray-Ban/Oakley glasses, Galaxy Watch LTE, Amazon-owned Bee), (b) **narrow tools that refuse to be a phone** (Light Phone III, Mudita Kompakt, reMarkable, Daylight DC-1, Plaud recorders), and (c) **software agents on commodity hardware** (ChatGPT/Gemini Live, self-hosted OpenClaw). The live consumer complaint is no longer “I wish I had an AI pin”; it is “I cannot leave my iPhone because 2FA, iMessage, tickets, payments, and maps live there, and I will not wear a camera on my face or a microphone on my chest in public.” Dedicated cellular on a non-phone is now a solved *wholesale* problem (Gigs, 1oT, Light’s own plans) and an unsolved *product* problem (Humane’s extra number, Light’s iMessage black hole, eSIM lock-in). OpenAI/Ive’s first gadget, if Bloomberg is right, is a 2027 puck-shaped speaker — not a phone replacement, and not shipping now.

---

## Cluster 1 — Failed or struggling AI gadgets, 2024–2026

### Humane AI Pin
- **Job claimed:** Screenless smartphone replacement. Wear on the chest, talk, get AI answers, call/text over its own LTE line, project UI onto your palm. Founders: “beginning the story of ambient computing.” (The Verge review, 11 Apr 2024)
- **What shipped:** $699 pin (later $499) + **$24/month** T-Mobile LTE/AI subscription. CosmOS, laser projector, camera, Boosters, Charge Case. Own phone number, **not** synced to the user’s existing cell number. (WIRED review, Apr 2024; The Verge, 11 Apr 2024)
- **Status:** **Dead.** HP acquired CosmOS, 300+ patents, and the team for **$116 million** (announced 18 Feb 2025). Sales stopped immediately. Servers disconnected **28 Feb 2025, 12:00 PT / 15:00 ET**. After that: no calling, messaging, AI queries, or cloud. Refunds only for units in the 90-day window. Humane had raised **>$230 million**; it had sought a $750M–$1B sale in May 2024. HP formed **HP IQ** around the team for PCs/printers/conference rooms, not a consumer pin. (The Verge, 18 Feb 2025; TechCrunch, 18 Feb 2025; HP IR, 18 Feb 2025)
- **Fatal friction:**
  - **It did not work.** David Pierce: “There’s only one problem: it just doesn’t work.” “The one and only thing I can truly rely on the AI Pin to do is tell me the time.” Verge Score **4/10**. (The Verge, 11 Apr 2024)
  - **Latency / cloud.** Every query hit Humane’s servers. “At best quite slow and at worst a total failure.” ~half of calls failed to place; incoming calls often went to voicemail. (The Verge, 11 Apr 2024)
  - **Thermal + battery.** Constantly warm; overheat shutdowns “alarmingly often.” Boosters + case still could not get through a heavy day; one unit died in 5 hours sitting in a backpack. Internal battery ~4 hours, Booster to ~9. Charge Case later **recalled for fire risk**. (The Verge, 11 Apr 2024; WIRED; TechCrunch 18 Feb 2025)
  - **Social awkwardness.** “Incredibly unsubtle.” Chest tap + talking to yourself. WIRED: “other people think I’m wearing a body camera.” Projector laser hit a dinner guest in the face. (The Verge; WIRED)
  - **No SMS identity.** Separate T-Mobile number; could not sync to existing cell number. Recipients did not know who was calling. (WIRED)
  - **Price.** $699 + $24/mo for a device reviewers said should not be bought. Returns **outpaced sales** by Aug 2024. MKBHD: “the worst product I’ve ever reviewed.” (The Verge, 18 Feb 2025)
- **Sources:** https://www.theverge.com/24126502/humane-ai-pin-review (11 Apr 2024); https://www.wired.com/review/humane-ai-pin/ ; https://www.theverge.com/news/614883/humane-ai-hp-acquisition-pin-shutdown (18 Feb 2025); https://techcrunch.com/2025/02/18/humanes-ai-pin-is-dead-as-hp-buys-startups-assets-for-116m/ (18 Feb 2025); https://investor.hp.com/news-events/news/news-details/2025/HP-Accelerates-AI-Software-Investments-to-Transform-the-Future-of-Work/default.aspx (18 Feb 2025)

### Rabbit R1
- **Job claimed (2024):** Handheld AI agent with a “Large Action Model” that would operate the apps on your phone for you. Designed by Teenage Engineering. $199.
- **What shipped:** Orange 78×78×13 mm handheld, 2.88" LCD, PTT button, 8MP camera, Wi-Fi + **4G LTE** (empty SIM slot, unlocked), 1000 mAh battery. Cloud-dependent. Rabbithole web portal. (Official user guide, last updated **8 Apr 2026**)
- **Status:** **Alive, still updating, still niche, still not a phone.** Official user guide dated 8 Apr 2026. Community release notes show OTAs through **22 Jul 2026** (rabbitOS 2.3: Hermes agent, OpenClaw protocol v4, DLAM moved to BYOK). Company still operating as of those posts. Some secondary blogs in 2026 claim the hardware was sunset; **that contradicts rabbit.tech and the official forum**. Treat those blogs as unreliable.
- **What it became:** Voice Q&A, camera identify, translation, recordings, Spotify/Apple Music (paid accounts), timers/alarms, “creations,” intern agent, DLAM computer-control over USB, OpenClaw/Claude Code/Hermes as *remote terminals to a PC*. Not a phone replacement. Jesse Lyu, 21 May 2025: “when r1 first rolled out, the experience was rough… today we’re still working hard… We’ll see what rabbit can offer by 2026.” Jony Ive, same week: R1 and Pin were “very poor products.” David Pierce (launch era): “a worse and less functional version of your smartphone.”
- **Fatal friction:** Launch demo vs. shipped software (LAM did not drive apps as advertised). Cloud tether. Small screen. Latency (they claimed 3× faster responses in the 28 Apr 2026 OTA, which is itself evidence the problem persisted into 2026). Battery historically weak (1000 mAh; they shipped multiple battery OTAs in 2026). Not cellular-as-your-number in any documented consumer sense — Wi-Fi-first setup, “empty SIM card slot.” The 2026 product is a **pocket agent remote**, not a phone.
- **Sources:** https://www.rabbit.tech/r1-user-guide (updated 8 Apr 2026); https://forum.rabbitcommunity.tech/t/rabbitos-release-notes/40 (notes through 22 Jul 2026); https://www.theverge.com/news/671955/jony-ive-rabbit-r1-humane-ai-pin (21 May 2025)

### Friend.com necklace (originally Tab)
- **Job claimed:** Emotional companion / “confidant, friend, God” — **explicitly not an assistant**. Avi Schiffmann: “It is not an assistant, and it is not a lover.” Originally pitched 2023 as **Tab**, a neck-worn always-listening mic that texted you via phone. (Fast Company on Tab, 2024; TechCrunch 30 Jul 2026)
- **What shipped:** v1: ~$99–$129 pendant, Bluetooth to phone, text replies, no speaker. **Friend 2.0** announced **30 Jul 2026**: built-in speaker, **$249**, optional **$9.99/mo** to keep memories past 30 days. OpenAI realtime voice. Pairs with an iPhone app. (TechCrunch 30 Jul 2026; The Verge 30 Jul 2026)
- **Status:** **Alive, tiny, controversial.** Seed $2.5M (Jul 2024); ~$1.8M of that spent on friend.com domain. NYC subway ads 2025 defaced (“AI is not your friend”); protest ~9 months before the 2.0 relaunch. One secondary write-up (The Dissent) says no Series A disclosed; that is **unverified here**. Unit volumes: secondary sources cite ~3,000 sold / ~1,000 shipped by fall 2025 or a 5,000-unit first run — **treat as unverified** unless a primary filing appears. Wired (via secondary) quoted Schiffmann wanting 50,000 of v2 and skipping EU over GDPR cost — **not independently fetched**.
- **Fatal friction:** Social/moral backlash to always-on companionship. Phone tether (v1 required the phone for replies). No task completion (founder refuses the assistant job). Price doubled with a subscription. Always-listening privacy. Domain spend vs. product spend. Tab **is this product**, not a separate shipping gadget.
- **Sources:** https://techcrunch.com/2026/07/30/friend-the-lonely-ai-wearable-returns-with-a-new-voice-and-a-much-bigger-price-tag/ (30 Jul 2026); https://www.theverge.com/gadgets/973163/friend-re-launches-its-ai-pendant-with-a-speaker-that-talks-to-you-for-twice-the-price (30 Jul 2026); https://www.fastcompany.com/91007630/avi-schiffmanns-tab-ai-necklace-has-raised-1-9-million-to-replace-god (Tab origin)

### Limitless Pendant / Rewind
- **Job claimed:** Memory augmentation. Pendant records in-person conversation → transcripts + searchable summaries. Predecessor **Rewind** was a Mac app that recorded screen + audio.
- **What shipped:** $99 clip/lanyard pendant + app. Subscription (Unlimited plan). Desktop Rewind app.
- **Status:** **Acquired by Meta 5 Dec 2025.** Sales stopped that day. Existing users moved to free Unlimited, support “for at least another year” (through 2026). Rewind screen/audio capture disabled **19 Dec 2025**. Service ended **5 Dec 2025** in EU, UK, Brazil, China, Israel, South Korea, Turkey. Team joined Reality Labs wearables. Raised **>$33M** (a16z, First Round, NEA). May 2026: TechCrunch, citing The Information, reported Meta internally exploring its own AI pendant for 2027 testing — **report, not a shipped product**.
- **Fatal friction:** Always-recording social/legal problem (especially EU). Phone companion required. Category crowded by Plaud/Bee. Independent hardware startup vs. Meta/OpenAI building their own wearables. CEO Dan Siroker (5 Dec 2025): “Hardware startups were considered unfundable, and a business that did both AI and hardware would have been considered ludicrous.” Then they sold.
- **Sources:** https://techcrunch.com/2025/12/05/meta-acquires-ai-device-startup-limitless/ (5 Dec 2025); https://www.engadget.com/ai/metas-latest-acquisition-suggests-hardware-plans-beyond-glasses-and-headsets-212930339.html (5 Dec 2025); https://techcrunch.com/2026/05/30/meta-is-reportedly-developing-an-ai-pendant/ (30 May 2026)

### Bee Pioneer
- **Job claimed:** Ambient personal AI that listens all day, builds understanding, turns conversations into summaries, to-dos, insights. “Cloud phone” vision (Zollo to TechCrunch, 2024): a mirror of your phone so Bee can message and remind.
- **What shipped:** $49.99 wristband/clip, dual mics, LED, USB-C, claimed **7-day / 160+ hour** battery. Button start/stop. iOS + Apple Watch; Android “early access, not actively supported.” US shipping only. Official FAQ (fetched 31 Aug 2026): Premium subscription “in the future,” details forthcoming. TechCrunch at acquisition time cited **$19/month** — **may have changed**; current official page does not list an active price.
- **Status:** **Alive inside Amazon.** Acquisition announced **22 Jul 2025** (undisclosed terms; Bee had raised $7M). Team (~8 people) joined; Amazon VP Daniel Rausch (Seattle Times, CES 2026 window): “It’s certainly an Amazon device and service at this point… stay tuned.” Features shipped post-close: Voice Notes, Daily Insights, Actions (email/calendar drafts). Privacy pitch: no audio stored; post-Amazon, “not even Amazon or Bee” can read transcripts unless user shares. US-only. Halo Band precedent: Amazon killed a wearable in 2023.
- **Fatal friction:** Always-listening + Amazon’s data reputation. Bystander consent / recording law. Phone app still required. US-only. “Cloud phone” (SMS without the phone) **not evidenced as shipped**. Camera never shipped (Zollo: first prototype had vision, “too expensive”). Brand likely to be absorbed into Alexa+.
- **Sources:** https://techcrunch.com/2025/07/22/amazon-acquires-bee-the-ai-wearable-that-records-everything-you-say/ (22 Jul 2025); https://www.aboutamazon.com/news/devices/bee-amazon-wearable-ai-device-new-features ; https://bee.computer/bee-pioneer (fetched 31 Aug 2026); https://www.seattletimes.com/business/amazon-has-big-hopes-for-wearable-ai-starting-with-this-50-gadget/

### Plaud (Note / NotePin / NotePin S / Note Pro)
- **Job claimed:** Wearable/table AI **note-taker** for in-person (and, on some SKUs, phone-call) conversations. Transcripts, summaries, templates. Not a phone. Not a companion.
- **What shipped:** Note (card, magnetic to iPhone), NotePin ($159, wearable, 20h record, 64GB), NotePin S ($179, CES 2026, physical button, Press-to-Highlight, Find My), Note Pro (~$189, display). Free 300 transcription min/mo; Pro/Unlimited paid. Official anniversary post (Jul 2026) and product pages still selling as of late Aug 2026 (NotePin 30% off ending 30 Aug 2026 on plaud.ai).
- **Status:** **Alive, commercial, narrow.** Claims 2M+ users / 170+ countries on regional sites — **company marketing, not independently audited**. This is the one AI wearable that found a job (capture a meeting you are physically in) and stayed in it.
- **Friction (not fatal, but real):** Cloud AI + subscription. Visible wearable = social awareness. Original NotePin’s squeeze control was a complaint; S added a real button. Phone-call recording is SKU-limited (NotePin “no VCS sensor”). Hardware is a microphone with a software loop — reviewers argue a phone app eventually commoditizes the device.
- **Sources:** https://www.plaud.ai/products/plaud-notepin ; https://www.plaud.ai/blogs/articles/plaud-notepin-vs-plaud-notepin-s ; https://www.plaud.ai/blogs/articles/plaud-anniversary ; https://www.engadget.com/mobile/smartphones/light-phone-iii-review-minimalism-stretched-to-the-point-of-frustration-141559294.html is *not* Plaud — Plaud coverage also https://androidguys.com/news/plaud-notepin-s-hands-on-review-a-wearable-ai-note-taker-for-in-person-work/ (18 Jun 2026)

### Tab
- **Status:** **Not a separate 2026 product.** Tab was Avi Schiffmann’s 2023–24 name for what became Friend.com (see above). A Hackster.io hobby project also named “Tab” exists; it is not a consumer company. Do not treat Tab as a live competitor.

### Brilliant Labs Frame → Halo
- **Job claimed:** Open-source AI glasses. Frame (2024, $349): Noa assistant, translations, identify-what-you-see, monocular display. Halo (announced 1 Aug 2025, $299): Wayfarer-like, 0.2" microOLED, bone conduction, NPU, claimed 14h, “Narrative” memory, “Vibe Mode” natural-language apps. Shipping **expected late Nov 2025** at announcement.
- **Status as of 31 Aug 2026:** Frame shipped as a developer/open device. Halo was preorder as of Aug 2025. **Whether Halo actually shipped to consumers in volume, and current sell-through, is unknown from the pages fetched.** A Mar 2026 BusinessWire (Neuphonic/TheStage) still talked about Halo with on-device voice “Q1 2026 at $349” — **price/date conflict with The Verge’s $299 / Nov 2025**, so treat Halo’s 2026 commercial reality as **unverified**.
- **Friction:** Developer-niche, not mainstream. Glasses + camera social issues (same as Meta). Phone/app still in the loop. Open-source is a different bet than Humane’s closed cloud.
- **Sources:** https://www.theverge.com/news/717387/brilliant-labs-halo-smart-glasses-noa-ai (1 Aug 2025); https://www.foxbusiness.com/fox-news-tech/former-apple-exec-introduces-new-ai-powered-glasses (Frame, 9 Feb 2024)

---

## Cluster 2 — Digital-detox / dumb phones still in market

### Light Phone III
- **Job claimed:** “A tool for a better life.” Call, text, optional tools (alarm, calculator, calendar, directory, directions, hotspot, music, notes, podcasts, weather, **authenticator/2FA**, timer). **Never** social, browser, email, news, ads. Unlocked. Optional Light Service.
- **What shipped:** 3.92" matte AMOLED, 5G, USB-C, NFC (wallet **not yet enabled**), fingerprint (hardware present), camera with two-step shutter, clickable brightness wheel. Nano SIM + eSIM. Qualcomm SM4450, 128GB/6GB, 1800 mAh, IP54. First units shipped **Mar 2025**. Official site (fetched 31 Aug 2026): pre-orders **$899 unlocked** or from **$59/mo / 2-year Light Service**; next batch **Sep 2026**. Engadget reviewed a **$599** unit (9 May 2025) — price has moved up. Tools added over time; **no Spotify/Signal/WhatsApp/rideshare** as of the official FAQ.
- **Status:** **Alive, selling, backordered.** Light Phone II still produced. Developer program for community tools (e.g. unofficial Paka 2FA/passes).
- **What buyers still complain about (evidenced):**
  - **iMessage / RCS black hole.** Official support: “YOU MUST DISABLE iMessage and RCS… If you do not… you may miss messages.” Apple’s iMessage stays bound to the number. (Light support article, fetched 2026)
  - **Texting without autocorrect.** Engadget (9 May 2025): “trying to text was the fatal flaw”; “If I try to text at a speed similar to that on my iPhone, my messages are riddled with typos.” Consumer Reports: slower keyboard, no tapbacks, links unclickable (forwarded to email).
  - **2FA / tickets / banking / QR.** Engadget: “I need two-factor authentication apps… concert… deposit a check.” Light later shipped an Authenticator tool; community still builds Paka. **Payments:** NFC chip is in hardware; **digital wallet “not yet available.”** Analog Notes (Sara Covey): missed Apple Pay most; parking-garage app, QR order, restaurant missing from Directions.
  - **Maps.** Directions uses HERE; “enough to get the job done” (Engadget) but no real-time transit comparable to Google/Apple. Leo Aram-Downs: “Here Maps is harmfully inaccurate… ‘Going Light’ shouldn’t mean getting lost.”
  - **Music.** Local files via web dashboard; no Spotify; “worse than an iPod in 2003” until a promised rewrite (Engadget).
  - **Being a phone.** Cyrus Ashayeri, 100 days: stopped because “the Light Phone didn’t function well as a phone” — charging stalls, reception vs. iPhone on same carrier, voicemail via dial-own-number, settings not sticking.
  - **Price.** $599 (2025 reviews) → $899 pre-order (Aug 2026 site). CR compared unfavorably to iPhone 17e at $599 and cheap flips.
  - **eSIM dual-life is harder now.** Engadget: “now that eSIM has taken over, it’s not as simple as just popping a SIM card into my iPhone.”
- **Sources:** https://www.thelightphone.com/lightiii ; https://support.thelightphone.com/hc/en-us/articles/360052928751-Disabling-iMessage-RCS ; https://www.engadget.com/mobile/smartphones/light-phone-iii-review-minimalism-stretched-to-the-point-of-frustration-141559294.html (9 May 2025); https://www.consumerreports.org/electronics-computers/cell-phones/light-phone-3-review-a1105801271/ ; https://analognotes.substack.com/p/10-months-in-the-light-phone-iii ; https://cyrusashayeri.substack.com/p/100-days-with-the-light-phone-iii ; https://www.leoaramdowns.com/post/three-years-of-the-light-phone ; https://nymag.com/strategist/article/light-phone-3-review.html

### Mudita
- **Pure:** Discontinued. Forum, company: “as of today, we have no plans to revive the Mudita Pure” — boutique cannot compete with HMD/Nokia on price; users demanded GPS, music, messaging until the ultra-minimal audience proved too small. (Mudita Forum)
- **Kompakt:** **Alive.** E-ink 4.3" Android, $439, sideload via desktop app (friction is the point), IP54, 3300 mAh claimed ~6 days, 3.5mm jack. Android Authority CES 2026 hands-on (14 Jan 2026): first minimal phone the reviewer was “actually tempted to buy”; WhatsApp/Spotify sideloaded, Spotify slow on e-ink. Middle path vs. Light (no sideload) and Boox Palma (Play Store on device).
- **Sources:** https://forum.mudita.com/t/are-there-plans-to-revive-the-pure/10471 ; https://www.androidauthority.com/mudita-kompakt-hands-on-ces-2026-3631800/ (14 Jan 2026)

### Punkt MP02
- **Job:** Jasper Morrison-designed 4G minimalist: calls, texts, Wi-Fi tether, encrypted Pigeon messaging. No app store.
- **Status:** Official punkt.ch page still lists the product at CHF 299 but **“Out of stock”** with notify-me (fetched via search snippet 2026). Security updates: “Last update: 5 August 2021. No further Android/Vendor updates planned.” US: AT&T verified; T-Mobile coverage without VoLTE; **Verizon not supported**. Vice review 5 Jun 2026: scattered Amazon/Reddit reports of **signal dropping**; anecdotal, no clear geographic pattern.
- **Friction:** Carrier bands, VoLTE, abandoned OS updates, premium price vs. Nokia/HMD flips, stock uncertainty.
- **Sources:** https://www.punkt.ch/products/mp02-4g-minimalist-phone ; https://www.vice.com/en/via/punkt-mp02-dumbphone-review/ (5 Jun 2026)

### Heineken Boring Phone (Bodega × HMD)
- **Not a product you can buy.** 5,000-unit 2024 promo giveaway (Milan Design Week, 17–18 Apr 2024). No internet/social. Research stat Heineken cited: 90% of surveyed Gen Z/Millennials doomscroll on nights out. An app “that will turn smartphones boring” was promised for Jun 2024. **2026 commercial availability: none.** Closest buyable analogue: Nokia/HMD flips (e.g. 2660).
- **Sources:** https://www.dezeen.com/2024/04/18/boring-phone-heineken-bodega/ (18 Apr 2024); https://www.globenewswire.com/news-release/2024/04/17/2864283/0/en/Dialing-Up-Nights-Out-Heineken-Bodega-Launch-the-No-Frills-Boring-Phone.html (17 Apr 2024)

---

## Cluster 3 — 2025–2026 “leave the phone” / attention hardware discourse

### Daylight Computer DC-1
- Paper-like 60 fps grayscale LivePaper tablet, ~$729, Android 13, no camera, amber backlight, stylus. Job: healthier computer for reading/writing, not a phone.
- **Live complaint:** Promise vs. software. “Sol:OS” full vision not delivered; last security-patch mention in one owner essay: **17 Feb 2026**, still on Android 13. Handwriting lag vs. iPad (HN). Outdoor readability praised. Niche, expensive, first-gen.
- **Sources:** https://daylightcomputer.com/ (site fetch timed out 31 Aug 2026; positioning from search + reviews); https://adventure.com/daylight-computer-tablet-gear-review/ ; https://news.ycombinator.com/item?id=43098318 ; https://casewrites.leaflet.pub/3mt5ap4xpxs2a

### reMarkable Paper Pro Move
- 7.3" color E Ink notebook, **$449**, released 2025. No browser, no app store, no email. Job: handwriting only.
- **Live complaint:** It is excellent at one job and hostile to every other. Connect subscription gates search/cloud. Price vs. a $25 notepad (WIRED). Not a communicator.
- **Sources:** https://www.wired.com/review/remarkable-paper-pro-move/ ; https://www.trustedreviews.com/reviews/remarkable-paper-pro-move (first reviewed 3 Sep 2025)

### Apple Intelligence + AirPods as interface
- **Shipped (not rumored):** Live Translation on AirPods 4 ANC / Pro 2 / Pro 3 / Max 2, **iPhone 15 Pro or later**, **iOS 26**, Apple Intelligence on. Processing on iPhone. Apple Support published **31 Mar 2026**. User still needs the phone in range; reply to a non-AirPods speaker is shown/played on the **iPhone**.
- **Not yet shipped (leak):** Camera-equipped AirPods + Visual Intelligence demo found in macOS Tahoe 26.7 RC (~18 Aug 2026). Voiceover: “With Visual Intelligence, your world becomes savable.” M.G. Siegler (quoted by TNW): “The first thing you’ll notice is that there is no phone.” Hair-obstruction warning in strings. **Apple has not announced this.** Fall 2026 event timing is speculation.
- **Implication:** Apple is moving the **interface** to earbuds while keeping the **compute/identity** on the iPhone. That is the opposite of a phone-replacement pod — unless you already own the phone.
- **Sources:** https://support.apple.com/en-us/123185 (published 31 Mar 2026); https://appleinsider.com/articles/26/08/18/a-demo-video-of-airpods-with-cameras-has-leaked-via-a-macos-tahoe-rc (18 Aug 2026)

### Meta Ray-Ban / Oakley AI glasses
- **Shipped and mainstream-adjacent.** Ray-Ban Meta, Oakley Meta, Meta Ray-Ban Display (in-lens). Starting prices in Meta store listings ~$224–$299 (store page fetched via search, Aug 2026). Multimodal Meta AI, 12MP camera, open-ear audio, navigation. Display SKU: closed Meta ecosystem (Messenger/WhatsApp/Instagram only for messaging), limited notifications (PCMag 2026).
- **Live consumer complaint, summer 2026:** **privacy / “pervert glasses.”** Guerrilla ads in NYC, London, DC. Verge, 27 Jul 2026: LED-only policy failed; users tampered with the privacy light; Meta shipping a mandatory update that **kills the camera if the LED is tampered**; Instagram will take down glasses-harassment video. FT reported (via Verge) Meta interest in 24/7 recording. Opt-out of voice-training removed. University of Washington’s Ananthakrishnan: you cannot hinge privacy on a single light; wearer becomes “perpetrator” of others’ privacy. Attention Sphere’s Kendall Schrohe: “there is nothing privacy-preserving about sunglasses with a built-in camera.”
- **Sources:** https://www.meta.com/ai-glasses/ ; https://www.theverge.com/tech/970948/meta-smart-glasses-privacy-wearables (27 Jul 2026); https://www.theguardian.com/technology/2026/aug/06/meta-ai-smart-glasses-privacy (6 Aug 2026)

### Samsung Galaxy Watch9 LTE
- Cellular watch can call/text/stream without the phone. Gemini on wrist. **Battery: about a day.** Premium health AI locked to Galaxy phones. This is “leave the phone on a run,” not “replace the phone.”
- **Sources:** Samsung regional Watch9 LTE pages; https://www.trustedreviews.com/reviews/samsung-galaxy-watch-9

### Nothing Phone / Essential Space
- Nothing OS **5.0** open beta **26 Aug 2026** (Phone 3), Android 17. **Away Time** widget tracks time *away* from the phone, not screen time. Essential Space: Smart Collections + **MCP** so external agents can read selected data. Essential Voice still on the phone. Digital Trends (Aug 2026): OS wants you to “stop switching apps and start living in your phone” — i.e. **a better phone**, not leaving it.
- **Sources:** https://www.droid-life.com/2026/08/26/nothing-os-5-0-has-insane-amount-of-changes-heres-the-rollout-schedule/ (26 Aug 2026); https://www.digitaltrends.com/phones/nothing-os-5-0-wants-you-to-stop-switching-apps-and-start-living-in-your-phone/

### Apple Screen Time / Digital Wellbeing
- No major 2026 “Screen Time is solved” story fetched. The interesting 2026 move is Nothing’s inversion (reward Away Time) and Light/reMarkable’s hardware refusal. **Apple’s own wellbeing news in 2026 is not a primary driver of this category based on pages fetched.** Unknown if a major Screen Time overhaul shipped in iOS 26 beyond Apple Intelligence features.

### OpenAI × Jony Ive hardware
- May 2025: ~$6.5B io deal; Ive called Pin and R1 “very poor products” / “absence of new ways of thinking.” (The Verge, 21 May 2025)
- **Aug 2026:** Bloomberg via The Verge (6 Aug 2026): first device is a **battery puck / doughnut smart speaker, no display, camera + sensors, >$300, launch 2027**, ChatGPT voice (GPT-Live), carry-around-the-home, family of ~5 devices planned. Apple trade-secret suit (Jul 2026) is a live legal risk; injunction request could complicate hardware. **Not a 2026 shipping phone-replacement.**
- **Sources:** https://www.theverge.com/news/671955/jony-ive-rabbit-r1-humane-ai-pin (21 May 2025); https://www.theverge.com/ai-artificial-intelligence/976431/openai-chatgpt-battery-smart-speaker-rumor (6 Aug 2026)

---

## Cluster 4 — Personal AI agents on commodity hardware

### ChatGPT Advanced Voice / GPT-Live and Gemini Live
- Voice agents run on the phone you already own. Secondary comparison pieces in 2026 describe GPT-Live replacing Advanced Voice (full-duplex) vs. Gemini Live (camera/screen, Android-first). **Exact model names and feature gates change often; treat any blog comparison as perishable.** What is stable: **the UI is AirPods/earbuds + phone**, not a new gadget.

### Apple Intelligence
- On-device + Private Cloud Compute, tightly coupled to iPhone 15 Pro and later. AirPods are an accessory, not a standalone computer (see Cluster 3).

### OpenClaw (self-hosted)
- Open-source MIT gateway. One process on your machine/server bridges WhatsApp, Telegram, iMessage, Signal, Slack, Discord, etc. to an agent with tools/memory. iOS/Android **nodes** for camera, screen, voice. Docs: “Send a message, get an agent response from your pocket.” Rabbit R1 added OpenClaw protocol v4 in rabbitOS 2.3 (10 Jul 2026) so the orange brick can be a **remote** to a self-hosted agent. GitHub shows a very large star count (search snippet: 388k) — **do not treat star count as MAU**.
- **Who it is for:** developers and power users who will run a gateway, hold API keys, and accept ops burden. Not a consumer SKU.
- **Sources:** https://docs.openclaw.ai/ (fetched 31 Aug 2026); https://github.com/openclaw/openclaw/ ; Rabbit forum 10 Jul 2026 notes

### Is the market moving to “software agent + existing earbuds”?
**Yes, for the mass market.** Evidence: Apple Live Translation (shipped, phone-tethered); Meta putting AI in glasses people already accept as fashion; ChatGPT/Gemini voice on phones; Rabbit’s 2026 relevance coming from driving **Claude Code / OpenClaw / DLAM on a PC you already have**; Nothing exposing Essential Space via MCP. The counter-evidence is OpenAI/Ive still funding a 2027 puck, Amazon still iterating Bee, and Friend 2.0 doubling down on a necklace — i.e. **incumbents and a few zealots still try new form factors**, while the default consumer path is software on incumbents’ hardware.

---

## Cluster 5 — MVNO / eSIM consumer kits

### What works
- **Gigs OS:** “Telecom operating system” for brands (fintechs, neobanks, device makers). Carrier of Record, eSIM provisioning, billing, tax, KYC, number porting, white-label checkout. Named public users in Gigs’ own 2026 materials: Revolut, Nubank, Klarna, NETGEAR, LATAM, Sezzle, OnePay, Xplora. US connectivity described as AT&T among others. Series B **$73M, Dec 2024** (secondary MVNE guide; not re-fetched from a Gigs IR page). This is the realistic path for a hardware company that wants a **dedicated number without becoming a telco**.
- **1oT:** IoT/M2M eSIM (SGP.32), SM-DP+, fleet provisioning. Built for devices that ship with connectivity, not for consumer “get a phone number and iMessage.” Wrong tool if the job is a human SMS identity.
- **Light Phone** already sells optional cellular ($25/mo+ on site; $59/mo bundled pre-order). Humane sold T-Mobile as a **mandatory $24/mo** — that tax became part of the failure story.
- **Samsung / Apple Watch LTE** prove consumers will pay a watch line to leave the phone **for a workout**, not as a lifestyle OS.

### What’s hard (evidenced)
- **Second number = identity break.** WIRED on Humane: cannot sync Pin number to your cell number; you must re-introduce yourself. Light: iMessage/RCS must be killed or texts vanish.
- **eSIM is not “Wi-Fi for cellular.”** How-To Geek: transfers after a dead/stolen phone often need carrier support; SIM-swap fraud controls add friction. Digital Trends: KYC ID requirements abroad; many carriers will not provision eSIM while roaming; stolen-phone story required Google Fi specifically. Keep-old-line-until-port-completes or you lose the SMS that verifies the port.
- **2FA chicken-and-egg.** The number is the authenticator for the number. A bricked or server-killed device (Humane, 28 Feb 2025) is also an identity event.
- **Device certification / bands / VoLTE.** Light III: Verizon new-SIM activation lagged; carrier SMS “device not compatible” even when it worked. Punkt: Verizon no, T-Mobile no VoLTE. Humane: T-Mobile only.
- **Regulatory pack:** E911, CPNI, telecom tax, state KYC. Gigs’ pitch is that this pack is why startups should not DIY. That is a vendor claim, but the existence of the product is evidence the pack is real.
- **Sources:** https://gigs.com/use-cases/mvno-in-a-box ; https://gigs.com/content-for-ai/how-us-fintechs-and-neobanks-can-launch-an-mvno-fast ; https://www.1ot.com/products/iot-esim ; https://www.howtogeek.com/esim-was-supposed-to-replace-sim-cards-carriers-turned-it-into-a-trap/ ; https://www.digitaltrends.com/phones/apple-samsung-and-google-need-to-figure-out-esims/

---

## Cluster 6 — Fundraising / hardware climate 2025–2026 (quotes only)

Do not treat the following as advice. These are sourced comments.

1. **Jony Ive, May 2025**, on Humane Pin and Rabbit R1: “Those were very poor products. There has been an absence of new ways of thinking expressed in products.” (The Verge, 21 May 2025, quoting Bloomberg)
2. **Jesse Lyu (Rabbit), 21 May 2025:** “we don’t like to be put side by side with Humane, a company that stopped trying, got acquired, and shut down.” Also: launch was “rough”; they would keep shipping into 2026. (same Verge piece)
3. **Dan Siroker (Limitless), 5 Dec 2025:** “When we started Limitless five years ago… Hardware startups were considered unfundable, and a business that did both AI and hardware would have been considered ludicrous. But today is different.” Then they sold to Meta and **stopped selling the hardware**. (TechCrunch, 5 Dec 2025)
4. **Humane math (reported, not a VC essay):** ~$230M raised → $116M HP asset sale → customer devices **bricked** 28 Feb 2025. Sought $750M–$1B in May 2024. (TechCrunch 18 Feb 2025)
5. **Battery Ventures, 5 Mar 2026**, Isabel von Stauffenberg / Michael Hoeksema / Marcus Ryu: “For the last two decades, VC conventional wisdom has favored software-only business models because of their higher gross margins, rapidly scalable distribution, and customer lock-in.” Their proposed exception is **hardware-enabled software** in *vertical enterprise* (cameras in warehouses, senior-living sensors) — “anchors intelligence in first-party data gathered by hardware deployed by the company” with “long-term recurring contracts.” This is **not** a consumer-gadget thesis and should not be quoted as one. (https://www.battery.com/blog/hardware-enabled-software-and-the-next-generation-of-vertical-ai/)
6. **Visible deaths / absorptions, 2025–26:** Humane Pin (consumer dead); Limitless Pendant (sales dead, team at Meta); Bee (independent brand likely ending, Amazon); Rewind app (killed 19 Dec 2025); Amazon Halo (precedent, 2023). Rabbit is the exception that kept the SKU and moved value to **PC agents + cloud**. Friend kept a SKU with tiny distribution.
7. **OpenAI/Ive** still raising/spending at giant scale for 2027 hardware, while simultaneously shipping the capability on phones. That is not a signal that *seed-stage* consumer gadgets are fundable; it is a signal that **only a foundation-model company plus Ive** is still allowed to try a new object.

Secondary blogs that claim “$1.2B AI hardware wipeout” or “Rabbit sunset the hardware” were not used; they conflict with primary pages.

---

## Recurring unmet needs (only where evidenced)

1. **Do the one-step thing without opening the attention trap.** Pierce, 11 Apr 2024: “I do lots of things on my phone that I might like to do somewhere else.” “A one-tap way to say, ‘Text Anna and tell me I’ll be home in a half-hour’… would be amazing.” The Pin failed to deliver it; the *need* was real.
2. **Keep a working SMS identity without iMessage jail.** Light’s own support article is the proof: leaving iPhone without deregistering iMessage **drops messages**. Humane’s separate number forced “why is this stranger texting me.”
3. **2FA / tickets / payments / QR as the actual lock to the smartphone.** Engadget Light III (9 May 2025); Analog Notes (Apple Pay, parking-garage app, QR menus). Light added an Authenticator tool *because* this was the complaint; NFC wallet still unshipped on official FAQ.
4. **Maps that do not get you lost, without Google’s infinite surface.** Repeated Light community complaint; HERE is “enough” (Engadget) and “harmfully inaccurate” (Aram-Downs) depending on the writer — i.e. **unsolved**.
5. **Reachability without a feed.** Heineken research (Apr 2024): 90% doomscroll on nights out; 32% would rather switch off. Light/Mudita/Punkt demand is the paid version of that. Galaxy Watch LTE is the *workout* version. Nobody has the *day-long, SMS-real, feed-absent* version that also does 2FA and payments.
6. **Latency you can trust.** Humane: half of actions failed. Rabbit spent 2026 OTAs on “up to 3× faster” and less filler speech (28 Apr 2026). Voice agents that take 4–7 seconds (OpenClaw GitHub issue on STT→LLM→TTS vs. Gemini Live) feel like a broken phone.
7. **A device that does not brick when the startup dies.** Humane 28 Feb 2025 is now the reference trauma. Limitless gave a 1-year sunset. Cloud-only AI hardware is a consumer-trust problem, not just a tech problem.
8. **Bystander-safe form factor.** Chest pins look like bodycams (WIRED). Glasses are “pervert technology” in 2026 street ads (Verge, 27 Jul 2026). Necklaces got physically defaced in the NYC subway. Earbuds are the one input people already wear without a culture war.

---

## What is NOT a gap (already served, or proven dead)

| Claimed gap | Reality | Evidence |
|---|---|---|
| “AI pin / palm projector as phone OS” | Proven dead | Humane reviews + HP brick, Feb 2025 |
| “LAM that drives all your apps from a $199 brick” | Not delivered; R1 survived as a different product | Launch reviews; 2026 R1 is a PC-agent remote |
| “Always-on necklace friend” | Tiny, socially rejected | Friend ads defaced; 2.0 is a price hike not a category win |
| “Recorder as second brain / memory prosthetic” | Occupied by Plaud (alive) and Limitless/Bee (sold to Meta/Amazon). RealmZ doctrine says this is **not** the job. | Plaud still selling; Meta/Amazon M&A |
| “Dumb phone that is also iMessage/WhatsApp/Spotify/Uber” | Contradiction; Light/Mudita/Punkt exist by refusing it | Light official FAQ |
| “Leave the phone on a run” | Galaxy Watch LTE / Apple Watch Cellular | Samsung Watch9 pages |
| “Paper-like attention surface for writing/reading” | reMarkable, Daylight, Kindles | 2025–26 reviews |
| “Voice AI in earbuds you already own” | ChatGPT, Gemini, Apple Live Translation | Apple Support 31 Mar 2026 |
| “Fashion AI glasses” | Meta × Luxottica, with a privacy backlash | Meta store; Verge 27 Jul 2026 |
| “Consumer MVNO-in-a-box for a brand” | Gigs (and peers) sell this to fintechs | Gigs site |
| “Open-source glasses for developers” | Brilliant Labs Frame (Halo 2026 volume unknown) | Verge 1 Aug 2025 |

---

## Implications for a pod + earbuds + MVNO + agent product

### Where there is a real opening (evidenced, not hoped)

1. **The one-step task, completed, then silence.** Pierce wanted this; Humane could not do it; Light refuses AI; AirPods still bounce you to an iPhone screen for half the job (show the translation on the phone). A pod that **finishes SMS / lookup / timer / dictate / 2FA code / “text I’m late”** and does not then offer a feed is not occupied. Plaud occupies *memory*. Friend occupies *loneliness*. Light occupies *abstinence*. Watches occupy *workouts*. Nobody occupies **least-attention task completion with a real phone number**.
2. **Earbuds as I/O, not as the computer.** Apple is proving the I/O. Humane proved the computer cannot be a chest pin. A pocket pod (compute + radio + optional camera that stays in the pocket) plus the user’s existing AirPods/earbuds avoids the glasshole/bodycam problem. This is closer to a **carryable radio** than to Frame/Halo/Ray-Ban.
3. **A dedicated line that is the *same* identity, or a cleanly ported one — not a surprise second number.** Humane’s extra T-Mobile line was a human-factors failure. Light’s iMessage trap is the other failure. Gigs-class MVNO + number port + iMessage deregistration UX is the actual product work. The wholesale layer exists; the **identity design** does not.
4. **Survive the company.** Humane bricked customers. Any 2026 buyer will ask this. On-device fallback (calls/SMS/2FA without cloud) is now table stakes because of Feb 2025. OpenClaw-style “agent runs on hardware you control” is the cultural tailwind; a closed CosmOS is the anti-pattern.
5. **Optional screen/camera, default off.** Meta’s 2026 backlash is specifically about **always-on face cameras**. A pocket camera you choose to raise is socially closer to a phone than to glasses. Daylight/reMarkable show demand for a calm screen that is not a phone; they are not cellular. A pod with a *holstered* screen is not a proven product, but it does not repeat the Pin’s “project on your palm in Chipotle” failure.

### Where it would repeat a known failure

1. **Shipping before the agent actually completes the task.** Pin and R1 both lost the market on launch-day reliability, not on vision. “Half the time it doesn’t call” is fatal. Do not demo a LAM you cannot ship.
2. **Mandatory $20–25/mo just to have a dial tone + AI.** Humane. Bee’s $19 (if still charged) on $50 hardware. Friend’s $10 memory fee. Plaud gets away with a sub because the job is transcription minutes. A connectivity+agent sub has to be cheaper than “keep the iPhone plan I already have.”
3. **Cloud-only intelligence / bricking.** Feb 2025.
4. **Always-listening or always-seeing in public.** Limitless, Bee, Friend, Meta glasses. RealmZ already rejects recorder-as-memory; keep rejecting it. Push-to-talk (Rabbit, AirPods stems, Bee’s button) is the socially tolerated pattern.
5. **Watch-only.** Watch LTE already exists and still sends people back to the phone for 2FA, maps depth, tickets, and battery. Battery life of Watch9 is ~1 day. A pod can hold a real battery; a watch cannot.
6. **Trying to be a fashion object on the face or chest.** Meta spent Luxottica capital to make glasses normal and still got “pervert glasses” ads in 2026. Chest pins look like bodycams. Pocket + buds is boring, which is the point.
7. **Hardware without a software loop.** Plaud lives because transcripts hit a workflow. Rabbit 2026 lives because it remoted into Claude Code/OpenClaw. Humane died as an object. Battery Ventures’ 2026 essay is about enterprise sensors, but the consumer rhyme is the same: **the device is the on-ramp to a loop people reopen**. For WeekendWatch the loop must be *task completion*, not *engagement*.
8. **Pretending iMessage, 2FA, payments, and maps are optional.** Light buyers are the existence proof that a motivated minority will suffer; Engadget is the proof that the majority bounce. An agent product that cannot receive the SMS the bank just sent is not a phone replacement; it is a toy.
9. **Raising like Humane ($230M, phone-replacement story, TED demo) before the unit works.** Ive’s “poor products” line is now the default LP reaction. OpenAI/Ive get to try again because they are OpenAI/Ive. Everyone else is judged against the brick date.

### Doctrine check
“Never optimize for usage; optimize for successful task completion with the least attention required” is **aligned with the live complaint** and **orthogonal to every failed SKU**:
- Humane optimized for *ambient presence* and *novelty UI*.
- Friend optimizes for *relationship minutes*.
- Meta glasses optimize for *capture and Meta AI queries*.
- Light optimizes for *abstinence*, which is least-attention but also least-completion.
- Plaud/Bee optimize for *memory volume*.

The hole is **completion without presence**. That is a software-and-identity problem that happens to need a radio and a battery. If the pod exists to generate sessions, it is Humane. If it exists to finish the text and go dark, it is not yet a product anyone has shipped.

---

## URLs used

### Humane
- https://www.theverge.com/24126502/humane-ai-pin-review (11 Apr 2024)
- https://www.wired.com/review/humane-ai-pin/
- https://www.engadget.com/the-humane-ai-pin-is-the-solution-to-none-of-technologys-problems-120002469.html
- https://www.theverge.com/news/614883/humane-ai-hp-acquisition-pin-shutdown (18 Feb 2025)
- https://techcrunch.com/2025/02/18/humanes-ai-pin-is-dead-as-hp-buys-startups-assets-for-116m/ (18 Feb 2025)
- https://investor.hp.com/news-events/news/news-details/2025/HP-Accelerates-AI-Software-Investments-to-Transform-the-Future-of-Work/default.aspx (18 Feb 2025)
- https://www.theverge.com/news/671955/jony-ive-rabbit-r1-humane-ai-pin (21 May 2025)

### Rabbit
- https://www.rabbit.tech/r1-user-guide (updated 8 Apr 2026)
- https://forum.rabbitcommunity.tech/t/rabbitos-release-notes/40 (through 22 Jul 2026)

### Friend / Tab
- https://techcrunch.com/2026/07/30/friend-the-lonely-ai-wearable-returns-with-a-new-voice-and-a-much-bigger-price-tag/ (30 Jul 2026)
- https://www.theverge.com/gadgets/973163/friend-re-launches-its-ai-pendant-with-a-speaker-that-talks-to-you-for-twice-the-price (30 Jul 2026)
- https://www.fastcompany.com/91007630/avi-schiffmanns-tab-ai-necklace-has-raised-1-9-million-to-replace-god

### Limitless / Rewind / Meta pendant
- https://techcrunch.com/2025/12/05/meta-acquires-ai-device-startup-limitless/ (5 Dec 2025)
- https://www.engadget.com/ai/metas-latest-acquisition-suggests-hardware-plans-beyond-glasses-and-headsets-212930339.html (5 Dec 2025)
- https://techcrunch.com/2026/05/30/meta-is-reportedly-developing-an-ai-pendant/ (30 May 2026)

### Bee
- https://techcrunch.com/2025/07/22/amazon-acquires-bee-the-ai-wearable-that-records-everything-you-say/ (22 Jul 2025)
- https://www.aboutamazon.com/news/devices/bee-amazon-wearable-ai-device-new-features
- https://bee.computer/bee-pioneer
- https://www.seattletimes.com/business/amazon-has-big-hopes-for-wearable-ai-starting-with-this-50-gadget/
- https://www.cnbc.com/2025/07/22/amazon-ai-bee-wearable.html (22 Jul 2025)

### Plaud
- https://www.plaud.ai/products/plaud-notepin
- https://www.plaud.ai/blogs/articles/plaud-notepin-vs-plaud-notepin-s
- https://www.plaud.ai/blogs/articles/plaud-anniversary
- https://androidguys.com/news/plaud-notepin-s-hands-on-review-a-wearable-ai-note-taker-for-in-person-work/ (18 Jun 2026)

### Brilliant Labs
- https://www.theverge.com/news/717387/brilliant-labs-halo-smart-glasses-noa-ai (1 Aug 2025)
- https://www.foxbusiness.com/fox-news-tech/former-apple-exec-introduces-new-ai-powered-glasses (9 Feb 2024)
- https://www.businesswire.com/news/home/20260305577534/en/Smart-Glasses-Rebuilt-for-Privacy-Brilliant-Labs-Neuphonic-TheStage-AI-Move-AI-Off-the-Cloud (Mar 2026)

### Light Phone / dumb phones
- https://www.thelightphone.com/lightiii
- https://support.thelightphone.com/hc/en-us/articles/360052928751-Disabling-iMessage-RCS
- https://support.thelightphone.com/hc/en-us/articles/36100487624980-Light-Phone-III-Introduction
- https://www.engadget.com/mobile/smartphones/light-phone-iii-review-minimalism-stretched-to-the-point-of-frustration-141559294.html (9 May 2025)
- https://www.consumerreports.org/electronics-computers/cell-phones/light-phone-3-review-a1105801271/
- https://nymag.com/strategist/article/light-phone-3-review.html
- https://analognotes.substack.com/p/10-months-in-the-light-phone-iii
- https://cyrusashayeri.substack.com/p/100-days-with-the-light-phone-iii
- https://www.leoaramdowns.com/post/three-years-of-the-light-phone
- https://forum.mudita.com/t/are-there-plans-to-revive-the-pure/10471
- https://www.androidauthority.com/mudita-kompakt-hands-on-ces-2026-3631800/ (14 Jan 2026)
- https://www.punkt.ch/products/mp02-4g-minimalist-phone
- https://www.vice.com/en/via/punkt-mp02-dumbphone-review/ (5 Jun 2026)
- https://www.dezeen.com/2024/04/18/boring-phone-heineken-bodega/ (18 Apr 2024)
- https://www.globenewswire.com/news-release/2024/04/17/2864283/0/en/Dialing-Up-Nights-Out-Heineken-Bodega-Launch-the-No-Frills-Boring-Phone.html (17 Apr 2024)

### Attention hardware / incumbents
- https://daylightcomputer.com/
- https://adventure.com/daylight-computer-tablet-gear-review/
- https://news.ycombinator.com/item?id=43098318
- https://www.wired.com/review/remarkable-paper-pro-move/
- https://www.trustedreviews.com/reviews/remarkable-paper-pro-move
- https://support.apple.com/en-us/123185 (31 Mar 2026)
- https://appleinsider.com/articles/26/08/18/a-demo-video-of-airpods-with-cameras-has-leaked-via-a-macos-tahoe-rc (18 Aug 2026)
- https://www.meta.com/ai-glasses/
- https://www.theverge.com/tech/970948/meta-smart-glasses-privacy-wearables (27 Jul 2026)
- https://www.theguardian.com/technology/2026/aug/06/meta-ai-smart-glasses-privacy (6 Aug 2026)
- https://www.trustedreviews.com/reviews/samsung-galaxy-watch-9
- https://www.droid-life.com/2026/08/26/nothing-os-5-0-has-insane-amount-of-changes-heres-the-rollout-schedule/ (26 Aug 2026)
- https://www.digitaltrends.com/phones/nothing-os-5-0-wants-you-to-stop-switching-apps-and-start-living-in-your-phone/
- https://www.theverge.com/ai-artificial-intelligence/976431/openai-chatgpt-battery-smart-speaker-rumor (6 Aug 2026)

### Agents / MVNO / VC
- https://docs.openclaw.ai/
- https://github.com/openclaw/openclaw/
- https://gigs.com/use-cases/mvno-in-a-box
- https://gigs.com/content-for-ai/how-us-fintechs-and-neobanks-can-launch-an-mvno-fast
- https://www.1ot.com/products/iot-esim
- https://www.howtogeek.com/esim-was-supposed-to-replace-sim-cards-carriers-turned-it-into-a-trap/
- https://www.digitaltrends.com/phones/apple-samsung-and-google-need-to-figure-out-esims/
- https://www.battery.com/blog/hardware-enabled-software-and-the-next-generation-of-vertical-ai/ (5 Mar 2026)

---

*Compiled 31 Aug 2026 (PT) from fetched pages. Not investment advice. Prices and stock status change; re-check official stores before any product decision.*
