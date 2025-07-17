"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Highlight, Accent } from '../ui/TextHighlight';

export default function HeroSection() {
  // Animation state for FTCE Question Journey
  const [journeyStage, setJourneyStage] = useState(0); // 0: question, 1: thinking, 2: answer+explanation
  const [interactionCount, setInteractionCount] = useState(0);
  const prefersReducedMotion = useReducedMotion(); // For accessibility
  
  // Auto advance the journey stages for demo purposes
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const timer = setTimeout(() => {
      if (journeyStage < 2) {
        setJourneyStage(prev => prev + 1);
      } else if (interactionCount < 1) {
        // Reset journey and increment interaction count after a delay
        setTimeout(() => {
          setJourneyStage(0);
          setInteractionCount(prev => prev + 1);
        }, 4000);
      }
    }, journeyStage === 0 ? 4000 : 3000); // Longer delay on first stage
    
    return () => clearTimeout(timer);
  }, [journeyStage, interactionCount, prefersReducedMotion]);

  // Function to handle "Ask Why" button click
  const handleAskWhy = () => {
    if (journeyStage === 2) {
      setJourneyStage(0);
      setInteractionCount(prev => prev + 1);
    } else {
      setJourneyStage(2); // Skip to explanation
    }
  };
  
  return (
    <section className="pt-28 pb-20 px-card-outer bg-background relative overflow-hidden">
      {/* Background gradient elements */}
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-success/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.7, 0.5, 0.7]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Content */}
        <div className="lg:w-1/2 space-y-6">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-primary leading-tight"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            Study <Accent>Smarter.</Accent>
            <br />
            Teach <Accent>Sooner.</Accent>
          </motion.h1>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-accent to-success rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <motion.p 
            className="text-lg md:text-xl text-secondary leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              className="bg-gradient-to-r from-accent/20 to-accent/5 px-1 rounded"
              initial={{ backgroundSize: "0% 100%", backgroundPosition: "0% 100%", backgroundRepeat: "no-repeat" }}
              animate={{ backgroundSize: "100% 100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Don't let one exam stand between you and your dream.
            </motion.span> 
            Sage, your AI study partner, dissolves anxiety, clarifies concepts, and builds your confidence. Get certified. <Accent>Your dream classroom awaits.</Accent>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4"
          >
            <motion.div
              className="relative inline-block overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/signup" className="btn-primary relative z-10 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-success text-white font-medium shadow-md">
                <span>Try Free for 7 Days</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
              />
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
              
              {/* Chat message interface */}
              <div className="absolute inset-6 rounded-lg bg-gray-100 shadow-inner overflow-hidden flex flex-col">
                {/* Chat header */}
                <div className="bg-white p-3 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white">
                      <span>S</span>
                    </div>
                    <div>
                      <p className="font-medium text-primary text-sm">Sage</p>
                      <p className="text-success text-xs flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-success rounded-full"></span>
                        Online • Ready to help
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {/* Messages container */}
                <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-3">
                  <AnimatePresence mode="wait">
                    {journeyStage === 0 && (
                      <motion.div 
                        key="question"
                        className="flex flex-col space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                      >
                        {/* Sage message - FTCE question */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            S
                          </div>
                          <div>
                            <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                              <div className="mb-1">
                                <span className="text-primary font-medium text-xs">FTCE Practice Question</span>
                                <span className="text-secondary text-[10px] ml-1">• Grammar</span>
                              </div>
                              <p className="text-primary text-sm">Which sentence contains a <span className="text-accent font-medium">subject-verb agreement</span> error?</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-2">10:42 AM</span>
                          </div>
                        </motion.div>

                        {/* Sage message - Answer options */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%] pl-8"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          <div className="bg-white rounded-xl p-3 shadow-sm w-full">
                            <div className="space-y-2">
                              {[
                                "A) The committee of doctors agrees on the diagnosis.",
                                "B) Each of the students have completed their assignments.",
                                "C) Neither the teacher nor the students were prepared for the drill.",
                                "D) The data shows an increase in literacy rates."
                              ].map((option, i) => (
                                <motion.div 
                                  key={i}
                                  className={`p-2 border rounded-lg text-sm flex items-center ${i === 2 ? 'border-success/30 bg-success/5' : 'border-gray-200'}`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.6 + (i * 0.2) }}
                                  whileHover={{ backgroundColor: i === 2 ? 'rgba(139, 224, 219, 0.2)' : 'rgba(243, 244, 246, 0.5)' }}
                                >
                                  <span className="text-sm">{option}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          <span className="invisible text-xs text-gray-400">10:42 AM</span>
                        </motion.div>
                      </motion.div>
                    )}
                    
                    {journeyStage === 1 && (
                      <motion.div 
                        key="thinking"
                        className="flex flex-col space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                      >
                        {/* Sage's question (kept from previous stage) */}
                        <div className="flex items-start gap-2 max-w-[85%]">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            S
                          </div>
                          <div>
                            <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                              <div className="mb-1">
                                <span className="text-primary font-medium text-xs">FTCE Practice Question</span>
                                <span className="text-secondary text-[10px] ml-1">• Grammar</span>
                              </div>
                              <p className="text-primary text-sm">Which sentence contains a <span className="text-accent font-medium">subject-verb agreement</span> error?</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-2">10:42 AM</span>
                          </div>
                        </div>

                        {/* User response */}
                        <motion.div 
                          className="flex justify-end"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                        >
                          <div>
                            <div className="bg-accent text-white rounded-tl-xl rounded-tr-sm rounded-br-sm rounded-bl-xl p-3 shadow-sm">
                              <p>I think it's C</p>
                            </div>
                            <div className="flex justify-end">
                              <span className="text-xs text-gray-400 mr-2">10:43 AM</span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Sage thinking */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            S
                          </div>
                          <div className="bg-white rounded-xl px-3 py-2 w-16">
                            <div className="flex space-x-1">
                              <motion.div 
                                className="h-2 w-2 rounded-full bg-gray-300"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
                              />
                              <motion.div 
                                className="h-2 w-2 rounded-full bg-gray-300"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4, delay: 0.4 }}
                              />
                              <motion.div 
                                className="h-2 w-2 rounded-full bg-gray-300"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4, delay: 0.8 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                    
                    {journeyStage === 2 && (
                      <motion.div 
                        key="explanation"
                        className="flex flex-col space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Sage's question (kept from previous stages) */}
                        <div className="flex items-start gap-2 max-w-[85%]">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            S
                          </div>
                          <div>
                            <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                              <div className="mb-1">
                                <span className="text-primary font-medium text-xs">FTCE Practice Question</span>
                                <span className="text-secondary text-[10px] ml-1">• Grammar</span>
                              </div>
                              <p className="text-primary text-sm">Which sentence contains a <span className="text-accent font-medium">subject-verb agreement</span> error?</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-2">10:42 AM</span>
                          </div>
                        </div>

                        {/* User response (kept from previous stage) */}
                        <div className="flex justify-end">
                          <div>
                            <div className="bg-accent text-white rounded-tl-xl rounded-tr-sm rounded-br-sm rounded-bl-xl p-3 shadow-sm">
                              <p>I think it's C</p>
                            </div>
                            <div className="flex justify-end">
                              <span className="text-xs text-gray-400 mr-2">10:43 AM</span>
                            </div>
                          </div>
                        </div>

                        {/* Sage answer */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            S
                          </div>
                          <div>
                            <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                              <p className="text-primary text-sm">
                                <span className="inline-block mb-2 text-error font-medium">Not quite.</span> The correct answer is B: "Each of the students <span className="bg-error/20 px-1 rounded">have</span> completed their assignments."
                              </p>
                            </div>
                            <span className="text-xs text-gray-400 ml-2">10:44 AM</span>
                          </div>
                        </motion.div>

                        {/* Sage explanation */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%] pl-8"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                            <p className="text-primary text-sm">
                              "Each" is a singular subject that requires the singular verb form "has" instead of the plural "have" - don't worry, this is a common error that many people miss!
                            </p>
                          </div>
                          <span className="invisible text-xs text-gray-400">10:44 AM</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Chat input area */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400">
                      Type your question here...
                    </div>
                    <motion.div 
                      className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Chat interface container end */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
