
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const VideoOnlySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for the container appearance
      gsap.from(".video-only-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        autoAlpha: 0,
        scale: 0.98,
        duration: 0.6,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cinematic-break" ref={containerRef} className="w-full bg-[#000000] pt-8 pb-16 px-8 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="video-only-anim relative group w-full aspect-video bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          {/* Main Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
          >
            <source src="/images/movies/bcd_max_promo_10_sec.mp4" type="video/mp4" />
          </video>

          {/* Subtle vignette and scanline effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none"></div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoOnlySection;
