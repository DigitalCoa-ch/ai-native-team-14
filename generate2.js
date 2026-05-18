+f.k+'kcal</span></div>';});
  html+='</div><div class="energy-total"><span>Today\'s energy</span><span>'+kcal+' kcal</span></div>';
  html+='<div class="food-quick-add">';
  DEFAULT_FOODS.slice(0,6).forEach(function(f){html+='<span class="food-tag" onclick="addFood(\''+f.n+'\','+f.k+')">'+f.n+'</span>';});
  html+='</div></div>';
  return html;
}

function setWater(w){var d=getCurrentDayData();setDay(selectedDate,{nourish:{water:w,food:d.nourish&&d.nourish.food||[]}});}
function addFood(n,k){var d=getCurrentDayData();var f=(d.nourish&&d.nourish.food)||[];f.push({n:n,k:k,g:100});setDay(selectedDate,{nourish:{water:(d.nourish&&d.nourish.water)||0,food:f}});}

function renderMovement(d){
  var m=d.movement||{};
  var html='<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Movement</div>';
  html+='<div class="movement-types">';
  MOVEMENT_TYPES.forEach(function(t){html+='<button class="movement-type-btn'+(m.type===t?' active':'')+'" onclick="setMovement(\\''+t+'\\')">'+t+'</button>';});
  html+='</div>';
  html+='<div class="movement-details"><input type="number" placeholder="Duration (min)" value="'+(m.duration||'')+'" onchange="setMovementDur(this.value)"><select onchange="setMovementInt(this.value)"><option value="">Intensity</option><option value="gentle"'+(m.intensity==='gentle'?' selected':'')+'>gentle</option><option value="medium"'+(m.intensity==='medium'?' selected':'')+'>medium</option><option value="strong"'+(m.intensity==='strong'?' selected':'')+'>strong</option></select></div>';
  html+='</div>';
  return html;
}
function setMovement(t){var d=getCurrentDayData();setDay(selectedDate,{movement:{type:t,duration:(d.movement&&d.movement.duration)||0,intensity:(d.movement&&d.movement.intensity)||'',notes:(d.movement&&d.movement.notes)||''}});}
function setMovementDur(v){var d=getCurrentDayData();var m=d.movement||{};setDay(selectedDate,{movement:{type:m.type||'',duration:parseInt(v)||0,intensity:m.intensity||'',notes:m.notes||''}});}
function setMovementInt(v){var d=getCurrentDayData();var m=d.movement||{};setDay(selectedDate,{movement:{type:m.type||'',duration:m.duration||0,intensity:v,notes:m.notes||''}});}

function renderSleep(d){
  var s=d.sleep||{};
  var html='<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Sleep</div>';
  html+='<div class="sleep-row"><input type="number" step="0.5" placeholder="Hours" value="'+(s.hours||'')+'" onchange="setSleepH(this.value)"><label>hours</label></div>';
  html+='<div class="stars">';
  for(var i=1;i<=5;i++){html+='<span class="star'+(i<=(s.quality||0)?' filled':'')+'" onclick="setSleepQ('+i+')">★</span>';}
  html+='</div>';
  html+='<div class="wake-mood">';
  ['😴','😐','😊','✨'].forEach(function(m){html+='<span class="wake-mood-btn'+(s.mood===m?' active':'')+'" onclick="setSleepM(\''+m+'\')">'+m+'</span>';});
  html+='</div></div>';
  return html;
}
function setSleepH(v){var d=getCurrentDayData();var s=d.sleep||{};setDay(selectedDate,{sleep:{hours:parseFloat(v)||0,quality:s.quality||0,mood:s.mood||''}});}
function setSleepQ(v){var d=getCurrentDayData();var s=d.sleep||{};setDay(selectedDate,{sleep:{hours:s.hours||0,quality:parseInt(v),mood:s.mood||''}});}
function setSleepM(v){var d=getCurrentDayData();var s=d.sleep||{};setDay(selectedDate,{sleep:{hours:s.hours||0,quality:s.quality||0,mood:v}});}

function renderCycle(d){
  var c=d.cycle||{};
  var phase=c.day?(c.day<=5?'Menstrual':c.day<=13?'Follicular':c.day<=16?'Ovulation':'Luteal'):'—';
  var html='<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Cycle</div>';
  html+='<div class="cycle-phase">'+phase+'</div>';
  html+='<div class="cycle-input-row"><input type="number" min="1" max="40" placeholder="Day" value="'+(c.day||'')+'" onchange="setCycleDay(this.value)"></div>';
  html+='<div class="cycle-emoji-row">';
  ['😊','😔','😤','😴'].forEach(function(m){html+='<span class="cycle-emoji-btn'+(c.mood===m?' active':'')+'" onclick="setCycleM(\''+m+'\')">'+m+'</span>';});
  html+='</div>';
  html+='<div class="cycle-symptoms">';
  SYMPTOMS.forEach(function(s){html+='<span class="symptom-btn'+(c.symptoms&&c.symptoms.indexOf(s)!==-1?' active':'')+'" onclick="toggleSymptom(\''+s+'\')">'+s+'</span>';});
  html+='</div></div>';
  return html;
}
function setCycleDay(v){var d=getCurrentDayData();var c=d.cycle||{};setDay(selectedDate,{cycle:{day:parseInt(v)||0,mood:c.mood||'',energy:c.energy||'',symptoms:c.symptoms||[]}});}
function setCycleM(v){var d=getCurrentDayData();var c=d.cycle||{};setDay(selectedDate,{cycle:{day:c.day||0,mood:v,energy:c.energy||'',symptoms:c.symptoms||[]}});}
function toggleSymptom(s){var d=getCurrentDayData();var c=d.cycle||{day:0,mood:'',energy:'',symptoms:[]};var sym=c.symptoms||[];var idx=sym.indexOf(s);if(idx===-1)sym.push(s);else sym.splice(idx,1);setDay(selectedDate,{cycle:{day:c.day||0,mood:c.mood||'',energy:c.energy||'',symptoms:sym}});}

function renderWalk(d){
  var w=d.walk||{};
  return '<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Hot Girl Walk</div>'+
    '<div class="walk-big-number">'+(w.steps||0)+'</div><div class="walk-big-number-label">steps today</div>'+
    '<div class="walk-row" style="margin-top:12px"><input type="number" placeholder="Steps" value="'+(w.steps||'')+'" onchange="setWalkS(this.value)"><label>steps</label></div>'+
    '<div class="walk-row"><input type="number" placeholder="Minutes" value="'+(w.minutes||'')+'" onchange="setWalkM(this.value)"><label>outdoor mins</label></div>'+
    '<textarea class="walk-notes" rows="2" placeholder="Notes..." onchange="setWalkN(this.value)">'+(w.notes||'')+'</textarea>'+
    '</div>';
}
function setWalkS(v){var d=getCurrentDayData();var w=d.walk||{};setDay(selectedDate,{walk:{steps:parseInt(v)||0,minutes:w.minutes||0,notes:w.notes||''}});}
function setWalkM(v){var d=getCurrentDayData();var w=d.walk||{};setDay(selectedDate,{walk:{steps:w.steps||0,minutes:parseInt(v)||0,notes:w.notes||''}});}
function setWalkN(v){var d=getCurrentDayData();var w=d.walk||{};setDay(selectedDate,{walk:{steps:w.steps||0,minutes:w.minutes||0,notes:v}});}

function renderSpending(d){
  var s=d.spending||{entries:[]};
  var income=s.entries.reduce(function(t,e){return e.type==='income'?t+e.amount:t;},0);
  var spend=s.entries.reduce(function(t,e){return e.type==='expense'?t+e.amount:t;},0);
  var net=income-spend;
  var html='<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Spending</div>';
  html+='<div class="spending-summary"><div class="spending-col"><div class="spending-col-value" style="color:#667eea">$'+(income||0)+'</div><div class="spending-col-label">Income</div></div><div class="spending-col"><div class="spending-col-value" style="color:var(--pink-glow)">$'+(spend||0)+'</div><div class="spending-col-label">Spending</div></div><div class="spending-col"><div class="spending-col-value">'+(net>=0?'+$':'-$')+Math.abs(net)+'</div><div class="spending-col-label">Net</div></div></div>';
  html+='<div class="spending-add"><input id="spAmt" type="number" placeholder="Amount"><select id="spCat"><option value="expense">− expense</option><option value="income">+ income</option>';
  CATEGORIES.forEach(function(c){html+='<option value="'+c+'">'+c+'</option>';});
  html+='</select><button class="btn" onclick="addSpending()">+</button></div>';
  html+='<div class="spending-log">';
  s.entries.slice().reverse().forEach(function(e){html+='<div class="spending-entry '+e.type+'"><span class="spending-entry-name">'+e.category+'</span><span class="spending-entry-amount">'+(e.type==='income'?'+$':'-$')+e.amount+'</span></div>';});
  html+='</div></div>';
  return html;
}
function addSpending(){var amt=parseFloat(document.getElementById('spAmt').value);var cat=document.getElementById('spCat').value;if(!amt)return;var d=getCurrentDayData();var s=d.spending||{entries:[]};s.entries.push({amount:amt,category:cat,type:cat==='income'?'income':'expense'});setDay(selectedDate,{spending:s});}

function renderStudy(d){
  var t=d.study||{};
  var tasks=t.tasks||[];
  var html='<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Study</div>';
  html+='<div class="study-list">';
  tasks.forEach(function(task,i){html+='<div class="study-item'+(task.done?' done':'')+'"><input type="checkbox"'+(task.done?' checked':'')+' onclick="toggleStudy('+i+')"><span>'+task.text+'</span><span class="priority-dot priority-'+(task.priority||'low')+'"></span></div>';});
  html+='</div>';
  html+='<div class="study-add"><input id="studyInput" placeholder="Add task..." onkeydown="if(event.key===\\"Enter\\")addStudy()"><button class="btn" onclick="addStudy()">Add</button></div>';
  html+='</div>';
  return html;
}
function addStudy(){var inp=document.getElementById("studyInput");var v=inp.value.trim();if(!v)return;var d=getCurrentDayData();var t=d.study||{};var tasks=t.tasks||[];tasks.push({text:v,done:false,priority:'low'});setDay(selectedDate,{study:{tasks:tasks}});}
function toggleStudy(i){var d=getCurrentDayData();var t=d.study||{};var tasks=(t.tasks||[]).slice();tasks[i]={...tasks[i],done:!tasks[i].done};setDay(selectedDate,{study:{tasks:tasks}});}

function renderRead(d){
  var r=d.read||{};
  var items=r.items||[];
  var html='<div class="widget glass"><div class="pink-dot"></div><div class="widget-title">Read & Watch</div>';
  html+='<div class="read-list">';
  items.forEach(function(item){html+='<div class="read-item"><div class="read-item-name">'+item.name+'</div><div class="read-item-why">→ '+item.why+'</div></div>';});
  html+='</div>';
  html+='<div class="read-add"><input id="readName" placeholder="Book / podcast / show..."><input id="readWhy" placeholder="Why are you spending time on this?" onkeydown="if(event.key===\\"Enter\\")addRead()"><button class="btn" onclick="addRead()">Add</button></div>';
  html+='</div>';
  return html;
}
function addRead(){var n=document.getElementById('readName').value.trim();var w=document.getElementById('readWhy').value.trim();if(!n)return;var d=getCurrentDayData();var r=d.read||{};var items=r.items||[];items.push({name:n,why:w||'no reason set'});setDay(selectedDate,{read:{items:items}});document.getElementById('readName').value='';document.getElementById('readWhy').value='';}

function renderAnalytics(d){
  var totalMove=Object.keys(store).filter(function(k){return store[k]&&store[k].movement&&store[k].movement.type;}).length;
  var totalSleep=Object.values(store).filter(function(v){return v&&v.sleep&&v.sleep.hours;});
  var avgSleep=totalSleep.length?Math.round(totalSleep.reduce(function(s,v){return s+v.sleep.hours;},0)/totalSleep.length*10)/10:0;
  var totalSteps=Object.values(store).reduce(function(s,v){return s+((v&&v.walk&&v.walk.steps)||0);},0);
  var totalTasks=Object.values(store).reduce(function(s,v){return s+((v&&v.study&&v.study.tasks&&v.study.tasks.filter(function(t){return t.done;}).length)||0);},0);
  var html='<div class="widget glass" style="grid-column:span 2"><div class="pink-dot"></div><div class="widget-title">Year Glow-Up</div>';
  html+='<div class="analytics-grid">';
  html+='<div class="analytic-card"><div class="analytic-value">'+totalMove+'</div><div class="analytic-label">Movement Days</div></div>';
  html+='<div class="analytic-card"><div class="analytic-value">'+avgSleep+'h</div><div class="analytic-label">Avg Sleep</div></div>';
  html+='<div class="analytic-card"><div class="analytic-value">'+(totalSteps/1000).toFixed(1)+'k</div><div class="analytic-label">Total Steps</div></div>';
  html+='<div class="analytic-card"><div class="analytic-value">'+totalTasks+'</div><div class="analytic-label">Tasks Done</div></div>';
  html+='</div></div>';
  return html;
}

function renderWidgets(){
  var d=getCurrentDayData();
  document.getElementById("widgets").innerHTML=widgetHTML(d);
}

load();
renderKPI();
renderYear();
renderWidgets();
</script>
</body>
</html>
`;

fs.writeFileSync('index.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sofia — Year Tracker 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root{--pink-glow:#FF6B9D;--pink-soft:#F4C2C2;--pink-deep:#E8A0A0;--sage:#B5C8B7;--night:#1a1a2e;--glass:rgba(255,255,255,0.25)}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'DM Sans',system-ui,sans-serif;background:linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 50%,#16213e 100%);min-height:100vh;color:#fff;padding:20px}
    h1,h2,h3{font-family:'Bricolage Grotesque',system-ui,sans-serif}
    .glass{background:var(--glass);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.4);border-radius:20px;box-shadow