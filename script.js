// ===== HELPERS =====
function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}

// ===== REACTIONS =====
const REACTIONS = {
veryBad:{emoji:'😠',text:'To je vážně špatné!',sub:'Musíš se mnohem víc snažit.'},
bad:{emoji:'🙁',text:'No, neoslovilo mě to...',sub:'Zkus to znovu a líp.'},
medium:{emoji:'😐',text:'Tak napůl...',sub:'Může to být lepší.'},
good:{emoji:'🙂',text:'Dobrá práce!',sub:'Jdeš správným směrem.'},
veryGood:{emoji:'😊',text:'Výborně! Perfektní!',sub:'Takhle se to dělá!'}
};
const R_CORRECT = [
{emoji:'😊',text:'Správně! Paráda!',sub:'Tohle ti jde!'},
{emoji:'🙂',text:'Ano, správně!',sub:'Dobře počítáš.'},
{emoji:'😊',text:'Přesně tak!',sub:'Jednička s hvězdičkou!'},
{emoji:'🙂',text:'Výborný výpočet!',sub:'Na to jsi přišel rychle.'}
];
const R_WRONG = [
{emoji:'😠',text:'Špatně!',sub:'Zkus dávat větší pozor.'},
{emoji:'🙁',text:'Bohužel ne...',sub:'Správná odpověď je uvedená.'},
{emoji:'😐',text:'Trefa vedle.',sub:'Zkus to příště líp.'},
{emoji:'🙁',text:'Nesprávně.',sub:'Nevadí, příště to dáš.'}
];

// ===== QUESTION GENERATORS =====
const generators = {};

// ---- HRUBÁ MZDA ----
generators.hruba_mzda = [
function(){
let rate=rand(100,220)*5;
let h=rand(16,23);
let ans=rate*h*8;
return {q:`Pan/paní Novák odpracoval ${h} dní s hodinovou sazbou ${rate} Kč (8h denně). Vypočítej hrubou mzdu.`,f:[{l:`Hrubá mzda (sazba × dny × 8h)`,a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let rate=rand(120,240)*5;
let h=rand(80,180);
let ans=rate*h;
return {q:`Hodinová sazba ${rate} Kč, odpracováno ${h} hodin. Vypočítej hrubou mzdu.`,f:[{l:`Hrubá mzda (sazba × hodiny)`,a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let sal=rand(250,600)*100;
let d=rand(10,22);
let td=rand(22,23);
let ans=Math.round(sal/td*d);
return {q:`Měsíční mzda ${sal} Kč. Odpracováno ${d} dní z ${td}. Vypočítej hrubou mzdu.`,f:[{l:`Hrubá mzda (měsíční / ${td} × ${d})`,a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let sal=rand(300,700)*100;
let bp=rand(5,25);
let b=Math.round(sal*bp/100);
let ans=sal+b;
return {q:`Základní mzda ${sal} Kč, prémie ${bp} % (${b} Kč). Vypočítej hrubou mzdu.`,f:[{l:`Hrubá mzda (základ + prémie)`,a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let rate=rand(130,260)*5;
let h=rand(80,160);
let oh=rand(5,20);
let zakl=rate*h;
let prip=Math.round(rate*oh*0.25);
let ans=zakl+rate*oh+prip;
return {q:`Odpracováno ${h} hodin + ${oh} hodin přesčasů. Sazba ${rate} Kč/h, přesčas +25 %.`,f:[{l:`Mzda bez přesčasů (sazba × ${h}h)`,a:zakl,u:'Kč'},{l:`Příplatek za přesčas (+25 % z ${rate} Kč × ${oh}h)`,a:prip,u:'Kč'},{l:`Hrubá mzda celkem`,a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let rate=rand(120,200)*5;
let h=rand(80,160);
let oh=rand(5,18);
let zakl=rate*h;
let pres=rate*oh;
let prip=Math.round(rate*oh*0.25);
let ans=zakl+pres+prip;
return {q:`Sazba ${rate} Kč/h, ${h} řádných hodin, ${oh} přesčasových (+25 %).`,f:[{l:`Mzda za řádnou práci (${rate} × ${h})`,a:zakl,u:'Kč'},{l:`Přesčasy + 25 % (${rate} × ${oh} × 1,25)`,a:pres+prip,u:'Kč'},{l:`Hrubá mzda celkem`,a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let rate=rand(140,280)*5;
let std=rand(140,160);
let ov=rand(5,15);
let bon=rand(2000,8000);
let zakl=rate*std;
let pres=rate*ov;
let prip=Math.round(rate*ov*0.25);
let ans=zakl+pres+prip+bon;
return {q:`Sazba ${rate} Kč/h, ${std} hodin, ${ov} hodin přesčas (+25 %), odměna ${bon} Kč.`,f:[{l:`Řádná mzda (${rate} × ${std})`,a:zakl,u:'Kč'},{l:`Přesčasy vč. +25 % (${rate} × ${ov} × 1,25)`,a:pres+prip,u:'Kč'},{l:`Odměna`,a:bon,u:'Kč'},{l:`Hrubá mzda celkem`,a:ans,u:'Kč'}],c:'hruba_mzda'};
}
];

// ---- ČISTÁ MZDA ----
generators.cista_mzda = [
function(){
let g=rand(250,550)*100;
let soc=Math.round(g*0.071);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Hrubá mzda ${g} Kč. Vypočítej čistou mzdu.\nSP 7,1 %, ZP 4,5 %, daň 15 %, sleva 2 570 Kč.`,f:[{l:`SP (7,1 % z hrubé)`,a:soc,u:'Kč'},{l:`ZP (4,5 % z hrubé)`,a:zdr,u:'Kč'},{l:`Daň (15 % z hrubé − 2570 sleva)`,a:d,u:'Kč'},{l:`Čistá mzda (hrubá − SP − ZP − daň)`,a:c,u:'Kč'}],c:'cista_mzda'};
},
function(){
let g=rand(200,400)*100;
let soc=Math.round(g*0.071);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Hrubá mzda ${g} Kč. Vypočítej čistou mzdu.\nSP 7,1 %, ZP 4,5 %, daň 15 %, sleva 2 570 Kč.`,f:[{l:`SP (7,1 % z hrubé)`,a:soc,u:'Kč'},{l:`ZP (4,5 % z hrubé)`,a:zdr,u:'Kč'},{l:`Daň (15 % z hrubé − 2570 sleva)`,a:d,u:'Kč'},{l:`Čistá mzda (hrubá − SP − ZP − daň)`,a:c,u:'Kč'}],c:'cista_mzda'};
},
function(){
let g=rand(280,600)*100;
let soc=Math.round(g*0.071);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Hrubá mzda ${g} Kč. Vypočítej čistou mzdu.\nSP 7,1 %, ZP 4,5 %, daň 15 %, sleva 2 570 Kč.`,f:[{l:`SP (7,1 % z hrubé)`,a:soc,u:'Kč'},{l:`ZP (4,5 % z hrubé)`,a:zdr,u:'Kč'},{l:`Daň (15 % z hrubé − 2570 sleva)`,a:d,u:'Kč'},{l:`Čistá mzda (hrubá − SP − ZP − daň)`,a:c,u:'Kč'}],c:'cista_mzda'};
}
];

// ---- ČÁSTKA K VÝPLATĚ ----
generators.castka_k_vyplate = [
function(){
let g=rand(250,550)*100;
let soc=Math.round(g*0.071);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
let ss=soc+zdr+d;
return {q:`Hrubá mzda ${g} Kč.\nVypočítej všechny srážky a částku k výplatě.`,f:[{l:`SP (7,1 % z hrubé)`,a:soc,u:'Kč'},{l:`ZP (4,5 % z hrubé)`,a:zdr,u:'Kč'},{l:`Daň (15 % − 2570)`,a:d,u:'Kč'},{l:`Částka k výplatě (hrubá − srážky)`,a:c,u:'Kč'}],c:'castka_k_vyplate'};
},
function(){
let g=rand(300,500)*100;
let soc=Math.round(g*0.071);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Hrubá mzda ${g} Kč. Vypočítej, kolik dostane zaměstnanec na účet.`,f:[{l:`SP (7,1 % z hrubé)`,a:soc,u:'Kč'},{l:`ZP (4,5 % z hrubé)`,a:zdr,u:'Kč'},{l:`Daň (15 % − 2570)`,a:d,u:'Kč'},{l:`Částka k výplatě`,a:c,u:'Kč'}],c:'castka_k_vyplate'};
},
function(){
let g=rand(200,450)*100;
let soc=Math.round(g*0.071);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
let ss=soc+zdr+d;
return {q:`Hrubá mzda ${g} Kč.\nVypočítej srážky (SP, ZP, daň) a výslednou částku.`,f:[{l:`SP (7,1 % z hrubé)`,a:soc,u:'Kč'},{l:`ZP (4,5 % z hrubé)`,a:zdr,u:'Kč'},{l:`Daň (15 % − 2570)`,a:d,u:'Kč'},{l:`Částka k výplatě (hrubá − ${soc+zdr+d})`,a:c,u:'Kč'}],c:'castka_k_vyplate'};
}
];

// ---- DOVOLENÁ ----
generators.dovolena = [
function(){
let m=rand(250,600)*100;
let dn=rand(10,20);
let ans=Math.round(m/22*dn);
return {q:`Mzda ${m} Kč/měsíc. ${dn} dní dovolené (22 dní/měsíc). Náhrada?`,f:[{l:`Náhrada (mzda / 22 × ${dn})`,a:ans,u:'Kč'}],c:'dovolena'};
},
function(){
let d=rand(5,20);
let h=rand(130,220);
let ans=d*8*h;
return {q:`${d} dní dovolené, hodinová sazba ${h} Kč (8h denně). Náhrada?`,f:[{l:`Náhrada (${d} × 8 × ${h})`,a:ans,u:'Kč'}],c:'dovolena'};
},
function(){
let hod=rand(150,250);
let h=rand(140,170);
let g=hod*h;
let d=rand(3,10);
let ans=Math.round(g/22*d);
return {q:`Hrubá mzda ${g} Kč/měsíc. ${d} dny dovolené. Náhrada?`,f:[{l:`Náhrada (hrubá / 22 × ${d})`,a:ans,u:'Kč'}],c:'dovolena'};
}
];

// ---- NEMOCENSKÁ ----
generators.nemocenska = [
function(){
let g=rand(250,500)*100;
let dvz=Math.round(g/22);
let ans=Math.round(dvz*0.6*5);
return {q:`Hrubá mzda ${g} Kč/měs. 5 dní nemoc. DVZ = hrubá/22. Nemoc = 60 % DVZ × dny.`,f:[{l:`DVZ (hrubá / 22)`,a:dvz,u:'Kč'},{l:`Nemocenská (60 % × DVZ × 5 dní)`,a:ans,u:'Kč'}],c:'nemocenska'};
},
function(){
let g=rand(300,600)*100;
let d=rand(3,10);
let dvz=Math.round(g/22);
let ans=Math.round(dvz*0.6*d);
return {q:`Hrubá mzda ${g} Kč/měs. ${d} dní nemoci. Vypočítej nemocenskou.`,f:[{l:`DVZ (hrubá / 22)`,a:dvz,u:'Kč'},{l:`Nemocenská (60 % × DVZ × ${d})`,a:ans,u:'Kč'}],c:'nemocenska'};
},
function(){
let g=rand(200,450)*100;
let d=rand(5,14);
let dvz=Math.round(g/22);
let ans=Math.round(dvz*0.6*d);
return {q:`Mzda ${g} Kč, ${d} dní PN. DVZ = hrubá/22, nemoc = 60 % DVZ × dny.`,f:[{l:`DVZ (hrubá / 22)`,a:dvz,u:'Kč'},{l:`Nemocenská (60 % × DVZ × ${d})`,a:ans,u:'Kč'}],c:'nemocenska'};
}
];

// ---- STÍŽENÉ PRACOVNÍ PODMÍNKY ----
generators.stizene_podminky = [
function(){
let hod=rand(130,250);
let h=rand(140,180);
let g=hod*h;
let p=rand(5,15);
let ans=Math.round(g*p/100);
return {q:`Sazba ${hod} Kč/h, ${h} hodin, příplatek ${p} %. Vypočítej příplatek.`,f:[{l:`Hrubá mzda (základ, bez příplatku)`,a:g,u:'Kč'},{l:`Příplatek (${p} % z hrubé mzdy)`,a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let g=rand(300,600)*100;
let p=rand(8,18);
let ans=Math.round(g*p/100);
return {q:`Hrubá mzda ${g} Kč, příplatek ${p} % za rizikové pracoviště. Příplatek?`,f:[{l:`Příplatek (${p} % z hrubé mzdy)`,a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let g=rand(200,450)*100;
let p1=rand(5,10);
let p2=rand(5,10);
let ans=Math.round(g*(p1+p2)/100);
return {q:`Hrubá mzda ${g} Kč. Příplatek ${p1} % (hluk) + ${p2} % (prašnost). Celkový příplatek?`,f:[{l:`Příplatek za hluk (${p1} % z ${g})`,a:Math.round(g*p1/100),u:'Kč'},{l:`Příplatek za prašnost (${p2} % z ${g})`,a:Math.round(g*p2/100),u:'Kč'},{l:`Příplatek celkem`,a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let hod=rand(130,250);
let h=rand(140,180);
let g=hod*h;
let p=rand(10,25);
let ans=Math.round(g*p/100);
return {q:`Sazba ${hod} Kč/h, ${h} hodin, příplatek ${p} % za ztížené podmínky.`,f:[{l:`Hrubá mzda (základ, bez příplatku)`,a:g,u:'Kč'},{l:`Příplatek (${p} % z hrubé)`,a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let g=rand(250,550)*100;
let p=rand(5,15);
let ans=Math.round(g*p/100);
return {q:`Hrubá mzda ${g} Kč. Práce ve výškách - příplatek ${p} %. Kolik navíc?`,f:[{l:`Příplatek (${p} % z ${g})`,a:ans,u:'Kč'}],c:'stizene_podminky'};
}
];

// ===== STATE =====
let state = {
questions:[], index:0, score:0, total:0,
timeLimit:300, timeLeft:300, timerId:null, active:false,
results:[], currentQuestion:null
};

// ===== DOM REFS =====
const $=id=>document.getElementById(id);
const welcomeScreen=$('welcomeScreen');
const gameScreen=$('gameScreen');
const resultScreen=$('resultScreen');
const allBtn=document.querySelector('.all-btn');
const catBtns=document.querySelectorAll('.cat-btn:not(.all-btn)');
const timeBtns=document.querySelectorAll('.time-btn');
const startBtn=$('startBtn');
const restartBtn=$('restartBtn');
const backBtn=$('backMenuBtn');
const scoreDisplay=$('scoreDisplay');
const timerDisplay=$('timerDisplay');
const progressFill=$('progressFill');
const reactionEmoji=$('reactionEmoji');
const reactionText=$('reactionText');
const reactionSub=$('reactionSub');
const questionBox=$('questionBox');
const fieldsContainer=$('fieldsContainer');
const submitBtn=$('submitBtn');
const answerFeedback=$('answerFeedback');
const resultEmoji=$('resultEmoji');
const resultTitle=$('resultTitle');
const resultSub=$('resultSub');
const statScore=$('statScore');
const statTotal=$('statTotal');
const statPercent=$('statPercent');
const detailList=$('detailList');

// ===== CATEGORY UI =====
allBtn.addEventListener('click',()=>{
if(!allBtn.classList.contains('selected')){
allBtn.classList.add('selected');
catBtns.forEach(b=>b.classList.add('selected'));
}else{
allBtn.classList.remove('selected');
catBtns.forEach(b=>b.classList.remove('selected'));
}
});
catBtns.forEach(btn=>{
btn.addEventListener('click',()=>{
btn.classList.toggle('selected');
});
});
timeBtns.forEach(btn=>{
btn.addEventListener('click',()=>{
timeBtns.forEach(b=>b.classList.remove('selected'));
btn.classList.add('selected');
});
});
const countBtns=document.querySelectorAll('.count-btn');
countBtns.forEach(btn=>{
btn.addEventListener('click',()=>{
countBtns.forEach(b=>b.classList.remove('selected'));
btn.classList.add('selected');
});
});

// ===== SCREENS =====
function showWelcome(){
welcomeScreen.classList.add('active');
gameScreen.classList.remove('active');
resultScreen.classList.remove('active');
$('calcBox').classList.remove('visible');
}
function showGame(){
welcomeScreen.classList.remove('active');
gameScreen.classList.add('active');
resultScreen.classList.remove('active');
$('calcBox').classList.add('visible');
}

// ===== TEACHER REACTION =====
function setTeacherReaction(r){
reactionEmoji.textContent=r.emoji;
reactionText.textContent=r.text;
reactionSub.textContent=r.sub;
}

// ===== BUILD QUESTION POOL =====
function buildQuestionPool(){
const selected=[...catBtns].filter(b=>b.classList.contains('selected')).map(b=>b.dataset.cat);
let pool=[];
selected.forEach(cat=>{
if(generators[cat]) pool=pool.concat(generators[cat]);
});
pool.sort(()=>Math.random()-.5);
return pool;
}

// ===== RENDER QUESTION =====
function renderQuestion(){
const gen=state.questions[state.index];
if(!gen){alert('Chyba: otázka nenalezena.');return;}
const q=gen();
state.currentQuestion=q;
questionBox.textContent=q.q;
fieldsContainer.innerHTML='';
q.f.forEach((f,i)=>{
const row=document.createElement('div');
row.className='field-row';
const lbl=document.createElement('label');
lbl.textContent=f.l+':';
const inp=document.createElement('input');
inp.type='text';inp.inputMode='decimal';inp.dataset.idx=i;
inp.addEventListener('keydown',e=>{
if(e.key==='Enter'&&!submitBtn.disabled) checkAnswer();
});
const unit=document.createElement('span');
unit.className='field-unit';
unit.textContent=f.u;
const chk=document.createElement('span');
chk.className='field-check';
row.append(lbl,inp,unit,chk);
fieldsContainer.appendChild(row);
});
if(q.f.length>0) fieldsContainer.querySelector('input').focus();
submitBtn.disabled=false;
answerFeedback.textContent='';
answerFeedback.className='answer-feedback';
}

// ===== CHECK ANSWER =====
function checkAnswer(){
if(!state.active||submitBtn.disabled) return;
const q=state.currentQuestion;
const inputs=fieldsContainer.querySelectorAll('input');
let empty=false;
inputs.forEach(inp=>{if(!inp.value.trim())empty=true});
if(empty){answerFeedback.textContent='✏️ Nejprve vyplň všechna políčka!';answerFeedback.className='answer-feedback wrong';return;}
let allCorrect=true;
inputs.forEach((inp,i)=>{
const val=parseFloat(inp.value.replace(',','.'));
const correct=Math.abs(val-q.f[i].a)<.01;
const chk=inp.parentElement.querySelector('.field-check');
const unit=inp.parentElement.querySelector('.field-unit');
if(correct){
inp.className='correct';
chk.textContent='✅';
}else{
inp.className='wrong';
chk.textContent='❌';
const correctLabel=q.f[i].a+''+(unit?unit.textContent:'');
inp.placeholder='Správně: '+correctLabel;
allCorrect=false;
}
});
submitBtn.disabled=true;
state.answered++;
if(allCorrect) state.score++;
const reaction=allCorrect?pick(R_CORRECT):pick(R_WRONG);
setTeacherReaction(reaction);
answerFeedback.textContent=allCorrect?'✅ Správně!':'❌ '+q.f.map((f,i)=>{
const val=parseFloat(inputs[i].value.replace(',','.'));
const ok=Math.abs(val-f.a)<.01;
return ok?'✓ '+f.l+' = '+f.a:'✗ '+f.l+' = '+f.a+' (tvůj: '+inputs[i].value+')';
}).join('; ');
answerFeedback.className='answer-feedback '+(allCorrect?'correct':'wrong');
state.results.push({q:q.q,correct:allCorrect});
const pct=Math.round(state.answered/state.total*100);
progressFill.style.width=pct+'%';
scoreDisplay.textContent=state.score+'/'+state.total;
if(state.index+1<state.questions.length){
setTimeout(()=>{
state.index++;
renderQuestion();
},1500);
}else{
setTimeout(showResults,1500);
}
}

// ===== SHOW RESULTS =====
function showResults(){
state.active=false;
if(state.timerId){clearInterval(state.timerId);state.timerId=null;}
$('calcBox').classList.remove('visible');
welcomeScreen.classList.remove('active');
gameScreen.classList.remove('active');
resultScreen.classList.add('active');
const pct=state.total>0?Math.round(state.score/state.total*100):0;
statScore.textContent=state.score;
statTotal.textContent=state.total;
statPercent.textContent=pct+'%';
let r;
if(pct>=90) r=REACTIONS.veryGood;
else if(pct>=75) r=REACTIONS.good;
else if(pct>=50) r=REACTIONS.medium;
else if(pct>=25) r=REACTIONS.bad;
else r=REACTIONS.veryBad;
resultEmoji.textContent=r.emoji;
resultTitle.textContent=r.text;
resultSub.textContent=r.sub+' ('+pct+'% úspěšnost)';
detailList.innerHTML='';
state.results.forEach(r=>{
let d=document.createElement('div');
d.className='detail-item '+(r.correct?'result-correct':'result-wrong');
d.innerHTML='<span class="detail-icon">'+(r.correct?'✅':'❌')+'</span><span class="detail-q">'+r.q+'</span>';
detailList.appendChild(d);
});
}

// ===== TIMER =====
function startTimer(){
state.timerId=setInterval(()=>{
state.timeLeft--;
const m=String(Math.floor(state.timeLeft/60)).padStart(2,'0');
const s=String(state.timeLeft%60).padStart(2,'0');
timerDisplay.textContent=m+':'+s;
if(state.timeLeft<=10) timerDisplay.classList.add('warning');
if(state.timeLeft<=0){
clearInterval(state.timerId);
state.timerId=null;
state.active=false;
showResults();
}
},1000);
}

// ===== INIT GAME =====
function initGame(){
const selected=[...catBtns].filter(b=>b.classList.contains('selected')).map(b=>b.dataset.cat);
if(selected.length===0){
startBtn.classList.add('shake');
setTimeout(()=>startBtn.classList.remove('shake'),600);
return;
}
const tb=document.querySelector('.time-btn.selected');
state.timeLimit=parseInt(tb.dataset.time);
state.timeLeft=state.timeLimit;
state.score=0; state.index=0; state.answered=0;
state.active=true; state.results=[];
const cb=document.querySelector('.count-btn.selected');
const maxCount=parseInt(cb.dataset.count);
state.questions=buildQuestionPool();
if(state.questions.length===0){alert('Nepodařilo se vygenerovat otázky.');return;}
if(state.questions.length>maxCount) state.questions.length=maxCount;
state.total=state.questions.length;
showGame();
setTeacherReaction({emoji:'😊',text:'Hodně štěstí!',sub:'Začínáme! Vyplň všechna políčka.'});
scoreDisplay.textContent='0/'+state.questions.length;
if(state.timeLimit>0){
startTimer();
}else{
timerDisplay.textContent='♾️';
}
renderQuestion();
$('notesInput').value='';
}

// ===== BACK TO MENU =====
function backToMenu(){
if(state.active){
if(!confirm('Hra ještě neskončila. Opravdu chceš zpět do menu? Průběh se ztratí.')) return;
state.active=false;
if(state.timerId){clearInterval(state.timerId);state.timerId=null;}
}
showWelcome();
}

// ===== EVENT LISTENERS =====
startBtn.addEventListener('click',initGame);
restartBtn.addEventListener('click',showWelcome);
backBtn.addEventListener('click',backToMenu);
submitBtn.addEventListener('click',checkAnswer);
document.addEventListener('keydown',e=>{
if(e.key==='Enter'&&gameScreen.classList.contains('active')&&!submitBtn.disabled)
checkAnswer();
});

// ===== CALCULATOR =====
(function(){
const display=$('calcDisplay');
let a='',op='',b='',reset=false;
document.querySelectorAll('.calc-btn').forEach(btn=>{
btn.addEventListener('click',()=>{
const val=btn.dataset.calc;
if(val==='C'){a='';op='';b='';display.textContent='0';reset=false;return;}
if(val==='←'){
if(b){b=b.slice(0,-1);display.textContent=b||'0';}
else if(op){op='';display.textContent=a||'0';}
else{a=a.slice(0,-1);display.textContent=a||'0';}
return;
}
if(val==='='){
if(!a||!op||!b) return;
const ca=parseFloat(a),cb=parseFloat(b);
let r;
switch(op){
case'+':r=ca+cb;break;
case'-':r=ca-cb;break;
case'*':r=ca*cb;break;
case'/':r=cb!==0?ca/cb:'Chyba';break;
}
if(r==='Chyba'){display.textContent='Dělení nulou!';a='';op='';b='';reset=false;return;}
r=Math.round(r*100)/100;
display.textContent=r;
a=String(r);op='';b='';reset=true;
return;
}
if(['+','-','*','/'].includes(val)){
if(a&&op&&b){
const ca=parseFloat(a),cb=parseFloat(b);
let r;
switch(op){
case'+':r=ca+cb;break;
case'-':r=ca-cb;break;
case'*':r=ca*cb;break;
case'/':r=cb!==0?ca/cb:'Chyba';break;
}
if(r==='Chyba'){display.textContent='Dělení nulou!';a='';op='';b='';return;}
r=Math.round(r*100)/100;
a=String(r);b='';
}
op=val;
display.textContent=a+' '+op;
reset=false;
return;
}
if(val==='.'){
if(reset||(!op&&!a)){a='0.';display.textContent=a;reset=false;return;}
if(!op&&a){if(!a.includes('.'))a+='.';display.textContent=a;return;}
if(op&&!b){b='0.';display.textContent=a+' '+op+' '+b;return;}
if(op&&b){if(!b.includes('.'))b+='.';display.textContent=a+' '+op+' '+b;return;}
return;
}
if(reset){a='';b='';op='';reset=false;}
if(!op){a+=val;display.textContent=a;}
else{b+=val;display.textContent=a+' '+op+' '+b;}
});
});
})();

// ===== START =====
showWelcome();