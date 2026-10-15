// Theme picker. Saves the choice in this browser only.
(function(){
const T=[['midnight','Midnight','#0E1220','#7C9CFF'],['daylight','Daylight','#F5F6FA','#3358E6'],['circuit','Circuit','#0A1A14','#3DDC97'],['ember','Ember','#1A1210','#FF8A4C']];
const root=document.documentElement,box=document.getElementById('theme-picker');
function set(id){root.dataset.theme=id;try{localStorage.setItem('pcb-theme',id)}catch(e){}
 box.innerHTML=T.map(t=>`<button type="button" data-id="${t[0]}" title="${t[1]}" aria-label="${t[1]} theme" aria-pressed="${t[0]==id}" style="background:linear-gradient(135deg,${t[2]} 50%,${t[3]} 50%)"></button>`).join('')}
PCB.theme={init(){let id;try{id=localStorage.getItem('pcb-theme')}catch(e){}
 if(!T.some(t=>t[0]==id))id=matchMedia('(prefers-color-scheme: dark)').matches?'midnight':'daylight';
 box.onclick=e=>{const b=e.target.closest&&e.target.closest('button');if(b)set(b.dataset.id)};set(id)}};
})();
