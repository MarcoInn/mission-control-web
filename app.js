const KPI_URL = './data/mission_control_kpis_6.json';
const TASK_URL = './data/mission_control_demo_tasks_10.json';

const kpiCards = document.getElementById('kpiCards');
const taskRows = document.getElementById('taskRows');
const riskList = document.getElementById('riskList');
const statusFilter = document.getElementById('statusFilter');

let allTasks = [];

const badge = (txt) => `<span class="badge ${txt}">${txt.toUpperCase()}</span>`;

function renderKpis(kpis){
  kpiCards.innerHTML = kpis.map(k=>`<div class="card">
    <div class="kpi-name">${k.name}</div>
    <div class="kpi-value">${k.ist_wert} <small>${k.einheit}</small></div>
    ${badge(k.ampel)}
    <div style="font-size:12px;color:#94a3b8;margin-top:6px">Ziel: ${k.zielwert} | Owner: ${k.owner}</div>
  </div>`).join('');
}

function riskScore(task){
  const impactScore = { hoch: 3, mittel: 2, niedrig: 1 };
  const probabilityScore = { hoch: 3, mittel: 2, niedrig: 1 };
  const priorityScore = { kritisch: 4, hoch: 3, mittel: 2, niedrig: 1 };

  const blocked = task.blocker?.ist_blockiert ? 6 : 0;
  const impact = impactScore[task.risiko?.impact] || 0;
  const probability = probabilityScore[task.risiko?.wahrscheinlichkeit] || 0;
  const priority = priorityScore[task.prioritaet] || 0;

  return blocked + impact + probability + priority;
}

function renderTasks(tasks){
  taskRows.innerHTML = tasks.map(t=>`<tr>
    <td>${t.id}</td><td>${t.titel}</td><td>${t.status}</td><td>${t.prioritaet}</td><td>${t.owner?.name||''}</td><td>${t.due_date||''}</td>
  </tr>`).join('');

  const risks = tasks
    .filter(t => t.risiko?.offen || t.blocker?.ist_blockiert)
    .sort((a,b) => riskScore(b) - riskScore(a))
    .slice(0,5);

  riskList.innerHTML = risks.map(r=>{
    const blockerTag = r.blocker?.ist_blockiert ? ' 🚫 BLOCKED' : '';
    return `<li><b>${r.id}</b> – ${r.titel}${blockerTag} (Impact: ${r.risiko?.impact||'n/a'}, W'keit: ${r.risiko?.wahrscheinlichkeit||'n/a'})</li>`;
  }).join('') || '<li>Keine akuten Risiken.</li>';
}

function initFilter(tasks){
  const statuses = [...new Set(tasks.map(t=>t.status))];
  statuses.forEach(s=>{
    const o=document.createElement('option');o.value=s;o.textContent=s;statusFilter.appendChild(o);
  });
  statusFilter.addEventListener('change',()=>{
    const v=statusFilter.value;
    renderTasks(v==='all'?allTasks:allTasks.filter(t=>t.status===v));
  });
}

Promise.all([fetch(KPI_URL).then(r=>r.json()), fetch(TASK_URL).then(r=>r.json())])
  .then(([kpis,tasks])=>{
    allTasks = tasks;
    renderKpis(kpis);
    initFilter(tasks);
    renderTasks(tasks);
  })
  .catch(err=>{
    document.body.innerHTML += `<p style="color:#f87171;padding:12px">Fehler beim Laden der Daten: ${err}</p>`;
  });