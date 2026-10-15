// Newest platforms first. oc = supports CPU overclocking, b = older board that may need a BIOS update.
(function(){
const M=(f,s,a)=>a.map(([n,r,x=''])=>({n:`${n} (${s}, ${r})`,s,r,f,oc:x.includes('o'),b:x.includes('b')}));
PCB.data.Motherboard=[
...M('Intel 800-series (LGA1851)','LGA1851',[['H810','DDR5'],['B860','DDR5'],['Z890','DDR5','o']]),
...M('AMD 800/600-series (AM5)','AM5',[['A620','DDR5'],['B650','DDR5'],['B650E','DDR5'],['X670E','DDR5'],['B840','DDR5'],['B850','DDR5'],['X870','DDR5'],['X870E','DDR5']]),
...M('Intel 600/700-series (LGA1700)','LGA1700',[['H610','DDR4'],['B660','DDR4'],['B760','DDR4'],['B760','DDR5'],['Z690','DDR5','o'],['Z790','DDR4','o'],['Z790','DDR5','o']]),
...M('Intel 400/500-series (LGA1200)','LGA1200',[['H410','DDR4','b'],['B460','DDR4','b'],['Z490','DDR4','ob'],['B560','DDR4'],['Z590','DDR4','o']]),
...M('Intel 300-series (LGA1151-v2)','LGA1151-v2',[['H310','DDR4','b'],['B360','DDR4','b'],['Z370','DDR4','ob'],['Z390','DDR4','o']]),
...M('Intel 100/200-series (LGA1151-v1)','LGA1151-v1',[['H110','DDR4','b'],['Z170','DDR4','ob'],['Z270','DDR4','ob']]),
...M('AMD AM4','AM4',[['A320','DDR4','b'],['B450','DDR4','b'],['B550','DDR4'],['X570','DDR4']])];
})();
