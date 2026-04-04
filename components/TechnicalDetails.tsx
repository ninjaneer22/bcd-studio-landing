import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const TechnicalDetails: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        autoAlpha: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="tech-specs" 
      ref={sectionRef} 
      className="relative w-full bg-gradient-to-b from-[#030303] via-[#0b1220] to-[#030303] py-24 px-8 border-t border-white/5 overflow-hidden"
    >
      {/* ABSTRACT BLURRED BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Container: space-y-16 matches PricingSection consistency */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-16">

        {/* Main Title */}
        <div className="space-y-4">
          <span className="tech-reveal text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
            Technical Specifications
          </span>
          <h2 className="tech-reveal text-3xl md:text-5xl font-bold text-google-white tracking-tight">
            The engine behind the speed.
          </h2>
        </div>

        {/* Integration & Performance */}
        <div className="space-y-6">
          <h3 className="tech-reveal text-google-white text-lg font-medium uppercase tracking-widest">
            Integration & Performance
          </h3>
          <ul className="tech-reveal space-y-4 text-google-grey text-base md:text-lg text-left max-w-2xl mx-auto font-medium">
            <li className="flex gap-4">
              <span className="text-cyan-500">•</span>
              <span><strong>Native Performance:</strong> Powered by the Flexi-Deck engine (included), the launcher operates with minimal CPU impact and no UI clutter.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-cyan-500">•</span>
              <span><strong>Auto-Pilot:</strong> Software launches automatically with Logic Pro and remains hidden until called, ensuring a zero-friction startup.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-cyan-500">•</span>
              <span><strong>Deep Integration:</strong> Utilizes the macOS accessibility layer to command Logic Pro without the need for complex scripting.</span>
            </li>
          </ul>
        </div>

        {/* Reduced Separator (Removed py-6 wrapper) */}
        <div className="tech-reveal w-16 h-[1px] bg-zinc-800 mx-auto"></div>

        {/* Licensing & Trial */}
        <div className="space-y-6">
          <h3 className="tech-reveal text-google-white text-lg font-medium uppercase tracking-widest">
            Licensing & Trial
          </h3>
          <ul className="tech-reveal space-y-4 text-google-grey text-base md:text-lg text-left max-w-2xl mx-auto font-medium">
            <li className="flex gap-4">
              <span className="text-cyan-500">•</span>
              <span><strong>30-Day Evaluation:</strong> Both versions include a 30-day trial with full access to the visual grid and plugin launching capabilities.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-cyan-500">•</span>
              <span><strong>Standard Tier:</strong> Activates the Flexi-Deck Player mode for a streamlined, plug-and-play experience.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-cyan-500">•</span>
              <span><strong>MAX Tier:</strong> Unlocks Creator Mode, allowing for total customization of layouts and advanced multi-action triggers.</span>
            </li>
          </ul>
        </div>

        {/* Reduced Separator (Removed py-6 wrapper) */}
        <div className="tech-reveal w-16 h-[1px] bg-zinc-800 mx-auto"></div>

        {/* System Requirements */}
        <div className="space-y-6">
          <h3 className="tech-reveal text-google-white text-lg font-medium uppercase tracking-widest">
            System Requirements
          </h3>
          <div className="tech-reveal space-y-2 text-google-grey text-base md:text-lg font-medium">
            <p><strong>OS:</strong> macOS 13 Ventura or later</p>
            <p><strong>DAW:</strong> Logic Pro 11.1 or later (required for enhanced plugin search speed)</p>
            <p><strong>Hardware:</strong> Intel or Apple Silicon (M1, M2, M3, M4) Macs</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechnicalDetails;