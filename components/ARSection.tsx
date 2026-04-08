import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { QRCodeSVG } from 'qrcode.react';

interface ARCardProps {
  label: string;
  modelPath: string;
}

const ARCard: React.FC<ARCardProps> = ({ label, modelPath }) => {
  const [modelUrl, setModelUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Automatically appends the parameter to launch directly into AR mode
      setModelUrl(`${window.location.origin}${modelPath}#arDirectReticle=true`);
    }
  }, [modelPath]);

  return (
    <div className="ar-reveal bg-zinc-900/70 backdrop-blur-md w-full max-w-[280px] aspect-[3/4] rounded-2xl p-6 overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.03] flex flex-col items-center justify-between group">
      
      {/* Nudged QR Section */}
      <div className="flex-grow flex items-center justify-center w-full -mt-12">
        {modelUrl && (
          // Wrapped the QR code in an anchor tag so mobile users can tap it
          <a 
            rel="ar" 
            href={modelUrl} 
            className="p-3 rounded-xl bg-zinc-200 shadow-inner cursor-pointer hover:bg-white transition-colors duration-300 active:scale-95 block"
            title="Tap to launch AR"
          >
            <QRCodeSVG
              value={modelUrl}
              size={180}
              level={"M"}
              includeMargin={false}
            />
          </a>
        )}
      </div>

      {/* Balanced Bottom Section */}
      <div className="text-center pointer-events-none">
        <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold mb-2">
          {/* Swaps the text based on screen size */}
          <span className="hidden md:inline">Scan to View</span>
          <span className="inline md:hidden">Tap to View</span>
        </p>
        <div className="px-4 py-2 bg-zinc-800 text-white text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-blue-600 transition-colors">
          {label}
        </div>
      </div>
    </div>
  );
};

const ARSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ar-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="ar-interaction" 
      ref={sectionRef} 
      className="w-full py-20 flex items-center justify-center px-8 relative overflow-hidden bg-[#0b0f14] border-t border-white/5"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(120,130,160,0.18) 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center justify-center gap-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="ar-reveal text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
            WANT A CLOSER LOOK?
          </h2>

          <div className="ar-reveal space-y-3 max-w-3xl">
            <h3 className="text-white text-2xl font-bold">
              Experience Plugin Launcher in Augmented Reality
            </h3>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
              Scan with your iPhone or iPad to place Plugin Launcher in your Studio.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full place-items-center">
          <ARCard label="EFFECTS" modelPath="/models/effects.usdz" />
          <ARCard label="INSTRUMENTS" modelPath="/models/instruments.usdz" />
          <ARCard label="MAX CUSTOM" modelPath="/models/max.usdz" />
        </div>

      </div>
    </section>
  );
};

export default ARSection;