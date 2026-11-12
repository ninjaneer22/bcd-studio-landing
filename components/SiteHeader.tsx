import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './siteheader.css';

// Slim sticky header: white BCD logo on the left, section links and a Buy button on the right.
// On the home page's first load it fades in with the laptop (about 6.5s in) so the opening intro stays clean.
const HEADER_H = 56;
const HIDDEN_ON = ['/pa-promo', '/StudioOnePromo', '/UadPromo'];

const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const fadeIn = useRef(pathname === '/'); // only the very first home-page load gets the delayed fade
  const [open, setOpen] = useState(false); // phone menu
  useEffect(() => { setOpen(false); }, [pathname]);

  if (HIDDEN_ON.includes(pathname)) return null;

  const scrollTo = (target: string) => {
    gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: target === '#pricing-plans' ? HEADER_H : 0, autoKill: true }, ease: 'power2.inOut' });
  };

  const goTo = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setOpen(false);
    if (pathname === '/') { scrollTo(target); return; }
    navigate('/');
    window.setTimeout(() => scrollTo(target), 700); // wait for the home page to mount
  };

  const link = (label: string, target: string, cls = 'sh-link') => (
    <a href={'/' + target} className={cls} onClick={(e) => goTo(e, target)}>{label}</a>
  );

  return (
    <>
      <header className={'sh' + (fadeIn.current ? ' sh-intro' : '')}>
        <Link to="/" className="sh-logo" aria-label="BCD home" onClick={() => { if (pathname === '/') gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' }); }}>
          <img src="/images/bcd_logo.png" alt="BCD" width={900} height={213} />
        </Link>
        <nav className="sh-nav" aria-label="Main">
          {link('Standard', '#standard-cube')}
          {link('MAX', '#max-cube')}
          <Link to="/utilities" className="sh-link">Utilities</Link>
          {link('Pricing', '#pricing-plans')}
          <a href="/#pricing-plans" className="buy-btn sh-buy" onClick={(e) => goTo(e, '#pricing-plans')}>Buy</a>
          <button type="button" className={'sh-menu' + (open ? ' is-open' : '')} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
        </nav>
        {open && (
          <div className="sh-panel">
            {link('Standard', '#standard-cube', 'sh-plink')}
            {link('MAX', '#max-cube', 'sh-plink')}
            <Link to="/utilities" className="sh-plink" onClick={() => setOpen(false)}>Utilities</Link>
            {link('Pricing', '#pricing-plans', 'sh-plink')}
          </div>
        )}
      </header>
      {/* Pushes the page down so the header never covers content (black on the home page to blend with the hero) */}
      <div style={{ height: HEADER_H, background: pathname === '/' ? '#000' : undefined }} aria-hidden="true" />
    </>
  );
};

export default SiteHeader;
