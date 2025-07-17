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

// Section Components
import HeroSection from './sections/HeroSection';
import BenefitsSection from './sections/BenefitsSection';

// Performance Components
import { useTheme } from './ui/ThemeContext';
import DeferredLoad from './ui/DeferredLoad';

// Dynamically import heavier components
const TestimonialsSection = dynamic(() => import('./sections/TestimonialsSection'), {
  loading: () => <div className="h-80 w-full bg-base-200 animate-pulse rounded-lg"></div>,
  ssr: true
});

const ProductShowcaseSection = dynamic(() => import('./sections/ProductShowcaseSection'), {
  loading: () => <div className="h-96 w-full bg-base-200 animate-pulse rounded-lg"></div>,
  ssr: true
});

const FaqSection = dynamic(() => import('./sections/FaqSection'), {
  ssr: true
});

const CtaSection = dynamic(() => import('./sections/CtaSection'), {
  ssr: true
});

const PricingSection = dynamic(() => import('./sections/PricingSection'), {
  ssr: true
});

// Import performance monitoring but only client-side
const PerformanceMonitor = dynamic(
  () => import('./ui/PerformanceMonitor'),
  { ssr: false }
);

// Import development tools only in dev mode
const DevChecklist = dynamic(
  () => import('./ui/DevChecklist'),
  { ssr: false }
);

const AccessibilityChecker = dynamic(
  () => import('./ui/AccessibilityChecker'),
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
      
      {/* Development tools */}
      <DevChecklist />
      <AccessibilityChecker />
      
      {/* Fixed Navbar */}
      <Navbar />

      <main>
        {/* Priority sections that load immediately */}
        <section data-section="hero">
          <HeroSection />
        </section>
        
        <section data-section="benefits">
          <BenefitsSection />
        </section>
        
        {/* Deferred loading for sections below the fold */}
        <DeferredLoad>
          <section data-section="cta">
            <CtaSection />
          </section>
        </DeferredLoad>
        
        <Suspense fallback={<div className="h-80 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="testimonials">
            <TestimonialsSection />
          </section>
        </Suspense>
        
        {/* Heavier components with their own loading states */}
        <Suspense fallback={<div className="h-96 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="product-showcase">
            <ProductShowcaseSection />
          </section>
        </Suspense>
        
        <Suspense fallback={<div className="h-64 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="faq">
            <FaqSection />
          </section>
        </Suspense>
        
        <Suspense fallback={<div className="h-72 w-full bg-base-200 animate-pulse rounded-lg"></div>}>
          <section data-section="pricing">
            <PricingSection />
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
