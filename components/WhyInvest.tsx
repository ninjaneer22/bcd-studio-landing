import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const WhyInvest: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".invest-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="why-invest-now" 
      ref={sectionRef} 
      className="relative w-full bg-gradient-to-b from-[#030303] via-[#0b1220] to-[#030303] pt-20 pb-12 px-8 border-t border-white/5 overflow-hidden"
    >
      {/* ABSTRACT BLURRED BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-cyan-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] -right-[10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[0%] left-[10%] w-[45%] h-[45%] bg-blue-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-16">

        {/* Section Heading */}
        <div className="space-y-8">
          <h3 className="invest-reveal text-3xl md:text-5xl text-white font-bold leading-tight tracking-tight">
            Time is your most valuable asset.<br />
            For professionals, Plugin Launcher <br className="hidden md:block" /> pays for itself in a single session.
          </h3>
          <p className="invest-reveal text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Investing in Plugin Launcher is an investment <br />in your productivity, your creativity, and your vision.
          </p>
        </div>

        {/* Updated Benefits List */}
        <div className="space-y-16">
          <h2 className="invest-reveal text-sm tracking-[0.4em] font-medium text-neutral-500 uppercase">
            CORE PROFESSIONAL ADVANTAGES:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-4xl mx-auto text-left">
            
            <div className="invest-reveal space-y-3">
              <span className="text-white font-bold text-xl block">Zero-Friction Integration</span>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Auto-starts with Logic Pro and discreetly hides until called. Minimal CPU footprint ensures your system stays focused on audio.
              </p>
            </div>

            <div className="invest-reveal space-y-3">
              <span className="text-white font-bold text-xl block">Instant Visual Clarity</span>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                See your entire library clearly organized and ready to launch. Find what you need, exactly when you need it.
              </p>
            </div>

            <div className="invest-reveal space-y-3">
              <span className="text-white font-bold text-xl block">Responsive Architecture</span>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                An interface that adapts to your screen. Intuitive pinch-to-zoom resizing ensures the project fits perfectly into your display setup.
              </p>
            </div>

            <div className="invest-reveal space-y-3">
              <span className="text-white font-bold text-xl block">Advanced Command (MAX Tier)</span>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Unlock the full power of Triple Layouts and Multi-Action Triggers to tame even the most expansive third-party collections.
              </p>
            </div>

          </div>
        </div>

        {/* Final Statement */}
        <div className="pt-20">
          <h2 className="invest-reveal text-white text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
            Revolutionize your Logic Pro <br className="hidden md:block" /> workflow today.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;