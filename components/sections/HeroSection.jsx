"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-slate-900 text-white overflow-hidden">
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
              Engineer Resonance. <br /> <span className="text-brand-sea-green">Win Executive Buy-In.</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              Stop navigating complex stakeholder dynamics alone. VisionsAlign is your AI co-pilot for engineering resonance, ensuring your best ideas get the executive buy-in they deserve.
            </motion.p>

            <motion.div 
              className="mt-8 flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            >
              <Link href="#pricing" className="btn btn-primary">
                Generate Your First Playbook
              </Link>
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
