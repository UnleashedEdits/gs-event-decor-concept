'use strict';
const b = window.business;
const $ = s => document.querySelector(s);
const safe = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const imageApproved = image => (image?.approved === true || (!b.publication.approved && image?.previewAuthorized === true)) && image.src && image.alt;
const projects = b.projects.filter(p=>p.approved);
for(const [key,value] of Object.entries(b.colors)) document.documentElement.style.setProperty({'background':'--bg','text':'--text','accent':'--accent','night':'--night','gold':'--gold','hero':'--hero'}[key],value);
document.querySelectorAll('[data-name]').forEach(el=>el.textContent=b.name);
document.querySelectorAll('[data-descriptor]').forEach(el=>el.textContent=b.descriptor);
document.querySelectorAll('[data-area]').forEach(el=>el.textContent=b.serviceArea);
document.querySelectorAll('[data-concept-label]').forEach(el=>{el.textContent=b.publication.conceptLabel||'';el.hidden=b.publication.approved||!b.publication.conceptLabel;});
document.querySelectorAll('[data-instagram]').forEach(el=>{el.href=b.contacts.instagram;el.rel='noopener noreferrer';});
$('#headline').innerHTML=b.headline.split('\n').map(line=>`<span class="headline-line">${safe(line)}</span>`).join('');
$('#intro').textContent=b.description;
if(imageApproved(b.images.hero)) {
 const sides=(b.images.heroSides||[]).filter(imageApproved);
 const images=[sides[0],b.images.hero,sides[1]].filter(Boolean);
 $('#hero-visual').insertAdjacentHTML('afterbegin',`<div class="hero-photo-strip">${images.map(i=>`<img class="${i===b.images.hero?'hero-main':'hero-side'}" src="${safe(i.src)}" alt="${safe(i.alt)}" width="720" height="1280" fetchpriority="${i===b.images.hero?'high':'auto'}">`).join('')}</div>`);
 $('.editorial-art').hidden=true;
 $('.visual-work-link').href=b.contacts.instagram;
 $('.visual-work-link').innerHTML='Explore the work on Instagram <span aria-hidden="true">↗</span>';
}
if(imageApproved(b.images.logo)) $('.brand').innerHTML=`<img src="${safe(b.images.logo.src)}" alt="${safe(b.images.logo.alt)}" width="72" height="72">`;
if(imageApproved(b.images.detail)){ $('#detail-visual').innerHTML=`<img src="${safe(b.images.detail.src)}" alt="${safe(b.images.detail.alt)}" width="700" height="900" loading="lazy">`;$('#detail-visual').removeAttribute('aria-hidden'); }
$('#about-title').textContent=b.about.title;$('#about-text').textContent=b.about.text;$('#about-approach').textContent=b.about.approach;
$('#service-list').innerHTML=b.services.map((s,i)=>`<details><summary>${safe(s.name)}<span class="service-summary">${safe(s.text)}</span></summary><div class="service-body"><p>${safe(s.detail)}</p><a class="text-link" href="#contact" data-occasion="${safe(s.id)}">Enquire about ${safe(s.name.toLowerCase())} ↗</a></div></details>`).join('');
$('#steps').innerHTML=b.process.map(([title,text],i)=>`<div class="step"><h3>${safe(title)}</h3><p>${safe(text)}</p></div>`).join('');
$('#faq-list').innerHTML=b.faqs.map(([q,a])=>`<details><summary>${safe(q)}</summary><p>${safe(a)}</p></details>`).join('');
$('#projects').innerHTML=projects.map((p,i)=>{const photo=p.images.find(imageApproved);return `<button class="project-card" data-project="${safe(p.id)}" aria-label="Open image ${i+1} of ${projects.length}: ${safe(p.title)}"><img src="${safe(photo.src)}" alt="${safe(photo.alt)}" width="941" height="1672" loading="lazy"><span class="carousel-caption"><span class="caption-category">${safe(p.label)}</span><strong>${safe(p.title)}</strong><span class="caption-arrow" aria-hidden="true">↗</span></span></button>`;}).join('');
const track=$('#projects');
function carouselIndex(){const cards=[...track.children];return cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-track.offsetLeft-track.scrollLeft)<Math.abs(cards[best].offsetLeft-track.offsetLeft-track.scrollLeft)?i:best,0);}
function updateCarousel(){const i=carouselIndex();$('#work-prev').disabled=track.scrollLeft<2;$('#work-next').disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2;$('#carousel-status').textContent=`Image ${i+1} of ${projects.length}`;}
function moveCarousel(direction){const cards=[...track.children];const i=Math.max(0,Math.min(cards.length-1,carouselIndex()+direction));track.scrollTo({left:cards[i].offsetLeft-track.offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
$('#work-prev').addEventListener('click',()=>moveCarousel(-1));$('#work-next').addEventListener('click',()=>moveCarousel(1));
track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();moveCarousel(e.key==='ArrowRight'?1:-1);}});
let scrollTimer;track.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(updateCarousel,120);},{passive:true});window.addEventListener('resize',updateCarousel);requestAnimationFrame(updateCarousel);
$('#projects').addEventListener('click',e=>{const card=e.target.closest('[data-project]');if(!card)return;const p=projects.find(p=>p.id===card.dataset.project);$('#project-content').innerHTML=`<span class="eyebrow">${safe(p.label)}</span><h2 id="project-title">${safe(p.title)}</h2><p>${safe(p.description)}</p><div class="gallery">${p.images.filter(imageApproved).map(i=>`<figure><img src="${safe(i.src)}" alt="${safe(i.alt)}" width="900" height="700" loading="lazy"><figcaption>${safe(i.alt)}${i.originalSrc?` · <a class="text-link" href="${safe(i.originalSrc)}">View original photo ↗</a>`:''}</figcaption></figure>`).join('')}</div><a class="button" href="${safe(p.source)}" rel="noopener noreferrer">View the event on Instagram ↗</a><a class="text-link gallery-contact" href="#contact" data-occasion="${safe(p.category)}">Enquire about your occasion ↗</a>`;$('#project-dialog').showModal();});
let menuOpen=false;
function setMenu(open){menuOpen=open;$('#navigation').classList.toggle('open',open);$('.menu-toggle').classList.toggle('is-open',open);$('.menu-toggle').setAttribute('aria-expanded',String(open));$('.menu-toggle').setAttribute('aria-label',open?'Close menu':'Open menu');}
$('.menu-toggle').addEventListener('click',()=>setMenu(!menuOpen));
$('#navigation').addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){setMenu(false);$('.menu-toggle').focus();}});
document.querySelectorAll('dialog').forEach(dialog=>dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close()));
$('#occasion').insertAdjacentHTML('beforeend',b.services.map(s=>`<option value="${safe(s.id)}">${safe(s.name)}</option>`).join(''));
function updateMessage(){const occasion=b.services.find(s=>s.id===$('#occasion').value)?.name.toLowerCase()||'event decor';const date=$('#date').value;const venue=$('#venue').value.trim();$('#message-preview').value=`Hi ${b.name}, I’d like to check availability for ${occasion}${date?' on '+date:''}${venue?' at '+venue:''}. Could we discuss decor options and a quote? Thank you!`;$('#copy-status').textContent='Copy, then paste into your Instagram conversation. Nothing is sent from this page.';}
['occasion','date','venue'].forEach(id=>$('#'+id).addEventListener('input',updateMessage));updateMessage();
document.addEventListener('click',e=>{const link=e.target.closest('[data-occasion]');if(!link)return;$('#occasion').value=link.dataset.occasion;updateMessage();if($('#project-dialog').open)$('#project-dialog').close();});
window.addEventListener('pageshow',()=>requestAnimationFrame(updateMessage));
$('#copy-message').addEventListener('click',async()=>{updateMessage();try{await navigator.clipboard.writeText($('#message-preview').value);$('#copy-status').textContent='Message copied. Open Instagram, tap Message, then paste and send when ready.';}catch{$('#message-preview').focus();$('#message-preview').select();$('#copy-status').textContent='Select and copy the message above, then paste it into Instagram.';}});
$('#copyright').textContent=`© ${new Date().getFullYear()} ${b.name} · ${b.serviceArea}`;
document.title=`${b.name} | Wedding & Event Decor · ${b.serviceArea}`;
$('meta[name="description"]').content=b.description;$('meta[property="og:title"]').content=document.title;$('meta[property="og:description"]').content=b.description;$('meta[name="theme-color"]').content=b.colors.background;
// Preview stays noindex. Launch requires coordinated HTML, robots and owner approval review.
$('meta[name="robots"]').content='noindex,nofollow';
// Quiet ornamental geometry; the event photographs remain the focal point.
$('.hero').insertAdjacentHTML('afterbegin',`<div class="hero-ornament" aria-hidden="true"><svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width=".7"><circle cx="100" cy="100" r="90"/><circle cx="100" cy="100" r="65"/>${Array.from({length:12},(_,i)=>`<ellipse cx="100" cy="63" rx="16" ry="46" transform="rotate(${i*30} 100 100)"/>`).join('')}<circle cx="100" cy="100" r="12"/></svg></div>`);

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(!reducedMotion.matches && 'IntersectionObserver' in window){
 const entrances=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.replace('entrance-pending','entrance-ready');entrances.unobserve(entry.target);}}},{threshold:.08});
 document.querySelectorAll('.section-heading,.service-layout,.about-art,.about-copy,.step,.faq>div,.contact-layout>div').forEach(el=>{el.classList.add('entrance-pending');entrances.observe(el);});
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){entrances.disconnect();document.querySelectorAll('.entrance-pending').forEach(el=>el.classList.remove('entrance-pending'));}});
}
