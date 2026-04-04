import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Artist {
  name: string;
  title: string;
  quote: string;
  image: string;
}

const artists: Artist[] = [
  {
    name: "RUDY VALENTINO JR.",
    title: "MUSICIAN, PRODUCER & SONGWRITER",
    quote: "“...an **amazing tool** for both pre- and post-work. Great innovation!”",
    image: "/images/creatives_gallery/rudy.png"
  },
  {
    name: "BABA OMAR",
    title: "ACOUSTIC ENGINEER & MUSIC PRODUCER",
    quote: "“...a lifesaver. There was never a better way to **speed up my workflow**.”",
    image: "/images/creatives_gallery/baba.png"
  },
  {
    name: "CHILANI",
    title: "SINGER, SONGWRITER & PRODUCER",
    quote: "“I love layering a lot of vocals. With a click, it gives me the freedom to quickly **access my creative flow** in just one window.”",
    image: "/images/creatives_gallery/chilani.png"
  },
  {
    name: "LEX CAMERON",
    title: "MUSICAL DIRECTOR, PRODUCER & SINGER - SONGWRITER",
    quote: "“...gives me back that **precious extra** time to put into my live and studio productions. Genius idea!!”",
    image: "/images/creatives_gallery/lex.png"
  },
  {
    name: "MICHELLE CHRISTIANSEN",
    title: "PRODUCER & SONGWRITER",
    quote: "“...you can select your synth or effect of choice… with the **touch of your fingers**.”",
    image: "/images/creatives_gallery/michelle.png"
  },
  {
    name: "ROUGHHOUSE",
    title: "MUSICIAN, RECORDING ARTIST & PRODUCER",
    quote: "“...this **amazing software** has taken my workflow to new heights… given me back hours of creative work time.”",
    image: "/images/creatives_gallery/rough.png"
  },
  {
    name: "SANTELLA AUSTIN",
    title: "SONGWRITER, PRODUCER & VOCAL COACH",
    quote: "“...a godsend. It allows me to **be more organized** than I have ever been before, which in turn allows me to get way more done.”",
    image: "/images/creatives_gallery/santella.png"
  }
];

const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  const formatQuote = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <span key={i} className="text-google-white font-bold">{part}</span> : part
    );
  };

  return (
    <div className="w-full h-[340px] bg-[#111111]/80 backdrop-blur-sm p-8 md:p-10 rounded-sm relative overflow-hidden flex flex-col justify-between border border-white/5 transition-all duration-500 hover:bg-[#181818] hover:border-white/10 group shadow-2xl">
      {/* Quote Block */}
      <div className="text-google-grey text-base md:text-lg leading-relaxed font-medium w-full whitespace-normal relative z-10">
        {formatQuote(artist.quote)}
      </div>

      {/* Signature Block - Now Left-Aligned for maximum text width */}
      <div className="flex items-center gap-6 mt-auto w-full relative z-10">
        <div className="relative w-16 h-16 flex-shrink-0">
          <div className="absolute inset-0 rounded-full border border-white/10 overflow-hidden shadow-2xl group-hover:border-white/30 transition-colors duration-500">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h4 className="text-google-white font-bold text-sm md:text-base tracking-wider uppercase truncate">
            {artist.name}
          </h4>
          <p className="text-google-grey text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase leading-tight whitespace-normal">
            {artist.title}
          </p>
        </div>
      </div>
    </div>
  );
};

const ArtistGallery: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const marqueeList = [...artists, ...artists];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(trackRef.current, { xPercent: 0 });

      gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 60, // Calibrated for wider cards
        ease: "none",
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="artist-testimonials" 
      className="relative w-full bg-[#030303] pt-12 pb-24 overflow-hidden border-t border-white/5"
    >
      {/* Background blobs and grid excluded for brevity, keep your existing ones */}
      
      <div className="px-10 mb-20 text-center relative z-10">
        <span className="text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
          TRUSTED BY PROFESSIONALS
        </span>
      </div>

      <div ref={marqueeRef} className="relative w-full z-10 overflow-hidden">
        {/* Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none"></div>

        {/* Updated card widths here (w-500px) */}
        <div ref={trackRef} className="flex whitespace-nowrap w-fit will-change-transform">
          {marqueeList.map((artist, idx) => (
            <div key={`${artist.name}-${idx}`} className="flex-shrink-0 mx-6 md:mx-10 w-[420px] md:w-[500px]">
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistGallery;