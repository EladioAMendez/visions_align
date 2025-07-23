"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Highlight, Accent } from '../ui/TextHighlight';
import AlignPulse from '../animations/alignPulse';
import InsightFadeIn from '../animations/insightFadeIn';

export default function HeroSection() {
  // Animation state for leadership visualization journey
  const [journeyStage, setJourneyStage] = useState(0); // 0: initial, 1: analyzing, 2: insights
  const [interactionCount, setInteractionCount] = useState(0);
  const prefersReducedMotion = useReducedMotion(); // For accessibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  
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
            Unlock Your <Accent>Executive Influence.</Accent>
            <br />
            Master <Accent>Every Meeting.</Accent>
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
              Transform anxiety into strategic advantage.
            </motion.span> 
            <Accent> VisionsAlign</Accent> decodes leadership styles and crafts personalized playbooks, so you walk into every VP conversation with calm confidence and a clear path to promotion.
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
              <AlignPulse intensity={1.05} duration={2} continuous={true}>
                <Link 
                  href="/signup" 
                  className="btn-primary relative z-10 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-success text-white font-medium shadow-md"
                  onClick={(e) => {
                    e.preventDefault(); 
                    setShowConfirmation(true);
                    setTimeout(() => setShowConfirmation(false), 3000);
                  }}
                >
                  <span>Get Your Free Playbook Today!</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </AlignPulse>
              
              {/* Confirmation text that appears on click */}
              <AnimatePresence>
                {showConfirmation && (
                  <InsightFadeIn delay={0.1} duration={0.5}>
                    <motion.p 
                      className="text-sm text-accent mt-2"
                      exit={{ opacity: 0 }}
                    >
                      No credit card required. Start your journey to influence now!
                    </motion.p>
                  </InsightFadeIn>
                )}
              </AnimatePresence>
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
                      <span>VA</span>
                    </div>
                    <div>
                      <p className="font-medium text-primary text-sm">VisionsAlign</p>
                      <p className="text-success text-xs flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-success rounded-full"></span>
                        Online • Ready to analyze
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
                        {/* VisionsAlign message - Leadership analysis */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            VA
                          </div>
                          <div>
                            <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                              <div className="mb-1">
                                <span className="text-primary font-medium text-xs">Leadership Meeting Prep</span>
                                <span className="text-secondary text-[10px] ml-1">• VP Analysis</span>
                              </div>
                              <p className="text-primary text-sm">Analyzing VP Sarah's <span className="text-accent font-medium">communication preferences</span> and leadership style...</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-2">10:42 AM</span>
                          </div>
                        </motion.div>

                        {/* VisionsAlign message - Leadership style options */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%] pl-8"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          <div className="bg-white rounded-xl p-3 shadow-sm w-full">
                            <div className="space-y-2">
                              {[
                                "Visual communicator - responds to diagrams and charts",
                                "Direct communication style - values brevity",
                                "Data-driven decision maker - prioritizes metrics",
                                "Values preparation and structured agendas"
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
                        {/* VisionsAlign's question (kept from previous stage) */}
                        <div className="flex items-start gap-2 max-w-[85%]">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            VA
                          </div>
                          <div>
                            <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                              <div className="mb-1">
                                <span className="text-primary font-medium text-xs">Leadership Meeting Prep</span>
                                <span className="text-secondary text-[10px] ml-1">• VP Analysis</span>
                              </div>
                              <p className="text-primary text-sm">Analyzing VP Sarah's <span className="text-accent font-medium">communication preferences</span> and leadership style...</p>
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
                              <p>I have a meeting with her tomorrow morning</p>
                            </div>
                            <div className="flex justify-end">
                              <span className="text-xs text-gray-400 mr-2">10:43 AM</span>
                            </div>
                          </div>
                        </motion.div>

                        {/* VisionsAlign thinking */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            VA
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

                        {/* VisionsAlign answer */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-accent to-success flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                            VA
                          </div>
                          <div>
                            <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                              <p className="text-primary text-sm">
                                <span className="inline-block mb-2 text-success font-medium">Analysis complete.</span> Here's your personalized <span className="bg-success/20 px-1 rounded">meeting playbook</span> for VP Sarah.
                              </p>
                            </div>
                            <span className="text-xs text-gray-400 ml-2">10:44 AM</span>
                          </div>
                        </motion.div>

                        {/* VisionsAlign explanation */}
                        <motion.div 
                          className="flex items-start gap-2 max-w-[85%] pl-8"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <div className="bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm">
                            <p className="text-primary text-sm">
                              <strong>Meeting Strategy:</strong> Prepare a 5-min Miro board visual to present your key points. Lead with metrics and ROI. Use direct, concise language. Send a structured agenda 24 hours before meeting to build credibility and rapport.
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
                      Enter executive's LinkedIn profile...
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
