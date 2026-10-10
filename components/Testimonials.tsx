// Testimonials grid. Ported from bcd_website_new/bcd-page-cube-text.html (replaces the scrolling ArtistGallery marquee).
import React from 'react';
import './kinetic.css';

type T = { name: string; role: string; img: string; quote: React.ReactNode };

const items: T[] = [
  { name: 'Chilani', role: 'Singer, Songwriter & Producer', img: 'chilani.jpg',
    quote: <>I love layering a lot of vocals. With a click, it gives me the freedom to quickly access my creative flow <b>in just one window.</b></> },
  { name: 'Santella Austin', role: 'Songwriter, Producer & Vocal Coach', img: 'santella-austin.jpg',
    quote: <>…a <b>godsend.</b> It allows me to be more organized than I have ever been before, which in turn allows me to get way more done.</> },
  { name: 'Lex Cameron', role: 'Musical Director, Producer & Singer-Songwriter', img: 'lex-cameron.jpg',
    quote: <>…gives me back that precious extra time to put into my live and studio productions. <b>Genius idea!!</b></> },
  { name: 'Roughhouse', role: 'Musician, Recording Artist & Producer', img: 'roughhouse.jpg',
    quote: <>…this amazing software has <b>taken my workflow to new heights</b>… given me back hours of creative work time.</> },
  { name: 'Michelle Christiansen', role: 'Producer & Songwriter', img: 'michelle-christiansen.jpg',
    quote: <>…you can select your synth or effect of choice… with the <b>touch of your fingers.</b></> },
  { name: 'Rudy Valentino Jr.', role: 'Musician, Producer & Songwriter', img: 'rudy-valentino-jr.jpg',
    quote: <>…an amazing tool for both pre- and post-work. <b>Great innovation!</b></> },
  { name: 'Baba Omar', role: 'Acoustic Engineer & Music Producer', img: 'baba-omar.jpg',
    quote: <>…a <b>lifesaver.</b> There was never a better way to speed up my workflow.</> },
];

const Testimonials: React.FC = () => (
  <section id="artist-testimonials" className="tm-section">
    <div className="tm-inner">
      <p className="tm-eyebrow">What producers say</p>
      <h2 className="tm-title">Browse. Click. <span>Done.</span></h2>
      <div className="tm-grid">
        {items.map((t) => (
          <figure className="tm-card" key={t.name}>
            <span className="tm-q tm-q-o" aria-hidden="true">“</span>
            <span className="tm-q tm-q-c" aria-hidden="true">”</span>
            <div className="tm-head">
              <img src={`/images/testimonials/${t.img}`} alt={t.name} width={72} height={72} loading="lazy" />
              <figcaption><strong>{t.name}</strong><span>{t.role}</span></figcaption>
            </div>
            <blockquote>{t.quote}</blockquote>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
