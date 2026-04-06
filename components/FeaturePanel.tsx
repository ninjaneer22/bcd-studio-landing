
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FeaturePanel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 35%",
          toggleActions: "play none none reverse"
        },
        autoAlpha: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 35%", // Delay until the bottom of the section is well within the viewport
        onEnter: () => videoRef.current?.play().catch(() => { }),
        onLeave: () => videoRef.current?.pause(),
        onEnterBack: () => videoRef.current?.play().catch(() => { }),
        onLeaveBack: () => videoRef.current?.pause(),
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="panel-2-features" ref={containerRef} className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] py-24 px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
   <span className="feature-anim text-sm tracking-[0.4em] font-medium text-google-grey uppercase mb-4">
          STANDARD & MAX PLUGIN LAUNCHERS
        </span>

        <h2 className="feature-anim text-4xl md:text-6xl font-bold text-google-white tracking-tight mb-4">
          Every Plugin. One Touch.
        </h2>

        <p className="feature-anim text-google-grey text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Built for high-pressure sessions. Eliminate the menu-dive.  <br />Launch any plugin from a touch-ready interface.
        </p>

        <div className="feature-anim w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/5 shadow-2xl relative group">
          <video
  ref={videoRef}
  loop
  muted
  playsInline
  preload="metadata"
  poster="/images/feature-poster.webp"
  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
>
  <source src="/images/movies/bcd_promo_30_sec.mp4" type="video/mp4" />
</video>

          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-google-white hover:bg-white/10 hover:scale-110 transition-all duration-300 z-10"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturePanel;
