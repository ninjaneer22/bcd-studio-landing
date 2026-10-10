// Max launcher: scroll-driven 4-sided cube, replacing the 120-frame image sequence (MaxSequenceCanvas).
// Faces, in turning order: intro text, plugin grid, blank LPM grid, outro text. Images are used as supplied (no resampling).
import React, { useEffect, useRef } from 'react';
import './cube.css';

const FACES = [
  { src: '/images/cube/max/side_1.png', alt: 'The interface your plugins deserve.' },
  { src: '/images/cube/max/side_2.png', alt: 'Plugin Launcher Max: plugin grid' },
  { src: '/images/cube/max/side_3.png', alt: 'Plugin Launcher Max: LPM grid' },
  { src: '/images/cube/max/side_4.png', alt: 'Browse. Click. Done.' },
];
const OFFSETS = [0, 90, 180, -90];
const RATIO = 3080 / 1380;
const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const smooth = (x: number) => x * x * (3 - 2 * x);

const MaxCube: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current, cube = cubeRef.current;
    if (!section || !cube) return;
    const scene = cube.parentElement as HTMLElement;
    const stage = section.querySelector('.mc-stage') as HTMLElement;

    // whole-pixel width/height and position so the browser doesn't resample the faces
    const snap = () => {
      // same cube height as the Standard cube, so both sections match
      const sw = Math.max(320, Math.floor(Math.min(980, window.innerWidth * 0.66, (window.innerHeight - 340) * 16 / 9) / 16) * 16);
      const h = Math.round(sw * 9 / 16);
      const w = Math.round(h * RATIO / 2) * 2;
      section.style.setProperty('--mc-w', `${w}px`);
      section.style.setProperty('--mc-h', `${h}px`);
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
    const targetAngle = () => {
      const max = section.offsetHeight - window.innerHeight;
      const f = max > 0 ? clamp(-section.getBoundingClientRect().top / max) : 0;
      const p = f * 3, seg = Math.min(2, Math.floor(p)), t = p - seg;
      return -90 * (seg + smooth(clamp((t - 0.15) / 0.7)));
    };
    let current = targetAngle(), raf = 0;
    const flats = Array.from(section.querySelectorAll<HTMLElement>('.mc-flat img'));
    const paint = () => {
      // at rest, show the face as a plain flat image (no 3D transform) so it is as sharp as the file itself
      const k = ((Math.round(-current / 90) % 4) + 4) % 4;
      const settled = Math.abs(current + 90 * Math.round(-current / 90)) < 0.05;
      cube.style.visibility = settled ? 'hidden' : 'visible';
      flats.forEach((im, i) => { im.style.visibility = settled && i === k ? 'visible' : 'hidden'; });
      cube.style.transform = `translateZ(calc(var(--mc-w) / -2)) rotateY(${current.toFixed(3)}deg)`;
      faces.forEach((_, i) => {
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
    <section ref={sectionRef} id="max-cube" className="mc-section">
      <div className="mc-stage">
        <div className="sc-head text-center max-w-5xl mx-auto">
          <span className="text-sm tracking-[0.4em] font-medium text-google-grey uppercase mb-4 block">
            PLUGIN LAUNCHER MAX
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-google-white mb-4">
            Put your library to work.
          </h2>
          <p className="text-google-grey text-lg md:text-xl max-w-3xl mx-auto">
            Bring your heaviest hitters to the surface <br />and realize the full value of the tools you own.
          </p>
        </div>

        <div className="mc-scene">
          <div className="sc-cube" ref={cubeRef}>
            {FACES.map((f, i) => (
              <div className="sc-face mc-face" key={f.alt} style={{ transform: `rotateY(${OFFSETS[i]}deg) translateZ(calc(var(--mc-w) / 2))` }}>
                <img src={f.src} alt={f.alt} draggable={false} />
                <div className="sc-shade" />
              </div>
            ))}
          </div>
          <div className="mc-flat">
            {FACES.map((f) => <img key={f.alt} src={f.src} alt="" draggable={false} />)}
          </div>
        </div>
        <div className="sc-stack">
          {FACES.map((f) => <div key={f.alt} className="sc-stack-panel"><img src={f.src} alt={f.alt} loading="lazy" /></div>)}
        </div>
      </div>
    </section>
  );
};

export default MaxCube;
