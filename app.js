const KPI_URL = './data/mission_control_kpis_6.json';
const TASK_URL = './data/mission_control_demo_tasks_10.json';
const ERP_URL = './data/erp_fixtures.json';
const CRM_URL = './data/crm_fixtures.json';
const AGENT_KPI_URL = './data/agent_kpis_office.json';

const kpiCards = document.getElementById('kpiCards');
const commercialCards = document.getElementById('commercialCards');
const taskRows = document.getElementById('taskRows');
const riskList = document.getElementById('riskList');
const statusFilter = document.getElementById('statusFilter');
const agentCards = document.getElementById('agentCards');
const agentKpiCards = document.getElementById('agentKpiCards');

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

const badge = (txt) => `<span class="badge ${txt}">${String(txt).toUpperCase()}</span>`;

const AGENTS = [
  { name: 'Michael Scott', role: 'CEO Office' },
  { name: 'Dwight Schrute', role: 'COO' },
  { name: 'Oscar Martinez', role: 'CFO' },
  { name: 'Kelly Kapoor', role: 'CMO' },
  { name: 'Jim Halpert', role: 'CRO/CRM' },
  { name: 'Pam Beesly', role: 'Head of Content' },
  { name: 'Toby Flenderson', role: 'Compliance' },
];

function riskScore(task){
  const impactScore = { hoch: 3, mittel: 2, niedrig: 1 };
  const probabilityScore = { hoch: 3, mittel: 2, niedrig: 1 };
  const priorityScore = { kritisch: 4, hoch: 3, mittel: 2, niedrig: 1 };
  const blocked = task.blocker?.ist_blockiert ? 6 : 0;
  return blocked + (impactScore[task.risiko?.impact] || 0) + (probabilityScore[task.risiko?.wahrscheinlichkeit] || 0) + (priorityScore[task.prioritaet] || 0);
}

function renderCommercial(kpis, tasks){
  const active = tasks.filter(t => ['in_progress','todo','review','blocked'].includes(t.status)).length;
  const blocked = tasks.filter(t => t.blocker?.ist_blockiert).length;
  const critical = tasks.filter(t => t.prioritaet === 'kritisch' && t.status !== 'done').length;
  const impact = (kpis.find(k => String(k.kpi_id).includes('KPI-06'))?.ist_wert) || 0;

  const items = [
    { label:'Aktive Tasks', value: active },
    { label:'Blocker offen', value: blocked },
    { label:'Kritische Tasks offen', value: critical },
    { label:'Business Impact', value: `${impact} EUR` },
  ];

  commercialCards.innerHTML = items.map(i => `<div class="card"><div class="kpi-name">${i.label}</div><div class="kpi-value">${i.value}</div></div>`).join('');
}

function renderKpis(kpis){
  kpiCards.innerHTML = kpis.map(k => `<div class="card">
    <div class="kpi-name">${k.name}</div>
    <div class="kpi-value">${k.ist_wert} <small>${k.einheit}</small></div>
    ${badge(k.ampel)}
    <div class="meta">Ziel: ${k.zielwert} | Owner: ${k.owner}</div>
  </div>`).join('');
}

function renderTasks(tasks){
  taskRows.innerHTML = tasks.map(t => `<tr>
    <td>${t.id}</td><td>${t.titel}</td><td>${t.status}</td><td>${t.prioritaet}</td><td>${t.owner?.name || ''}</td><td>${t.due_date || ''}</td>
  </tr>`).join('');

  const risks = tasks.filter(t => t.risiko?.offen || t.blocker?.ist_blockiert).sort((a,b) => riskScore(b)-riskScore(a)).slice(0,5);
  riskList.innerHTML = risks.map(r => `<li><b>${r.id}</b> – ${r.titel}${r.blocker?.ist_blockiert ? ' 🚫 BLOCKED' : ''} (Impact: ${r.risiko?.impact || 'n/a'})</li>`).join('') || '<li>Keine akuten Risiken.</li>';
}

function mapTaskToAgent(task){
  const t = task.titel.toLowerCase();
  if (t.includes('kpi') || t.includes('report')) return 'Oscar Martinez';
  if (t.includes('risiko') || t.includes('compliance')) return 'Toby Flenderson';
  if (t.includes('capacity') || t.includes('schema') || t.includes('tower')) return 'Dwight Schrute';
  if (t.includes('executive') || t.includes('one-pager')) return 'Michael Scott';
  if (t.includes('daily') || t.includes('agenda')) return 'Jim Halpert';
  return 'Pam Beesly';
}

function renderAgents(tasks){
  const active = tasks.filter(t => ['in_progress','todo','review','blocked'].includes(t.status));
  const byAgent = {};
  active.forEach(t => {
    const a = mapTaskToAgent(t);
    if(!byAgent[a]) byAgent[a] = [];
    byAgent[a].push(t);
  });

  agentCards.innerHTML = AGENTS.map(a => {
    const list = (byAgent[a.name] || []).slice(0,2);
    const content = list.length
      ? list.map(t => `<div class="agent-task">• ${t.titel} <span class="agent-role">(${t.status})</span></div>`).join('')
      : '<div class="agent-task">• Kein aktiver Task</div>';
    return `<article class="agent-card"><h3>${a.name}</h3><div class="agent-role">${a.role}</div>${content}</article>`;
  }).join('');
}

function renderAgentKpis(agentKpis){
  agentKpiCards.innerHTML = agentKpis.map(item => {
    const kpiRows = item.kpis.map(kpi => `
      <div class="kpi-row">
        <span>${kpi.name}</span>
        <strong>${kpi.value}</strong>
        ${badge(kpi.status)}
      </div>
    `).join('');

    return `<article class="agent-card">
      <h3>${item.role}</h3>
      <div class="agent-role">${item.agent}</div>
      ${kpiRows}
    </article>`;
  }).join('');
}

function renderErpAlerts(alerts){
  erpAlertCards.innerHTML = alerts.map(a => `<div class="card">
    <div class="kpi-name">${a.title}</div>
    <div class="kpi-value">${badge(a.severity)}</div>
    <div class="meta">${a.description}</div>
  </div>`).join('');
}

function renderInventory(status = 'all'){
  const rows = status === 'all'
    ? erpData.inventory
    : erpData.inventory.filter(i => i.status === status);

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

function initInventoryFilters(){
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

function renderPoBoard(poItems){
  const statuses = ['awaiting_approval', 'ordered', 'in_transit', 'received', 'on_hold'];
  poBoard.innerHTML = statuses.map(status => {
    const items = poItems.filter(po => po.status === status);
    return `<div class="board-col">
      <h3>${status.replaceAll('_', ' ')}</h3>
      ${items.length ? items.map(i => `<div class="board-item"><b>${i.po}</b><div>${i.supplier}</div><div>${i.sku} · Qty ${i.qty}</div><small>ETA ${i.eta}</small></div>`).join('') : '<div class="board-item muted">Keine Einträge</div>'}
    </div>`;
  }).join('');
}

function renderCrm(crm){
  const totalLeads = crm.pipeline.reduce((sum, p) => sum + p.count, 0);
  const won = crm.pipeline.find(s => s.stage === 'won')?.count || 0;
  const proposal = crm.pipeline.find(s => s.stage === 'proposal')?.count || 0;
  const contacted = crm.pipeline.find(s => s.stage === 'contacted')?.count || 1;

  const metrics = [
    { label: 'Total Pipeline Leads', value: totalLeads },
    { label: 'Contacted → Proposal', value: `${Math.round((proposal / contacted) * 100)}%` },
    { label: 'Proposal → Won', value: `${Math.round((won / Math.max(proposal, 1)) * 100)}%` },
    { label: 'Top Funnel Value', value: `${crm.pipeline[0].value.toLocaleString('de-DE')} EUR` },
  ];

  crmMetricCards.innerHTML = metrics.map(m => `<div class="card"><div class="kpi-name">${m.label}</div><div class="kpi-value">${m.value}</div></div>`).join('');

  crmPipeline.innerHTML = crm.pipeline.map(stage => `<div class="board-col">
    <h3>${stage.stage}</h3>
    <div class="board-item">
      <div><b>${stage.count}</b> Leads</div>
      <div>${stage.value.toLocaleString('de-DE')} EUR</div>
    </div>
  </div>`).join('');

  nextActionsList.innerHTML = crm.nextActionsToday.map(a => `<li><b>${a.time}</b> · ${a.task} <span class="agent-role">(${a.owner}, ${a.priority})</span></li>`).join('');

  topOpportunities.innerHTML = crm.topOpportunities.map(o => `<div class="board-item">
    <b>${o.account}</b>
    <div>${o.stage} · ${o.owner}</div>
    <div>${o.value.toLocaleString('de-DE')} EUR · ${o.probability}%</div>
  </div>`).join('');
}

function initTaskFilter(tasks){
  const statuses = [...new Set(tasks.map(t => t.status))];
  statuses.forEach(s => {
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
  });
}

function initTabs(){
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });
}

Promise.all([
  fetch(KPI_URL).then(r => r.json()),
  fetch(TASK_URL).then(r => r.json()),
  fetch(ERP_URL).then(r => r.json()),
  fetch(CRM_URL).then(r => r.json()),
  fetch(AGENT_KPI_URL).then(r => r.json())
])
  .then(([kpis, tasks, erp, crm, agentKpis]) => {
    allTasks = tasks;
    erpData = erp;

    renderCommercial(kpis, tasks);
    renderKpis(kpis);
    initTaskFilter(tasks);
    renderTasks(tasks);
    renderAgents(tasks);
    renderAgentKpis(agentKpis);

    renderErpAlerts(erp.alerts);
    initInventoryFilters();
    renderInventory();
    renderPoBoard(erp.purchaseOrders);

    renderCrm(crm);
    initTabs();
  })
  .catch(err => {
    document.body.innerHTML += `<p style="color:#f87171;padding:12px">Fehler beim Laden der Daten: ${err}</p>`;
  });
