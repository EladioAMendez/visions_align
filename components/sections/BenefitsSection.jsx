"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StepCard = ({ title, description, icon, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-slate-800 p-8 rounded-xl border border-slate-700/80 transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-sea-green/10"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
    >
      <div className="mb-6 w-14 h-14 rounded-lg bg-slate-700 flex items-center justify-center border border-slate-600">
        <div className="text-brand-sea-green">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function BenefitsSection() {
  const steps = [
    {
      title: "1. Connect Data",
      description: "We securely analyze public data points and your communication style to build a comprehensive stakeholder profile.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    },
    {
      title: "2. Generate Insights",
      description: "Our AI identifies core motivations and communication preferences, generating a personalized insight report.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 9.75l1.25-2.188a2.25 2.25 0 00-2.188-2.188L15.063 4.5l-1.25 2.188a2.25 2.25 0 002.188 2.188l2.25.813-2.25.813a2.25 2.25 0 00-2.188 2.188l-1.25 2.188 1.25 2.188a2.25 2.25 0 002.188 2.188l2.25.813-2.25.813a2.25 2.25 0 00-2.188 2.188L15.063 20.5l1.25-2.188a2.25 2.25 0 002.188-2.188l2.25-.813-2.25-.813a2.25 2.25 0 00-2.188-2.188z" /></svg>,
    },
    {
      title: "3. Execute Strategy",
      description: "Receive a clear, actionable playbook with tailored talking points to ensure your message resonates and drives results.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="how-it-works" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-card-outer">
        <motion.div
          ref={ref}
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Your Path to Influence in 3 Simple Steps
          </h2>
          <p className="text-lg md:text-xl text-slate-300">
            We turn complex stakeholder data into your strategic advantage. Here's our proven process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
