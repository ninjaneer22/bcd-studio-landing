import React from 'react';
import { gsap } from 'gsap';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    gsap.to(window, { 
      scrollTo: 0, 
      duration: 1.5, 
      ease: "power4.inOut" 
    });
  };

  return (
    <footer className="w-full bg-black py-24 px-8 border-t border-white/5 text-center">
      <style>{`
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12">

        {/* Label */}
        <h2 className="text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
          Legal & Compatibility
        </h2>

        {/* Legal Block */}
        <div className="space-y-6 text-google-grey text-[11px] md:text-xs tracking-wide leading-relaxed max-w-2xl mx-auto font-medium">
          <p>
            Plugin Launcher and Plugin Launcher MAX are independent products <br />and are not affiliated with or endorsed by Apple Inc.
          </p>
          <p>
            Logic Pro and macOS are trademarks of Apple Inc., registered in the U.S. and other countries.
          </p>
          <p>
            Built for Logic Pro using Audio Units (AU). VST is not supported.
          </p>
          <p>
            All product names, logos, and interfaces are the property of their respective owners.
          </p>
        </div>

        {/* BACK TO TOP CTA - Pricing Section Style */}
        <div className="pt-8">
          <div className="relative inline-block group p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
            <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></div>
            <button 
              onClick={scrollToTop}
              className="relative block px-8 py-3 bg-neutral-950 text-neutral-200 rounded-full font-medium tracking-widest uppercase text-[10px] hover:bg-neutral-900 transition-colors text-center"
            >
              Back to Top
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="text-[10px] tracking-[0.4em] uppercase text-google-grey font-bold">
            © 2026 BCD. All rights reserved.
          </div>

          <a 
            href="https://bcd.center/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 hover:text-cyan-500 transition-colors duration-300 font-medium"
          >
            bcd.center
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;