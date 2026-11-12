
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReveal } from './useReveal';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './explainer.css';

// Live captions for the explainer video. Times are seconds into the 15s loop.
const STEPS = [
  { word: 'Browse.', at: 1.5 },
  { word: 'Click.', at: 5.4 },
  { word: 'Done.', at: 8.0 },
];
const ALL_LIT_AT = 11.5; // from here to the loop point all three words are at full strength

const FeaturePanel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef, '.feature-anim');
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const video = videoRef.current, box = boxRef.current;
    if (!video || !box) return;

    const paint = (t: number) => {
      STEPS.forEach((s, i) => {
        const el = stepRefs.current[i];
        if (!el) return;
        const on = t >= s.at, next = STEPS[i + 1];
        el.classList.toggle('on', on);
        el.classList.toggle('now', on && (!next || t < next.at));
      });
      box.classList.toggle('all', t >= ALL_LIT_AT);
    };

    // Reduced motion: no playback, just the poster with all three words showing
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { paint(99); return; }

    // Smaller file on phones
    video.src = window.matchMedia('(max-width: 700px)').matches
      ? '/images/movies/bcd_explainer_logic_720p.mp4'
      : '/images/movies/bcd_explainer_logic_1080p.mp4';

    // Captions follow the video clock, only while it is playing
    let raf = 0;
    const tick = () => { paint(video.currentTime); raf = requestAnimationFrame(tick); };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    const stop = () => cancelAnimationFrame(raf);
    video.addEventListener('playing', start);
    video.addEventListener('pause', stop);

    // If the browser refuses to autoplay, still show the words over the poster
    const play = () => { video.play().catch(() => paint(99)); };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: box,
        start: 'center 65%', // start once most of the video is on screen
        onEnter: play,
        onLeave: () => video.pause(),
        onEnterBack: play,
        onLeaveBack: () => video.pause(),
      });
    }, containerRef);

    return () => {
      stop();
      video.removeEventListener('playing', start);
      video.removeEventListener('pause', stop);
      ctx.revert();
    };
  }, []);

  return (
    <section id="panel-2-features" ref={containerRef} className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] pt-10 pb-24 px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
   <span className="feature-anim text-sm tracking-[0.4em] font-medium text-google-grey uppercase mb-4">
          STANDARD & MAX PLUGIN LAUNCHERS
        </span>

        <h2 className="feature-anim text-4xl md:text-6xl font-bold text-google-white tracking-tight mb-4">
          Load your plugins instantly.
        </h2>

        <p className="feature-anim text-google-grey text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Built for high-pressure sessions. Eliminate the menu-dive.  <br />Launch any plugin from a touch-ready interface.
        </p>

        <div ref={boxRef} className="feature-anim pl-explainer">
          <div className="pl-frame shadow-2xl">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/explainer-poster.webp"
              aria-label="Plugin Launcher in Logic Pro: browse the list, click Beat Breaker, and the plugin opens."
            />
            <div className="pl-scrim" />
            <div className="pl-tag">Shown in Logic Pro 13</div>
          </div>
          <ol className="pl-steps" aria-label="How it works">
            {STEPS.map((s, i) => (
              <li key={s.word} ref={(el) => { stepRefs.current[i] = el; }}>{s.word}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default FeaturePanel;
