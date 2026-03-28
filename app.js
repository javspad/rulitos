'use strict';
const ORDEN=['oficial','blue','bolsa','contadoconliqui','mayorista','tarjeta','cripto'];
const LBLS={oficial:'Oficial',blue:'Blue',bolsa:'MEP',contadoconliqui:'CCL',mayorista:'Mayorista',tarjeta:'Tarjeta',cripto:'Cripto'};
const LFB=[{especie:'S30A6',vto:'2026-04-30',tna:37.8,tem:3.150,tea:45.35,precioMercado:null,diasRestantes:0},{especie:'S29M6',vto:'2026-05-29',tna:38.2,tem:3.183,tea:46.11,precioMercado:null,diasRestantes:0},{especie:'S30J6',vto:'2026-06-30',tna:38.5,tem:3.208,tea:46.72,precioMercado:null,diasRestantes:0},{especie:'S31L6',vto:'2026-07-31',tna:38.7,tem:3.225,tea:47.10,precioMercado:null,diasRestantes:0},{especie:'S31A6',vto:'2026-08-31',tna:39.0,tem:3.250,tea:47.70,precioMercado:null,diasRestantes:0},{especie:'S30S6',vto:'2026-09-30',tna:39.2,tem:3.267,tea:48.08,precioMercado:null,diasRestantes:0},{especie:'S30O6',vto:'2026-10-30',tna:39.4,tem:3.283,tea:48.47,precioMercado:null,diasRestantes:0},{especie:'S27N6',vto:'2026-11-27',tna:39.6,tem:3.300,tea:48.86,precioMercado:null,diasRestantes:0},{especie:'S28D6',vto:'2026-12-28',tna:39.8,tem:3.317,tea:49.25,precioMercado:null,diasRestantes:0}];
let DOL=[],LEC=[],LSRC='fallback',CSRC='fallback',MAC=null,CAU=[],PL=30,yCh=null,rpCh=null,tmr;
const dr=v=>{if(!v)return 0;const h=new Date();h.setHours(0,0,0,0);return Math.max(0,Math.round((new Date(v.includes('T')?v:v+'T00:00:00')-h)/86400000));};
const fv=s=>new Date(s.includes('T')?s:s+'T00:00:00').toLocaleDateString('es-AR',{day:'2-digit',month:'short',year:'numeric'});
const tm=t=>t/12;const tc=t=>(Math.pow(1+t/100/365,365)-1)*100;const tl=t=>(Math.pow(1+t/100/12,12)-1)*100;
const cau=(c,t,d)=>{const i=c*(t/100)*(d/365);return{i,tot:c+i};};
const lcR=(c,t,d)=>{const m=t/100/12;const i=c*(Math.pow(1+m,d/30)-1);return{i,tot:c+i};};
const lcC=d=>{const v=LEC.filter(l=>(l.diasRestantes||0)>0);if(!v.length)return null;return v.reduce((a,b)=>Math.abs((b.diasRestantes||0)-d)<Math.abs((a.diasRestantes||0)-d)?b:a);};
const nm=v=>v==null||isNaN(v)?'--':Number(v).toLocaleString('es-AR',{minimumFractionDigits:0,maximumFractionDigits:0});
const n2=v=>v==null||isNaN(v)?'--':Number(v).toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2});
const n3=v=>v==null||isNaN(v)?'--':Number(v).toLocaleString('es-AR',{minimumFractionDigits:3,maximumFractionDigits:3});
const pc=v=>(v>0?'+':'')+n2(v)+'%';
function setSt(s,t){document.getElementById('ldot').className='dot '+(s==='ok'?'pulse':s);document.getElementById('ltxt').textContent=t;}
function stm(){document.getElementById('uptime').textContent=new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});}
function toggleTheme(){const h=document.documentElement;const cur=h.getAttribute('data-theme');const nxt=cur==='dark'?'light':'dark';h.setAttribute('data-theme',nxt);localStorage.setItem('rulitos-theme',nxt);const ic=document.getElementById('theme-icon');if(nxt==='light'){ic.innerHTML="<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'/>"; }else{ic.innerHTML="<circle cx='12' cy='12' r='5'/><path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'/>";} if(yCh)rCur(parseFloat(document.getElementById('inp-t').value)||35); }
(()=>{const saved=localStorage.getItem('rulitos-theme');if(saved){document.documentElement.setAttribute('data-theme',saved);if(saved==='light'){const ic=document.getElementById('theme-icon');if(ic)ic.innerHTML="<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'/>";}}})();
async function sf(u,ms=5000){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);try{const r=await fetch(u,{signal:c.signal});clearTimeout(t);if(!r.ok)return null;return r.json();}catch{clearTimeout(t);return null;}}
const CACHE_KEY='rulitos-cache';const CACHE_TTL=86400000;
function saveCache(){try{localStorage.setItem(CACHE_KEY,JSON.stringify({dol:DOL,lec:LEC,lsrc:LSRC,mac:MAC,cau:CAU,csrc:CSRC,ts:Date.now()}));}catch{}}
function loadCache(){try{const raw=localStorage.getItem(CACHE_KEY);if(!raw)return false;const c=JSON.parse(raw);if(Date.now()-c.ts>CACHE_TTL)return false;if(c.dol?.length)DOL=c.dol;if(c.lec?.length){LEC=c.lec.map(l=>({...l,diasRestantes:dr(l.vto)}));LSRC=c.lsrc||'fallback';}if(c.mac)MAC=c.mac;if(c.cau?.length){CAU=c.cau;CSRC=c.csrc||'fallback';}return c.ts;}catch{return false;}}
async function fa(){const[dR,lR,mR,cR]=await Promise.all([sf('/api/dolar'),sf('/api/lecaps'),sf('/api/macro'),sf('/api/caucion')]);if(dR)DOL=dR;if(lR?.ok&&lR.data?.length>=3){LEC=lR.data.map(l=>({...l,diasRestantes:dr(l.vto)}));LSRC=lR.source;}else{LEC=LFB.map(l=>({...l,diasRestantes:dr(l.vto)}));LSRC='fallback';}if(mR?.ok)MAC=mR;if(cR?.ok&&cR.data?.length){CAU=cR.data;CSRC=cR.source||'fallback';}if(DOL.length||MAC||CAU.length)saveCache();}function rCZ(){const g=document.getElementById('czgrid');const vO=(DOL.find(d=>d.casa==='oficial')||{venta:1}).venta;const ls=ORDEN.map(c=>DOL.find(d=>d.casa===c)).filter(Boolean);g.innerHTML=ls.map((d,i)=>{const lbl=LBLS[d.casa]||d.nombre;const br=d.casa==='oficial'?null:((d.venta-vO)/vO*100);const bp=br!==null?`<div class="bp ${br>100?'hi':'up'}">${pc(br)}</div>`:'';return`<div class="dc" style="animation-delay:${i*.05}s"><div class="dc-type">${lbl}</div><div><span class="dc-cur">$</span><span class="dc-v">${nm(d.venta)}</span></div><div class="dc-vl">Venta</div><div class="dc-bot"><div><div class="dc-cl">Compra</div><div class="dc-c">$${nm(d.compra||0)}</div></div>${bp}</div></div>`;}).join('');const f=ls[0];if(f?.fechaActualizacion){const fa2=new Date(f.fechaActualizacion);document.getElementById('cz-sub').textContent='Todas las bandas - Act. '+fa2.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});}}
function rMac(){if(!MAC)return;const src=ts=>'<div class="mc-dot '+ts+'"></div>';const rp=MAC.riesgoPais;document.getElementById('m-rp').textContent=rp!=null?nm(rp):'--';document.getElementById('m-rp-src').innerHTML=src(rp!=null?'live':'fb')+(rp!=null?'argentinadatos':'sin datos');document.getElementById('macro-sub').textContent='Act. '+new Date(MAC.ts).toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});const inf=MAC.inflacion;document.getElementById('m-inf').textContent=inf?n2(inf.valor)+'%':'--';if(inf?.fecha)document.getElementById('m-inf-f').textContent=new Date(inf.fecha+'T00:00:00').toLocaleDateString('es-AR',{month:'long',year:'numeric'});document.getElementById('m-inf-src').innerHTML=src(inf?'live':'fb')+(inf?'argentinadatos':'sin datos');const tam=MAC.tamar;document.getElementById('m-tam').textContent=tam?n2(tam.valor)+'%':'--';if(tam?.fecha)document.getElementById('m-tam-f').textContent='TNA — '+new Date(tam.fecha+'T00:00:00').toLocaleDateString('es-AR',{day:'numeric',month:'short'});document.getElementById('m-tam-src').innerHTML=src(tam?'live':'fb')+(tam?'BCRA':'sin datos');const pf=MAC.plazosFixed||[];if(pf.length>0){const mx=Math.max(...pf.map(p=>p.tna));document.getElementById('m-pf').innerHTML=pf.slice(0,5).map(p=>'<div class="pf-row"><span class="pf-banco">'+p.banco+'</span><div class="pf-bar-w"><div class="pf-bar" style="width:'+(p.tna/mx*100).toFixed(1)+'%"></div></div><span class="pf-tna">'+n2(p.tna)+'%</span></div>').join('');document.getElementById('m-pf-src').innerHTML=src('live')+'argentinadatos';}else{document.getElementById('m-pf').innerHTML='<div style="color:var(--text4);font-size:12px">Sin datos</div>';document.getElementById('m-pf-src').innerHTML=src('fb')+'sin datos';}const vig=LEC.filter(l=>(l.diasRestantes||0)>0);if(vig.length>0){const avg=vig.reduce((s,l)=>s+l.tna,0)/vig.length;document.getElementById('m-lec').textContent=n2(avg)+'%';document.getElementById('m-lec-s').textContent='TNA promedio - '+vig.length+' especies';document.getElementById('m-lec-src').innerHTML=src(LSRC==='byma'?'live':'fb')+(LSRC==='byma'?'BYMA en vivo':'referencia manual');}
const hist=MAC.riesgoPaisHist||[];const rpWrap=document.getElementById('rp-chart-wrap');if(hist.length>1){rpWrap.style.display='block';const cv=document.getElementById('rp-chart');if(rpCh){rpCh.destroy();rpCh=null;}const dk=document.documentElement.getAttribute('data-theme')==='dark';const gold=dk?'#d4a843':'#8a5e0a';rpCh=new Chart(cv,{type:'line',data:{labels:hist.map(p=>p.fecha),datasets:[{data:hist.map(p=>p.valor),borderColor:gold,backgroundColor:'transparent',borderWidth:2,pointRadius:0,tension:0.3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:false}},scales:{x:{display:false},y:{display:false}}}});}else{rpWrap.style.display='none';}}
function rARB(){const ls=ORDEN.map(c=>DOL.find(d=>d.casa===c)).filter(Boolean);let h='<thead><tr><th style="font-size:9px">Compra - Vende</th>'+ls.map(d=>'<th>'+LBLS[d.casa]+'</th>').join('')+'</tr></thead><tbody>';ls.forEach(cd=>{h+='<tr><td>'+LBLS[cd.casa]+'</td>';ls.forEach(ve=>{if(cd.casa===ve.casa){h+='<td class="cd">-</td>';return;}const v=((ve.compra-cd.venta)/cd.venta)*100;h+='<td class="'+(v>0.05?'cp':v<-0.05?'cn':'cz')+'">'+(v>0?'+':'')+n2(v)+'%</td>';});h+='</tr>';});document.getElementById('arbt').innerHTML=h+'</tbody>';}
function rCur(tC){const cv=document.getElementById('ychart');const vg=LEC.filter(l=>(l.diasRestantes||0)>0).sort((a,b)=>a.diasRestantes-b.diasRestantes);if(!vg.length||!cv)return;if(yCh){yCh.destroy();yCh=null;}const dk=document.documentElement.getAttribute('data-theme')==='dark';const g=dk?'#d4a843':'#8a5e0a',b=dk?'#5a9fbe':'#1a6080',gc=dk?'rgba(212,168,67,.12)':'rgba(138,94,10,.08)',grid=dk?'rgba(50,50,48,.6)':'rgba(180,175,166,.4)',tick=dk?'#585450':'#a0988e';yCh=new Chart(cv,{type:'line',data:{labels:vg.map(l=>l.diasRestantes+'d'),datasets:[{label:'LECAPs TNA %',data:vg.map(l=>+l.tna.toFixed(2)),borderColor:g,backgroundColor:gc,borderWidth:2.5,pointBackgroundColor:g,pointBorderColor:dk?'#0a0a08':'#f5f2ec',pointBorderWidth:2,pointRadius:6,pointHoverRadius:8,tension:0.3,fill:true},{label:'Caucion '+n2(tC)+'%',data:vg.map(()=>+tC.toFixed(2)),borderColor:b,backgroundColor:'transparent',borderWidth:1.8,borderDash:[5,4],pointRadius:0,fill:false}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},tooltip:{backgroundColor:dk?'#1e1e1a':'#fff',borderColor:dk?'#323230':'#d4cfc6',borderWidth:1,titleColor:dk?'#9a9690':'#6a6460',bodyColor:dk?'#f5f2ea':'#1a1814',padding:12,callbacks:{title:c=>'Plazo: '+c[0].label,label:c=>' '+c.dataset.label.split(' ')[0]+': '+n2(c.parsed.y)+'%'}}},scales:{x:{grid:{color:grid},ticks:{color:tick,maxRotation:0},border:{color:dk?'#323230':'#d4cfc6'}},y:{grid:{color:grid},ticks:{color:tick,callback:v=>v+'%'},border:{color:dk?'#323230':'#d4cfc6'},suggestedMin:Math.min(tC,...vg.map(l=>l.tna))-2,suggestedMax:Math.max(tC,...vg.map(l=>l.tna))+1}}}});const el=document.getElementById('chart-src');el.textContent=LSRC==='byma'?'BYMA en vivo':'Referencia manual';el.style.color=LSRC==='byma'?'var(--green)':'var(--text4)';}function rLT(ne){const vg=LEC.filter(l=>(l.diasRestantes||0)>0).sort((a,b)=>a.diasRestantes-b.diasRestantes);const lv=LSRC==='byma';document.getElementById('lt-src').innerHTML='<div class="sd '+(lv?'live':'fb')+'"></div>'+(lv?'BYMA en vivo':'Referencia manual');document.getElementById('ltbody').innerHTML=vg.map(l=>{const iN=l.especie===ne;const ry=lcR(1000000,l.tna,365);const pr=l.precioMercado!=null?'<span class="prec">$'+n2(l.precioMercado)+'</span>':'<span style="color:var(--text4)">--</span>';return'<tr class="'+(iN?'nearest':'')+'"><td>'+l.especie+(iN?'<span class="wlbl">sel.</span>':'')+'</td><td style="color:var(--text3)">'+fv(l.vto)+'</td><td style="color:var(--text4)">'+(l.diasRestantes||0)+'</td><td>'+pr+'</td><td class="tnac">'+n2(l.tna)+'%</td><td style="color:var(--text2)">'+n3(l.tem||tm(l.tna))+'%</td><td style="color:var(--text3)">'+n2(l.tea||tl(l.tna))+'%</td><td style="color:var(--text2)">$'+nm(ry.tot)+'</td></tr>';}).join('');}
function rCal(){const raw=document.getElementById('inp-m').value.replace(/[.$\s]/g,'').replace(',','.');const mo=parseFloat(raw)||1000000;const tn=parseFloat(document.getElementById('inp-t').value)||35;const di=PL;const rC=cau(mo,tn,di);const m=lcC(di);const rL=m?lcR(mo,m.tna,di):{i:0,tot:mo};const vM=(DOL.find(d=>d.casa==='bolsa')||{}).venta||0;const vC=(DOL.find(d=>d.casa==='contadoconliqui')||{}).venta||0;const tC2=tm(tn),eC=tc(tn),tL=m?tm(m.tna):0,eL=m?tl(m.tna):0;document.getElementById('fbox').innerHTML='<div><div class="fi-label">Tasa diaria caucion</div><div class="fi-val"><span class="hi">'+n3(tn/365)+'%</span> <span class="lo">=TNA/365</span></div></div><div><div class="fi-label">TEM caucion</div><div class="fi-val"><span class="hi">'+n3(tC2)+'%</span> <span class="lo">=TNA/12</span></div></div><div><div class="fi-label">TEA caucion</div><div class="fi-val"><span class="hi">'+n2(eC)+'%</span> <span class="lo">comp.diario</span></div></div>'+(m?'<div><div class="fi-label">TEM '+m.especie+'</div><div class="fi-val"><span class="hi">'+n3(tL)+'%</span></div></div><div><div class="fi-label">TEA '+m.especie+'</div><div class="fi-val"><span class="hi">'+n2(eL)+'%</span></div></div><div><div class="fi-label">Ventaja TEM</div><div class="fi-val"><span class="'+(tL>tC2?'hi':'lo')+'">'+n3(tL-tC2)+'pp</span> <span class="lo">->'+(tL>tC2?'LECAP':'Caucion')+'</span></div></div>':'');const cg=rC.i>=rL.i;const df=Math.abs(rL.i-rC.i);document.getElementById('rg').innerHTML='<div class="rc '+(cg?'win':'')+'"><div class="rclbl">Caucion TNA '+n2(tn)+'%</div><div class="rcv">$'+nm(rC.tot)+'</div><div class="rcs">TEM '+n3(tC2)+'% TEA '+n2(eC)+'%</div><div class="rcg p">+$'+nm(rC.i)+'</div><div class="rcu">'+(vM?'~ USD '+nm(rC.tot/vM)+' MEP':'&nbsp;')+'</div></div><div class="rc '+(!cg?'win':'')+'"><div class="rclbl">'+(m?'LECAP '+m.especie+' TNA '+n2(m.tna)+'%':'Sin LECAPs')+'</div><div class="rcv">$'+nm(rL.tot)+'</div><div class="rcs">TEM '+n3(tL)+'% TEA '+n2(eL)+'%</div><div class="rcg p">+$'+nm(rL.i)+'</div><div class="rcu">'+(vM?'~ USD '+nm(rL.tot/vM)+' MEP':'&nbsp;')+'</div></div><div class="rc"><div class="rclbl">Diferencia</div><div class="rcv" style="color:'+(df>0?'var(--gold-l)':'var(--text3)')+'">$'+nm(df)+'</div><div class="rcs">a favor de '+(cg?'Caucion':'LECAP')+'</div><div class="rcg z">en '+di+' dia'+(di!==1?'s':'')+'</div><div class="rcu">'+(vC?'Inversion: USD '+nm(mo/vC)+' CCL':'&nbsp;')+'</div></div>';rLT(m?.especie);rCur(tn);}
function rPry(){const raw=document.getElementById('py-m').value.replace(/[.$\s]/g,'').replace(',','.');const mo=parseFloat(raw)||1000000;const tn=parseFloat(document.getElementById('py-t').value)||35;const PLS=[1,7,30,60,90,120,180,365];const rows=PLS.map(d=>{const rC=cau(mo,tn,d);const mb=lcC(d);const rL=mb?lcR(mo,mb.tna,d):null;return{d,rC,rL,mb};});const mx=Math.max(...rows.map(r=>Math.max(r.rC.i,r.rL?.i||0)));document.getElementById('esc-grid').innerHTML=rows.map(({d,rC,rL,mb})=>{const cg=!rL||rC.i>=rL.i;const bC=mx>0?(rC.i/mx*100):0;const bL=(mx>0&&rL)?(rL.i/mx*100):0;return'<div class="esc-c"><div class="esc-d">'+d+' dia'+(d!==1?'s':'')+'</div><div class="esc-bw"><div class="esc-b c" style="width:'+bC.toFixed(1)+'%"></div></div><div class="esc-bw"><div class="esc-b l" style="width:'+bL.toFixed(1)+'%"></div></div><div class="esc-leg"><div class="esc-it"><span class="esc-il">Caucion</span><span class="esc-iv '+(cg?'win':'')+'">+$'+nm(rC.i)+'</span></div><div class="esc-it" style="text-align:right"><span class="esc-il">'+(mb?mb.especie:'--')+'</span><span class="esc-iv '+(!cg&&rL?'win':'')+'">'+(rL?'+$'+nm(rL.i):'--')+'</span></div></div></div>';}).join('');}
function rCN(){const raw=document.getElementById('cn-m').value.replace(/[.$\s]/g,'').replace(',','.');const mo=parseFloat(raw)||100000;const dir=document.getElementById('cn-d').value;const ls=ORDEN.map(c=>DOL.find(d=>d.casa===c)).filter(Boolean);document.getElementById('cngrid').innerHTML=ls.map(d=>{const lbl=LBLS[d.casa]||d.nombre;const val=dir==='au'?'USD '+n2(mo/d.venta):'$'+nm(mo*d.compra);const rate=dir==='au'?'@ $'+nm(d.venta)+' venta':'@ $'+nm(d.compra)+' compra';return'<div class="cnc"><div class="cnc-l">'+lbl+'</div><div class="cnc-v">'+val+'</div><div class="cnc-r">'+rate+'</div></div>';}).join('');}
async function ld(){setSt('load','Actualizando...');document.getElementById('rbtn').classList.add('spin');let usingCache=false;try{await fa();}catch(e){const ct=loadCache();if(ct){usingCache=ct;}else{setSt('err','Sin conexión');document.getElementById('rbtn').classList.remove('spin');return;}}try{rCZ();rMac();rARB();rCal();rPry();rCN();}catch{}if(usingCache){const h=new Date(usingCache).toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});setSt('ok','Caché local — '+h);document.getElementById('ldot').style.background='var(--gold-d)';}else{const live=[];if(DOL.length>0)live.push('Dólar');if(MAC?.source==='live')live.push('Macro');if(LSRC==='byma')live.push('LECAPs');if(CSRC==='bcra'||CSRC==='mae')live.push('Caución');const missing=[];if(!DOL.length)missing.push('Dólar');if(MAC?.source!=='live')missing.push('Macro');setSt('ok',missing.length?'Parcial — Sin '+missing.join(', '):'En vivo — '+live.join(', '));}stm();syncRlTna();document.getElementById('rbtn').classList.remove('spin');}

// ===== SIMULADOR ROLLING =====
function getTasaBase(){
  // Try from CAU (live MAE data), filter plazo 001
  const c1=CAU.find(x=>(x.codigoPlazo||x.plazo)==='001'||parseInt(x.codigoPlazo||x.plazo||0)===1);
  if(c1?.Ultimatasa>0) return c1.Ultimatasa;
  // Fallback: use manual input
  return parseFloat(document.getElementById('rl-t').value)||35;
}
function getLecapEquiv(dias){
  const lec=LEC.filter(l=>(l.diasRestantes||0)>0);
  if(!lec.length) return null;
  return lec.reduce((a,b)=>Math.abs((b.diasRestantes||0)-dias)<Math.abs((a.diasRestantes||0)-dias)?b:a);
}
function simRolling(capital,dias,tnBase,varMax,nSim){
  const results=[];
  for(let s=0;s<nSim;s++){
    let cap=capital;
    const path=[capital];
    for(let d=0;d<dias;d++){
      // Random uniform variation in [-varMax, +varMax]
      const delta=(Math.random()*2-1)*(varMax/100)*tnBase;
      const tnaHoy=Math.max(1,tnBase+delta);
      const intDia=cap*(tnaHoy/100/365);
      cap+=intDia;
      path.push(cap);
    }
    results.push({final:cap,path,ganancia:cap-capital,tnaEfectiva:((cap/capital-1)/dias*365)*100});
  }
  return results;
}
let rlChart=null,rlPathChart=null;
function runRolling(){
  const capital=parseFloat(document.getElementById('rl-m').value.replace(/[.$\s]/g,'').replace(',','.'))||1000000;
  const dias=parseInt(document.getElementById('rl-d').value)||30;
  const tnBase=parseFloat(document.getElementById('rl-t').value)||getTasaBase();
  const varMax=parseFloat(document.getElementById('rl-v').value)||10;
  const nSim=parseInt(document.getElementById('rl-s').value)||500;
  // Sync tna field with live rate if available
  const liveRate=getTasaBase();
  if(liveRate!==parseFloat(document.getElementById('rl-t').value)){
    document.getElementById('rl-t').value=n2(liveRate);
  }
  const results=simRolling(capital,dias,tnBase,varMax,nSim);
  results.sort((a,b)=>a.final-b.final);
  const lec=getLecapEquiv(dias);
  const lecFinal=lec?lcR(capital,lec.tna,dias).tot:null;
  // Stats
  const finals=results.map(r=>r.final);
  const p1=finals[Math.floor(nSim*0.01)];
  const p25=finals[Math.floor(nSim*0.25)];
  const p50=finals[Math.floor(nSim*0.50)];
  const p75=finals[Math.floor(nSim*0.75)];
  const p99=finals[Math.floor(nSim*0.99)];
  const avg=finals.reduce((s,v)=>s+v,0)/nSim;
  const pctBeatLec=lecFinal?results.filter(r=>r.final>lecFinal).length/nSim*100:null;
  // Render stats cards
  const stats=[
    {l:'Peor caso (P1)',v:'$'
+nm(p1),s:n2((p1/capital-1)*100)+'%',c:'red'},
    {l:'Mediana (P50)',v:'$'
+nm(p50),s:n2((p50/capital-1)*100)+'%',c:'gold'},
    {l:'Mejor caso (P99)',v:'$'
+nm(p99),s:n2((p99/capital-1)*100)+'%',c:'green'},
    {l:lec?'LECAP '+lec.especie:'LECAP ref',v:lecFinal?'$'
+nm(lecFinal):'--',s:lec?n2(lec.tna)+'% TNA':'--',c:'blue'},
  ];
  document.getElementById('rl-stats').innerHTML=stats.map(s=>`<div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:16px">
    <div style="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);margin-bottom:10px">${s.l}</div>
    <div style="font-family:JetBrains Mono,monospace;font-size:22px;font-weight:600;color:var(--${s.c==='gold'?'gold-l':s.c==='red'?'red':s.c==='green'?'green':'blue'});margin-bottom:4px">${s.v}</div>
    <div style="font-family:JetBrains Mono,monospace;font-size:12px;color:var(--text3)">${s.s}</div>
  </div>`).join('');
  // Histogram chart
  const isDk=document.documentElement.getAttribute('data-theme')==='dark';
  const gc=isDk?'rgba(44,44,40,.5)':'rgba(180,175,166,.4)';
  const tk=isDk?'#585450':'#a0988e';
  const bins=20;const bmin=finals[0],bmax=finals[nSim-1],bw=(bmax-bmin)/bins;
  const counts=Array(bins).fill(0);
  finals.forEach(v=>{const i=Math.min(bins-1,Math.floor((v-bmin)/bw));counts[i]++;});
  const labels=counts.map((_,i)=>'$'
+nm(bmin+i*bw));
  if(rlChart){rlChart.destroy();rlChart=null;}
  const ctx=document.getElementById('rl-chart').getContext('2d');
  const lecBin=lecFinal?Math.min(bins-1,Math.floor((lecFinal-bmin)/bw)):-1;
  rlChart=new Chart(ctx,{type:'bar',data:{labels,datasets:[
    {label:'Escenarios',data:counts,backgroundColor:counts.map((_,i)=>i===lecBin?'rgba(90,143,168,.8)':'rgba(212,168,67,.5)'),borderColor:counts.map((_,i)=>i===lecBin?'#5a9fbe':'#d4a843'),borderWidth:1},
  ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{title:c=>'Rango: '+c[0].label,label:c=>c.parsed.y+' escenarios'}}},scales:{x:{grid:{color:gc},ticks:{color:tk,maxRotation:0,autoSkip:true,maxTicksLimit:8}},y:{grid:{color:gc},ticks:{color:tk}}}}});
  // Path chart (worst, median, best)
  const worst=results[0].path, med=results[Math.floor(nSim/2)].path, best=results[nSim-1].path;
  const dayLabels=Array.from({length:dias+1},(_,i)=>'D'+i);
  const lecPath=lec?Array.from({length:dias+1},(_,i)=>lcR(capital,lec.tna,i).tot):null;
  if(rlPathChart){rlPathChart.destroy();rlPathChart=null;}
  const ctx2=document.getElementById('rl-path-chart').getContext('2d');
  const ds=[
    {label:'Peor caso',data:worst,borderColor:'#d4614e',backgroundColor:'transparent',borderWidth:1.5,pointRadius:0,borderDash:[4,3]},
    {label:'Mediana',data:med,borderColor:'#d4a843',backgroundColor:'rgba(212,168,67,.08)',borderWidth:2.5,pointRadius:0,fill:true},
    {label:'Mejor caso',data:best,borderColor:'#5ab87e',backgroundColor:'transparent',borderWidth:1.5,pointRadius:0,borderDash:[4,3]},
  ];
  if(lecPath) ds.push({label:'LECAP '+(lec?.especie||''),data:lecPath,borderColor:'#5a9fbe',backgroundColor:'transparent',borderWidth:1.8,pointRadius:0,borderDash:[6,4]});
  rlPathChart=new Chart(ctx2,{type:'line',data:{labels:dayLabels,datasets:ds},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:true,labels:{color:tk,font:{size:11},boxWidth:12}},tooltip:{backgroundColor:isDk?'#1e1e1a':'#fff',borderColor:isDk?'#323230':'#d4cfc6',borderWidth:1,callbacks:{label:c=>' '+c.dataset.label+': $'
+nm(c.parsed.y)}}},scales:{x:{grid:{color:gc},ticks:{color:tk,maxTicksLimit:10}},y:{grid:{color:gc},ticks:{color:tk,callback:v=>'$'
+nm(v)}}}}});
  // Table
  const thead=document.getElementById('rl-thead');
  thead.innerHTML=['Escenario','Capital Final','Ganancia','TNA Efectiva',lecFinal?'vs LECAP':''].map(h=>`<th style="background:var(--surface3);padding:10px 14px;font-family:DM Sans,sans-serif;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);text-align:right;border-bottom:1px solid var(--border)">${h}</th>`).join('');
  const rows=[
    {n:'Peor (P1)',r:results[Math.floor(nSim*0.01)]},
    {n:'P10',r:results[Math.floor(nSim*0.10)]},
    {n:'Mediana (P50)',r:results[Math.floor(nSim*0.50)]},
    {n:'P75',r:results[Math.floor(nSim*0.75)]},
    {n:'P90',r:results[Math.floor(nSim*0.90)]},
    {n:'Mejor (P99)',r:results[Math.floor(nSim*0.99)]},
  ];
  const vsLec=r=>lecFinal?((r.final-lecFinal)>=0?'<span style="color:var(--green)">+$'
+nm(r.final-lecFinal)+'</span>':'<span style="color:var(--red)">-$'
+nm(Math.abs(r.final-lecFinal))+'</span>'):'';
  document.getElementById('rl-table').innerHTML=rows.map(({n,r})=>`<tr style="border-bottom:1px solid var(--border-s)">
    <td style="padding:9px 14px;text-align:left;color:var(--text);font-family:DM Sans,sans-serif;font-size:12px;font-weight:600">${n}</td>
    <td style="padding:9px 14px;text-align:right;color:var(--text)">${nm(r.final)}</td>
    <td style="padding:9px 14px;text-align:right;color:var(--green)">+${nm(r.ganancia)}</td>
    <td style="padding:9px 14px;text-align:right;color:var(--gold)">${n2(r.tnaEfectiva)}%</td>
    ${lecFinal?`<td style="padding:9px 14px;text-align:right">${vsLec(r)}</td>`:''}
  </tr>`).join('');
  if(pctBeatLec!==null){
    document.getElementById('rl-table').innerHTML+=`<tr><td colspan="5" style="padding:10px 14px;font-family:DM Sans,sans-serif;font-size:12px;color:var(--text3);text-align:center;border-top:1px solid var(--border)">
      Rolling caucion supera a LECAP en <strong style="color:var(--gold)">${n2(pctBeatLec)}%</strong> de los escenarios (base TNA ${n2(tnBase)}% ± ${varMax}%)
    </td></tr>`;
  }
  document.getElementById('rl-results').style.display='block';
  // Sync TNA to main input
  document.getElementById('inp-t').value=n2(tnBase);
  document.getElementById('py-t').value=n2(tnBase);
}
// Auto-sync TNA from CAU when data loads
function syncRlTna(){
  const rate=getTasaBase();
  if(rate>0) document.getElementById('rl-t').value=n2(rate);
}
// ===== FIN SIMULADOR ROLLING =====
function refresh(){clearInterval(tmr);ld();tmr=setInterval(ld,5*60*1000);}
document.querySelectorAll('.cnav-b').forEach(b=>{b.addEventListener('click',()=>{document.querySelectorAll('.cnav-b').forEach(x=>x.classList.remove('on'));document.querySelectorAll('.cpanel').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('panel-'+b.dataset.p).classList.add('on');if(b.dataset.p==='proyeccion')rPry();});});
document.getElementById('pgrid').addEventListener('click',e=>{const b=e.target.closest('.pb');if(!b)return;document.querySelectorAll('.pb').forEach(x=>x.classList.remove('on'));b.classList.add('on');PL=parseInt(b.dataset.d);rCal();});
let dC,dP,dV;
['inp-m','inp-t'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{clearTimeout(dC);dC=setTimeout(rCal,130);}));
['py-m','py-t'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{clearTimeout(dP);dP=setTimeout(rPry,130);}));
['cn-m','cn-d'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{clearTimeout(dV);dV=setTimeout(rCN,130);}));
['inp-m','py-m','cn-m'].forEach(id=>{document.getElementById(id).addEventListener('blur',function(){const v=parseFloat(this.value.replace(/[.$\s]/g,'').replace(',','.'));if(!isNaN(v))this.value=nm(v);});});
document.getElementById('inp-t').addEventListener('input',function(){document.getElementById('py-t').value=this.value;clearTimeout(dP);dP=setTimeout(rPry,130);});
document.getElementById('py-t').addEventListener('input',function(){document.getElementById('inp-t').value=this.value;clearTimeout(dC);dC=setTimeout(rCal,130);});
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(e=>console.warn(e));});}
refresh();
