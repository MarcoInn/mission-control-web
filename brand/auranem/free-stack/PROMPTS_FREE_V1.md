# PROMPTS_FREE_V1

## Stack used (free/open)
- Image model: `hysts/SDXL` (Hugging Face Space, open SDXL)
- Attempted image-to-video model: `multimodalart/stable-video-diffusion` (HF Space, open SVD) — endpoint raised runtime exception in this run.
- Video fallback: local `ffmpeg` motion-enhanced UGC edit from winning hero.

## Compliance guardrails used
- No disease/medical claims
- Lifestyle language only: "daily wellness support"
- Premium-natural visual direction

## Hero prompts

### A (hero_free_A.png)
**Prompt**
Ultra-realistic premium lifestyle photo of an athletic woman in a bright modern kitchen, smiling while holding an elegant amber supplement bottle labeled AURANEM and a glass of water, natural morning sunlight, authentic skin texture, documentary commercial style, 85mm lens look, shallow depth of field, clean neutral tones, no text

**Negative prompt**
cartoon, illustration, CGI, deformed hands, extra fingers, blurry, low resolution, watermark, logo, text artifacts, oversaturated, plastic skin

**Params**
- seed: 42011
- size: 768x1024
- guidance: 5 / 5
- steps: base 28, refiner 18

---

### B (hero_free_B.png)
**Prompt**
Ultra-realistic editorial photo of a fit man post-workout in minimalist apartment, opening premium amber supplement bottle labeled AURANEM, natural candid expression, soft daylight through window, premium wellness brand aesthetic, realistic hands, cinematic but natural color grading, no text

**Negative prompt**
cartoon, illustration, CGI, deformed hands, extra fingers, blurry, low resolution, watermark, logo, text artifacts, oversaturated, plastic skin

**Params**
- seed: 42022
- size: 768x1024
- guidance: 5 / 5
- steps: base 28, refiner 18

---

### C (hero_free_C.png)
**Prompt**
Ultra-realistic couple wellness scene at home near plants and window light, woman handing AURANEM amber supplement bottle to man, premium-natural lifestyle atmosphere, true-to-life proportions, candid interaction, high-end ad photography style, no text

**Negative prompt**
cartoon, illustration, CGI, deformed hands, extra fingers, blurry, low resolution, watermark, logo, text artifacts, oversaturated, plastic skin

**Params**
- seed: 42033
- size: 768x1024
- guidance: 5 / 5
- steps: base 28, refiner 18

## Video generation log

### Attempt 1 (failed)
- Model: `multimodalart/stable-video-diffusion` (HF Space)
- Method: `/video` endpoint via gradio client using winning hero input
- Result: runtime exception from upstream app (no verbose stack trace exposed)

### Fallback produced
- Input: `hero_free_A.png`
- Toolchain: ffmpeg (Ken Burns style zoom/pan + mobile safe overlays)
- Output: `ugc_free_v1.mp4`
- Format: 1080x1920 (9:16), 18s, H.264, caption overlays
- Overlay copy:
  - Top: "Morning routine. Premium by nature."
  - Bottom: "AURANEM | daily wellness support"
