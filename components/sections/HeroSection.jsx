"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Highlight, Accent } from '../ui/TextHighlight';

export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 px-card-outer bg-background relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-success/10 blur-3xl"></div>
      
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
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
            <Highlight>Don't let one exam stand between you and your dream.</Highlight> Sage, your AI study partner who dissolves anxiety, clarifies concepts, and builds your confidence. Get certified. <Accent>Your dream classroom awaits.</Accent>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link 
                href="#trial"
                className="inline-block bg-accent text-white px-6 py-3 rounded-md font-medium text-lg shadow-md hover:bg-accent/90 transition-all"
              >
                Start Your Free 7-Day Trial (No Credit Card Required)
              </Link>
            </motion.div>
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
            <div className="aspect-[4/3] bg-white rounded-card shadow-xl overflow-hidden border-4 border-white relative">
              {/* Modern gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-success/40"></div>
              
              {/* Simulated laptop/device screen with Jessica */}
              <div className="absolute inset-6 rounded-lg bg-white/80 backdrop-blur-sm shadow-inner overflow-hidden">
                {/* Teacher student avatar placeholder */}
                <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-r from-accent to-success/80 flex items-center justify-center">
                  <span className="text-white text-2xl">JM</span>
                </div>
                
                {/* Grid of study topics */}
                <div className="absolute top-4 right-4 bottom-4 left-24 grid grid-cols-2 gap-2 p-2">
                  <motion.div 
                    className="bg-accent/10 rounded-lg p-2 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-primary text-sm">Pedagogy</span>
                  </motion.div>
                  <motion.div 
                    className="bg-success/10 rounded-lg p-2 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="text-primary text-sm">Classroom Management</span>
                  </motion.div>
                  <motion.div 
                    className="bg-primary/10 rounded-lg p-2 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <span className="text-primary text-sm">Assessment</span>
                  </motion.div>
                  <motion.div 
                    className="bg-secondary/10 rounded-lg p-2 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <span className="text-primary text-sm">FTCE Content</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Interactive elements */}
              <motion.div 
                className="absolute bottom-6 left-6 px-3 py-1.5 bg-success text-white rounded-full text-xs font-medium"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              >
                95% Ready for Exam
              </motion.div>
            </div>
            
            {/* AI Interface Overlay */}
            <motion.div 
              className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-5 rounded-card shadow-xl max-w-[80%] border-2 border-accent/20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                boxShadow: ['0 4px 10px -1px rgba(0, 0, 0, 0.1)', '0 10px 20px -3px rgba(78, 205, 196, 0.4)', '0 4px 10px -1px rgba(0, 0, 0, 0.1)']
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
              }}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient rounded-full flex items-center justify-center text-white font-medium text-lg shadow-inner">
                    S
                  </div>
                  <motion.div 
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <div className="bg-accent/10 p-2 rounded-card">
                    <p className="text-primary text-sm">Let me break down the <Accent>conceptual framework</Accent> for you...</p>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  >
                    <div className="h-2 w-full bg-gradient opacity-40 rounded-full"></div>
                  </motion.div>
                  <div className="flex space-x-2">
                    <motion.div 
                      className="h-2 w-16 bg-success/30 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.5 }}
                    />
                    <motion.div 
                      className="h-2 w-24 bg-success/30 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.7 }}
                    />
                    <motion.div 
                      className="h-2 w-12 bg-success/30 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.9 }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
