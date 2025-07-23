"use client";

import React, { useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Layout Components
import Navbar from './layout/Navbar';
// Dynamic import for Footer section
const FooterSection = dynamic(() => import('./sections/FooterSection'), {
  ssr: true
});

// Section Components - Import high-priority sections directly
import HeroSection from './sections/HeroSection';
import BenefitsSection from './sections/BenefitsSection';

// Performance Components
import { useTheme } from './ui/ThemeContext';
import DeferredLoad from './ui/DeferredLoad';

// Dynamically import the UrgencyOfferSection
const UrgencyOfferSection = dynamic(() => import('./sections/UrgencyOfferSection'), {
  ssr: true
});

// Dynamically import heavier components
const TestimonialsSection = dynamic(() => import('./sections/TestimonialsSection'), {
  loading: () => <div className="h-80 w-full bg-base-200 animate-pulse rounded-lg"></div>,
  ssr: true
});

const ProductShowcaseSection = dynamic(() => import('./sections/ProductShowcaseSection'), {
  loading: () => <div className="h-96 w-full bg-base-200 animate-pulse rounded-lg"></div>,
  ssr: true
});

const CtaSection = dynamic(() => import('./sections/CtaSection'), {
  ssr: true
});

const FaqSection = dynamic(() => import('./sections/FaqSection'), {
  ssr: true
});

const SignupSection = dynamic(() => import('./sections/SignupSection'), {
  ssr: true
});

// Import performance monitoring but only client-side
const PerformanceMonitor = dynamic(
  () => import('./ui/PerformanceMonitor'),
  { ssr: false }
);

// Custom hooks
import useResponsive from '@/hooks/useResponsive';

// Font
import '@fontsource/inter/400.css'; // Regular
import '@fontsource/inter/500.css'; // Medium

export default function LandingPage() {
  // Use our theme context instead of direct DOM manipulation
  const { theme } = useTheme();
  
  // Get responsive information
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Performance monitoring */}
      <PerformanceMonitor />
      
      {/* Fixed Navbar */}
      <Navbar />

      <main>
        {/* Priority sections that load immediately */}
        <section data-section="hero">
          <HeroSection />
        </section>
        
        {/* Section 2: Value Proposition / Benefits Snapshot */}
        <section data-section="benefits">
          <BenefitsSection />
        </section>
        
        {/* Section 6: Urgency or Special Offer (Optional) */}
        <Suspense fallback={<div className="h-24 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="urgency-offer">
            <UrgencyOfferSection />
          </section>
        </Suspense>
        
        {/* Section 3: Social Proof */}
        <Suspense fallback={<div className="h-80 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="testimonials">
            <TestimonialsSection />
          </section>
        </Suspense>
        
        {/* Section 4: Product Showcase */}
        <Suspense fallback={<div className="h-96 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="product-showcase">
            <ProductShowcaseSection />
          </section>
        </Suspense>
        
        {/* Section 5: Mid-page CTA */}
        <DeferredLoad>
          <section data-section="mid-cta">
            <CtaSection />
          </section>
        </DeferredLoad>
        
        {/* Section 7: Frequently Asked Questions */}
        <Suspense fallback={<div className="h-64 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="faq">
            <FaqSection />
          </section>
        </Suspense>
        
        {/* Section 8: Final CTA / Sign-Up Section */}
        <Suspense fallback={<div className="h-72 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="final-cta">
            <SignupSection />
          </section>
        </Suspense>
      </main>

      {/* Footer */}
      <FooterSection />
      
      {/* Display device size indicator during development */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed bottom-2 right-2 bg-accent text-white px-2 py-1 rounded-md text-xs z-50">
          {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
        </div>
      )}
    </div>
  );
}
