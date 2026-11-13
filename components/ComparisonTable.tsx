import React, { useRef, useState } from 'react';
import { useReveal } from './useReveal';

const STANDARD_URL = 'https://buy.stripe.com/fZu3cv55bbKadeYa0b8bS01';
const MAX_URL = 'https://buy.stripe.com/9B6fZh9lr15wb6Q0pB8bS02';

const On = () => <span className="text-emerald-500/70 text-[1.2em] mr-2">●</span>;
const Off = () => <span className="text-white/20 text-[1.2em] mr-2">●</span>;

// One comparison for both versions: who each is for, then what each includes.
const ROWS: { label: string; std: React.ReactNode; max: React.ReactNode }[] = [
  { label: 'The Library', std: 'Optimized for every stock Logic Pro instrument and effect.', max: 'Everything in Standard, plus full support for your entire third-party collection.' },
  { label: 'The Advantage', std: "Instant access to Logic Pro's native plugins and instruments.", max: 'A complete custom console with triple layouts and up to 840 triggers.' },
  { label: 'Workflow Match', std: 'Songwriters, producers, and stock-tool purists.', max: 'Composers, mix engineers, and sound designers.' },
  { label: 'Core Philosophy', std: 'Pure Logic Focus. (Stock plugins only).', max: 'Expansive Control. (Full AU and Native support).' },
  { label: 'Logic Native Plugins', std: <><On /> Included</>, max: <><On /> Included</> },
  { label: '3rd Party Plugins (AU)', std: <><Off /> (Native Only)</>, max: <><On /> Fully Supported</> },
  { label: 'Custom Projects', std: <><Off /> (Preset Only)</>, max: <><On /> 3 Custom Views</> },
  { label: 'Multi-Action Triggers', std: <><On /> Pre-assigned Macros</>, max: <><On /> 4 Custom Triggers per button</> },
  { label: '840 Trigger Capacity', std: <><Off /> (Standard Grid)</>, max: <><On /> Fully Enabled</> },
];

const ComparisonTable: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef, '.table-row-reveal');
  const [showFade, setShowFade] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    setShowFade(scrollLeft + clientWidth < scrollWidth - 20);
  };

  return (
    <section
      id="comparison-panel"
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-[#080808] via-[#0b1220] to-[#080808] pt-12 md:pt-20 pb-20 px-6 md:px-12 border-t border-white/5"
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-8">
          <span className="table-row-reveal inline-block text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
            FIND YOUR MATCH
          </span>
          <h2 className="table-row-reveal text-3xl md:text-5xl font-bold text-google-white tracking-tight">
            Compare Versions.
          </h2>
        </div>

        <div className="relative group">
          <div className="overflow-x-auto custom-scrollbar" onScroll={handleScroll}>
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 pr-4 text-sm tracking-[0.3em] font-bold text-google-grey uppercase w-1/4">Feature</th>
                  <th className="py-6 px-3 text-center w-3/8">
                    <span className="block text-2xl font-black text-cyan-500">Standard</span>
                  </th>
                  <th className="py-6 px-3 text-center w-3/8">
                    <span className="block text-2xl font-black text-orange-500">MAX</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ROWS.map((row) => (
                  <tr key={row.label} className="table-row-reveal group hover:bg-white/[0.02] transition-colors">
                    <td className="py-6 pr-6 text-google-white font-bold align-top text-base">{row.label}</td>
                    <td className="py-6 px-6 text-google-grey text-center align-top leading-relaxed text-base">{row.std}</td>
                    <td className="py-6 px-6 text-google-grey text-center align-top leading-relaxed text-base">{row.max}</td>
                  </tr>
                ))}
                {/* Price, then the Buy buttons, at the foot of each column */}
                <tr className="table-row-reveal">
                  <td className="pt-8 pb-2 pr-6 text-google-white font-bold align-bottom text-base">Price</td>
                  <td className="pt-8 pb-2 px-6 text-center text-white text-3xl font-bold">£29.99</td>
                  <td className="pt-8 pb-2 px-6 text-center text-white text-3xl font-bold">£49.99</td>
                </tr>
                <tr className="table-row-reveal !border-t-0">
                  <td className="pb-2"></td>
                  <td className="pt-4 pb-2 px-3 text-center"><a href={STANDARD_URL} className="buy-btn buy-btn--sm">Buy Standard</a></td>
                  <td className="pt-4 pb-2 px-3 text-center"><a href={MAX_URL} className="buy-btn buy-btn--sm">Buy MAX</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`absolute right-0 top-0 bottom-0 z-20 w-32 bg-gradient-to-l from-[#0b1220] via-[#0b1220]/90 to-transparent pointer-events-none transition-opacity duration-500 md:hidden ${showFade ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
