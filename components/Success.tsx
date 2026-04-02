import React, { useEffect } from 'react';

const Success: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center pt-24 pb-32 px-4 relative overflow-hidden">
      
      {/* ABSTRACT AURORA BACKGROUND - Mirroring the main site style */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] -right-[10%] w-[60%] h-[50%] bg-cyan-900/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] -left-[10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Payment Successful
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-google-white tracking-tight mb-4">
            Flow Initiated.
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Welcome to the movement. Your Flexi-Deck license and BCD **Project** download link are on their way to your inbox.
          </p>
        </div>

        {/* Molly's Welcome Stage (Primary Focus) */}
        <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] mb-20 relative group">
          <video 
            controls 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            poster="/images/molly_welcome_poster.jpg"
          >
            <source src="/videos/Molly_BCD.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* 2x2 Setup Video Layout */}
        <div className="w-full">
          <h3 className="text-2xl font-bold text-google-white mb-10 text-center tracking-tight">While you wait, let's get your workstation ready.</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Flexi-Deck Engine */}
            <div className="p-1 bg-gradient-to-br from-white/10 to-transparent rounded-xl">
              <div className="bg-[#0a0a0a] p-8 rounded-xl h-full border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-6">
                  <span className="font-bold">01</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Installing the Engine</h4>
                <p className="text-zinc-400 leading-relaxed mb-6">Learn how to install the Flexi-Deck host and authorize your unique license key.</p>
                <button className="text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-2">
                  Watch Tutorial <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>

            {/* Card 2: Loading Projects */}
            <div className="p-1 bg-gradient-to-br from-white/10 to-transparent rounded-xl">
              <div className="bg-[#0a0a0a] p-8 rounded-xl h-full border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-6">
                  <span className="font-bold">02</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Loading BCD Projects</h4>
                <p className="text-zinc-400 leading-relaxed mb-6">How to import your BCD **Project** file and navigate the custom **Menus**.</p>
                <button className="text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-2">
                  Watch Tutorial <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>

            {/* Card 3: Button Logic */}
            <div className="p-1 bg-gradient-to-br from-white/10 to-transparent rounded-xl">
              <div className="bg-[#0a0a0a] p-8 rounded-xl h-full border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-6">
                  <span className="font-bold">03</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Button & Macro Layout</h4>
                <p className="text-zinc-400 leading-relaxed mb-6">A deep dive into how our **Buttons** use 4-slot **Macros** to trigger your plugins.</p>
                <button className="text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-2">
                  Watch Tutorial <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>

            {/* Card 4: Support & Community */}
            <div className="p-1 bg-gradient-to-br from-white/10 to-transparent rounded-xl">
              <div className="bg-[#0a0a0a] p-8 rounded-xl h-full border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-6">
                  <span className="font-bold">04</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Community Support</h4>
                <p className="text-zinc-400 leading-relaxed mb-6">Join the BCD Studio community for workflow tips and template updates.</p>
                <button className="text-cyan-400 font-bold hover:text-white transition-colors flex items-center gap-2">
                  Join Discord <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Success;