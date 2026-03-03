# AURANEM Landing Page v2.6 (Visual Category Upgrade)

v2.6 upgrades the LP with conversion-purpose visuals aligned to landing-page best practices:
- message-match to ad intent
- product shown in use
- authentic proof architecture
- directional cues to CTA
- mobile-safe hierarchy

## Files
- `index.html` — v2.6 layout with 8+ visual blocks integrated into decision flow
- `styles.css` — visual block styling + responsive hierarchy polish
- `script.js` — unchanged tracking + angle routing + CTA instrumentation
- `assets/*` — real local SVG/PNG visuals (optimized for fast render)

## Visual category map (what was added)

| Category | Block location | Asset | Conversion purpose |
|---|---|---|---|
| A) Hero lifestyle + product-in-use | Hero section | `assets/hero-lifestyle-routine.svg` | Message-match from ad promise to concrete daily-use scene (reduces abstractness in first 5 sec). |
| B) Product packshot (Starter) | Hero proof + Offer card | `assets/starter-packshot.png` | Confirms real product and starter offer clarity. |
| C) Product packshot (Plus) | Offer card (Plus) | `assets/plus-packshot.png` | Supports immediate plan-tier comparison before CTA click. |
| D) Routine timeline illustration | Timeline section | `assets/routine-timeline-30.svg` | Turns the 30-day promise into an understandable process (lowers cognitive load). |
| E) Transparency/quality infographic | Quality section | `assets/transparency-quality.svg` | Visual trust: batch ID, usage clarity, claim-safe communication. |
| F1) Profile-fit visual (Starter) | Fit section card 1 | `assets/profile-starter.svg` | Helps first-time users self-identify quickly. |
| F2) Profile-fit visual (Plus) | Fit section card 2 | `assets/profile-plus.svg` | Helps committed users map to longer horizon option. |
| F3) Profile-fit visual (Not ideal) | Fit section card 3 | `assets/profile-not-fit.svg` | Sets boundaries and expectation fit (higher trust, fewer wrong clicks). |
| G) Social-proof layout visual | Trust section top | `assets/social-proof-structure.svg` | Uses proof structure instead of fake testimonials/claims. |
| H) Directional cue visual to CTA | Final CTA section | `assets/cta-directional-cue.svg` | Adds visual guidance toward the next decision action. |

## Compliance + tracking
- Compliance-safe language retained (no disease/healing claims).
- Existing analytics events preserved:
  - `lp_loaded`
  - `cta_primary_click`
  - `cta_secondary_click`
  - `faq_expand`
  - `scroll_depth`
- URL angle routing preserved:
  - `?angle=routine_chaos`
  - `?angle=clarity_daily`
  - `?angle=premium_trust`

## QA checklist (first pass)
- [ ] Hero loads lifestyle + product-in-use visual above first CTA.
- [ ] Starter + Plus packshots render in offer split.
- [ ] Timeline infographic displays before timeline cards.
- [ ] Transparency infographic loads and remains legible on mobile.
- [ ] All three profile-fit cards include dedicated visuals.
- [ ] Social-proof structure visual displays without fake testimonials.
- [ ] Directional cue appears directly above final CTA.
- [ ] No tracking regressions in browser console (`[LP_TRACK]` events).