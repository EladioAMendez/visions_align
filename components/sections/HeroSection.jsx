"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-card-outer bg-background">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Content */}
        <div className="lg:w-1/2 space-y-6">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-primary leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Stop Hitting the Study Wall. Start Teaching.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-secondary leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            That knot of anxiety? The endless rereading? Sage, your AI study partner from TeachingDream.com, 
            dissolves it all by familiarizing you with question types and walking you through content conversationally. 
            Get certified. Confidently. Your dream classroom awaits.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="#trial"
              className="inline-block bg-accent text-white px-6 py-3 rounded-card font-medium text-lg hover:bg-opacity-90 transition-all animate-pulse"
            >
              Start Your Free 7-Day Trial (No Credit Card Required)
            </Link>
          </motion.div>
        </div>
        
        {/* Hero Image */}
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <div className="aspect-[4/3] bg-white rounded-card shadow-lg overflow-hidden">
              {/* This would be replaced with an actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-success/30 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center text-lg text-secondary">
                [Image: Jessica Miller interacting with Sage AI interface]
              </div>
            </div>
            
            {/* AI Interface Overlay */}
            <motion.div 
              className="absolute bottom-8 right-8 bg-white p-4 rounded-card shadow-lg max-w-[80%] border border-border"
              animate={{ 
                boxShadow: ['0 4px 6px -1px rgba(0, 0, 0, 0.1)', '0 10px 15px -3px rgba(78, 205, 196, 0.3)', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white">
                  S
                </div>
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <p className="text-primary">Let me break that down for you step by step...</p>
                  <div className="h-2 w-24 bg-success/30 rounded"></div>
                  <div className="h-2 w-36 bg-success/30 rounded"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
