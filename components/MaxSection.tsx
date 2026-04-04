import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MaxSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance reveal
      gsap.from(".max-std-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 40,
        duration: 1.4,
        stagger: 0.15,
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
        y: -60,
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
        x: -20,
        ease: "none"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="max-details" 
      ref={sectionRef} 
      className="relative w-full bg-[#030303] pt-12 pb-8 px-8 border-t border-white/5 overflow-hidden"
    >
      {/* ABSTRACT AURORA BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/15 rounded-full blur-[100px]" />
      </div>

      <style>{`
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>

      {/* Main Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-24 overflow-hidden">
          <span 
            ref={labelRef} 
            className="inline-block text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-[0.2em] uppercase"
          >
            PLUGIN LAUNCHER MAX
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-20 items-start">
          {/* Left Column (60%) - Parallax Media */}
          <div ref={mediaRef} className="w-full md:w-[60%] flex flex-col gap-12">
            
            {/* Media 1: Loading Plugins Video */}
            <div className="max-std-anim w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 relative group shadow-[0_0_100px_rgba(0,0,0,0.6)]">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 transition-opacity duration-700">
                <source src="/images/movies/bcd_max_load_3_plugins.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Media 2: UI Angle Image */}
            <div className="max-std-anim w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.4)]">
              <img
                src="/images/launchers/logic_pro_max_angle.webp"
                alt="Plugin Launcher MAX UI Detail"
                className="w-full h-full object-cover opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Media 3: Button Explainer Video */}
            <div className="max-std-anim w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.4)]">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 transition-opacity duration-700">
                <source src="/images/movies/4_macros_per_button.mp4" type="video/mp4" />
              </video>
            </div>

          </div>

          {/* Right Column (40%) */}
          <div className="w-full md:w-[40%] flex flex-col pt-2 md:sticky md:top-32">
            <div className="max-std-anim space-y-10 text-google-grey">
              <div className="space-y-6">
                <h3 className="text-google-white text-3xl font-bold leading-tight tracking-tight">
                  The ultimate command center for your plugin library.
                </h3>
                <p className="text-base leading-relaxed">
                  Unlock Creator Mode. With 840 programmable triggers across three dynamic layouts, MAX gives you the architecture to map, organize, and launch your entire third-party collection instantly. Engineered for the relentless pace of scoring and elite post-production.
                </p>
              </div>

              <div className="space-y-8">
                <h4 className="text-google-white font-bold text-lg tracking-wide py-1">
                  Engineered Control: Scale, Logic, Depth
                </h4>

                <div className="space-y-6">
                  <p className="text-base leading-relaxed">
                    <span className="text-google-white font-semibold">Triple Layouts:</span> Switch seamlessly between three custom Projects. Dedicate layouts to specific phases of your mix or massive third-party arsenals.
                  </p>

                  <p className="text-base leading-relaxed">
                    <span className="text-google-white font-semibold">Multi-Action Triggers:</span> Command up to four unique actions per button. MAX provides the architecture for advanced users to build deep, custom macro sequences.
                  </p>

                  <p className="text-base leading-relaxed">
                    <span className="text-google-white font-semibold">Total Access:</span> Put your massive library to work. Bring your heaviest hitters to the surface and realize the full value of the tools you own.
                  </p>
                </div>

                <p className="text-sm text-google-grey pt-2">
                  (Full support for Third-Party AU and Logic Pro native plugins).
                </p>

                <div className="pt-10">
                  <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
                    <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></div>
                    <a 
                      href="https://buy.stripe.com/9B6fZh9lr15wb6Q0pB8bS02" 
                      className="relative block px-8 py-3.5 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-wide hover:bg-neutral-900 transition-colors text-center"
                    >
                      Buy MAX Now
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

export default MaxSection;