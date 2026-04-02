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
      setModelUrl(`${window.location.origin}${modelPath}`);
    }
  }, [modelPath]);

  return (
    <div className="ar-reveal bg-zinc-900/70 backdrop-blur-md w-full max-w-[280px] aspect-[3/4] rounded-2xl p-6 overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.03] flex flex-col items-center justify-between group">
      <div className="flex-grow flex items-center justify-center w-full">
        {modelUrl && (
          <div className="p-3 rounded-xl bg-zinc-200 shadow-inner">
            <QRCodeSVG
              value={modelUrl}
              size={180}
              level={"M"}
              includeMargin={false}
            />
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold mb-2">
          Scan to View
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
          <h2 className="ar-reveal text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-[0.2em] uppercase">
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