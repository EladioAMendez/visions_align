"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Highlight, Accent } from '../ui/TextHighlight';
import DataShimmer from '../animations/dataShimmer';
import PathSlideUp from '../animations/pathSlideUp';
import AlignPulse from '../animations/alignPulse';
import ConnectExpand from '../animations/connectExpand';

// Benefit Card Component
const BenefitCard = ({ title, description, icon, index, animationComponent: AnimationComponent, highlightColor }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Create a unique gradient for each card
  const gradients = [
    'from-accent/10 to-success/5',
    'from-success/10 to-accent/5',
    'from-primary/10 to-accent/5',
    'from-accent/10 to-primary/5',
  ];
  
  // Get highlight color class based on prop
  const getHighlightClass = () => {
    switch (highlightColor) {
      case 'success':
        return 'text-success';
      case 'accent':
      default:
        return 'text-accent';
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-white p-6 rounded-card shadow-lg border border-border group transition-all`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Background gradient that reveals on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Card content */}
      <div className="relative z-10">
        {/* Animated icon with the specified animation component */}
        {AnimationComponent ? (
          <AnimationComponent className="mb-6">
            <div className="text-accent bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center">
              {icon}
            </div>
          </AnimationComponent>
        ) : (
          <motion.div 
            className="text-accent mb-6 bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        )}
        
        <h3 className={`text-xl font-medium ${getHighlightClass()} mb-4`}>{title}</h3>
        <div className="text-secondary leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      
      {/* Bottom accent line that grows on hover */}
      <motion.div 
        className={`absolute bottom-0 left-0 h-1 ${highlightColor === 'success' ? 'bg-gradient-to-r from-success to-accent' : 'bg-gradient-to-r from-accent to-success'}`}
        initial={{ width: '30%' }}
        whileHover={{ width: '100%' }}
      />
    </motion.div>
  );
};

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Decode Leadership Styles Instantly",
      description: "Uncover the communication preferences, values, and decision triggers of any stakeholder from their LinkedIn profile. <em>No more guesswork</em>.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>,
      animationComponent: DataShimmer,
      highlightColor: "accent"
    },
    {
      title: "Generate Bespoke Meeting Playbooks",
      description: "Walk into every conversation with a custom-tailored agenda, talking points, and rapport-building strategies. <em>Feel prepared, not panicked</em>.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>,
      animationComponent: PathSlideUp,
      highlightColor: "success"
    },
    {
      title: "Boost Your Confidence & Influence",
      description: "Transform pre-meeting anxiety into calm confidence. Build stronger relationships and <em>accelerate your career</em> with every interaction.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>,
      animationComponent: AlignPulse,
      highlightColor: "accent"
    },
    {
      title: "Save Hours of Prep Time",
      description: "Stop the late-night rehearsals and endless second-guessing. Get actionable insights in minutes, so you can <em>focus on what matters most</em>.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H7" />
            </svg>,
      animationComponent: ConnectExpand,
      highlightColor: "accent"
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="benefits" className="relative py-24 px-card-outer overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-success/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Enhanced section heading with highlight */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-6">
            Your <Highlight><strong>Strategic Advantage</strong></Highlight>, Delivered in Minutes.
          </h2>
          
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Transform executive interactions from <Accent>anxiety-inducing</Accent> to <Accent>career-accelerating</Accent> with <span className="italic">personalized leadership insights</span>.
          </p>
          
          {/* Decorative accent line */}
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-accent to-success mx-auto mt-8"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>
        
        {/* Call to action below benefits */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-primary mb-6 text-lg">
            Join ambitious professionals who are accelerating their careers with <Highlight><strong>VisionsAlign</strong></Highlight>
          </p>
          <AlignPulse>
            <motion.a 
              href="#cta"
              className="inline-flex items-center justify-center bg-gradient-to-r from-accent to-success text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Ready for Your Strategic Advantage? Get Started Free!
              <span className="ml-2">→</span>
            </motion.a>
          </AlignPulse>
        </motion.div>
      </div>
    </section>
  );
}
