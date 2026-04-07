import React, { useEffect } from 'react';
// The new routing tools you just installed
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// All your original components
import Hero from './components/Hero';
import FeaturePanel from './components/FeaturePanel';
import SequenceCanvas from './components/SequenceCanvas';
import StandardSection from './components/StandardSection';
import VideoOnlySection from './components/VideoOnlySection';
import MaxIntroSection from './components/MaxIntroSection';
import MaxSection from './components/MaxSection';
import MaxSequenceCanvas from './components/MaxSequenceCanvas';
import MaxButton from './components/MaxButton';
import ARSection from './components/ARSection';
import ComparisonTable from './components/ComparisonTable';
import ArtistGallery from './components/ArtistGallery';
import WhyInvest from './components/WhyInvest';
import PricingSection from './components/PricingSection';
import TechnicalDetails from './components/TechnicalDetails';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

// The new Success page
import Success from './components/Success'; 
// The hidden PA promo page
import PaPromo from './components/pa-promo';
// The new hidden promo pages
import StudioOnePromo from './components/StudioOnePromo'; 
import UADPromo from './components/UadPromo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <Router>
      <div className="relative bg-[#0a0a0a] min-h-screen">
        <Routes>
          
          {/* 1. THE MAIN LANDING PAGE ROUTE */}
          {/* This is what people see at www.bcdstudio.pro */}
          <Route path="/" element={
            <>
              <Hero />
              <FeaturePanel />
              <SequenceCanvas />
              <StandardSection />
              <VideoOnlySection />
<MaxIntroSection />       
              <MaxSection /> 
              <MaxSequenceCanvas />
              <MaxButton />
<ARSection />
              <ComparisonTable />
              <ArtistGallery />
              <WhyInvest />
              <PricingSection />
              <TechnicalDetails />
              <FAQSection />
            </>
          } />
          
          {/* 2. THE SUCCESS PAGE ROUTE */}
          {/* This is what people see at www.bcdstudio.pro/success */}
          <Route path="/success" element={<Success />} />

          {/* 3. THE HIDDEN PA PROMO ROUTE */}
          {/* Accessible only via the direct link */}
          <Route path="/pa-promo" element={<PaPromo />} />

          {/* 4. THE HIDDEN STUDIO ONE PROMO ROUTE */}
          <Route path="/StudioOnePromo" element={<StudioOnePromo />} />

          {/* 5. THE HIDDEN UAD PROMO ROUTE */}
          <Route path="/UadPromo" element={<UADPromo />} />

        </Routes>
        
        {/* Footer stays at the bottom of both pages */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;