"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Benefit Card Component
const BenefitCard = ({ title, description, icon, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-card p-6 rounded-card shadow-md border border-border"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="text-accent mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-medium text-primary mb-3">{title}</h3>
      <p className="text-secondary">{description}</p>
    </motion.div>
  );
};

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Break Through the Study Wall",
      description: "No more vague explanations. Sage delivers instant, personalized answers that click. We'll guide you, step-by-step, until you truly understand.",
      icon: "🧠",
    },
    {
      title: "Reclaim Your Time & Sanity",
      description: "Juggling life is hard. Sage fits into your schedule, turning wasted moments into powerful study sessions. Five minutes waiting for coffee? That's a productive learning session. No guilt. Just progress.",
      icon: "⏱️",
    },
    {
      title: "End the Isolation, Find Your Confidence",
      description: "Studying alone is lonely. Sage is your infinitely patient, judgment-free study partner, available 24/7. Ask anything, anytime. Transform that imposter syndrome into unshakeable self-belief.",
      icon: "🤝",
    },
    {
      title: "Pass with Peace of Mind",
      description: "Stop dreading exam day. Our adaptive system targets your weak spots, ensuring you walk into the testing center feeling prepared, capable, and deserving of success.",
      icon: "🎯",
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="benefits" className="py-16 px-card-outer bg-white">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">Finally, Understanding Clicks.</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Experience the difference when learning is personalized, accessible, and actually makes sense.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-inner">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
