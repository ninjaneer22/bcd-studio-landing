import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-google-white' : 'text-google-grey group-hover:text-google-white'}`}>
          {question}
        </span>
        <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-orange-400' : 'rotate-0 text-google-grey'}`}>
          +
        </span>
      </button>
      <div 
        ref={contentRef} 
        className="overflow-hidden h-0 opacity-0"
      >
        <div className="pb-8 text-google-grey text-base leading-relaxed max-w-3xl">
          {answer}
        </div>
      </div>
    </div>
  );
};

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
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-24">
        
        {/* TOP SECTION: Tech & Licensing stays visible */}
        <div className="space-y-16">
          <div className="space-y-4 text-center">
            <span className="tech-reveal text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
              Technical Specifications
            </span>
            <h2 className="tech-reveal text-3xl md:text-5xl font-bold text-google-white tracking-tight">
              The engine behind the speed.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="tech-reveal space-y-6">
              <h3 className="text-google-white text-sm font-bold uppercase tracking-widest border-b border-white/10 pb-4">Integration</h3>
              <ul className="space-y-4 text-google-grey text-sm md:text-base leading-relaxed">
                <li><strong className="text-google-white">Native Performance:</strong> Minimal CPU impact via the Flexi-Deck engine.</li>
                <li><strong className="text-google-white">Auto-Pilot:</strong> Zero-friction startup with Logic Pro.</li>
                <li><strong className="text-google-white">macOS Layer:</strong> Accessibility-based command logic.</li>
              </ul>
            </div>
            <div className="tech-reveal space-y-6">
              <h3 className="text-google-white text-sm font-bold uppercase tracking-widest border-b border-white/10 pb-4">Requirements</h3>
              <ul className="space-y-4 text-google-grey text-sm md:text-base leading-relaxed">
                <li><strong className="text-google-white">OS:</strong> macOS 13 Ventura or later.</li>
                <li><strong className="text-google-white">DAW:</strong> Logic Pro 11.1 or later.</li>
                <li><strong className="text-google-white">Silicon:</strong> Full M1/M2/M3/M4 support.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Questions & Answers (The Accordion) */}
        <div className="tech-reveal space-y-12">
          <div className="text-center space-y-4">
            <span className="text-sm tracking-[0.4em] font-medium text-google-grey uppercase">Questions & Answers</span>
            <h3 className="text-2xl md:text-3xl font-bold text-google-white">The finer details.</h3>
          </div>

          <div className="max-w-3xl mx-auto border-t border-white/10">
            <FAQItem 
              question="Why is Logic Pro 11.1 required?" 
              answer="Logic Pro 11.1 introduced an enhanced search architecture. Plugin Launcher utilizes these deep system improvements to identify and load plugins with significantly higher speed and reliability." 
            />
            <FAQItem 
              question="Does the Standard version support third-party plugins?" 
              answer="Standard is optimized for Logic Pro's native effects and instruments. For third-party Audio Units (AU) and expansive collections, you will need Plugin Launcher MAX." 
            />
            <FAQItem 
              question="Can I upgrade to MAX later?" 
              answer="Absolutely. If your studio grows, your license can too. You can upgrade from Standard to MAX at any time by simply paying the difference." 
            />
            <FAQItem 
              question="Do I need to purchase Flexi-Deck separately?" 
              answer="No. Plugin Launcher is powered by the Flexi-Deck engine, which is included with every download. It runs as a lightweight host for your project." 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechnicalDetails;