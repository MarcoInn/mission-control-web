---
name: free-ai-visual-studio
description: Use free/open models and low-cost local pipelines to generate brand images/videos (Hero, UGC, product visuals). Use when quality must improve beyond static slides and when production should scale without expensive tooling.
---

Create market-ready visuals with a model-first workflow.

## Model strategy (free/open first)
1) Image generation:
- SDXL (open)
- Flux dev/open alternatives when available
2) Image-to-video:
- Stable Video Diffusion (img2vid)
- CogVideoX (open checkpoints)
- LTX-Video (real-time oriented)
3) Video polish:
- ffmpeg for cuts, pacing, captions, safe-area formatting

## Decision flow
1. Define asset objective:
   - stop-scroll hook
   - trust proof
   - offer clarity
   - CTA conversion
2. Choose output type:
   - hero image
   - ad static
   - ugc short (9:16)
3. Pick model by constraints:
   - fastest acceptable: SVD img2vid
   - strongest text-to-video: CogVideoX/LTX (if infra supports)
4. Generate 3 variants minimum.
5. Score each on: hook, readability, brand fit, conversion intent.

## Non-negotiables
- Mobile-first safe area for text overlays.
- Person + product interaction in hero/UGC where possible.
- No fake medical claims for supplements.
- Avoid obvious AI-template look.

## Output package
- Final asset(s)
- Prompt used
- Variant scorecard
- Next iteration action
