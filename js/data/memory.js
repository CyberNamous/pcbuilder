// cap = GB total, d = number of sticks, sc = relative memory score (0-100).
(function(){
const R=(f,a)=>a.map(([n,cap,r,sc,d])=>({n,cap,r,sc,d,f}));
PCB.data.RAM=[
...R('DDR5',[['16GB DDR5-5600',16,'DDR5',55,2],['32GB DDR5-6000',32,'DDR5',85,2],['64GB DDR5-6000',64,'DDR5',100,2],['96GB DDR5-6400 (2x48GB)',96,'DDR5',100,2],['128GB DDR5-5600 (2x64GB)',128,'DDR5',100,2],['192GB DDR5-5200 (4x48GB)',192,'DDR5',100,4],['256GB DDR5-4800 (4x64GB)',256,'DDR5',100,4]]),
...R('DDR4',[['8GB DDR4-2400',8,'DDR4',30,1],['16GB DDR4-3200',16,'DDR4',50,2],['32GB DDR4-3600',32,'DDR4',78,2],['64GB DDR4-3200',64,'DDR4',95,2],['128GB DDR4-3200 (4x32GB)',128,'DDR4',100,4]])];
})();
