# UTM Plan — AURANEM 48h Test

## Naming Convention

- **Campaign:** `auranem_48h_{country}_{objective}_{yyyymmdd}`
  - Example: `auranem_48h_de_conv_20260309`

- **Ad Set:** `{asset}_{audience}_{placement}_{lang}`
  - Example: `ugc_v1_broad_reels_de`

- **Ad Name:** `{asset}_{captionVariant}_{creativeVersion}`
  - Example: `ugc_v1_capA_v1`

---

## UTM Structure

- `utm_source=meta`
- `utm_medium=paid_social`
- `utm_campaign={campaign}`
- `utm_content={asset}_{captionVariant}_{lang}`
- `utm_term={adset}`

Optional internal params:
- `asset={ugc_v1|static_v1|hero_v1}`
- `lang={de|en}`
- `cap={A|B}`

---

## Asset + Caption Variant Matrix (DE/EN)

## 1) UGC_V1_ProblemSolution
- DE A:
  - `utm_campaign=auranem_48h_de_conv_20260309`
  - `utm_content=ugc_v1_capA_de`
  - `utm_term=ugc_v1_broad_reels_de`
- DE B:
  - `utm_campaign=auranem_48h_de_conv_20260309`
  - `utm_content=ugc_v1_capB_de`
  - `utm_term=ugc_v1_broad_reels_de`
- EN A:
  - `utm_campaign=auranem_48h_en_conv_20260309`
  - `utm_content=ugc_v1_capA_en`
  - `utm_term=ugc_v1_broad_reels_en`
- EN B:
  - `utm_campaign=auranem_48h_en_conv_20260309`
  - `utm_content=ugc_v1_capB_en`
  - `utm_term=ugc_v1_broad_reels_en`

## 2) STATIC_V1_BenefitCard
- DE A:
  - `utm_campaign=auranem_48h_de_conv_20260309`
  - `utm_content=static_v1_capA_de`
  - `utm_term=static_v1_broad_feed_de`
- DE B:
  - `utm_campaign=auranem_48h_de_conv_20260309`
  - `utm_content=static_v1_capB_de`
  - `utm_term=static_v1_broad_feed_de`
- EN A:
  - `utm_campaign=auranem_48h_en_conv_20260309`
  - `utm_content=static_v1_capA_en`
  - `utm_term=static_v1_broad_feed_en`
- EN B:
  - `utm_campaign=auranem_48h_en_conv_20260309`
  - `utm_content=static_v1_capB_en`
  - `utm_term=static_v1_broad_feed_en`

## 3) HERO_V1_FounderAngle
- DE A:
  - `utm_campaign=auranem_48h_de_conv_20260309`
  - `utm_content=hero_v1_capA_de`
  - `utm_term=hero_v1_interest_mix_de`
- DE B:
  - `utm_campaign=auranem_48h_de_conv_20260309`
  - `utm_content=hero_v1_capB_de`
  - `utm_term=hero_v1_interest_mix_de`
- EN A:
  - `utm_campaign=auranem_48h_en_conv_20260309`
  - `utm_content=hero_v1_capA_en`
  - `utm_term=hero_v1_interest_mix_en`
- EN B:
  - `utm_campaign=auranem_48h_en_conv_20260309`
  - `utm_content=hero_v1_capB_en`
  - `utm_term=hero_v1_interest_mix_en`

---

## URL Build Template
`https://your-landing-page.com/?utm_source=meta&utm_medium=paid_social&utm_campaign={campaign}&utm_content={asset}_{captionVariant}_{lang}&utm_term={adset}`
