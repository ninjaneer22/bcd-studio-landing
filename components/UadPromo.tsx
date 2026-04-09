import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const UadPromo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  // Blocks search engine indexing AND sets tab name
  useEffect(() => {
    // Set the tab title
    document.title = "BCD × Luna & UAD";

    // Block indexing
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
      // Revert to default title when leaving the page
      document.title = "Plugin Launcher | Browse. Click. Done.";
    };
  }, []);

  // Handles GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate text immediately on page load
      gsap.from(".feature-anim", {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      });

      // 2. Play video immediately on page load
      videoRef.current?.play().catch(() => { });
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
          BCD × UNIVERSAL AUDIO
        </span>

        <h2 className="feature-anim text-4xl md:text-6xl font-bold text-google-white tracking-tight mb-4">
          Unleash Your UAD Collection.
        </h2>

        <p className="feature-anim text-google-grey text-lg md:text-xl max-w-2xl mb-6 leading-relaxed">
          The BCD touch-ready interface optimized for LUNA and UAD Plugins. <br />Instant access to your entire arsenal.
        </p>

        <div className="feature-anim mb-10 flex flex-col items-center gap-6">
          <style>{`
            @keyframes spin-slow {
              100% { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin-slow 4s linear infinite;
            }
          `}</style>
          
          <p className="text-google-grey text-base">
            For more information and updates on the release:
          </p>

          <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
            <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></div>
            <a 
              href="mailto:tony@bcd.center?subject=Plugin Alliance PA Promo - Keep me updated"
              className="relative block px-8 py-3 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-widest uppercase text-[10px] hover:bg-neutral-900 transition-colors text-center"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="feature-anim w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/5 shadow-2xl relative group">
          <video ref={videoRef} loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            <source src="/images/movies/bcd_x_pa_30_sec_promo.mp4" type="video/mp4" />
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

        <div className="feature-anim mt-16 block">
          <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
            <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></div>
            <a 
              href="https://www.bcd.center"
              className="relative block px-8 py-3 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-widest uppercase text-[10px] hover:bg-neutral-900 transition-colors text-center"
            >
              Return to BCD Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UadPromo;