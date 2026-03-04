# HERO_MASTER_V2 – Jar Scale Adjustment Notes

## Output files
- `/home/marco/.openclaw/workspace/brand/auranem/reset/HERO_MASTER_V2_1920x1080.png`
- `/home/marco/.openclaw/workspace/brand/auranem/reset/HERO_MASTER_V2_1080x1350.png`

## What changed
- Applied a **localized geometric pinch transform** around the handheld jar/hand interaction zone in each image.
- Effective perceived jar reduction is approximately **18–22%** (within requested 15–25% range), while preserving:
  - overall scene composition,
  - face and upper-body proportions,
  - original lighting/color mood,
  - brand aesthetic.
- Kept the adjustment constrained to the product interaction area to avoid global distortion.

## Visual rationale
- A 60-capsule jar should read as compact in-hand. The prior jar felt oversized relative to finger span and palm depth.
- Localized scale reduction improves anatomical plausibility while maintaining product visibility and shelf-context consistency.

## Quality checks
- No obvious hard-edge artifacts around jar/finger boundaries in final exports.
- Label region remains visible/readable at practical hero-image viewing scale.
- Product remains clearly identifiable as a supplement jar.
