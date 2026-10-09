import fs from 'node:fs';import path from 'node:path';
const pages=['index','capabilities','product','about','team','contact'];let checked=0;const videos=new Set();const posters=new Set();
const origin='http://127.0.0.1:4173';
const route=page=>page==='index'?'/':`/${page}/`;
for(const page of pages){
  const address=route(page);const html=fs.readFileSync(`dist${address}index.html`,'utf8');
  if((html.match(/<h1[ >]/g)||[]).length!==1)throw Error(`Invalid heading structure: ${page}`);
  for(const match of html.matchAll(/(?:src|href|poster)="([^"]+)"/g)){
    const ref=match[1];if(/^(https?:|mailto:|tel:)/.test(ref))continue;
    if(/^[^#]*\.html/.test(ref))throw Error(`Legacy navigation URL: ${ref}`);
    const url=new URL(ref,origin+address);const pathname=url.pathname;
    const local=path.join('dist',pathname.endsWith('/')?pathname+'index.html':pathname);
    if(!fs.existsSync(local))throw Error(`Missing ${ref} in ${page}`);
    if(pathname.endsWith('.mp4'))videos.add(pathname);
    if(match[0].startsWith('poster='))posters.add(pathname);
    if(url.hash&&!fs.readFileSync(local,'utf8').includes(`id="${url.hash.slice(1)}"`))throw Error(`Missing anchor ${ref}`);
    checked++;
  }
  const response=await fetch(origin+address);if(response.status!==200)throw Error(`HTTP error: ${address}`);
  const legacy=await fetch(`${origin}/${page}.html`,{redirect:'manual'});
  if(legacy.status!==308||legacy.headers.get('location')!==address)throw Error(`Legacy redirect failed: ${page}`);
  if(page!=='index'){const bare=await fetch(`${origin}/${page}`,{redirect:'manual'});if(bare.status!==308||bare.headers.get('location')!==address)throw Error(`Clean URL redirect failed: ${page}`)}
}
const product=fs.readFileSync('dist/product/index.html','utf8');
if((product.match(/class="product-editorial /g)||[]).length!==3||/data-product-step|product-showcase|OASIS \/ IN MOTION|A closer look/.test(product))throw Error('Product layout regression');
if(!product.includes('PRODIGY S1')||!product.includes('PRODIGY SKD-I 48/5')||!product.includes('id="prodigy"')||!product.includes('id="software"')||!product.includes('id="control"'))throw Error('Combined PRODIGY section or legacy anchors missing');
if(!fs.readFileSync('dist/capabilities/index.html','utf8').includes('simulink-model.webp'))throw Error('Modeling thumbnail missing');
for(const ref of videos){const range=await fetch(origin+ref,{headers:{Range:'bytes=0-1023'}});if(range.status!==206||(await range.arrayBuffer()).byteLength!==1024)throw Error(`Video byte range failed: ${ref}`)}
for(const ref of posters){const response=await fetch(origin+ref);if(response.status!==200||!response.headers.get('content-type')?.startsWith('image/'))throw Error(`Poster failed: ${ref}`);await response.arrayBuffer()}
const missing=await fetch(origin+'/does-not-exist/');if(missing.status!==404)throw Error('Unknown route should be 404');
console.log(`PASS: six clean routes and legacy redirects; ${checked} local references and anchors; three product sections with combined PRODIGY; modeling thumbnail present; ${videos.size} streaming videos; ${posters.size} posters.`);
