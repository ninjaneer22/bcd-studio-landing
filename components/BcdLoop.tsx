// The mini BCD animation: BROWSE. CLICK. DONE. with guides and the URL, looping quietly. Only the centre band of the 16:9 stage is shown.
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './bandloop.css';

const NS = 'http://www.w3.org/2000/svg';

const BcdLoop: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const urlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current!, svg = svgRef.current!, title = titleRef.current!, url = urlRef.current!;
    const words = Array.from(title.querySelectorAll('span')) as HTMLElement[];
    let tl: gsap.core.Timeline | null = null, again: gsap.core.Tween | null = null, visible = false, alive = true;
    let par: Element = svg;
    const mk = (t: string, a: Record<string, string | number>) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, String(a[k])); par.appendChild(e); return e; };

    const build = () => {
      if (!alive) return;
      tl?.kill(); again?.kill(); svg.innerHTML = ''; par = svg;
      gsap.killTweensOf([...words, url, title]);
      gsap.set(words, { clearProps: 'all' });
      const sr = stage.getBoundingClientRect(), k = 1600 / sr.width;
      const R = words.map((w) => { const r = w.getBoundingClientRect(); return { x: (r.left - sr.left) * k, y: (r.top - sr.top) * k, w: r.width * k, h: r.height * k }; });
      const gy = [R[0].y - 40], gx = [R[0].x - 60, R[2].x + R[2].w + 60];
      const gH = gy.map((y) => mk('line', { class: 'g', x1: 0, x2: 1600, y1: y, y2: y }));
      const gV = gx.map((x) => mk('line', { class: 'g', x1: x, x2: x, y1: 0, y2: 900 }));
      const U = url.getBoundingClientRect(), ry = (U.bottom - sr.top) * k + 34;
      const rl = mk('line', { class: 'g', x1: 0, x2: 0, y1: ry, y2: ry });
      const c = R[1], pad = 14;
      const grp = document.createElementNS(NS, 'g'); svg.appendChild(grp); par = grp; gsap.set(grp, { x: 30 * k, y: -34 * k });
      const bx = mk('rect', { class: 'box', x: c.x - pad, y: c.y - pad + 6, width: c.w + pad * 2, height: c.h + pad * 2 - 12 });
      const dots = [[c.x - pad, c.y - pad + 6], [c.x + c.w + pad, c.y + c.h + pad - 6]].map((p) => mk('circle', { class: 'dot', cx: p[0], cy: p[1], r: 3.2 }));
      const lab = mk('text', { class: 'lab', x: c.x + c.w + pad + 10, y: c.y + c.h + pad + 6 }); lab.textContent = 'click  x' + Math.round(c.x) + ' y' + Math.round(c.y); par = svg;
      gsap.set(gH, { attr: { x2: 0 } }); gsap.set(gV, { attr: { y2: 0 } });
      gsap.set(bx, { opacity: 0 }); gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: 'center' }); gsap.set(lab, { opacity: 0 });
      gsap.set(words, { opacity: 0, filter: 'blur(10px)' });
      gsap.set(words[0], { x: -160, y: 26 }); gsap.set(words[1], { x: 60, y: -46 }); gsap.set(words[2], { x: 230, y: 34 });
      gsap.set(url, { autoAlpha: 0, y: 8 });

      tl = gsap.timeline({ onComplete: () => { if (visible) again = gsap.delayedCall(1.4, build); } });
      const E = 'power3.out', IO = 'power3.inOut';
      const flick = (el: HTMLElement, t: number) => tl!.to(el, { keyframes: [{ opacity: 1, duration: 0.035 }, { opacity: 0.08, duration: 0.045 }, { opacity: 0.95, duration: 0.035 }, { opacity: 0.22, duration: 0.05 }, { opacity: 1, duration: 0.06 }], ease: 'none' }, t);
      flick(words[0], 0.10); flick(words[1], 0.42); flick(words[2], 0.85);
      tl.to(words[0], { filter: 'blur(0px)', x: -110, y: 18, duration: 0.7, ease: E }, 0.10)
        .to(words[1], { filter: 'blur(0px)', x: 30, y: -34, duration: 0.7, ease: E }, 0.42)
        .to(url, { autoAlpha: 1, y: 0, duration: 0.7, ease: E }, 0.55)
        .to(words[2], { filter: 'blur(0px)', x: 190, y: 24, duration: 0.7, ease: E }, 0.85)
        .to(bx, { opacity: 1, duration: 0.3 }, 0.62).to(dots, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.6)', stagger: 0.08 }, 0.66).to(lab, { opacity: 1, duration: 0.3 }, 0.9)
        .to(gH[0], { attr: { x2: 1600 }, duration: 1.1, ease: IO }, 0.3)
        .to(words[0], { x: 0, duration: 0.62, ease: 'power3.inOut' }, 1.55).to(words[0], { y: 0, duration: 0.36, ease: 'power2.inOut' }, 2.05)
        .to(words[1], { x: 0, duration: 0.62, ease: 'power3.inOut' }, 1.75).to(words[1], { y: 0, duration: 0.36, ease: 'power2.inOut' }, 2.25)
        .to(words[2], { y: 0, duration: 0.30, ease: 'power2.inOut' }, 1.95).to(words[2], { x: 0, duration: 0.62, ease: 'power3.inOut' }, 2.15)
        .to(grp, { x: 0, duration: 0.62, ease: 'power3.inOut' }, 1.75).to(grp, { y: 0, duration: 0.36, ease: 'power2.inOut' }, 2.25)
        .to([bx, lab], { opacity: 0, duration: 0.35 }, 1.7).to(dots, { opacity: 0, scale: 0, duration: 0.3, stagger: 0.05 }, 1.7)
        .to(gV[0], { attr: { y2: 900 }, duration: 1.0, ease: IO }, 2.85).to(gV[1], { attr: { y2: 900 }, duration: 1.0, ease: IO }, 3.0)
        .to(rl, { attr: { x2: 1600 }, duration: 1.0, ease: IO }, 3.4)
        .to([...gH, ...gV, rl], { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 4.8)
        .to({}, { duration: 1.6 });
    };

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const was = visible; visible = e.isIntersecting;
      if (visible && !was) { if (reduced) { build(); tl?.progress(0.62).pause(); } else build(); }
      if (!visible) { tl?.pause(); again?.kill(); }
    }), { threshold: 0.35 });
    io.observe(rootRef.current!);
    const ready = (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());
    ready.then(() => { if (visible && !tl) build(); });
    return () => { alive = false; io.disconnect(); tl?.kill(); again?.kill(); };
  }, []);

  return (
    <section className="bl" ref={rootRef} aria-label="Browse. Click. Done.">
      <div className="bl-crop">
        <div className="bl-stage" ref={stageRef}>
          <svg ref={svgRef} viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true" />
          <div className="bl-title" ref={titleRef}><span>BROWSE.</span><span>CLICK.</span><span>DONE.</span></div>
          <div className="bl-url" ref={urlRef}>www.bcd.center</div>
        </div>
      </div>
    </section>
  );
};

export default BcdLoop;
