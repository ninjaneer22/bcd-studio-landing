// A short band that points people to /utilities. Sits after Contact Support, before the BCD loop and the footer.
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './bandloop.css';
import { useReveal } from './useReveal';

const TOOLS = [
  { key: 'groups', name: 'Groups' },
  { key: 'stem', name: 'Stem Bouncer' },
  { key: 'gain', name: 'Gain' },
  { key: 'panner', name: 'Panner' },
];

const UtilitiesBand: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, '.ub-rv');
  return (
  <section id="utilities-band" className="ub" ref={ref}>
    <div className="ub-head text-center max-w-6xl mx-auto">
      <span className="ub-rv inline-block text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-[0.2em] uppercase mb-4">BCD UTILITIES</span>
      <h2 className="ub-rv font-bold text-google-white mb-4 md:whitespace-nowrap" style={{ fontSize: "clamp(1.75rem, 3.6vw, 3rem)", lineHeight: 1 }}>Automate the Routine. Master the Session.</h2>
      <p className="ub-rv text-google-grey text-lg md:text-xl max-w-4xl mx-auto" style={{ textWrap: "balance" }}>
        Four powerful workflow utilities designed to handle repetitive, multi‑step actions in Logic Pro, automating the session tasks that slow you down.
      </p>
    </div>
    <ul className="ub-row">
      {TOOLS.map((t) => (
        <li key={t.key} className="ub-rv">
          <Link to="/utilities" className="ub-card" aria-label={t.name}>
            <span className="ub-shot"><img src={`/images/utilities/${t.key}.png`} alt="" loading="lazy" draggable={false} /></span>
            <span className="ub-name">{t.name}</span>
          </Link>
        </li>
      ))}
    </ul>
    <div className="ub-cta ub-rv">
      <span className="ub-ring"><Link to="/utilities" className="ub-ring-in">See the utilities</Link></span>
    </div>
  </section>
  );
};

export default UtilitiesBand;
