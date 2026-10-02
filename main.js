'use strict';
/*
  CoreEngine – zero‑dependency, high‑performance UI controller.
  Responsibilities:
    • Canvas telemetry particle system (off‑screen buffer, requestAnimationFrame).
    • Scroll progress, back‑to‑top visibility, and lazy scroll listeners (passive).
    • Command palette with fuzzy search (Levenshtein distance, O(n·m) for small lists).
    • IntersectionObserver for reveal animations (hero, timeline, bento items).
    • Dynamic project card generation (data‑driven, no duplication in markup).
*/

// -------------------------------------------------------------------
// Configuration & static data
// -------------------------------------------------------------------
const CONFIG = {
  colors: {
    brand: getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()
  },
  typewriter: [
    'Initializing telemetry pipeline...',
    'Calibrating CUDA kernels...',
    'Launching high‑throughput data streams...',
    'SYSTEM_CORE: READY.'
  ],
  projects: [
    {
      title: 'LBR Telemetry Receiver',
      img: 'https://picsum.photos/seed/aerospace1/800/600',
      tags: ['CUDA','C++','SDR'],
      specs: [
        {label: 'Throughput', value: '12.5 Mbps'},
        {label: 'Latency', value: '< 10 ms'},
        {label: 'Precision', value: 'Float64'}
      ],
      detail: 'Real‑time telemetry pipeline for long‑range rockets. Handles demodulation, error checking, and frame reconstruction.'
    },
    {
      title: 'Backlight N‑Body Engine',
      img: 'https://picsum.photos/seed/hpc2/800/600',
      tags: ['AVX2','C','SIMD'],
      specs: [
        {label: 'Bodies', value: '1000+'},
        {label: 'FPS', value: '60'},
        {label: 'Precision', value: '128‑bit'}
      ],
      detail: 'SIMD‑optimized astrophysics simulation delivering smooth 60 FPS with extended‑precision arithmetic.'
    },
    {
      title: 'Relativistic Raytracer',
      img: 'https://picsum.photos/seed/physics3/800/600',
      tags: ['CUDA','OptiX','GLSL'],
      specs: [
        {label: 'Model', value: 'Schwarzschild'},
        {label: 'Samples', value: '4K Progressive'}
      ],
      detail: 'GPU‑accelerated ray‑tracer simulating light bending around massive objects using CUDA‑OptiX pipelines.'
    }
  ]
};

// -------------------------------------------------------------------
// Utility helpers – lightweight and pure JS
// -------------------------------------------------------------------
function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

function fuzzyScore(query, target) {
  // Simple Levenshtein‑based scoring (lower = better). For short strings this is fine.
  const m = query.length, n = target.length;
  const dp = new Array(m + 1).fill(0).map((_, i) => i);
  for (let j = 1; j <= n; j++) {
    let prev = dp[0];
    dp[0] = j;
    for (let i = 1; i <= m; i++) {
      const cur = dp[i];
      const cost = query[i - 1] === target[j - 1] ? 0 : 1;
      dp[i] = Math.min(dp[i - 1] + 1, dp[i] + 1, prev + cost);
      prev = cur;
    }
  }
  return dp[m];
}

function sortFuzzy(list, query) {
  const lowered = query.toLowerCase();
  return list
    .map(item => ({item, score: fuzzyScore(lowered, item.toLowerCase())}))
    .sort((a, b) => a.score - b.score)
    .map(o => o.item);
}

// -------------------------------------------------------------------
// Core Engine class
// -------------------------------------------------------------------
class CoreEngine {
  constructor() {
    this.state = {
      cursor: {x:0, y:0},
      scrollY: 0,
      isPaletteOpen: false
    };
    this.init();
  }

  init() {
    // Remove JS‑disabled class as soon as possible
    document.body.classList.remove('js-disabled');
    // Prepare UI components
    this.setupEventListeners();
    this.initSpotlight();
    this.initTypewriter();
    this.initHeroCanvas();
    this.initRevealObserver();
    this.renderProjects();
    this.initCommandPalette();
    this.initTimeline();
    // Set initial year (footer may need it later)
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------------------------
  // Global event handling – passive wherever possible
  // -----------------------------------------------------------------
  setupEventListeners() {
    // Mouse move – cursor tracking for radial gradient spotlight (throttled via RAF)
    let lastX = 0, lastY = 0, rafPending = false;
    window.addEventListener('mousemove', e => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          this.state.cursor.x = lastX;
          this.state.cursor.y = lastY;
          this.updateSpotlight();
          rafPending = false;
        });
      }
    }, {passive:true});

    // Scroll – progress bar & back‑to‑top visibility (throttled)
    const onScroll = debounce(() => {
      this.state.scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (this.state.scrollY / docHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-percent', `${percent}%`);
      const backBtn = document.querySelector('.back-to-top');
      if (backBtn) {
        if (this.state.scrollY > 300) backBtn.classList.add('show');
        else backBtn.classList.remove('show');
      }
    }, 50);
    window.addEventListener('scroll', onScroll, {passive:true});

    // Keyboard shortcuts – Cmd/Ctrl+K for palette
    window.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.togglePalette();
      }
    });
  }

  // -----------------------------------------------------------------
  // Spotlight – CSS custom properties driven radial gradient
  // -----------------------------------------------------------------
  initSpotlight() {
    // Initial assignment
    this.updateSpotlight();
  }
  updateSpotlight() {
    document.documentElement.style.setProperty('--x', `${this.state.cursor.x}px`);
    document.documentElement.style.setProperty('--y', `${this.state.cursor.y}px`);
  }

  // -----------------------------------------------------------------
  // Typewriter – minimal setTimeout loop (no heavy libs)
  // -----------------------------------------------------------------
  initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    let lineIdx = 0,
        charIdx = 0,
        deleting = false;
    const tick = () => {
      const line = CONFIG.typewriter[lineIdx];
      if (deleting) {
        charIdx--;
        el.textContent = line.substring(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          lineIdx = (lineIdx + 1) % CONFIG.typewriter.length;
        }
      } else {
        charIdx++;
        el.textContent = line.substring(0, charIdx);
        if (charIdx === line.length) {
          deleting = true;
        }
      }
      setTimeout(tick, deleting ? 50 : 100);
    };
    tick();
  }

  // -----------------------------------------------------------------
  // Hero canvas – depth‑aware bokeh particles (80 particles, off‑screen buffer)
  // -----------------------------------------------------------------
  initHeroCanvas() {
    // Skip heavy canvas on reduced‑motion or low‑power devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 2)) {
      // Simple CSS fallback already defined in .hero-visual
      return;
    }
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    // Debounce resize to avoid layout thrash
    const debouncedResize = debounce(resize, 100);
    window.addEventListener('resize', debouncedResize);
    resize();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width / (window.devicePixelRatio || 1);
        this.y = Math.random() * canvas.height / (window.devicePixelRatio || 1);
        this.z = Math.random() * 1000;
        const speed = (this.z / 1000) * 0.2 + 0.05; // slower, fewer particles
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.r = (1 - this.z / 1000) * 1.5 + 0.3;
      }
      update(cursor) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        const dx = this.x - cursor.x;
        const dy = this.y - cursor.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const influence = (1000 - this.z) / 1000;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * influence * 0.1;
          this.y += Math.sin(angle) * influence * 0.1;
        }
      }
      draw(ctx) {
        const scale = (1000 - this.z) / 1000;
        ctx.globalAlpha = scale * 0.5;
        ctx.filter = `blur(${this.z / 250}px)`;
        ctx.fillStyle = CONFIG.colors.brand;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = 'none';
        ctx.globalAlpha = 1;
      }
    }

    const particles = Array.from({ length: 20 }, () => new Particle()); // further reduced count
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cursor = { x: this.state.cursor.x, y: this.state.cursor.y };
      particles.forEach(p => { p.update(cursor); p.draw(ctx); });
      requestAnimationFrame(render);
    };
    render();
  }

  // -----------------------------------------------------------------
  // IntersectionObserver – reveal on scroll (fallback via CSS animation)
  // -----------------------------------------------------------------
  initRevealObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, {threshold: 0.1});
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }

  // -----------------------------------------------------------------
  // Projects – generate cards dynamically from CONFIG.projects
  // -----------------------------------------------------------------
  renderProjects() {
    const schedule = () => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          this._renderProjectsNow();
        });
      } else {
        this._renderProjectsNow();
      }
    };
    schedule();
  }
  _renderProjectsNow() {
    const container = document.querySelector('.projects-grid');
    if (!container) return;
    const fragment = document.createDocumentFragment();
    CONFIG.projects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.reveal = '';
      card.innerHTML = `
        <img src="${proj.img}" alt="${proj.title}" class="project-img" loading="lazy" />
        <div class="project-info">
          <h3>${proj.title}</h3>
          <div class="project-meta">
            ${proj.tags.map(tag => `<span class="meta-tag">${tag}</span>`).join('')}
          </div>
          <p>${proj.detail}</p>
          <div class="project-footer">
            <a href="#" class="project-link" data-project="${proj.title}">Details ⟶</a>
          </div>
        </div>`;
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
    // Observe for reveal animation
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, {threshold:0.1});
    container.querySelectorAll('.project-card').forEach(c => observer.observe(c));
    // Modal handling
    const dialog = document.getElementById('project-dialog');
    const body = document.getElementById('dialog-body');
    if (!dialog) return;
    container.addEventListener('click', e => {
      const link = e.target.closest('.project-link');
      if (!link) return;
      e.preventDefault();
      const title = link.dataset.project;
      const proj = CONFIG.projects.find(p => p.title === title);
      if (!proj) return;
      body.innerHTML = `
        <h2>${proj.title}</h2>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1rem 0;">
          <div>
            <h4>Specs</h4>
            ${proj.specs.map(s=>`<div style="display:flex; justify-content:space-between; margin:0.2rem 0;"><span>${s.label}</span><span>${s.value}</span></div>`).join('')}
          </div>
          <div>
            <h4>Tech Stack</h4>
            ${proj.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <p>${proj.detail}</p>
      `;
      dialog.showModal();
    });
    const closeBtn = dialog.querySelector('.close-dialog');
    if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());
  }

  // -----------------------------------------------------------------
  // Command palette – fuzzy search over static commands + project titles
  // -----------------------------------------------------------------
  initCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-input');
    const suggestions = palette.querySelector('.palette-suggestions');
    const closeBtn = palette.querySelector('.palette-close');

    const commands = [
      {cmd:'goto projects', label:'Navigate to Projects'},
      {cmd:'goto expertise', label:'Navigate to Expertise'},
      {cmd:'goto timeline', label:'Navigate to Timeline'},
      {cmd:'goto contact', label:'Navigate to Contact'},
      {cmd:'clear', label:'Clear console (demo)'}
    ];

    const open = () => { palette.showModal(); input.focus(); this.state.isPaletteOpen = true; renderList(commands.map(c=>c.cmd)); };
    const close = () => { palette.close(); input.value=''; suggestions.innerHTML=''; this.state.isPaletteOpen = false; };
    this.togglePalette = () => { if (this.state.isPaletteOpen) close(); else open(); };
    closeBtn.addEventListener('click', close);
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter') {
        const val = input.value.trim();
        this.executeCommand(val);
        close();
      }
    });
    input.addEventListener('input', e => {
      const val = e.target.value.trim();
      if (!val) { renderList(commands.map(c=>c.cmd)); return; }
      const filtered = sortFuzzy(commands.map(c=>c.cmd), val);
      renderList(filtered);
    });
    const renderList = list => {
      suggestions.innerHTML = list.map(item => `<li role="option" data-cmd="${item}">${item}</li>`).join('');
      suggestions.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => { this.executeCommand(li.dataset.cmd); close(); });
      });
    };
  }

  executeCommand(cmd) {
    const map = {
      'goto projects': () => document.getElementById('projects').scrollIntoView({behavior:'smooth'}),
      'goto expertise': () => document.getElementById('expertise').scrollIntoView({behavior:'smooth'}),
      'goto timeline': () => document.getElementById('timeline').scrollIntoView({behavior:'smooth'}),
      'goto contact': () => document.getElementById('contact').scrollIntoView({behavior:'smooth'}),
      'clear': () => console.clear()
    };
    const fn = map[cmd.toLowerCase()];
    if (fn) fn();
  }

  // -----------------------------------------------------------------
  // Timeline – add CSS class via IntersectionObserver (already covered)
  // -----------------------------------------------------------------
  initTimeline() {
    // No extra JS needed – CSS handles [data-reveal] transition.
  }
}

// -------------------------------------------------------------------
// Boot the engine when DOM is ready
// -------------------------------------------------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new CoreEngine());
} else {
  new CoreEngine();
}
