"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Highlight, Accent } from '../ui/TextHighlight';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/80'}`}
    >
      <nav className="container mx-auto px-card-outer py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          <strong>VisionsAlign</strong>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#benefits" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
            Benefits
          </Link>
          <Link href="#showcase" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
            Demo
          </Link>
          <Link href="#testimonials" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
            Testimonials
          </Link>
          <Link href="#faq" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
            FAQ
          </Link>
          <Link href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
            Pricing
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="#trial" 
              className="bg-success text-slate-900 px-4 py-2 rounded-card font-medium hover:bg-success/90 transition-all"
            >
              Get Your Free Playbook
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-primary z-50"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 pt-20"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
          >
            <div className="flex flex-col items-center space-y-6 p-6">
              <Link 
                href="#benefits" 
                className="text-primary text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link 
                href="#showcase" 
                className="text-primary text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <Link 
                href="#testimonials" 
                className="text-primary text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                href="#faq" 
                className="text-primary text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="#pricing" 
                className="text-primary text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="#trial" 
                className="bg-success text-slate-900 px-6 py-3 rounded-card font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Your Free Playbook
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
