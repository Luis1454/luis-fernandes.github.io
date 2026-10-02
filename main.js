/* ---------------------------------------------------------------
   CoreEngine – zero‑dependency TUI controller
   --------------------------------------------------------------- */
'use strict';

class CoreEngine {
  constructor() {
    this.terminal = document.getElementById('terminal');
    this.history = [];
    this.historyIdx = -1;
    this.init();
  }

  /* -----------------------------------------------------------------
     Bootstrap
  ----------------------------------------------------------------- */
  init() {
    // Remove the JS‑disabled overlay asap
    document.body.classList.remove('js-disabled');
    this.writeBanner();
    this.writePrompt();
    // Global listeners (passive)
    window.addEventListener('keydown', e => this.onKeyDown(e), {passive:true});
    // Resize → debounce (avoid layout thrash)
    window.addEventListener('resize', this.debounce(() => {
      this.terminal.scrollTop = this.terminal.scrollHeight;
    }, 150));
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

  write(html = '', cls = '') {
    const line = document.createElement('div');
    line.className = `output ${cls}`.trim();
    line.innerHTML = html;
    this.terminal.appendChild(line);
    // Keep newest content in view
    this.terminal.scrollTop = this.terminal.scrollHeight;
  }

  writeBanner() {
    const banner = `
      <span class="cmd-about">┌─[${new Date().getFullYear()}]─[Luis Fernandes]─[portfolio]</span>
      <br><span class="cmd-about">│ Hi! I’m a senior systems engineer (HPC, low‑level, aerospace).</span>
      <br><span class="cmd-about">│ Type <strong>help</strong> for available commands.</span>
      <br><span class="cmd-about">└─$</span>`;
    this.write(banner, 'cmd-about');
  }

  writePrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'prompt';
    prompt.innerHTML = `
      <span class="user">guest</span><span class="at">@</span>
      <span class="path">~</span><span class="caret"></span>
    `;
    this.terminal.appendChild(prompt);
    this.terminal.scrollTop = this.terminal.scrollHeight;
    this.currentPrompt = prompt;
  }

  /* -----------------------------------------------------------------
     Input handling
  ----------------------------------------------------------------- */
  onKeyDown(e) {
    if (!this.currentPrompt) return;
    const key = e.key;

    // Printable characters
    if (key.length === 1 && !e.ctrlKey && !e.metaKey) {
      this.appendToPrompt(key);
      return;
    }

    // Backspace
    if (key === 'Backspace') {
      this.removeFromPrompt();
      e.preventDefault();
      return;
    }

    // Enter → execute
    if (key === 'Enter') {
      const cmd = this.currentInput.trim();
      this.history.push(cmd);
      this.historyIdx = this.history.length;
      this.finalizePrompt(cmd);
      this.executeCommand(cmd);
      this.writePrompt();
      e.preventDefault();
      return;
    }

    // Arrow Up/Down → browse history
    if (key === 'ArrowUp') {
      if (this.historyIdx > 0) {
        this.historyIdx--;
        this.setPrompt(this.history[this.historyIdx]);
      }
      e.preventDefault();
      return;
    }
    if (key === 'ArrowDown') {
      if (this.historyIdx < this.history.length - 1) {
        this.historyIdx++;
        this.setPrompt(this.history[this.historyIdx]);
      } else {
        this.historyIdx = this.history.length;
        this.setPrompt('');
      }
      e.preventDefault();
      return;
    }
  }

  get currentInput() {
    return this.currentPrompt.dataset.input || '';
  }

  set currentInput(val) {
    this.currentPrompt.dataset.input = val;
  }

  appendToPrompt(ch) {
    this.currentInput += ch;
    this.renderPrompt();
  }

  removeFromPrompt() {
    this.currentInput = this.currentInput.slice(0, -1);
    this.renderPrompt();
  }

  setPrompt(text) {
    this.currentInput = text;
    this.renderPrompt();
  }

  renderPrompt() {
    const existing = this.currentPrompt.querySelector('.input');
    if (existing) existing.textContent = this.currentInput;
    else {
      const span = document.createElement('span');
      span.className = 'input';
      span.textContent = this.currentInput;
      this.currentPrompt.insertBefore(span, this.currentPrompt.querySelector('.caret'));
    }
  }

  finalizePrompt(command) {
    const line = document.createElement('div');
    line.className = 'output';
    line.innerHTML = this.currentPrompt.innerHTML;
    this.terminal.replaceChild(line, this.currentPrompt);
    this.currentPrompt = null;
  }

  /* -----------------------------------------------------------------
     Command dispatcher
  ----------------------------------------------------------------- */
  executeCommand(raw) {
    const cmd = raw.trim().toLowerCase();
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
        │ • HPC & GPU acceleration (CUDA, OpenCL, AVX2)
        │ • Low‑level architecture (C/C++, Rust, Assembly)
        │ • Aerospace telemetry & real‑time DSP
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

      clear: () => { this.terminal.innerHTML = ''; },

      date: () => {
        const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
        this.write(`<span class="success">${now}</span>`, 'success');
      }
    };

    if (commands[cmd]) {
      commands[cmd]();
    } else if (cmd) {
      this.write(`<span class="error">command not found: ${cmd}</span>`, 'error');
    }
  }
}

/* -----------------------------------------------------------------
   Boot the engine when the DOM is ready
----------------------------------------------------------------- */
if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', () => new CoreEngine());
else
  new CoreEngine();
