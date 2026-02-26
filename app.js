const KPI_URL = './data/mission_control_kpis_6.json';
const TASK_URL = './data/mission_control_demo_tasks_10.json';

const kpiCards = document.getElementById('kpiCards');
const commercialCards = document.getElementById('commercialCards');
const taskRows = document.getElementById('taskRows');
const riskList = document.getElementById('riskList');
const statusFilter = document.getElementById('statusFilter');
const agentCards = document.getElementById('agentCards');

let allTasks = [];
let allKpis = [];

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
  const impact = (kpis.find(k=>String(k.kpi_id).includes('KPI-06'))?.ist_wert) || 0;

  const items = [
    { label:'Aktive Tasks', value: active },
    { label:'Blocker offen', value: blocked },
    { label:'Kritische Tasks offen', value: critical },
    { label:'Business Impact', value: `${impact} EUR` },
  ];

  commercialCards.innerHTML = items.map(i => `<div class="card"><div class="kpi-name">${i.label}</div><div class="kpi-value">${i.value}</div></div>`).join('');
}

function renderKpis(kpis){
  kpiCards.innerHTML = kpis.map(k=>`<div class="card">
    <div class="kpi-name">${k.name}</div>
    <div class="kpi-value">${k.ist_wert} <small>${k.einheit}</small></div>
    ${badge(k.ampel)}
    <div style="font-size:12px;color:#94a3b8;margin-top:6px">Ziel: ${k.zielwert} | Owner: ${k.owner}</div>
  </div>`).join('');
}

function renderTasks(tasks){
  taskRows.innerHTML = tasks.map(t=>`<tr>
    <td>${t.id}</td><td>${t.titel}</td><td>${t.status}</td><td>${t.prioritaet}</td><td>${t.owner?.name||''}</td><td>${t.due_date||''}</td>
  </tr>`).join('');

  const risks = tasks.filter(t => t.risiko?.offen || t.blocker?.ist_blockiert).sort((a,b) => riskScore(b)-riskScore(a)).slice(0,5);
  riskList.innerHTML = risks.map(r=>`<li><b>${r.id}</b> – ${r.titel}${r.blocker?.ist_blockiert?' 🚫 BLOCKED':''} (Impact: ${r.risiko?.impact||'n/a'})</li>`).join('') || '<li>Keine akuten Risiken.</li>';
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
  active.forEach(t=>{
    const a = mapTaskToAgent(t);
    if(!byAgent[a]) byAgent[a]=[];
    byAgent[a].push(t);
  });

  agentCards.innerHTML = AGENTS.map(a=>{
    const list = (byAgent[a.name] || []).slice(0,2);
    const content = list.length
      ? list.map(t=>`<div class="agent-task">• ${t.titel} <span class="agent-role">(${t.status})</span></div>`).join('')
      : '<div class="agent-task">• Kein aktiver Task</div>';
    return `<article class="agent-card"><h3>${a.name}</h3><div class="agent-role">${a.role}</div>${content}</article>`;
  }).join('');
}

function initFilter(tasks){
  const statuses = [...new Set(tasks.map(t=>t.status))];
  statuses.forEach(s=>{ const o=document.createElement('option'); o.value=s; o.textContent=s; statusFilter.appendChild(o); });
  statusFilter.addEventListener('change',()=>{
    const v=statusFilter.value;
    const filtered = v==='all'?allTasks:allTasks.filter(t=>t.status===v);
    renderTasks(filtered);
    renderAgents(filtered);
  });
}

function initTabs(){
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });
}

Promise.all([fetch(KPI_URL).then(r=>r.json()), fetch(TASK_URL).then(r=>r.json())])
  .then(([kpis,tasks])=>{
    allKpis = kpis;
    allTasks = tasks;
    renderCommercial(kpis, tasks);
    renderKpis(kpis);
    initFilter(tasks);
    renderTasks(tasks);
    renderAgents(tasks);
    initTabs();
  })
  .catch(err=>{
    document.body.innerHTML += `<p style="color:#f87171;padding:12px">Fehler beim Laden der Daten: ${err}</p>`;
  });