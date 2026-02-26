# Mission Control Web UI (v3)

Mission Control v3 ist ein Executive Command Center mit vier Tabs:
- **Übersicht** (Commercial + Delivery Steuerung)
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

## Feature Map

### 1) Übersicht
- Commercial Cockpit Cards
- KPI Karten (bestehende 6 KPIs)
- Task Tower mit Statusfilter
- Top Risiken / Eskalation

### 2) Agent Team
- Aktive Workload nach The-Office-Rollen
- **Agent KPI Scorecards** mit Ampel-Status für:
  - CFO
  - CMO
  - COO
  - CRO
  - Content
  - Compliance

### 3) ERP
- **Inventory Table**: SKU, Stock, Reorder Point, Status, Bestandswert
- **Purchase / Orders Board** mit PO-Status-Spalten
- **Cashflow-kritische Alerts**:
  - Stockout Risk
  - Overstock Risk
  - Cashflow Exposure
- **One-click Status Filter** (all/healthy/watch/stockout_risk/overstock_risk)

### 4) CRM
- **Lead Pipeline Stages**: new/contacted/call/booked/proposal/won/lost
- **Conversion Metrics by Stage**
- **Next Actions List (today)**
- **Top Opportunities Widget**

## Datenmodell (Fixtures)

Neue JSON-Dateien unter `web/data`:
- `erp_fixtures.json`
- `crm_fixtures.json`
- `agent_kpis_office.json`

Alle Daten sind deterministisch und mit realistischen Demo-Werten gepflegt.

## 5-Min Test Checklist

1. App laden und Tabs prüfen: Übersicht, Agent Team, ERP, CRM.
2. In Übersicht den Task-Statusfilter wechseln und Table/Risks verifizieren.
3. In Agent Team prüfen, dass jede Rolle 3 KPIs mit grün/gelb/rot Badge hat.
4. In ERP einen Filter klicken (z. B. `stockout_risk`) und Table-Update prüfen.
5. Im ERP Orders Board kontrollieren, dass POs in Status-Spalten einsortiert sind.
6. Im CRM Pipeline + Conversion Cards prüfen.
7. Im CRM Next Actions + Top Opportunities sichtbar und mit Werten gefüllt.
8. Mobile Check (Browser Responsive Mode): Layout bleibt lesbar/scannable.
