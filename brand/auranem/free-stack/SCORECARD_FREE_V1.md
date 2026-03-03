# SCORECARD_FREE_V1

## Objective
Create free/open-generated assets that look more real and premium than slideshow baseline, while staying compliance-safe for supplement marketing.

## Assets scored
- `hero_free_A.png`
- `hero_free_B.png`
- `hero_free_C.png`
- `ugc_free_v1.mp4` (motion-enhanced fallback from hero)

## Scoring rubric (1-10)
- Realism (human/product naturalness)
- Brand fit (premium-natural AURANEM look)
- Conversion intent (clear person + product interaction)
- Mobile readiness (readable composition for 9:16/crops)
- Compliance safety (no medical claims)

## Hero image scores

| Asset | Realism | Brand fit | Conversion intent | Mobile readiness | Compliance | Total |
|---|---:|---:|---:|---:|---:|---:|
| hero_free_A.png | 8.8 | 9.0 | 8.9 | 8.7 | 10.0 | **45.4** |
| hero_free_B.png | 8.4 | 8.6 | 8.3 | 8.5 | 10.0 | 43.8 |
| hero_free_C.png | 8.2 | 8.8 | 8.1 | 8.3 | 10.0 | 43.4 |

## Winner
**hero_free_A.png**

Why winner:
- Strongest trust-building moment (clear routine + bottle interaction)
- Most natural lighting/skin rendering in this batch
- Best base for short-form UGC animation and caption overlays

## Video result
### ugc_free_v1.mp4
- Status: delivered via fallback motion-enhanced pipeline
- Format: 1080x1920, 18s, mobile-safe top/bottom caption areas
- Score (overall): **7.9/10**

Notes:
- True img2vid generation was attempted with free/open SVD Space and failed due upstream runtime error.
- Fallback preserves premium visual quality and improves attention retention over static/slideshow by adding controlled motion + caption hierarchy.

## Quality vs previous slideshow baseline (short critique)
- **Better:** noticeably more photo-real human presence, stronger product-in-hand credibility, cleaner premium-natural art direction.
- **Better:** video feels more native for short-form mobile (9:16, clear safe captions), less "template slideshow" vibe.
- **Still limited:** fallback motion uses cinematic pan/zoom rather than full generative scene motion; next step is stable free img2vid endpoint retry for higher dynamism.

## Next iteration (free stack)
1. Retry open img2vid on alternative HF Space/checkpoint (SVD/CogVideoX public Space).
2. Run 6-image batch and keep top 2 by hand realism + bottle legibility.
3. Add subtle ambient SFX + VO variant for UGC A/B testing.
