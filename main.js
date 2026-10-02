/* ---------------------------------------------------------------
   CoreEngine – refined TUI controller with typewriter banner & fade‑in output
   --------------------------------------------------------------- */
'use strict';

class CoreEngine {
  constructor() {
    // DOM elements
    this.outputPane = document.querySelector('.tui-main');
    this.inputField = document.querySelector('.tui-input');
    this.menuItems = document.querySelectorAll('.tui-menu-item');

    this.history = [];
    this.historyIdx = -1;
    this.bannerTyped = false;

    this.init();
  }

  /* -----------------------------------------------------------------
     Bootstrap
  ----------------------------------------------------------------- */
  init() {
    document.body.classList.remove('js-disabled');
    // Focus input early
    this.inputField.focus();
    // Global listeners
    this.inputField.addEventListener('keydown', e => this.onKeyDown(e));
    window.addEventListener('resize', this.debounce(() => this.scrollToBottom(), 120));
    // Sidebar command click shortcut
    this.menuItems.forEach(item => {
      item.addEventListener('click', () => {
        this.handleCommand(item.dataset.cmd);
        this.highlightMenu(item.dataset.cmd);
      });
    });
    // Show banner with typewriter effect
    this.typewriterBanner();
  }

  /* -----------------------------------------------------------------
     Utilities
  ----------------------------------------------------------------- */
  debounce(fn, wait) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  scrollToBottom() {
    this.outputPane.scrollTop = this.outputPane.scrollHeight;
  }

  write(html = '', cls = '') {
    const line = document.createElement('div');
    line.className = `output ${cls}`.trim();
    line.innerHTML = html;
    this.outputPane.appendChild(line);
    this.scrollToBottom();
  }

  /* -----------------------------------------------------------------
     Typewriter banner (simulates OS boot)
  ----------------------------------------------------------------- */
  async typewriterBanner() {
    const lines = [
      `<span class="cmd-about">┌─[${new Date().getFullYear()}]─[Luis Fernandes]─[TUI]</span>`,
      `<span class="cmd-about">│ Welcome to my interactive portfolio.</span>`,
      `<span class="cmd-about">│ Type <strong>help</strong> for available commands.</span>`,
      `<span class="cmd-about">└─$</span>`
    ];
    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 150)); // slight delay per line
      this.write(lines[i], 'cmd-about');
    }
    this.bannerTyped = true;
    this.inputField.focus();
  }

  /* -----------------------------------------------------------------
     Input handling – Enter, history navigation
  ----------------------------------------------------------------- */
  onKeyDown(e) {
    if (e.key === 'Enter') {
      const raw = this.inputField.value.trim();
      if (!raw) return;
      this.inputField.value = '';
      // Echo user command (styled)
      this.write(`<span class="cmd-user">${raw}</span>`, 'cmd-user');
      // Store history
      this.history.push(raw);
      this.historyIdx = this.history.length;
      this.handleCommand(raw);
      e.preventDefault();
      return;
    }

    // History navigation (up/down) – only when input is focused
    if (e.key === 'ArrowUp') {
      if (this.historyIdx > 0) {
        this.historyIdx--;
        this.inputField.value = this.history[this.historyIdx];
      }
      e.preventDefault();
    }
    if (e.key === 'ArrowDown') {
      if (this.historyIdx < this.history.length - 1) {
        this.historyIdx++;
        this.inputField.value = this.history[this.historyIdx];
      } else {
        this.historyIdx = this.history.length;
        this.inputField.value = '';
      }
      e.preventDefault();
    }
  }

  /* -----------------------------------------------------------------
     Command dispatcher
  ----------------------------------------------------------------- */
  handleCommand(raw) {
    const cmd = raw.toLowerCase();
    const commands = {
      help: () => this.write(`
        <strong>help</strong>       – list commands
        <strong>about</strong>      – short bio
        <strong>projects</strong>   – list of projects
        <strong>contact</strong>    – contact information
        <strong>clear</strong>      – clear screen
        <strong>date</strong>       – show current date
      `, 'cmd-help'),

      about: () => this.write(`
        ┌─[about]
        │ Luis Fernandes – senior systems engineer.
        │ • HPC & GPU (CUDA, OpenCL, AVX2)
        │ • Low‑level (C/C++, Rust, Assembly)
        │ • Aerospace telemetry & DSP
        └─$`, 'cmd-about'),

      projects: () => {
        const list = `
          ┌─[projects]
          │ 1) LBR Telemetry Receiver – CUDA, SDR, real‑time pipeline
          │ 2) Backlight N‑Body Engine – SIMD‑optimized, 60 FPS, 1000+ bodies
          │ 3) Relativistic Raytracer – OptiX + CUDA ray‑tracing
          └─$`;
        this.write(list, 'cmd-projects');
      },

      contact: () => this.write(`
        ┌─[contact]
        │ Email   : luis.fernandes@epitech.eu
        │ LinkedIn: https://linkedin.com/in/luis-fernandes-289465231/
        │ GitHub  : https://github.com/Luis1454
        └─$`, 'cmd-contact'),

      clear: () => { this.outputPane.innerHTML = ''; },

      date: () => {
        const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
        this.write(`<span class="success">${now}</span>`, 'success');
      }
    };

    if (commands[cmd]) {
      commands[cmd]();
      this.highlightMenu(cmd);
    } else if (cmd) {
      this.write(`<span class="error">command not found: ${cmd}</span>`, 'error');
    }
  }

  highlightMenu(cmd) {
    this.menuItems.forEach(item => {
      if (item.dataset.cmd === cmd) item.classList.add('active');
      else item.classList.remove('active');
    });
  }
}

/* -----------------------------------------------------------------
   Boot the engine when DOM is ready
----------------------------------------------------------------- */
if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', () => new CoreEngine());
else
  new CoreEngine();
