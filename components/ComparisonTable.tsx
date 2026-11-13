import React, { useRef } from 'react';
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
  return (
    <section
      id="comparison-panel"
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-[#080808] via-[#0b1220] to-[#080808] pt-12 md:pt-20 pb-20 px-6 md:px-12 border-t border-white/5"
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        /* Phones: no sideways scrolling. Each row becomes a small block: the feature name, then Standard, then MAX. */
        @media (max-width: 767px) {
          .cmp table, .cmp tbody { display: block; min-width: 0; width: 100%; }
          .cmp thead { display: none; }
          .cmp tr { display: block; padding: 18px 0; }
          .cmp td { display: block; text-align: left; padding: 0; }
          .cmp td.cmp-label { margin-bottom: 10px; font-size: 15px; }
          .cmp td.cmp-std, .cmp td.cmp-max { font-size: 15px; line-height: 1.45; }
          .cmp td.cmp-std { margin-bottom: 10px; }
          .cmp td.cmp-std::before, .cmp td.cmp-max::before { display: block; margin-bottom: 2px; font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; }
          .cmp td.cmp-std::before { content: "Standard"; color: #06b6d4; }
          .cmp td.cmp-max::before { content: "MAX"; color: #f97316; }
          .cmp tr.cmp-price, .cmp tr.cmp-buy { display: grid; grid-template-columns: 1fr 1fr; column-gap: 12px; padding: 12px 0 0; }
          .cmp tr.cmp-price { padding-top: 24px; }
          .cmp tr.cmp-price td.cmp-label, .cmp tr.cmp-buy td.cmp-gap { display: none; }
          .cmp tr.cmp-price td.cmp-std, .cmp tr.cmp-price td.cmp-max { margin: 0; font-size: 22px; }
          .cmp td.cmp-btn { text-align: center; }
        }
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

        <div className="relative group cmp">
          <div className="overflow-x-auto custom-scrollbar">
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
                    <td className="cmp-label py-6 pr-6 text-google-white font-bold align-top text-base">{row.label}</td>
                    <td className="cmp-std py-6 px-6 text-google-grey text-center align-top leading-relaxed text-base">{row.std}</td>
                    <td className="cmp-max py-6 px-6 text-google-grey text-center align-top leading-relaxed text-base">{row.max}</td>
                  </tr>
                ))}
                {/* Price, then the Buy buttons, at the foot of each column */}
                <tr className="table-row-reveal cmp-price">
                  <td className="cmp-label pt-8 pb-2 pr-6 text-google-white font-bold align-bottom text-base">Price</td>
                  <td className="cmp-std pt-8 pb-2 px-6 text-center text-white text-xl font-bold">£29.99</td>
                  <td className="cmp-max pt-8 pb-2 px-6 text-center text-white text-xl font-bold">£49.99</td>
                </tr>
                <tr className="table-row-reveal !border-t-0 cmp-buy">
                  <td className="cmp-gap pb-2"></td>
                  <td className="cmp-btn pt-4 pb-2 px-3 text-center"><a href={STANDARD_URL} className="buy-btn buy-btn--sm">Buy Standard</a></td>
                  <td className="cmp-btn pt-4 pb-2 px-3 text-center"><a href={MAX_URL} className="buy-btn buy-btn--sm">Buy MAX</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
