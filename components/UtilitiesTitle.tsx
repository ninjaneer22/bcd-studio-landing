// The "BCD UTILITIES" banner that sits just before the utilities section.
// Same treatment as the PA 3.0 hero: heavy type on black, scanned in by a slit as it scrolls into view,
// then a quiet pass over the type every ten seconds or so. Glow, colour fringe, grain and scanlines.
// Everything is drawn on one canvas (no CSS/SVG filters), so it behaves the same in Safari and Chrome.
import React, { useEffect, useRef } from 'react';
import './utitle.css';

type Pass = { t0: number; dur: number; reveal: boolean };
type Scene = {
  W: number; H: number; d: number; narrow: boolean;
  off: HTMLCanvasElement; offR: HTMLCanvasElement; offC: HTMLCanvasElement;
  bl: HTMLCanvasElement[]; noise: HTMLCanvasElement;
  y0: number; hh: number;
};

const BG = '#080808', G0 = '#eceef1', G1 = '#9a9da4';
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const ease = (u: number) => u * u * (3 - 2 * u);
const mk = (w: number, h: number) => { const c = document.createElement('canvas'); c.width = Math.max(1, w | 0); c.height = Math.max(1, h | 0); return c; };
const FONT = (fs: number) => `800 ${fs}px "Archivo",system-ui,sans-serif`;

const UtilitiesTitle: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current, cv = cvRef.current;
    const ctx = cv && cv.getContext('2d');
    if (!wrap || !cv || !ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let S: Scene | null = null, visible = false, opened = false, alive = true, raf = 0;
    let passes: Pass[] = [], nextIdle = 0;

    const init = () => {
      const d = Math.min(2, window.devicePixelRatio || 1), W = wrap.clientWidth, H = wrap.clientHeight;
      if (!W || !H) return;
      cv.width = W * d; cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      const narrow = W < 560, lines = narrow ? ['BCD', 'UTILITIES'] : ['BCD UTILITIES'];
      const off = mk(W * d, H * d), o = off.getContext('2d')!;
      o.setTransform(d, 0, 0, d, 0, 0);
      let fs = 100; o.font = FONT(fs);
      const widest = Math.max(...lines.map((l) => o.measureText(l).width));
      fs = fs * (W * (narrow ? 0.8 : 0.86)) / widest; o.font = FONT(fs);
      const lh = fs * 0.9, block = (lines.length - 1) * lh + fs * 0.72, top = (H - block) / 2;
      lines.forEach((w, i) => {
        const y = top + i * lh + fs * 0.72, g = o.createLinearGradient(0, y - fs * 0.72, 0, y);
        g.addColorStop(0, G0); g.addColorStop(1, G1); o.fillStyle = g;
        o.fillText(w, (W - o.measureText(w).width) / 2, y);
      });
      const tint = (col: string) => {
        const t = mk(off.width, off.height), tc = t.getContext('2d')!;
        tc.drawImage(off, 0, 0); tc.globalCompositeOperation = 'source-in'; tc.fillStyle = col; tc.fillRect(0, 0, t.width, t.height);
        return t;
      };
      const noise = mk(256, 256), nc = noise.getContext('2d')!, id = nc.createImageData(256, 256);
      for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; }
      nc.putImageData(id, 0, 0);
      S = {
        W, H, d, narrow, off, offR: tint('#ff3b30'), offC: tint('#18d4ff'),
        bl: [2, 4, 8, 16].map((k) => mk(cv.width / k, cv.height / k)), noise,
        y0: top - fs * 0.1, hh: block + fs * 0.2,
      };
      if (reduce || !opened) draw(performance.now() / 1000);
    };

    const draw = (now: number) => {
      const s = S; if (!s) return;
      const { W, H, d, y0, hh } = s;
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
      if (!opened && !reduce) return;
      const L = W * (s.narrow ? 0.3 : 0.34);
      passes = passes.filter((p) => now - p.t0 < p.dur + 0.05);
      const p0 = passes[0], reveal = !!p0 && p0.reveal;
      if (!reveal) ctx.drawImage(s.off, 0, 0, W, H);
      if (p0) {
        const u = (now - p0.t0) / p0.dur;
        if (u >= 0) {
          const sa = -W * 0.03, sb = W + L * 1.02, x = sa + ease(clamp(u, 0, 1)) * (sb - sa), done = u >= 1.02;
          if (reveal) { ctx.save(); ctx.beginPath(); ctx.rect(0, y0, Math.max(0, x), hh); ctx.clip(); ctx.drawImage(s.off, 0, 0, W, H); ctx.restore(); }
          if (!done && x > 0) {
            const x0 = Math.max(0, x - L); ctx.fillStyle = BG; ctx.fillRect(x0, y0, x - x0, hh);
            for (let k = 0; k < L; k += 2) {
              const px = x - k; if (px < 0) break;
              const a = Math.pow(1 - k / L, 1.6), col = clamp(Math.floor((clamp(x, 0, W - 2) + Math.sin(now * 3 + k * 0.03) * 0.6) * d), 0, s.off.width - 1);
              ctx.globalAlpha = a * 0.95; ctx.drawImage(s.off, col, y0 * d, 1, hh * d, px, y0, 2, hh);
              ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a * 0.5;
              ctx.drawImage(s.offR, col, y0 * d, 1, hh * d, px - 5, y0, 2, hh);
              ctx.drawImage(s.offC, col, y0 * d, 1, hh * d, px + 5, y0, 2, hh);
              ctx.globalCompositeOperation = 'source-over';
            }
            ctx.globalAlpha = 0.85; ctx.fillStyle = '#fff'; ctx.fillRect(x - 1, y0 - 6, 2, hh + 12); ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'lighter';
            const g = ctx.createLinearGradient(x - W * 0.05, 0, x + W * 0.05, 0);
            g.addColorStop(0, 'rgba(120,170,255,0)'); g.addColorStop(0.5, 'rgba(170,205,255,.22)'); g.addColorStop(1, 'rgba(120,170,255,0)');
            ctx.fillStyle = g; ctx.fillRect(x - W * 0.05, y0, W * 0.1, hh); ctx.globalCompositeOperation = 'source-over';
          }
        }
      }
      // glow: chained half-size copies added back with 'lighter' (no ctx.filter, which Safari lacks)
      let prev: HTMLCanvasElement = cv;
      s.bl.forEach((b) => { const bc = b.getContext('2d')!; bc.setTransform(1, 0, 0, 1, 0, 0); bc.drawImage(prev, 0, 0, b.width, b.height); prev = b; });
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.16; ctx.drawImage(s.bl[2], 0, 0, cv.width, cv.height);
      ctx.globalAlpha = 0.18; ctx.drawImage(s.bl[3], 0, 0, cv.width, cv.height); ctx.restore();
      // grain
      ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.14;
      const ox = Math.random() * 256, oy = Math.random() * 256;
      for (let yy = -oy; yy < H; yy += 256) for (let xx = -ox; xx < W; xx += 256) ctx.drawImage(s.noise, xx, yy);
      ctx.restore();
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!alive) return;
      if (visible && S && !reduce) {
        const now = performance.now() / 1000;
        if (now > nextIdle && !passes.length) { passes.push({ t0: now, dur: 1.7, reveal: false }); nextIdle = now + 8 + Math.random() * 4; }
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !opened && !reduce) {
        opened = true; const now = performance.now() / 1000;
        passes = [{ t0: now + 0.25, dur: 2.0, reveal: true }]; nextIdle = now + 9;
      }
    }, { threshold: 0.4 });
    io.observe(wrap);

    let rz = 0;
    const ro = new ResizeObserver(() => { clearTimeout(rz); rz = window.setTimeout(init, 150); });
    ro.observe(wrap);

    const fonts = (document as any).fonts;
    (fonts && fonts.load ? fonts.load(FONT(100)).catch(() => {}) : Promise.resolve()).then(() => (fonts && fonts.ready) || null).then(() => {
      if (!alive) return; init(); raf = requestAnimationFrame(loop);
    });

    return () => { alive = false; cancelAnimationFrame(raf); clearTimeout(rz); io.disconnect(); ro.disconnect(); };
  }, []);

  return (
    <section className="utt" aria-label="BCD Utilities">
      <div className="utt-crop" ref={wrapRef}>
        <canvas ref={cvRef} role="img" aria-label="BCD Utilities" />
        <div className="utt-scan" aria-hidden="true" />
      </div>
    </section>
  );
};

export default UtilitiesTitle;
