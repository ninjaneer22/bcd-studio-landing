// The "BCD UTILITIES" intro band that sits just before the utilities section.
// Outline letters rise through a mask one word at a time, fill up from below one letter at a time,
// the fill lifts away word by word, and each word masks off to the top. Loops while on screen.
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './utitle.css';

const WORDS: [string, string][] = [['BCD', 'utt-bcd'], ['UTILITIES', 'utt-utl']];
const FAM = '"Avenir Next","Avenir Next LT Pro","Avenir","UttFallback",system-ui,sans-serif';

const UtilitiesTitle: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const groups = Array.from(root.querySelectorAll('.utt-w')).map((w) => Array.from(w.querySelectorAll('.utt-l')) as HTMLElement[]);
    const all = groups.flat();
    const fills = all.map((l) => l.querySelector('.utt-f') as HTMLElement);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tl: gsap.core.Timeline | null = null, again: gsap.core.Tween | null = null, visible = false, alive = true, T = 0.14, Bm = 0.86;

    const measure = () => {
      const ctx = document.createElement('canvas').getContext('2d')!;
      ctx.font = '700 100px ' + FAM;
      const m = ctx.measureText('H');
      const capA = m.actualBoundingBoxAscent / 100, fA = m.fontBoundingBoxAscent / 100, fD = m.fontBoundingBoxDescent / 100;
      T = (1 - (fA + fD)) / 2 + fA - capA; Bm = T + capA;
    };
    const hid = () => `inset(${Bm * 100}% -10% ${(1 - Bm) * 100}% -10%)`;
    const full = () => `inset(${(T - 0.03) * 100}% -10% ${(1 - Bm) * 100}% -10%)`;
    const lift = () => `inset(${(T - 0.03) * 100}% -10% ${100 - (T - 0.03) * 100}% -10%)`;

    const build = () => {
      if (!alive) return;
      tl?.kill(); again?.kill(); measure();
      gsap.set(all, { yPercent: 125 }); gsap.set(fills, { clipPath: hid() });
      if (reduced) { gsap.set(all, { yPercent: 0 }); gsap.set(fills, { clipPath: full() }); return; }
      const [a, b] = groups;
      const fa = a.map((l) => l.querySelector('.utt-f') as HTMLElement), fb = b.map((l) => l.querySelector('.utt-f') as HTMLElement);
      tl = gsap.timeline({ timeScale: 1.333, onComplete: () => { if (visible) again = gsap.delayedCall(0.1,build); } });
      // 1. mask on, one word at a time, as outlines
      tl.to(a, { yPercent: 0, duration: 0.75, ease: 'power4.out', stagger: 0.08 }, 0.1)
        .to(b, { yPercent: 0, duration: 0.75, ease: 'power4.out', stagger: 0.06 }, 0.8);
      // 2. letters fill up from below, one at a time
      tl.to(fills, { clipPath: full(), duration: 0.65, ease: 'power2.out', stagger: 0.085 }, 2.5);
      // 3. de-fill one word at a time (the fill lifts away upward), each word then masks off to the top
      tl.to(fa, { clipPath: lift(), duration: 0.5, ease: 'power2.in', stagger: 0.07 }, 5.6)
        .to(a, { yPercent: -125, duration: 0.6, ease: 'power3.in', stagger: 0.06 }, 6.05)
        .to(fb, { clipPath: lift(), duration: 0.5, ease: 'power2.in', stagger: 0.06 }, 6.25)
        .to(b, { yPercent: -125, duration: 0.6, ease: 'power3.in', stagger: 0.05 }, 6.75);
    };

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const was = visible; visible = e.isIntersecting;
      if (visible && !was) build();
      if (!visible) { tl?.pause(); again?.kill(); }
    }), { threshold: 0.35 });
    io.observe(root);
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { if (visible && !tl) build(); });
    return () => { alive = false; io.disconnect(); tl?.kill(); again?.kill(); };
  }, []);

  return (
    <section className="utt" ref={rootRef} aria-label="BCD Utilities">
      <div className="utt-crop">
        <h2 className="utt-title" aria-label="BCD Utilities">
          {WORDS.map(([t, cls]) => (
            <span key={t} className={'utt-w ' + cls} aria-hidden="true">
              <span className="utt-mask">
                {[...t].map((c, i) => (
                  <span key={i} className="utt-l"><i className="utt-o">{c}</i><i className="utt-f">{c}</i></span>
                ))}
              </span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default UtilitiesTitle;
