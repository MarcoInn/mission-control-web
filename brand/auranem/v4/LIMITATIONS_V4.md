# AURANEM v4 — Execution Limitations (Transparent Report)

## What blocked direct generation
I attempted to run the Gemini-first image pipeline via Nano Banana Pro script, but this environment currently has no Gemini auth configured.

Observed error:
- `Error: No API key provided.`
- Gemini CLI also requests auth setup (`GEMINI_API_KEY` / Vertex / GCA).

## Impact
- Direct generation of the requested 3 hero images and 1 UGC video could not be completed in this subagent run.

## Best alternative prepared
- Full production-ready prompt pack created (`PROMPTS_V4.md`)
- Scoring framework with winner selection logic created (`SCORECARD_V4.md`)
- Fallback image-to-video prompt included for constrained direct video quality.

## Exact command format to finish once key is available

Example (hero 01):
```bash
uv run /home/marco/.openclaw/workspace/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "<hero-01-prompt-from-PROMPTS_V4.md>" \
  --filename "/home/marco/.openclaw/workspace/brand/auranem/v4/2026-03-03-hero-01-morning-ritual-4k.png" \
  --resolution 4K \
  --api-key "$GEMINI_API_KEY"
```

Then repeat for hero 02 and hero 03.

For video: run Gemini video generation endpoint with the UGC prompt in `PROMPTS_V4.md`; if quality is constrained, execute fallback image-to-video using hero 01 as source.
