"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import ButtonSignin from '../ButtonSignin';


const ResonanceVisualization = () => {
  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none">
      <div className="relative aspect-square flex items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        {/* Central Glow */}
        <div className="absolute w-2/3 h-2/3 bg-brand-sea-green/20 rounded-full blur-3xl"></div>

        {/* Resonating Circles */}
        <motion.div
          className="absolute w-full h-full border-2 border-brand-sea-green/30 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute w-2/3 h-2/3 border-2 border-brand-sea-green/50 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute w-1/2 h-1/2 border-2 border-brand-sea-green rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* Core Circle */}
        <div className="w-1/4 h-1/4 bg-slate-800 rounded-full border-2 border-brand-sea-green/50 flex items-center justify-center">
           <div className="w-1/2 h-1/2 bg-brand-sea-green rounded-full shadow-lg shadow-brand-sea-green/50"></div>
        </div>
      </div>
    </div>
  );
};

export default function HeroSection() {
  const searchParams = useSearchParams();
  const [showAccessNotice, setShowAccessNotice] = useState(false);

  useEffect(() => {
    if (searchParams.get('access') === 'restricted') {
      setShowAccessNotice(true);
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => setShowAccessNotice(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-slate-900 text-white overflow-hidden">
      {/* Access Restriction Notice */}
      {showAccessNotice && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <div className="bg-slate-800/95 border border-brand-sea-green/50 rounded-lg p-4 backdrop-blur-sm shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-brand-sea-green/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-slate-200">
                  <strong className="text-white">Dashboard access restricted.</strong> We're in limited beta mode. Request access below!
                </p>
              </div>
              <button
                onClick={() => setShowAccessNotice(false)}
                className="ml-3 flex-shrink-0 text-slate-400 hover:text-slate-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="container mx-auto px-card-outer relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              className="text-sm font-semibold tracking-widest text-brand-sea-green uppercase mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              VISIONSALIGN
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              The Blueprint to <br /> <span className="text-brand-sea-green">Direct the Conversation.</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              Turn your next high-stakes meeting into a career-defining win. Get the stakeholder insights and strategic playbook you need to walk into any executive conversation with calm confidence.
            </motion.p>

            <motion.div 
              className="mt-8 flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            >
              <ButtonSignin
                text="Generate Your First Playbook"
                textLoggedIn="Go to Dashboard"
                extraStyle="btn-primary"
              />
            </motion.div>
          </div>
          
          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          >
            <ResonanceVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
