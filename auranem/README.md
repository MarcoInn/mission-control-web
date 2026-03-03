# AURANEM Landing Page v2.1 (CRO Pass)

Premium-natural, compliance-safe static LP with angle-based message matching, upgraded proof architecture, and clearer offer stack.

## Files
- `index.html` — v2.1 architecture (proof upgrade, social placeholders, refined offer stack)
- `styles.css` — premium-natural design system + proof/quote/offer split components
- `script.js` — analytics hooks + A/B fallback + URL angle switching
- `assets/atlas-seal-northstar.svg` — official winner logo (hero + trust)

## v2.1 Changes
1. **Proof upgrade (compliance-safe):**
   - Trust section rewritten from generic brand copy to concrete credibility signals.
   - Added structured social-proof placeholders (3 quote cards) framed around routine adherence and transparency.
   - Maintains strict "no medical claims" language.

2. **Offer refinement:**
   - Offer now split into **Starter (active)** vs **Plus (placeholder)** to clarify architecture.
   - Value stack per offer card to reduce ambiguity before CTA click.
   - Price-anchor communication improved (`UVP €119` vs `ab €89*`) plus non-manipulative urgency note (launch window update framing).

3. **Message match by ad angle (`?angle=`):**
   - `routine_chaos`
   - `clarity_daily`
   - `premium_trust`
   - For each angle, hero eyebrow + headline + subcopy + hero CTA + final CTA + mobile sticky CTA adapt coherently.

4. **Tracking + CRO mechanics preserved:**
   - Existing events kept: `lp_loaded`, `cta_primary_click`, `cta_secondary_click`, `faq_expand`, `scroll_depth`.
   - Event payload now includes `angle` in addition to `variant`.
   - Mobile sticky CTA retained and still instrumented.

5. **Winner logo preserved:**
   - Atlas Seal Northstar logo remains in hero and trust block.

## v2.1 Test Protocol (today)
Run one controlled check at a time (keep everything else constant).

### Test 1 — Angle message match quality
- Traffic split by ad intent to:
  - `?angle=routine_chaos`
  - `?angle=clarity_daily`
  - `?angle=premium_trust`
- Primary metric: Hero CTA CTR by angle.
- Secondary metric: Scroll 50/75 depth by angle.

### Test 2 — Proof block contribution
- Keep angle fixed, compare quote-card proof visibility vs previous proof section (if available in backup variant).
- Primary metric: Final CTA click rate.
- Secondary metric: FAQ expand rate.

### Test 3 — Offer architecture comprehension
- Keep traffic and angle stable.
- Measure effect of Starter-vs-Plus split on offer CTA CTR and drop-off between hero and offer section.

## Expected KPI effect (v2.1 hypothesis)
- **Hero CTA CTR:** +8% to +18% relative lift from improved message match.
- **Offer CTA CTR:** +10% to +20% relative lift from clearer value stack.
- **Scroll depth 75%:** +6% to +12% from stronger proof hierarchy.
- **FAQ expand quality signal:** +10% to +25% due to trust/clarity framing.

## Quick QA checklist (2–3 min)
- [ ] `?angle=routine_chaos` changes hero + CTA set coherently
- [ ] `?angle=clarity_daily` changes hero + CTA set coherently
- [ ] `?angle=premium_trust` changes hero + CTA set coherently
- [ ] `lp_loaded` includes `angle` in dataLayer payload
- [ ] Primary/secondary CTA events still fire with `ctaName`
- [ ] FAQ open emits `faq_expand`
- [ ] Mobile sticky CTA visible on small screens only
- [ ] No medical cure/disease claims in copy
