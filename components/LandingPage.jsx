"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Layout Components
import Navbar from './layout/Navbar';
const FooterSection = dynamic(() => import('./sections/FooterSection'));

// Section Components - Import high-priority sections directly
import HeroSection from './sections/HeroSection';
import BenefitsSection from './sections/BenefitsSection';

// Dynamically import heavier components for performance
const ValuePropositionsSection = dynamic(() => import('./sections/ValuePropositionsSection'));
const TestimonialsSection = dynamic(() => import('./sections/TestimonialsSection'));
const PricingSection = dynamic(() => import('./sections/PricingSection'));
const FaqSection = dynamic(() => import('./sections/FaqSection'));

// Font
import '@fontsource/inter/400.css'; // Regular
import '@fontsource/inter/500.css'; // Medium
import '@fontsource/inter/700.css'; // Bold

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <BenefitsSection />
        <Suspense fallback={null}>
          <ValuePropositionsSection />
        </Suspense>
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={null}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={null}>
          <FaqSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>
    </div>
  );
}
