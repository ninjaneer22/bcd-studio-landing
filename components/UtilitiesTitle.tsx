// The "BCD UTILITIES" intro band that sits just before the utilities section.
// Static lettering (BCD solid orange, UTILITIES outline) with a few soft circles drifting over it.
// Inside the circles the letters blur and pick up a thermal glow. Pauses when off screen.
import React, { useEffect, useRef } from 'react';
import './utitle.css';

const N = 3;
const UtilitiesTitle: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current, veil = veilRef.current, heat = heatRef.current;
    if (!root || !veil || !heat) return;
    const blobs = Array.from({ length: N }, () => ({
      r: 0.13 + Math.random() * 0.11,
      sx: 0.00006 + Math.random() * 0.00008, sy: 0.00005 + Math.random() * 0.00007,
      px: Math.random() * 9, py: Math.random() * 9,
    }));
    let raf = 0, visible = false;
    const draw = (t: number) => {
      const g = blobs.map((b) => {
        const x = 50 + Math.sin(t * b.sx * 4.5 + b.px) * 55, y = 50 + Math.cos(t * b.sy * 4.5 + b.py) * 60;
        return `radial-gradient(circle ${b.r * 100}cqw at ${x}% ${y}%, #000 0%, rgba(0,0,0,.5) 40%, transparent 100%)`;
      }).join(',');
      veil.style.setProperty('--m', g);
      heat.style.setProperty('--m', g);
    };
    const loop = (t: number) => { draw(t); if (visible) raf = requestAnimationFrame(loop); };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(loop); else draw(2000);
    }, { threshold: 0.1 });
    io.observe(root);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="utt" ref={rootRef} aria-label="BCD Utilities">
      <div className="utt-crop">
        <h2 className="utt-title"><span className="utt-b">BCD</span><span className="utt-u">UTILITIES</span></h2>
        <div className="utt-veil" ref={veilRef} />
        <h2 className="utt-title utt-heat" ref={heatRef} aria-hidden="true"><span>BCD</span><span>UTILITIES</span></h2>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <filter id="utt-thermal" colorInterpolationFilters="sRGB" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="11" />
            <feColorMatrix type="matrix" values="0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0 .15 1 1 1" />
              <feFuncG type="table" tableValues="0 .3 .3 .85 1" />
              <feFuncB type="table" tableValues="0 1 .12 .05 .8" />
              <feFuncA type="table" tableValues="0 .85 1 1 1" />
            </feComponentTransfer>
          </filter>
        </svg>
      </div>
    </section>
  );
};

export default UtilitiesTitle;
