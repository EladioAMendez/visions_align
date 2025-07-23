"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function SignupSection() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { width, height } = useWindowSize();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation - simple email check
    if (email && email.includes('@') && email.includes('.')) {
      setShowConfetti(true);
      setIsSuccess(true);
      
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  };

  return (
    <section id="signup" className="py-16 px-card-outer bg-white">
      <div className="container mx-auto">
        <motion.div 
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
            Your Leadership Journey Begins. Take the Next Step.
          </h2>
          <p className="text-lg text-secondary mb-8">
            You've built your expertise. Don't let misaligned leadership interactions derail your career trajectory. 
            With VisionsAlign, you'll gain the insights, the confidence, and the executive presence you deserve. 
            Stop second-guessing. Start advancing.
          </p>
          
          {/* Confetti effect when form is successfully submitted */}
          {showConfetti && (
            <Confetti
              width={width}
              height={height}
              numberOfPieces={500}
              recycle={false}
              colors={['#4ECDC4', '#6BCF7F', '#1E293B', '#64748B']}
            />
          )}
          
          {/* Sign-Up Form */}
          {!isSuccess ? (
            <form className="max-w-md mx-auto mb-8" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-card border border-border focus:border-accent focus:outline-none"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <motion.button
                  type="submit"
                  className="bg-accent text-white px-6 py-3 rounded-card font-medium text-lg hover:bg-opacity-90 transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>
              <p className="mt-2 text-sm text-secondary">
                No credit card required. Start your 14-day free trial today.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-success/10 rounded-card border border-success text-center"
            >
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="text-xl font-medium text-success mb-2">
                Welcome to VisionsAlign!
              </h3>
              <p className="text-secondary">
                Check your email to activate your 14-day free trial of VisionsAlign.
                Your journey to leadership excellence starts now!
              </p>
            </motion.div>
          )}
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 items-center text-secondary">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L12 14.814l-2.419 1.419A1 1 0 019 16V4a1 1 0 00-1-1H5a1 1 0 00-1 1v10.5a.5.5 0 01-1 0V4z" clipRule="evenodd" />
              </svg>
              <span>Trusted by 5,000+ Leaders</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <span>Cancel Anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
