import type { Metadata, Viewport } from 'next'
import './globals.css'

// Next.js does not prefix metadata icon URLs with basePath on a static export,
// so on GitHub Pages (/My-Portfolio) the favicon 404'd. Prefix it explicitly.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  title: 'Bashir Hashim — Frontend Developer',
  description: 'Portfolio of Bashir Hashim, a frontend developer and Computer Science student in Minna, Nigeria.',
  icons: {
    icon: [
      { url: `${BASE}/icon-light-32x32.png`, media: '(prefers-color-scheme: light)' },
      { url: `${BASE}/icon-dark-32x32.png`, media: '(prefers-color-scheme: dark)' },
      { url: `${BASE}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: `${BASE}/apple-icon.png`,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f1ea' },
    { media: '(prefers-color-scheme: dark)', color: '#080808' },
  ],
}

// Runs before first paint: resolves the theme (saved choice, else OS setting) so
// there is no light/dark flash, and decides whether the intro + scroll reveals run.
const bootScript = `(function(){try{
var d=document.documentElement,t=localStorage.getItem('bh-theme');
if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}
d.setAttribute('data-theme',t);
var c=t==='light'?'#f3f1ea':'#080808';
document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute('content',c)});
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!rm&&'IntersectionObserver' in window){d.classList.add('reveal-ready');
setTimeout(function(){if(!window.__bhReveal)d.classList.remove('reveal-ready')},4000)}
if(rm||sessionStorage.getItem('bh-intro')){d.classList.add('intro-skip')}else{sessionStorage.setItem('bh-intro','1')}
}catch(e){}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
