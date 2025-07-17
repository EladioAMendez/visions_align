"use client";

import React, { useState, useEffect } from 'react';

/**
 * Development-only checklist component to verify all parts of the landing page
 * This will only render in development mode and helps ensure all sections are working properly
 */
export default function DevChecklist() {
  const [isOpen, setIsOpen] = useState(false);
  const [checks, setChecks] = useState({
    navbar: { status: 'pending', message: 'Checking navigation...' },
    hero: { status: 'pending', message: 'Checking hero section...' },
    benefits: { status: 'pending', message: 'Checking benefits section...' },
    testimonials: { status: 'pending', message: 'Checking testimonials...' },
    productShowcase: { status: 'pending', message: 'Checking product showcase...' },
    faq: { status: 'pending', message: 'Checking FAQ section...' },
    cta: { status: 'pending', message: 'Checking CTA sections...' },
    signup: { status: 'pending', message: 'Checking signup section...' },
    footer: { status: 'pending', message: 'Checking footer...' },
    animations: { status: 'pending', message: 'Checking animations...' },
    responsiveness: { status: 'pending', message: 'Checking responsiveness...' }
  });
  
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') return;
    
    // Check if elements are present in the DOM
    const runChecks = () => {
      // Check navbar
      const navbar = document.querySelector('nav');
      setChecks(prev => ({
        ...prev,
        navbar: { 
          status: navbar ? 'success' : 'error',
          message: navbar ? 'Navbar rendered successfully' : 'Navbar not found'
        }
      }));
      
      // Check hero section
      const hero = document.querySelector('[data-section="hero"]');
      setChecks(prev => ({
        ...prev,
        hero: { 
          status: hero ? 'success' : 'error',
          message: hero ? 'Hero section rendered' : 'Hero section not found'
        }
      }));
      
      // Check benefits section
      const benefits = document.querySelector('[data-section="benefits"]');
      setChecks(prev => ({
        ...prev,
        benefits: { 
          status: benefits ? 'success' : 'error',
          message: benefits ? 'Benefits section rendered' : 'Benefits section not found'
        }
      }));
      
      // Check testimonials section
      const testimonials = document.querySelector('[data-section="testimonials"]');
      setChecks(prev => ({
        ...prev,
        testimonials: { 
          status: testimonials ? 'success' : 'warning',
          message: testimonials ? 'Testimonials section rendered' : 'Testimonials section not found (may be lazy-loaded)'
        }
      }));
      
      // Check product showcase section
      const productShowcase = document.querySelector('[data-section="product-showcase"]');
      setChecks(prev => ({
        ...prev,
        productShowcase: { 
          status: productShowcase ? 'success' : 'warning',
          message: productShowcase ? 'Product showcase rendered' : 'Product showcase not found (may be lazy-loaded)'
        }
      }));
      
      // Check FAQ section
      const faq = document.querySelector('[data-section="faq"]');
      setChecks(prev => ({
        ...prev,
        faq: { 
          status: faq ? 'success' : 'warning',
          message: faq ? 'FAQ section rendered' : 'FAQ section not found (may be lazy-loaded)'
        }
      }));
      
      // Check CTA sections
      const cta = document.querySelector('[data-section="cta"]');
      setChecks(prev => ({
        ...prev,
        cta: { 
          status: cta ? 'success' : 'warning',
          message: cta ? 'CTA section rendered' : 'CTA section not found (may be lazy-loaded)'
        }
      }));
      
      // Check signup section
      const signup = document.querySelector('[data-section="signup"]');
      setChecks(prev => ({
        ...prev,
        signup: { 
          status: signup ? 'success' : 'warning',
          message: signup ? 'Signup section rendered' : 'Signup section not found (may be lazy-loaded)'
        }
      }));
      
      // Check footer
      const footer = document.querySelector('footer');
      setChecks(prev => ({
        ...prev,
        footer: { 
          status: footer ? 'success' : 'error',
          message: footer ? 'Footer rendered' : 'Footer not found'
        }
      }));
      
      // Check animations
      const animations = document.querySelectorAll('[data-framer-animation]');
      setChecks(prev => ({
        ...prev,
        animations: { 
          status: animations.length > 0 ? 'success' : 'warning',
          message: animations.length > 0 ? `${animations.length} animations detected` : 'No animations detected'
        }
      }));
      
      // Check responsiveness (approximate)
      const viewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const isResponsive = document.querySelector('meta[name="viewport"]') !== null;
      setChecks(prev => ({
        ...prev,
        responsiveness: { 
          status: isResponsive ? 'success' : 'error',
          message: isResponsive ? `Viewport meta tag found (current width: ${viewport}px)` : 'Viewport meta tag missing'
        }
      }));
    };
    
    // Run checks after a short delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      runChecks();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button 
        className="bg-accent text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Checklist' : 'Show Checklist'}
      </button>
      
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-xl mt-2 max-w-md max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-bold mb-2">Landing Page Checklist</h3>
          <ul className="space-y-2">
            {Object.entries(checks).map(([key, { status, message }]) => (
              <li key={key} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${
                  status === 'success' ? 'bg-success' :
                  status === 'error' ? 'bg-error' :
                  status === 'warning' ? 'bg-warning' : 'bg-gray-300 animate-pulse'
                }`}></span>
                <span className="text-sm">
                  <strong className="capitalize">{key}:</strong> {message}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-gray-500">
            This checklist is only visible in development mode
          </div>
        </div>
      )}
    </div>
  );
}
