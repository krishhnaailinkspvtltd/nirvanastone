/* Shree Nirvan | Original cinematic interface v5
   Visual interaction references: Carysil collection storytelling, GSAP ScrollTrigger,
   Lenis smooth scrolling, Three.js and Codrops experiments. No copied site assets/code.
   Core content and commerce deliberately work even when third-party CDNs are blocked.
*/
(()=>{'use strict';
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=matchMedia('(hover:none), (pointer:coarse)').matches;
const saveData=Boolean(navigator.connection?.saveData);
const home=document.body.dataset.page==='home';
const galleryItems=[
 {eyebrow:'01 / NEW PERSPECTIVES',title:'A world of<br><em>colour.</em>',desc:'Gemstones chosen for their beauty, character and personal stories.',img:'assets/cinematic/film-gemstone.webp',link:'shop.html?category=Gemstones',button:'Discover gemstones'},
 {eyebrow:'02 / THE CELESTIAL EDIT',title:'Find your<br><em>constellation.</em>',desc:'Twelve signs. Twelve personalities. A little piece of your story.',img:'assets/cinematic/film-zodiac.webp',link:'zodiac.html',button:'Explore your zodiac'},
 {eyebrow:'03 / MEANINGFUL DETAILS',title:'A new kind<br>of <em>ritual.</em>',desc:'Beautiful devotional objects and keepsakes with enduring meaning.',img:'assets/cinematic/film-ritual.webp',link:'shop.html?category=Pooja%20Essentials',button:'Explore ritual objects'}
];
const icon=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7"/></svg>`;
function updateLoader(){const root=$('#atelier-loader');if(!root)return;
 root.classList.add('cinema-loader');root.insertAdjacentHTML('beforeend',`<div class="cinema-curtain" aria-hidden="true"><i></i><i></i></div><div class="cinema-loader-count" aria-hidden="true">00</div><p class="cinema-loader-sub">THE ART OF THE EXTRAORDINARY</p>`);
 let seenMotion=false;try{seenMotion=sessionStorage.getItem('sn-cinema-motion-seen')==='1'}catch{}if(!reduced&&!seenMotion){
   let start=performance.now();const count=$('.cinema-loader-count',root);
   let id=0;const tick=t=>{if(!root.isConnected||root.hidden)return;count.textContent=String(Math.min(100,Math.floor((t-start)/10))).padStart(2,'0');if(!root.classList.contains('is-leaving'))id=requestAnimationFrame(tick)};
   id=requestAnimationFrame(tick);setTimeout(()=>cancelAnimationFrame(id),1800);
 }
 try{sessionStorage.setItem('sn-cinema-motion-seen','1')}catch{}
}
function buildHome(){const mount=$('#page-main');if(!mount)return;
 const hero=$('.atelier-hero',mount);
 if(hero){hero.classList.add('cinematic-hero');hero.insertAdjacentHTML('beforeend',`<div class="cinema-hero-index" aria-hidden="true">SN / 001 <span>✺</span> THE NEW EDITION</div>`)}
 const marquee=$('.atelier-marquee',mount);
 if(marquee)marquee.insertAdjacentHTML('afterend',`<section class="cinema-film" aria-roledescription="carousel" aria-label="Explore Shree Nirvan collections" id="discover-film"><div class="cinema-film-stages">${galleryItems.map((s,i)=>`<article class="cinema-film-slide ${i===0?'is-current':''}" data-film-slide="${i}" aria-hidden="${i!==0}"><div class="cinema-film-backdrop" style="background-image:url('${s.img}')"></div><div class="cinema-film-vignette"></div><div class="cinema-film-content container"><span class="cinema-eyebrow">${s.eyebrow}</span><h2>${s.title}</h2><p>${s.desc}</p><a class="cinema-film-button" href="${s.link}" ${i!==0?'tabindex="-1"':''}>${s.button} ${icon}</a></div></article>`).join('')}</div><div class="cinema-film-ui"><span class="cinema-film-left">SHREE NIRVAN — COLLECTION STORIES</span><div class="cinema-film-controls" role="group" aria-label="Select a collection story"><button type="button" data-film-prev aria-label="Previous collection">←</button><span class="cinema-film-position"><b id="cinema-film-number">01</b> / 03</span><button type="button" data-film-next aria-label="Next collection">→</button></div><div class="cinema-film-progress" aria-hidden="true"><i></i></div></div></section>`);
 const note=$('.atelier-note-section',mount);
 if(note)note.insertAdjacentHTML('afterend',`<section class="cinema-manifesto" id="cinema-manifesto"><div class="container"><span class="cinema-section-id">01.5 / MORE THAN MEETS THE EYE</span><p class="cinema-manifesto-words" data-reveal-words>Some things are beautiful to look at. <em>Others become part of who we are.</em></p><div class="cinema-manifesto-bottom"><span>Discover the objects that feel like you.</span><a href="shop.html" class="cinema-text-link">EXPLORE THE EDIT ${icon}</a></div></div></section>`);
 const cats=$('.atelier-categories',mount);
 if(cats)cats.insertAdjacentHTML('afterend',`<section class="cinema-dimension" id="cinema-dimension"><div class="container cinema-dimension-grid"><div class="cinema-dimension-content"><span class="cinema-section-id">THE ATELIER / 02</span><h2>Nature made<br><em>extraordinary.</em></h2><p>Every facet catches the light differently. Move through a quieter world of colour, craft and possibility.</p><a href="shop.html?category=Gemstones" class="cinema-text-link">VIEW THE GEMSTONE EDIT ${icon}</a><span class="cinema-micro-copy">AN INTERACTIVE SCULPTURAL STUDY</span></div><div class="cinema-dimension-art" id="dimension-art"><span class="cinema-dimension-orbit orbit-one" aria-hidden="true"></span><span class="cinema-dimension-orbit orbit-two" aria-hidden="true"></span><div class="cinema-dimension-fallback"><img src="assets/photography/feature-0038.webp" alt="Green gemstone bracelet product photograph" loading="lazy"></div><div class="cinema-dimension-canvas" id="gemstone-webgl" role="img" aria-label="A slowly rotating three-dimensional crystalline gemstone sculpture"></div><span class="cinema-dimension-corner">N° 03 <br> LIGHT STUDY</span><span class="cinema-dimension-star" aria-hidden="true">✳</span></div></div></section>`);
 const featured=$('.atelier-featured',mount);
 if(featured)featured.insertAdjacentHTML('afterend',`<section class="cinema-lookbook" id="cinema-lookbook"><div class="container cinema-lookbook-intro"><div><span class="cinema-section-id">A DIFFERENT WAY TO DISCOVER / 04</span><h2>Curated for <em>curiosity.</em></h2></div><p>Scroll through moments, materials and little pieces of wonder. Explore the collections that stay with you.</p></div><div class="cinema-lookbook-viewport" id="lookbook-viewport"><div class="cinema-lookbook-track" id="lookbook-track">${[
  {img:'assets/photography/feature-0076.webp',title:'The first light',copy:'JEWELLERY & ADORNMENT',link:'shop.html?category=Jewellery'},
  {img:'assets/photography/feature-0038.webp',title:'Colour stories',copy:'GEMSTONES & MINERALS',link:'shop.html?category=Gemstones'},
  {img:'assets/zodiac/scorpio.webp',title:'Written in stars',copy:'ZODIAC & PERSONAL SYMBOLS',link:'zodiac.html'},
  {img:'assets/photography/feature-0398.webp',title:'Treasured rituals',copy:'THE DEVOTIONAL COLLECTION',link:'shop.html?category=Pooja%20Essentials'},
  {img:'assets/photography/feature-0023.webp',title:'Made to keep',copy:'THOUGHTFUL GIFTING',link:'shop.html?category=Gift%20Sets'}
 ].map((s,i)=>`<a class="cinema-lookbook-card" href="${s.link}"><span class="cinema-card-counter">0${i+1} / 05</span><img src="${s.img}" alt="${s.title} collection photography" loading="lazy"><span class="cinema-lookbook-shade"></span><span class="cinema-lookbook-label"><small>${s.copy}</small><strong>${s.title}</strong><span>${icon}</span></span></a>`).join('')}</div></div><div class="container cinema-lookbook-bottom"><span>THE SHREE NIRVAN LOOKBOOK</span><span>DRAG OR SCROLL TO EXPLORE →</span></div></section>`);
}
function setupFilm(){const film=$('.cinema-film');if(!film)return;let index=0, interval=null, visible=true;const slides=$$('[data-film-slide]',film),position=$('#cinema-film-number',film),progress=$('.cinema-film-progress i',film);
 function go(next){if(next===index||!slides.length)return;index=(next+slides.length)%slides.length;slides.forEach((s,i)=>{s.classList.toggle('is-current',i===index);s.setAttribute('aria-hidden',String(i!==index));$('a',s)?.setAttribute('tabindex',i===index?'0':'-1')});position.textContent=String(index+1).padStart(2,'0');progress.classList.remove('running');void progress.offsetWidth;if(interval&&!reduced)progress.classList.add('running')}
 function start(){if(interval||reduced||!visible)return;interval=setInterval(()=>go(index+1),7500);progress.classList.add('running')}
 function stop(){clearInterval(interval);interval=null;progress.classList.remove('running')}
 $('[data-film-next]',film)?.addEventListener('click',()=>{stop();go(index+1);start()});$('[data-film-prev]',film)?.addEventListener('click',()=>{stop();go(index-1);start()});film.addEventListener('mouseenter',stop);film.addEventListener('mouseleave',start);film.addEventListener('focusin',stop);film.addEventListener('focusout',start);document.addEventListener('visibilitychange',()=>document.hidden?stop():start());const obs=new IntersectionObserver(es=>{visible=es[0]?.isIntersecting;if(visible)start();else stop()},{threshold:.13});obs.observe(film);
}
function setupNativeMotion(){if(reduced)return;
 const targets=$$('.cinema-section-id,.cinema-dimension-content h2,.cinema-dimension-content p,.cinema-lookbook-intro h2,.cinema-film-content h2');
 targets.forEach(el=>el.classList.add('cinema-enter'));
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('cinema-entered');io.unobserve(e.target)}}),{threshold:.12});targets.forEach(el=>io.observe(el));
 const words=$('[data-reveal-words]');if(words){const tokens=words.innerHTML.trim().split(/(\s+)/);words.innerHTML=tokens.map(x=>/^\s+$/.test(x)?x:`<span class="cinema-word">${x}</span>`).join('');const ws=$$('.cinema-word',words);
   let active=false;const update=()=>{if(!active)return;const r=words.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight*.85-r.top)/(Math.max(1,r.height)+innerHeight*.4)));const max=Math.ceil(progress*ws.length);ws.forEach((w,i)=>w.classList.toggle('lit',i<max))};const obs=new IntersectionObserver(es=>{active=es[0].isIntersecting;if(active)update()},{rootMargin:'15% 0px 15% 0px'});obs.observe(words);addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});update();
 }
 const rail=$('#lookbook-track'),viewport=$('#lookbook-viewport');if(rail&&viewport&&!coarse){let pointer=false,x=0,left=0;viewport.addEventListener('pointerdown',e=>{if(e.target.closest('a,button'))return;pointer=true;x=e.clientX;left=rail.scrollLeft;viewport.setPointerCapture(e.pointerId)});viewport.addEventListener('pointermove',e=>{if(pointer)rail.scrollLeft=left-(e.clientX-x)});viewport.addEventListener('pointerup',()=>pointer=false);}
}
function script(src,timeout=4000){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=()=>resolve();s.onerror=()=>reject(new Error('motion CDN unavailable'));document.head.append(s);setTimeout(()=>reject(new Error('motion CDN timed out')),timeout)});}
async function setupGsap(){if(reduced||saveData)return;
 try{await script('https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js');await script('https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js');if(!window.gsap||!window.ScrollTrigger)return;
 const gsap=window.gsap;gsap.registerPlugin(window.ScrollTrigger);
 // A pinned, non-jarring cinematic image gallery on wide screens, native overflow elsewhere.
 const view=$('#lookbook-viewport'),track=$('#lookbook-track');
 if(view&&track&&matchMedia('(min-width: 1050px) and (prefers-reduced-motion: no-preference)').matches){const distance=()=>Math.max(0,track.scrollWidth-view.clientWidth);
  gsap.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:'.cinema-lookbook',start:'top top',end:()=>'+='+Math.max(400,distance()),scrub:1,pin:true,anticipatePin:1,invalidateOnRefresh:true}});
 }
 $$('.atelier-category-tile').forEach(el=>{const img=$('img',el);if(img)gsap.fromTo(img,{scale:1.14,yPercent:-4},{scale:1.01,yPercent:4,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.6}})});
 const scene=$('#atelier-scene');if(scene)gsap.to(scene,{yPercent:9,rotate:2,ease:'none',scrollTrigger:{trigger:'.atelier-hero',start:'top top',end:'bottom top',scrub:1}});
 const pic=$('.atelier-story-image img');if(pic)gsap.fromTo(pic,{yPercent:-8,scale:1.08},{yPercent:7,scale:1.08,ease:'none',scrollTrigger:{trigger:'.atelier-story',start:'top bottom',end:'bottom top',scrub:1}});
 // Scrub the gemstone showroom turn subtly with scroll; no heavy pinned WebGL canvas.
 const sculpture=$('#dimension-art');if(sculpture)gsap.fromTo(sculpture,{rotate:-5,y:40},{rotate:4,y:-20,ease:'none',scrollTrigger:{trigger:'.cinema-dimension',start:'top bottom',end:'bottom top',scrub:1}});
 // Lenis is optional and disabled for mobile / reduced-motion / data saver.
 if(!coarse){try{await script('https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js',3800);if(window.Lenis){const smooth=new window.Lenis({lerp:.09,smoothWheel:true,wheelMultiplier:.88});window.__SN_LENIS=smooth;smooth.on('scroll',()=>window.ScrollTrigger.update());gsap.ticker.add(t=>smooth.raf(t*1000));gsap.ticker.lagSmoothing(0)}}catch{}}
 }catch{ /* Native scroll and CSS animations remain fully functional. */ }
}
async function setupThreeScene(){const stage=$('#gemstone-webgl');if(!stage||reduced||saveData||coarse)return;
 if(!window.WebGLRenderingContext)return;const watcher=new IntersectionObserver(async entries=>{if(!entries[0]?.isIntersecting)return;watcher.disconnect();
  try{const THREE=await Promise.race([import('https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js'),new Promise((_,reject)=>setTimeout(()=>reject(new Error('WebGL import timeout')),6000))]);
   const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(0,0,5.6);
   const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;stage.append(renderer.domElement);
   const group=new THREE.Group();scene.add(group);
   const geometry=new THREE.IcosahedronGeometry(1.55,1);
   const pos=geometry.attributes.position;for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i);pos.setXYZ(i,x*(1+.03*Math.sin(3*y)),y*1.28,z*(1+.02*Math.cos(5*x)));}geometry.computeVertexNormals();
   const material=new THREE.MeshPhysicalMaterial({color:0x8f57c3,metalness:.2,roughness:.09,transparent:true,opacity:.91,clearcoat:1,clearcoatRoughness:.08,flatShading:true,side:THREE.DoubleSide});
   const gem=new THREE.Mesh(geometry,material);group.add(gem);
   const edge=new THREE.LineSegments(new THREE.EdgesGeometry(geometry,26),new THREE.LineBasicMaterial({color:0xf6d8ff,transparent:true,opacity:.45}));edge.scale.setScalar(1.008);group.add(edge);
   scene.add(new THREE.AmbientLight(0xf7e5ff,1.5));const key=new THREE.PointLight(0xffdb9a,65,20);key.position.set(-3,4,4);scene.add(key);const rim=new THREE.PointLight(0xb5adff,60,20);rim.position.set(3,-2,-3);scene.add(rim);
   const ringMat=new THREE.MeshBasicMaterial({color:0xf2d49c,transparent:true,opacity:.32,side:THREE.DoubleSide});
   const ring=new THREE.Mesh(new THREE.TorusGeometry(2.18,.009,8,120),ringMat);ring.rotation.x=.44;group.add(ring);
   let mounted=true,visible=true,frame=0;const size=()=>{if(!mounted)return;const b=stage.getBoundingClientRect();if(b.width===0||b.height===0)return;renderer.setSize(b.width,b.height,false);camera.aspect=b.width/b.height;camera.updateProjectionMatrix()};size();const resizeObserver=new ResizeObserver(size);resizeObserver.observe(stage);
   const visibilityObserver=new IntersectionObserver(es=>visible=es[0].isIntersecting,{threshold:.02});visibilityObserver.observe(stage);
   const loop=t=>{if(!mounted)return;if(visible&&!document.hidden){group.rotation.y=t*.00023;group.rotation.z=Math.sin(t*.00035)*.09;ring.rotation.y=t*.00032;renderer.render(scene,camera)}frame=requestAnimationFrame(loop)};frame=requestAnimationFrame(loop);
   stage.classList.add('is-ready');window.addEventListener('pagehide',()=>{mounted=false;cancelAnimationFrame(frame);resizeObserver.disconnect();visibilityObserver.disconnect();geometry.dispose();material.dispose();renderer.dispose()},{once:true});
  }catch(e){stage.classList.add('cinema-webgl-unavailable');}
 },{rootMargin:'120px'});watcher.observe(stage);
}
function init(){updateLoader();if(home){buildHome();setupFilm()}setupNativeMotion();
 // Need a frame for the existing render() to settle before GSAP measures pinned dimensions.
 if(!reduced)requestAnimationFrame(()=>{setupGsap();setupThreeScene()});
}
if(document.readyState==='loading')addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
