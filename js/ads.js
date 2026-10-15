// Sponsor banners. Top and bottom slots share one list and never show the same ad at the same time (unless only one ad exists).
(function(){
const cfg=Object.assign({interval:11000,fade:600},PCB.adSettings);
const mq=matchMedia('(max-width:600px)'),rm=matchMedia('(prefers-reduced-motion: reduce)');
const d=new Date(),today=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const live=s=>s&&s.id&&s.img&&s.url&&(!s.start||s.start<=today)&&(!s.end||s.end>=today);
const esc=t=>String(t||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const load=u=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=u});
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
let list=[],top,bot;
const mk=el=>{el.innerHTML='<div class="ad-inner"></div><span class="ad-tag">Sponsored</span>';
 const sl={el,i:0,paused:false,inner:el.querySelector('.ad-inner')};sl.inner.style.transition='opacity '+cfg.fade+'ms ease';
 el.addEventListener('mouseenter',()=>sl.paused=true);el.addEventListener('mouseleave',()=>sl.paused=false);
 el.addEventListener('focusin',()=>sl.paused=true);el.addEventListener('focusout',()=>sl.paused=false);return sl};
const paint=sl=>{const x=list[sl.i],im=mq.matches?x.b:x.a;
 sl.inner.innerHTML=`<a href="${esc(x.s.url)}" target="_blank" rel="sponsored noopener noreferrer"><img src="${esc(im.src)}" alt="${esc(x.s.alt)}"></a>`};
// Reserve the height of the tallest banner so nothing below moves when ads change.
const fit=()=>[top,bot].forEach(sl=>{const w=sl.el.clientWidth;
 sl.el.style.minHeight=Math.ceil(Math.max(...list.map(x=>{const im=mq.matches?x.b:x.a;return Math.min(im.naturalWidth,w||im.naturalWidth)*im.naturalHeight/im.naturalWidth})))+'px'});
const swap=(sl,i)=>{const go=()=>{sl.i=i;paint(sl);sl.inner.style.opacity=1};
 if(rm.matches||!cfg.fade)return go();sl.inner.style.opacity=0;setTimeout(go,cfg.fade)};
const next=(sl,other)=>{let i=(sl.i+1)%list.length;if(i==other.i)i=(i+1)%list.length;return i};
async function init(){
 const a=document.getElementById('ad-top'),b=document.getElementById('ad-bottom'),seen={};
 const cand=(PCB.sponsors||[]).filter(s=>live(s)&&!seen[s.id]&&(seen[s.id]=1));
 if(!a||!b||!cand.length)return;
 const ok=await Promise.all(cand.map(async s=>{const x=await load(s.img),y=s.imgSmall?await load(s.imgSmall):x;return x&&y?{s,a:x,b:y}:null}));
 list=shuffle(ok.filter(Boolean));if(!list.length)return;
 top=mk(a);bot=mk(b);top.i=0;bot.i=list.length>1?1:0;paint(top);paint(bot);fit();
 mq.addEventListener('change',()=>{paint(top);paint(bot);fit()});
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(fit,150)});
 if(list.length<2)return;
 const can=sl=>!document.hidden&&!sl.paused;
 const loop=(fn,delay)=>setTimeout(function tick(){fn();setTimeout(tick,cfg.interval)},delay);
 if(list.length==2)loop(()=>{if(can(top)&&can(bot)){const k=top.i;swap(top,bot.i);swap(bot,k)}},cfg.interval);
 else{loop(()=>{if(can(top))swap(top,next(top,bot))},cfg.interval);loop(()=>{if(can(bot))swap(bot,next(bot,top))},cfg.interval*1.5)}
}
PCB.ads={init};
})();
