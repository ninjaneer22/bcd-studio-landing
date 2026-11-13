import React, { useEffect, useRef } from 'react';

/* A silent looping video that only downloads when it is near the screen, and pauses when it is far away.
   Used for the autoplay clips lower down the home page so they do not all download on first load. */
const LazyVideo: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let loaded = false;
    const load = () => { if (!loaded) { loaded = true; v.src = src; v.load(); } };
    const near = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { load(); near.disconnect(); } }, { rootMargin: '600px 0px' });
    const seen = new IntersectionObserver((es) => {
      es.forEach((e) => { if (!loaded) return; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    }, { threshold: 0.05 });
    near.observe(v); seen.observe(v);
    return () => { near.disconnect(); seen.disconnect(); };
  }, [src]);

  return <video ref={ref} loop muted playsInline preload="none" className={className} />;
};

export default LazyVideo;
