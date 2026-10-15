(function(){
const P=PCB.data,MC=PCB.notices.mc;
const gb=v=>v>=1000?v/1000+'TB':v+'GB';
const DEF={A:{CPU:'Ryzen 5 7600',GPU:'RTX 5060 8GB',Motherboard:'B650 (AM5, DDR5)',RAM:'16GB DDR5-5600',Storage:'1TB NVMe SSD',Cooler:'Stock cooler (from CPU box)',PSU:'550W bronze'},
B:{CPU:'Ryzen 7 7800X3D',GPU:'RX 9070 XT 16GB',Motherboard:'B650 (AM5, DDR5)',RAM:'32GB DDR5-6000',Storage:'2TB NVMe SSD',Cooler:'Budget tower air cooler',PSU:'750W gold'}};
const f=(x,n)=>{const i=P[x].findIndex(o=>o.n==n);return i<0?0:i};
const pick={};for(const k in DEF){pick[k]={};for(const x in DEF[k])pick[k][x]=f(x,DEF[k][x])}
function opts(x){let h='',cur='';P[x].forEach((o,i)=>{if(o.f&&o.f!=cur){h+=(cur?'</optgroup>':'')+`<optgroup label="${o.f}">`;cur=o.f}h+=`<option value="${i}">${o.n}</option>`});return h+(cur?'</optgroup>':'')}
const sc=(l,v)=>`<div class="sc"><span>${l}</span><div class="bar"><i style="width:${Math.min(100,v)}%"></i></div><b>${v}</b></div>`;
const li=(arr,e)=>arr.length?arr.map(x=>`<li>${x}</li>`).join(''):`<li>${e}</li>`;
function build(k){const sec=document.getElementById('p-'+k);if(!sec.dataset.i){sec.dataset.i=1;
sec.innerHTML=`<div class="two"><div class="card"><h2>Build ${k} parts</h2>${Object.keys(P).map(x=>`<div class="row"><label for="${k}${x}">${x}</label><select id="${k}${x}">${opts(x)}</select></div>`).join('')}</div><div class="card" id="r-${k}"></div></div>`;
Object.keys(P).forEach(x=>{const e=document.getElementById(k+x);e.value=pick[k][x];e.onchange=()=>{pick[k][x]=+e.value;render()}})}
const a=PCB.analyze(pick[k]);document.getElementById('r-'+k).innerHTML=`<h2>Build ${k} summary</h2>${sc('1080p gaming',a.g1)}${sc('1440p gaming',a.g2)}${sc('4K gaming',a.g4)}${sc('Productivity',a.prod)}
<p class="mut">Peak draw about ${a.draw}W on a ${a.ps.w}W PSU (${a.head}% headroom). Upgrade path: ${a.upgT}.</p>
${a.u.mc?MC:''}<h3>Compatibility</h3><ul>${a.K.map(x=>`<li class="${x[0]}" style="padding-left:0">${{ok:'Fits',warn:'Check',bad:"Won't work"}[x[0]]}: ${x[1]}</li>`).join('')}</ul>
<h3>Pros</h3><ul class="p">${li(a.pr,'No standout strengths yet')}</ul><h3>Cons</h3><ul class="c">${li(a.co,'No major weaknesses found')}</ul>`}
function compare(){const A=PCB.analyze(pick.A),B=PCB.analyze(pick.B);const R=[
['CPU cores / threads',x=>x.u.c+' / '+x.u.t,x=>x.u.t,1],['CPU boost clock',x=>x.u.b+' GHz',x=>x.u.b,1],['GPU memory',x=>x.g.v+'GB',x=>x.g.v,1],
['RAM',x=>x.r.cap+'GB '+x.r.r,x=>x.r.cap,1],['Storage',x=>gb(x.s.cap)+(x.s.sata?' SATA':' NVMe'),x=>x.s.cap*(x.s.sata?.5:1),1],
['Peak power draw',x=>x.draw+'W',x=>x.draw,-1],['PSU headroom',x=>x.head+'%',x=>x.head,1],['1080p gaming score',x=>x.g1,x=>x.g1,1],
['1440p gaming score',x=>x.g2,x=>x.g2,1],['4K gaming score',x=>x.g4,x=>x.g4,1],['Productivity score',x=>x.prod,x=>x.prod,1],
['Cooling margin',x=>x.cool+'%',x=>x.cool,1],['CPU upgrade path',x=>x.upg?'Long':'Limited',x=>x.upg,1]];
const w={A:[],B:[]},diff=[];
const rows=R.map(([l,f,v,d])=>{const va=v(A),vb=v(B);let c=['',''];if(va!=vb){const wn=(va-vb)*d>0?0:1;c[wn]='w';const n=wn?'B':'A';w[n].push(l.toLowerCase());diff.push(`Build ${n} leads on ${l.toLowerCase()}: ${f(wn?B:A)} vs ${f(wn?A:B)}.`)}
return `<tr><th scope="row">${l}</th><td class="${c[0]}">${f(A)}</td><td class="${c[1]}">${f(B)}</td></tr>`}).join('');
const ca=A.co.filter(x=>!B.co.includes(x)),cb=B.co.filter(x=>!A.co.includes(x)),pa=A.pr.filter(x=>!B.pr.includes(x)),pb=B.pr.filter(x=>!A.pr.includes(x));
const best=(n,x)=>x.length?`Pick Build ${n} if you value: ${x.slice(0,4).join(', ')}.`:`Build ${n} doesn't lead in any category.`;
document.getElementById('p-C').innerHTML=`<div class="card"><h2>Side by side</h2><div class="tw"><table><thead><tr><th></th><th>Build A</th><th>Build B</th></tr></thead><tbody>
<tr><th scope="row">CPU</th><td>${A.u.n}</td><td>${B.u.n}</td></tr><tr><th scope="row">GPU</th><td>${A.g.n}</td><td>${B.g.n}</td></tr><tr><th scope="row">Motherboard</th><td>${A.mb.n}</td><td>${B.mb.n}</td></tr>${rows}</tbody></table></div>
<p class="mut">A ✓ marks the better value in each row. Build A leads ${w.A.length} categories, Build B leads ${w.B.length}.</p>${A.u.mc||B.u.mc?MC:''}</div>
<div class="two" style="margin-top:14px"><div class="card"><h2>Key differences</h2><ul class="k">${li(diff,'The builds are identical.')}</ul></div>
<div class="card"><h2>Which to choose</h2><p>${best('A',w.A)}</p><p>${best('B',w.B)}</p>
<h3>Only Build A</h3><ul class="p">${li(pa,'No unique pros')}</ul><ul class="c">${li(ca,'No unique cons')}</ul>
<h3>Only Build B</h3><ul class="p">${li(pb,'No unique pros')}</ul><ul class="c">${li(cb,'No unique cons')}</ul></div></div>`}
function render(){build('A');build('B');compare()}
['A','B','C'].forEach(k=>document.getElementById('t-'+k).onclick=()=>{['A','B','C'].forEach(j=>{document.getElementById('p-'+j).hidden=j!=k;document.getElementById('t-'+j).setAttribute('aria-selected',j==k)})});
PCB.ui={render};
})();
