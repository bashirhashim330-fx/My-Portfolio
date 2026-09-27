'use client'

import React, { useState } from 'react'

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
  image: string
  liveUrl?: string
}

type Article = {
  category: string
  date: string
  title: string
  description: string
  image: string
  content: string[]
}

const projects: Project[] = [
  {
    title: 'E-Commerce',
    category: 'Online shopping',
    description: 'A clean commerce interface balancing product discovery, useful filters, and a confident checkout flow.',
    stack: ['React', 'CSS', 'UI Design'],
    image: 'project-ecommerce.jpg',
    liveUrl:https://ibbul-git-web-xvda.vercel.app/live/u25-fpy-csc-1126/cms8bwnc0001rld043uadbyg1,
  },
  {
    title: 'Study Flow',
    category: 'Learning platform',
    description: 'A reading and quiz workspace designed to make focused study feel calm, clear, and measurable.',
    stack: ['JavaScript', 'CSS', 'UX'],
    image: 'project-studyflow.jpg',
    liveUrl: 'https://std-flax.vercel.app/',
  },
  {
    title: 'CK Capital',
    category: 'Trading interface',
    description: 'A prop-firm dashboard concept for monitoring performance, risk, and account progress at a glance.',
    stack: ['React', 'Charts', 'Figma'],
    image: 'project-ckcapital.jpg',
    liveUrl: 'https://bashirhashim330-fx.github.io/CK-WEB/',
  },
  {
    title: 'Captrix',
    category: 'Financial product',
    description: 'A dark financial interface concept with a precise information hierarchy for active traders.',
    stack: ['HTML', 'JavaScript', 'CSS'],
    image: 'project-captrix.jpg',
    liveUrl: 'https://bashirhashim330-fx.github.io/Captrix-web/',
  },
]

const articles: Article[] = [
  {
    category: 'Process',
    date: '24.08.26',
    title: 'Building Responsive Interfaces on Mobile',
    description: 'A practical look at making dense interfaces feel considered at every viewport.',
    image: 'project-studyflow.jpg',
    content: [
      'Most of the interfaces on this site, including this one, were built and tested from my phone. That constraint changed how I think about responsive design — it stopped being a checklist of breakpoints and became something I could feel immediately, because I was the first user of every layout I shipped.',
      'The biggest shift was designing from the smallest screen outward instead of shrinking a desktop layout down. Starting at 320–375px forces you to decide what actually matters on a screen: which text can wait, which action needs a full-width tap target, and where a two-column idea should just become one column with better spacing.',
      'Touch targets are the detail that separates a responsive layout from a usable one. A button that looks fine on a cursor-driven screen can be genuinely hard to tap accurately on a phone. I try to keep anything interactive at least 44px tall, with enough space around it that a slightly imprecise thumb still hits the right target.',
      'Horizontal scroll is the enemy. It usually means a grid, a table, or a fixed-width element snuck in without being tested at a narrow width. I check every section at 320px, 375px, 390px, and 430px before I consider it done — not just resizing a browser window, but actually opening it on a phone.',
      'None of this replaces testing on a real device. Emulators are close, but they don&apos;t tell you how a layout feels under a thumb, in daylight, on a connection that isn&apos;t always fast. Building this way from day one has made mobile-first feel less like a rule I follow and more like the only way I know how to build.',
    ],
  },
  {
    category: 'Learning',
    date: '11.07.26',
    title: 'Lessons From Building My First E-Commerce Website',
    description: 'Notes on hierarchy, trust, and the small details that move a product forward.',
    image: 'project-ecommerce.jpg',
    content: [
      'The E-Commerce project on this site was the first time I had to design for trust, not just clarity. A portfolio page just needs to look good. A store needs to convince someone their card details and their money are safe with an interface they&apos;ve never used before.',
      'Product discovery was harder than I expected. It&apos;s easy to build a grid of cards; it&apos;s harder to build filters that actually help someone narrow down what they want without feeling like extra work. I spent more time on the filter and sort logic than on the product cards themselves.',
      'Hierarchy matters more in commerce than almost anywhere else. Price, availability, and the primary action all need to be obvious in under a second, because that&apos;s roughly how long someone gives an unfamiliar store before they decide whether to keep looking or leave.',
      'The checkout flow taught me the most. Every extra field, every unclear label, every moment of &ldquo;is this working?&rdquo; is a chance to lose someone. I stripped the flow down repeatedly until each screen asked for exactly one thing and made it obvious what happened next.',
      'I came out of that project with a rule I still use: if I can&apos;t explain why a screen needs a piece of information or a decision, it probably shouldn&apos;t be there.',
    ],
  },
  {
    category: 'Design',
    date: '03.06.26',
    title: 'Designing Better Trading Interfaces',
    description: 'How restraint and clarity can turn complex data into a useful daily tool.',
    image: 'project-ckcapital.jpg',
    content: [
      'CK Capital and Captrix pushed me into a different kind of design problem: interfaces where the data itself is the product, and getting the hierarchy wrong can genuinely cost someone money or attention at the wrong moment.',
      'Trading dashboards want to show everything at once — balance, positions, risk, charts, alerts. The instinct is to add more panels. I found the opposite works better: decide what a trader needs to see in the first two seconds, and let everything else be one tap away instead of permanently on screen.',
      'Color has to mean something and only that thing. I kept green and red strictly tied to gains and losses, and used a single accent color for everything else — navigation, active states, highlights — so a glance at the screen tells you performance instantly, without decoding the rest of the interface first.',
      'Numbers need rhythm. Aligning decimals, keeping consistent digit widths, and spacing rows evenly sounds minor, but it&apos;s the difference between a dashboard you can scan and one you have to read line by line, which matters when someone is checking it dozens of times a day.',
      'Restraint turned out to be the actual skill. The best version of both dashboards was the one with fewer competing elements, not more — clarity beat density every time I tested it.',
    ],
  },
  {
    category: 'Growth',
    date: '18.04.26',
    title: 'What I Learned From Client-Style Projects',
    description: 'The habits that helped me build with more intention and communicate ideas clearly.',
    image: 'project-captrix.jpg',
    content: [
      'Captrix and a few other pieces on this site were built the way a real client project runs: a rough brief, an existing brand to respect, and a result that has to work for someone other than me.',
      'The first lesson was translation. A client rarely says &ldquo;give me a card component with a two-column grid.&rdquo; They say something like &ldquo;it should feel more premium&rdquo; or &ldquo;this feels cluttered.&rdquo; Learning to turn that kind of feedback into concrete layout, spacing, and color decisions is its own skill, separate from knowing how to code the result.',
      'I learned to protect existing brand decisions instead of quietly overriding them. It&apos;s tempting to swap a color or a font because I&apos;d personally choose differently, but a client-style project isn&apos;t about my taste — it&apos;s about making their idea work better without erasing what made it theirs.',
      'Communicating in progress, not just in a finished reveal, made every project smoother. Sharing an early direction and explaining the reasoning behind it caught misunderstandings early, before I&apos;d built an entire flow on the wrong assumption.',
      'The biggest shift in how I work now: I ask more questions before I open the editor, and I make fewer changes after I think I&apos;m done — because most of the expensive mistakes happen in the gap between what someone meant and what I assumed they meant.',
    ],
  },
]

const testimonials = [
  { quote: 'Bashir took a loose idea and gave it a shape we could actually use. He listened carefully, moved quickly, and the final interface felt like our product from the first review.', name: 'Mariam Yusuf', role: 'Founder, restaurant startup', initial: 'M' },
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

const CV_HREF = `${ASSET_BASE}/Bashir-Hashim-CV.pdf`

function ProjectArtwork({ image, title }: { image: string; title: string }) {
  return (
    <div className={`project-art shot-${image.replace('project-', '').replace('.jpg', '')}`}>
      <img src={`${ASSET_BASE}/${image}`} alt={`${title} preview`} loading="lazy" />
    </div>
  )
}

function Sidebar({ active, setActive }: { active: Section; setActive: (section: Section) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand-mark"><Terminal size={17} /></div>
      <div className="profile-avatar"><img src={`${ASSET_BASE}/profile.jpg`} alt="Bashir Hashim" /><span /></div>
      <div className="profile-copy"><p className="eyebrow">Available for work</p><h1>Bashir Hashim</h1><p>Frontend Developer<br />Computer Science Student</p></div>
      <div className="availability"><span className="pulse" />Open to selected projects</div>
      <p className="sidebar-intro">I build responsive, modern web interfaces with a sharp eye for structure, motion, and the details that make products feel effortless.</p>
      <div className="sidebar-details"><a href="mailto:bashirhashim330@gmail.com"><Mail size={14} />bashirhashim330@gmail.com</a><span><MapPin size={14} />Minna, Nigeria</span></div>
      <div className="socials"><a href="https://github.com/bashirhashim330-fx" aria-label="GitHub"><Code2 size={16} /></a><a href="https://www.fiverr.com/bashfx99" aria-label="Fiverr" target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /></a></div>
      <nav className="side-nav" aria-label="Primary navigation">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}>
            <Icon size={16} />{label}<span>↗</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer"><span>© 2026 Bashir Hashim</span><span>v2.0.0</span></div>
    </aside>
  )
}

function Topbar({ active, setActive }: { active: Section; setActive: (section: Section) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const go = (section: Section) => { setActive(section); setDrawerOpen(false) }
  return (
    <>
      <header className="topbar">
        <div className="mobile-brand"><div className="brand-mark"><Terminal size={16} /></div><span>BASHIR<span className="accent">.</span>DEV</span></div>
        <nav>
          {navItems.map(({ id, label }) => (
            <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}>{label}</button>
          ))}
        </nav>
        <a className="top-status" href="mailto:bashirhashim330@gmail.com"><span className="pulse" />Let&apos;s talk <ArrowUpRight size={14} /></a>
        <button className="mobile-menu" aria-label={drawerOpen ? 'Close menu' : 'Open menu'} onClick={() => setDrawerOpen(!drawerOpen)}>
          {drawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {drawerOpen && (
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-nav">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}><Icon size={16} />{label}</button>
              ))}
            </div>
            <div className="drawer-divider" />
            <a className="drawer-link" href="mailto:bashirhashim330@gmail.com"><Mail size={15} />bashirhashim330@gmail.com</a>
            <a className="drawer-link" href="https://github.com/bashirhashim330-fx" target="_blank" rel="noreferrer"><Code2 size={15} />GitHub</a>
            <a className="drawer-link" href="https://www.fiverr.com/bashfx99" target="_blank" rel="noreferrer"><BriefcaseBusiness size={15} />Fiverr</a>
            <a className="drawer-link" href={CV_HREF} download="Bashir-Hashim-CV.pdf"><FileText size={15} />Download CV</a>
          </div>
        </div>
      )}
    </>
  )
}

function ReferenceAbout({ setActive }: { setActive: (section: Section) => void }) {
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const testimonial = testimonials[testimonialIndex]
  const showPrevious = () => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)
  const showNext = () => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)

  return (
    <section className="reference-about">
      <div className="reference-profile-card">
        <div className="reference-profile-head">
          <div><p className="eyebrow">Frontend developer</p><h2>Bashir Hashim</h2><div className="reference-status"><span className="pulse" /> Open to work</div></div>
          <div className="reference-photo"><img src={`${ASSET_BASE}/profile.jpg`} alt="Bashir Hashim" /></div>
        </div>
        <div className="reference-contact-grid">
          <a href="mailto:bashirhashim330@gmail.com"><Mail size={14} /><span><small>EMAIL</small>bashirhashim330@gmail.com</span></a>
          <span><MessageCircle size={14} /><span><small>PHONE</small>Available online</span></span>
          <span><GraduationCap size={14} /><span><small>EDUCATION</small>Computer Science</span></span>
          <span><MapPin size={14} /><span><small>LOCATION</small>Minna, Nigeria</span></span>
        </div>
        <div className="reference-socials"><a href="https://github.com/bashirhashim330-fx" aria-label="GitHub"><Code2 size={17} /></a><a href="https://www.fiverr.com/bashfx99" aria-label="Fiverr" target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /></a></div>
        <a className="reference-cv" href={CV_HREF} download="Bashir-Hashim-CV.pdf"><FileText size={15} /> Download CV</a>
      </div>
      <div className="reference-about-card">
        <div className="reference-heading"><h2>About Me</h2><span /></div>
        <p>I&apos;m a frontend-focused web developer from Minna, building fast, accessible interfaces for startups and product teams. I care about clean architecture, thoughtful interaction design and shipping work that holds up in production.</p>
        <p>Day to day I turn product requirements into clear, responsive experiences that feel simple to use.</p>
      </div>
      <div className="reference-section-card">
        <div className="reference-heading"><h2>Snapshot</h2><span /></div>
        <div className="reference-stats-row">
          <div><strong>04</strong><span>Projects shipped</span></div>
          <div><strong>03</strong><span>Core stack</span></div>
          <div><strong>CS</strong><span>IBBU · 2029</span></div>
        </div>
      </div>
      <div className="reference-section-card">
        <div className="reference-heading"><h2>What I&apos;m doing</h2><span /></div>
        <div className="doing-list">
          <div><Code2 size={18} /><span><strong>Frontend development</strong><small>Building responsive websites and interfaces with React, JavaScript, and CSS.</small></span></div>
          <div><Sparkles size={18} /><span><strong>UI design</strong><small>Creating clean, accessible experiences with thoughtful interaction and visual hierarchy.</small></span></div>
        </div>
      </div>
      <div className="reference-section-card">
        <div className="reference-heading"><h2>What I bring</h2><span /></div>
        <div className="doing-list">
          <div><MoveUpRight size={18} /><span><strong>Interface direction</strong><small>Translating rough ideas into visual systems with clear hierarchy and rhythm.</small></span></div>
          <div><Globe2 size={18} /><span><strong>Responsive by default</strong><small>Experiences that adapt naturally from a 320px phone to a large desktop.</small></span></div>
        </div>
      </div>
      <div className="reference-section-card testimonial-card">
        <div className="reference-heading"><h2>Testimonials</h2><span /></div>
        <div className="testimonial-slide" aria-live="polite">
          <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
          <div className="testimonial-person"><span className="testimonial-avatar">{testimonial.initial}</span><span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span></div>
        </div>
        <div className="testimonial-controls">
          <span>{String(testimonialIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
          <div><button onClick={showPrevious} aria-label="Previous testimonial"><ChevronLeft size={16} /></button><button onClick={showNext} aria-label="Next testimonial"><ChevronRight size={16} /></button></div>
        </div>
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section className="view">
      <div className="resume-header-row">
        <SectionHeader number="02" title="Resume" subtitle="The path so far" />
        <a className="resume-download" href={CV_HREF} download="Bashir-Hashim-CV.pdf"><FileText size={14} /> Download PDF</a>
      </div>
      <div className="resume-grid">
        <div>
          <div className="block-heading"><GraduationCap size={18} /><span>Education</span></div>
          <div className="timeline-item">
            <span className="timeline-date">2025 — 2029</span>
            <h3>Ibrahim Badamasi Babangida University</h3>
            <p>Computer Science · Lapai, Nigeria</p>
            <span className="tag green-tag">In progress</span>
          </div>
          <div className="block-heading journey-heading"><Terminal size={18} /><span>Development journey</span></div>
          <div className="journey">
            <div><b>01</b><span>Started building for the web</span><small>HTML · CSS</small></div>
            <div><b>02</b><span>Found a love for interaction</span><small>JavaScript · UI</small></div>
            <div><b>03</b><span>Now exploring product systems</span><small>React · Design</small></div>
          </div>
        </div>
        <div className="skills-panel">
          <div className="block-heading"><Sparkles size={18} /><span>Skills & tools</span></div>
          <p className="muted">The tools I use to make ideas tangible.</p>
          <div className="skill-group"><span>Frontend</span><div>{['HTML', 'CSS', 'JavaScript', 'React'].map(x => <span className="tag" key={x}>{x}</span>)}</div></div>
          <div className="skill-group"><span>Workflow</span><div>{['Git', 'Figma', 'Responsive UI', 'Accessibility'].map(x => <span className="tag" key={x}>{x}</span>)}</div></div>
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="section-header">
      <div><span className="section-number">{number}</span><h2>{title}</h2></div>
      <p>{subtitle}</p>
    </div>
  )
}

function Portfolio({ onProject }: { onProject: (project: Project) => void }) {
  return (
    <section className="view">
      <SectionHeader number="03" title="Selected work" subtitle="A few things I&apos;ve made" />
      <div className="portfolio-toolbar"><span>All projects <b>04</b></span><span className="toolbar-note">Hover to explore <MoveUpRight size={14} /></span></div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <button className="project-card" style={{ animationDelay: `${i * 0.06}s` }} key={project.title} onClick={() => onProject(project)}>
            <ProjectArtwork image={project.image} title={project.title} />
            <div className="project-meta"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3></div><ArrowUpRight size={18} /></div>
            <p>{project.description}</p>
            <div className="stack">{project.stack.map(x => <span key={x}>{x}</span>)}</div>
          </button>
        ))}
      </div>
    </section>
  )
}

function Blog({ onArticle }: { onArticle: (article: Article) => void }) {
  return (
    <section className="view">
      <SectionHeader number="04" title="Notes from the build" subtitle="Thoughts, experiments, lessons" />
      <div className="article-grid">
        {articles.map((article, i) => (
          <article className="article-card" style={{ animationDelay: `${i * 0.06}s` }} key={article.title}>
            <div className={`article-art shot-${article.image.replace('project-', '').replace('.jpg', '')}`}>
              <img src={`${ASSET_BASE}/${article.image}`} alt={`${article.title} preview`} loading="lazy" />
              <span>{article.category}</span>
            </div>
            <div className="article-info">
              <div><span>{article.date}</span><span>{article.category}</span></div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <button className="text-link" onClick={() => onArticle(article)}>Read article <ArrowUpRight size={14} /></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'your website'}`)
    const bodyLines = [email ? `From: ${name || 'Anonymous'} (${email})` : `From: ${name || 'Anonymous'}`, '', message || '']
    const body = encodeURIComponent(bodyLines.join('\n'))
    window.location.href = `mailto:bashirhashim330@gmail.com?subject=${subject}&body=${body}`
  }
  return (
    <section className="view">
      <SectionHeader number="05" title="Let&apos;s connect" subtitle="Have a project in mind?" />
      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-map">
            <span className="map-grid" /><span className="map-route route-one" /><span className="map-route route-two" />
            <div className="map-pin"><MapPin size={16} /></div>
            <span className="map-label">MINNA, NG</span>
          </div>
          <div className="contact-details">
            <p className="overline">Get in touch</p>
            <h3>Let&apos;s make something<br /><em>worth using.</em></h3>
            <a href="mailto:bashirhashim330@gmail.com"><Mail size={15} />bashirhashim330@gmail.com</a>
            <span><MapPin size={15} />Minna, Nigeria</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Name<input name="name" placeholder="Your name" required /></label>
            <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
          </div>
          <label>Message<textarea name="message" placeholder="Tell me a little about your project..." rows={6} required /></label>
          <button className="submit-button" type="submit">Send message <Send size={15} /></button>
          <p className="form-note">Opens your email app, addressed to me — nothing is sent from here directly.</p>
        </form>
      </div>
    </section>
  )
}

function ProjectModal({ project, close, index, setIndex }: { project: Project; close: () => void; index: number; setIndex: (n: number) => void }) {
  const next = (index + 1) % projects.length
  const prev = (index - 1 + projects.length) % projects.length
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${project.title} details`} onClick={close}>
      <div className="project-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close project"><X size={20} /></button>
        <ProjectArtwork image={project.image} title={project.title} />
        <div className="modal-body">
          <span className="project-category">{project.category}</span>
          <h2>{project.title}</h2>
          <p>{project.description} This project was a study in making a focused, useful interface with a strong visual point of view.</p>
          <div className="stack modal-stack">{project.stack.map(x => <span key={x}>{x}</span>)}</div>
          <div className="modal-actions">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={14} /></a>}
            <a href="https://github.com/bashirhashim330-fx" target="_blank" rel="noreferrer">GitHub <Code2 size={14} /></a>
          </div>
        </div>
        <div className="modal-nav">
          <button onClick={() => setIndex(prev)}><ChevronLeft size={16} /> Previous</button>
          <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <button onClick={() => setIndex(next)}>Next <ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  )
}

function ArticleModal({ article, close, index, setIndex }: { article: Article; close: () => void; index: number; setIndex: (n: number) => void }) {
  const next = (index + 1) % articles.length
  const prev = (index - 1 + articles.length) % articles.length
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${article.title} article`} onClick={close}>
      <div className="project-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close article"><X size={20} /></button>
        <div className={`article-art article-modal-art shot-${article.image.replace('project-', '').replace('.jpg', '')}`}>
          <img src={`${ASSET_BASE}/${article.image}`} alt={`${article.title} preview`} />
          <span>{article.category}</span>
        </div>
        <div className="modal-body">
          <span className="project-category">{article.date} · {article.category}</span>
          <h2>{article.title}</h2>
          {article.content.map((paragraph, i) => (
            <p className="article-paragraph" key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="modal-nav">
          <button onClick={() => setIndex(prev)}><ChevronLeft size={16} /> Previous</button>
          <span>{String(index + 1).padStart(2, '0')} / {String(articles.length).padStart(2, '0')}</span>
          <button onClick={() => setIndex(next)}>Next <ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [active, setActive] = useState<Section>('about')
  const [selected, setSelected] = useState(0)
  const [modal, setModal] = useState(false)
  const [articleSelected, setArticleSelected] = useState(0)
  const [articleModal, setArticleModal] = useState(false)

  const go = (section: Section) => {
    setActive(section)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navIndex = navItems.findIndex(n => n.id === active)

  return (
    <main className={`portfolio-shell ${active === 'about' ? 'about-mode' : ''}`}>
      <Sidebar active={active} setActive={go} />
      <div className="workspace">
        <Topbar active={active} setActive={go} />
        <div className="mobile-profile">
          <div className="profile-avatar"><img src={`${ASSET_BASE}/profile.jpg`} alt="Bashir Hashim" /><span /></div>
          <div><p className="eyebrow">Available for work</p><h1>Bashir Hashim</h1><p>Frontend Developer / CS Student</p></div>
        </div>
        <div className="workspace-content" key={active}>
          {active === 'about' && <ReferenceAbout setActive={go} />}
          {active === 'resume' && <Resume />}
          {active === 'portfolio' && <Portfolio onProject={project => { setSelected(projects.indexOf(project)); setModal(true) }} />}
          {active === 'blog' && <Blog onArticle={article => { setArticleSelected(articles.indexOf(article)); setArticleModal(true) }} />}
          {active === 'contact' && <Contact />}
        </div>
        <footer className="mobile-footer">Built with intention <span>·</span> Bashir Hashim</footer>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <span className="nav-glow" style={{ left: `calc(6px + (100% - 12px) * ${navIndex} / 5)` }} />
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>
            <Icon size={17} /><span>{label}</span>
          </button>
        ))}
      </nav>
      {modal && <ProjectModal project={projects[selected]} close={() => setModal(false)} index={selected} setIndex={setSelected} />}
      {articleModal && <ArticleModal article={articles[articleSelected]} close={() => setArticleModal(false)} index={articleSelected} setIndex={setArticleSelected} />}
    </main>
  )
}
