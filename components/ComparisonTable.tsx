import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ComparisonTable: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showFade1, setShowFade1] = useState(true);
  const [showFade2, setShowFade2] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>, setFade: (val: boolean) => void) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      setFade(false);
    } else {
      setFade(true);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".table-row-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="comparison-panel" 
      ref={sectionRef} 
      className="w-full bg-gradient-to-b from-[#080808] via-[#0b1220] to-[#080808] pt-12 md:pt-20 pb-20 px-6 md:px-12 border-t border-white/5"
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-24">

        {/* PART 1: Workflow Profile */}
        <div className="space-y-12">
          <div className="text-center space-y-8">
            <span className="table-row-reveal inline-block text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
              FIND YOUR MATCH
            </span>
            <h2 className="table-row-reveal text-3xl md:text-5xl font-bold text-google-white tracking-tight">
              Choose Your Workflow.
            </h2>
          </div>

          <div className="relative group">
            <div className="overflow-x-auto custom-scrollbar" onScroll={(e) => handleScroll(e, setShowFade1)}>
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 text-sm tracking-[0.3em] font-bold text-google-grey uppercase w-1/4">Workflow Profile</th>
                    <th className="py-6 text-2xl font-black text-cyan-500 text-center w-3/8">Standard</th>
                    <th className="py-6 text-2xl font-black text-orange-500 text-center w-3/8">MAX</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="table-row-reveal group hover:bg-white/[0.02] transition-colors">
                    <td className="py-8 pr-8 text-google-white font-bold align-top text-base">The Library</td>
                    <td className="py-8 px-6 text-google-grey text-center align-top leading-relaxed text-base">Optimized for every stock Logic Pro instrument and effect.</td>
                    <td className="py-8 px-6 text-google-grey text-center align-top leading-relaxed text-base">Everything in Standard, plus full support for your entire third-party collection.</td>
                  </tr>
                  <tr className="table-row-reveal group hover:bg-white/[0.02] transition-colors">
                    <td className="py-8 pr-8 text-google-white font-bold align-top text-base">The Advantage</td>
                    <td className="py-8 px-6 text-google-grey text-center align-top leading-relaxed text-base">Instant access to Logic Pro's native plugins and instruments.</td>
                    <td className="py-8 px-6 text-google-grey text-center align-top leading-relaxed text-base">A complete custom console with triple layouts and up to 840 triggers.</td>
                  </tr>
                  <tr className="table-row-reveal group hover:bg-white/[0.02] transition-colors">
                    <td className="py-8 pr-8 text-google-white font-bold align-top text-base">Workflow Match</td>
                    <td className="py-8 px-6 text-google-grey text-center align-top leading-relaxed text-base">Songwriters, producers, and stock-tool purists.</td>
                    <td className="py-8 px-6 text-google-grey text-center align-top leading-relaxed text-base">Composers, mix engineers, and sound designers.</td>
                  </tr>
                  <tr className="table-row-reveal group hover:bg-white/[0.02] transition-colors">
                    <td className="py-8 pr-8 text-google-white font-bold align-top text-base">Core Philosophy</td>
                    <td className="py-8 px-6 text-google-grey text-center align-top leading-relaxed text-base">Pure Logic Focus. (Stock plugins only).</td>
                    <td className="py-8 px-6 text-google-grey text-center align-top leading-relaxed text-base">Expansive Control. (Full AU and Native support).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={`absolute right-0 top-0 bottom-0 z-20 w-32 bg-gradient-to-l from-[#0b1220] via-[#0b1220]/90 to-transparent pointer-events-none transition-opacity duration-500 md:hidden ${showFade1 ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>

        {/* PART 2: Feature Breakdown */}
        <div className="space-y-12">
          <div className="text-center space-y-8">
            <span className="table-row-reveal inline-block text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
              TECHNICAL BREAKDOWN
            </span>
            <h2 className="table-row-reveal text-3xl md:text-5xl font-bold text-google-white tracking-tight">
              Compare Editions.
            </h2>
          </div>

          <div className="relative group">
            <div className="overflow-x-auto pb-12 custom-scrollbar" onScroll={(e) => handleScroll(e, setShowFade2)}>
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 text-sm tracking-[0.3em] font-bold text-google-grey uppercase w-1/4">Feature</th>
                    <th className="py-6 text-2xl font-black text-cyan-500 text-center w-3/8">Standard</th>
                    <th className="py-6 text-2xl font-black text-orange-500 text-center w-3/8">MAX</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { label: "Price", std: "£29.99", max: "£49.99 (Intro Offer)" },
                    { label: "Logic Native Plugins", std: <><span className="text-emerald-500/70 text-[1.2em] mr-2">●</span> Included</>, max: <><span className="text-emerald-500/70 text-[1.2em] mr-2">●</span> Included</> },
                    { label: "3rd Party Plugins (AU)", std: <><span className="text-white/20 text-[1.2em] mr-2">●</span> (Native Only)</>, max: <><span className="text-emerald-500/70 text-[1.2em] mr-2">●</span> Fully Supported</> },
                    { label: "Custom Projects", std: <><span className="text-white/20 text-[1.2em] mr-2">●</span> (Preset Only)</>, max: <><span className="text-emerald-500/70 text-[1.2em] mr-2">●</span> 3 Custom Views</> },
                    { label: "Multi-Action Triggers", std: <><span className="text-emerald-500/70 text-[1.2em] mr-2">●</span> Pre-assigned Macros</>, max: <><span className="text-emerald-500/70 text-[1.2em] mr-2">●</span> 4 Custom Triggers per button</> },
                    { label: "840 Trigger Capacity", std: <><span className="text-white/20 text-[1.2em] mr-2">●</span> (Standard Grid)</>, max: <><span className="text-emerald-500/70 text-[1.2em] mr-2">●</span> Fully Enabled</> },
                    { label: "Ideal For", std: "Stock Tools Only", max: "Complete Studio Control" },
                  ].map((row, i) => (
                    <tr key={i} className="table-row-reveal group hover:bg-white/[0.01] transition-colors">
                      <td className="py-6 pr-8 text-google-white font-bold text-base">{row.label}</td>
                      <td className="py-6 px-6 text-center text-google-grey text-base">{row.std}</td>
                      <td className="py-6 px-6 text-center text-google-grey text-base">{row.max}</td>
                    </tr>
                  ))}
                  
                  {/* CTA Buttons Row */}
                  <tr className="table-row-reveal transition-colors pt-8">
                    <td className="py-8 pr-8"></td>
                    <td className="py-8 px-6 text-center">
                      <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
                        <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#7dd3fc_0%,#0369a1_50%,#7dd3fc_100%)]"></div>
                        <a 
                          href="https://buy.stripe.com/fZu3cv55bbKadeYa0b8bS01" 
                          className="relative block px-8 py-3 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-wide hover:bg-neutral-900 transition-colors text-center text-sm md:text-base"
                        >
                          Buy Standard
                        </a>
                      </div>
                    </td>
                    <td className="py-8 px-6 text-center">
                      <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
                        <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#fbbf24_0%,#ea580c_50%,#fbbf24_100%)]"></div>
                        <a 
                          href="https://buy.stripe.com/9B6fZh9lr15wb6Q0pB8bS02" 
                          className="relative block px-8 py-3 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-wide hover:bg-neutral-900 transition-colors text-center text-sm md:text-base"
                        >
                          Buy MAX
                        </a>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div className={`absolute right-0 top-0 bottom-12 z-20 w-32 bg-gradient-to-l from-[#0b1220] via-[#0b1220]/90 to-transparent pointer-events-none transition-opacity duration-500 md:hidden ${showFade2 ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComparisonTable;