import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './refinements.css'

const profile = {
  name: 'Vishwankit Pandhare',
  email: 'vishwankit.pandhare2026@vitstudent.ac.in',
  linkedin: 'https://www.linkedin.com/in/vishwankit-pandhare-75a908278/',
  github: 'https://github.com/vishwankitp',
}

const projects = [
  { id: 'media', number: '01', title: 'AI-Powered\nMedia Search', status: 'Prototype', tech: ['Python', 'CLIP ViT-L/14', 'FAISS', 'PyTorch', 'OpenCV'], desc: 'A local image and video indexing experiment built to explore semantic search across large media collections.', type: 'nodes' },
  { id: 'puzzle', number: '02', title: 'Word Puzzle &\nLeaderboard', status: 'Completed', tech: ['JavaScript', 'Supabase', 'HTML/CSS'], desc: 'Interactive word gameplay with validation and score recording—an exploration of game loops and data-backed leaderboards.', type: 'puzzle' },
  { id: 'portfolio', number: '03', title: 'This\nPortfolio', status: 'In Progress', tech: ['React', 'TypeScript', 'Canvas'], desc: 'An evolving home for work, experiments, and notes from the path into systems and security.', type: 'grid' },
]

function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!; const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0, mouse = { x: -500, y: -500 }, size = { w: 0, h: 0 }
    const dots = Array.from({ length: 55 }, (_, i) => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00035, vy: (Math.random() - .5) * .00035, r: i % 7 === 0 ? 2 : 1 }))
    const resize = () => { const box = canvas.getBoundingClientRect(); const dpr = devicePixelRatio; size = { w: box.width, h: box.height }; canvas.width = box.width * dpr; canvas.height = box.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const draw = () => { ctx.clearRect(0, 0, size.w, size.h); dots.forEach(d => { if (!reduced) { d.x += d.vx; d.y += d.vy; if (d.x < 0 || d.x > 1) d.vx *= -1; if (d.y < 0 || d.y > 1) d.vy *= -1 } });
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) { const a = dots[i], b = dots[j], ax = a.x * size.w, ay = a.y * size.h, bx = b.x * size.w, by = b.y * size.h, dist = Math.hypot(ax-bx, ay-by); if (dist < 145) { ctx.strokeStyle = `rgba(200,255,0,${.13 * (1-dist/145)})`; ctx.lineWidth = .6; ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke() } }
      dots.forEach(d => { const x=d.x*size.w,y=d.y*size.h, nearby=Math.hypot(x-mouse.x,y-mouse.y)<110; ctx.fillStyle=nearby?'#d8ff48':'#b9d2a6';ctx.beginPath();ctx.arc(x,y,nearby?d.r+1:d.r,0,Math.PI*2);ctx.fill() }); raf=requestAnimationFrame(draw) }
    const move=(e:PointerEvent)=>{const b=canvas.getBoundingClientRect();mouse={x:e.clientX-b.left,y:e.clientY-b.top}}
    resize(); draw(); addEventListener('resize', resize); canvas.addEventListener('pointermove', move)
    return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);canvas.removeEventListener('pointermove',move)}
  }, [])
  return <canvas ref={ref} className="network" aria-hidden="true" />
}

function ProjectGraphic({ type }: { type: string }) { return <div className={`project-graphic ${type}`} aria-hidden="true">
  {type === 'nodes' && <><i/><i/><i/><i/><i/><b>query</b><em>index</em></>}
  {type === 'puzzle' && <div className="tiles">{['S','Y','S','T','E','M'].map((x,i)=><span key={i}>{x}</span>)}</div>}
  {type === 'circuit' && <><div className="chip">MEGA</div><i/><i/><i/><span className="wire w1"/><span className="wire w2"/></>}
  {type === 'grid' && <><strong>VP</strong><span/><span/><span/><span/></>}
</div> }

function App() {
  const [menu, setMenu] = useState(false); const [headerHidden, setHeaderHidden] = useState(false)
  useEffect(()=>{ const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')), {threshold:.13}); document.querySelectorAll('.reveal').forEach(e=>obs.observe(e)); return()=>obs.disconnect() },[])
  useEffect(()=>{document.body.classList.toggle('menu-open',menu);return()=>document.body.classList.remove('menu-open')},[menu])
  useEffect(()=>{let last=scrollY; const onScroll=()=>{const current=scrollY;setHeaderHidden(current>120&&current>last);last=current};addEventListener('scroll',onScroll,{passive:true});return()=>removeEventListener('scroll',onScroll)},[])
  const scroll = (id:string) => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenu(false) }
  return <>
    <header className={headerHidden&&!menu?'header-hidden':''}><a className="mark" href="#top" aria-label="Home">VP<span>.</span></a><button className="menu" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation"><i/><i/></button><nav className={menu?'open':''}>{['about','work','education','contact'].map(x=><button key={x} onClick={()=>scroll(x)}>/{x}</button>)}</nav></header>
    <main id="top">
      <section className="hero"><NetworkCanvas/><div className="hero-orbit" aria-hidden="true"><div className="orbit-ring"/><div className="orbit-dot dot-a"/><div className="orbit-dot dot-b"/><strong>VP</strong><span>BUILD<br/>LEARN<br/>REPEAT</span></div><div className="hero-copy"><p className="eyebrow">VISHWANKIT PANDHARE · VIT VELLORE · CSE CYBERSECURITY / 01</p><h1><span>Curious about</span><span className="lime">systems.</span><span>Driven to build.</span></h1><p className="intro">I’m Vishwankit Pandhare—a first-year engineer exploring what makes software, hardware, and networks tick.</p><button className="cta" onClick={()=>scroll('work')}>Explore projects <span>↓</span></button></div><div className="hero-foot"><span>SCROLL TO DISCOVER</span><span>2026—PRESENT</span></div></section>
      <section id="about" className="about section"><p className="eyebrow reveal">/ ABOUT</p><div className="about-grid"><h2 className="reveal">Learning at the <em>intersection</em> of code, systems, and curiosity.</h2><div className="about-copy reveal"><p>I’m a B.Tech CSE (Cybersecurity) student at VIT Vellore. I’m drawn to the layers beneath an interface—from the models that make an image searchable to the networks that move information.</p><p>Right now, I’m building my foundations in cybersecurity, software development, AI, computer systems, and hardware.</p><div className="interests"><span>Security</span><span>Software</span><span>AI</span><span>Systems</span><span>Hardware</span></div></div></div></section>
      <section className="marquee" aria-label="Areas of interest"><div>CYBERSECURITY <b>✦</b> ARTIFICIAL INTELLIGENCE <b>✦</b> SYSTEMS THINKING <b>✦</b> BUILDING IN PUBLIC <b>✦</b></div></section>
      <section id="work" className="work section"><div className="section-head reveal"><p className="eyebrow">/ SELECTED WORK</p><p>Ideas in motion—some complete, some actively evolving.</p></div><div className="projects">{projects.map(p=><article className="project reveal" key={p.id}><div className="project-top"><span>{p.number}</span><span className={`status ${p.status.toLowerCase().replace(' ','-')}`}>{p.status}</span></div><div className="project-main"><div><h3>{p.title.split('\n').map((x,i)=><span key={i}>{x}</span>)}</h3><p>{p.desc}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div></div><ProjectGraphic type={p.type}/></div></article>)}</div></section>
      <section className="skills section"><p className="eyebrow reveal">/ TOOLKIT</p><div className="skills-layout"><h2 className="reveal">Tools for <em>thinking</em> and making.</h2><div className="skill-columns reveal"><div><small>WORKING WITH</small><p>Python<br/>JavaScript<br/>HTML / CSS<br/>CLIP · FAISS<br/>PyTorch · OpenCV<br/>Arduino</p></div><div><small>LEARNING NOW</small><p>Data structures<br/>& algorithms<br/>Object-oriented<br/>programming<br/>Linux · networking<br/>Cybersecurity</p></div></div></div></section>
      <section id="education" className="education section"><p className="eyebrow reveal">/ EDUCATION</p><div className="timeline reveal"><div><span>2026—Present</span><div className="school-name"><img className="school-logo vit-logo" src="/education/vit-logo.png" alt="Vellore Institute of Technology logo"/><h3>VIT Vellore</h3></div><p>B.Tech CSE (Cybersecurity)</p></div><div><span>—2026</span><div className="school-name"><img className="school-logo dps-logo" src="/education/dps-logo.png" alt="Delhi Public School logo"/><h3>Delhi Public School</h3></div><p>Completed Class XII</p></div></div></section>
    </main>
    <footer id="contact"><div><p className="eyebrow">/ CONTACT ME</p><h2>Let’s build<br/><em>something curious.</em></h2><a className="footer-email" href={`mailto:${profile.email}`}>{profile.email} <span>↗</span></a></div><div className="footer-right"><div className="socials"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div><p>© 2026 Vishwankit Pandhare<br/>Designed & built with intent.</p></div></footer>
  </>
}
createRoot(document.getElementById('root')!).render(<App />)
