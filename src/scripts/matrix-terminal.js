// @ts-check
// The Matrix terminal behind the backtick easter egg. MatrixTrigger.astro
// imports this file by URL on the first press, so it never loads with a page.
// It is plain JS (types via JSDoc) because Vite ships ?url imports as-is.

/** Shown one at a time in this order; `instant` lines appear whole instead of typing. */
export const LINES = [
  { text: 'Wake up, Neo...' },
  { text: 'The Matrix has you...' },
  { text: 'Follow the white rabbit.' },
  { text: 'Knock, knock, Neo.', instant: true },
];

const GREEN = '#00ff41';
const RAIN_MS = 1800;
const HOLD_MS = 1800; // how long a finished line stays before it clears
const GAP_MS = 500; // blank beat between lines
const RAIN_GLYPHS =
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';

const CSS = `
.mt-root{position:fixed;inset:0;z-index:2147483647;background:#000;color:${GREEN};
font:clamp(1.05rem,2.4vw,1.6rem)/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;
text-shadow:0 0 6px rgba(0,255,65,.55);outline:none;overflow:hidden}
.mt-rain{position:absolute;inset:0;width:100%;height:100%;transition:opacity .9s ease}
.mt-rain.mt-dim{opacity:.14}
.mt-text{position:relative;margin:0;padding:clamp(1.5rem,6vw,4rem);white-space:pre-wrap}
.mt-line{min-height:1.6em}
.mt-cursor{display:inline-block;width:.6em;height:1.1em;margin-left:.08em;vertical-align:-.15em;
background:${GREEN};box-shadow:0 0 8px rgba(0,255,65,.6)}
.mt-blink{animation:mt-blink 1.06s step-end infinite}
@keyframes mt-blink{50%{opacity:0}}
.mt-hint{position:absolute;right:1rem;bottom:.75rem;padding:.25rem .5rem;border:0;background:none;
color:rgba(0,255,65,.45);font:inherit;font-size:.75rem;text-shadow:none;cursor:pointer}
.mt-hint:hover,.mt-hint:focus-visible{color:${GREEN}}
.mt-hint:focus-visible{outline:1px solid ${GREEN};outline-offset:2px}
.mt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media (prefers-reduced-motion:reduce){.mt-blink{animation:none}.mt-rain{transition:none}}
`;

/**
 * @typedef {object} Session
 * @property {HTMLElement} root
 * @property {Element | null} restoreFocus
 * @property {string} restoreOverflow
 * @property {string} restorePadding
 * @property {Set<number>} timers
 * @property {number} frame
 * @property {Array<() => void>} cleanup
 */

/** @type {Session | null} */
let session = null;

function ensureStyle() {
  if (document.getElementById('mt-style')) return;
  const style = document.createElement('style');
  style.id = 'mt-style';
  style.textContent = CSS;
  document.head.append(style);
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tag
 * @param {string} className
 * @returns {HTMLElementTagNameMap[K]}
 */
function el(tag, className) {
  const node = document.createElement(tag);
  node.className = className;
  return node;
}

/** Every timeout goes through here so close() can cancel them all. */
function later(/** @type {Session} */ s, /** @type {number} */ ms, /** @type {() => void} */ fn) {
  const id = window.setTimeout(() => {
    s.timers.delete(id);
    fn();
  }, ms);
  s.timers.add(id);
}

function startRain(/** @type {Session} */ s, /** @type {HTMLCanvasElement} */ canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const size = 16;
  /** @type {number[]} */
  let drops = [];

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${size}px ui-monospace, Menlo, Consolas, monospace`;
    const columns = Math.ceil(window.innerWidth / size);
    // Start each column a little above the screen at a random height so the
    // rain pours in instead of dropping as one flat sheet.
    drops = Array.from({ length: columns }, (_, i) => drops[i] ?? -Math.random() * 12);
  };
  resize();
  window.addEventListener('resize', resize);
  s.cleanup.push(() => window.removeEventListener('resize', resize));

  let last = 0;
  /** @param {number} now */
  const tick = (now) => {
    s.frame = requestAnimationFrame(tick);
    if (now - last < 33) return; // about 30 fps, chunky like the film
    last = now;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < drops.length; i++) {
      const y = drops[i] * size;
      if (y > 0) {
        const glyph = RAIN_GLYPHS[Math.floor(Math.random() * RAIN_GLYPHS.length)];
        ctx.fillStyle = Math.random() < 0.08 ? '#d7ffe0' : GREEN;
        ctx.fillText(glyph, i * size, y);
      }
      if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  };
  s.frame = requestAnimationFrame(tick);
}

/**
 * Plays LINES one at a time in the same spot, like the film: type (or show)
 * a line, hold it with a blinking cursor, clear, pause, next. The last line
 * stays until close. With reduced motion every line appears whole.
 */
function playLines(
  /** @type {Session} */ s,
  /** @type {HTMLElement} */ text,
  /** @type {HTMLElement} */ cursor,
  /** @type {boolean} */ reduced,
) {
  // One line element for the whole sequence: its text node, then the cursor.
  const typed = document.createTextNode('');
  const line = el('div', 'mt-line');
  line.append(typed, cursor);
  text.replaceChildren(line);
  let lineIndex = 0;

  const show = () => {
    const { text: content, instant = false } = LINES[lineIndex];
    const last = lineIndex === LINES.length - 1;

    const hold = () => {
      cursor.classList.add('mt-blink');
      if (last) return;
      later(s, HOLD_MS, () => {
        typed.data = '';
        lineIndex++;
        later(s, GAP_MS, show);
      });
    };

    if (instant || reduced) {
      typed.data = content;
      hold();
      return;
    }

    let charIndex = 0;
    const step = () => {
      if (charIndex >= content.length) {
        hold();
        return;
      }
      cursor.classList.remove('mt-blink'); // solid while typing
      const ch = content[charIndex++];
      typed.appendData(ch);
      // Human-ish rhythm: uneven keystrokes, a beat after punctuation.
      let delay = 45 + Math.random() * 90;
      if (ch === ',') delay += 180;
      if (ch === '.' && content[charIndex] === '.') delay += 120;
      if (ch === ' ' && Math.random() < 0.15) delay += 140;
      later(s, delay, step);
    };
    // A blinking beat before the first line; later lines already had the gap.
    if (lineIndex > 0) step();
    else later(s, 600, step);
  };

  show();
}

export function open() {
  if (session) return;
  ensureStyle();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = el('div', 'mt-root');
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Matrix terminal');
  root.setAttribute('aria-describedby', 'mt-desc');
  root.tabIndex = -1;

  // Screen readers get the whole message at once instead of per keystroke.
  const desc = el('p', 'mt-sr');
  desc.id = 'mt-desc';
  desc.textContent = LINES.map((l) => l.text).join(' ');

  const canvas = el('canvas', 'mt-rain');
  canvas.setAttribute('aria-hidden', 'true');
  const text = el('div', 'mt-text');
  text.setAttribute('aria-hidden', 'true');
  const cursor = el('span', 'mt-cursor');

  const hint = el('button', 'mt-hint');
  hint.type = 'button';
  hint.textContent = 'esc to exit';
  hint.addEventListener('click', close);

  root.append(canvas, text, desc, hint);

  const body = document.body;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  /** @type {Session} */
  const s = {
    root,
    restoreFocus: document.activeElement,
    restoreOverflow: body.style.overflow,
    restorePadding: body.style.paddingRight,
    timers: new Set(),
    frame: 0,
    cleanup: [],
  };
  session = s;

  body.style.overflow = 'hidden';
  if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  document.documentElement.setAttribute('data-matrix', '');
  body.append(root);
  root.focus();

  /** @param {KeyboardEvent} event */
  const onKey = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      // Keep focus inside: the dialog and its one button.
      event.preventDefault();
      (document.activeElement === hint ? root : hint).focus();
    }
  };
  document.addEventListener('keydown', onKey);
  s.cleanup.push(() => document.removeEventListener('keydown', onKey));

  if (reduced) {
    canvas.remove();
    playLines(s, text, cursor, true);
    return;
  }

  startRain(s, canvas);
  later(s, RAIN_MS, () => {
    canvas.classList.add('mt-dim');
    later(s, 500, () => playLines(s, text, cursor, false));
  });
}

export function close() {
  const s = session;
  if (!s) return;
  session = null;

  cancelAnimationFrame(s.frame);
  for (const id of s.timers) clearTimeout(id);
  s.timers.clear();
  for (const fn of s.cleanup) fn();
  s.root.remove();

  document.body.style.overflow = s.restoreOverflow;
  document.body.style.paddingRight = s.restorePadding;
  document.documentElement.removeAttribute('data-matrix');
  if (s.restoreFocus instanceof HTMLElement && s.restoreFocus.isConnected) {
    s.restoreFocus.focus({ preventScroll: true });
  }
}
