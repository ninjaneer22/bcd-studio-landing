import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const StandardSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance reveal for text
      gsap.from(".std-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out"
      });

      // Subtle parallax for the media column
      gsap.to(mediaRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -50,
        ease: "none"
      });

      // Subtle drift for the header label
      gsap.to(labelRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        x: 20,
        ease: "none"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="standard-details" 
      ref={sectionRef} 
      className="w-full bg-[radial-gradient(circle_at_top_right,_#0d0d0d_0%,_#050505_100%)] pt-12 pb-8 px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Animation Styles */}
      <style>{`
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* Upgraded Hero-Style Header */}
        <div className="text-center mb-24 overflow-hidden">
          <span 
            ref={labelRef} 
            className="inline-block text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-[0.2em] uppercase"
          >
            PLUGIN LAUNCHER STANDARD
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-20 items-start">
          {/* Left Column (60%) - Stacked Media */}
          <div ref={mediaRef} className="w-full md:w-[60%] flex flex-col gap-12">
            
            {/* Media 1: Loading Plugins Video */}
            <div className="std-anim w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/5 relative group shadow-2xl">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                <source src="/images/movies/bcd_standard_3_plugins.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Media 2: UI Angle Image */}
            <div className="std-anim w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/5 shadow-xl">
              <img
                src="/images/launchers/logic_pro_standard_angle.webp"
                alt="Plugin Launcher Standard UI Detail"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
              />
            </div>
          </div>

          {/* Right Column (40%) - Text Content */}
          <div className="w-full md:w-[40%] flex flex-col pt-4 md:sticky md:top-32">
            <div className="std-anim space-y-6 text-google-grey">
              <h3 className="text-google-white text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                Zero friction. Pure speed. <br />
                Replace deep drop-down menus <br />
                with a touch-ready project.
              </h3>

              <p className="text-base leading-relaxed">
                Every native Logic Pro plugin and instrument is pre-mapped and ready to launch. Maintain your creative momentum and summon the exact tool you need, the moment you need it.
              </p>

              <div className="pt-2 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-google-white text-xl font-bold tracking-tight">The Methodology.</h3>
                  <p className="text-base leading-relaxed">
                    The ultimate workflow is built on three simple steps: <br />
                    <span className="text-google-white font-semibold">Browse. Click. Done.</span>
                  </p>
                </div>

                <p className="text-base leading-relaxed">
                  A single tap triggers a smart macro that bypasses the menu and loads your plugin instantly. <br />
                  No scrolling. No typing. Just mixing.
                </p>

                <div className="pt-6">
                  {/* Neon Border CTA */}
                  <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
                    <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></div>
                    <a 
                      href="https://buy.stripe.com/fZu3cv55bbKadeYa0b8bS01" 
                      className="relative block px-8 py-3.5 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-wide hover:bg-neutral-900 transition-colors text-center"
                    >
                      Buy Standard Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardSection;