# AURANEM Landing Page v2.2 (Customer Magnet Pass)

Customer-facing, compliance-safe LP focused on 30-day routine clarity and faster offer selection.

## Files
- `index.html` — v2.2 page architecture with customer-first messaging
- `styles.css` — premium-natural style system + mobile sticky CTA
- `script.js` — A/B text toggles + analytics event hooks (kept from v2.1)
- `assets/atlas-seal-northstar.svg` — asset available, no internal winner-language shown on page

## v2.2 changes shipped
1. **Above-the-fold reframed to customer outcome in 30 days**
   - Hero now leads with practical result framing (routine that fits daily life).
2. **Offer comparison added (Starter vs Plus)**
   - Simple decision guidance + recommended badge on Plus.
3. **"Ist das für mich?" section added**
   - 3 customer profiles for fast self-identification.
4. **Daily timeline section added**
   - Morning / Day / Evening clarity to reduce uncertainty.
5. **Trust block rebuilt with customer-relevant proof placeholders**
   - Structured placeholders for verified voices + transparent offer logic.
6. **CTA copy upgraded across page**
   - Benefit-led wording in hero, offer, final CTA, and sticky mobile CTA.
7. **Compliance-safe copy retained**
   - No medical/disease claims.
8. **Tracking hooks retained from v2.1**
   - `cta_primary_click`, `cta_secondary_click`, `faq_expand`, `scroll_depth`, `lp_loaded`.

## v2.2 test plan
Test one variable at a time (min. ~500 unique sessions/variant if possible):

1. **Hero outcome headline A/B**
   - A: "In 30 Tagen zu einer Routine, die in deinen Alltag passt."
   - B: "30 Tage klare Struktur — damit Dranbleiben leichter wird."
   - Primary metric: Hero primary CTA CTR

2. **Offer selection framing A/B**
   - A: current “Starter vs Plus + short rule”
   - B: same layout + “3-Fragen-Wahlhilfe” microcopy
   - Primary metric: Offer-section primary CTA CTR

3. **Proof placeholders format A/B**
   - A: current 3-card placeholder proof structure
   - B: compact proof strip + one expanded customer voice card
   - Primary metric: Scroll depth 75% + final CTA click rate

## KPI hypotheses (next sprint)
- Hero primary CTA CTR: **+20–30%** vs v2.1 baseline
- Offer-section CTA CTR: **+15–25%** through clearer Starter/Plus selection
- Final CTA click-through: **+10–20%** via stronger benefit-led wording
- Scroll 75% reach: **≥ 50%** with clearer section progression
- Sticky mobile CTA contribution: **≥ 20%** of total primary CTA clicks

## 2-minute QA checklist (v2.2)
- [ ] Hero + final CTA text switch correctly via `LP_CONFIG.variant`
- [ ] Primary/secondary CTA events still fire and include `ctaName`
- [ ] FAQ expand emits `faq_expand`
- [ ] Scroll emits 25/50/75/100 once each
- [ ] Sticky CTA visible on mobile only
- [ ] No internal language (e.g., winner/internal decision artifacts) in customer-facing copy
- [ ] No medical/disease claims

## Deploy target
- Public path: `/auranem/`
- Live URL: `https://marcoinn.github.io/mission-control-web/auranem/`
