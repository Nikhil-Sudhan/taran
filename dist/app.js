const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menu.innerHTML=open?'Close <span>−</span>':'Menu <span>+</span>'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){menu.click();menu.focus()}});
document.querySelector('.back-top')?.addEventListener('click',()=>{window.scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'});document.querySelector('.wordmark').focus({preventScroll:true})});
const movie=document.querySelector('#hero-video');
if(movie){movie.muted=true;movie.loop=true;movie.play().catch(()=>{});}
// Films play while visible without playback controls; the ten-second incubation film loops continuously.
const showcaseFilms=[...document.querySelectorAll('[data-showcase-video]')];
const visibleFilms=new Set();const pausedFilms=new Set();
function playShowcase(video){if(video.ended&&!video.loop)return;if(!document.hidden&&!reducedMotion.matches&&!pausedFilms.has(video))video.play().catch(()=>{});}
showcaseFilms.forEach(video=>{
  video.addEventListener('pause',()=>{if(visibleFilms.has(video)&&!document.hidden&&!reducedMotion.matches)pausedFilms.add(video)});
  video.addEventListener('play',()=>pausedFilms.delete(video));
});
const filmObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
  if(isIntersecting){visibleFilms.add(target);playShowcase(target)}
  else{visibleFilms.delete(target);target.pause()}
}),{threshold:.25});
showcaseFilms.forEach(video=>filmObserver.observe(video));
const incubationMovie=document.querySelector('.incubation-main video');
const incubationCaption=document.querySelector('[data-incubation-caption]');
incubationMovie?.addEventListener('timeupdate',()=>{
  const t=incubationMovie.currentTime;
  incubationCaption.textContent=t<5?'IIT MADRAS RESEARCH PARK':'SPACEKAUR / ENGINEERING WORKBENCH';
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)showcaseFilms.forEach(video=>video.pause());else visibleFilms.forEach(playShowcase)});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)showcaseFilms.forEach(video=>video.pause());else visibleFilms.forEach(playShowcase)});
if(!reducedMotion.matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e))}
const layers=[...document.querySelectorAll('[data-parallax]')];let ticking=false;
function parallax(){if(!reducedMotion.matches)layers.forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const offset=Math.max(-90,Math.min(90,-r.top*Number(el.dataset.parallax)));el.style.transform=`translate3d(0,${offset}px,0)`}});ticking=false}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true}},{passive:true});parallax();
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const subject=`SpaceKaur enquiry: ${data.get('interest')}`;const body=`Name: ${data.get('name')}\nWork email: ${data.get('email')}\nOrganisation: ${data.get('organisation')}\n\n${data.get('message')}`;location.href=`mailto:info@spacekaur.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Your email draft is ready in your email app. Review and send it there. If it did not open, email info@spacekaur.com directly.'});
