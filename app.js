const DEFAULT_DATA_MODE = 'live'; // default runtime intent

const DATA_SOURCES = {
  demo: {
    kpi: './data/mission_control_kpis_6.json',
    tasks: './data/mission_control_demo_tasks_10.json',
    erp: './data/erp_fixtures.json',
    crm: './data/crm_fixtures.json',
    agentKpis: './data/agent_kpis_office.json'
  },
  live: {
    kpi: './data/mission_control_kpis_6.json', // can be switched to dedicated live KPI feed later
    tasks: './data/live/tasks_live_template.json',
    erp: './data/live/erp_live_template.json',
    crm: './data/live/crm_live_template.json',
    agentKpis: './data/agent_kpis_office.json'
  }
};

const LIVE_TASK_STATUSES = new Set(['todo', 'in_progress', 'review', 'blocked', 'done', 'cancelled']);
const LIVE_PRIORITIES = new Set(['kritisch', 'hoch', 'mittel', 'niedrig']);
const INVENTORY_STATUSES = new Set(['healthy', 'watch', 'stockout_risk', 'overstock_risk']);
const SEVERITY_MAP = { critical: 'rot', high: 'rot', medium: 'gelb', low: 'gruen', red: 'rot', yellow: 'gelb', green: 'gruen' };

const kpiCards = document.getElementById('kpiCards');
const commercialCards = document.getElementById('commercialCards');
const taskRows = document.getElementById('taskRows');
const riskList = document.getElementById('riskList');
const statusFilter = document.getElementById('statusFilter');
const agentCards = document.getElementById('agentCards');
const agentKpiCards = document.getElementById('agentKpiCards');
const decisionList = document.getElementById('decisionList');
const blockerSlaCards = document.getElementById('blockerSlaCards');
const blockerResolutionRows = document.getElementById('blockerResolutionRows');
const dataTrustBadge = document.getElementById('dataTrustBadge');
const dataTrustMeta = document.getElementById('dataTrustMeta');
const dataFreshnessBadge = document.getElementById('dataFreshnessBadge');
const dataFreshnessText = document.getElementById('dataFreshnessText');
const dataModeBadge = document.getElementById('dataModeBadge');

const erpAlertCards = document.getElementById('erpAlertCards');
const erpFilterButtons = document.getElementById('erpFilterButtons');
const inventoryRows = document.getElementById('inventoryRows');
const poBoard = document.getElementById('poBoard');

const crmMetricCards = document.getElementById('crmMetricCards');
const crmPipeline = document.getElementById('crmPipeline');
const nextActionsList = document.getElementById('nextActionsList');
const topOpportunities = document.getElementById('topOpportunities');

let allTasks = [];
let erpData = { inventory: [], purchaseOrders: [], alerts: [] };
let runtimeMode = 'demo';
let liveValidation = { valid: false, errors: [] };

const badge = (txt) => `<span class="badge ${txt}">${String(txt).toUpperCase()}</span>`;

const AGENTS = [
  { name: 'Michael Scott', role: 'CEO Office', avatar: 'https://ui-avatars.com/api/?name=Michael+Scott&background=0f172a&color=ffffff&size=128' },
  { name: 'Dwight Schrute', role: 'COO', avatar: 'https://ui-avatars.com/api/?name=Dwight+Schrute&background=1d4ed8&color=ffffff&size=128' },
  { name: 'Oscar Martinez', role: 'CFO', avatar: 'https://ui-avatars.com/api/?name=Oscar+Martinez&background=065f46&color=ffffff&size=128' },
  { name: 'Kelly Kapoor', role: 'CMO', avatar: 'https://ui-avatars.com/api/?name=Kelly+Kapoor&background=be185d&color=ffffff&size=128' },
  { name: 'Jim Halpert', role: 'CRO/CRM', avatar: 'https://ui-avatars.com/api/?name=Jim+Halpert&background=7c3aed&color=ffffff&size=128' },
  { name: 'Pam Beesly', role: 'Head of Content', avatar: 'https://ui-avatars.com/api/?name=Pam+Beesly&background=b45309&color=ffffff&size=128' },
  { name: 'Toby Flenderson', role: 'Compliance', avatar: 'https://ui-avatars.com/api/?name=Toby+Flenderson&background=334155&color=ffffff&size=128' },
];

function toDateSafe(v) {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}
function median(values) {
  if (!values.length) return 0;
  const arr = [...values].sort((a, b) => a - b);
  const mid = Math.floor(arr.length / 2);
  return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}
function dayDiff(from, to) {
  const ms = to.getTime() - from.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}
function slugify(v = '') {
  return String(v).trim().toLowerCase().replace(/\s+/g, '_');
}
function parseNum(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function getRequestedMode() {
  const urlMode = new URLSearchParams(window.location.search).get('mode');
  const localMode = localStorage.getItem('mission-control-mode');
  const requested = ['live', 'demo'].includes(urlMode) ? urlMode : (['live', 'demo'].includes(localMode) ? localMode : DEFAULT_DATA_MODE);
  localStorage.setItem('mission-control-mode', requested);
  return requested;
}

function setModeBadge(mode, fallbackReason = '') {
  if (!dataModeBadge) return;
  const state = mode === 'live' ? 'gruen' : 'gelb';
  dataModeBadge.innerHTML = `<span class="badge ${state}">${mode.toUpperCase()}</span>${fallbackReason ? ` <small class="mode-note">${fallbackReason}</small>` : ''}`;
}

function riskScore(task) {
  const impactScore = { hoch: 3, mittel: 2, niedrig: 1 };
  const probabilityScore = { hoch: 3, mittel: 2, niedrig: 1 };
  const priorityScore = { kritisch: 4, hoch: 3, mittel: 2, niedrig: 1 };
  const blocked = task.blocker?.ist_blockiert ? 6 : 0;
  return blocked + (impactScore[task.risiko?.impact] || 0) + (probabilityScore[task.risiko?.wahrscheinlichkeit] || 0) + (priorityScore[task.prioritaet] || 0);
}

function normalizeLiveTasks(raw) {
  const arr = Array.isArray(raw) ? raw : [];
  return arr.map((t, i) => {
    const status = slugify(t.status || 'todo');
    const prioritaet = slugify(t.prioritaet || 'mittel');
    const blocked = Boolean(t.blocker?.ist_blockiert || t.blocked || status === 'blocked');
    return {
      id: t.id || `LIVE-TASK-${String(i + 1).padStart(4, '0')}`,
      titel: t.titel || t.title || `Task ${i + 1}`,
      status: LIVE_TASK_STATUSES.has(status) ? status : 'todo',
      prioritaet: LIVE_PRIORITIES.has(prioritaet) ? prioritaet : 'mittel',
      owner: { name: t.owner?.name || t.owner || 'Unassigned' },
      due_date: t.due_date || t.due || null,
      risiko: {
        impact: slugify(t.risiko?.impact || 'mittel'),
        wahrscheinlichkeit: slugify(t.risiko?.wahrscheinlichkeit || 'mittel'),
        offen: Boolean(t.risiko?.offen ?? true)
      },
      blocker: {
        ist_blockiert: blocked,
        next_action: t.blocker?.next_action || t.next_action || t.nextAction || 'Owner to define next unblocking action',
        due_time: t.blocker?.due_time || t.blocker_due_time || t.due_time || t.due_date || null
      },
      _source: 'live'
    };
  });
}

function normalizeLiveErp(raw) {
  if (raw?.inventory && Array.isArray(raw.inventory)) {
    return {
      inventory: raw.inventory.map(i => ({
        sku: i.sku,
        name: i.name,
        stock: parseNum(i.stock),
        reorderPoint: parseNum(i.reorderPoint),
        status: INVENTORY_STATUSES.has(i.status) ? i.status : (parseNum(i.stock) <= parseNum(i.reorderPoint) ? 'stockout_risk' : 'healthy'),
        unitCost: parseNum(i.unitCost, 0)
      })),
      purchaseOrders: Array.isArray(raw.purchaseOrders) ? raw.purchaseOrders : [],
      alerts: Array.isArray(raw.alerts) ? raw.alerts : []
    };
  }

  const arr = Array.isArray(raw) ? raw : [];
  const inventory = arr.map(i => {
    const stock = parseNum(i.Stock ?? i.stock);
    const reorderPoint = parseNum(i.ReorderPoint ?? i.reorderPoint);
    let status = slugify(i.Status ?? i.status);
    if (!INVENTORY_STATUSES.has(status)) {
      status = stock <= reorderPoint ? 'stockout_risk' : (stock >= reorderPoint * 2 ? 'overstock_risk' : 'healthy');
    }
    return {
      sku: i.SKU || i.sku,
      name: i.Product || i.name || 'Unnamed',
      stock,
      reorderPoint,
      status,
      unitCost: parseNum(i.Cost ?? i.unitCost, 0)
    };
  });

  const stockout = inventory.filter(i => i.status === 'stockout_risk').length;
  const overstock = inventory.filter(i => i.status === 'overstock_risk').length;

  return {
    inventory,
    purchaseOrders: [],
    alerts: [
      { type: 'stockout_risk', title: 'Stockout Risk', description: `${stockout} SKUs unter Reorder Point.`, severity: stockout > 0 ? 'rot' : 'gruen' },
      { type: 'overstock_risk', title: 'Overstock Risk', description: `${overstock} SKUs mit Überbestand.`, severity: overstock > 0 ? 'gelb' : 'gruen' }
    ]
  };
}

function normalizeLiveCrm(raw) {
  if (raw?.pipeline && Array.isArray(raw.pipeline)) {
    return raw;
  }

  const arr = Array.isArray(raw) ? raw : [];
  const stageOrder = ['new', 'contacted', 'call', 'booked', 'proposal', 'won', 'lost'];
  const stageMap = new Map(stageOrder.map(s => [s, { stage: s, count: 0, value: 0 }]));

  const nextActionsToday = [];
  const topOpportunities = [];

  arr.forEach((d, idx) => {
    const stage = slugify(d.Stage || d.stage || 'new');
    const normalizedStage = stageOrder.includes(stage) ? stage : 'new';
    const value = parseNum(d.Value ?? d.value, 0);

    const current = stageMap.get(normalizedStage);
    current.count += 1;
    current.value += value;

    if (d.NextAction || d.nextAction) {
      nextActionsToday.push({
        time: `${String(9 + (idx % 8)).padStart(2, '0')}:00`,
        owner: d.Owner || d.owner || 'Sales',
        task: d.NextAction || d.nextAction,
        priority: value >= 50000 ? 'hoch' : value >= 20000 ? 'mittel' : 'niedrig'
      });
    }

    topOpportunities.push({
      account: d.DealName || d.account || `Deal ${idx + 1}`,
      stage: normalizedStage,
      owner: d.Owner || d.owner || 'Sales',
      value,
      probability: normalizedStage === 'won' ? 100 : normalizedStage === 'proposal' ? 65 : normalizedStage === 'booked' ? 55 : normalizedStage === 'call' ? 45 : normalizedStage === 'contacted' ? 35 : 20
    });
  });

  return {
    pipeline: stageOrder.map(s => stageMap.get(s)),
    nextActionsToday,
    topOpportunities: topOpportunities.sort((a, b) => b.value - a.value).slice(0, 6)
  };
}

function validateLiveBundle(tasks, erp, crm) {
  const errors = [];

  if (!Array.isArray(tasks) || tasks.length === 0) errors.push('Tasks feed leer oder kein Array.');
  if (tasks.some(t => !t.id || !LIVE_TASK_STATUSES.has(t.status) || !t.owner?.name)) errors.push('Tasks enthalten ungültige Pflichtfelder (id/status/owner).');

  if (!Array.isArray(erp.inventory) || erp.inventory.length === 0) errors.push('ERP inventory fehlt oder leer.');
  if (erp.inventory.some(i => !i.sku || !INVENTORY_STATUSES.has(i.status))) errors.push('ERP inventory enthält ungültige SKU/Statuswerte.');

  if (!Array.isArray(crm.pipeline) || crm.pipeline.length === 0) errors.push('CRM pipeline fehlt oder leer.');
  if (crm.pipeline.some(p => !Number.isFinite(p.count) || !Number.isFinite(p.value) || p.count < 0 || p.value < 0)) errors.push('CRM pipeline enthält ungültige count/value Werte.');

  return { valid: errors.length === 0, errors };
}

function renderFreshness(kpis, tasks, erp, crm) {
  const now = Date.now();
  const stamps = [];

  kpis.forEach(k => k.timestamp && stamps.push(k.timestamp));
  tasks.forEach(t => (t.updated_at || t.due_date) && stamps.push(t.updated_at || t.due_date));
  (erp.purchaseOrders || []).forEach(po => po.eta && stamps.push(po.eta));
  (crm.nextActionsToday || []).forEach(a => a.dueDate && stamps.push(a.dueDate));

  const parsed = stamps.map(toDateSafe).filter(Boolean).map(d => d.getTime());
  if (!parsed.length) {
    dataFreshnessBadge.innerHTML = badge('gelb');
    dataFreshnessText.textContent = 'Keine verlässlichen Timestamps im Feed gefunden.';
    return;
  }

  const newestTs = Math.max(...parsed);
  const ageHours = (now - newestTs) / (1000 * 60 * 60);
  const state = ageHours <= 6 ? 'gruen' : ageHours <= 24 ? 'gelb' : 'rot';
  const staleTxt = ageHours > 24 ? ' · STALE WARNING' : '';

  dataFreshnessBadge.innerHTML = badge(state);
  dataFreshnessText.textContent = `Letztes Update: ${new Date(newestTs).toISOString()} · ${ageHours.toFixed(1)}h alt${staleTxt}`;
}

function renderCommercial(kpis, tasks) {
  const active = tasks.filter(t => ['in_progress', 'todo', 'review', 'blocked'].includes(t.status)).length;
  const blocked = tasks.filter(t => t.blocker?.ist_blockiert).length;
  const critical = tasks.filter(t => t.prioritaet === 'kritisch' && t.status !== 'done').length;
  const impact = (kpis.find(k => String(k.kpi_id).includes('KPI-06'))?.ist_wert) || 0;

  const items = [
    { label: 'Aktive Tasks', value: active },
    { label: 'Blocker offen', value: blocked },
    { label: 'Kritische Tasks offen', value: critical },
    { label: 'Business Impact', value: `${impact} EUR` },
  ];

  commercialCards.innerHTML = items.map(i => `<div class="card"><div class="kpi-name">${i.label}</div><div class="kpi-value">${i.value}</div></div>`).join('');
}

function renderKpis(kpis) {
  kpiCards.innerHTML = kpis.map(k => `<div class="card">
    <div class="kpi-name">${k.name}</div>
    <div class="kpi-value">${k.ist_wert} <small>${k.einheit}</small></div>
    ${badge(k.ampel)}
    <div class="meta">Ziel: ${k.zielwert} | Owner: ${k.owner}</div>
  </div>`).join('');
}

function renderDecisionPanel(tasks) {
  if (!liveValidation.valid) {
    decisionList.innerHTML = '<li>Top-3 Decisions nur mit validem LIVE Feed verfügbar.</li>';
    return;
  }

  const today = new Date();
  const todayIso = today.toISOString().slice(0, 10);

  const candidates = tasks
    .filter(t => t._source === 'live')
    .filter(t => ['todo', 'in_progress', 'review', 'blocked'].includes(t.status))
    .map(task => {
      const due = task.due_date || '';
      const dueTodayBonus = due === todayIso ? 4 : 0;
      const blockedBonus = task.blocker?.ist_blockiert ? 3 : 0;
      return { ...task, decisionScore: riskScore(task) + dueTodayBonus + blockedBonus };
    })
    .sort((a, b) => b.decisionScore - a.decisionScore)
    .slice(0, 3);

  decisionList.innerHTML = candidates.length
    ? candidates.map(item => `<li>
        <strong>${item.titel}</strong>
        <span class="agent-role">Owner: ${item.owner?.name || 'n/a'} · Due: ${item.due_date || 'n/a'}</span>
      </li>`).join('')
    : '<li>Keine priorisierten Entscheidungen aus Live-Daten.</li>';
}

function renderBlockerSla(tasks) {
  const today = new Date();
  const blocked = tasks.filter(t => t.blocker?.ist_blockiert);
  const ages = blocked.map(t => {
    const due = toDateSafe(t.blocker?.due_time || t.due_date);
    return due ? dayDiff(due, today) : 0;
  }).filter(Number.isFinite);

  const medianAge = ages.length ? median(ages) : 0;
  const slaState = medianAge <= 1 ? 'gruen' : medianAge <= 3 ? 'gelb' : 'rot';

  const items = [
    { label: 'Blocked Tasks', value: blocked.length, unit: '' },
    { label: 'Median Blocker Age', value: medianAge, unit: 'Tage' },
    { label: 'SLA Status', value: String(slaState).toUpperCase(), unit: '' }
  ];

  blockerSlaCards.innerHTML = items.map(i => `<div class="card">
      <div class="kpi-name">${i.label}</div>
      <div class="kpi-value">${i.value} <small>${i.unit}</small></div>
      ${i.label === 'SLA Status' ? badge(slaState) : ''}
    </div>`).join('');
}

function renderBlockerResolution(tasks) {
  const blocked = tasks
    .filter(t => t.blocker?.ist_blockiert)
    .sort((a, b) => riskScore(b) - riskScore(a));

  blockerResolutionRows.innerHTML = blocked.length
    ? blocked.map(t => `<tr>
      <td>${t.titel}</td>
      <td>${t.owner?.name || 'n/a'}</td>
      <td>${t.blocker?.due_time || t.due_date || 'n/a'}</td>
      <td>${t.blocker?.next_action || 'Owner to define next unblocking action'}</td>
    </tr>`).join('')
    : '<tr><td colspan="4">Keine aktiven Blocker.</td></tr>';
}

function evaluateDataTrust(kpis, tasks, erp, crm) {
  const now = new Date();
  const checks = [];

  const kpiTimestamps = kpis.map(k => toDateSafe(k.timestamp)).filter(Boolean).map(d => now.getTime() - d.getTime());
  const maxAgeHours = kpiTimestamps.length ? Math.max(...kpiTimestamps) / (1000 * 60 * 60) : null;
  const freshnessState = maxAgeHours === null ? 'gelb' : maxAgeHours <= 24 ? 'gruen' : maxAgeHours <= 72 ? 'gelb' : 'rot';
  checks.push({ name: 'Fixture freshness', state: freshnessState, detail: maxAgeHours === null ? 'Kein Timestamp in allen Quellen' : `max ${maxAgeHours.toFixed(1)}h alt` });

  const invalidInventory = (erp.inventory || []).filter(i => !INVENTORY_STATUSES.has(i.status)).length;
  checks.push({ name: 'ERP inventory consistency', state: invalidInventory === 0 ? 'gruen' : 'rot', detail: invalidInventory === 0 ? 'Statuswerte konsistent' : `${invalidInventory} ungültige Statuswerte` });

  const inventorySku = new Set((erp.inventory || []).map(i => i.sku));
  const orphanPo = (erp.purchaseOrders || []).filter(po => !inventorySku.has(po.sku)).length;
  checks.push({ name: 'PO ↔ SKU linkage', state: orphanPo === 0 ? 'gruen' : 'gelb', detail: orphanPo === 0 ? 'Alle POs auf bekannte SKU gemappt' : `${orphanPo} POs ohne SKU-Match` });

  const stageCountsValid = (crm.pipeline || []).every(s => Number.isFinite(s.count) && s.count >= 0 && Number.isFinite(s.value) && s.value >= 0);
  checks.push({ name: 'CRM pipeline integrity', state: stageCountsValid ? 'gruen' : 'rot', detail: stageCountsValid ? 'Counts/Values valide' : 'Negative/invalid values gefunden' });

  const openTasks = tasks.filter(t => ['todo', 'in_progress', 'review', 'blocked'].includes(t.status)).length;
  checks.push({ name: 'Task feed present', state: openTasks > 0 ? 'gruen' : 'gelb', detail: `${openTasks} offene Tasks` });

  checks.push({
    name: 'Live validation gate',
    state: liveValidation.valid ? 'gruen' : 'rot',
    detail: liveValidation.valid ? 'LIVE payload freigegeben' : liveValidation.errors.join(' | ')
  });

  const hasRed = checks.some(c => c.state === 'rot');
  const hasYellow = checks.some(c => c.state === 'gelb');
  const overall = hasRed ? 'rot' : hasYellow ? 'gelb' : 'gruen';

  dataTrustBadge.innerHTML = badge(overall);
  dataTrustMeta.innerHTML = checks.map(c => `<li><b>${c.name}:</b> ${c.detail} (${c.state.toUpperCase()})</li>`).join('');
}

function renderTasks(tasks) {
  taskRows.innerHTML = tasks.map(t => `<tr>
    <td>${t.id}</td><td>${t.titel}</td><td>${t.status}</td><td>${t.prioritaet}</td><td>${t.owner?.name || ''}</td><td>${t.due_date || ''}</td>
  </tr>`).join('');

  const risks = tasks.filter(t => t.risiko?.offen || t.blocker?.ist_blockiert).sort((a, b) => riskScore(b) - riskScore(a)).slice(0, 5);
  riskList.innerHTML = risks.map(r => `<li><b>${r.id}</b> – ${r.titel}${r.blocker?.ist_blockiert ? ' 🚫 BLOCKED' : ''} (Impact: ${r.risiko?.impact || 'n/a'})</li>`).join('') || '<li>Keine akuten Risiken.</li>';
}

function mapTaskToAgent(task) {
  const t = task.titel.toLowerCase();
  if (t.includes('kpi') || t.includes('report')) return 'Oscar Martinez';
  if (t.includes('risiko') || t.includes('compliance')) return 'Toby Flenderson';
  if (t.includes('capacity') || t.includes('schema') || t.includes('tower')) return 'Dwight Schrute';
  if (t.includes('executive') || t.includes('one-pager')) return 'Michael Scott';
  if (t.includes('daily') || t.includes('agenda')) return 'Jim Halpert';
  return 'Pam Beesly';
}

function renderAgents(tasks) {
  const active = tasks.filter(t => ['in_progress', 'todo', 'review', 'blocked'].includes(t.status));
  const byAgent = {};
  active.forEach(t => {
    const a = mapTaskToAgent(t);
    if (!byAgent[a]) byAgent[a] = [];
    byAgent[a].push(t);
  });

  agentCards.innerHTML = AGENTS.map(a => {
    const list = (byAgent[a.name] || []).slice(0, 2);
    const content = list.length
      ? list.map(t => `<div class="agent-task">• ${t.titel} <span class="agent-role">(${t.status})</span></div>`).join('')
      : '<div class="agent-task">• Kein aktiver Task</div>';
    return `<article class="agent-card"><div style="display:flex;align-items:center;gap:10px;"><img src="${a.avatar}" alt="${a.name}" style="width:42px;height:42px;border-radius:999px;border:1px solid #334155"/><div><h3 style="margin:0">${a.name}</h3><div class="agent-role">${a.role}</div></div></div>${content}</article>`;
  }).join('');
}

function renderAgentKpis(agentKpis) {
  agentKpiCards.innerHTML = agentKpis.map(item => {
    const kpiRows = item.kpis.map(kpi => `<div class="kpi-row"><span>${kpi.name}</span><strong>${kpi.value}</strong>${badge(kpi.status)}</div>`).join('');
    return `<article class="agent-card"><h3>${item.role}</h3><div class="agent-role">${item.agent}</div>${kpiRows}</article>`;
  }).join('');
}

function renderErpAlerts(alerts) {
  erpAlertCards.innerHTML = alerts.map(a => `<div class="card">
    <div class="kpi-name">${a.title}</div>
    <div class="kpi-value">${badge(SEVERITY_MAP[a.severity] || a.severity || 'gelb')}</div>
    <div class="meta">${a.description}</div>
  </div>`).join('');
}

function renderInventory(status = 'all') {
  const rows = status === 'all' ? erpData.inventory : erpData.inventory.filter(i => i.status === status);

  inventoryRows.innerHTML = rows.map(item => {
    const value = Math.round(item.stock * item.unitCost);
    return `<tr>
      <td>${item.sku}</td>
      <td>${item.name}</td>
      <td>${item.stock}</td>
      <td>${item.reorderPoint}</td>
      <td>${badge(item.status === 'healthy' ? 'gruen' : item.status === 'watch' ? 'gelb' : 'rot')}</td>
      <td>${value.toLocaleString('de-DE')} EUR</td>
    </tr>`;
  }).join('') || '<tr><td colspan="6">Keine Positionen für diesen Filter.</td></tr>';
}

function initInventoryFilters() {
  const filters = ['all', 'healthy', 'watch', 'stockout_risk', 'overstock_risk'];
  erpFilterButtons.innerHTML = filters.map((f, index) => `<button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${f}">${f}</button>`).join('');

  erpFilterButtons.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      erpFilterButtons.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderInventory(btn.dataset.filter);
    });
  });
}

function renderPoBoard(poItems) {
  const statuses = ['awaiting_approval', 'ordered', 'in_transit', 'received', 'on_hold'];
  poBoard.innerHTML = statuses.map(status => {
    const items = poItems.filter(po => po.status === status);
    return `<div class="board-col">
      <h3>${status.replaceAll('_', ' ')}</h3>
      ${items.length ? items.map(i => `<div class="board-item"><b>${i.po}</b><div>${i.supplier}</div><div>${i.sku} · Qty ${i.qty}</div><small>ETA ${i.eta}</small></div>`).join('') : '<div class="board-item muted">Keine Einträge</div>'}
    </div>`;
  }).join('');
}

function renderCrm(crm) {
  const totalLeads = crm.pipeline.reduce((sum, p) => sum + p.count, 0);
  const won = crm.pipeline.find(s => s.stage === 'won')?.count || 0;
  const proposal = crm.pipeline.find(s => s.stage === 'proposal')?.count || 0;
  const contacted = crm.pipeline.find(s => s.stage === 'contacted')?.count || 1;

  const metrics = [
    { label: 'Total Pipeline Leads', value: totalLeads },
    { label: 'Contacted → Proposal', value: `${Math.round((proposal / Math.max(contacted, 1)) * 100)}%` },
    { label: 'Proposal → Won', value: `${Math.round((won / Math.max(proposal, 1)) * 100)}%` },
    { label: 'Top Funnel Value', value: `${(crm.pipeline[0]?.value || 0).toLocaleString('de-DE')} EUR` },
  ];

  crmMetricCards.innerHTML = metrics.map(m => `<div class="card"><div class="kpi-name">${m.label}</div><div class="kpi-value">${m.value}</div></div>`).join('');

  crmPipeline.innerHTML = crm.pipeline.map(stage => `<div class="board-col">
    <h3>${stage.stage}</h3>
    <div class="board-item"><div><b>${stage.count}</b> Leads</div><div>${stage.value.toLocaleString('de-DE')} EUR</div></div>
  </div>`).join('');

  nextActionsList.innerHTML = (crm.nextActionsToday || []).map(a => `<li><b>${a.time}</b> · ${a.task} <span class="agent-role">(${a.owner}, ${a.priority})</span></li>`).join('') || '<li>Keine Today Actions.</li>';

  topOpportunities.innerHTML = (crm.topOpportunities || []).map(o => `<div class="board-item">
    <b>${o.account}</b><div>${o.stage} · ${o.owner}</div><div>${o.value.toLocaleString('de-DE')} EUR · ${o.probability}%</div>
  </div>`).join('') || '<div class="board-item muted">Keine Opportunities.</div>';
}

function initTaskFilter(tasks) {
  const statuses = [...new Set(tasks.map(t => t.status))];
  statuses.forEach(s => {
    if ([...statusFilter.options].some(o => o.value === s)) return;
    const o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    statusFilter.appendChild(o);
  });

  statusFilter.addEventListener('change', () => {
    const v = statusFilter.value;
    const filtered = v === 'all' ? allTasks : allTasks.filter(t => t.status === v);
    renderTasks(filtered);
    renderAgents(filtered);
    renderDecisionPanel(filtered);
    renderBlockerSla(filtered);
    renderBlockerResolution(filtered);
  });
}

function initTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });
}

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`);
  return res.json();
}

async function boot() {
  const requestedMode = getRequestedMode();
  let sources = DATA_SOURCES[requestedMode];
  let fallbackReason = '';

  const [kpis, agentKpis] = await Promise.all([loadJson(sources.kpi), loadJson(sources.agentKpis)]);

  let tasksRaw;
  let erpRaw;
  let crmRaw;

  try {
    [tasksRaw, erpRaw, crmRaw] = await Promise.all([loadJson(sources.tasks), loadJson(sources.erp), loadJson(sources.crm)]);
  } catch (err) {
    if (requestedMode === 'live') {
      sources = DATA_SOURCES.demo;
      [tasksRaw, erpRaw, crmRaw] = await Promise.all([loadJson(sources.tasks), loadJson(sources.erp), loadJson(sources.crm)]);
      fallbackReason = 'Live feed nicht ladbar → Demo Fallback aktiv';
    } else {
      throw err;
    }
  }

  const tasks = requestedMode === 'live' ? normalizeLiveTasks(tasksRaw) : tasksRaw.map(t => ({ ...t, _source: 'demo' }));
  const erp = requestedMode === 'live' ? normalizeLiveErp(erpRaw) : erpRaw;
  const crm = requestedMode === 'live' ? normalizeLiveCrm(crmRaw) : crmRaw;

  liveValidation = requestedMode === 'live'
    ? validateLiveBundle(tasks, erp, crm)
    : { valid: false, errors: ['Nicht im Live-Modus'] };

  if (requestedMode === 'live' && !liveValidation.valid) {
    const demo = DATA_SOURCES.demo;
    const [demoTasks, demoErp, demoCrm] = await Promise.all([loadJson(demo.tasks), loadJson(demo.erp), loadJson(demo.crm)]);

    allTasks = demoTasks.map(t => ({ ...t, _source: 'demo' }));
    erpData = demoErp;
    runtimeMode = 'demo';
    fallbackReason = `Live validation failed → Demo Fallback (${liveValidation.errors.length} Fehler)`;

    renderCommercial(kpis, allTasks);
    renderKpis(kpis);
    initTaskFilter(allTasks);
    renderTasks(allTasks);
    renderDecisionPanel(allTasks);
    renderBlockerSla(allTasks);
    renderBlockerResolution(allTasks);
    renderAgents(allTasks);
    renderAgentKpis(agentKpis);
    evaluateDataTrust(kpis, allTasks, demoErp, demoCrm);

    renderErpAlerts(demoErp.alerts);
    initInventoryFilters();
    renderInventory();
    renderPoBoard(demoErp.purchaseOrders);
    renderCrm(demoCrm);
    renderFreshness(kpis, allTasks, demoErp, demoCrm);
    initTabs();
    setModeBadge(runtimeMode, fallbackReason);
    return;
  }

  runtimeMode = requestedMode;
  allTasks = tasks;
  erpData = erp;

  renderCommercial(kpis, tasks);
  renderKpis(kpis);
  initTaskFilter(tasks);
  renderTasks(tasks);
  renderDecisionPanel(tasks);
  renderBlockerSla(tasks);
  renderBlockerResolution(tasks);
  renderAgents(tasks);
  renderAgentKpis(agentKpis);
  evaluateDataTrust(kpis, tasks, erp, crm);

  renderErpAlerts(erp.alerts || []);
  initInventoryFilters();
  renderInventory();
  renderPoBoard(erp.purchaseOrders || []);

  renderCrm(crm);
  renderFreshness(kpis, tasks, erp, crm);
  initTabs();
  setModeBadge(runtimeMode, fallbackReason || (runtimeMode === 'live' ? 'Live validation: OK' : 'Demo mode')); 
}

boot().catch(err => {
  document.body.innerHTML += `<p style="color:#f87171;padding:12px">Fehler beim Laden der Daten: ${String(err)}</p>`;
});