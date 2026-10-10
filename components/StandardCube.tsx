// Standard launcher: scroll-driven 4-sided cube, replacing the 90-frame image sequence (SequenceCanvas).
// Faces, in turning order: intro card, Logic Pro Plugins, Logic Pro Instruments, outro card.
import React, { useEffect, useRef } from 'react';
import './cube.css';

const FACES: { src: string; alt: string; text?: boolean }[] = [
  { src: '/images/cube/standard/side_1.png', alt: 'The interface your plugins deserve.', text: true },
  { src: '/images/cube/standard/side_2.webp', alt: 'Plugin Launcher: Logic Pro Plugins' },
  { src: '/images/cube/standard/side_3.webp', alt: 'Plugin Launcher: Logic Pro Instruments' },
  { src: '/images/cube/standard/side_4.png', alt: 'Browse. Click. Done.', text: true },
];
const OFFSETS = [0, 90, 180, -90];          // each face's angle around the cube
const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const smooth = (x: number) => x * x * (3 - 2 * x);

const StandardCube: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current, cube = cubeRef.current;
    if (!section || !cube) return;
    const scene = cube.parentElement as HTMLElement;
    const stage = section.querySelector('.sc-stage') as HTMLElement;

    // Crispness: keep the cube on whole device pixels. A fractional width or position makes the browser
    // resample every face (soft text), so the size is rounded to a multiple of 16 (whole-pixel 16:9) and nudged onto the pixel grid.
    const snap = () => {
      const w = Math.floor(Math.min(980, window.innerWidth * 0.66, (window.innerHeight - 340) * 16 / 9) / 16) * 16;
      section.style.setProperty('--sc-w', `${Math.max(320, w)}px`);
      scene.style.translate = '0px 0px';
      const s = scene.getBoundingClientRect(), st = stage.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const fix = (v: number) => Math.round(v * dpr) / dpr - v;
      scene.style.translate = `${fix(s.left - st.left)}px ${fix(s.top - st.top)}px`;
    };
    snap();
    window.addEventListener('resize', snap);

    const faces = Array.from(cube.querySelectorAll<HTMLElement>('.sc-face'));
    const shades = faces.map((f) => f.querySelector<HTMLElement>('.sc-shade'));

    // target angle comes from the scroll position; the cube eases toward it so it glides instead of stepping
    const targetAngle = () => {
      const max = section.offsetHeight - window.innerHeight;
      const f = max > 0 ? clamp(-section.getBoundingClientRect().top / max) : 0;
      const p = f * 3, seg = Math.min(2, Math.floor(p)), t = p - seg;
      return -90 * (seg + smooth(clamp((t - 0.15) / 0.7)));   // each face rests briefly, then turns over most of its stretch
    };

    let current = targetAngle(), raf = 0;
    const paint = () => {
      cube.style.transform = `translateZ(calc(var(--sc-w) / -2)) rotateY(${current.toFixed(3)}deg)`;
      faces.forEach((_, i) => {                           // faces turned away get darker (a layer on top, so the image itself is never filtered)
        const depth = Math.cos((current + OFFSETS[i]) * Math.PI / 180);
        const shade = shades[i];
        if (shade) shade.style.opacity = String(clamp((1 - depth) * 0.55, 0, 0.6));
      });
    };
    const tick = () => {
      const target = targetAngle();
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.02) current = target;
      paint();
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    paint();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); window.removeEventListener('resize', snap); };
  }, []);

  return (
    <section ref={sectionRef} id="standard-cube" className="sc-section">
      <div className="sc-stage">
        <div className="sc-head text-center max-w-5xl mx-auto">
          <span className="text-sm tracking-[0.4em] font-medium text-google-grey uppercase mb-4 block">
            PLUGIN LAUNCHER STANDARD
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-google-white mb-4">
            The Ultimate Plug-and-Play Solution.
          </h2>
          <p className="text-google-grey text-lg md:text-xl max-w-3xl mx-auto">
            Standard organizes native Logic Pro plugins into a curated Project. <br />No configuration. Just pure, high-velocity workflow.
          </p>
        </div>

        <div className="sc-scene">
          <div className="sc-cube" ref={cubeRef}>
            {FACES.map((f, i) => (
              <div className="sc-face sc-face--img" key={f.alt} style={{ transform: `rotateY(${OFFSETS[i]}deg) translateZ(calc(var(--sc-w) / 2))` }}>
                <img className={f.text ? 'sc-img-contain' : 'sc-img-fill'} src={f.src} alt={f.alt} draggable={false} />
                <div className="sc-shade" />
              </div>
            ))}
          </div>
        </div>

        <div className="sc-stack">
          {FACES.map((f) => <div key={f.alt} className="sc-stack-panel"><img src={f.src} alt={f.alt} loading="lazy" /></div>)}
        </div>
      </div>
    </section>
  );
};

export default StandardCube;
