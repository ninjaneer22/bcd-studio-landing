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
    <section 
      id="pricing-plans" 
      ref={sectionRef} 
      className="w-full bg-black pt-16 pb-16 px-8 border-t border-white/5 relative overflow-hidden"
    >
      <style>{`
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3E");
          opacity: 0.05;
          filter: contrast(150%);
        }
      `}</style>

      {/* Deep-Space Plasma Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[900px] h-[600px] bg-sky-950/60 blur-[180px] scale-y-[0.7] rotate-[25deg]" />
        <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[900px] bg-purple-950/60 blur-[200px] scale-x-[0.6] rotate-[-15deg]" />
        <div className="absolute top-[30%] left-[10%] w-[800px] h-[400px] bg-blue-950/50 blur-[160px] skew-x-[10deg] rotate-[5deg]" />
        <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[1100px] h-[400px] bg-orange-950/40 blur-[170px] scale-y-[0.5]" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Swapped to Simple Grey Style */}
        <h2 className="pricing-reveal text-sm tracking-[0.4em] font-medium text-google-grey uppercase text-center mb-12">
          CHOOSE YOUR VERSION
        </h2>

        <div className="w-full space-y-16">
          
          {/* Standard Version */}
          <div className="pricing-reveal flex flex-col items-center text-center max-w-2xl mx-auto">
            <h3 className="text-white text-3xl font-bold mb-2 tracking-tight">
              Plugin Launcher <span className="text-cyan-400">Standard</span>
            </h3>
            <p className="text-white text-xl font-bold mb-6">£29.99</p>

            <ul className="text-zinc-400 text-base space-y-3 mb-8 list-none font-medium">
              <li>• Preloaded with all Logic Pro plugins</li>
              <li>• Plug-and-play setup</li>
              <li>• One-time purchase</li>
            </ul>

            <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
              <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#7dd3fc_0%,#0369a1_50%,#7dd3fc_100%)]"></div>
              <a 
                href="https://buy.stripe.com/fZu3cv55bbKadeYa0b8bS01" 
                className="relative block px-8 py-3 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-wide hover:bg-neutral-900 transition-colors text-center"
              >
                Buy Standard Now
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="pricing-reveal w-16 h-[1px] bg-white/10 mx-auto"></div>

          {/* MAX Version */}
          <div className="pricing-reveal flex flex-col items-center text-center max-w-2xl mx-auto">
            <h3 className="text-white text-3xl font-bold mb-2 tracking-tight">
              Plugin Launcher <span className="text-orange-400">MAX</span>
            </h3>
            <div className="flex flex-col items-center gap-2 mb-6">
              <p className="text-white text-xl font-bold">£49.99</p>
              <span className="text-[9px] tracking-[0.2em] font-black text-orange-500 bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/20 uppercase">
                Introductory price
              </span>
            </div>

            <ul className="text-zinc-400 text-base space-y-3 mb-8 list-none font-medium">
              <li>• Full customization for any plugin</li>
              <li>• Includes everything in Standard</li>
              <li>• Full Flexi-Deck Creator license</li>
            </ul>

            <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
              <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#fbbf24_0%,#ea580c_50%,#fbbf24_100%)]"></div>
              <a 
                href="https://buy.stripe.com/9B6fZh9lr15wb6Q0pB8bS02" 
                className="relative block px-8 py-3 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-wide hover:bg-neutral-900 transition-colors text-center"
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