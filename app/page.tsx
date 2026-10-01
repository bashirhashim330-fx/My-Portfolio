'use client'

import { EarthGlobe } from '@/components/earth-globe'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  Moon,
  MoveUpRight,
  Send,
  Sparkles,
  Sun,
  Terminal,
  X,
} from 'lucide-react'
import {
  ScrollProgress,
  prefersReducedMotion,
  toggleTheme,
  useMagnetic,
  useScrollReveal,
  useSystemThemeSync,
  useTheme,
  useTilt,
} from '@/components/motion'

const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

type Section = 'about' | 'resume' | 'portfolio' | 'blog' | 'contact'

type Project = {
  title: string
  category: string
  description: string
  detail: string
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
    detail: 'Most of the effort went into filter and sort logic that narrows the catalogue without feeling like extra work, and a checkout stripped back until each step asks for exactly one thing.',
    liveUrl: 'https://ibbul-git-web-xvda.vercel.app/live/u25-fpy-csc-1126/cms8bwnc0001rld043uadbyg1',
  },
  {
    title: 'Study Flow',
    category: 'Learning platform',
    description: 'A reading and quiz workspace designed to make focused study feel calm, clear, and measurable.',
    stack: ['JavaScript', 'CSS', 'UX'],
    image: 'project-studyflow.jpg',
    detail: 'Built and tested on a phone first, so the reading view and quiz flow hold up at 320px before they ever reach a desktop.',
    liveUrl: 'https://std-flax.vercel.app/',
  },
  {
    title: 'CK Capital',
    category: 'Trading interface',
    description: 'A prop-firm dashboard concept for monitoring performance, risk, and account progress at a glance.',
    stack: ['React', 'Charts', 'Figma'],
    image: 'project-ckcapital.jpg',
    detail: 'Green and red are reserved strictly for gains and losses; a single accent handles everything else, so account performance reads in the first two seconds.',
    liveUrl: 'https://bashirhashim330-fx.github.io/CK-WEB/',
  },
  {
    title: 'Captrix',
    category: 'Financial product',
    description: 'A dark financial interface concept with a precise information hierarchy for active traders.',
    stack: ['HTML', 'JavaScript', 'CSS'],
    image: 'project-captrix.jpg',
    detail: 'Run like a client brief with an existing brand to respect — aligned decimals and consistent digit widths so rows can be scanned instead of read.',
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
      'None of this replaces testing on a real device. Emulators are close, but they don’t tell you how a layout feels under a thumb, in daylight, on a connection that isn’t always fast. Building this way from day one has made mobile-first feel less like a rule I follow and more like the only way I know how to build.',
    ],
  },
  {
    category: 'Learning',
    date: '11.07.26',
    title: 'Lessons From Building My First E-Commerce Website',
    description: 'Notes on hierarchy, trust, and the small details that move a product forward.',
    image: 'project-ecommerce.jpg',
    content: [
      'The E-Commerce project on this site was the first time I had to design for trust, not just clarity. A portfolio page just needs to look good. A store needs to convince someone their card details and their money are safe with an interface they’ve never used before.',
      'Product discovery was harder than I expected. It’s easy to build a grid of cards; it’s harder to build filters that actually help someone narrow down what they want without feeling like extra work. I spent more time on the filter and sort logic than on the product cards themselves.',
      'Hierarchy matters more in commerce than almost anywhere else. Price, availability, and the primary action all need to be obvious in under a second, because that’s roughly how long someone gives an unfamiliar store before they decide whether to keep looking or leave.',
      'The checkout flow taught me the most. Every extra field, every unclear label, every moment of “is this working?” is a chance to lose someone. I stripped the flow down repeatedly until each screen asked for exactly one thing and made it obvious what happened next.',
      'I came out of that project with a rule I still use: if I can’t explain why a screen needs a piece of information or a decision, it probably shouldn’t be there.',
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
      'Numbers need rhythm. Aligning decimals, keeping consistent digit widths, and spacing rows evenly sounds minor, but it’s the difference between a dashboard you can scan and one you have to read line by line, which matters when someone is checking it dozens of times a day.',
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
      'The first lesson was translation. A client rarely says “give me a card component with a two-column grid.” They say something like “it should feel more premium” or “this feels cluttered.” Learning to turn that kind of feedback into concrete layout, spacing, and color decisions is its own skill, separate from knowing how to code the result.',
      'I learned to protect existing brand decisions instead of quietly overriding them. It’s tempting to swap a color or a font because I’d personally choose differently, but a client-style project isn’t about my taste — it’s about making their idea work better without erasing what made it theirs.',
      'Communicating in progress, not just in a finished reveal, made every project smoother. Sharing an early direction and explaining the reasoning behind it caught misunderstandings early, before I’d built an entire flow on the wrong assumption.',
      'The biggest shift in how I work now: I ask more questions before I open the editor, and I make fewer changes after I think I’m done — because most of the expensive mistakes happen in the gap between what someone meant and what I assumed they meant.',
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

// Shareable deep links (#work, #blog …) that also make the browser back button work.
const SECTION_HASH: Record<Section, string> = { about: '', resume: 'resume', portfolio: 'work', blog: 'blog', contact: 'contact' }
const sectionFromHash = (hash: string): Section => {
  const h = hash.replace(/^#/, '').toLowerCase()
  const found = (Object.keys(SECTION_HASH) as Section[]).find(s => SECTION_HASH[s] === h && h !== '')
  return found ?? 'about'
}

const CV_HREF = `${ASSET_BASE}/Bashir-Hashim-CV.pdf`
const shotClass = (image: string) => `shot-${image.replace('project-', '').replace('.jpg', '')}`
const pad = (n: number) => String(n).padStart(2, '0')

function MagneticLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useMagnetic<HTMLAnchorElement>()
  return <a ref={ref} {...props} />
}

function MagneticButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useMagnetic<HTMLButtonElement>()
  return <button ref={ref} {...props} />
}

function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useTheme()
  const ref = useRef<HTMLButtonElement>(null)
  const next = theme === 'light' ? 'dark' : 'light'
  return (
    <button ref={ref} type="button" className={`theme-toggle ${className}`} onClick={() => toggleTheme(ref.current)} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
      <Sun size={15} className="icon-sun" aria-hidden="true" />
      <Moon size={15} className="icon-moon" aria-hidden="true" />
    </button>
  )
}

function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-mark">
        <svg viewBox="0 0 180 180" width="64" height="64">
          <path className="intro-chevron" d="M52 55 L94 90 L52 125" />
          <line className="intro-cursor" x1="90" y1="125" x2="132" y2="125" />
        </svg>
        <span>BASHIR<b>.</b>DEV</span>
      </div>
    </div>
  )
}

function ProjectArtwork({ image, title }: { image: string; title: string }) {
  return (
    <div className={`project-art ${shotClass(image)}`}>
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
      <div className="socials"><a href="https://github.com/bashirhashim330-fx" aria-label="GitHub" target="_blank" rel="noreferrer"><Code2 size={16} /></a><a href="https://www.fiverr.com/bashfx99" aria-label="Fiverr" target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /></a></div>
      <nav className="side-nav" aria-label="Primary navigation">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={active === id ? 'active' : ''} aria-current={active === id ? 'page' : undefined} onClick={() => setActive(id)}>
            <Icon size={16} />{label}<span>↗</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer"><span>© 2026 Bashir Hashim</span><span>v2.1.0</span></div>
    </aside>
  )
}

function Topbar({ active, setActive }: { active: Section; setActive: (section: Section) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const menuRef = useRef<HTMLButtonElement>(null)

  const closeDrawer = useCallback(() => {
    if (prefersReducedMotion()) { setDrawerOpen(false); return }
    setClosing(true)
    window.setTimeout(() => { setDrawerOpen(false); setClosing(false) }, 200)
  }, [])
  const toggle = () => (drawerOpen ? closeDrawer() : setDrawerOpen(true))
  const go = (section: Section) => { setActive(section); closeDrawer() }

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { closeDrawer(); menuRef.current?.focus() } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen, closeDrawer])

  return (
    <>
      <header className="topbar">
        <div className="mobile-brand"><div className="brand-mark"><Terminal size={16} /></div><span>BASHIR<span className="accent">.</span>DEV</span></div>
        <nav>
          {navItems.map(({ id, label }) => (
            <button key={id} className={active === id ? 'active' : ''} aria-current={active === id ? 'page' : undefined} onClick={() => setActive(id)}>{label}</button>
          ))}
        </nav>
        <MagneticLink className="top-status" href="mailto:bashirhashim330@gmail.com"><span className="pulse" />Let&apos;s talk <ArrowUpRight size={14} /></MagneticLink>
        <div className="topbar-actions">
          <ThemeToggle />
          <button ref={menuRef} className="mobile-menu" aria-label={drawerOpen ? 'Close menu' : 'Open menu'} aria-expanded={drawerOpen} onClick={toggle}>
            {drawerOpen && !closing ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {drawerOpen && (
        <div className={`drawer-backdrop${closing ? ' is-closing' : ''}`} onClick={closeDrawer}>
          <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-nav">
              {navItems.map(({ id, label, icon: Icon }, i) => (
                <button key={id} style={{ '--i': i } as React.CSSProperties} className={active === id ? 'active' : ''} onClick={() => go(id)}><Icon size={16} />{label}</button>
              ))}
            </div>
            <div className="drawer-divider" />
            <a className="drawer-link" style={{ '--i': 5 } as React.CSSProperties} href="mailto:bashirhashim330@gmail.com"><Mail size={15} />bashirhashim330@gmail.com</a>
            <a className="drawer-link" style={{ '--i': 6 } as React.CSSProperties} href="https://github.com/bashirhashim330-fx" target="_blank" rel="noreferrer"><Code2 size={15} />GitHub</a>
            <a className="drawer-link" style={{ '--i': 7 } as React.CSSProperties} href="https://www.fiverr.com/bashfx99" target="_blank" rel="noreferrer"><BriefcaseBusiness size={15} />Fiverr</a>
            <a className="drawer-link" style={{ '--i': 8 } as React.CSSProperties} href={CV_HREF} download="Bashir-Hashim-CV.pdf"><FileText size={15} />Download CV</a>
          </div>
        </div>
      )}
    </>
  )
}

function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; id: number; locked: boolean | null } | null>(null)
  const count = testimonials.length
  const show = (n: number) => setIndex((n + count) % count)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, locked: null }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (d.locked === null) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        d.locked = true
        setDragging(true)
        e.currentTarget.setPointerCapture(e.pointerId)
      } else if (Math.abs(dy) > 8) {
        drag.current = null
        return
      }
    }
    if (d.locked) setDragX(dx)
  }
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    drag.current = null
    if (!d || !d.locked) return
    const width = viewportRef.current?.offsetWidth ?? 320
    const dx = e.clientX - d.x
    const threshold = Math.min(70, width * 0.18)
    if (dx < -threshold) show(index + 1)
    else if (dx > threshold) show(index - 1)
    setDragX(0)
    setDragging(false)
  }

  return (
    <div className="reference-section-card testimonial-card" data-reveal>
      <div className="reference-heading"><h2>Testimonials</h2><span /></div>
      <div
        ref={viewportRef}
        className={`testimonial-viewport${dragging ? ' is-dragging' : ''}`}
        aria-roledescription="carousel"
        aria-label="Testimonials"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="testimonial-track" style={{ transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)` }}>
          {testimonials.map((t, i) => (
            <div className={`testimonial-slide${i === index ? ' is-active' : ''}`} key={t.name} aria-roledescription="slide" aria-label={`${i + 1} of ${count}`} aria-hidden={i !== index} inert={i !== index}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="testimonial-person"><span className="testimonial-avatar">{t.initial}</span><span><strong>{t.name}</strong><small>{t.role}</small></span></div>
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{`Testimonial ${index + 1} of ${count}: ${testimonials[index].name}`}</p>
      <div className="testimonial-controls">
        <span><b>{pad(index + 1)}</b> / {pad(count)}</span>
        <div className="testimonial-dots" aria-hidden="true">{testimonials.map((t, i) => <i key={t.name} className={i === index ? 'on' : ''} />)}</div>
        <div><button onClick={() => show(index - 1)} aria-label="Previous testimonial"><ChevronLeft size={16} /></button><button onClick={() => show(index + 1)} aria-label="Next testimonial"><ChevronRight size={16} /></button></div>
      </div>
    </div>
  )
}

/** Interactive 3D deck of the real project screenshots. Swipe (or drag) the top card away, tap it to open. */
function WorkDeck({ openProject, seeAll }: { openProject: (index: number) => void; seeAll: () => void }) {
  const n = projects.length
  const [order, setOrder] = useState(() => projects.map((_, i) => i))
  const [flying, setFlying] = useState<{ index: number; dir: 1 | -1 } | null>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const drag = useRef<{ id: number; x: number; y: number; lastX: number; lastT: number; vx: number; locked: boolean | null } | null>(null)
  const moved = useRef(false)
  const top = order[0]
  const p = projects[top]

  const advance = useCallback((dir: 1 | -1) => {
    if (flying) return
    if (dir < 0) { setOrder(o => [o[o.length - 1], ...o.slice(0, -1)]); return }
    if (prefersReducedMotion()) { setOrder(o => [...o.slice(1), o[0]]); return }
    setFlying({ index: order[0], dir })
    window.setTimeout(() => { setOrder(o => [...o.slice(1), o[0]]); setFlying(null) }, 330)
  }, [flying, order])

  const setStageTilt = (x: number, y: number) => {
    deckRef.current?.style.setProperty('--ty', `${x.toFixed(2)}deg`)
    deckRef.current?.style.setProperty('--tx', `${(8 + y).toFixed(2)}deg`)
  }
  const resetStageTilt = () => { deckRef.current?.style.removeProperty('--ty'); deckRef.current?.style.removeProperty('--tx') }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (flying || (e.pointerType === 'mouse' && e.button !== 0)) return
    moved.current = false
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, lastX: e.clientX, lastT: performance.now(), vx: 0, locked: null }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) {
      if (e.pointerType === 'mouse' && !prefersReducedMotion()) {
        const r = e.currentTarget.getBoundingClientRect()
        setStageTilt((((e.clientX - r.left) / r.width) * 2 - 1) * 9, -(((e.clientY - r.top) / r.height) * 2 - 1) * 5)
      }
      return
    }
    const dx = e.clientX - d.x, dy = e.clientY - d.y
    if (d.locked === null) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        d.locked = true
        moved.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        cardRefs.current[top]?.classList.add('is-dragging')
      } else if (Math.abs(dy) > 6) { drag.current = null; return }
      else return
    }
    const now = performance.now()
    d.vx = (e.clientX - d.lastX) / Math.max(1, now - d.lastT)
    d.lastX = e.clientX; d.lastT = now
    const el = cardRefs.current[top]
    if (el) el.style.transform = `translate(-50%, -50%) translate3d(${dx}px, ${Math.abs(dx) * -0.06}px, 40px) rotateZ(${dx * 0.045}deg) rotateY(${dx * 0.05}deg)`
    setStageTilt(dx * 0.025, 0)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    drag.current = null
    if (!d || !d.locked) return
    const el = cardRefs.current[top]
    el?.classList.remove('is-dragging')
    if (el) el.style.transform = ''
    resetStageTilt()
    const dx = e.clientX - d.x
    const width = deckRef.current?.offsetWidth ?? 320
    if (Math.abs(dx) > width * 0.22 || Math.abs(d.vx) > 0.55) advance(1)
  }

  return (
    <div className="reference-section-card work-deck-card" data-reveal>
      <div className="work-deck-head">
        <div className="reference-heading"><h2>Selected work</h2><span /></div>
        <button className="text-link" onClick={seeAll}>All {pad(n)} projects <ArrowUpRight size={14} /></button>
      </div>
      <div
        ref={deckRef}
        className="deck"
        aria-roledescription="carousel"
        aria-label="Project screenshots. Swipe the top card or use the arrow keys."
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => { if (!drag.current) resetStageTilt() }}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') { e.preventDefault(); advance(1) }
          else if (e.key === 'ArrowLeft') { e.preventDefault(); advance(-1) }
          else if (e.key === 'Enter' && e.target === e.currentTarget) openProject(top)
        }}
      >
        <div className="deck-stage">
          {projects.map((project, i) => {
            const depth = order.indexOf(i)
            const isFlying = flying?.index === i
            return (
              <button
                key={project.title}
                ref={el => { cardRefs.current[i] = el }}
                className={`deck-card ${shotClass(project.image)}${depth === 0 ? ' is-top' : ''}${isFlying ? ' is-flying' : ''}`}
                style={{ '--d': depth, '--side': depth % 2 ? -1 : 1, '--fly': flying?.dir ?? 1 } as React.CSSProperties}
                tabIndex={depth === 0 ? 0 : -1}
                aria-hidden={depth !== 0}
                aria-label={`Open ${project.title}`}
                onClick={() => { if (moved.current || depth !== 0) return; openProject(i) }}
              >
                <img src={`${ASSET_BASE}/${project.image}`} alt="" draggable={false} />
                <span className="deck-tag">{project.category}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="deck-info" key={top}>
        <div className="deck-progress" aria-hidden="true">{projects.map((x, i) => <i key={x.title} className={i === top ? 'on' : ''} />)}</div>
        <div className="deck-title-row">
          <h3>{p.title}</h3>
          <span className="deck-count">{pad(top + 1)} / {pad(n)}</span>
        </div>
        <p>{p.description}</p>
        <div className="stack">{p.stack.map(x => <span key={x}>{x}</span>)}</div>
        <div className="deck-actions">
          <button className="deck-primary" onClick={() => openProject(top)}>View details <ArrowUpRight size={14} /></button>
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} /></a>}
          <div className="deck-arrows">
            <button onClick={() => advance(-1)} aria-label="Previous project"><ChevronLeft size={16} /></button>
            <button onClick={() => advance(1)} aria-label="Next project"><ChevronRight size={16} /></button>
          </div>
        </div>
        <p className="deck-hint">Swipe to flip · tap to open</p>
      </div>
    </div>
  )
}

// Skills derived from the stack tags on the four real projects — nothing invented.
const skillUsage = (() => {
  const map = new Map<string, number[]>()
  projects.forEach((p, i) => p.stack.forEach(s => map.set(s, [...(map.get(s) ?? []), i])))
  return [...map.entries()].map(([name, used]) => ({ name, used })).sort((a, b) => b.used.length - a.used.length || a.name.localeCompare(b.name))
})()

function SkillsCard({ openProject }: { openProject: (index: number) => void }) {
  const [pick, setPick] = useState(skillUsage[0].name)
  const skill = skillUsage.find(s => s.name === pick) ?? skillUsage[0]
  return (
    <div className="reference-section-card skills-card" data-reveal>
      <div className="reference-heading"><h2>Skills, shown in the work</h2><span /></div>
      <div className="skill-focus" key={skill.name} aria-live="polite">
        <strong>{skill.name}</strong>
        <span className="skill-count"><b>{skill.used.length}</b> of {projects.length} projects</span>
        <div className="skill-meter" aria-hidden="true">{projects.map((p, i) => <i key={p.title} className={skill.used.includes(i) ? 'on' : ''} />)}</div>
        <div className="skill-projects">
          {skill.used.map(i => (
            <button key={projects[i].title} onClick={() => openProject(i)}>{projects[i].title} <ArrowUpRight size={12} /></button>
          ))}
        </div>
      </div>
      <div className="skill-picker" role="group" aria-label="Pick a skill">
        {skillUsage.map(s => (
          <button key={s.name} className={s.name === skill.name ? 'on' : ''} aria-pressed={s.name === skill.name} onClick={() => setPick(s.name)}>
            {s.name}<small>{s.used.length}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

function ReferenceAbout({ setActive, openProject }: { setActive: (section: Section) => void; openProject: (index: number) => void }) {
  const cvRef = useMagnetic<HTMLAnchorElement>(0.18, 5)
  return (
    <section className="reference-about">
      <div className="reference-profile-card" data-reveal>
        <div className="profile-hero">
          <div className="reference-photo"><img src={`${ASSET_BASE}/profile.jpg`} alt="Bashir Hashim" /></div>
          <div className="profile-hero-text">
            <p className="eyebrow">Frontend developer</p>
            <h2>Bashir Hashim</h2>
            <p className="profile-hero-lead">Four live projects, each built and tested on a phone first.</p>
            <div className="reference-status-row"><div className="reference-status"><span className="pulse" /> Open to work</div><ThemeToggle className="about-theme-toggle" /></div>
          </div>
        </div>
        <div className="reference-contact-grid">
          <a href="mailto:bashirhashim330@gmail.com"><Mail size={14} /><span><small>EMAIL</small>bashirhashim330@gmail.com</span></a>
          <span><MessageCircle size={14} /><span><small>PHONE</small>Available online</span></span>
          <span><GraduationCap size={14} /><span><small>EDUCATION</small>Computer Science</span></span>
          <span><MapPin size={14} /><span><small>LOCATION</small>Minna, Nigeria</span></span>
        </div>
        <div className="reference-socials"><a href="https://github.com/bashirhashim330-fx" aria-label="GitHub" target="_blank" rel="noreferrer"><Code2 size={17} /></a><a href="https://www.fiverr.com/bashfx99" aria-label="Fiverr" target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /></a></div>
        <a ref={cvRef} className="reference-cv" href={CV_HREF} download="Bashir-Hashim-CV.pdf"><FileText size={15} /> Download CV</a>
      </div>
      <WorkDeck openProject={openProject} seeAll={() => setActive('portfolio')} />
      <div className="reference-about-card" data-reveal>
        <div className="reference-heading"><h2>About Me</h2><span /></div>
        <p>I&apos;m a frontend-focused web developer from Minna, building fast, accessible interfaces for startups and product teams. I care about clean architecture, thoughtful interaction design and shipping work that holds up in production.</p>
        <p>Day to day I turn product requirements into clear, responsive experiences that feel simple to use.</p>
      </div>
      <div className="reference-section-card" data-reveal>
        <div className="reference-heading"><h2>Snapshot</h2><span /></div>
        <div className="snapshot">
          <button className="snapshot-lead" onClick={() => setActive('portfolio')}>
            <strong>{pad(projects.length)}</strong>
            <span className="snapshot-lead-label">Projects shipped &amp; live</span>
            <span className="snapshot-names">{projects.map(p => p.title).join(' · ')}</span>
            <span className="text-link">See the work <ArrowUpRight size={14} /></span>
          </button>
          <dl className="snapshot-side">
            <div><dt>Core stack</dt><dd>React, JavaScript, CSS</dd></div>
            <div><dt>Studying</dt><dd>B.Sc. Computer Science, IBBU · class of 2029</dd></div>
          </dl>
        </div>
      </div>
      <div className="reference-section-card" data-reveal>
        <div className="reference-heading"><h2>What I&apos;m doing</h2><span /></div>
        <div className="doing-list">
          <div><Code2 size={18} /><span><strong>Frontend development</strong><small>Building responsive websites and interfaces with React, JavaScript, and CSS.</small></span></div>
          <div><Sparkles size={18} /><span><strong>UI design</strong><small>Creating clean, accessible experiences with thoughtful interaction and visual hierarchy.</small></span></div>
        </div>
      </div>
      <div className="reference-section-card" data-reveal>
        <div className="reference-heading"><h2>What I bring</h2><span /></div>
        <div className="doing-list">
          <div><MoveUpRight size={18} /><span><strong>Interface direction</strong><small>Translating rough ideas into visual systems with clear hierarchy and rhythm.</small></span></div>
          <div><Globe2 size={18} /><span><strong>Responsive by default</strong><small>Experiences that adapt naturally from a 320px phone to a large desktop.</small></span></div>
        </div>
      </div>
      <SkillsCard openProject={openProject} />
      <Testimonials />
    </section>
  )
}

function Resume() {
  const dlRef = useMagnetic<HTMLAnchorElement>()
  return (
    <section className="view">
      <div className="resume-header-row">
        <SectionHeader number="02" title="Resume" subtitle="The path so far" />
        <a ref={dlRef} className="resume-download" href={CV_HREF} download="Bashir-Hashim-CV.pdf"><FileText size={14} /> Download PDF</a>
      </div>
      <div className="resume-grid">
        <div>
          <div className="block-heading" data-reveal><GraduationCap size={18} /><span>Education</span></div>
          <div className="timeline-item" data-reveal>
            <span className="timeline-date">2025 — 2029</span>
            <h3>Ibrahim Badamasi Babangida University</h3>
            <p>Computer Science · Lapai, Nigeria</p>
            <span className="tag green-tag">In progress</span>
          </div>
          <div className="block-heading journey-heading" data-reveal><Terminal size={18} /><span>Development journey</span></div>
          <div className="journey">
            <div data-reveal><b>01</b><span>Started building for the web</span><small>HTML · CSS</small></div>
            <div data-reveal><b>02</b><span>Found a love for interaction</span><small>JavaScript · UI</small></div>
            <div data-reveal><b>03</b><span>Now exploring product systems</span><small>React · Design</small></div>
          </div>
        </div>
        <div className="skills-panel" data-reveal>
          <div className="block-heading"><Sparkles size={18} /><span>Skills & tools</span></div>
          <p className="muted">The tools I use to make ideas tangible.</p>
          <div className="skill-core">
            <span className="skill-label">Core stack</span>
            <ul>{['HTML', 'CSS', 'JavaScript', 'React'].map(x => <li key={x}>{x}</li>)}</ul>
            <p>What all four live projects are built on, from the Captrix landing page to the CK Capital dashboard.</p>
          </div>
          <div className="skill-group"><span>Workflow</span><div>{['Git', 'Figma', 'Responsive UI', 'Accessibility'].map(x => <span className="tag" key={x}>{x}</span>)}</div></div>
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="section-header" data-reveal>
      <div><span className="section-number">{number}</span><h2><span className="reveal-mask"><span>{title}</span></span></h2></div>
      <p>{subtitle}</p>
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useTilt<HTMLButtonElement>(5)
  return (
    <button ref={ref} className="project-card" onClick={onOpen} data-reveal aria-label={`${project.title} — ${project.category}. Open details`}>
      <ProjectArtwork image={project.image} title={project.title} />
      <div className="project-meta"><div><span className="project-category">{project.category}</span><h3>{project.title}</h3></div><ArrowUpRight size={18} /></div>
      <p>{project.description}</p>
      <div className="stack">{project.stack.map(x => <span key={x}>{x}</span>)}</div>
    </button>
  )
}

/** 3D coverflow of the four projects: drag / swipe with inertia, snaps with a spring, tap the front card to open. */
function ProjectShowcase({ onOpen }: { onOpen: (index: number) => void }) {
  const n = projects.length
  const stageRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [front, setFront] = useState(0)
  const sim = useRef({ pos: 0, vel: 0, target: 0, raf: 0, last: 0 })
  const drag = useRef<{ id: number; x: number; y: number; startPos: number; lastX: number; lastT: number; locked: boolean | null } | null>(null)
  const moved = useRef(false)

  const wrapIndex = (v: number) => ((Math.round(v) % n) + n) % n

  const layout = useCallback((pos: number) => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      let k = (((i - pos) % n) + n) % n
      if (k > n / 2) k -= n
      const a = Math.abs(k)
      const ck = Math.max(-1.35, Math.min(1.35, k))
      el.style.transform = `translate(-50%, -50%) translateX(${(ck * 58).toFixed(2)}%) translateZ(${(-a * 210).toFixed(1)}px) rotateY(${(-ck * 40).toFixed(2)}deg)`
      el.style.opacity = String(Math.max(0, Math.min(1, 1.6 - a * 0.75)))
      el.style.zIndex = String(100 - Math.round(a * 10))
      el.style.setProperty('--shade', Math.min(1, a).toFixed(3))
      el.tabIndex = a < 0.5 ? 0 : -1
    })
  }, [n])

  const step = useCallback((now: number) => {
    const s = sim.current
    s.raf = 0
    const dt = Math.min(0.05, (now - s.last) / 1000)
    s.last = now
    const k = 140, c = 2 * Math.sqrt(k) * 0.72
    s.vel += ((s.target - s.pos) * k - s.vel * c) * dt
    s.pos += s.vel * dt
    if (Math.abs(s.target - s.pos) < 0.0008 && Math.abs(s.vel) < 0.002) { s.pos = s.target; s.vel = 0 }
    layout(s.pos)
    if (s.pos !== s.target || s.vel !== 0) s.raf = requestAnimationFrame(step)
  }, [layout])

  const settle = useCallback((target: number) => {
    const s = sim.current
    s.target = target
    setFront(wrapIndex(target))
    if (prefersReducedMotion()) { s.pos = target; s.vel = 0; layout(target); return }
    if (!s.raf) { s.last = performance.now(); s.raf = requestAnimationFrame(step) }
  }, [layout, step])

  useEffect(() => {
    layout(0)
    const s = sim.current
    return () => cancelAnimationFrame(s.raf)
  }, [layout])

  const goTo = (i: number) => {
    const s = sim.current
    let d = i - wrapIndex(s.target)
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    settle(Math.round(s.target) + d)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    moved.current = false
    const s = sim.current
    cancelAnimationFrame(s.raf); s.raf = 0
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, startPos: s.pos, lastX: e.clientX, lastT: performance.now(), locked: null }
    s.vel = 0
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x, dy = e.clientY - d.y
    if (d.locked === null) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        d.locked = true
        moved.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        stageRef.current?.classList.add('is-dragging')
      } else if (Math.abs(dy) > 6) { drag.current = null; settle(Math.round(sim.current.pos)); return }
      else return
    }
    const width = stageRef.current?.offsetWidth ?? 320
    const unit = width * 0.42
    const s = sim.current
    const now = performance.now()
    const dtv = Math.max(1, now - d.lastT) / 1000
    s.vel = (-(e.clientX - d.lastX) / unit) / dtv
    s.pos = d.startPos - dx / unit
    d.lastX = e.clientX; d.lastT = now
    layout(s.pos)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    drag.current = null
    stageRef.current?.classList.remove('is-dragging')
    if (!d || !d.locked) { if (d) settle(Math.round(sim.current.pos)); return }
    const s = sim.current
    const fresh = performance.now() - d.lastT < 90
    const fling = fresh ? Math.max(-1.5, Math.min(1.5, s.vel * 0.22)) : 0
    settle(Math.round(s.pos + fling))
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); settle(Math.round(sim.current.target) + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); settle(Math.round(sim.current.target) - 1) }
  }
  const onMouseTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    const r = e.currentTarget.getBoundingClientRect()
    const py = ((e.clientY - r.top) / r.height) * 2 - 1
    const px = ((e.clientX - r.left) / r.width) * 2 - 1
    e.currentTarget.style.setProperty('--stage-rx', `${(-py * 5).toFixed(2)}deg`)
    e.currentTarget.style.setProperty('--stage-ry', `${(px * 4).toFixed(2)}deg`)
  }

  const p = projects[front]
  return (
    <div className="showcase-wrap" data-reveal>
      <div
        ref={stageRef}
        className="showcase"
        aria-roledescription="carousel"
        aria-label="Projects in 3D. Swipe or use arrow keys."
        onPointerDown={onPointerDown}
        onPointerMove={e => { onPointerMove(e); onMouseTilt(e) }}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={e => { e.currentTarget.style.removeProperty('--stage-rx'); e.currentTarget.style.removeProperty('--stage-ry') }}
        onKeyDown={onKeyDown}
      >
        <div className="showcase-ring">
          {projects.map((project, i) => (
            <button
              key={project.title}
              ref={el => { itemRefs.current[i] = el }}
              className={`showcase-item ${shotClass(project.image)}${i === front ? ' is-front' : ''}`}
              aria-label={i === front ? `Open ${project.title}` : `Show ${project.title}`}
              onClick={() => { if (moved.current) return; if (i === front) onOpen(i); else goTo(i) }}
            >
              <img src={`${ASSET_BASE}/${project.image}`} alt="" draggable={false} />
              <span className="showcase-open">Open <ArrowUpRight size={13} /></span>
            </button>
          ))}
        </div>
      </div>
      <div className="showcase-caption">
        <button onClick={() => settle(Math.round(sim.current.target) - 1)} aria-label="Previous project"><ChevronLeft size={16} /></button>
        <div key={front} className="showcase-title" aria-live="polite">
          <span className="project-category">{pad(front + 1)} · {p.category}</span>
          <h3>{p.title}</h3>
        </div>
        <button onClick={() => settle(Math.round(sim.current.target) + 1)} aria-label="Next project"><ChevronRight size={16} /></button>
      </div>
      <p className="showcase-hint">Swipe to spin · tap the front card to open</p>
    </div>
  )
}

function Portfolio({ onProject }: { onProject: (index: number) => void }) {
  return (
    <section className="view">
      <SectionHeader number="03" title="Selected work" subtitle="A few things I&apos;ve made" />
      <ProjectShowcase onOpen={onProject} />
      <div className="portfolio-toolbar"><span>All projects <b>{pad(projects.length)}</b></span><span className="toolbar-note">Hover to explore <MoveUpRight size={14} /></span></div>
      <div className="project-grid">
        {projects.map((project, i) => <ProjectCard key={project.title} project={project} onOpen={() => onProject(i)} />)}
      </div>
    </section>
  )
}

function Blog({ onArticle }: { onArticle: (index: number) => void }) {
  return (
    <section className="view">
      <SectionHeader number="04" title="Notes from the build" subtitle="Thoughts, experiments, lessons" />
      <div className="article-grid">
        {articles.map((article, i) => (
          <article className="article-card" key={article.title} data-reveal>
            <div className={`article-art ${shotClass(article.image)}`}>
              <img src={`${ASSET_BASE}/${article.image}`} alt={`${article.title} preview`} loading="lazy" />
              <span>{article.category}</span>
            </div>
            <div className="article-info">
              <div><span>{article.date}</span><span>{Math.max(1, Math.round(article.content.join(' ').split(/\s+/).length / 200))} min read</span></div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <button className="text-link" onClick={() => onArticle(i)}>Read article <ArrowUpRight size={14} /></button>
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
        <div className="contact-card" data-reveal>
          <EarthGlobe src={`${ASSET_BASE}/earth.jpg`} label="Minna, NG" />
          <div className="contact-details">
            <p className="overline">Get in touch</p>
            <h3>Let&apos;s make something<br /><em>worth using.</em></h3>
            <a href="mailto:bashirhashim330@gmail.com"><Mail size={15} />bashirhashim330@gmail.com</a>
            <span><MapPin size={15} />Minna, Nigeria</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <div className="form-row">
            <label>Name<input name="name" placeholder="Your name" autoComplete="name" required /></label>
            <label>Email<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
          </div>
          <label>Message<textarea name="message" placeholder="Tell me a little about your project..." rows={6} required /></label>
          <MagneticButton className="submit-button" type="submit">Send message <Send size={15} /></MagneticButton>
          <p className="form-note">Opens your email app, addressed to me — nothing is sent from here directly.</p>
        </form>
      </div>
    </section>
  )
}

/** Shared modal chrome: spring in/out, Esc to close, ←/→ to step, focus trap, scroll lock, focus restore. */
function ModalShell({ label, closeLabel, onClose, onStep, children }: { label: string; closeLabel: string; onClose: () => void; onStep: (dir: 1 | -1) => void; children: React.ReactNode }) {
  const [closing, setClosing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef(false)
  const handlers = useRef({ onClose, onStep })
  handlers.current = { onClose, onStep }

  const close = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    if (prefersReducedMotion()) { handlers.current.onClose(); return }
    setClosing(true)
    window.setTimeout(() => handlers.current.onClose(), 240)
  }, [])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('.modal-close')?.focus({ preventScroll: true })
    document.documentElement.classList.add('modal-open')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      else if (e.key === 'ArrowRight') handlers.current.onStep(1)
      else if (e.key === 'ArrowLeft') handlers.current.onStep(-1)
      else if (e.key === 'Tab' && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('modal-open')
      previous?.focus?.({ preventScroll: true })
    }
  }, [close])

  return (
    <div className={`modal-backdrop${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-label={label} onClick={close}>
      <div className="project-modal" ref={panelRef} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label={closeLabel}><X size={20} /></button>
        {children}
      </div>
    </div>
  )
}

function ModalNav({ index, total, dir, onStep }: { index: number; total: number; dir: 1 | -1; onStep: (d: 1 | -1) => void }) {
  return (
    <div className="modal-nav">
      <button onClick={() => onStep(-1)}><ChevronLeft size={16} /> Previous</button>
      <span key={`${index}-${dir}`} className="modal-count">{pad(index + 1)} / {pad(total)}</span>
      <button onClick={() => onStep(1)}>Next <ChevronRight size={16} /></button>
    </div>
  )
}

function ProjectModal({ index, dir, onStep, close }: { index: number; dir: 1 | -1; onStep: (d: 1 | -1) => void; close: () => void }) {
  const project = projects[index]
  const liveRef = useMagnetic<HTMLAnchorElement>()
  return (
    <ModalShell label={`${project.title} details`} closeLabel="Close project" onClose={close} onStep={onStep}>
      <div className={`modal-swap ${dir > 0 ? 'from-next' : 'from-prev'}`} key={index}>
        <ProjectArtwork image={project.image} title={project.title} />
        <div className="modal-body">
          <span className="project-category">{project.category}</span>
          <h2>{project.title}</h2>
          <p>{project.description} {project.detail}</p>
          <div className="stack modal-stack">{project.stack.map(x => <span key={x}>{x}</span>)}</div>
          <div className="modal-actions">
            {project.liveUrl && <a ref={liveRef} className="modal-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={14} /></a>}
            <a href="https://github.com/bashirhashim330-fx" target="_blank" rel="noreferrer">GitHub <Code2 size={14} /></a>
          </div>
        </div>
      </div>
      <ModalNav index={index} total={projects.length} dir={dir} onStep={onStep} />
    </ModalShell>
  )
}

function ArticleModal({ index, dir, onStep, close }: { index: number; dir: 1 | -1; onStep: (d: 1 | -1) => void; close: () => void }) {
  const article = articles[index]
  const panelTop = useRef<HTMLDivElement>(null)
  useEffect(() => { panelTop.current?.closest('.project-modal')?.scrollTo({ top: 0 }) }, [index])
  return (
    <ModalShell label={`${article.title} article`} closeLabel="Close article" onClose={close} onStep={onStep}>
      <div className={`modal-swap ${dir > 0 ? 'from-next' : 'from-prev'}`} key={index} ref={panelTop}>
        <div className={`article-art article-modal-art ${shotClass(article.image)}`}>
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
      </div>
      <ModalNav index={index} total={articles.length} dir={dir} onStep={onStep} />
    </ModalShell>
  )
}

export default function Page() {
  const [active, setActive] = useState<Section>('about')
  const [selected, setSelected] = useState(0)
  const [modal, setModal] = useState(false)
  const [articleSelected, setArticleSelected] = useState(0)
  const [articleModal, setArticleModal] = useState(false)
  const [dir, setDir] = useState<1 | -1>(1)

  useSystemThemeSync()
  useScrollReveal(active)

  // Sync section <-> URL hash (deep links + back/forward).
  useEffect(() => {
    const sync = () => setActive(sectionFromHash(window.location.hash))
    sync()
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync) }
  }, [])

  const go = (section: Section) => {
    setActive(section)
    const hash = SECTION_HASH[section]
    const target = hash ? `#${hash}` : window.location.pathname + window.location.search
    if (window.location.hash.replace(/^#/, '') !== hash) window.history.pushState(null, '', target)
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const stepProject = (d: 1 | -1) => { setDir(d); setSelected(i => (i + d + projects.length) % projects.length) }
  const stepArticle = (d: 1 | -1) => { setDir(d); setArticleSelected(i => (i + d + articles.length) % articles.length) }

  const navIndex = navItems.findIndex(n => n.id === active)

  return (
    <main className={`portfolio-shell ${active === 'about' ? 'about-mode' : ''}`}>
      <Intro />
      <ScrollProgress />
      <Sidebar active={active} setActive={go} />
      <div className="workspace">
        <Topbar active={active} setActive={go} />
        <div className="mobile-profile">
          <div className="profile-avatar"><img src={`${ASSET_BASE}/profile.jpg`} alt="Bashir Hashim" /><span /></div>
          <div><p className="eyebrow">Available for work</p><h1>Bashir Hashim</h1><p>Frontend Developer / CS Student</p></div>
        </div>
        <div className="workspace-content" key={active}>
          {active === 'about' && <ReferenceAbout setActive={go} openProject={i => { setDir(1); setSelected(i); setModal(true) }} />}
          {active === 'resume' && <Resume />}
          {active === 'portfolio' && <Portfolio onProject={i => { setDir(1); setSelected(i); setModal(true) }} />}
          {active === 'blog' && <Blog onArticle={i => { setDir(1); setArticleSelected(i); setArticleModal(true) }} />}
          {active === 'contact' && <Contact />}
        </div>
        <footer className="mobile-footer">Built with intention <span>·</span> Bashir Hashim</footer>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <span className="nav-glow" style={{ transform: `translateX(${navIndex * 100}%)` }} />
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={active === id ? 'active' : ''} aria-current={active === id ? 'page' : undefined} onClick={() => go(id)}>
            <Icon size={17} /><span>{label}</span>
          </button>
        ))}
      </nav>
      {modal && <ProjectModal index={selected} dir={dir} onStep={stepProject} close={() => setModal(false)} />}
      {articleModal && <ArticleModal index={articleSelected} dir={dir} onStep={stepArticle} close={() => setArticleModal(false)} />}
    </main>
  )
}
