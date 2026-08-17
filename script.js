/* ===================================================================
   BashFx Portfolio — Script
   Vanilla JS only. No frameworks, no backend calls.
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNav();
  initScrollReveal();
  initBackToTop();
  initTerminalTypewriter();
  initEmailCopy();
});

/* ---------------------------------------------------------------
   Mobile hamburger menu
--------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a nav link is clicked (mobile)
  menu.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return;
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

/* ---------------------------------------------------------------
   Active nav-link tracking as sections scroll into view
--------------------------------------------------------------- */
function initActiveNav() {
  const navLinks = Array.from(document.querySelectorAll('.nav-link[data-nav]'));
  if (!navLinks.length) return;

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------
   Scroll-reveal animations
--------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------------
   Back-to-top button
--------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------------
   Hero terminal — types a short build log once, on first view.
   Respects prefers-reduced-motion by rendering the final state instantly.
--------------------------------------------------------------- */
function initTerminalTypewriter() {
  const container = document.getElementById('terminalLines');
  if (!container) return;

  const lines = [
    { text: 'bashfx build premium-site', type: 'command' },
    { text: 'responsive layout',        type: 'check' },
    { text: 'optimized assets',         type: 'check' },
    { text: 'smooth interactions',      type: 'check' },
    { text: 'ready to ship',            type: 'check' },
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderStatic = () => {
    container.innerHTML = lines
      .map((line) => {
        if (line.type === 'command') {
          return `<div class="terminal-line"><span class="prompt-user">bashfx@dev</span> ~/site % ${line.text}</div>`;
        }
        return `<div class="terminal-line"><span class="check">✓</span> ${line.text}</div>`;
      })
      .join('');
  };

  if (prefersReducedMotion) {
    renderStatic();
    return;
  }

  let started = false;

  const typeLines = async () => {
    if (started) return;
    started = true;

    for (const line of lines) {
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal-line';

      const prefix = line.type === 'command'
        ? '<span class="prompt-user">bashfx@dev</span> ~/site % '
        : '<span class="check">✓</span> ';

      lineEl.innerHTML = prefix + '<span class="typed"></span><span class="terminal-cursor"></span>';
      container.appendChild(lineEl);

      const typedSpan = lineEl.querySelector('.typed');
      const cursor = lineEl.querySelector('.terminal-cursor');

      for (const char of line.text) {
        typedSpan.textContent += char;
        await sleep(22);
      }

      cursor.remove();
      await sleep(150);
    }
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeLines();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(container.closest('.hero-visual'));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ---------------------------------------------------------------
   Copy email address to clipboard (working contact interaction,
   no backend required)
--------------------------------------------------------------- */
function initEmailCopy() {
  const btn = document.getElementById('copyEmail');
  const toast = document.getElementById('copyToast');
  if (!btn || !toast) return;

  let toastTimeout;

  btn.addEventListener('click', async () => {
    const email = btn.getAttribute('data-email');

    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied — ' + email);
    } catch (err) {
      // Clipboard API unavailable — fall back to a mailto link
      window.location.href = `mailto:${email}`;
    }
  });

  function showToast(message) {
    toast.textContent = message;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.textContent = '';
    }, 3000);
  }
}
