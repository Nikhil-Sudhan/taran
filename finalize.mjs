import fs from 'node:fs';
let source=fs.readFileSync('generate.mjs','utf8').replaceAll('ISA / SYSTEM VISUALISATION','PRODUCT ONE / SYSTEM VISUALISATION').replaceAll('ISA system animation','Product One animation').replaceAll('<span>ISA</span>','<span>PRODUCT ONE</span>').replace("innerHero('01','PRODUCT','PRECISION AT", "innerHero('01','PRODUCT ONE','PRECISION AT");
source=source.replaceAll('®','');
fs.writeFileSync('generate.mjs',source);
let css=fs.readFileSync('dist/style.css','utf8');
const colors={'#111210':'#111111','#eeefea':'#efefef','#c8cac3':'#c9c9c9','#62665f':'#636363','#d7d9d1':'#d8d8d8','#23251f':'#232323','#10110f':'#101010','#dedfd9':'#dedede','#d6d8d2':'#d7d7d7','#77786f':'#777777'};
for(const [a,b] of Object.entries(colors))css=css.replaceAll(a,b);
fs.writeFileSync('dist/style.css',css);
const manifest=JSON.parse(fs.readFileSync('.openai/hosting.json','utf8'));manifest.static={directory:'dist'};fs.writeFileSync('.openai/hosting.json',JSON.stringify(manifest,null,2)+'\n');
