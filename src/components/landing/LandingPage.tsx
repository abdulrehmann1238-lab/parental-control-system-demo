import React from 'react';
import { LandingNav } from './LandingNav';
import { HeroSection } from './HeroSection';
import { TrustSection } from './TrustSection';
import { FeaturesSection } from './FeaturesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CompatibilitySection } from './CompatibilitySection';
import { DashboardPreviewSection } from './DashboardPreviewSection';
import { FAQSection } from './FAQSection';
import { FooterSection } from './FooterSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-800 flex flex-col">
      <LandingNav />
      <main className="flex-1">
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CompatibilitySection />
        <DashboardPreviewSection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  );
};
