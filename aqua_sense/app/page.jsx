'use client'
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WavyDivider from '@/components/WavyDivider';
import HowItWorks from '@/components/HowItWorks';
import AIShowcase from '@/components/AIShowcase';
import TechnologyStack from '@/components/TechnologyStack';
import ImpactSection from '@/components/ImpactSection';
import Gallery from '@/components/Gallery';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <Hero />
      
      <WavyDivider className="transform rotate-180" color="white" />
      
      <Features />
      
      <WavyDivider color="shakespeare-50" />
      
      <HowItWorks />
      
      <WavyDivider className="transform rotate-180" color="shakespeare-900" />
      
      <AIShowcase />
      
      <WavyDivider color="shakespeare-50" />
      
      <TechnologyStack />
      
      <WavyDivider className="transform rotate-180" color="shakespeare-100" />
      
      <ImpactSection />
      
      <WavyDivider color="shakespeare-50" />
      
      <Gallery />
      
      <WavyDivider className="transform rotate-180" color="shakespeare-600" />
      
      <CallToAction />
      
      <Footer />
    </main>
  );
}
