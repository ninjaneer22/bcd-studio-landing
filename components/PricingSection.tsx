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
        /* Simulation of the repeating grain texture */
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3E");
          opacity: 0.03; /* Very subtle noise */
        }
      `}</style>

      {/* Deep-Space Plasma and Grain Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Main Organic 'Plasma' Clusters (Heavily Blurred, Non-Geometric) */}
        {/* Layer 1: Lavender/Purple (Top-Right) */}
        <div className="absolute top-[5%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 blur-[180px] rounded-[100px]" />
        
        {/* Layer 2: Deep Blue/Cyan Cluster (Center-Left) */}
        <div className="absolute top-[35%] left-[5%] w-[650px] h-[650px] bg-blue-600/10 blur-[200px] rounded-[150px]" />
        <div className="absolute top-[48%] left-[20%] w-[300px] h-[300px] bg-cyan-400/15 blur-[120px] rounded-[80px]" />
        
        {/* Layer 3: Orange/Red Hint (Bottom-Center for MAX) */}
        <div className="absolute bottom-[5%] left-[55%] -translate-x-1/2 w-[550px] h-[400px] bg-orange-600/10 blur-[160px] rounded-[120px]" />
        <div className="absolute bottom-[18%] left-[48%] -translate-x-1/2 w-[200px] h-[200px] bg-red-500/15 blur-[100px] rounded-[60px]" />

        {/* The Crucial Grain/Noise Overlay */}
        <div className="absolute inset-0 bg-grain" />

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
          
      0</div>
      
      </div>
    </section>
  );
};

export default PricingSection;