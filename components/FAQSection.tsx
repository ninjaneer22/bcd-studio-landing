import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "Performance & Requirements: Why Logic 11.1?",
    answer: (
      <span>
        Plugin Launcher is built on the advanced search architecture introduced in Logic 11.1, allowing it to identify and load plugins with significantly higher speed and reliability. Because it triggers macOS-level commands via the native accessibility layer rather than processing audio, it has <span className="text-google-white font-bold">zero impact on session latency</span> and negligible CPU overhead.
      </span>
    )
  },
  {
    question: "Standard vs. MAX: 3rd-Party & Customization",
    answer: (
      <span>
        Standard is a “Player” experience, pre-mapped for every native Logic Pro effect and instrument for a plug-and-play workflow. <span className="text-google-white font-bold">MAX unlocks “Creator Mode,”</span> granting full support for your entire 3rd-party Audio Unit (AU) collection. While Standard uses a fixed, curated project, MAX allows total customization of layouts, button naming, and macro assignments.
      </span>
    )
  },
  {
    question: "Future-Proofing: Logic Pro Updates",
    answer: "We provide regular updates to ensure seamless compatibility with new Logic Pro native tools as Apple releases them. By utilizing Logic's 11.1 deep system improvements, the launcher is more resilient to DAW updates than traditional UI scripting, keeping your workflow stable through Apple’s release cycles."
  },
  {
    question: "MAX Tier: Multi-Action Macros & Triple Layouts",
    answer: (
      <span>
        <span className="text-google-white font-bold">MAX is engineered for elite scoring and post-production.</span> It supports Triple Layouts—allowing you to switch between three custom 280-button projects instantly—and Multi-Action Triggers. A single button in MAX can execute up to four unique actions, such as loading a specific plugin and recalling a custom window configuration simultaneously.
      </span>
    )
  },
  {
    question: "Licensing & Growth: Flexi-Deck & Upgrades",
    answer: (
      <span>
        Every download includes the high-performance Flexi-Deck engine; <span className="text-google-white font-bold">no separate purchase is required.</span> It runs as a lightweight host for your project. You can start with a 30-day evaluation of either version to experience the speed increase firsthand. If your studio grows, you can upgrade from Standard to MAX at any time by simply paying the difference.
      </span>
    )
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