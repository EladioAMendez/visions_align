"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Highlight, Accent } from '../ui/TextHighlight';

// Benefit Card Component
const BenefitCard = ({ title, description, icon, index }) => {
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
        {/* Animated icon */}
        <motion.div 
          className="text-accent mb-6 text-4xl bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center"
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-xl font-medium text-primary mb-4">{title}</h3>
        <div className="text-secondary leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      
      {/* Bottom accent line that grows on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-success"
        initial={{ width: '30%' }}
        whileHover={{ width: '100%' }}
      />
    </motion.div>
  );
};

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Break Through the Study Wall",
      description: "No more vague explanations. Sage delivers instant, personalized answers that <em>click</em>. We'll guide you, step-by-step, until you truly understand.",
      icon: "🧠",
    },
    {
      title: "Reclaim Your Time & Sanity",
      description: "Juggling life is hard. Sage fits into <em>your</em> schedule, turning wasted moments into powerful study sessions. Five minutes waiting for coffee? That's a productive learning session. No guilt. Just progress.",
      icon: "⏱️",
    },
    {
      title: "End the Isolation, Find Your Confidence",
      description: "Studying alone is lonely. Sage is your infinitely patient, judgment-free study partner, available 24/7. Ask anything, anytime. Transform that imposter syndrome into unshakeable self-belief.",
      icon: "🤝",
    },
    {
      title: "Pass with Peace of Mind",
      description: "Stop dreading exam day. Our adaptive system targets <em>your</em> weak spots, ensuring you walk into the testing center feeling prepared, capable, and deserving of success.",
      icon: "🎯",
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
            Finally, <Highlight>Understanding</Highlight> Clicks.
          </h2>
          
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Experience the difference when learning is <Accent>personalized</Accent>, <Accent>accessible</Accent>, and <span className="italic">actually makes sense</span>.
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
            Join thousands of aspiring teachers who've found confidence with <Accent>TeachingDream</Accent>
          </p>
          <motion.a 
            href="#pricing"
            className="inline-flex items-center justify-center bg-gradient-to-r from-accent to-success text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Free Trial
            <span className="ml-2">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
