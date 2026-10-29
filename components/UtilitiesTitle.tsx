// The "BCD UTILITIES" poster banner that sits just before the utilities section.
// Heavy white lettering on black. Streaky horizontal blur bands (with a red/cyan split) sweep across it,
// settle to a few resting streaks, and burst into glitches every few seconds. Pauses off screen.
import React, { useEffect, useRef } from 'react';
import './utitle.css';

type Band = { lvl: number; el: HTMLDivElement; bi: HTMLDivElement; cps: HTMLElement[]; seed: number; tmp: { y: number; h: number; dx: number; lvl: number } | null };
type Slice = { el: HTMLDivElement; bi: HTMLDivElement };

// Horizontal-only blur built from stacked text-shadows: SVG/CSS filters on HTML are unreliable in Safari, shadows are not.
const SIG = [3.5, 11, 29];
const RGB: Record<string, string> = { r: '255,47,47', c: '0,220,255', k: '239,237,232' };
const smear = (sig: number, rgb: string) => {
  const N = 10, step = sig * 0.3, ks = Array.from({ length: N * 2 + 1 }, (_, i) => i - N), ws = ks.map((k) => Math.exp(-0.5 * (k * 0.3) ** 2)), sum = ws.reduce((a, b) => a + b, 0);
  return ks.map((k, i) => `${(k * step).toFixed(1)}px 0 ${(step * 0.8).toFixed(1)}px rgba(${rgb},${Math.min(1, (ws[i] / sum) * 1.9).toFixed(3)})`).join(',');
};
const SH = SIG.map((sg) => ({ r: smear(sg, RGB.r), c: smear(sg, RGB.c), k: smear(sg, RGB.k) }));

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const GAP = [1800, 3800], DUR = [320, 640], SLICES = 4;
const IDLE: [number, number][] = [[.16, .15], [.5, .17], [.8, .1]]; // [top, height] as fractions of the headline

const UtilitiesTitle: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current, poster = posterRef.current, head = headRef.current;
    if (!root || !poster || !head) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const made: HTMLElement[] = [];
    const clone = (cls: string) => {
      const c = head.cloneNode(true) as HTMLDivElement;
      c.className = 'utt-head utt-cp ' + cls; c.removeAttribute('style'); c.setAttribute('aria-hidden', 'true');
      return c;
    };
    const bands: Band[] = [];
    for (let i = 0; i < 4; i++) {
      const el = document.createElement('div'); el.className = 'utt-band';
      const bi = document.createElement('div'); bi.className = 'utt-bi';
      const cps = ['r', 'c', 'k'].map((k) => { const c = clone(k); bi.appendChild(c); return c; });
      el.appendChild(bi); poster.appendChild(el); made.push(el);
      bands.push({ lvl: -1, el, bi, cps, seed: Math.random() * 10, tmp: null });
    }
    const slices: Slice[] = [];
    for (let j = 0; j < 6; j++) {
      const el = document.createElement('div'); el.className = 'utt-slice';
      const bi = document.createElement('div'); bi.className = 'utt-bi';
      bi.appendChild(clone('')); el.appendChild(bi); poster.appendChild(el); made.push(el);
      slices.push({ el, bi });
    }

    let H = 0, line = { t: 0, h: 0 };
    const measure = () => {
      const pr = poster.getBoundingClientRect(), r = head.querySelector('.utt-ln')!.getBoundingClientRect();
      H = pr.height; line = { t: r.top - pr.top, h: r.height };
      bands.forEach((b) => (b.bi.style.height = H + 'px'));
      slices.forEach((s) => (s.bi.style.height = H + 'px'));
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(poster);
    document.fonts?.ready.then(measure);

    const place = (i: number, b: Band, y: number, h: number, dx: number, lvl: number) => {
      const on = h > 0;
      b.el.style.display = on ? 'block' : 'none';
      if (on) {
        b.el.style.top = y + 'px'; b.el.style.height = h + 'px'; b.bi.style.top = -y + 'px';
        if (b.lvl !== lvl) { b.lvl = lvl; b.cps[0].style.textShadow = SH[lvl].r; b.cps[1].style.textShadow = SH[lvl].c; b.cps[2].style.textShadow = SH[lvl].k; }
        const f = Math.min(1, Math.abs(dx) / 40 + .25);
        b.cps[0].style.transform = `translateX(${-dx - 3}px)`; b.cps[1].style.transform = `translateX(${dx + 3}px)`; b.cps[2].style.transform = `translateX(${dx * .15}px)`;
        b.cps[0].style.opacity = b.cps[1].style.opacity = String(f);
      }
      poster.style.setProperty('--t' + i, (on ? y : -50) + 'px');
      poster.style.setProperty('--b' + i, (on ? y + h : -50) + 'px');
    };
    const slice = (s: Slice, y: number, h: number, dx: number) => {
      s.el.style.display = h > 0 ? 'block' : 'none';
      if (h > 0) { s.el.style.top = y + 'px'; s.el.style.height = h + 'px'; s.bi.style.top = -y + 'px'; s.bi.style.transform = `translateX(${dx}px)`; }
    };

    const t0 = performance.now();
    let entrStart = 0, entr = 1, burstUntil = 0, nextBurst = 0, step = 0, raf = 0, visible = false, started = false;
    const frame = (now: number) => {
      if (!visible) return;
      raf = requestAnimationFrame(frame);
      if (!started) { started = true; entrStart = now; nextBurst = now + 800; }
      const t = (now - t0) / 1000;
      const e = entr > 0 ? 1 - Math.min(1, (now - entrStart) / 1700) : 0; entr = e;
      const ee = e * e;
      let inBurst = now < burstUntil;
      if (!inBurst && now > nextBurst) { burstUntil = now + rnd(DUR[0], DUR[1]); nextBurst = burstUntil + rnd(GAP[0], GAP[1]); inBurst = true; step = 0; }
      const stepDue = inBurst && now - step > rnd(45, 95);
      for (let i = 0; i < 3; i++) {
        const b = bands[i], c = IDLE[i];
        const drift = Math.sin(t * .6 + b.seed) * line.h * .08;
        let y = line.t + line.h * c[0] + drift;
        let h = line.h * c[1] * (1 + .25 * Math.sin(t * .9 + b.seed * 2));
        let dx = Math.sin(t * 1.3 + b.seed) * 5 + (i % 2 ? -1 : 1) * 4 + ee * (i % 2 ? -1 : 1) * 220;
        if (e > 0) { h = line.h * (.35 + .65 * e); y = line.t + line.h * (.2 * (1 - e) + c[0] * (1 - e)); }
        let lvl = e > .5 ? 2 : 1;
        if (inBurst && stepDue && Math.random() < .5) { dx += rnd(-45, 45); lvl = Math.random() < .5 ? 2 : 1; }
        place(i, b, y, h, dx, lvl);
      }
      const b3 = bands[3];
      if (inBurst) {
        if (stepDue) { const h3 = rnd(10, line.h * .5); b3.tmp = { y: line.t + rnd(0, line.h - h3), h: h3, dx: rnd(-90, 90), lvl: Math.random() < .5 ? 1 : 2 }; }
        if (b3.tmp) place(3, b3, b3.tmp.y, b3.tmp.h, b3.tmp.dx, b3.tmp.lvl);
      } else { place(3, b3, -20, 0, 0, 0); b3.tmp = null; }
      if (stepDue) {
        step = now;
        slices.forEach((s, k) => { if (k < SLICES && Math.random() < .8) slice(s, line.t + rnd(0, line.h), rnd(2, 7), rnd(-120, 120)); else slice(s, -9, 0, 0); });
      }
      if (!inBurst && e <= 0) slices.forEach((s) => slice(s, -9, 0, 0));
      head.style.opacity = inBurst && Math.random() < .06 ? '.78' : '1';
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    }, { threshold: 0.15 });
    io.observe(root);

    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); made.forEach((n) => n.remove()); head.style.opacity = ''; };
  }, []);

  return (
    <section className="utt" ref={rootRef} aria-label="BCD Utilities">
      <div className="utt-crop">
        <div className="utt-poster" ref={posterRef}>
          <div className="utt-guides" aria-hidden="true"><i style={{ left: '21%' }} /><i style={{ left: '34.5%' }} /><i style={{ left: '56%' }} /><i style={{ left: '79%' }} /><i style={{ left: '91%' }} /></div>
          <div className="utt-head utt-base" ref={headRef}>
            <h2 className="utt-hl"><span className="utt-ln"><span className="utt-w">BCD</span> <span className="utt-w">UTILITIES</span></span></h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UtilitiesTitle;
