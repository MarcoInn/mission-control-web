# JARVIS Weekly Scoreboard

Start: 2026-03-04
Owner: JARVIS
Review cadence: Weekly (quick readout in chat)

## KPI-Set (3 Kernwerte)

1) **Direct Delivery Rate (DDR)**
- Definition: Anteil Medien-Tasks, bei denen direkt Datei(en) gesendet wurden (statt nur Pfad/Statustext)
- Formel: `direct_media_deliveries / total_media_tasks`
- Ziel: **>= 95%**

2) **First-Pass Acceptance Rate (FPAR)**
- Definition: Anteil Outputs, die ohne „nochmal neu machen“-Feedback akzeptiert wurden
- Formel: `accepted_on_first_pass / total_deliveries`
- Ziel: **>= 70%**

3) **Recovery Time on Failure (RTF)**
- Definition: Median-Zeit von Fehler bis belastbarer nächster Lösung/Output
- Formel: `median(minutes_to_recovery)`
- Ziel: **<= 15 min**

---

## Week Log

### KW10 (Start 2026-03-04)
- DDR: **Baseline wird ab jetzt getrackt**
- FPAR: **Baseline wird ab jetzt getrackt**
- RTF: **Baseline wird ab jetzt getrackt**

**Observed improvements this week (qualitativ):**
- Medienlieferung von „Pfad-only“ auf direkte Dateizustellung umgestellt.
- Gate-basierter Content-Prozess eingeführt (Briefing/Tech/Brand/Conversion/Delivery).
- Daily Skill Loop standardisiert (Learn → Apply → Codify).

**Main blocker:**
- Modell-/Kapazitäts- und Runtime-Schwankungen (Limits, 429, Tool-Allowlist).

**Countermeasure active:**
- Stabilerer Delivery-Flow mit klarer Fallback-Reihenfolge und direkter Dateiübermittlung.

---

## Weekly Review Template (copy for next week)

### KW__ (Start YYYY-MM-DD)
- DDR: __%
- FPAR: __%
- RTF: __ min

Top 1 Verbesserung:
- ...

Top 1 Problem:
- ...

Nächster Fokus (konkret):
- ...
