## 2026-03-11 11:59 UTC — Pass #Night
- Focus: **CTA click hesitation on plan cards** ("unverbindlich prüfen" still implied a commitment step for some users at the key conversion moment).
- Change: Updated the two primary plan CTAs in the offer cards to explicit zero-commitment language: `Starter ohne Kauf öffnen` and `Plus ohne Kauf öffnen`.
- Why: Reduces perceived click risk exactly where buying intent is highest, while keeping both plan paths and layout unchanged.
- Compliance: Supplement-safe wording preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, mirrored to `/home/marco/.openclaw/workspace/auranem/`, and synced to `/tmp/mission-control-web-pub/auranem/` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-11 09:59 UTC — Pass #Night
- Focus: **Decision paralysis right before plan cards** (undecided visitors had many trust/compare elements but no single default action exactly at the offer-entry moment).
- Change: Added one compact `offer-decision-shortcut` bar directly above the Starter/Plus cards with a clear default recommendation for undecided users (`Empfohlenen Starter jetzt öffnen →`).
- Why: Creates a single low-friction next step at the highest-intent scroll depth, reducing cognitive load without removing the Plus path.
- Compliance: Supplement-safe wording preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`, and synced to `/tmp/mission-control-web-pub/auranem/` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-11 05:59 UTC — Pass #Night
- Focus: **Mobile decision friction from dual primary sticky CTAs** (undecided visitors had to choose immediately between Starter/Plus before seeing a clear default path).
- Change: Simplified the mobile sticky chooser to one clear default CTA (`Mit Starter starten`) and moved Plus into a lighter alternative text-link path (`Dann Plus öffnen`).
- Why: Reduces choice overload at the bottom-of-screen conversion moment while preserving a fast route for high-intent 60-day buyers.
- Compliance: Supplement-safe wording preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`, and synced to `/tmp/mission-control-web-pub/auranem/` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-11 02:00 UTC — Pass #Night
- Focus: **Hero secondary path friction (the fallback hero link sent undecided visitors to the 30-day timeline instead of the core Starter-vs-Plus decision block).**
- Change: Repositioned the hero secondary CTA to jump directly to the decision matrix (`#offer-decision-matrix`) and updated copy to `Starter vs. Plus in 15 Sek vergleichen`.
- Why: Keeps early undecided traffic inside the highest-conversion decision zone (plan comparison) instead of diverting to lower-intent informational content.
- Compliance: Supplement-safe wording preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, mirrored to `/home/marco/.openclaw/workspace/auranem/`, and synced to `/tmp/mission-control-web-pub/auranem/`.
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-10 12:01 UTC — Pass #Night
- Focus: **Hero click hesitation from missing transactional clarity above the fold** (shipping/return/support terms were visible only deeper in the offer area).
- Change: Added one compact `hero-transaction-rails` block directly under the hero reassurance chips with 3 purchase-near facts: AT/DE shipping window (2–4 business days), 14-day withdrawal for unopened goods, and weekday support response target (~24h).
- Why: Reduces first-click uncertainty by surfacing practical buying-risk info at the earliest decision moment, without changing layout or core messaging.
- Compliance: Supplement-safe language preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, mirrored to `/home/marco/.openclaw/workspace/auranem/`, and synced to `/tmp/mission-control-web-pub/auranem/` (public path `/auranem/`).
- Verify: `python3 -m http.server 4173 --directory /home/marco/.openclaw/workspace` + `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-10 09:59 UTC — Pass #Night
- Focus: **Checkout-trust friction at the offer decision point (users saw plan price, but shipping/return/support terms were not explicit before checkout).**
- Change: Added one concise `Kaufinfos in Klartext` strip directly in the offer section with 3 pre-checkout assurances: AT/DE shipping window (2–4 business days), 14-day withdrawal right for unopened goods, and weekday support response target (within 24h).
- Why: Reduces last-mile hesitation by surfacing practical purchase-risk information exactly where users decide between Starter and Plus.
- Compliance: Supplement-safe language preserved (no medical, disease, healing, or guaranteed outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` and mirrored to `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-10 07:59 UTC — Pass #Night
- Focus: **Page-speed friction in the decision-critical hero (two high-priority hero image fetches competed for early render bandwidth).**
- Change: Kept only the core hero visual preload and downgraded the secondary hero proof-card image from `loading="eager" fetchpriority="high"` to `loading="lazy" fetchpriority="low"`.
- Why: Reduces above-the-fold asset contention so core headline/CTA context can render faster, improving first-click conversion momentum.
- Compliance: No claim changes; supplement-safe language and existing trust/compliance framing remain unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-04 05:56 UTC — Pass #15
- Focus: **Offer-decision friction (users compare plans mentally, not visually)**.
- Change: Added one compact `Direktvergleich in 1 Blick` block above the Starter/Plus cards with side-by-side decision data: Laufzeit, Gesamtpreis, ca. Preis/Tag, and "ideal für" context.
- Why: Reduces cognitive load at the core conversion moment and makes plan differences scannable before CTA clicks.
- Compliance: Supplement-safe wording retained (no medical/disease/healing/guarantee claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` (public path `/auranem/`), and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-04 07:56 UTC — Pass #16
- Focus: **Plus-card conversion friction (high-intent users had no direct primary CTA)**.
- Change: Upgraded Plus offer CTA from secondary ghost link (`Plus im Vergleich prüfen`) to a clear primary action (`Plus ab €149 ansehen`) and aligned tracking to primary click intent.
- Why: Removes unnecessary hesitation for users already choosing the 60-day option, improving decision momentum at the key conversion block.
- Compliance: Language remains supplement-safe (no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-04 09:59 UTC — Pass #17
- Focus: **Above-the-fold decision friction (users saw price snapshot but no direct path to chosen plan)**.
- Change: Added plan-specific hero snapshot jump links (`Starter direkt öffnen`, `Plus direkt öffnen`) and mapped them to anchored offer cards (`#offer-starter`, `#offer-plus`).
- Why: Converts early intent into a faster, lower-friction path to the exact plan card instead of generic scrolling/comparison.
- Compliance: Kept supplement-safe language; no medical/disease/healing claims added.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css` and synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-04 11:58 UTC — Pass #18
- Focus: **Offer-section choice friction (users still had to self-map intent to the right plan card)**.
- Change: Added one compact `Schnellwahl nach Ziel` intent block above offer cards with two direct paths: `→ Starter öffnen` (30-Tage-Test) and `→ Plus öffnen` (8-Wochen-Kontinuität), each tracked as primary CTA intent.
- Why: Reduces decision latency at the highest-intent section by turning abstract comparison into immediate self-selection.
- Compliance: Kept supplement-safe wording (routine/structure language only; no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then mirrored to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`) via `cp -a`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-04 13:58 UTC — Pass #19
- Focus: **Plan-value clarity friction inside the core offer cards (Plus looked larger, but savings were not explicit at decision moment).**
- Change: Added one high-contrast `offer-value-pill` directly under the Plus price: `Plus Vorteil: ca. €0,49 weniger pro Tag vs. Starter (bei 60 Tagen)`.
- Why: Makes economic upside instantly scannable at the exact conversion point, reducing comparison effort and increasing confidence for high-intent buyers.
- Compliance: Kept supplement-safe scope (price/plan framing only; no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -s -o /tmp/auranem_page.html -w "%{http_code}" http://127.0.0.1:8010/auranem/` (temporary local static server) => **200**; `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-04 15:58 UTC — Pass #20
- Focus: **Mobile conversion friction at the final decision moment (single sticky CTA forced an extra comparison step).**
- Change: Replaced the one-button mobile sticky CTA with a compact two-path chooser (`Starter €89` / `Plus €149`) linking directly to `#offer-starter` and `#offer-plus`.
- Why: Reduces taps and cognitive load on mobile by letting high-intent users jump straight to their preferred plan instead of re-reading the full offer section.
- Compliance: Wording remains supplement-safe and price/plan-focused only (no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-04 21:58 UTC — Pass #21
- Focus: **Final CTA friction (single generic button forced one extra decision step at the last conversion moment).**
- Change: Replaced the single final CTA with a compact two-option final chooser (`Starter ab €89 ansehen` / `Plus ab €149 ansehen`) linking directly to `#offer-starter` and `#offer-plus`, plus one short clarity microcopy.
- Why: Reduces end-of-page decision latency by converting intent into direct plan-specific action instead of sending users back to a generic offer block.
- Compliance: Kept supplement-safe language (price/plan navigation only; no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` (public path `/auranem/`) and mirrored both files to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP 200**.

## 2026-03-04 23:57 UTC — Pass #22
- Focus: **Above-the-fold risk friction (users saw price/options, but key decision-safety guardrails were still mostly text-dense).**
- Change: Added one compact `hero-assurance` chip row directly under the hero CTA microcopy with 3 fast-scannable safety points: no auto-renewal, transparent price/content before final step, and claim-safe communication.
- Why: Increases early trust clarity at the highest-attention zone and reduces hesitation before first offer click.
- Compliance: Supplement-safe wording retained; no medical, disease, or healing claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 01:58 UTC — Pass #23
- Focus: **Commitment anxiety before plan selection (users hesitate if they feel forced into a long-term choice).**
- Change: Added one compact reassurance line directly below the offer intent chooser: users can start with the 30-day Starter and decide again later without subscription binding, plus a deep-link to the matching FAQ (`#faq-switch`).
- Why: Reduces decision pressure at the highest-intent moment and helps uncertain users move forward instead of postponing.
- Compliance: Supplement-safe wording maintained (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then synced to public path `/home/marco/.openclaw/workspace/auranem/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 03:57 UTC — Pass #24
- Focus: **Mobile last-click trust friction (sticky chooser had fast plan buttons but no immediate safety reassurance).**
- Change: Added one compact trust microline directly inside the mobile sticky chooser: `Kein Abo · Preis vor finalem Checkout klar sichtbar`.
- Why: Reinforces decision safety at the exact tap moment on mobile, reducing hesitation before users open Starter/Plus.
- Compliance: Supplement-safe, non-medical wording retained (no healing/disease/guarantee claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 05:56 UTC — Pass #23
- Focus: **Offer-stage objection friction (key trust questions were answered too late in the page flow).**
- Change: Added one compact `offer-objection-faq` block directly below Starter/Plus cards with 3 high-intent pre-click answers: no subscription lock-in, transparent final confirmation step, and realistic expectation framing.
- Why: Reduces last-mile hesitation at the exact conversion zone by resolving the most common purchase objections before users drop.
- Compliance: Claim-safe supplement wording retained (no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 07:56 UTC — Pass #25
- Focus: **Above-the-fold plan-value friction (Plus value was visible only deeper in the offer section).**
- Change: Added one concise `snapshot-savings` line directly under the hero Starter/Plus snapshot: `Plus spart ca. €0,49 pro Tag vs. Starter (bei 60 Tagen)`.
- Why: Surfaces economic differentiation in the first decision zone, reducing comparison effort before the first plan click.
- Compliance: Purely price/plan framing; no medical, disease, or healing claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 11:57 UTC — Pass #26
- Focus: **Hero indecision friction (new visitors with low confidence had no explicit default path in the first 10-second decision block).**
- Change: Added one concise fallback path directly in the hero snapshot: `Unsicher beim Einstieg? Dann starte mit dem 30-Tage-Starter →` linking to `#offer-starter`.
- Why: Gives undecided users an immediate low-risk next step above the fold, reducing hesitation before first meaningful CTA interaction.
- Compliance: Supplement-safe, routine/plan language only; no medical, disease, or healing claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 09:57 UTC — Pass #26
- Focus: **Hero CTA routing friction (primary above-the-fold click still sent users to a generic offer block).**
- Change: Updated the hero primary CTA to deep-link directly to `#offer-starter` and tightened label to `Starter direkt öffnen (ab €89)`.
- Why: Converts first-click intent into immediate plan-specific context, reducing one navigation step before offer evaluation.
- Compliance: Claim-safe supplement language preserved; no medical, disease, or healing claims introduced.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`) and mirrored the same change to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 13:57 UTC — Pass #27
- Focus: **Mobile plan-choice friction (sticky chooser showed total prices but forced mental value calculation).**
- Change: Added compact per-day price microcopy directly inside both sticky mobile CTA buttons: `Starter €89 · ca. €2,97/Tag` and `Plus €149 · ca. €2,48/Tag`.
- Why: Makes value comparison instantly scannable at the tap moment, reducing mobile hesitation between Starter vs. Plus.
- Compliance: Price/plan framing only; supplement-safe language preserved (no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 20:00 UTC — Pass #28
- Focus: **Mobile handoff friction (sticky Starter/Plus taps did not persist plan intent into the guided final decision state).**
- Change: Added `data-plan-intent` to both mobile sticky CTA buttons (`starter` / `plus`) so existing handoff logic now updates recommendation highlighting and final-plan context after mobile plan selection.
- Why: Keeps decision context consistent for mobile users, reducing confusion when choosing Plus from sticky navigation and improving continuity to final CTA.
- Compliance: No claim changes; supplement-safe language retained (no medical/disease/healing promises).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` and synced to `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP 200**.

## 2026-03-05 15:56 UTC — Pass #28
- Focus: **Offer-card last-click trust friction (users still face commitment anxiety exactly at the CTA tap point).**
- Change: Added one concise reassurance microcopy directly under both offer CTAs: `Kein Abo · finale Bestätigung erst im nächsten Schritt.`
- Why: Removes uncertainty at the conversion moment by clarifying users are not auto-committed when opening the next step.
- Compliance: Supplement-safe and process-only wording retained (no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 17:56 UTC — Pass #29
- Focus: **Mobile last-step friction (sticky chooser could overlap/compete with final CTA area near conversion decision).**
- Change: Updated sticky behavior to hide the **entire** mobile chooser when the final section enters view (instead of hiding only one button), including smooth fade/slide transition.
- Why: Removes visual competition at the final conversion moment, making the end-of-page CTA choice cleaner and easier on mobile.
- Compliance: No claim changes; supplement-safe language remains unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/script.js` + `styles.css`, then synced both to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 19:57 UTC — Pass #30
- Focus: **Choice paralysis in the offer section for undecided first-time visitors.**
- Change: Added one new `offer-default-choice` recommendation box above the offer cards with a clear default path (“Starter bei Unsicherheit”) and a direct CTA to `#offer-starter`.
- Why: Gives uncertain users a fast, low-risk decision route, reducing cognitive load before the final offer-card click.
- Compliance: Kept claim-safe, process-only wording (routine, no medical or healing promises).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 21:58 UTC — Pass #31
- Focus: **Primary CTA commitment friction ("ansehen" implied a softer, less explicit next step than a no-risk evaluation action).**
- Change: Updated AB-tested primary CTA copy in `script.js` from `... ansehen` / `... transparent vergleichen` to the clearer no-risk verb `... unverbindlich prüfen` for both hero and final primary CTAs.
- Why: Improves click confidence by clarifying users are entering an evaluation step (not committing), reducing hesitation at first and last major conversion points.
- Compliance: Claim-safe supplement language preserved; no medical, disease, or healing claims introduced.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/script.js` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/script.js` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-05 23:57 UTC — Pass #32
- Focus: **Mid/late-funnel commitment friction (several high-intent CTAs still used softer "ansehen" wording and implied a less explicit next step).**
- Change: Unified conversion-critical CTA language in the offer and final sections from `... ansehen` to `... unverbindlich prüfen` (Starter + Plus) and aligned the nearby checkout explainer title to the same no-risk verb.
- Why: Improves intent clarity at the exact decision moment by explicitly signaling evaluation-before-commitment, reducing hesitation before click-through.
- Compliance: Supplement-safe language preserved; no medical, disease, or healing claims introduced.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, then synced to `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 01:56 UTC — Pass #33
- Focus: **Offer-card next-step ambiguity ("unverbindlich prüfen" was safe but did not clearly state the immediate action users are taking).**
- Change: Updated the two primary offer-card CTAs to explicit action clarity: `Starter auswählen & Preis prüfen (ab €89)` and `Plus auswählen & Preis prüfen (ab €149)`.
- Why: Reduces click hesitation at the highest-intent block by telling users exactly what happens next (choose plan + review price), not just that it is non-binding.
- Compliance: Kept supplement-safe scope (navigation/price clarity only; no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 03:56 UTC — Pass #34
- Focus: **Hero/final CTA ambiguity ("unverbindlich prüfen" was safe but still abstract on first/last decision clicks).**
- Change: Updated AB-configured hero + final CTA labels in `script.js` to explicit action clarity:
  - A: `Setup wählen & Preis transparent prüfen`
  - B: `Starter wählen & Preis prüfen (ab €89)`
- Why: Reduces click hesitation by stating the exact next step (plan selection + price check) at the two highest-leverage CTA positions.
- Compliance: Process-only wording retained; no medical, disease, or healing claims added.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/script.js` and synced to `/home/marco/.openclaw/workspace/auranem/script.js` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 05:58 UTC — Pass #47
- Focus: **Offer-stage completion friction (users see the process copy, but step progress is still text-heavy and easy to skip).**
- Change: Added one compact `decision-steps` block directly under the checkout-clarity explainer with a numbered 3-step flow (`Setup wählen` → `Preis & Inhalte prüfen` → `Aktiv final bestätigen`).
- Why: Makes the purchase path instantly scannable at the key decision zone and reduces perceived complexity before users pick Starter or Plus.
- Compliance: Supplement-safe wording retained (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, then mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 07:58 UTC — Pass #48
- Focus: **Hero/final message-match friction (live JS A-variant overrode strong on-page CTA/headline copy with more generic wording).**
- Change: Updated one conversion-critical block in `script.js` (A-variant text only) to match the current high-clarity page messaging:
  - Headline A → `Weniger Supplement-Chaos. Mehr tägliche Balance mit System.`
  - Hero CTA A → `Starter direkt öffnen (ab €89)`
  - Final CTA A → `Starter ab €89 unverbindlich prüfen`
- Why: Removes copy inconsistency between HTML and runtime JS, preserving clear intent framing at first and last major click moments.
- Compliance: Supplement-safe language retained (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/script.js` and synced to `/home/marco/.openclaw/workspace/auranem/script.js` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP 200**.

## 2026-03-06 09:56 UTC — Pass #49
- Focus: **Above-the-fold uncertainty friction (users had to scroll to the offer section to understand the exact post-click flow).**
- Change: Added one compact `hero-next-step` block directly under the primary hero CTA with 3 clear steps: `Setup wählen` → `Preis & Inhalte prüfen` → `Dann entscheiden (kein Abo)`.
- Why: Reduces first-click hesitation by surfacing process clarity at the earliest decision moment, before users commit to Starter/Plus.
- Compliance: Supplement-safe language preserved; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 11:59 UTC — Pass #40
- Focus: **CTA-loop friction in the highest-intent offer step** (after choosing Starter/Plus, users were sent to a generic final block and had to re-orient).
- Change: Updated one conversion-critical CTA flow so each offer card now deep-links to its matching final-plan button (`Starter → #ab-final-cta`, `Plus → #final-plus-choice`) and added a subtle `:target` highlight on the selected final button.
- Why: Preserves user intent from the offer decision into the final action, reducing re-decision friction and click hesitation.
- Compliance: Kept supplement-safe language and claims scope unchanged (no medical/disease/healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 13:59 UTC — Pass #48
- Focus: **Offer-card price clarity (users still had to mentally compute per‑day value inside the primary decision cards).**
- Change: Added compact per‑day price pills directly under both offer-card prices: `ca. €2,97 pro Tag bei 30 Tagen` (Starter) and `ca. €2,48 pro Tag bei 60 Tagen` (Plus).
- Why: Makes unit economics visible at the exact conversion moment, reducing comparison friction without adding new claims.
- Compliance: Price/plan-only wording; no medical, disease, or healing claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 16:01 UTC — Pass #50
- Focus: **Above-the-fold CTA access friction on desktop** (top navigation offered only FAQ, so high-intent users had no immediate primary jump to the offer decision block).
- Change: Added one compact primary nav CTA `Starter ab €89` next to `FAQ`, linking directly to `#offer-starter` with primary click tracking (`nav_primary_starter`).
- Why: Captures early purchase intent in the first visible navigation row and reduces scroll-to-action delay without changing page structure.
- Compliance: Supplement-safe, price/plan-only wording retained (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 17:59 UTC — Pass #51
- Focus: **Last-click commitment friction in offer cards** (users still had a small uncertainty about how long the next step takes).
- Change: Added one concise time-to-complete reassurance to both offer-card trust lines: `Kein Abo · finale Bestätigung erst im nächsten Schritt · dauert ca. 30 Sek.`
- Why: Lowers perceived effort at the exact CTA moment and helps hesitant users move forward with clearer expectation.
- Compliance: Supplement-safe process language only; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 19:59 UTC — Pass #52
- Focus: **Mobile plan-choice friction at the sticky CTA** (users saw price/day, but not which option best fits their intent in one glance).
- Change: Added one concise fit-label line inside each mobile sticky CTA: `Empfohlen für den Start` (Starter) and `Für 8 Wochen Fokus` (Plus).
- Why: Reduces last-mile decision latency on small screens by pairing price with immediate use-case guidance at tap moment.
- Compliance: Supplement-safe, plan-selection language only (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then mirrored both to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 21:59 UTC — Pass #53
- Focus: **Final-step plan-selection friction** (users reached the last CTA area without a compact side-by-side reminder of Starter vs. Plus).
- Change: Added one compact `final-quick-compare` block above the final CTA buttons with concise plan facts: Starter (30 Tage, ab €89, Einstieg) vs. Plus (60 Tage, ab €149, ca. €0,49/Tag günstiger).
- Why: Reduces end-of-page decision latency by surfacing a last-moment comparison exactly where users choose the final path.
- Compliance: Supplement-safe, price/plan framing only (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css` and mirrored both to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-06 23:59 UTC — Pass #54
- Focus: **Choice friction at the top of the offer section** (users had to scan multiple explanation blocks before finding a direct Starter/Plus action).
- Change: Added one compact `offer-fast-lane` block directly after the decision rails with two immediate plan CTAs: `Starter wählen · €89` and `Plus wählen · €149`, plus one clarifying line that details are reviewed before final confirmation.
- Why: Improves conversion clarity for high-intent visitors by reducing scroll and cognitive delay between “I’m ready” and the relevant plan card.
- Compliance: Supplement-safe process/price language only (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css` and mirrored both to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 01:59 UTC — Pass #55
- Focus: **Top-nav path friction for Plus-intent visitors** (header offered a direct Starter jump, but no equally fast Plus entry point).
- Change: Added one compact top-navigation CTA `Plus ab €149` linking directly to `#offer-plus` with primary click tracking (`nav_primary_plus`) while keeping existing Starter + FAQ paths.
- Why: Captures high-intent 60-day buyers earlier and removes one scroll/search step before they reach the relevant plan card.
- Compliance: Kept supplement-safe, price/plan-only wording (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` and mirrored to `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 03:59 UTC — Pass #56
- Focus: **Offer-card action ambiguity at the highest-intent click moment** ("im finalen Schritt prüfen" was safe, but less explicit about what users do right now).
- Change: Updated one conversion-critical copy block (both offer-card primary CTAs) to explicit immediate action wording:
  - `Starter auswählen & Preis sofort prüfen (ab €89)`
  - `Plus auswählen & Preis sofort prüfen (ab €149)`
- Why: Reduces hesitation by clarifying the exact next action (plan selection + transparent price check) at the core decision point.
- Compliance: Supplement-safe, process/price-only wording; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` and mirrored to `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 06:00 UTC — Pass #44
- Focus: **Last-mile trust friction on offer-card CTAs (users saw price + no-abo, but product transparency signal was not explicit at click moment).**
- Change: Replaced the offer-card assurance line (Starter + Plus) with: `Kein Abo · finale Bestätigung erst im nächsten Schritt · Chargen- und Anwendungshinweise vor Abschluss klar einsehbar`.
- Why: Improves conversion confidence at the highest-intent point by clarifying that essential product information is visible before final confirmation.
- Compliance: Supplement-safe wording retained; no medical, disease, or healing claims added.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` and mirrored to `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 08:00 UTC — Pass #57
- Focus: **Final-section indecision friction** (users reached the last CTA zone with plan facts, but uncertain visitors had no explicit default path at the exact decision moment).
- Change: Added one concise fallback line directly in the final CTA block: `Noch unsicher? Starte mit dem 30-Tage-Starter als klaren Erstschritt →` linking to `#offer-starter` with primary CTA tracking (`final_default_starter`).
- Why: Reduces last-mile choice paralysis by giving hesitant visitors a clear, low-risk next action where conversion intent is highest.
- Compliance: Supplement-safe routine/plan language only; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css` and mirrored both to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 10:00 UTC — Pass #58
- Focus: **Above-the-fold choice overload** (new visitors saw Starter/Plus data, but hesitant buyers still lacked one explicit default action directly in hero).
- Change: Added one new hero recommendation block (`.hero-recommendation`) right below the snapshot with a clear default path CTA: `Mit Starter unverbindlich beginnen (ab €89)` (`hero_reco_starter`).
- Why: Reduces decision paralysis in the first screen by turning “unsure” traffic into one concrete next step without removing Plus visibility.
- Compliance: Kept claim-safe supplement language (routine/process framing only; no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css` and mirrored both to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8787/auranem/` => **200**.

## 2026-03-07 12:00 UTC — Pass #59
- Focus: **Offer-section trust hesitation right before plan-card clicks** (users saw many decision aids, but no single compact safety summary immediately above the conversion cards).
- Change: Added one new `checkout-confidence-bar` block directly above `.offer-split` with 3 fast-scannable guardrails: no auto-renewal, transparent price/content before final confirmation, and claim-safe communication.
- Why: Reduces last-mile friction at the highest-intent area by consolidating reassurance exactly where users choose Starter vs. Plus.
- Compliance: Kept supplement-safe wording (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 14:00 UTC — Pass #41
- Focus: **Offer indecision friction (users still had to self-map intent before opening a plan card).**
- Change: Added one compact interactive `1 Klick zur Empfehlung` selector in the offer section with two intent buttons (`erst testen` vs `8 Wochen planen`) that updates a clear recommendation + direct deep-link CTA to Starter or Plus.
- Why: Reduces decision latency at the highest-intent moment by turning abstract comparison into guided self-selection before card-level evaluation.
- Compliance: Kept supplement-safe routine/plan language only; no medical, disease, or healing claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html`, `styles.css`, `script.js` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 15:59 UTC — Pass #51
- Focus: **Mobile tap-moment value friction (sticky chooser showed plan prices, but the economic upside of Plus was not explicit in the same line).**
- Change: Expanded the mobile sticky trust line to include clear savings context: `Kein Abo · Preis vor finalem Checkout klar sichtbar · Plus spart ca. €0,49/Tag vs. Starter`.
- Why: Makes the Starter-vs-Plus decision easier at the exact tap point on mobile, reducing mental calculation before users open a plan.
- Compliance: Price/plan framing only; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 18:00 UTC — Pass #60
- Focus: **Above-the-fold effort friction** (users still had to estimate how long the first decision flow takes).
- Change: Added one compact hero process-time line inside `hero-next-step`: `Orientierung dauert meist nur ca. 30 Sekunden.`
- Why: Reduces perceived effort at first click and helps undecided visitors commit faster to Starter/Plus evaluation.
- Compliance: Kept supplement-safe process language only; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css` and mirrored both to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 19:59 UTC — Pass #61
- Focus: **Above-the-fold speed friction** (the primary hero visual was critical for first impression but not explicitly preloaded, risking slower LCP on colder/mobile visits).
- Change: Added one targeted performance upgrade in `index.html`: preload for `hero-key-visual-v4-20260303.svg` in `<head>` + explicit `fetchpriority="high"` on the hero image.
- Why: Improves first-render clarity for the key conversion visual in the hero and reduces early perceived load delay before first CTA interaction.
- Compliance: No claim/copy changes; supplement-safe language and brand identity unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 22:00 UTC — Pass #62
- Focus: **Offer-card CTA path friction** (plan CTAs promised a "price check" but routed users into a circular anchor path via final buttons, adding an unnecessary navigation loop).
- Change: Updated both primary offer-card CTAs to one clear next-step destination `#start` and aligned labels to action clarity:
  - `Weiter zum finalen Schritt für Starter (ab €89)`
  - `Weiter zum finalen Schritt für Plus (ab €149)`
- Why: Removes misleading intra-page detours at the highest-intent moment and makes the next conversion step explicit after plan evaluation.
- Compliance: Kept supplement-safe process language; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-07 23:59 UTC — Pass #63
- Focus: **Final-step hesitation** (users reached the last CTA area but still lacked a crystal-clear, low-risk sequence of what happens after clicking).
- Change: Added one compact `final-next-steps` block in the final CTA section with a transparent 3-step flow: open plan, review price/content details, then decide.
- Why: Reduces last-mile anxiety by making the post-click process explicit right before plan selection, improving conversion clarity without redesigning the funnel.
- Compliance: Kept supplement-safe language and process framing only; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` (public path `/auranem/`) and mirrored both files to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 01:59 UTC — Pass #64
- Focus: **Mobile choice-overload friction at sticky CTA** (two equal-weight buttons at tap moment increased decision paralysis for unsure first-time visitors).
- Change: Simplified the mobile sticky chooser to one default primary path (`Starter €89`) and moved Plus to a lighter secondary text link (`Plus €149 öffnen →`) while keeping both options accessible.
- Why: Creates a clearer default action on small screens, reducing tap hesitation without removing Plus for high-intent users.
- Compliance: Kept supplement-safe, plan/price-only wording (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, then synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 04:01 UTC — Pass #65
- Focus: **Final-step re-orientation friction** (after selecting Starter/Plus in offer cards, users landed in the final section without a clear confirmation of their prior plan intent).
- Change: Added one continuity layer from offer → final CTA: plan-intent handoff on offer-card CTAs (`data-plan-intent`), a live `final-plan-context` line, and auto-highlight of the matching final button (`is-plan-selected`) when users click Starter or Plus.
- Why: Preserves decision momentum at the last conversion stage by confirming “you chose this plan” before final action, reducing hesitation and re-comparison loops.
- Compliance: Process/choice clarity only; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` + `script.js` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 06:00 UTC — Pass #66
- Focus: **Plan-target orientation friction** (after clicking plan-specific anchors, users could land in the offer area without an immediately obvious visual “selected card” state).
- Change: Added one anchor-state highlight for `#offer-starter` and `#offer-plus` (`:target`) with a stronger border + focus ring, so the chosen plan card becomes instantly visible after CTA jumps.
- Why: Improves continuity from hero/final CTAs to the exact offer card, reducing re-scan time and hesitation at the decision point.
- Compliance: Purely navigational UX improvement; supplement-safe language unchanged (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/styles.css` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/styles.css`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 07:59 UTC — Pass #Night
- Focus: **Above-the-fold click friction (first primary CTA appeared after multiple hero info blocks, delaying action on mobile and low-attention visits).**
- Change: Moved the main hero CTA block (`Starter direkt öffnen` + secondary timeline link + microcopy) directly under subcopy, before snapshot/recommendation/visual modules.
- Why: Surfaces the conversion action earlier in the visual hierarchy so high-intent visitors can act immediately instead of scrolling through explanatory content first.
- Compliance: Kept supplement-safe language and existing no-healing/no-disease framing unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` and synced to `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 10:00 UTC — Pass #67
- Focus: **Final-step CTA ambiguity** (last conversion buttons still used softer “unverbindlich prüfen” wording, which obscured the exact next action).
- Change: Updated the final plan-choice CTA copy to explicit action clarity:
  - `Starter wählen & Preis prüfen (ab €89)`
  - `Plus wählen & Preis prüfen (ab €149)`
  and aligned `script.js` variant A final CTA text to the same wording so runtime behavior matches the page.
- Why: Reduces hesitation at the highest-intent moment by stating precisely what happens after click (plan choice + transparent price check).
- Compliance: Supplement-safe process language retained; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `script.js` (public path `/auranem/`) and mirrored both to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 11:59 UTC — Pass #68
- Focus: **Offer-card CTA wording friction** (users at the highest-intent plan cards still saw a “final step” label instead of explicit action language).
- Change: Updated one conversion-critical copy block in the Starter/Plus offer-card primary buttons to direct action clarity:
  - `Starter wählen & Preis prüfen (ab €89)`
  - `Plus wählen & Preis prüfen (ab €149)`
- Why: Reduces hesitation at the core decision moment by clearly stating what happens after click (plan choice + transparent price check), instead of abstract process wording.
- Compliance: Kept supplement-safe, process/price-only language (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 13:59 UTC — Pass #69
- Focus: **Mobile plan-selection friction** (sticky bar prioritized Starter while Plus remained a text link, adding extra decision friction for 8-week-ready buyers).
- Change: Reworked the mobile sticky chooser into a dual-CTA layout with equal-tap access to both plans:
  - Starter primary CTA kept
  - Added explicit Plus sticky CTA (`Plus €149`, per-day context, no-abo reassurance)
  - Updated sticky headline to “In 1 Tap zur passenden Auswahl” for faster intent matching
- Why: Reduces mobile drop-off by letting high-intent users jump to their preferred plan without parsing secondary text links.
- Compliance: Language remains supplement-safe and process/price-focused (no healing/disease claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` (public path `/auranem/`) and mirrored both files to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 16:01 UTC — Pass #70
- Focus: **First-click trust friction in the hero (users see CTA quickly, but reassurance signals were not directly attached to the first action).**
- Change: Added one compact `cta-reassurance` chip row directly under the hero CTA microcopy with 3 fast-scan points: `Kein Abo`, `Preis vor finalem Checkout sichtbar`, `Bestellung erst nach aktiver Bestätigung`.
- Why: Reduces hesitation at the highest-attention zone by pairing the first CTA with immediate decision-safety cues.
- Compliance: Kept supplement-safe language and avoided medical/healing/disease claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`, and copied to public serving path `/tmp/mission-control-web-pub/auranem/`.
- Verify: `curl -I http://127.0.0.1:8765/` => **HTTP/1.0 200 OK**.

## 2026-03-08 17:59 UTC — Offer-focus clarity pass (single improvement)
- Friction found: Choice paralysis in the offer area after using the fit selector; recommendation text changed, but both pricing cards still looked equally primary.
- Improvement shipped: Connected fit/recommendation state to visual hierarchy by auto-highlighting the recommended offer card (Starter default, Plus when selected) and softly dimming the alternative. Added a small “Aktuell empfohlen” badge on the active card.
- Compliance: No health/medical claims added; language remains routine/structure-oriented and claim-safe.
- Deploy: Synced updated `script.js` + `styles.css` from `brand/auranem/landing-page-v1/` to public path `/home/marco/.openclaw/workspace/auranem/` (`/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-10 04:00 UTC — Pass #Night
- Focus: **Above-the-fold render friction** (the hero-side starter product visual is conversion-relevant but was lazy-loaded, delaying trust/product confirmation on first paint).
- Change: Added one targeted performance update in `index.html`: preloaded `starter-product-visual-v4-20260303.svg` in `<head>` and switched the hero proof-card image from `loading="lazy"` to `loading="eager"` with `fetchpriority="high"`.
- Why: Speeds up visible product confirmation in the first screen and reduces early hesitation before first CTA interaction.
- Compliance: No claim/content changes; supplement-safe language and brand identity (incl. winner logo) unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, synced to `/home/marco/.openclaw/workspace/auranem/index.html`, and copied to public serving path `/tmp/mission-control-web-pub/auranem/index.html`.
- Verify: `curl -I -L http://127.0.0.1:8765/` => **HTTP/1.0 200 OK**; `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-08 21:59 UTC — Intent-prefill pass (single improvement)
- Friction found: High-intent visitors from angle-based traffic still landed in a generic default flow, then had to manually re-select Starter/Plus in the offer section.
- Improvement shipped: Added URL-aware plan prefill in `script.js` so the page auto-selects and highlights the best matching path on load:
  - `?plan=starter|plus` explicitly preselects plan
  - `?angle=premium_trust` preselects Plus
  - `?angle=routine_chaos` / `?angle=clarity_daily` preselect Starter
  - Fit selector, offer-card emphasis, and final CTA context now initialize in one consistent state.
- Compliance: No new health claims; purely navigational/decision UX logic with existing claim-safe copy unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/script.js` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/script.js` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/auranem/` (temporary local static check) => **200**.

## 2026-03-09 00:00 UTC — Pass #71
- Focus: **Initial-load speed friction** (the landing page contains many below-the-fold comparison/trust sections that can delay first meaningful paint on slower mobile devices).
- Change: Added one performance-focused rendering optimization in `styles.css`: enabled `content-visibility: auto` with `contain-intrinsic-size` on `.section` blocks so non-visible sections are deferred until needed.
- Why: Reduces above-the-fold rendering work and improves perceived responsiveness before the first CTA interaction.
- Compliance: No claims/copy changes; supplement-safe language and brand identity (including winner logo) unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/styles.css`, and synced to public serving path `/tmp/mission-control-web-pub/auranem/styles.css` (`/auranem/`).
- Verify: `curl -I http://127.0.0.1:8765/` => **HTTP/1.0 200 OK**; `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-09 01:59 UTC — Pass #72
- Focus: **Mobile uncertainty friction at the tap moment** (users who were not ready to choose Starter/Plus had no immediate low-commitment path in the sticky chooser).
- Change: Added one conversion-supporting secondary action inside the mobile sticky trust line: `Unsicher? 3 kurze Antworten →` linking directly to the purchase-near objection FAQ block (`#offer-objection-faq`), and added the anchor id for reliable jump behavior.
- Why: Keeps hesitant mobile users in-flow by offering immediate objection handling instead of forcing a hard plan choice or scroll abandonment.
- Compliance: Kept supplement-safe wording and process/price framing only; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, mirrored both files to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`, and synced public serving path `/tmp/mission-control-web-pub/auranem/` (`/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**; `curl -I http://127.0.0.1:8765/` => **HTTP/1.0 200 OK**.

## 2026-03-09 04:00 UTC — Pass #71
- Focus: **Last-click trust friction on offer cards** (the reassurance under plan CTAs was one dense line, harder to scan on mobile before tapping).
- Change: Replaced the single `offer-cta-assurance` sentence under both Starter/Plus primary buttons with a compact 3-point checklist (`Kein Abo`, `Finale Bestätigung erst im nächsten Schritt`, `Chargen- & Anwendungshinweise vor Abschluss sichtbar`).
- Why: Improves pre-click confidence at the exact conversion moment by turning critical safety info into fast-scannable bullets.
- Compliance: Supplement-safe process language preserved; no medical, disease, healing, or guaranteed-outcome claims added.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css`, synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`), and mirrored to `/tmp/mission-control-web-pub/auranem/` when available.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-09 05:59 UTC — Pass #73
- Focus: **Desktop CTA re-entry friction** (mobile had a persistent chooser, but desktop users lost immediate plan CTAs after scrolling through long comparison/trust sections).
- Change: Added one desktop-only sticky decision bar with two always-available plan actions (`Starter ab €89`, `Plus ab €149`) plus concise trust microcopy; auto-hides near final section to avoid CTA duplication overload.
- Why: Restores continuous decision access on desktop at high-scroll moments, reducing back-scroll effort and drop-off before offer-card clicks.
- Compliance: Kept supplement-safe language focused on process/price transparency; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` + `styles.css` + `script.js`, synced to `/home/marco/.openclaw/workspace/auranem/` (public path `/auranem/`), and mirrored to `/tmp/mission-control-web-pub/auranem/`.
- Verify: `python3 -m http.server 4173 --directory /home/marco/.openclaw/workspace` + `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**.

## 2026-03-09 07:59 UTC — Pass #74
- Focus: **Offer-card click hesitation** (users at the highest-intent point still saw action wording that felt more committing than necessary).
- Change: Updated exactly one conversion element: rewrote both offer-card primary CTA labels to risk-reversal language — `Starter unverbindlich prüfen (ab €89 · kein Abo)` and `Plus unverbindlich prüfen (ab €149 · kein Abo)`.
- Why: Lowers perceived commitment at the tap moment, making first action easier while preserving price clarity.
- Compliance: Kept supplement-safe scope (process/price language only; no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, and synced public serving path `/tmp/mission-control-web-pub/auranem/index.html` (`/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-09 10:04 UTC — Pass #59
- Focus: **Desktop last-click hesitation in sticky chooser (trust/next-step clarity too generic at high-intent moment).**
- Change: Replaced the desktop sticky microcopy with a conversion-guiding reassurance line: explicit low-risk default path (`Starter ohne Abo-Bindung`) + transparent final-step reminder + direct deep-link to the 3-question objection FAQ.
- Why: Reduces end-of-page decision friction on desktop by resolving uncertainty at the exact click zone instead of forcing extra scroll/search.
- Compliance: Claim-safe supplement language preserved (no medical, disease, or healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` (public path `/auranem/`) and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-09 11:59 UTC — Pass #75
- Focus: **CTA microcopy mismatch between static HTML and the variant-aware scripts** (missing target IDs kept the variant copy from showing, so first/last CTA microcopy stayed stale and mismatched the hero/final CTA messaging).
- Change: Added `id="hero-cta-micro"` on the hero micro line and `id="final-cta-micro"` on the closing micro line so the variant script can now replace the copy reliably for both hero and final CTA blocks.
- Why: Keeps the highest-attention microcopy in sync with the runtime variant (hero/final CTAs now show the expected safety/action language) and eliminates playbook friction where those lines stayed static despite the experiment.
- Compliance: Wording still focuses on routine/plan transparency and never introduces any medical, disease, or healing claims.
- Deploy: Rebuilt the brand folder and copied everything to `/tmp/mission-control-web-pub/auranem/` (public `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://localhost:8000/auranem/` => **200**.

## 2026-03-09 16:00 UTC — Pass #76
- Focus: **Above-the-fold speed friction** (a secondary hero-side product visual was still marked `loading="eager"`, competing with primary render resources on slower mobile devices).
- Change: Updated exactly one element in `index.html`: switched the hero proof-card image to deferred loading (`loading="lazy"`) and async decode (`decoding="async"`).
- Why: Frees first-paint bandwidth for the main headline/CTA + hero key visual, reducing early render contention before first interaction.
- Compliance: No copy/claim changes; supplement-safe language and winner logo/brand identity unchanged.
- Deploy: Synced updated `index.html` to `/home/marco/.openclaw/workspace/auranem/`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`, and copied to `/tmp/mission-control-web-pub/auranem/` when available.
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-09 18:00 UTC — Pass #77
- Focus: **Offer-card last-click friction** (CTA text said “unverbindlich prüfen,” but still left uncertainty about what happens immediately after click).
- Change: Updated one high-impact conversion element in both offer cards: primary CTA copy now explicitly sets next-step expectation — `…Preis & Inhalte im nächsten Schritt prüfen…` (Starter + Plus).
- Why: Reduces click anxiety at the highest-intent point by clarifying the immediate post-click outcome before commitment.
- Compliance: Kept supplement-safe language and stayed within process/price transparency framing (no medical, disease, healing, or guarantee claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, and synced `/tmp/mission-control-web-pub/auranem/index.html` when available (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-09 19:59 UTC — Pass #78
- Focus: **Offer-card click anxiety at the final pre-CTA checklist** (users still had to infer whether the CTA itself commits the order).
- Change: Updated one high-impact conversion pattern in both offer cards: first checklist line under the primary CTA now states explicit risk reversal — `Kein Kauf mit diesem Klick — zuerst Preis & Inhalte im nächsten Schritt prüfen`.
- Why: Removes ambiguity at the highest-intent moment and lowers perceived commitment right before the tap.
- Compliance: Kept supplement-safe wording (process/checkout clarity only; no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, and synced `/tmp/mission-control-web-pub/auranem/index.html` when present (`/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-09 22:00 UTC — Pass #57
- Focus: **Above-the-fold objection friction (users had to scroll to resolve key pre-click doubts).**
- Change: Added one compact `hero-quick-objections` accordion directly in the hero with 3 high-intent FAQs: no subscription, transparent price before final confirmation, and no healing/disease claims.
- Why: Removes early uncertainty at first attention point and should reduce hesitation before opening Starter/Plus.
- Compliance: Supplement-safe wording retained (no medical, disease, healing, or guarantee claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css` and mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-10 01:59 UTC — Pass #79
- Focus: **High-intent CTA scan friction on offer cards** (button text was too long and harder to parse at decision moment).
- Change: Implemented one focused conversion update on both offer cards: shortened primary CTA copy to `Starter/Plus unverbindlich prüfen (ab €...)` and added one concise microline below each CTA clarifying that price & contents are shown before final confirmation.
- Why: Faster comprehension at the last-click moment + clearer next-step expectation reduces hesitation without changing layout.
- Compliance: Supplement-safe language preserved (process transparency only, no medical/disease/healing claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html` + `styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`, and synced `/tmp/mission-control-web-pub/auranem/` (public `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-10 06:01 UTC — Pass #night
- Focus: **Plus-plan value friction at the final offer decision point**.
- Change: Added one compact `offer-savings-proof` line in the Plus card: `2× Starter = €178 vs. Plus = €149 (≈ €29 weniger)` directly below the per-day savings pill.
- Why: Converts abstract per-day savings into a concrete total-price comparison, reducing mental math right before CTA click.
- Compliance: Price/plan framing only; no medical, disease, healing, or guaranteed-outcome claims.
- Deploy: Updated `index.html` + `styles.css` in `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/`, mirrored to `/home/marco/.openclaw/workspace/auranem/` and `/tmp/mission-control-web-pub/auranem/` (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-10 13:59 UTC — Pass #Night
- Focus: **Offer-to-final handoff friction** (after choosing Starter/Plus, users were sent to a generic final section anchor and had to re-orient before the matching final CTA).
- Change: Updated one conversion-critical routing step in offer-card primary CTAs:
  - Starter CTA now links directly to `#ab-final-cta`
  - Plus CTA now links directly to `#final-plus-choice`
- Why: Preserves plan intent through the last decision stage and removes an extra re-decision step at the highest-intent moment.
- Compliance: No claim changes; supplement-safe wording and brand identity (including winner logo) unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, mirrored to `/home/marco/.openclaw/workspace/auranem/index.html`, and synced `/tmp/mission-control-web-pub/auranem/index.html` when available (public path `/auranem/`).
- Verify: `curl -I -L https://marcoinn.github.io/mission-control-web/auranem/` => **HTTP/2 200**.

## 2026-03-10 16:00 UTC — Pass #Night
- Focus: **Offer-comparison friction** (the 15-second Starter-vs-Plus matrix was visually under-emphasized, so key differences were easy to miss).
- Change: Added a dedicated visual treatment for the matrix block (`offer-decision-matrix`): structured table-like grid styling, stronger header/label hierarchy, and mobile-safe horizontal overflow with readable minimum width.
- Why: Makes plan differences scannable at a glance in the core comparison moment, reducing cognitive load before CTA clicks.
- Compliance: No claim changes; supplement-safe language remains intact (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/styles.css`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/styles.css`, and synced `/tmp/mission-control-web-pub/auranem/styles.css` (public path `/auranem/`).
- Verify: `python3 -m http.server 4173 --directory /home/marco/.openclaw/workspace` + `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-10 18:01 UTC — Pass #Night
- Focus: **Above-the-fold conversion friction from abstract hero messaging** (users had to infer where to click and when pricing clarity appears).
- Change: Rewrote exactly one hero copy block (`#ab-headline` + `#ab-subcopy`) to a concrete decision promise: choose the right routine in under 60 seconds, compare Starter/Plus immediately, and confirm only after transparent next-step review.
- Why: Increases first-screen clarity and reduces hesitation by making the next action and decision safety explicit before the first CTA click.
- Compliance: Supplement-safe language preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, and synced to `/tmp/mission-control-web-pub/auranem/index.html`.
- Verify: `curl -s -o /dev/null -w '%{http_code}' -L https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-10 20:00 UTC — Pass #Night
- Focus: **Intent mismatch friction** (users selecting/arriving with Plus intent still saw Starter as the primary CTA in hero/nav/sticky, creating a brief re-orientation step).
- Change: Implemented one high-impact JS pass in `script.js`: primary CTAs now auto-sync to the active plan intent (`starter`/`plus`) from selector/URL, updating target and label in hero + nav + sticky primary actions.
- Why: Keeps the main click path aligned with user intent, reducing decision friction at the highest-attention moments.
- Compliance: No health-claim changes; supplement-safe language preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/script.js`, mirrored to `/home/marco/.openclaw/workspace/auranem/script.js`, and synced `/tmp/mission-control-web-pub/auranem/script.js` (public `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' -L https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-10 21:59 UTC — Pass #Night
- Focus: **Purchase-risk friction right before plan clicks** (offer objections covered subscription/claims, but shipping+withdrawal reassurance was not present in the same high-intent FAQ block).
- Change: Added one concise fourth item to `offer-objection-faq`: `Wie laufen Versand und Widerruf?` with clear AT/DE shipping window (2–4 Werktage) and 14-day withdrawal for unopened goods.
- Why: Reduces last-mile hesitation by resolving a core transactional objection exactly at the conversion decision point.
- Compliance: Supplement-safe language preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, mirrored to `/home/marco/.openclaw/workspace/auranem/index.html`, and synced to `/tmp/mission-control-web-pub/auranem/index.html` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-10 23:59 UTC — Pass #Night
- Focus: **Decision-paralysis friction above the first CTA** (users had to scan multiple blocks before finding the shortest path to Starter vs Plus).
- Change: Added one compact hero block `hero-path-shortcuts` directly under subcopy with two intent-based quick links: **Neu starten (30 Tage) → Starter** and **Direkt durchziehen (60 Tage) → Plus**.
- Why: Reduces cognitive load in the first screen and gets high-intent visitors to the correct offer card faster.
- Compliance: Supplement-safe language preserved; no medical/healing/disease claims added. Brand identity and winner logo unchanged.
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html` and `styles.css`, mirrored to `/home/marco/.openclaw/workspace/auranem/`, and synced `/tmp/mission-control-web-pub/auranem/` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' -L https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-11 03:59 UTC — Pass #Night
- Focus: **Decision friction in the offer-intent chooser** (the two paths were clear but still too generic at the exact click moment).
- Change: Updated only the offer-intent copy to make both paths action-and-price explicit: `Starter ab €89` for low-risk 30-day start and `Plus ab €149` with direct savings context (`≈ €29 vs. 2× Starter`).
- Why: Reduces comparison effort at the core conversion step by turning abstract intent labels into immediate, value-anchored click choices.
- Compliance: Supplement-safe wording preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/index.html`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/index.html`, and synced to `/tmp/mission-control-web-pub/auranem/`.
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-11 08:00 UTC — Pass #Night
- Focus: **Final-step reassurance friction** (final CTA microcopy in runtime variant used abstract/negative phrasing, which can reduce trust right before the highest-intent click).
- Change: Updated exactly one conversion-critical copy element in `script.js` (`ctaMicrocopy.A.final`) to a clear process line: `Du springst zur passenden Variante und prüfst Preis & Inhalte vor der finalen Bestätigung.`
- Why: Increases conversion clarity at the last decision moment by explicitly describing the no-commitment next step.
- Compliance: Supplement-safe language preserved (no medical, disease, healing, or guaranteed-outcome claims).
- Deploy: Updated `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/script.js`, mirrored to `/home/marco/.openclaw/workspace/auranem/script.js`, and synced to `/tmp/mission-control-web-pub/auranem/script.js` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' https://marcoinn.github.io/mission-control-web/auranem/` => **200**.

## 2026-03-11 14:00 UTC — Pass #Night
- Focus: **First-screen decision friction** (headline did not immediately frame the concrete Starter-vs-Plus choice and no-subscription safety cue).
- Change: Updated exactly one high-impact copy element in `script.js` (`headlines.A`) to: `In 60 Sekunden zu deinem passenden Setup: Starter (30 Tage) oder Plus (60 Tage) — kein Abo.`
- Why: Makes the primary decision path explicit above the fold, reducing cognitive load and clarifying the next action faster.
- Compliance: Supplement-safe language preserved; no medical, disease, healing, or guaranteed-outcome claims added.
- Deploy: Updated `/home/marco/.openclaw/workspace/auranem/script.js`, mirrored to `/home/marco/.openclaw/workspace/brand/auranem/landing-page-v1/script.js`, and synced to `/tmp/mission-control-web-pub/auranem/script.js` (public path `/auranem/`).
- Verify: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4173/auranem/` => **200**; `curl -s -o /dev/null -w '%{http_code}' -L https://marcoinn.github.io/mission-control-web/auranem/` => **200**.
