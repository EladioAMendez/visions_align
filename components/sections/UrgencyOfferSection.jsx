"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AlignPulse from '../animations/alignPulse';
import DataShimmer from '../animations/dataShimmer';

const UrgencyOfferSection = () => {
  // Calculate time remaining for the offer
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 59, seconds: 59 });
  const [pulseTrigger, setPulseTrigger] = useState(false);
  const [claimHovered, setClaimHovered] = useState(false);
  
  // Ref for intersection observer
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  // Effect for countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        // Update seconds, minutes, hours
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        
        // Reset to 48 hours if we hit zero
        if (newHours < 0) {
          newHours = 47;
          newMinutes = 59;
          newSeconds = 59;
        }
        
        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
      
      // Trigger pulse animation every minute
      if (timeLeft.seconds === 0) {
        setPulseTrigger(prev => !prev);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time values for display
  const formatTimeUnit = (value) => value.toString().padStart(2, '0');
  
  return (
    <section 
      id="urgency-offer" 
      ref={ref}
      className="urgency-offer-section bg-gradient-to-r from-accent/5 to-success/10 py-12 md:py-20 border-t border-b border-accent/10"
    >
      <motion.div 
        className="container mx-auto px-4 max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-accent/10 overflow-hidden relative"
          initial={{ scale: 0.95 }}
          animate={inView ? { scale: 1 } : { scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-success/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary">
              Your Next <span className="text-accent">Career Breakthrough</span> Awaits
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8">
              <DataShimmer>
                <div className="stat-item text-center">
                  <p className="text-4xl font-bold text-accent mb-1">87%</p>
                  <p className="text-sm text-secondary">Increased Meeting Confidence</p>
                </div>
              </DataShimmer>
              
              <div className="hidden md:block h-12 w-px bg-accent/10"></div>
              
              <DataShimmer>
                <div className="stat-item text-center">
                  <p className="text-4xl font-bold text-success mb-1">3.5×</p>
                  <p className="text-sm text-secondary">Faster Promotion Rate</p>
                </div>
              </DataShimmer>
              
              <div className="hidden md:block h-12 w-px bg-accent/10"></div>
              
              <DataShimmer>
                <div className="stat-item text-center">
                  <p className="text-4xl font-bold text-primary mb-1">6hrs</p>
                  <p className="text-sm text-secondary">Weekly Prep Time Saved</p>
                </div>
              </DataShimmer>
            </div>
            
            <div className="offer-block bg-gradient-to-r from-accent/10 to-success/10 p-6 rounded-xl mb-8 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-accent/20 to-success/20 opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  ease: 'easeInOut' 
                }}
              />
              
              <p className="text-center text-lg md:text-xl font-medium mb-3">
                <span className="text-primary">Unlock Premium Access for </span>
                <span className="text-accent font-bold">40% OFF</span>
              </p>
              
              <p className="text-center max-w-3xl mx-auto mb-6 text-secondary">
                Create unlimited leadership playbooks and meeting strategies with our <span className="font-medium">Executive Advantage</span> plan. This special offer ends soon!                
              </p>
              
              <div className="countdown-timer flex items-center justify-center gap-3 text-center mb-6">
                <motion.div 
                  className="time-block bg-white p-3 rounded-lg shadow-sm border border-accent/10 w-20"
                  animate={pulseTrigger ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-3xl font-bold text-primary">{formatTimeUnit(timeLeft.hours)}</p>
                  <p className="text-xs text-secondary">Hours</p>
                </motion.div>
                
                <span className="text-2xl font-bold text-accent">:</span>
                
                <motion.div 
                  className="time-block bg-white p-3 rounded-lg shadow-sm border border-accent/10 w-20"
                  animate={pulseTrigger ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-3xl font-bold text-primary">{formatTimeUnit(timeLeft.minutes)}</p>
                  <p className="text-xs text-secondary">Minutes</p>
                </motion.div>
                
                <span className="text-2xl font-bold text-accent">:</span>
                
                <motion.div 
                  className="time-block bg-white p-3 rounded-lg shadow-sm border border-accent/10 w-20"
                  animate={pulseTrigger ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-3xl font-bold text-primary">{formatTimeUnit(timeLeft.seconds)}</p>
                  <p className="text-xs text-secondary">Seconds</p>
                </motion.div>
              </div>
            </div>
            
            <div className="text-center">
              <AnimatePresence>
                {claimHovered && (
                  <motion.p
                    className="text-sm text-success mb-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    No credit card needed to get started!
                  </motion.p>
                )}
              </AnimatePresence>
              
              <AlignPulse>
                <motion.button 
                  className="bg-gradient-to-r from-success to-accent px-8 py-4 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setClaimHovered(true)}
                  onHoverEnd={() => setClaimHovered(false)}
                >
                  Claim Your 40% Discount Now
                </motion.button>
              </AlignPulse>
              
              <p className="mt-6 text-secondary text-sm">
                Join <span className="font-medium">12,458</span> professionals already advancing their careers with VisionsAlign
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UrgencyOfferSection;
