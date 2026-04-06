import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
  trigger: containerRef.current,
  start: "top top",
  end: "+=100%",
  scrub: 1,
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
}
        });

        // TITLE
        tl.fromTo(".hero-title",
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
          0
        );

        // SUBTITLE
        tl.fromTo(".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          0.3
        );

        // LOGOS
        tl.fromTo(".hero-brand-logo",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
          0.5
        );

        // OVERLAY
        tl.to(overlayRef.current, { opacity: 0.8, duration: 1.5 }, 0);

      }, containerRef);

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="panel-1-hero"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/images/hero-poster.webp"
          className="w-full h-full object-cover scale-105"
        >
          <source src="/images/movies/bcd_hero.mp4" type="video/mp4" />
        </video>

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0 z-10"
        />
      </div>

      <div className="relative z-20 text-center px-8 flex flex-col items-center">
        <h1 className="hero-title text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-white uppercase">
          BROWSE. CLICK. DONE.
        </h1>

        <p className="hero-subtitle text-white text-xl md:text-3xl tracking-widest mb-12 font-medium">
          Load any plugin instantly.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12">
          <img src="/images/logos/logo_logic.png" className="hero-brand-logo h-12 md:h-16" />
          <img src="/images/logos/logo_studio1.png" className="hero-brand-logo h-12 md:h-16" />
          <img src="/images/logos/logo_luna.png" className="hero-brand-logo h-12 md:h-16" />
        </div>
      </div>
    </section>
  );
};

export default Hero;