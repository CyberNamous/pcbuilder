// Storage, coolers and power supplies. t = cooler heat rating in watts, w = PSU watts.
(function(){
PCB.data.Storage=[{n:'500GB NVMe SSD',cap:500,sc:80},{n:'1TB NVMe SSD',cap:1000,sc:80},{n:'2TB NVMe SSD',cap:2000,sc:85},{n:'4TB NVMe SSD',cap:4000,sc:88},{n:'1TB SATA SSD',cap:1000,sc:40,sata:1},{n:'4TB SATA SSD',cap:4000,sc:40,sata:1}];
PCB.data.Cooler=[{n:'Stock cooler (from CPU box)',t:65,stock:1},{n:'Budget tower air cooler',t:150},{n:'Large dual-tower air cooler',t:250},{n:'240mm liquid cooler',t:280},{n:'360mm liquid cooler',t:350}];
PCB.data.PSU=[450,550,650,750,850,1000,1200,1600].map(w=>({n:w+'W '+(w<=550?'bronze':w>=1600?'platinum':'gold'),w}));
})();
