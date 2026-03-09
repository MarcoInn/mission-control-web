# AURANEM 48h Test Matrix (Go-Live)

## Objective
Validate first-pass winners within 48h with a strict sequence:
1. **UGC Video first**
2. **Ad Static second**
3. **Hero third (scale only if prior signal is valid)**

---

## KPI Thresholds (Primary Gates)

- **CTR (all assets):**
  - Go: **>= 1.8%**
  - Iterate: **1.2% - 1.79%**
  - Kill: **< 1.2%**

- **Hook-Hold (video assets only):**
  - Proxy inputs: `video_3s_rate` + `hold_rate`
  - Go: **video_3s_rate >= 35%** AND **hold_rate >= 22%**
  - Iterate: one metric in-range (**video_3s_rate 28-34%** OR **hold_rate 16-21%**)
  - Kill: **video_3s_rate < 28%** OR **hold_rate < 16%**

- **LP-CVR (all assets):**
  - Go: **>= 2.5%**
  - Iterate: **1.6% - 2.49%**
  - Kill: **< 1.6%**

---

## Sequence & Budget Logic

## Phase 1 (0-24h): UGC Video
- Launch UGC first to validate hook + message-market resonance.
- Minimum viability check before scaling:
  - Spend >= defined minimum test spend
  - Impressions >= 3,000 OR clicks >= 50 (whichever comes first)
- Decision after 24h:
  - **GO** if 2/3 primary gates are Go and none are Kill
  - **ITERATE** if mixed signal (at least one Iterate and no more than one Kill)
  - **KILL** if 2+ Kill conditions triggered

## Phase 2 (24-36h): Ad Static
- Launch static only after UGC has at least Iterate/Go signal.
- Objective: verify click intent and LP congruence without video dependency.
- Decision gate after enough signal (>= 2,000 impressions and >= 35 clicks):
  - **GO** if CTR + LP-CVR are both Go
  - **ITERATE** if one Go and one Iterate
  - **KILL** if either KPI is Kill and not compensated by strong opposite metric

## Phase 3 (36-48h): Hero Asset
- Launch Hero only if either UGC or Static reaches Go.
- Hero is a scale candidate, not discovery candidate.
- Decision at 48h:
  - **GO/SCALE** if CTR Go and LP-CVR Go, with CPA at or below target
  - **ITERATE** if CTR or LP-CVR is Iterate but no hard Kill
  - **KILL** if CTR or LP-CVR in Kill zone at sufficient sample

---

## Global Go / Kill / Iterate Rules

### GO
- Minimum sample reached
- No major tracking issues
- KPI profile meets Go definition
- Action: increase spend +20-30% max per 24h

### ITERATE
- Partial signal, no full failure
- Action: keep spend flat or -10%, change one variable only:
  - hook OR first line OR thumbnail (video)
  - headline OR visual hierarchy (static)
  - caption variant DE/EN

### KILL
- KPI profile in Kill band at minimum sample
- Action: pause asset, document reason, do not relaunch unchanged

---

## Decision Rhythm
- **T+24h:** first decision snapshot
- **T+48h:** final winner selection for next cycle
- Use `DECISION_SUMMARY_TEMPLATE.md` for both checkpoints.
