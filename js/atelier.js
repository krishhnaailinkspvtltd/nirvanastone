/* Original Shree Nirvan atelier motion layer, progressive enhancement only. */
(()=>{'use strict';
const loader=document.getElementById('atelier-loader');
const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let seen=false;try{seen=sessionStorage.getItem('sn-atelier-seen')==='1';sessionStorage.setItem('sn-atelier-seen','1')}catch{}
const end=()=>{if(!loader)return;loader.classList.add('is-leaving');setTimeout(()=>{loader.hidden=true;loader.setAttribute('aria-hidden','true')},420)};
if(loader){if(seen||prefersReduced){loader.hidden=true;loader.setAttribute('aria-hidden','true')}else{if(document.readyState==='complete')setTimeout(end,650);else addEventListener('load',()=>setTimeout(end,650),{once:true});setTimeout(end,1700);}}
const progress=document.createElement('div');progress.className='page-reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
let scrollQueued=false;const render=()=>{scrollQueued=false;const h=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.transform=`scaleX(${Math.max(0,Math.min(1,scrollY/h))})`;};addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(render)}},{passive:true});render();
// Nonessential mouse ambience is disabled on touch and reduced-motion devices.
if(!prefersReduced&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 document.querySelectorAll('.atelier-category-tile').forEach(el=>{el.addEventListener('pointermove',event=>{const rect=el.getBoundingClientRect();el.style.setProperty('--tx',((event.clientX-rect.left)/rect.width-.5).toFixed(2));el.style.setProperty('--ty',((event.clientY-rect.top)/rect.height-.5).toFixed(2))},{passive:true});el.addEventListener('pointerleave',()=>{el.style.setProperty('--tx',0);el.style.setProperty('--ty',0)})});
}
})();