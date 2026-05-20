const fs = require('fs');

const CSS = `
    .spending-add input{flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:7px 10px;color:#fff;font-size:0.78rem;outline:none}
    .spending-add select{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:7px 8px;color:#fff;font-size:0.75rem;outline:none}
    .spending-add select option{background:var(--night)}
    .spending-log{margin-top:10px;display:flex;flex-direction:column;gap:5px;max-height:150px;overflow-y:auto}
    .spending-entry{display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:rgba(255,255,255,0.05);border-radius:8px;font-size:0.75rem}
    .spending-entry.income{border-left:3px solid #667eea}
    .spending-entry.expense{border-left:3px solid var(--pink-glow)}
    .spending-entry-name{color:rgba(255,255,255,0.7)}.spending-entry-amount{font-weight:600}
    .study-list{display:flex;flex-direction:column;gap:8px}
    .study-item{display:flex;align-items:center;gap:10px;padding:8px;background:rgba(255,255,255,0.05);border-radius:10px}
    .study-item input[type=checkbox]{width:16px;height:16px;accent-color:var(--pink-glow)}
    .study-item span{flex:1;font-size:0.82rem}
    .study-item.done span{text-decoration:line-through;opacity:0.4}
    .priority-dot{width:8px;height:8px;border-radius:50%}
    .priority-high{background:#ff6b6b}.priority-mid{background:#ffd93d}.priority-low{background:#6bcb77}
    .study-add{display:flex;gap:6px;margin-top:10px}
    .study-add input{flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:7px 10px;color:#fff;font-size:0.78rem;outline:none}
    .read-list{display:flex;flex-direction:column;gap:10px}
    .read-item{padding:10px;background:rgba(255,255,255,0.05);border-radius:10px}
    .read-item-name{font-size:0.85rem;font-weight:600;margin-bottom:4px}
    .read-item-why{font-size:0.72rem;color:var(--pink-soft);font-style:italic}
    .read-add{display:flex;flex-direction:column;gap:6px;margin-top:10px}
    .read-add input{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:7px 10px;color:#fff;font-size:0.78rem;outline:none}
    .read-add input::placeholder{color:rgba(255,255,255,0.3)}
    .analytics-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .analytic-card{background:rgba(255,255,255,0.05);border-radius:12px;padding:12px;text-align:center}
    .analytic-value{font-size:1.4rem;font-weight:700;font-family:'Bricolage Grotesque',sans-serif;color:var(--pink-soft)}
    .analytic-label{font-size:0.68rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.5px;margin-top:2px}
    .section-label{font-size:0.72rem;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.3);margin:20px 0 10px 0;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:6px}
    .today-btn{display:inline-block;padding:6px 16px;background:var(--pink-glow);border-radius:99px;font-size:0.75rem;font-weight:600;cursor:pointer;border:none;color:#fff;transition:opacity 0.2s}
    .today-btn:hover{opacity:0.85}
  </style>
</head>
<body>
<div class="header">
  <h1>✨ Sofia ✨</h1>
  <p>Your beautiful year tracker</p>
  <div class="day-counter">Day <span id="dayOfYear">—</span> / 365 — <span id="glowPct">0</span>% glow</div>
</div>

<div class="kpi-strip" id="kpiStrip"></div>

<div class="year-section">
  <div class="year-header">
    <h2 style="font-size:1.1rem">2026</h2>
    <span class="today-btn" onclick="goToToday()">Today</span>
  </div>
  <div class="weekday-labels" id="weekdayLabels"></div>
  <div class="year-grid" id="yearGrid"></div>
</div>

<div id="widgets"></div>

<script>
const DEFAULT_FOODS=[
  {n:"matcha latte",k:120},{n:"oat milk",k:80},{n:"greek yogurt",k:100},
  {n:"berries",k:50},{n:"granola",k:200},{n:"eggs (2)",k:140},
  {n:"avocado",k:160},{n:"salmon",k:280},{n:"chicken",k:230},
  {n:"rice (cup)",k:200},{n:"sweet potato",k:110},{n:"dark chocolate",k:170}
];
const MOVEMENT_TYPES=["pilates","yoga","gym","walk","run","cardio","dance","stretch","rest"];
const CATEGORIES=["self-care","food/café","outfits","pilates/gym","subscriptions","travel","other"];
const SYMPTOMS=["cramps","bloating","headache","tender","moody","acne","cravings"];
const PHASES={5:"Menstrual",13:"Follicular",16:"Ovulation"};
const MOODS=["😊","😐","😴","✨"];

let store={};
let selectedDate=new Date();
let routineItems=[];

function key(d){const m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");return 'sofia_'+d.getFullYear()+'-'+m+'-'+day;}
function today(){const t=new Date();return new Date(t.getFullYear(),t.getMonth(),t.getDate());}

function load(){const raw=localStorage.getItem("sofia_store");if(raw)store=JSON.parse(raw);const r=localStorage.getItem("sofia_routine");if(r)routineItems=JSON.parse(r);}
function save(){localStorage.setItem("sofia_store",JSON.stringify(store));localStorage.setItem("sofia_routine",JSON.stringify(routineItems));}

function getDayOfYear(d){const s=new Date(d.getFullYear(),0,0);return Math.floor((d.getTime()-s.getTime())/864e5);}
function isLeapYear(y){return y%4===0&&(y%100!==0||y%400===0);}

function getDay(d){const k=key(d);if(!store[k])store[k]={};return store[k];}
function setDay(d,patch){const k=key(d);if(!store[k])store[k]={};store[k]={...store[k],...patch};save();renderWidgets();renderKPI();renderYear();}

function getCurrentDayData(){return getDay(selectedDate);}

function hasData(k){if(!store[k])return 0;const d=store[k];const fields=[d.routine&&d.routine.length,d.affirmation,d.wins&&d.wins.smile,d.wins&&d.wins.win,d.wins&&d.wins.love,d.nourish&&d.nourish.water,d.nourish&&d.nourish.food&&d.nourish.food.length,d.movement&&d.movement.type,d.sleep&&d.sleep.hours,d.cycle&&d.cycle.day,d.walk&&d.walk.steps,d.spending&&d.spending.entries&&d.spending.entries.length,d.study&&d.study.tasks&&d.study.tasks.length,d.read&&d.read.items&&d.read.items.length];return fields.filter(Boolean).length;}

function renderKPI(){
  const d=getCurrentDayData();
  const cycDay=d.cycle&&d.cycle.day||1;
  const sleepH=d.sleep&&d.sleep.hours||0;
  const spend=d.spending&&d.spending.entries||[];
  const net=spend.reduce(function(s,e){return e.type==="expense"?s-e.amount:s+e.amount;},0);
  const t=getDayOfYear(today());
  document.getElementById("dayOfYear").textContent=t;
  document.getElementById("glowPct").textContent=Math.round(t/365*100);
  document.getElementById("kpiStrip").innerHTML='<div class="kpi-card"><div class="kpi-icon">🔥</div><div class="kpi-value">—</div><div class="kpi-label">Routine Streak</div></div><div class="kpi-card"><div class="kpi-icon">💃</div><div class="kpi-value">—</div><div class="kpi-label">Movement (week)</div></div><div class="kpi-card"><div class="kpi-icon">🌸</div><div class="kpi-value">'+cycDay+'</div><div class="kpi-label">Cycle Day</div></div><div class="kpi-card"><div class="kpi-icon">🌙</div><div class="kpi-value">'+(sleepH||"—")+'</div><div class="kpi-label">Sleep hrs</div></div><div class="kpi-card"><div class="kpi-icon">💰</div><div class="kpi-value">'+(net!==0?"$"+Math.abs(net):"—")+'</div><div class="kpi-label">Net Spending</div></div>';
}

function renderYear(){
  var year=2026,start=new Date(year,0,1),end=new Date(year,11,31);
  var dow=["S","M","T","W","T","F","S"];
  document.getElementById("weekdayLabels").innerHTML=dow.map(function(d){return '<div class="weekday-label">'+d+'</div>';}).join("");
  var weeks=[];var week=[];for(var i=0;i<start.getDay();i++)week.push(null);
  var cur=new Date(start);while(cur<=end){week.push(new Date(cur));if(week.length===7){weeks.push(week);week=[];}cur.setDate(cur.getDate()+1);}
  if(week.length){while(week.length<7)week.push(null);weeks.push(week);}
  var t=today();
  var sel=selectedDate;
  var html="";
  weeks.forEach(function(wk,wi){wk.forEach(function(day,di){
    if(!day){html+='<div class="day-cell empty"></div>';return;}
    var k=key(day);
    var has=hasData(k);
    var isT=day.getTime()===t.getTime();
    var isS=day.toDateString()===sel.toDateString();
    var cls="day-cell ";
    if(has>=6)cls+="day-full";else if(has>=3)cls+="day-partial";else cls+="day-empty";
    if(isT)cls+=" day-today";
    if(isS)cls+=" day-selected";
    html+='<div class="'+cls.trim()+'" data-date="'+day.toISOString()+'" onclick="selectDay(\\''+day.toISOString()+'\\')"></div>';
  });});
  document.getElementById("yearGrid").innerHTML=html;
}

function selectDay(iso){selectedDate=new Date(iso);renderWidgets();renderKPI();renderYear();}
function goToToday(){selectedDate=today();renderWidgets();renderKPI();renderYear();}

function widgetHTML(d){
  return ' \
    <div class="section-label">Daily Core</div>\
    <div class="widgets-grid">'+
      renderRoutine(d)+renderAffirmation(d)+renderWins(d)+
    '</div>\
    <div class="section-label">Body</div>\
    <div class="widgets-grid">'+
      renderNourish(d)+renderMovement(d)+renderSleep(d)+
    '</div>\
    <div class="section-label">Rhythm</div>\
    <div class="widgets-grid">'+
      renderCycle(d)+renderWalk(d)+renderSpending(d)+
    '</div>\
    <div class="section-label">Mind</div>\
    <div class="widgets-grid">'+
      renderStudy(d)+renderRead(d)+
    '</div>\
    <div class="section-label">Overview</div>\
    <div class="widgets-grid">'+
      renderAnalytics(d)+
    '</div>';
}

function renderRoutine(d){
  var items=d.routine||routineItems||[];
  var done=items.filter(function(i){return i&&i.indexOf('done:')!==0;}).length;
  var pct=items.length?Math.round(done/items.length*100):0;
  var html='<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Routine</div>';
  html+='<div class="progress-bar"><div class="progress-fill" style="width:'+pct+'%"></div></div>';
  html+='<div class="routine-list">';
  items.forEach(function(item,i){var checked=item&&item.indexOf('done:')===0?'checked':'';var label=item?(item.replace('done:','')):'';html+='<label class="routine-item'+(!item||item.indexOf('done:')===0?' done':'')+'"><input type="checkbox" '+checked+' onclick="toggleRoutine('+i+')"><span>'+label+'</span></label>';});
  html+='</div><div class="routine-add"><input id="routineInput" placeholder="Add item..." onkeydown="if(event.key===\\"Enter\\")addRoutine()"><button class="btn" onclick="addRoutine()">Add</button></div></div>';
  return html;
}

function addRoutine(){
  var inp=document.getElementById("routineInput");
  var v=inp.value.trim();
  if(!v)return;
  routineItems.push(v);
  setDay(selectedDate,{routine:routineItems});
}

function toggleRoutine(i){
  var items=routineItems.slice();
  var cur=items[i]||'';
  items[i]=cur.indexOf('done:')===0?cur.replace('done:',''):'done:'+cur;
  routineItems=items;
  setDay(selectedDate,{routine:routineItems});
}

function renderAffirmation(d){
  return '<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Affirmation</div>'+
    (d.affirmation?'<p class="affirmation-text" onclick="editAffirmation()">'+d.affirmation+'</p>':'<input class="affirmation-input" placeholder="I am..." onblur="saveAffirmation(this.value)" autofocus>')+
    '</div>';
}
function saveAffirmation(v){setDay(selectedDate,{affirmation:v});}

function renderWins(d){
  var w=d.wins||{};
  return '<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Wins & Gratitude</div>'+
    '<div class="wins-field"><label>😊 What made you smile?</label><input value="'+(w.smile||'')+'" onchange="saveWins(\\'smile\\',this.value)"></div>'+
    '<div class="wins-field"><label>🏆 Today\\'s win</label><input value="'+(w.win||'')+'" onchange="saveWins(\\'win\\',this.value)"></div>'+
    '<div class="wins-field"><label>❤️ Gratitude</label><input value="'+(w.love||'')+'" onchange="saveWins(\\'love\\',this.value)"></div>'+
    '</div>';
}
function saveWins(k,v){var d=getCurrentDayData();if(!d.wins)d.wins={};d.wins[k]=v;setDay(selectedDate,{wins:d.wins});}

function renderNourish(d){
  var n=d.nourish||{water:0,food:[]};
  var kcal=n.food.reduce(function(s,f){return s+(f.k||0);},0);
  var html='<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Nourish</div>';
  html+='<div class="water-glasses">';
  for(var i=0;i<8;i++){html+='<span class="water-glass'+(i<n.water?' filled':'')+'" onclick="setWater('+(i+1)+')">🍶</span>';}
  html+='<span class="water-count">'+n.water+'/8</span></div>';
  html+='<div class="food-log">';
  n.food.forEach(function(f){html+='<div class="food-item"><span class="food-item-name">'+f.n+'</span><span class="food-item-kcal">'+(f.g||100)+'g · '