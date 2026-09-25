'use client'

import { useState } from 'react'

const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  Globe2,
  GraduationCap,
  House,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Send,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'

type Section = 'about' | 'resume' | 'portfolio' | 'blog' | 'contact'

type Project = {
  title: string
  category: string
  description: string
  stack: string[]
  tone: string
  mark: string
  liveUrl?: string
}

const projects: Project[] = [
  { title: 'AURELIA', category: 'Restaurant ordering', description: 'A warm, focused ordering experience for discovering dishes and completing an order without friction.', stack: ['HTML', 'CSS', 'JavaScript'], tone: 'aurelia', mark: 'A', liveUrl: 'https://ibbul-git-web-xvda.vercel.app/live/u25-fpy-csc-1126/cms8bwnc0001rld043uadbyg1' },
  { title: 'E-Commerce', category: 'Online shopping', description: 'A clean commerce interface balancing product discovery, useful filters, and a confident checkout flow.', stack: ['React', 'CSS', 'UI Design'], tone: 'commerce', mark: 'E' },
  { title: 'Study Flow', category: 'Learning platform', description: 'A reading and quiz workspace designed to make focused study feel calm, clear, and measurable.', stack: ['JavaScript', 'CSS', 'UX'], tone: 'study', mark: 'S', liveUrl: 'https://std-flax.vercel.app/' },
  { title: 'CK Capital', category: 'Trading interface', description: 'A prop-firm dashboard concept for monitoring performance, risk, and account progress at a glance.', stack: ['React', 'Charts', 'Figma'], tone: 'capital', mark: 'CK', liveUrl: 'https://bashirhashim330-fx.github.io/CK-WEB/' },
  { title: 'Captrix', category: 'Financial product', description: 'A dark financial interface concept with a precise information hierarchy for active traders.', stack: ['HTML', 'JavaScript', 'CSS'], tone: 'captrix', mark: 'C', liveUrl: 'https://bashirhashim330-fx.github.io/Captrix-web/' },
]

const articles = [
  { category: 'Process', date: '24.08.26', title: 'Building Responsive Interfaces on Mobile', description: 'A practical look at making dense interfaces feel considered at every viewport.', tone: 'article-one' },
  { category: 'Learning', date: '11.07.26', title: 'Lessons From Building My First E-Commerce Website', description: 'Notes on hierarchy, trust, and the small details that move a product forward.', tone: 'article-two' },
  { category: 'Design', date: '03.06.26', title: 'Designing Better Trading Interfaces', description: 'How restraint and clarity can turn complex data into a useful daily tool.', tone: 'article-three' },
  { category: 'Growth', date: '18.04.26', title: 'What I Learned From Client-Style Projects', description: 'The habits that helped me build with more intention and communicate ideas clearly.', tone: 'article-four' },
]

const testimonials = [
  { quote: 'Bashir took a loose idea and gave it a shape we could actually use. He listened carefully, moved quickly, and the final interface felt like our product from the first review.', name: 'Mariam Yusuf', role: 'Founder, Aurelia', initial: 'M' },
  { quote: 'The best part of working with Bashir was how much thought went into the small things. Nothing felt overdesigned, and every screen had a clear reason for being there.', name: 'Daniel Cole', role: 'Product designer', initial: 'D' },
  { quote: 'Bashir is calm, curious, and dependable. He turned feedback into real improvements instead of just changing things for the sake of it.', name: 'Amaka Nwosu', role: 'Project collaborator', initial: 'A' },
]

const navItems: { id: Section; label: string; icon: typeof House }[] = [
  { id: 'about', label: 'About', icon: House },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'portfolio', label: 'Work', icon: BriefcaseBusiness },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: MessageCircle },
]

function ProjectArtwork({ tone, mark }: { tone: string; mark: string }) {
  return <div className={`project-art ${tone}`}><span className="art-grid" /><span className="art-mark">{mark}</span><span className="art-line" /><span className="art-dot" /></div>
}

function Sidebar({ active, setActive }: { active: Section; setActive: (section: Section) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand-mark"><Terminal size={17} /></div>
      <div className="profile-avatar"><img src={`${ASSET_BASE}/profile.jpg`} alt="Bashir Hashim" /><span /></div>
      <div className="profile-copy"><p className="eyebrow">Available for work</p><h1>Bashir Hashim</h1><p>Frontend Developer<br />Computer Science Student</p></div>
      <div className="availability"><span className="pulse" />Open to selected projects</div>
      <p className="sidebar-intro">I build responsive, modern web interfaces with a sharp eye for structure, motion, and the details that make products feel effortless.</p>
      <div className="sidebar-details"><a href="mailto:bashirhashim330@gmail.com"><Mail size={14} />bashirhashim330@gmail.com</a><span><MapPin size={14} />Lapai, Nigeria</span></div>
      <div className="socials"><a href="https://github.com/bashirhashim330-fx" aria-label="GitHub"><Code2 size={16} /></a><a href="#contact" aria-label="LinkedIn"><Globe2 size={16} /></a><a href="#contact" aria-label="Instagram"><MessageCircle size={16} /></a></div>
      <nav className="side-nav" aria-label="Primary navigation">{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}><Icon size={16} />{label}<span>↗</span></button>)}</nav>
      <div className="sidebar-footer"><span>© 2026 Bashir Hashim</span><span>v1.0.0</span></div>
    </aside>
  )
}

function Topbar({ active, setActive }: { active: Section; setActive: (section: Section) => void }) {
  return <header className="topbar"><div className="mobile-brand"><div className="brand-mark"><Terminal size={16} /></div><span>BASHIR<span className="accent">.</span>DEV</span></div><nav>{navItems.map(({ id, label }) => <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}>{label}</button>)}</nav><a className="top-status" href="mailto:bashirhashim330@gmail.com"><span className="pulse" />Let&apos;s talk <ArrowUpRight size={14} /></a><button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button></header>
}

function ReferenceAbout({ setActive }: { setActive: (section: Section) => void }) {
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const testimonial = testimonials[testimonialIndex]
  const showPrevious = () => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)
  const showNext = () => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)

  return <section className="reference-about">
    <div className="reference-profile-card">
      <div className="reference-profile-head"><div><p className="eyebrow">Frontend developer</p><h2>Bashir Hashim</h2><div className="reference-status"><span className="pulse" /> Open to work</div></div><div className="reference-photo"><img src={`${ASSET_BASE}/profile.jpg`} alt="Bashir Hashim" /></div></div>
      <div className="reference-contact-grid"><a href="mailto:bashirhashim330@gmail.com"><Mail size={14} /><span><small>EMAIL</small>bashirhashim330@gmail.com</span></a><span><MessageCircle size={14} /><span><small>PHONE</small>Available online</span></span><span><GraduationCap size={14} /><span><small>EDUCATION</small>Computer Science</span></span><span><MapPin size={14} /><span><small>LOCATION</small>Lapai, Nigeria</span></span></div>
      <div className="reference-socials"><a href="https://github.com/bashirhashim330-fx" aria-label="GitHub"><Code2 size={17} /></a><a href="#contact" aria-label="LinkedIn"><Globe2 size={17} /></a><a href="#contact" aria-label="X"><X size={17} /></a></div>
      <button className="reference-cv" onClick={() => setActive('resume')}><FileText size={15} /> Download CV</button>
    </div>
    <div className="reference-about-card"><div className="reference-heading"><h2>About Me</h2><span /></div><p>I&apos;m a frontend-focused web developer from Lapai, building fast, accessible interfaces for startups and product teams. I care about clean architecture, thoughtful interaction design and shipping work that holds up in production.</p><p>Day to day I turn product requirements into clear, responsive experiences that feel simple to use.</p><button className="reference-theme" aria-label="Change theme">☼</button></div>
    <div className="reference-section-card"><div className="reference-heading"><h2>What I&apos;m doing</h2><span /></div><div className="doing-list"><div><Code2 size={18} /><span><strong>Frontend development</strong><small>Building responsive websites and interfaces with React, JavaScript, and CSS.</small></span></div><div><Sparkles size={18} /><span><strong>UI design</strong><small>Creating clean, accessible experiences with thoughtful interaction and visual hierarchy.</small></span></div></div></div>
    <div className="reference-section-card testimonial-card"><div className="reference-heading"><h2>Testimonials</h2><span /></div><div className="testimonial-slide" aria-live="polite"><blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote><div className="testimonial-person"><span className="testimonial-avatar">{testimonial.initial}</span><span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span></div></div><div className="testimonial-controls"><span>{String(testimonialIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span><div><button onClick={showPrevious} aria-label="Previous testimonial"><ChevronLeft size={16} /></button><button onClick={showNext} aria-label="Next testimonial"><ChevronRight size={16} /></button></div></div></div>
    <div className="reference-mobile-links"><button className="active" onClick={() => setActive('about')}><House size={17} /><span>About</span></button><button onClick={() => setActive('resume')}><FileText size={17} /><span>Resume</span></button><button onClick={() => setActive('portfolio')}><BriefcaseBusiness size={17} /><span>Work</span></button><button onClick={() => setActive('blog')}><BookOpen size={17} /><span>Blog</span></button><button onClick={() => setActive('contact')}><Mail size={17} /><span>Contact</span></button></div>
  </section>
}

function About({ setActive }: { setActive: (section: Section) => void }) {
  return <section className="view about-view"><div className="section-kicker"><span>01 / About me</span><span>Based in Nigeria · 2026</span></div><div className="about-hero"><div className="about-hero-copy"><p className="overline">Frontend developer <span>/</span> Computer Science student</p><h2>Designing with<br /><em>purpose.</em><br />Building with <em>precision.</em></h2><p className="lead">I&apos;m Bashir — a frontend developer focused on turning ideas into clear, responsive digital experiences. I care about the details people feel: the rhythm, the hierarchy, and the moment an interface simply makes sense.</p><div className="about-actions"><button className="submit-button" onClick={() => setActive('portfolio')}>View selected work <ArrowUpRight size={14} /></button><button className="text-link" onClick={() => setActive('contact')}>Start a conversation <ArrowUpRight size={14} /></button></div></div><div className="about-hero-note"><span className="hero-index">01</span><div className="hero-orbit"><span>BH</span><i /></div><p>Currently learning, shipping, and refining one interface at a time.</p><span className="hero-location"><MapPin size={13} /> Lapai, Nigeria</span></div></div><div className="stats-grid"><div className="stat-card highlight"><span className="card-label">Projects shipped</span><strong>05</strong><p>and counting <ArrowUpRight size={14} /></p></div><div className="stat-card"><span className="card-label">Core stack</span><strong>03</strong><p>HTML · CSS · JS</p></div><div className="stat-card"><span className="card-label">Current focus</span><strong>UI</strong><p>systems & frontend</p></div><div className="stat-card"><span className="card-label">Education</span><strong>CS</strong><p>IBBU · 2029</p></div></div><div className="capability-head"><div><span className="section-number">02</span><h3>What I bring</h3></div><button className="text-link" onClick={() => setActive('resume')}>View my resume <ArrowUpRight size={14} /></button></div><div className="capability-grid"><div className="capability"><Code2 size={19} /><h4>Frontend development</h4><p>Semantic, responsive interfaces built with a clean and thoughtful codebase.</p><span>01</span></div><div className="capability"><Sparkles size={19} /><h4>Interface direction</h4><p>Translating rough ideas into visual systems with clear hierarchy and rhythm.</p><span>02</span></div><div className="capability"><Globe2 size={19} /><h4>Responsive by default</h4><p>Experiences that adapt naturally from a 320px phone to a large desktop.</p><span>03</span></div></div></section>
}

function Resume() {
  return <section className="view"><SectionHeader number="02" title="Resume" subtitle="The path so far" /><div className="resume-grid"><div><div className="block-heading"><GraduationCap size={18} /><span>Education</span></div><div className="timeline-item"><span className="timeline-date">2025 — 2029</span><h3>Ibrahim Badamasi Babangida University</h3><p>Computer Science · Lapai, Nigeria</p><span className="tag green-tag">In progress</span></div><div className="block-heading journey-heading"><Terminal size={18} /><span>Development journey</span></div><div className="journey"><div><b>01</b><span>Started building for the web</span><small>HTML · CSS</small></div><div><b>02</b><span>Found a love for interaction</span><small>JavaScript · UI</small></div><div><b>03</b><span>Now exploring product systems</span><small>React · Design</small></div></div></div><div className="skills-panel"><div className="block-heading"><Sparkles size={18} /><span>Skills & tools</span></div><p className="muted">The tools I use to make ideas tangible.</p><div className="skill-group"><span>Frontend</span><div>{['HTML', 'CSS', 'JavaScript', 'React'].map(x => <span className="tag" key={x}>{x}</span>)}</div></div><div className="skill-group"><span>Workflow</span><div>{['Git', 'Figma', 'Responsive UI', 'Accessibility'].map(x => <span className="tag" key={x}>{x}</span>)}</div></div></div></div></section>
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) { return <div className="section-header"><div><span className="section-number">{number}</span><h2>{title}</h2></div><p>{subtitle}</p></div> }

function Portfolio({ onProject }: { onProject: (project: Project) => void }) { return <section className="view"><SectionHeader number="03" title="Selected work" subtitle="A few things I&apos;ve made" /><div className="portfolio-toolbar"><span>All projects <b>05</b></span><span className="toolbar-note">Hover to explore <MoveUpRight size={14} /></span></div><div className="project-grid">{projects.map((project, i) => <button className={`project-card card-${i}`} key={project.title} onClick={() => onProject(project)}><ProjectArtwork tone={project.tone} mark={project.mark} /><div className="project-meta"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3></div><ArrowUpRight size={18} /></div><p>{project.description}</p><div className="stack">{project.stack.map(x => <span key={x}>{x}</span>)}</div></button>)}</div></section> }

function Blog({ setActive }: { setActive: (section: Section) => void }) { return <section className="view"><SectionHeader number="04" title="Notes from the build" subtitle="Thoughts, experiments, lessons" /><div className="article-grid">{articles.map(article => <article className="article-card" key={article.title}><div className={`article-art ${article.tone}`}><span>{article.category}</span><BookOpen size={20} /></div><div className="article-info"><div><span>{article.date}</span><span>{article.category}</span></div><h3>{article.title}</h3><p>{article.description}</p><button className="text-link" onClick={() => setActive('contact')}>Read article <ArrowUpRight size={14} /></button></div></article>)}</div></section> }

function Contact() { return <section className="view"><SectionHeader number="05" title="Let&apos;s connect" subtitle="Have a project in mind?" /><div className="contact-grid"><div className="contact-card"><div className="contact-map"><span className="map-grid" /><span className="map-route route-one" /><span className="map-route route-two" /><div className="map-pin"><MapPin size={16} /></div><span className="map-label">LAPAI, NG</span></div><div className="contact-details"><p className="overline">Get in touch</p><h3>Let&apos;s make something<br /><em>worth using.</em></h3><a href="mailto:bashirhashim330@gmail.com"><Mail size={15} />bashirhashim330@gmail.com</a><span><MapPin size={15} />Lapai, Nigeria</span></div></div><form className="contact-form" onSubmit={e => e.preventDefault()}><div className="form-row"><label>Name<input placeholder="Your name" /></label><label>Email<input type="email" placeholder="you@example.com" /></label></div><label>Message<textarea placeholder="Tell me a little about your project..." rows={6} /></label><button className="submit-button" type="submit">Send message <Send size={15} /></button><p className="form-note">Usually replies within 24–48 hours.</p></form></div></section> }

function ProjectModal({ project, close, index, setIndex }: { project: Project; close: () => void; index: number; setIndex: (n: number) => void }) { const next = (index + 1) % projects.length; const prev = (index - 1 + projects.length) % projects.length; return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${project.title} details`} onClick={close}><div className="project-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={close} aria-label="Close project"><X size={20} /></button><ProjectArtwork tone={project.tone} mark={project.mark} /><div className="modal-body"><span className="project-category">{project.category}</span><h2>{project.title}</h2><p>{project.description} This project was a study in making a focused, useful interface with a strong visual point of view.</p><div className="stack modal-stack">{project.stack.map(x => <span key={x}>{x}</span>)}</div><div className="modal-actions">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={14} /></a>}<a href="https://github.com/bashirhashim330-fx" target="_blank" rel="noreferrer">GitHub <Code2 size={14} /></a></div></div><div className="modal-nav"><button onClick={() => setIndex(prev)}><ChevronLeft size={16} /> Previous</button><span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><button onClick={() => setIndex(next)}>Next <ChevronRight size={16} /></button></div></div></div> }

export default function Page() { const [active, setActive] = useState<Section>('about'); const [selected, setSelected] = useState(0); const [modal, setModal] = useState(false); const go = (section: Section) => { setActive(section); window.scrollTo({ top: 0, behavior: 'smooth' }) }; return <main className={`portfolio-shell ${active === 'about' ? 'about-mode' : ''}`}><Sidebar active={active} setActive={go} /><div className="workspace"><Topbar active={active} setActive={go} /><div className="mobile-profile"><div className="profile-avatar"><img src={`${ASSET_BASE}/profile.jpg`} alt="Bashir Hashim" /><span /></div><div><p className="eyebrow">Available for work</p><h1>Bashir Hashim</h1><p>Frontend Developer / CS Student</p></div></div><div className="workspace-content">{active === 'about' && <ReferenceAbout setActive={go} />}{active === 'resume' && <Resume />}{active === 'portfolio' && <Portfolio onProject={project => { setSelected(projects.indexOf(project)); setModal(true) }} />}{active === 'blog' && <Blog setActive={go} />}{active === 'contact' && <Contact />}</div><footer className="mobile-footer">Built with intention <span>·</span> Bashir Hashim</footer></div><nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}><Icon size={17} /><span>{label}</span></button>)}</nav>{modal && <ProjectModal project={projects[selected]} close={() => setModal(false)} index={selected} setIndex={setSelected} />}</main> }
