const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const button=document.querySelector('.motion-toggle');
let motion=!reduced.matches;
try{if(sessionStorage.getItem('motion')==='off')motion=false}catch{}
const observed=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observed.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observed.observe(el));
function setMotion(value){motion=value;document.body.classList.toggle('motion-enabled',motion);document.body.classList.toggle('no-motion',!motion);button.setAttribute('aria-pressed',String(!motion));button.setAttribute('aria-label',motion?'Отключить анимацию':'Включить анимацию');button.querySelector('span').textContent=motion?'вкл':'выкл';if(!motion)document.querySelector('.explosion img').style.transform='none'}
setMotion(motion);
button.addEventListener('click',()=>{setMotion(!motion);try{sessionStorage.setItem('motion',motion?'on':'off')}catch{}});
reduced.addEventListener('change',e=>setMotion(!e.matches));
const progress=document.querySelector('.reading-progress'),up=document.querySelector('.back-top'),explosion=document.querySelector('.explosion img');
let scheduled=false;
function updateScroll(){const total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?Math.min(1,scrollY/total):0})`;up.classList.toggle('shown',scrollY>innerHeight);if(motion){const r=explosion.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0){const amount=Math.min(1,Math.max(0,(innerHeight-r.top)/(innerHeight+r.height)));explosion.style.transform=`scale(${.96+amount*.06})`}}scheduled=false}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll)}},{passive:true});addEventListener('resize',updateScroll);updateScroll();
up.addEventListener('click',()=>window.scrollTo({top:0,behavior:motion?'smooth':'instant'}));
