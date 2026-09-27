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
const FADE_MS = 900; // page fades to black
const BLINK_MS = 1060; // one on/off cycle of the cursor
const PRE_BLINKS = 3; // empty-cursor blinks before typing; it lights a 4th time as typing starts
const HOLD_MS = 1800; // how long a finished line stays before it clears
const GAP_MS = 500; // blank beat between lines

const CSS = `
.mt-root{position:fixed;inset:0;z-index:2147483647;background:#000;color:${GREEN};
font:clamp(1.05rem,2.4vw,1.6rem)/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;
text-shadow:0 0 6px rgba(0,255,65,.55);outline:none;overflow:hidden;
opacity:0;transition:opacity ${FADE_MS}ms ease}
.mt-root.mt-in{opacity:1}
.mt-text{margin:0;padding:clamp(1.5rem,6vw,4rem);white-space:pre-wrap}
.mt-line{min-height:1.6em}
.mt-cursor{display:inline-block;width:.6em;height:1.1em;margin-left:.08em;vertical-align:-.15em;
background:${GREEN};box-shadow:0 0 8px rgba(0,255,65,.6)}
.mt-blink{animation:mt-blink ${BLINK_MS}ms step-end infinite}
@keyframes mt-blink{50%{opacity:0}}
.mt-hint{position:absolute;right:1rem;bottom:.75rem;padding:.25rem .5rem;border:0;background:none;
color:rgba(0,255,65,.45);font:inherit;font-size:.75rem;text-shadow:none;cursor:pointer}
.mt-hint:hover,.mt-hint:focus-visible{color:${GREEN}}
.mt-hint:focus-visible{outline:1px solid ${GREEN};outline-offset:2px}
.mt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media (prefers-reduced-motion:reduce){.mt-root{transition:none}.mt-blink{animation:none}}
`;

/**
 * @typedef {object} Session
 * @property {HTMLElement} root
 * @property {Element | null} restoreFocus
 * @property {string} restoreOverflow
 * @property {string} restorePadding
 * @property {Set<number>} timers
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

/**
 * The Neo-monitor scene: an empty cursor blinks PRE_BLINKS times, then LINES
 * play one at a time in the same spot: type (or show) a line, hold it with a
 * blinking cursor, clear, pause, next. The last line stays until close. With
 * reduced motion the cursor holds still and every line appears whole.
 */
function play(
  /** @type {Session} */ s,
  /** @type {HTMLElement} */ text,
  /** @type {HTMLElement} */ cursor,
  /** @type {boolean} */ reduced,
) {
  // One line element for the whole sequence: its text node, then the cursor.
  const typed = document.createTextNode('');
  const line = el('div', 'mt-line');
  line.append(typed, cursor);
  cursor.classList.add('mt-blink');
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
    step();
  };

  later(s, PRE_BLINKS * BLINK_MS, show);
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

  const text = el('div', 'mt-text');
  text.setAttribute('aria-hidden', 'true');
  const cursor = el('span', 'mt-cursor');

  const hint = el('button', 'mt-hint');
  hint.type = 'button';
  hint.textContent = 'esc to exit';
  hint.addEventListener('click', close);

  root.append(text, desc, hint);

  const body = document.body;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  /** @type {Session} */
  const s = {
    root,
    restoreFocus: document.activeElement,
    restoreOverflow: body.style.overflow,
    restorePadding: body.style.paddingRight,
    timers: new Set(),
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

  // Fade to black (instant under reduced motion), then start the scene.
  void root.offsetWidth; // commit opacity 0 so the fade runs
  root.classList.add('mt-in');
  if (reduced) play(s, text, cursor, true);
  else later(s, FADE_MS, () => play(s, text, cursor, false));
}

export function close() {
  const s = session;
  if (!s) return;
  session = null;

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
