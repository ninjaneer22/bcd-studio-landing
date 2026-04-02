import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "Why is Logic Pro 11.1 required?",
    answer: "Logic Pro 11.1 introduced an enhanced search architecture. Plugin Launcher utilizes these deep system improvements to identify and load plugins with significantly higher speed and reliability."
  },
  {
    question: "Does the Standard version support third-party plugins?",
    answer: (
      <span>
        Standard is optimized for Logic Pro’s native effects and instruments. For third-party Audio Units (AU) and expansive collections, you will need Plugin Launcher MAX.<br />
        <span className="italic">Note: VST formats are not supported in Logic Pro, and therefore not supported by the launcher.</span>
      </span>
    )
  },
  {
    question: "What kind of updates can I expect?",
    answer: "We provide regular updates to ensure seamless compatibility with new Logic Pro native plugins and instruments as Apple releases them."
  },
  {
    question: "Can I customize the Plugin Launcher Standard version?",
    answer: "Standard comes preloaded with Logic’s native categories for a plug-and-play experience. Full layout customization and button renaming are MAX exclusives."
  },
  {
    question: "Can I upgrade to MAX later?",
    answer: "Absolutely. If your studio grows, your license can too. You can upgrade from Standard to MAX at any time by simply paying the difference."
  },
  {
    question: "Do I need to purchase Flexi-Deck separately?",
    answer: "No. Plugin Launcher is powered by the Flexi-Deck engine, which is included with every download. It runs as a lightweight host for your project."
  },
  {
    question: "What is the difference between Player mode and Creator mode?",
    answer: "Standard operates in Player Mode for a streamlined, focused workflow. MAX unlocks Creator Mode, giving you total control over layouts and multi-action triggers."
  },
  {
    question: "Is there a demo I can try before purchase?",
    answer: "Yes. Both versions include a 30-day demo period with limited features so you can experience the speed increase in your own sessions."
  }
];

const AccordionItem: React.FC<{ item: FAQItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 text-left group focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-google-white' : 'text-google-grey group-hover:text-google-white'}`}>
          Q: {item.question}
        </span>
        <div className={`relative flex-shrink-0 ml-4 w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <div className="absolute inset-0 m-auto w-full h-[1px] bg-zinc-600 group-hover:bg-white transition-colors"></div>
          <div className="absolute inset-0 m-auto w-[1px] h-full bg-zinc-600 group-hover:bg-white transition-colors"></div>
        </div>
      </button>

      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-google-grey text-lg md:text-xl leading-relaxed pl-6 border-l border-zinc-800">
            A: {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq-panel" ref={sectionRef} className="w-full bg-[#0a0a0a] py-24 px-8 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="faq-reveal text-sm tracking-[0.4em] font-medium text-google-grey uppercase">
            Questions & Answers
          </span>
          <h2 className="faq-reveal text-3xl md:text-5xl font-bold text-google-white tracking-tight">
            The finer details.
          </h2>
        </div>

        <div className="faq-reveal space-y-0 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              item={faq}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        <div className="mt-24 text-center faq-reveal">
          <p className="text-google-grey text-base">
            Still looking for something? <a href="mailto:tony@bcd.center" className="text-cyan-500 hover:text-cyan-400 transition-colors underline underline-offset-4"><br />Contact our support team.</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;