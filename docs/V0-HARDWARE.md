# RealmZ / WeekendWatch V0 — currently buyable hardware

Scan: **2026-09-01 PT**. Passion-project dogfood terminal. Does not rewrite the product thesis. Watch is a candidate I/O, not the product. No firmware, exploits, or bootloader-unlock guides.

V0 needs: full Android (not Wear OS), sideload a normal APK / set a launcher, prepaid SIM, LTE, mic/speaker or BT buds, US bands (LA, T-Mobile-friendly), prefer under ~$300. Form factor (wrist vs pocket brick) is a finding.

Detail files (do not treat as separate products):
- Class A notes: `V0-HARDWARE-A.md`
- Class B notes: `V0-HARDWARE-B.md`
- Market landscape (reuse, not redone): `MARKET-2026.md`

Prices and stock are perishable. Re-check the cart before ordering. Unknowns are marked. Specs are from fetched listing/official pages, not invented.

T-Mobile LTE that matters in LA: **B2, B4, B12, B66, B71**. No Class A SKU lists B71. Class B: only Mudita lists B71.

---

## Least-bad picks (this scan)

| Class | SKU | Price | Why this one | Why it is still bad |
|---|---|---|---|---|
| **A — watch-phone** | **LOKMAT APPLLP 2 MAX** (Amazon B0FDB1J4FJ) | **$199.99** Prime | Cheapest Android 11 with Type-C, a T-Mobile “works” review, WhatsApp preinstalled, detachable head as a pocket brick if the wrist is wrong. | GMS uncertified; no B71; 1200 mAh is half-day; numeric bands are on a Rainbuvvy twin listing, not this ASIN; “only 17 left.” Fallback: Rainbuvvy B0F6MS5333 ($229.99, printed B2/B4/B12/B66, Play reviews, 4 left). |
| **B — small / e-ink Android** | **Unihertz Jelly Star** | **$219.99** unihertz.com (Amazon OOS) | Only SKU that is add-to-cart under $300, 3" so it cannot become a slab, full GMS, manufacturer lists T-Mobile, stock OS, buds I/O, prepaid nano-SIM. | Missing B71; Unihertz MVNO (Mint/Tello) on Star untested; color Play phone can still become a phone if the launcher is not fenced. Buy from **unihertz.com US**, not Amazon. Mudita is the better attention object and loses on GMS / on-device sideload / price. |

If V0 is “order one brick and try the loop,” **Class B Jelly Star is the cleaner dogfood**. Class A is a uniformly sketchy import lot: it exists, it is buyable today, and it is the only way to test wrist I/O without Wear OS.

---

## Class A — full-Android LTE watch-phones (not Wear OS)

KOSPET TANK M4/T3 and Blackview W50/W90 are Bluetooth, not LTE. LEMFO LEM16 sold out. TicWatch is Wear OS.

| # | Model | Screen | OS | Cellular | USD | GMS | T-Mobile bands | Buy | One-line risk |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **LOKMAT APPLLP 2 MAX** | 2.64" | Android 11, MTK6761, 4+64, Type-C, detachable | nano-SIM, no eSIM | **$199.99** Prime, 17 left | Unknown / likely partial (WhatsApp+YouTube preinstalled) | Partial, weakly evidenced (one “T-Mobile works” review). Twin listing: B2/B4/B12/B66. **No B71.** | https://www.amazon.com/LOKMAT-Android-MTK6761-Smartwatch-Bluetooth/dp/B0FDB1J4FJ | 1200 mAh; uncertified GMS; bands not printed on this ASIN. |
| 2 | **Rainbuvvy 2.64" Android 11** | 2.64" | Android 11, 4+64, Type-C. Chip listed as both MTK6761 and MTK6739 (**conflict**) | nano-SIM | **$229.99** Prime, 4 left | Uncertified Play (reviewers installed from Play; Venmo/Twitter/TextNow failed) | Partial: B2/B4/B12/B66. Tello SIM worked. **No B71.** VoLTE unknown. | https://www.amazon.com/Android-Smartwatch-1200mAh-Bluetooth-Activity/dp/B0F6MS5333 | CPU contradiction; 5–7 h battery reports; 4 left. |
| 3 | **LOKMAT APPLLP MAX** | 2.88" (AMOLED vs LCD **conflict**) | Android 11, MTK6765, 6+128, magnetic charge | nano-SIM | **$299.99** Amazon / **$259.99** Newegg. Official cart sold out. | Likely uncertified Play | Official: B2+B12, no B4/B66/B71. Newegg also lists B4/B66 — **conflict**. Reviewer used hotspot, not SIM. | Amazon B0GHRTGYXH · Newegg 2T2-0772-00030 | At the $300 cap; 3-month deaths in reviews; magnetic charge. |
| 4 | **Rainbuvvy 2.4" Android 10.7** | 2.4" | Android 10.7 fork, MTK6762, 4+64 | nano-SIM. Lists B2/B4/B12. No B66/B71. | **$223.99** Prime, 6 left | Claimed Play Store in menu; not reviewer-confirmed | Partial B2/B4/B12 | https://www.amazon.com/Rainbuvvy-Display-Bluetooth-Waterproof-Smartwatch/dp/B0FR4GSDNZ | Thin reviews; “all functions don’t work” in 1 of 7. |
| 5 | **LOKMAT 2.4" Android 10.7** (Amazon; may be APPLLP 5 MAX) | 2.4" dual-system | Android 10.7, 4+64, 1500 mAh | nano-SIM. Amazon: “full-band” **without numbers**. Official 5 MAX: B2+B12, no B4/B66/B71. | **$239.99** Prime, **in stock** | Unknown | Partial / unknown (do not assume Amazon unit = official SKU) | https://www.amazon.com/LOKMAT-4GB-64GB-Smartwatch-Bluetooth/dp/B0FS1JC7DK | 3.3★ / 3 ratings; dual-system fights a kiosk launcher. |

No Class A eSIM. Battery under LTE + buds: independent reports **5–10 hours** on 1200–1500 mAh, not all-day. Four of five Amazon SKUs were “only N left.”

---

## Class B — small-screen cheap Android or e-ink slab

| # | Model | Screen | OS | Cellular | USD | GMS | T-Mobile bands | Buy | One-line risk |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Unihertz Jelly Star** | 3.0" 480×854 | Android 13, near-stock | LTE, dual nano-SIM, **no eSIM** | **$219.99** official. Amazon **OOS**. | **Yes** (Unihertz Google-cert copy) | FDD includes 2/4/12/66. **No B71.** Maker lists T-Mobile. | https://www.unihertz.com/products/jelly-star | Can still become a phone if unfenced; no eSIM; Unihertz will not take returns for carrier mismatch. |
| 2 | **Unihertz Jelly 2** | 3.0" | Android 11 | LTE, dual nano-SIM, no eSIM | **$189.99** official. Amazon 3P **$525** — do not buy there. | **Yes** | 2/4/12/66, no B71. Maker lists T-Mobile **and AT&T**. | https://www.unihertz.com/products/jelly-2 | Oldest OS; 2000 mAh; AT&T may need a Unihertz firmware path (stock, extra step). |
| 3 | **Mudita Kompakt NA** | 4.3" e-ink (800×480 official vs 864×648 Amazon — **conflict**) | MuditaOS K on AOSP, de-Googled. Sideload via **Mudita Center on a computer** only. | LTE + **eSIM** + nano-SIM. VoLTE + Wi-Fi calling claimed. FCC + PTCRB. | **$339** official/Amazon (over ~$300) | **No GMS** | Best set here: includes **B71** plus 2/4/12/66 | https://store.mudita.com/mudita-kompakt-north-america | Computer-only sideload fights “APK as the only front door”; WhatsApp without GMS unknown. |
| 4 | **Bigme Hibreak S** | 5.84" e-ink | Android 14 “open.” Play Store **unpublished** on the S page. | 4G LTE voice. eSIM unknown. | **$279** official | **Unknown** | Official page: **no band list**. Secondary sheet missing B4/B12/B66/B71. Treat T-Mobile as **unverified**. | https://store.bigme.vip/products/bigme-hibreak-s-4g-color-epaper-smartphone-with-android-14-os | Almost a phone even in e-ink; US bands unpublished. |
| 5 | **Unihertz Jelly Max** | **5.05"** | Android 15 (new orders) | 5G + LTE, dual nano-SIM, no eSIM | **$339.99** official (over ~$300) | **Yes** | LTE 2/4/12/66, 5G n41. **No n71/B71.** | https://www.unihertz.com/products/jelly-max | **Becomes a phone.** Included only as Jelly-class, currently add-to-cart. Amazon buy-box unverified this session. |

### Rejected this pass (checked)

Light Phone III (LightOS, not normal APKs, $899). Punkt MP02 (no sideload, OOS). Boox Palma 2 (no LTE). Palma 2 Pro (data-only SIM). Hisense Touch (no cellular). Hisense A9 (T-Mobile reportedly dead after LTE→5G refarm). Qin F21 Pro (Amazon/specialist OOS). Mode1 Retro II (JP bands). SOYES (unverifiable). KOSPET/Blackview watches (Bluetooth, Class A miss).

---

## Cross-cutting unknowns (do not invent)

- **VoLTE on T-Mobile prepaid / MVNO.** Band overlap ≠ a working voice bearer. LA T-Mobile is VoLTE-only. Confirm SMS + call on day one before writing app code against a unit.
- **Certified Play / 2FA.** Class A Play-like stores fail bank/Venmo/Twitter. Class B Jelly line is the only GMS-claimed path under $300.
- **B71 indoor LA.** Missing on every SKU except Mudita.
- **WhatsApp as primary device** on a 2.4–3" screen, and on Mudita without GMS.
- **Launcher / device-admin kiosk** on watch dual-system UIs — assumed possible on full Android, not verified in hand.
- **Mint/Tello on Jelly Star** — Unihertz widget stars some MVNOs as “may not work.” Tello has owner reports on Jelly 2, not Star.
- **Stock duration** on Amazon Class A lots.

---

## So-what for V0

1. A currently buyable **wrist** path exists, and it is a Chinese 4G Android watch-phone, not Wear OS. Least-bad: LOKMAT APPLLP 2 MAX at $200. Treat it as a disposable lot.
2. A currently buyable **pocket brick** path exists that actually matches the V0 software constraint (sideload APK + WhatsApp + prepaid SIM): **Jelly Star at $220 from unihertz.com**.
3. The better *attention* objects (Mudita, Light III, Palma) fail V0’s “full Android, one sideloaded front door, voice/SMS LTE” test. That is a product finding, not a shopping miss.
4. Order Star first if the goal is the pool loop (text, call, cloud question, audio) this month. Add the LOKMAT only if the question is “does wrist I/O change the finding.”

*Not a purchase. Re-check carts. Detail and sources in V0-HARDWARE-A.md and V0-HARDWARE-B.md.*
