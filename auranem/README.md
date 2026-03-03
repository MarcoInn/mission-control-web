# AURANEM Landing Page v2.4 (Real Content + Product Visual Integration)

v2.4 removes placeholder content and ships a concrete, compliance-safe conversion page with real product visuals.

## Files
- `index.html` — v2.4 conversion architecture with concrete trust, offer, fit, timeline, FAQ, and final CTA blocks
- `styles.css` — updated visual system including hero/offer product visuals and timeline grid
- `script.js` — unchanged tracking + angle routing + CTA instrumentation
- `assets/atlas-seal-northstar.svg` — winner seal
- `assets/starter-packshot.png` — integrated starter product visual
- `assets/plus-packshot.png` — integrated plus product visual

## What became concrete in v2.4
1. **Real product visuals added (no placeholders):**
   - Hero proof card now includes `starter-packshot.png`.
   - Offer cards include both `starter-packshot.png` and `plus-packshot.png`.

2. **Trust placeholders replaced with concrete blocks:**
   - “What is included in Starter” (30-day unit + start guide + weekly checklist)
   - “What is included in Plus” (60-day supply + routine card + priority support SLA)
   - “Quality & Transparency” (batch labeling, usage clarity, no disease/cure claims)
   - Atlas winner mark as explicit brand/provenance signal

3. **Offer comparison made real:**
   - Plus block is no longer “Placeholder”; now explicit 60-day option with concrete scope and pricing structure.

4. **Conversion architecture completed:**
   - Hero outcome + CTA
   - Offer comparison (Starter vs Plus)
   - Profile fit section (`#fit`)
   - 30-day routine timeline (`#timeline`)
   - Final CTA section
   - Sticky mobile CTA retained

5. **Expectation setting clarified:**
   - Added explicit expectation framing: routine consistency focus, individual outcomes vary, no medical promises.

## Tracking + Routing (preserved)
- Existing events remain active:
  - `lp_loaded`
  - `cta_primary_click`
  - `cta_secondary_click`
  - `faq_expand`
  - `scroll_depth`
- URL angle routing remains active via `?angle=`:
  - `routine_chaos`
  - `clarity_daily`
  - `premium_trust`
- Hero + CTA text updates still function through `script.js` IDs:
  - `ab-eyebrow`, `ab-headline`, `ab-subcopy`, `ab-primary-cta`, `ab-final-cta`, `ab-mobile-cta`

## QA checklist (2 minutes)
- [ ] Hero shows real product visual (starter packshot)
- [ ] Offer shows both Starter and Plus visuals
- [ ] No placeholder language remains (e.g., "Placeholder", "Template")
- [ ] No medical cure/disease claims
- [ ] `?angle=routine_chaos` updates hero + CTA copy
- [ ] `?angle=clarity_daily` updates hero + CTA copy
- [ ] `?angle=premium_trust` updates hero + CTA copy
- [ ] Primary and sticky CTA clicks are still tracked