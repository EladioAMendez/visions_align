"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-card-outer py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-medium text-primary">
          TeachingDream.com
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-secondary hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#benefits" className="text-secondary hover:text-primary transition-colors">
            Benefits
          </Link>
          <Link href="#testimonials" className="text-secondary hover:text-primary transition-colors">
            Testimonials
          </Link>
          <Link href="#showcase" className="text-secondary hover:text-primary transition-colors">
            Demo
          </Link>
          <Link href="#faq" className="text-secondary hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link href="#pricing" className="text-secondary hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link 
            href="#trial" 
            className="bg-accent text-white px-4 py-2 rounded-card font-medium hover:bg-opacity-90 transition-all animate-pulse"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
