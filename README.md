# Mission Control Web UI (v3.3)

Mission Control v3.3 ist ein Executive Command Center mit vier Tabs:
- **Übersicht** (Commercial + Delivery + Decision Support)
- **Agent Team** (The Office Aufgaben + KPI-Scorecards)
- **ERP** (Inventory, Orders, Cashflow-Risiken)
- **CRM** (Pipeline, Conversion, Next Actions, Opportunities)

## Start lokal

```bash
cd /home/marco/.openclaw/workspace/apps/mission-control/web
python3 -m http.server 8090
```

Dann im Browser öffnen:
- http://localhost:8090

Optionaler Mode-Override via URL:
- `http://localhost:8090?mode=live`
- `http://localhost:8090?mode=demo`

---

## Neu in v3.3 (Live-Control)

1. **Safe Live Mode Umschaltung + Fallback**
   - App startet standardmäßig im `live`-Intent.
   - Wenn Live-Feeds nicht ladbar oder durch Validation Gate fallen, schaltet UI automatisch auf Demo-Fallback.
   - Sichtbar über **Mode Badge** im Header inkl. Fallback-Hinweis.

2. **Robuste Live-Ingest + Validation Gate (ERP/CRM/Tasks)**
   - Normalizer akzeptieren sowohl Zielstruktur als auch flache Import-Formate.
   - Validation Gate prüft Pflichtfelder und Integrität (Statussets, Numeric-Sanity, Feed-Presence).
   - Gate-Resultat fließt in **Data Trust** ein.

3. **Blocker Resolution Panel**
   - Neue Tabelle in Übersicht mit:
     - blocked task list
     - owner
     - due time
     - next action

4. **Data Freshness Indicator**
   - Header zeigt Timestamp + Alter in Stunden.
   - Klare Stale-Warnung bei alten Daten.

5. **Top-3 Decision View nur aus Live-Daten**
   - Decision Panel zieht nur Tasks mit `_source=live`.
   - Bei nicht validem Live-Feed: eindeutiger Hinweis statt Demo-Entscheidungen.

6. **Mobile-readability**
   - Header-Chips responsive.
   - Tabellen bleiben horizontal scrollbar.
   - Panels/Karten mit klarer Hierarchie auf kleinen Screens.

---

## Datenstruktur

### Live Data Templates
- `data/live/tasks_live_template.json`
- `data/live/erp_live_template.json`
- `data/live/crm_live_template.json`

### Referenz-Schemata
- `data/live/schema/tasks.schema.json`
- `data/live/schema/erp.schema.json`
- `data/live/schema/crm.schema.json`

---

## Live Activation Checklist

1. **Feeds bereitstellen**
   - Tasks, ERP, CRM auf die Live-Dateien oder API-Bridge mappen.

2. **Schema-/Gate-Checks bestehen**
   - Tasks: `id/status/prioritaet/owner` vorhanden + Status gültig.
   - ERP: `inventory` nicht leer + gültige `status` Werte.
   - CRM: `pipeline` vorhanden + `count/value >= 0`.

3. **Freshness validieren**
   - Timestamp-Felder in den Feeds pflegen (`updated_at`, `dueDate`, etc.).
   - Header darf nicht dauerhaft `STALE WARNING` zeigen.

4. **Top-3 Decision Smoke-Test**
   - Prüfen, dass nur Live-Tasks angezeigt werden.
   - Bei Gate-Fehlern muss Hinweis erscheinen (kein Demo-Leak in Top-3).

5. **Fallback-Test**
   - Live-Datei temporär brechen/entfernen.
   - Erwartung: App fällt auf Demo zurück + Mode-Hinweis sichtbar.

6. **Mobile QA (2 min)**
   - Übersicht auf ~390px Breite prüfen.
   - Blocker Panel + Task Table weiterhin lesbar.

---

## Feature Map

### 1) Übersicht
- Commercial Cockpit Cards
- KPI Karten (6 KPIs)
- **Decision Panel**: Top-3 Entscheidungen aus Live-Tasks
- **Data Trust Badge** (GRUEN/GELB/ROT) mit Gate-Checks
- **Blocker SLA Widget**
- **Blocker Resolution Panel**
- Task Tower mit Statusfilter
- Top Risiken / Eskalation

### 2) Agent Team
- Aktive Workload nach The-Office-Rollen
- Agent KPI Scorecards für CFO/CMO/COO/CRO/Content/Compliance

### 3) ERP
- Inventory Table: SKU, Stock, Reorder Point, Status, Bestandswert
- Purchase / Orders Board mit PO-Status-Spalten
- Alerts
- One-click Status Filter (all/healthy/watch/stockout_risk/overstock_risk)

### 4) CRM
- Lead Pipeline Stages: new/contacted/call/booked/proposal/won/lost
- Conversion Metrics by Stage
- Next Actions List (today)
- Top Opportunities Widget
