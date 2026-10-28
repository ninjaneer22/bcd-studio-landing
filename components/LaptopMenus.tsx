import React, { useEffect, useRef } from 'react';
import './laptop.css';

const BASE = '/images/laptop/';
const STEPS = [
  { tex: 'fx', x: 1200, y: 750, wpx: 3300, yaw: -24, pitch: 9 },
  { tex: 'inst', x: 1250, y: 750, wpx: 3300, yaw: 24, pitch: -6 },
  { tex: 'maxa', x: 1200, y: 750, wpx: 3200, yaw: -18, pitch: 8 },
  { tex: 'maxa', x: 700, y: 720, wpx: 1650, yaw: 14, pitch: -4 },
  { tex: 'maxb', x: 1200, y: 750, wpx: 3100, yaw: 20, pitch: -7 },
];

const LaptopMenus: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current, stage = stageRef.current, list = listRef.current;
    if (!section || !stage || !list) return;
    let dispose: (() => void) | null = null;
    let started = false, gone = false;
    const start = async () => {
      if (started) return;
      started = true;
      try {
        const c = document.createElement('canvas');
        if (!(c.getContext('webgl2') || c.getContext('webgl'))) throw new Error('no webgl');
        const mod: any = await import('./laptopTour.js');
        if (gone) return;
        const tex: Record<string, string> = {};
        ['fx', 'inst', 'maxa', 'maxb'].forEach((k) => (tex[k] = `${BASE}${k}.webp`));
        dispose = mod.startLaptop(stage, Array.from(list.children), { glb: `${BASE}laptop.glb`, tex });
      } catch {
        stage.classList.add('nogl');
      }
    };
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { start(); io.disconnect(); } }, { rootMargin: '100% 0px' });
    io.observe(section);
    return () => { gone = true; io.disconnect(); if (dispose) dispose(); };
  }, []);

  return (
    <section id="laptop-menus" ref={sectionRef} className="lt-section" aria-label="Effects, Instruments and Max menus shown on a laptop">
      <div ref={stageRef} className="lt-stage" style={{ backgroundImage: `url(${BASE}gradient01.webp)` }}>
        <div className="lt-fallback"><img src={`${BASE}fx.webp`} alt="Effects menu" /></div>
      </div>
      <div ref={listRef} className="lt-list">
        {STEPS.map((s, i) => (
          <div key={i} className={'lt-step' + (i === STEPS.length - 1 ? ' last' : '')}
            data-tex={s.tex} data-x={s.x} data-y={s.y} data-wpx={s.wpx} data-yaw={s.yaw} data-pitch={s.pitch} />
        ))}
      </div>
    </section>
  );
};

export default LaptopMenus;
