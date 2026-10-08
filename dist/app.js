const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menu.innerHTML=open?'Close <span>−</span>':'Menu <span>+</span>'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){menu.click();menu.focus()}});
document.querySelector('.back-top')?.addEventListener('click',()=>{window.scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'});document.querySelector('.wordmark').focus({preventScroll:true})});
const movie=document.querySelector('#hero-video');
if(movie){movie.muted=true;movie.loop=true;movie.play().catch(()=>{});}
// Product films play only while visible; native controls remain available.
const showcaseFilms=[...document.querySelectorAll('[data-showcase-video]')];
const visibleFilms=new Set();const pausedFilms=new Set();
function playShowcase(video){const panel=video.closest('.product-panel');if(panel&&(!panel.classList.contains('is-active')||(video.classList.contains('motor-film')&&!panel.classList.contains('is-film'))))return;if(!document.hidden&&!reducedMotion.matches&&!pausedFilms.has(video))video.play().catch(()=>{});}
showcaseFilms.forEach(video=>{
  video.addEventListener('pause',()=>{if(visibleFilms.has(video)&&!document.hidden&&!reducedMotion.matches)pausedFilms.add(video)});
  video.addEventListener('play',()=>pausedFilms.delete(video));
});
const filmObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
  if(isIntersecting){visibleFilms.add(target);playShowcase(target)}
  else{visibleFilms.delete(target);target.pause()}
}),{threshold:.25});
showcaseFilms.forEach(video=>filmObserver.observe(video));
// Keep every product in one stage; selections preserve deep links and browser history.
const showroom=document.querySelector('.product-showcase');
if(showroom){
  const selector=showroom.querySelector('.product-selector');
  const tabs=[...selector.querySelectorAll('a')];
  const panels=[...showroom.querySelectorAll('.product-panel')];
  let current=0;
  showroom.classList.add('is-enhanced');selector.setAttribute('role','tablist');
  tabs.forEach((tab,i)=>{tab.setAttribute('role','tab');tab.setAttribute('aria-controls',panels[i].id);panels[i].setAttribute('role','tabpanel')});
  function syncFilms(){panels.forEach(panel=>panel.querySelectorAll('video').forEach(video=>{if(panel.classList.contains('is-active')&&(!video.classList.contains('motor-film')||panel.classList.contains('is-film'))){if(visibleFilms.has(video))playShowcase(video)}else{video.pause();pausedFilms.delete(video)}}))}
  function selectProduct(index,{history=false,focus=false}={}){
    current=(index+panels.length)%panels.length;
    panels.forEach((panel,i)=>{const active=i===current;panel.classList.toggle('is-active',active);panel.inert=!active;panel.setAttribute('aria-hidden',String(!active));tabs[i].setAttribute('aria-selected',String(active));tabs[i].tabIndex=active?0:-1});
    showroom.querySelector('[data-product-position]').textContent=`${current+1} / ${panels.length}`;
    if(history)window.history.pushState(null,'',`#${panels[current].id}`);
    if(focus)tabs[current].focus({preventScroll:true});
    syncFilms();
  }
  tabs.forEach((tab,i)=>{tab.addEventListener('click',e=>{e.preventDefault();selectProduct(i,{history:true})});tab.addEventListener('keydown',e=>{let index;if(e.key==='ArrowRight')index=current+1;else if(e.key==='ArrowLeft')index=current-1;else if(e.key==='Home')index=0;else if(e.key==='End')index=panels.length-1;else return;e.preventDefault();selectProduct(index,{history:true,focus:true})})});
  showroom.querySelectorAll('[data-product-step]').forEach(button=>button.addEventListener('click',()=>selectProduct(current+Number(button.dataset.productStep),{history:true})));
  showroom.querySelectorAll('[data-motor-view]').forEach(button=>button.addEventListener('click',()=>{const panel=button.closest('.product-panel');panel.classList.toggle('is-film',button.dataset.motorView==='film');panel.querySelectorAll('[data-motor-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));syncFilms()}));
  function selectHash(){const index=panels.findIndex(panel=>`#${panel.id}`===location.hash);selectProduct(index<0?0:index)}
  window.addEventListener('hashchange',selectHash);window.addEventListener('popstate',selectHash);selectHash();
}
const incubationMovie=document.querySelector('.incubation-main video');
const incubationCaption=document.querySelector('[data-incubation-caption]');
incubationMovie?.addEventListener('timeupdate',()=>{
  const t=incubationMovie.currentTime;
  incubationCaption.textContent=t<7||(t>=11&&t<18)?'IIT MADRAS RESEARCH PARK':'SPACEKAUR / ENGINEERING WORKBENCH';
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)showcaseFilms.forEach(video=>video.pause());else visibleFilms.forEach(playShowcase)});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)showcaseFilms.forEach(video=>video.pause());else visibleFilms.forEach(playShowcase)});
if(!reducedMotion.matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e))}
const layers=[...document.querySelectorAll('[data-parallax]')];let ticking=false;
function parallax(){if(!reducedMotion.matches)layers.forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const offset=Math.max(-90,Math.min(90,-r.top*Number(el.dataset.parallax)));el.style.transform=`translate3d(0,${offset}px,0)`}});ticking=false}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true}},{passive:true});parallax();
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const subject=`SpaceKaur enquiry: ${data.get('interest')}`;const body=`Name: ${data.get('name')}\nWork email: ${data.get('email')}\nOrganisation: ${data.get('organisation')}\n\n${data.get('message')}`;location.href=`mailto:info@spacekaur.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Your email draft is ready in your email app. Review and send it there. If it did not open, email info@spacekaur.com directly.'});
