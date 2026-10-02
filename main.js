/* ---------------------------------------------------------------
   CoreEngine – renders an ASCII‑style UI and handles navigation
   --------------------------------------------------------------- */
'use strict';

class CoreEngine {
  constructor() {
    this.screen = document.getElementById('tui-screen');

    // Page content (plain‑text blocks)
    this.pages = {
      home: this.renderHome(),
      about: this.renderAbout(),
      projects: this.renderProjects(),
      contact: this.renderContact(),
    };
    this.current = 'home';
    this.render();

    // Arrow‑key navigation (← / →)
    window.addEventListener('keydown', e => this.onKey(e));
    // Click navigation – clicking on menu label switches pages
    this.screen.addEventListener('click', e => this.onClick(e));
  }

  /* -----------------------------------------------------------------
     Keyboard handling – left/right arrows cycle pages
  ----------------------------------------------------------------- */
  onKey(e) {
    if (e.key === 'ArrowRight') {
      this.switchTo(this.nextPage());
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      this.switchTo(this.prevPage());
      e.preventDefault();
    }
  }

  /* -----------------------------------------------------------------
     Click handling – clicking on a menu label switches pages
  ----------------------------------------------------------------- */
  onClick(e) {
    const txt = e.target.textContent.trim().toLowerCase();
    if (['home', 'about', 'projects', 'contact'].includes(txt)) {
      this.switchTo(txt);
    }
  }

  nextPage() {
    const keys = Object.keys(this.pages);
    const idx = keys.indexOf(this.current);
    return keys[(idx + 1) % keys.length];
  }

  prevPage() {
    const keys = Object.keys(this.pages);
    const idx = keys.indexOf(this.current);
    return keys[(idx - 1 + keys.length) % keys.length];
  }

  switchTo(page) {
    if (!this.pages[page]) return;
    this.current = page;
    this.render();
  }

  /* -----------------------------------------------------------------
     Rendering – builds the full ASCII screen as a single string
  ----------------------------------------------------------------- */
  render() {
    const topBar  = this.renderTopBar();
    const menuBar = this.renderMenuBar();
    const body    = this.pages[this.current];
    const footer  = this.renderFooter();
    this.screen.textContent = `${topBar}\n${menuBar}\n${body}\n${footer}`;
  }

  renderTopBar() {
    const title = ' Luis Fernandes – Portfolio ';
    const filler = '─'.repeat(70 - title.length);
    return `┌${title}${filler}┐`;
  }

  renderMenuBar() {
    const items = ['home', 'about', 'projects', 'contact'];
    return items.map(name => {
      const label = name.toUpperCase();
      return name === this.current
        ? `│ [${label}] `
        : `│  ${label}  `;
    }).join('') + '│';
  }

  renderFooter() {
    const date = new Date().toLocaleDateString('fr-FR');
    const time = new Date().toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
    return `└${'─'.repeat(78)}┘\n${date} ${time}`;
  }

  /* -----------------------------------------------------------------
     Page bodies – plain ASCII strings (feel free to edit)
  ----------------------------------------------------------------- */
  renderHome() {
    return `
│ Welcome to my interactive ASCII‑style portfolio.                 │
│                                                               │
│ Use the ← / → arrow keys (or click the menu) to move between│
│ sections.                                                     │
│                                                               │
│ Press any key to explore.                                   │`;
  }

  renderAbout() {
    return `
│ About me:                                                    │
│   • Senior systems engineer – HPC, low‑level, aerospace.      │
│   • Passionate about performance‑first software.              │
│   • Loves retro UI aesthetics.                                 │
│                                                               │
│ Skills:                                                     │
│   • C / C++20 / Rust / Assembly                              │
│   • CUDA / OpenCL / AVX2                                     │
│   • Linux kernel / Docker / CI‑CD                              │`;
  }

  renderProjects() {
    return `
│ Projects (brief):                                          │
│   1) LBR Telemetry Receiver – CUDA‑based, real‑time SDR.    │
│   2) Backlight N‑Body Engine – SIMD‑optimized, 60 FPS,     │
│      1000+ bodies.                                           │
│   3) Relativistic Raytracer – OptiX + CUDA ray‑tracing.    │`;
  }

  renderContact() {
    return `
│ Contact:                                                    │
│   Email   : your@email.com                                  │
│   LinkedIn: https://linkedin.com/in/username                │
│   GitHub  : https://github.com/username                     │`;
  }
}

/* -----------------------------------------------------------------
   Initialise when the DOM is ready
----------------------------------------------------------------- */
if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', () => new CoreEngine());
else
  new CoreEngine();
