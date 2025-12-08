"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnovationsHero from '@/components/innovations/InnovationsHero';
import MicrobialSection from '@/components/innovations/MicrobialSection';
import CarbonSection from '@/components/innovations/CarbonSection';
import LeakDetectionSection from '@/components/innovations/LeakDetectionSection';
import ChemicalOptimSection from '@/components/innovations/ChemicalOptimSection';
import FloatingWaterPath from '@/components/innovations/FloatingWaterPath';

export default function InnovationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-shakespeare-50 via-shakespeare-100 to-shakespeare-200 relative overflow-hidden">
      {/* Animated water particles background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-aqua-teal rounded-full animate-float opacity-40"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-royal-blue rounded-full animate-float-3d opacity-30" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-shakespeare-400 rounded-full animate-bubble opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-1/3 w-3 h-3 bg-aqua-teal rounded-full animate-float opacity-30" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-royal-blue rounded-full animate-bubble opacity-40" style={{animationDelay: '4s'}}></div>
      </div>

      <Header />
      
      <InnovationsHero />
      
      {/* Floating water path connector */}
      <FloatingWaterPath />
      
      <MicrobialSection />
      
      <CarbonSection />
      
      <LeakDetectionSection />
      
      <ChemicalOptimSection />
      
      <Footer />
    </main>
  );
}
