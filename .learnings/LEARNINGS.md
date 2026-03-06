## [LRN-20260304-001] best_practice

**Logged**: 2026-03-04T14:00:00Z
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
Daily Skill Loop wird mit einem festen DE-Kurztemplate standardisiert, damit Learn→Apply→Codify jedes Mal reproduzierbar ist.

### Details
Heute fehlte ein wiederverwendbares, kompaktes Format für den täglichen Skill-Loop mit messbarer Vorher/Nachher-Logik. Es wurde ein Template erstellt, das genau die geforderten Felder (Skill, Anwendung, messbare Verbesserung, Mikro-Schritt, Unsicherheit) erzwingt.

### Suggested Action
Ab morgen jedes Daily-Skill-Loop-Update mit `playbooks/daily-skill-loop-template-de.md` vorbereiten und die Messwerte explizit ausweisen.

### Metadata
- Source: conversation
- Related Files: playbooks/daily-skill-loop-template-de.md
- Tags: daily-skill-loop, standardisierung, messbarkeit

---

## [LRN-20260305-001] best_practice

**Logged**: 2026-03-05T14:00:00Z
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
Quellenbewertung für Thesis-Research wird robuster, wenn der Score-Report neben Ampel auch Durchschnitts-Score und "Sofort ersetzen"-Zähler ausweist.

### Details
Im bestehenden Workflow waren Ampelverteilung und KO-Flaggen sichtbar, aber keine schnelle Priorisierungsmetrik für sofortige Austausch-Entscheidungen. Das Script `scripts/quellen_score_calc.py` wurde erweitert um `Durchschnitts-Score` und `Sofort ersetzen`, und der Report neu erzeugt.

### Suggested Action
Diesen Report vor jeder Kapitelüberarbeitung laufen lassen und zuerst Quellen mit Aktion "Ersetzen" austauschen.

### Metadata
- Source: conversation
- Related Files: scripts/quellen_score_calc.py, thesis-sprint/quellen_score_report.md
- Tags: research-quality, quellenbewertung, priorisierung, thesis

---

## [LRN-20260306-001] best_practice

**Logged**: 2026-03-06T14:16:00Z
**Priority**: medium
**Status**: pending
**Area**: docs

### Summary
Daily Thesis-Quellencheck wird verlässlich, wenn die Bewertung per Script vor jeder Kapitelarbeit automatisiert neu erzeugt wird.

### Details
Für den heutigen Skill-Loop wurde der bestehende Workflow praktisch angewendet: `python3 scripts/quellen_score_calc.py thesis-sprint/quellen_score_beispiel.csv thesis-sprint/quellen_score_report.md`. Dadurch entsteht ein reproduzierbarer Qualitäts-Check statt manueller Einzelbewertung.

### Suggested Action
Vor jeder Thesis-Session zuerst den Quellen-Report neu generieren und nur mit GRUEN/GELB-Quellen weiterarbeiten; ROT/KO priorisiert ersetzen.

### Metadata
- Source: conversation
- Related Files: scripts/quellen_score_calc.py, thesis-sprint/quellen_score_report.md
- Tags: daily-skill-loop, research-quality, automation, thesis

---

## [LRN-20260306-002] reliability

**Logged**: 2026-03-06T15:40:00Z
**Priority**: medium
**Status**: done
**Area**: ops

### Summary
Wenn ein geplanter Skill-Loop-Write fehlschlägt, muss ein manueller Fallback-Eintrag im selben Tag erfolgen, damit Lernkontinuität nicht bricht.

### Details
Der Cron-Run meldete einen Edit-Fehler beim Schreiben nach `.learnings/LEARNINGS.md`. Als Recovery wurde der Eintrag manuell nachgezogen und der Fallback als Regel festgehalten, damit zukünftige Loop-Learnings trotz transienter Tool-Fehler dokumentiert bleiben.

### Suggested Action
Bei jedem `Edit failed` im Daily Skill Loop innerhalb derselben Session einen manuellen Append ausführen und kurz die Ursache + Recovery notieren.

### Metadata
- Source: conversation
- Related Files: .learnings/LEARNINGS.md
- Tags: reliability, fallback, daily-skill-loop

---
