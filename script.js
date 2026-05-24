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
return {q:`Pan/paní Novák odpracoval ${h} dní s hodinovou sazbou ${rate} Kč (8h denně). Vypočítej hrubou mzdu.`,f:[{l:'Hrubá mzda',a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let rate=rand(120,240)*5;
let h=rand(80,180);
let ans=rate*h;
return {q:`Hodinová sazba ${rate} Kč, odpracováno ${h} hodin. Vypočítej hrubou mzdu.`,f:[{l:'Hrubá mzda',a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let sal=rand(250,600)*100;
let d=rand(10,22);
let td=rand(22,23);
let ans=Math.round(sal/td*d);
return {q:`Měsíční mzda ${sal} Kč. Odpracováno ${d} dní z ${td}. Vypočítej hrubou mzdu.`,f:[{l:'Hrubá mzda',a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let sal=rand(300,700)*100;
let bp=rand(5,25);
let b=Math.round(sal*bp/100);
let ans=sal+b;
return {q:`Základní mzda ${sal} Kč, prémie ${bp} % (${b} Kč). Vypočítej hrubou mzdu.`,f:[{l:'Hrubá mzda',a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let rate=rand(130,260)*5;
let h=rand(80,160);
let oh=rand(5,20);
let zakl=rate*h;
let prip=Math.round(rate*oh*0.25);
let ans=zakl+rate*oh+prip;
return {q:`Odpracováno ${h} hodin + ${oh} hodin přesčasů. Sazba ${rate} Kč/h, přesčas +25 %.`,f:[{l:'Mzda bez přesčasů',a:zakl,u:'Kč'},{l:'Příplatek za přesčas (+25%)',a:prip,u:'Kč'},{l:'Hrubá mzda celkem',a:ans,u:'Kč'}],c:'hruba_mzda'};
},
function(){
let rate=rand(120,200)*5;
let h=rand(80,160);
let oh=rand(5,18);
let zakl=rate*h;
let pres=rate*oh;
let prip=Math.round(rate*oh*0.25);
let ans=zakl+pres+prip;
return {q:`Sazba ${rate} Kč/h, ${h} řádných hodin, ${oh} přesčasových (+25 %).`,f:[{l:'Mzda za řádnou práci',a:zakl,u:'Kč'},{l:'Mzda za přesčas + 25 %',a:pres+prip,u:'Kč'},{l:'Hrubá mzda celkem',a:ans,u:'Kč'}],c:'hruba_mzda'};
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
return {q:`Sazba ${rate} Kč/h, ${std} hodin, ${ov} hodin přesčas (+25 %), odměna ${bon} Kč.`,f:[{l:'Mzda za řádnou práci',a:zakl,u:'Kč'},{l:'Přesčasy vč. příplatku',a:pres+prip,u:'Kč'},{l:'Odměna',a:bon,u:'Kč'},{l:'Hrubá mzda celkem',a:ans,u:'Kč'}],c:'hruba_mzda'};
}
];

// ---- ČISTÁ MZDA ----
generators.cista_mzda = [
function(){
let g=rand(250,550)*100;
let soc=Math.round(g*0.065);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Hrubá mzda ${g} Kč. Vypočítej čistou mzdu.\nSP 6,5 %, ZP 4,5 %, daň 15 %, sleva 2 570 Kč.`,f:[{l:'Sociální pojištění (6,5 %)',a:soc,u:'Kč'},{l:'Zdravotní pojištění (4,5 %)',a:zdr,u:'Kč'},{l:'Daň po slevě (15 % - 2570)',a:d,u:'Kč'},{l:'Čistá mzda',a:c,u:'Kč'}],c:'cista_mzda'};
},
function(){
let g=rand(200,400)*100;
let soc=Math.round(g*0.065);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Hrubá mzda ${g} Kč. Vypočítej čistou mzdu.\nSP 6,5 %, ZP 4,5 %, daň 15 %, sleva 2 570 Kč.`,f:[{l:'Sociální pojištění (6,5 %)',a:soc,u:'Kč'},{l:'Zdravotní pojištění (4,5 %)',a:zdr,u:'Kč'},{l:'Daň po slevě (15 % - 2570)',a:d,u:'Kč'},{l:'Čistá mzda',a:c,u:'Kč'}],c:'cista_mzda'};
},
function(){
let g=rand(280,600)*100;
let soc=Math.round(g*0.065);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Hrubá mzda ${g} Kč. Vypočítej čistou mzdu.\nSP 6,5 %, ZP 4,5 %, daň 15 %, sleva 2 570 Kč.`,f:[{l:'Sociální pojištění (6,5 %)',a:soc,u:'Kč'},{l:'Zdravotní pojištění (4,5 %)',a:zdr,u:'Kč'},{l:'Daň po slevě (15 % - 2570)',a:d,u:'Kč'},{l:'Čistá mzda',a:c,u:'Kč'}],c:'cista_mzda'};
},
function(){
let g=rand(300,700)*100;
let sv=rand(1000,3000);
let soc=Math.round(g*0.065);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-sv; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Hrubá mzda ${g} Kč, sleva na dani ${sv} Kč. SP 6,5 %, ZP 4,5 %, daň 15 %.`,f:[{l:'Sociální pojištění (6,5 %)',a:soc,u:'Kč'},{l:'Zdravotní pojištění (4,5 %)',a:zdr,u:'Kč'},{l:'Daň po slevě (15 - '+sv+')',a:d,u:'Kč'},{l:'Čistá mzda',a:c,u:'Kč'}],c:'cista_mzda'};
},
function(){
let g=rand(220,450)*100;
let soc=Math.round(g*0.065);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
return {q:`Pan Malý má hrubou mzdu ${g} Kč. Vypočítej čistou mzdu (SP 6,5 %, ZP 4,5 %, daň 15 %, sleva 2 570).`,f:[{l:'Sociální pojištění',a:soc,u:'Kč'},{l:'Zdravotní pojištění',a:zdr,u:'Kč'},{l:'Daň po slevě',a:d,u:'Kč'},{l:'Čistá mzda',a:c,u:'Kč'}],c:'cista_mzda'};
}
];

// ---- ČÁSTKA K VÝPLATĚ ----
generators.castka_k_vyplate = [
function(){
let g=rand(250,500)*100;
let soc=Math.round(g*0.065);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
let za=rand(1000,5000);
let vys=c-za;
return {q:`Hrubá mzda ${g} Kč, záloha ${za} Kč. Vypočítej částku k výplatě.\nSP 6,5 %, ZP 4,5 %, daň 15 %, sleva 2 570 Kč.`,f:[{l:'Sociální pojištění',a:soc,u:'Kč'},{l:'Zdravotní pojištění',a:zdr,u:'Kč'},{l:'Daň po slevě',a:d,u:'Kč'},{l:'Čistá mzda',a:c,u:'Kč'},{l:'Záloha',a:za,u:'Kč'},{l:'Částka k výplatě',a:vys,u:'Kč'}],c:'castka_k_vyplate'};
},
function(){
let g=rand(220,480)*100;
let soc=Math.round(g*0.065);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
let str=rand(500,2000);
let puj=rand(1000,4000);
let sraz=str+puj;
let vys=c-sraz;
return {q:`Hrubá mzda ${g} Kč.\nSrážky: stravenky ${str} Kč, půjčka ${puj} Kč.\nVypočítej částku k výplatě.\n(SP 6,5 %, ZP 4,5 %, daň 15 %, sleva 2 570)`,f:[{l:'Sociální pojištění',a:soc,u:'Kč'},{l:'Zdravotní pojištění',a:zdr,u:'Kč'},{l:'Daň po slevě',a:d,u:'Kč'},{l:'Čistá mzda',a:c,u:'Kč'},{l:'Srážky celkem',a:sraz,u:'Kč'},{l:'Částka k výplatě',a:vys,u:'Kč'}],c:'castka_k_vyplate'};
},
function(){
let g=rand(280,520)*100;
let soc=Math.round(g*0.065);
let zdr=Math.round(g*0.045);
let d=Math.round(g*0.15)-2570; if(d<0)d=0;
let c=g-soc-zdr-d;
let sp=rand(1000,3000);
let poj=rand(300,1200);
let sraz=sp+poj;
let vys=c-sraz;
return {q:`Hrubá mzda ${g} Kč.\nSrážky: spoření ${sp} Kč, pojištění ${poj} Kč.\nVypočítej částku k výplatě.`,f:[{l:'Sociální pojištění',a:soc,u:'Kč'},{l:'Zdravotní pojištění',a:zdr,u:'Kč'},{l:'Daň po slevě',a:d,u:'Kč'},{l:'Čistá mzda',a:c,u:'Kč'},{l:'Srážky celkem',a:sraz,u:'Kč'},{l:'Částka k výplatě',a:vys,u:'Kč'}],c:'castka_k_vyplate'};
},
function(){
let c=rand(200,500)*100;
let ex=rand(2000,8000);
let vys=c-ex;
return {q:`Čistá mzda zaměstnance je ${c} Kč. Má exekuční srážku ${ex} Kč. Kolik dostane k výplatě?`,f:[{l:'Čistá mzda',a:c,u:'Kč'},{l:'Exekuční srážka',a:ex,u:'Kč'},{l:'Částka k výplatě',a:vys,u:'Kč'}],c:'castka_k_vyplate'};
}
];

// ---- DOVOLENÁ ----
generators.dovolena = [
function(){
let d=rand(800,2500);
let dni=rand(1,20);
let ans=d*dni;
return {q:`Průměrný denní výdělek ${d} Kč. Dovolená ${dni} dní. Vypočítej náhradu mzdy.`,f:[{l:'Náhrada mzdy',a:ans,u:'Kč'}],c:'dovolena'};
},
function(){
let h=rand(120,300);
let hod=rand(8,80);
let ans=h*hod;
return {q:`Průměrný hodinový výdělek ${h} Kč. Dovolená ${hod} hodin. Vypočítej náhradu.`,f:[{l:'Náhrada mzdy',a:ans,u:'Kč'}],c:'dovolena'};
},
function(){
let m=rand(300,600)*100;
let dd=Math.round(m/22);
let dni=rand(1,25);
let ans=dd*dni;
return {q:`Měsíční mzda ${m} Kč. Dovolená ${dni} dní. Prům. denní výdělek = ${m} / 22 = ${dd} Kč. Náhrada?`,f:[{l:'Náhrada mzdy',a:ans,u:'Kč'}],c:'dovolena'};
},
function(){
let h=rand(130,280);
let dni=rand(1,15);
let ans=h*dni*8;
return {q:`Průměrný hodinový výdělek ${h} Kč. Dovolená ${dni} dní (8h/den). Vypočítej náhradu.`,f:[{l:'Náhrada mzdy',a:ans,u:'Kč'}],c:'dovolena'};
},
function(){
let d=rand(900,2200);
let dni=rand(2,10);
let ms=rand(3,12);
let nar=Math.max(1,Math.round(dni/12*ms));
let ans=d*nar;
return {q:`Roční nárok ${dni} dní. Odpracováno ${ms} měsíců → nárok na ${nar} dní. Denní průměr ${d} Kč. Náhrada?`,f:[{l:'Náhrada mzdy',a:ans,u:'Kč'}],c:'dovolena'};
}
];

// ---- NEMOCENSKÁ ----
generators.nemocenska = [
function(){
let dvz=rand(800,2500);
let dni=rand(1,14);
let den=Math.round(dvz*0.6);
let ans=den*dni;
return {q:`DVZ ${dvz} Kč. Nemoc ${dni} dní (60 %). Vypočítej náhradu.`,f:[{l:'Denní náhrada (60 %)',a:den,u:'Kč'},{l:'Náhrada celkem',a:ans,u:'Kč'}],c:'nemocenska'};
},
function(){
let dvz=rand(900,2400);
let dni=rand(1,30);
let den=Math.round(dvz*0.6);
let ans=den*dni;
return {q:`DVZ ${dvz} Kč. Nemoc ${dni} dní. Náhrada 60 %. Vypočítej.`,f:[{l:'Denní náhrada (60 %)',a:den,u:'Kč'},{l:'Náhrada celkem',a:ans,u:'Kč'}],c:'nemocenska'};
},
function(){
let dvz=rand(700,2000);
let dni=rand(3,14);
let den=Math.round(dvz*0.6);
let ans=den*dni;
return {q:`Redukovaný DVZ ${dvz} Kč. Nemoc ${dni} dní, 60 %. Náhrada?`,f:[{l:'Denní náhrada (60 %)',a:den,u:'Kč'},{l:'Náhrada celkem',a:ans,u:'Kč'}],c:'nemocenska'};
},
function(){
let dvz=rand(1000,2600);
let dni=rand(5,10);
let den=Math.round(dvz*0.6);
let ans=den*dni;
return {q:`DVZ = ${dvz} Kč. Nemocenská 60 %, ${dni} dní.`,f:[{l:'Denní náhrada (60 %)',a:den,u:'Kč'},{l:'Náhrada celkem',a:ans,u:'Kč'}],c:'nemocenska'};
}
];

// ---- STÍŽENÉ PRACOVNÍ PODMÍNKY ----
generators.stizene_podminky = [
function(){
let g=rand(250,500)*100;
let p=rand(5,15);
let ans=Math.round(g*p/100);
return {q:`Hrubá mzda ${g} Kč, příplatek ${p} % za stížené podmínky. Vypočítej příplatek.`,f:[{l:'Příplatek',a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let hod=rand(140,280);
let h=rand(80,160);
let p=rand(5,20);
let g=hod*h;
let ans=Math.round(g*p/100);
return {q:`Sazba ${hod} Kč/h, ${h} hodin, příplatek ${p} %. Vypočítej příplatek.`,f:[{l:'Hrubá mzda',a:g,u:'Kč'},{l:'Příplatek',a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let g=rand(300,600)*100;
let p=rand(8,18);
let ans=Math.round(g*p/100);
return {q:`Hrubá mzda ${g} Kč, příplatek ${p} % za rizikové pracoviště. Příplatek?`,f:[{l:'Příplatek',a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let g=rand(200,450)*100;
let p1=rand(5,10);
let p2=rand(5,10);
let ans=Math.round(g*(p1+p2)/100);
return {q:`Hrubá mzda ${g} Kč. Příplatek ${p1} % (hluk) + ${p2} % (prašnost). Celkový příplatek?`,f:[{l:'Příplatek za hluk',a:Math.round(g*p1/100),u:'Kč'},{l:'Příplatek za prašnost',a:Math.round(g*p2/100),u:'Kč'},{l:'Příplatek celkem',a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let hod=rand(130,250);
let h=rand(140,180);
let g=hod*h;
let p=rand(10,25);
let ans=Math.round(g*p/100);
return {q:`Sazba ${hod} Kč/h, ${h} hodin, příplatek ${p} % za ztížené podmínky.`,f:[{l:'Hrubá mzda',a:g,u:'Kč'},{l:'Příplatek',a:ans,u:'Kč'}],c:'stizene_podminky'};
},
function(){
let g=rand(250,550)*100;
let p=rand(5,15);
let ans=Math.round(g*p/100);
return {q:`Hrubá mzda ${g} Kč. Práce ve výškách - příplatek ${p} %. Kolik navíc?`,f:[{l:'Příplatek',a:ans,u:'Kč'}],c:'stizene_podminky'};
}
];

// ===== STATE =====
let state = {
questions:[], index:0, score:0, total:0,
timeLimit:300, timeLeft:300, timerId:null, active:false,
results:[]
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
const all=catBtns.length>0&&[...catBtns].every(b=>b.classList.contains('selected'));
allBtn.classList.toggle('selected',all);
});
});
timeBtns.forEach(btn=>{
btn.addEventListener('click',()=>{
timeBtns.forEach(b=>b.classList.remove('selected'));
btn.classList.add('selected');
});
});

// ===== SCREENS =====
function showWelcome(){
welcomeScreen.classList.add('active');
gameScreen.classList.remove('active');
resultScreen.classList.remove('active');
}
function showGame(){
welcomeScreen.classList.remove('active');
gameScreen.classList.add('active');
resultScreen.classList.remove('active');
}
function showResultScreen(){
welcomeScreen.classList.remove('active');
gameScreen.classList.remove('active');
resultScreen.classList.add('active');
}

// ===== TEACHER REACTION =====
function setTeacherReaction(r){
reactionEmoji.textContent=r.emoji;
reactionText.innerHTML=r.text+' <span class="reaction-sub">'+r.sub+'</span>';
reactionEmoji.classList.remove('bounce');
void reactionEmoji.offsetWidth;
reactionEmoji.classList.add('bounce');
}

// ===== QUESTION POOL =====
function buildQuestionPool(){
const selected=[...catBtns].filter(b=>b.classList.contains('selected')).map(b=>b.dataset.cat);
if(selected.length===0)return[];
let pool=[];
selected.forEach(cat=>{
if(generators[cat]) generators[cat].forEach(fn=>pool.push({fn,cat}));
});
let qs=[];
pool.forEach(item=>{
let cnt=rand(1,2);
for(let i=0;i<cnt;i++){
let q=item.fn();
qs.push({question:q.q,fields:q.f,c:q.c});
}
});
for(let i=qs.length-1;i>0;i--){let j=rand(0,i);[qs[i],qs[j]]=[qs[j],qs[i]];}
return qs;
}

// ===== RENDER QUESTION =====
function renderQuestion(){
if(!state.active) return;
if(state.index>=state.questions.length){endGame();return;}
const q=state.questions[state.index];
questionBox.textContent=q.question;
fieldsContainer.innerHTML='';
q.fields.forEach((f,i)=>{
const row=document.createElement('div');
row.className='field-row';
const lbl=document.createElement('label');
lbl.textContent=f.l;
const inp=document.createElement('input');
inp.type='number';
inp.id='qf_'+i;
inp.dataset.answer=f.a;
inp.placeholder='0';
const unit=document.createElement('span');
unit.className='field-unit';
unit.textContent=f.u;
const chk=document.createElement('span');
chk.className='field-check';
row.appendChild(lbl);
row.appendChild(inp);
row.appendChild(unit);
row.appendChild(chk);
fieldsContainer.appendChild(row);
});
progressFill.style.width=((state.index/state.questions.length)*100)+'%';
scoreDisplay.textContent=state.score+'/'+state.total;
submitBtn.disabled=false;
answerFeedback.textContent='';
answerFeedback.className='answer-feedback';
// focus first field
const first=q.fields.length>0?document.getElementById('qf_0'):null;
if(first) setTimeout(()=>first.focus(),100);
}

// ===== CHECK ANSWER =====
function checkAnswer(){
if(!state.active||submitBtn.disabled) return;
const q=state.questions[state.index];
let allCorrect=true;
const checker=(val,ans)=>{
let t=1;
if(Math.abs(ans)>=10000)t=5; else if(Math.abs(ans)>=1000)t=2;
return Math.abs(val-ans)<=t;
};
q.fields.forEach((f,i)=>{
const inp=document.getElementById('qf_'+i);
const chk=inp.parentElement.querySelector('.field-check');
const val=parseFloat(inp.value);
if(isNaN(val)){
inp.className='wrong'; chk.textContent='❌'; allCorrect=false;
}else if(checker(val,f.a)){
inp.className='correct'; chk.textContent='✅';
}else{
inp.className='wrong'; chk.textContent='❌'; allCorrect=false;
}
});
state.total++;
if(allCorrect){
state.score++;
setTeacherReaction(pick(R_CORRECT));
answerFeedback.textContent='✅ Všechny políčka správně!';
answerFeedback.className='answer-feedback correct';
state.results.push({q:q.question,correct:true});
}else{
setTeacherReaction(pick(R_WRONG));
answerFeedback.textContent='❌ Některá políčka jsou špatně. Správné hodnoty jsou zvýrazněny.';
answerFeedback.className='answer-feedback wrong';
// show correct answers
q.fields.forEach((f,i)=>{
const inp=document.getElementById('qf_'+i);
const chk=inp.parentElement.querySelector('.field-check');
if(inp.className!=='correct'){
inp.value=f.a;
chk.textContent='✅';
}
});
state.results.push({q:q.question,correct:false});
}
submitBtn.disabled=true;
state.index++;
setTimeout(()=>{if(state.active)renderQuestion();},1500);
}

// ===== TIMER =====
function updateTimerDisplay(){
let m=Math.floor(state.timeLeft/60),s=state.timeLeft%60;
timerDisplay.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
timerDisplay.classList.toggle('warning',state.timeLeft<=30);
}
function startTimer(){
updateTimerDisplay();
state.timerId=setInterval(()=>{
state.timeLeft--;
updateTimerDisplay();
if(state.timeLeft<=0) endGame();
},1000);
}

// ===== END GAME =====
function endGame(){
if(!state.active) return;
state.active=false;
if(state.timerId){clearInterval(state.timerId);state.timerId=null;}
showResultScreen();
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

// ===== INIT GAME =====
function initGame(){
const selected=[...catBtns].filter(b=>b.classList.contains('selected')).map(b=>b.dataset.cat);
if(selected.length===0){alert('Vyber alespoň jednu kategorii!');return;}
const tb=document.querySelector('.time-btn.selected');
state.timeLimit=parseInt(tb.dataset.time);
state.timeLeft=state.timeLimit;
state.score=0; state.total=0; state.index=0;
state.active=true; state.results=[];
state.questions=buildQuestionPool();
if(state.questions.length===0){alert('Nepodařilo se vygenerovat otázky.');return;}
showGame();
setTeacherReaction({emoji:'😊',text:'Hodně štěstí!',sub:'Začínáme! Vyplň všechna políčka.'});
scoreDisplay.textContent='0/0';
if(state.timeLimit>0){
startTimer();
}else{
timerDisplay.textContent='♾️';
}
renderQuestion();
// Clear notes
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

// ===== START =====
showWelcome();
