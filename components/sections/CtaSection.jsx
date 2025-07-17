"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Highlight, Accent } from '../ui/TextHighlight';

export default function CtaSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="trial" className="py-16 px-card-outer bg-accent/10">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
            Ready to <Highlight>transform</Highlight> your study experience and step into your teaching career with <Highlight>confidence</Highlight>?
          </h2>
          <p className="text-lg text-secondary mb-8">
            Join thousands of aspiring educators finding clarity and success with <Accent>Sage</Accent>. 
            Our tiered plans fit your needs: <span className="font-medium">$10/month</span> for text access or <span className="font-medium">$19/month</span> for voice capabilities.
          </p>
          
          <motion.div
            className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <Link 
              href="#signup"
              className="inline-block bg-accent text-white px-6 py-3 rounded-card font-medium text-lg hover:bg-opacity-90 transition-all animate-pulse"
            >
              Start Your Free 7-Day Trial Today!
            </Link>
            <Link 
              href="#pricing"
              className="inline-block bg-white text-primary border border-border px-6 py-3 rounded-card font-medium text-lg hover:bg-background/80 transition-all"
            >
              View Pricing Plans
            </Link>
          </motion.div>
          
          {/* Special Offer Banner */}
          <motion.div
            className="mt-8 p-4 bg-white rounded-card border border-accent/30 inline-block"
            animate={{ boxShadow: ['0 0 0 rgba(78, 205, 196, 0)', '0 0 15px rgba(78, 205, 196, 0.3)', '0 0 0 rgba(78, 205, 196, 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-primary font-medium">
              <span className="text-accent">Limited Time:</span> Unlock an exclusive bonus study guide when you start your free trial today!
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Sticky CTA Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link 
          href="#trial"
          className="bg-accent text-white px-5 py-3 rounded-full shadow-lg font-medium flex items-center animate-pulse hover:bg-accent/90 transition-all"
        >
          <span>Start Free Trial</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
