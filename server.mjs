import http from 'node:http';import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('dist');
const pages=new Set(['capabilities','product','about','team','contact']);
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.mp4':'video/mp4','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ttf':'font/ttf'};
http.createServer((req,res)=>{
  let url,pathname;
  try{url=new URL(req.url,'http://localhost');pathname=decodeURIComponent(url.pathname)}catch{res.writeHead(400);return res.end('Bad request')}
  const legacy=/^\/(index|capabilities|product|about|team|contact)\.html$/.exec(pathname);
  let redirect=legacy?(legacy[1]==='index'?'/':`/${legacy[1]}/`):null;
  if(pages.has(pathname.slice(1)))redirect=pathname+'/';
  if(redirect){res.writeHead(308,{Location:redirect+url.search});return res.end()}
  const requested=pathname.endsWith('/')?pathname+'index.html':pathname;
  const file=path.resolve(root,'.'+requested);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
  fs.stat(file,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404);return res.end('Not found')}
    const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
    if(req.headers.range){const match=/bytes=(\d+)-(\d*)/.exec(req.headers.range);if(match){const start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),stat.size-1):stat.size-1;if(start>end){res.writeHead(416);return res.end()}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});return fs.createReadStream(file,{start,end}).pipe(res)}}
    res.writeHead(200,{...headers,'Content-Length':stat.size});fs.createReadStream(file).pipe(res)
  })
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
