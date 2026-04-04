import React from 'react';

const MaxIntroSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0a0a0a] pt-16 pb-16 px-8 flex flex-col items-center border-t border-white/5">

      <div className="text-center max-w-5xl">
        <span className="text-sm tracking-[0.4em] font-medium text-google-grey uppercase mb-4 block">
          PLUGIN LAUNCHER MAX
        </span>

        <h2 className="text-4xl md:text-6xl font-bold text-google-white mb-4">
          Your Custom Console.
        </h2>

        <p className="text-google-grey text-lg md:text-xl max-w-2xl mx-auto">
          Engineered for massive third-party libraries and relentless deadlines.
        </p>
      </div>

    </section>
  );
};

export default MaxIntroSection;