/**
 * LF_CORE // Systems Engineering Portfolio
 * Production-ready, zero-dependency, high-performance implementation.
 */

const SYSTEM_CONFIG = {
  colors: {
    brand: '#00f2ff',
    bg: '#09090b'
  },
  typewriter: [
    "Initializing aerospace systems...",
    "Calibrating telemetry pipelines...",
    "Optimizing CUDA kernels...",
    "Loading mission-critical modules...",
    "SYSTEM_CORE: READY."
  ],
  projects: {
    p1: {
      title: "LBR Telemetry Receiver",
      specs: [
        { label: "Throughput", value: "12.5 Mbps" },
        { label: "Latency", value: "< 10ms" },
        { label: "Complexity", value: "O(n)" },
        { label: "Precision", value: "Float64" }
      ],
      tech: ["C++20", "SDR", "UDP/IP", "POSIX Threads"],
      detail: "A high-performance reception pipeline designed for Long Beach Rocketry. Implements real-time frame reconstruction and checksum validation for high-velocity telemetry streams."
    },
    p2: {
      title: "Backlight N-body Engine",
      specs: [
        { label: "Bodies", value: "1000+" },
        { label: "Precision", value: "128-bit" },
        { label: "Performance", value: "60 FPS" },
        { label: "Architecture", value: "SIMD Optimized" }
      ],
      tech: ["Pure C", "AVX2", "pthreads", "OpenGL"],
      detail: "A cosmological simulation engine focusing on extreme precision and cache-local data structures to prevent floating-point drift in long-duration simulations."
    },
    p3: {
      title: "Relativistic Raytracer",
      specs: [
        { label: "Model", value: "Schwarzschild" },
        { label: "Acc", value: "NVIDIA OptiX" },
        { label: "Physics", value: "Geodesic" },
        { label: "Sampling", value: "4K Progressive" }
      ],
      tech: ["CUDA", "C++", "OptiX", "GLSL"],
      detail: "A raytracer that simulates light bending in curved spacetime. Uses GPU-accelerated geodesic integration to render gravitationally lensed celestial objects."
    }
  }
};

class CoreEngine {
  constructor() {
    this.state = {
      cursor: { x: 0, y: 0 },
      isPaletteOpen: false
    };

    this.init();
  }

  init() {
    console.log("SYSTEM_CORE: Initializing...");
    try {
      document.body.classList.remove('js-disabled');

      // Force visibility for critical elements to prevent fade-out
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.classList.add('visible');
        heroContent.style.opacity = '1';
      }

      this.setupEventListeners();
      this.initSpotlight();
      this.initTypewriter();
      this.initHeroCanvas();
      this.initRevealObserver();
      this.initMetrics();
      this.initProjectModals();
      this.initCommandPalette();

      const yearEl = document.getElementById('year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      console.log("SYSTEM_CORE: Online.");
    } catch (e) {
      console.error("SYSTEM_CORE: Critical error during init:", e);
      document.body.classList.add('js-disabled');
    }
  }

  setupEventListeners() {
    window.addEventListener('mousemove', (e) => {
      this.state.cursor.x = e.clientX;
      this.state.cursor.y = e.clientY;
      this.updateSpotlight();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.togglePalette();
      }
    });
  }

  updateSpotlight() {
    document.documentElement.style.setProperty('--x', `${this.state.cursor.x}px`);
    document.documentElement.style.setProperty('--y', `${this.state.cursor.y}px`);
  }

  initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    let lineIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    const type = () => {
      const currentLine = SYSTEM_CONFIG.typewriter[lineIdx];
      if (isDeleting) {
        el.textContent = currentLine.substring(0, charIdx - 1);
        charIdx--;
      } else {
        el.textContent = currentLine.substring(0, charIdx + 1);
        charIdx++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIdx === currentLine.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        lineIdx = (lineIdx + 1) % SYSTEM_CONFIG.typewriter.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }

  initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class BokehParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000; // Depth value
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 2 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Parallax effect based on depth (z)
        const dx = this.x - this.state.cursor.x;
        const dy = this.y - this.state.cursor.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 200) {
          const influence = (1000 - this.z) / 1000; // Nearer particles move more
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * influence * 0.3;
          this.y += Math.sin(angle) * influence * 0.3;
        }
      }
      draw() {
        const scale = (1000 - this.z) / 1000;
        const currentRadius = this.radius * scale * 2;
        const opacity = scale * 0.6;

        // Bokeh effect: blur further particles
        const blur = (this.z / 100) * 1.5;
        ctx.filter = `blur(${blur}px)`;

        ctx.fillStyle = SYSTEM_CONFIG.colors.brand;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = 'none'; // Reset filter for next particle
      }
    }

    particles = Array.from({ length: 80 }, () => new BokehParticle());

    const animate = () => {
      if (!this.canvasActive) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause animation when not visible
    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.canvasActive = true;
        } else {
          this.canvasActive = false;
        }
      });
    }, { threshold: 0.1 });

    canvasObserver.observe(canvas);
    this.canvasActive = true;
    animate();
  }
  }

  initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }

  initMetrics() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const values = entry.target.querySelectorAll('.metric-value');
          values.forEach(val => {
            const target = parseInt(val.dataset.target);
            this.animateValue(val, target);
          });
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.bento-item').forEach(el => observer.observe(el));
  }

  animateValue(el, target) {
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    const frame = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.ceil(current);
        requestAnimationFrame(frame);
      } else {
        el.textContent = target;
      }
    };
    frame();
  }

  initProjectModals() {
    const dialog = document.getElementById('project-dialog');
    const body = document.getElementById('dialog-body');
    if (!dialog || !body) return;

    document.querySelectorAll('.open-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.project;
        const project = SYSTEM_CONFIG.projects[pid];
        if (!project) return;

        body.innerHTML = `
          <h2 style="color:var(--brand); font-family:var(--font-mono); margin-bottom:1rem">${project.title}</h2>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
            <div>
              <h4 style="color:var(--text-muted); font-family:var(--font-mono); font-size:0.8rem; text-transform:uppercase; margin-bottom:1rem">System Specs</h4>
              <div style="display:flex; flex-direction:column; gap:0.5rem">
                ${project.specs.map(s => `
                  <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.9rem; border-bottom:1px solid var(--surface-border)">
                    <span>${s.label}</span>
                    <span style="color:var(--brand)">${s.value}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <h4 style="color:var(--text-muted); font-family:var(--font-mono); font-size:0.8rem; text-transform:uppercase; margin-bottom:1rem">Tech Stack</h4>
              <div style="display:flex; flex-wrap:wrap; gap:0.5rem">
                ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
          </div>
          <p style="color:var(--text-muted); line-height:1.6">${project.detail}</p>
        `;

        dialog.showModal();
      });
    });

    const closeBtn = document.querySelector('.close-dialog');
    if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());
  }

  initCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-input');
    const suggestions = document.querySelectorAll('.suggestion-item');
    if (!palette || !input) return;

    const open = () => {
      palette.showModal();
      input.focus();
    };

    const close = () => {
      palette.close();
      input.value = '';
    };

    this.togglePalette = () => {
      if (this.state.isPaletteOpen) close();
      else open();
      this.state.isPaletteOpen = !this.state.isPaletteOpen;
    };

    const closeBtn = document.querySelector('.palette-close');
    if (closeBtn) closeBtn.addEventListener('click', close);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter') {
        const cmd = input.value.toLowerCase().trim();
        this.executeCommand(cmd);
      }
    });

    suggestions.forEach(item => {
      item.addEventListener('click', () => {
        this.executeCommand(item.dataset.cmd);
      });
    });

    input.addEventListener('input', () => {
      const val = input.value.toLowerCase();
      suggestions.forEach(s => {
        s.style.display = s.dataset.cmd.includes(val) ? 'flex' : 'none';
      });
    });
  }

  executeCommand(cmd) {
    const commands = {
      'goto projects': () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
      'goto expertise': () => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' }),
      'goto contact': () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      'clear': () => alert('Console cleared. System status: NOMINAL'),
      'help': () => alert('Available commands: goto projects, goto expertise, goto contact, clear, help')
    };

    if (commands[cmd]) {
      commands[cmd]();
      this.state.isPaletteOpen = false;
      document.getElementById('cmd-palette')?.close();
    } else {
      alert(`Command not found: ${cmd}. Type 'help' for list.`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CoreEngine();
});
