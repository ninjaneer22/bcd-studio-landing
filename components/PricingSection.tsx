import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        autoAlpha: 0,
        y: 40,
        scale: 0.98,
        duration: 1.4,
        stagger: 0.3,
        ease: "expo.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing-plans" ref={sectionRef} className="w-full bg-black pt-12 pb-24 px-8 border-t border-white/5 relative overflow-hidden">
      <style>{`
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>

      {/* Background Glow */}
      {/* Layered Background Glow */}
<div className="absolute inset-0 pointer-events-none z-0">
  
  {/* Cyan (top-right) */}
  <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />
  
  {/* Blue (center-left) */}
  <div className="absolute top-[40%] left-[10%] w-[600px] h-[600px] bg-blue-500/10 blur-[160px] rounded-full" />
  
  {/* Orange (bottom-center hint for MAX) */}
  <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-orange-500/8 blur-[140px] rounded-full" />

</div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <h2 className="pricing-reveal text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-[0.3em] uppercase text-center mb-20">
          CHOOSE YOUR VERSION
        </h2>

        <div className="w-full space-y-16">
          
          {/* Standard Version */}
          <div className="pricing-reveal flex flex-col items-center text-center max-w-2xl mx-auto">
            <h3 className="text-white text-3xl font-bold mb-4 tracking-tight">
  Plugin Launcher <span className="text-cyan-400">Standard</span>
</h3>
<p className="text-white text-xl font-bold mb-8">£29.99</p>

            <ul className="text-zinc-400 text-lg space-y-4 mb-12 list-none font-medium">
              <li>• Preloaded with all Logic Pro plugins</li>
              <li>• Plug-and-play setup</li>
              <li>• One-time purchase</li>
            </ul>

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

          <div className="pricing-reveal w-24 h-[1px] bg-white/5 mx-auto"></div>

          {/* MAX Version */}
          <div className="pricing-reveal flex flex-col items-center text-center max-w-2xl mx-auto">
            <h3 className="text-white text-3xl font-bold mb-4 tracking-tight">
  Plugin Launcher <span className="text-orange-400">MAX</span>
</h3>
<div className="flex flex-col items-center gap-2 mb-8">
  <p className="text-white text-xl font-bold">£49.99</p>
  <span className="text-[10px] tracking-[0.2em] font-black text-orange-500 bg-orange-500/15 px-3 py-1.5 rounded-full border border-orange-500/20 uppercase">
    Introductory price
  </span>
</div>

            <ul className="text-zinc-400 text-lg space-y-4 mb-12 list-none font-medium">
              <li>• Full customization for any plugin</li>
              <li>• Includes everything in Standard</li>
              <li>• Full Flexi-Deck Creator license</li>
            </ul>

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
    </section>
  );
};

export default PricingSection;