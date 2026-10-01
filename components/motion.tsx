'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

declare global {
  interface Window { __bhReveal?: boolean }
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v))

/**
 * Reveals every [data-reveal] element inside `rootSelector` as it scrolls into view.
 * Elements that intersect in the same frame are staggered. Hidden state is gated by
 * html.reveal-ready (set before paint), so no-JS / reduced-motion users see content as-is.
 */
export function useScrollReveal(key: unknown, rootSelector = '.workspace-content') {
  useEffect(() => {
    const root = document.querySelector(rootSelector)
    const html = document.documentElement
    const first = !window.__bhReveal
    window.__bhReveal = true
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    if (!html.classList.contains('reveal-ready') || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'))
      return
    }
    // On the very first load, let the intro curtain lift before the content settles in.
    const base = first && !html.classList.contains('intro-skip') ? 420 : 0
    let usedBase = false
    const io = new IntersectionObserver(entries => {
      let i = 0
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        el.style.setProperty('--reveal-delay', `${(usedBase ? 0 : base) + Math.min(i++, 7) * 65}ms`)
        el.classList.add('is-in')
        io.unobserve(el)
      })
      if (i) usedBase = true
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [key, rootSelector])
}

/** Cursor-aware "magnetic" pull for primary buttons. Mouse only; no-op on touch & reduced motion. */
export function useMagnetic<T extends HTMLElement>(strength = 0.28, max = 7) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !hasFinePointer()) return
    let raf = 0
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      const x = clamp((e.clientX - (r.left + r.width / 2)) * strength, max)
      const y = clamp((e.clientY - (r.top + r.height / 2)) * strength, max)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => { el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px` })
    }
    const leave = () => { cancelAnimationFrame(raf); el.style.translate = '' }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength, max])
  return ref
}

/** Mouse-tracked 3D tilt. Writes --rx/--ry (deg) and --px/--py (-1..1) for CSS to consume. */
export function useTilt<T extends HTMLElement>(maxDeg = 6) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !hasFinePointer()) return
    let raf = 0
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * 2 - 1
      const py = ((e.clientY - r.top) / r.height) * 2 - 1
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.classList.add('is-tilting')
        el.style.setProperty('--rx', `${(-py * maxDeg).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${(px * maxDeg).toFixed(2)}deg`)
        el.style.setProperty('--px', px.toFixed(3))
        el.style.setProperty('--py', py.toFixed(3))
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      el.classList.remove('is-tilting')
      ;['--rx', '--ry', '--px', '--py'].forEach(p => el.style.removeProperty(p))
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [maxDeg])
  return ref
}

/** Thin accent bar showing how far through the current section you've scrolled. */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 4 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      ref.current?.style.setProperty('--progress', p.toFixed(4))
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const ro = new ResizeObserver(schedule)
    ro.observe(document.body)
    update()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      ro.disconnect()
    }
  }, [])
  return <div className="scroll-progress" aria-hidden="true"><span ref={ref} /></div>
}

/* ---------------- Theme ---------------- */

export type Theme = 'light' | 'dark'
const THEME_KEY = 'bh-theme'
const THEME_COLORS: Record<Theme, string> = { light: '#f3f1ea', dark: '#080808' }

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => mo.disconnect()
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, readTheme, () => 'dark')
}

export function applyTheme(theme: Theme, persist: boolean) {
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute('content', THEME_COLORS[theme]))
  if (persist) {
    try { localStorage.setItem(THEME_KEY, theme) } catch {}
  }
}

/** Keeps following the OS setting until the visitor makes an explicit choice. */
export function useSystemThemeSync() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      let saved: string | null = null
      try { saved = localStorage.getItem(THEME_KEY) } catch {}
      if (saved !== 'light' && saved !== 'dark') applyTheme(mq.matches ? 'light' : 'dark', false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
}

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }

/** Switches theme with a circular reveal from the toggle (View Transitions API), falling back to an instant swap. */
export function toggleTheme(origin?: HTMLElement | null) {
  const next: Theme = readTheme() === 'light' ? 'dark' : 'light'
  const doc = document as ViewTransitionDoc
  if (!doc.startViewTransition || prefersReducedMotion() || !origin) {
    applyTheme(next, true)
    return
  }
  const r = origin.getBoundingClientRect()
  const x = r.left + r.width / 2
  const y = r.top + r.height / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  const vt = doc.startViewTransition(() => applyTheme(next, true))
  vt.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 560, easing: 'cubic-bezier(.16, 1, .3, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  }).catch(() => {})
}
