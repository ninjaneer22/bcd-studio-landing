// /utilities: the BCD utilities "lattice". A pinned screen walks through four panels as you scroll;
// panels can also be clicked, keyboard-focused, jumped to from the bottom bar, or resized by dragging the gutters.
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './utilities.css';

const BUY_URL = 'https://flexi-deck.com/store.html#premium-libraries';

const PRODUCTS = [
  { key: 'groups', name: 'Groups', ar: 812 / 900,
    tag: 'Every group, one clean list.',
    desc: 'Choose between 32 groups or 64 orchestral groups, already mapped out. Select a named group and its member channels are selected while everything else is hidden. A session of hundreds of channels becomes manageable with one click.',
    chips: ['32 or 64 groups', 'One-click select', 'Hide the rest', 'Logic Pro 11–12'],
    note: 'Requires channels assigned to a group, not a subgroup or folder stack.' },
  { key: 'stem', name: 'Stem Bouncer', ar: 900 / 999,
    tag: 'Forty-eight stems, named in one pass.',
    desc: 'Solos and bounces tracks with their effects to a folder you choose, then returns and repeats for the number of stems you set. Skip the deep export windows and process up to 48 stems in a single action.',
    chips: ['Up to 48 stems', 'Fast bounce', 'Batch rename', 'Logic Pro 11–12'] },
  { key: 'gain', name: 'Gain', ar: 794 / 502,
    tag: 'Exact steps, up or down.',
    desc: 'Change gain on audio regions with a single click, from 0.1 dB to 10 dB in either direction, with the everyday edit, navigation and cutting tools right alongside.',
    chips: ['±0.1 to ±10 dB', 'One click', 'Edit tools', 'Logic Pro 11–12'] },
  { key: 'panner', name: 'Panner', ar: 1603 / 902,
    tag: 'Twenty-four channels, left to right.',
    desc: 'Pans a run of channels in one go, in LR or LCR mode, starting from the selected Logic Pro channel. Manage up to 24 pairs or LCR groups at once.',
    chips: ['LR or LCR', 'Up to 24', 'Batch pan', 'Logic Pro 11–12'] },
];

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as Record<string, string>)[c]);

const Utilities: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const stage = root.querySelector('#ut-stage') as HTMLElement;
    const nav = root.querySelector('#ut-nav') as HTMLElement;
    const tour = root.querySelector('#ut-tour') as HTMLElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const K = reduce ? 0.35 : 0.05, D = reduce ? 0.5 : 0.72;
    const FW = 3.6, MIN = 0.16, GAP = 12, HIT = 14;

    const cells = PRODUCTS.map((p, k) => {
      const el = document.createElement('article');
      el.className = 'cell'; el.tabIndex = 0; el.dataset.k = String(k); el.setAttribute('aria-label', p.name);
      el.style.setProperty('--ar', p.ar.toFixed(4));
      el.innerHTML =
        `<div class="inner"><span class="idx">0${k + 1}</span>` +
        `<figure class="shot" data-zoom="${p.key}" title="Click to enlarge"><img src="/images/utilities/${p.key}.png" alt="${esc(p.name)} interface" draggable="false"></figure>` +
        `<h3 class="name">${esc(p.name)}</h3>` +
        `<div class="r r2"><div><p class="tag">${esc(p.tag)}</p></div></div>` +
        `<div class="r r3"><div><p class="desc">${esc(p.desc)}</p></div></div>` +
        `<div class="r r4"><div class="ctas"><button type="button" class="cta ghost" data-video="${p.key}">&#9654; Watch demo</button><a class="cta" href="${BUY_URL}" target="_blank" rel="noopener">Buy &middot; from £29</a></div></div></div>`;
      stage.appendChild(el);
      return el;
    });
    const navBtns = ([['Overview', null], ...PRODUCTS.map((p, k) => [p.name, k])] as [string, number | null][]).map(([label, k]) => {
      const b = document.createElement('button'); b.textContent = label; b.dataset.k = k === null ? '' : String(k);
      b.addEventListener('click', () => setFocus(k)); nav.appendChild(b); return b;
    });

    type Line = { p: number; v: number; t: number };
    let focus: number | null = null, cols = 0, rows = 0, LX: Line[] = [], LY: Line[] = [];
    let gx: HTMLElement[] = [], gy: HTMLElement[] = [], knobs: HTMLElement[] = [];
    let drag: { ix: number; iy: number } | null = null, moved = false;
    const mkLines = (n: number): Line[] => Array.from({ length: n + 1 }, (_, i) => ({ p: i / n, v: 0, t: i / n }));
    const setT = (L: Line[], w: number[]) => { const s = w.reduce((a, b) => a + b, 0); let acc = 0; L.forEach((l, i) => { if (i === 0) { l.t = 0; return; } acc += w[i - 1]; l.t = acc / s; }); };
    const retarget = () => {
      const wx = Array(cols).fill(1), wy = Array(rows).fill(1);
      if (focus !== null) { wx[focus % cols] = FW; wy[Math.floor(focus / cols)] = FW; }
      setT(LX, wx); setT(LY, wy);
    };
    const setLayout = () => {
      const narrow = innerWidth < 760, c = narrow ? 1 : 2, r = narrow ? 4 : 2;
      if (c === cols && r === rows) return;
      cols = c; rows = r; LX = mkLines(cols); LY = mkLines(rows);
      [...gx, ...gy, ...knobs].forEach((e) => e.remove()); gx = []; gy = []; knobs = [];
      const mk = (cls: string) => { const e = document.createElement('div'); e.className = cls; stage.appendChild(e); return e; };
      for (let i = 1; i < cols; i++) gx.push(mk('gut x'));
      for (let j = 1; j < rows; j++) gy.push(mk('gut y'));
      for (let i = 1; i < cols; i++) for (let j = 1; j < rows; j++) knobs.push(mk('knob'));
      retarget(); kick();
    };

    let raf = 0, last = 0;
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    function tick(now: number) {
      raf = 0; const r = Math.min((now - last) / 16.667, 3); last = now; let busy = false;
      for (const L of [LX, LY]) for (let i = 1; i < L.length - 1; i++) {
        const l = L[i];
        l.v = (l.v + (l.t - l.p) * K * r) * Math.pow(D, r); l.p += l.v * r;
        if (Math.abs(l.t - l.p) > 1e-4 || Math.abs(l.v) > 1e-4) busy = true; else { l.p = l.t; l.v = 0; }
      }
      render();
      if (busy) raf = requestAnimationFrame(tick);
    }
    function render() {
      const W = stage.clientWidth, H = stage.clientHeight;
      cells.forEach((el, k) => {
        const ci = k % cols, cj = Math.floor(k / cols);
        const x0 = LX[ci].p * W + (ci ? GAP / 2 : 0), x1 = LX[ci + 1].p * W - (ci < cols - 1 ? GAP / 2 : 0);
        const y0 = LY[cj].p * H + (cj ? GAP / 2 : 0), y1 = LY[cj + 1].p * H - (cj < rows - 1 ? GAP / 2 : 0);
        el.style.transform = `translate(${x0.toFixed(1)}px,${y0.toFixed(1)}px)`;
        el.style.width = Math.max(0, x1 - x0).toFixed(1) + 'px'; el.style.height = Math.max(0, y1 - y0).toFixed(1) + 'px';
      });
      gx.forEach((g, i) => (g.style.left = (LX[i + 1].p * W).toFixed(1) + 'px'));
      gy.forEach((g, j) => (g.style.top = (LY[j + 1].p * H).toFixed(1) + 'px'));
      let n = 0; for (let i = 1; i < cols; i++) for (let j = 1; j < rows; j++) {
        knobs[n].style.left = (LX[i].p * W).toFixed(1) + 'px'; knobs[n].style.top = (LY[j].p * H).toFixed(1) + 'px'; n++;
      }
    }
    function setFocus(k: number | null) {
      focus = k;
      cells.forEach((el, i) => { el.classList.toggle('on', k === i); el.classList.toggle('dim', k !== null && k !== i); });
      navBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === (k === null ? '' : String(k)))));
      retarget(); kick();
    }
    cells.forEach((el, k) => {
      el.addEventListener('click', (e) => {
        const t = e.target as HTMLElement;
        const z = t.closest('[data-zoom]') as HTMLElement | null;
        if (z) { e.stopPropagation(); setZoom(z.dataset.zoom || null); return; }
        const v = t.closest('[data-video]') as HTMLElement | null;
        if (v) { e.stopPropagation(); setVideo(v.dataset.video || null); return; }
        if (moved || t.closest('a')) return;
        e.preventDefault(); setFocus(focus === k ? null : k);
      });
      el.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === el) { e.preventDefault(); setFocus(focus === k ? null : k); } });
    });
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setVideo(null); setZoom(null); setFocus(null); } };
    window.addEventListener('keydown', onKey);

    const hit = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      let ix = -1, iy = -1;
      for (let i = 1; i < cols; i++) if (Math.abs(x - LX[i].p * r.width) < HIT) ix = i;
      for (let j = 1; j < rows; j++) if (Math.abs(y - LY[j].p * r.height) < HIT) iy = j;
      return { ix, iy, x, y, w: r.width, h: r.height };
    };
    const hot = (h: { ix: number; iy: number }) => {
      gx.forEach((g, i) => g.classList.toggle('hot', h.ix === i + 1));
      gy.forEach((g, j) => g.classList.toggle('hot', h.iy === j + 1));
      let n = 0; for (let i = 1; i < cols; i++) for (let j = 1; j < rows; j++) { knobs[n++].classList.toggle('hot', h.ix === i && h.iy === j); }
      stage.dataset.grab = h.ix > 0 && h.iy > 0 ? 'xy' : h.ix > 0 ? 'x' : h.iy > 0 ? 'y' : '';
    };
    stage.addEventListener('pointermove', (e) => {
      if (drag) {
        const h = hit(e); moved = true;
        if (drag.ix > 0) LX[drag.ix].t = Math.max(LX[drag.ix - 1].t + MIN, Math.min(LX[drag.ix + 1].t - MIN, h.x / h.w));
        if (drag.iy > 0) LY[drag.iy].t = Math.max(LY[drag.iy - 1].t + MIN, Math.min(LY[drag.iy + 1].t - MIN, h.y / h.h));
        kick(); return;
      }
      if (e.pointerType === 'touch' || cols < 2) return;
      hot(hit(e));
    });
    stage.addEventListener('pointerleave', () => { if (!drag) hot({ ix: -1, iy: -1 }); });
    stage.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' || cols < 2) return;
      const h = hit(e); if (h.ix < 0 && h.iy < 0) return;
      e.preventDefault(); stage.setPointerCapture(e.pointerId);
      drag = { ix: h.ix, iy: h.iy }; moved = false;
      focus = null; cells.forEach((el) => el.classList.remove('on', 'dim'));
      navBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === '')));
      for (const L of [LX, LY]) L.forEach((l) => { l.t = l.p; });
    }, true);
    const endDrag = () => { if (!drag) return; drag = null; hot({ ix: -1, iy: -1 }); setTimeout(() => { moved = false; }, 0); };
    stage.addEventListener('pointerup', endDrag); stage.addEventListener('pointercancel', endDrag);

    let lastIdx: number | null = -2;
    const onScroll = () => {
      const r = tour.getBoundingClientRect(), total = r.height - innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / total));
      const idx = p < 0.08 ? null : Math.min(PRODUCTS.length - 1, Math.floor((p - 0.08) / 0.23));
      if (idx !== lastIdx) { lastIdx = idx; setFocus(idx); }
    };
    const onResize = () => { setLayout(); render(); onScroll(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    setLayout(); setFocus(null); render(); onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); window.removeEventListener('keydown', onKey);
      stage.innerHTML = ''; nav.innerHTML = '';
    };
  }, []);

  return (
    <div className="ut" ref={rootRef}>
      <header className="ut-bar">
        <Link to="/" className="ut-back">&larr; BCD</Link>
        <span>Logic Pro utilities</span>
      </header>
      <section id="ut-tour" aria-label="BCD utilities">
        <div className="pin">
          <div className="top"><b>BCD Utilities</b><span>Scroll, click a panel, or drag the gutters</span></div>
          <div id="ut-stage" />
          <nav id="ut-nav" aria-label="Utilities" />
        </div>
      </section>
      {zoom && (
        <div className="ut-modal" onClick={() => setZoom(null)} role="dialog" aria-label="Enlarged view">
          <img className="ut-big" src={`/images/utilities/big_${zoom}.png`} alt="" onClick={(e) => e.stopPropagation()} />
          <button type="button" className="ut-close" onClick={() => setZoom(null)} aria-label="Close">&times;</button>
        </div>
      )}
      {video && (
        <div className="ut-modal" onClick={() => setVideo(null)} role="dialog" aria-label="Demo video">
          <video src={`/images/utilities/${video}.mp4`} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} />
          <button type="button" className="ut-close" onClick={() => setVideo(null)} aria-label="Close video">&times;</button>
        </div>
      )}
    </div>
  );
};

export default Utilities;
