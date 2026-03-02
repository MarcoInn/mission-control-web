# AURANEM Landing Page v2 (Conversion Focus)

Premium-natural, compliance-safe static LP with A/B-ready messaging and lightweight analytics hooks.

## Files
- `index.html` — v2 page architecture + trust/proof + offer framing
- `styles.css` — premium-natural visual system + mobile sticky CTA
- `script.js` — A/B text toggles + analytics event hooks
- `assets/atlas-seal-northstar.svg` — official winner logo

## What changed in v2
1. **Outcome-driven hero** with stronger promise + trust line.
2. **Atlas Seal Northstar logo** added in hero and trust section.
3. **Clear offer framing** with price anchor (`UVP €119` vs `Starter ab €89*` placeholder).
4. **Objection handling** through FAQ + friction-reduction copy.
5. **Sticky mobile CTA** for persistent conversion path.

## Analytics hooks implemented
- Primary CTA clicks: `cta_primary_click`
- Secondary CTA clicks: `cta_secondary_click`
- FAQ expand: `faq_expand`
- Scroll checkpoints: `scroll_depth` at 25/50/75/100

All events are pushed to `window.dataLayer` and logged to console (`[LP_TRACK] ...`).

## A/B test toggles
In `script.js`:
```js
const LP_CONFIG = {
  variant: "A", // switch to "B"
  headlines: { A: "...", B: "..." },
  primaryCta: { A: "...", B: "..." },
  finalCta: { A: "...", B: "..." }
};
```

## Test plan (headline / CTA / proof)
Run tests one variable at a time (minimum 500 unique sessions per variant when possible):

1. **Headline A/B**
   - A: "Weniger Supplement-Chaos. Mehr tägliche Balance mit System."
   - B: "30 Tage klare Routine — für mehr Konstanz im Alltag."
   - Primary metric: Hero CTA CTR

2. **CTA copy A/B**
   - A: "Jetzt 30-Tage-Routine sichern"
   - B: "30-Tage Starter entdecken"
   - Primary metric: Total primary CTA CTR

3. **Proof block A/B**
   - A: current structured trust cards
   - B: compact testimonial-style proof + same compliance note
   - Primary metric: Scroll depth 75% + final CTA click rate

## KPI targets (first optimization sprint)
- Hero primary CTA CTR: **≥ 6.5%**
- Total LP primary CTA CTR: **≥ 9%**
- FAQ expansion rate: **20–35%** (healthy intent signal)
- Scroll 75% reach: **≥ 45%**
- Mobile sticky CTA contribution: **≥ 18%** of total primary CTA clicks

## Quick QA checklist (2 minutes)
- [ ] Hero + final CTA text change when `LP_CONFIG.variant` switches
- [ ] Primary/secondary CTA clicks emit correct events
- [ ] FAQ open emits `faq_expand`
- [ ] Scroll emits 25/50/75/100 once each
- [ ] Mobile sticky CTA visible on small screens only
- [ ] No medical cure/disease claims in copy
