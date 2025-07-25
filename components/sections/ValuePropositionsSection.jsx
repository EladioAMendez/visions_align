"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ValuePropositionCard = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="flex flex-col items-center text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 h-full"
    >
      <div className="p-4 bg-slate-700 rounded-full mb-6 border border-slate-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function ValuePropositionsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const propositions = [
    {
      icon: <TargetIcon className="w-8 h-8 text-brand-sea-green" />,
      title: "Decode Stakeholder Psychology",
            description: <><span className="text-slate-200">The Insight Panel</span> analyzes LinkedIn profiles and meeting context to reveal the hidden motivations, communication preferences, and unspoken needs of your audience.</>,
    },
    {
      icon: <ZapIcon className="w-8 h-8 text-brand-sea-green" />,
      title: "Eliminate Pre-Meeting Anxiety",
      description: "Walk into any high-stakes meeting with a clear, actionable playbook. Know exactly what to say, how to say it, and what to anticipate.",
    },
    {
      icon: <TrendingUpIcon className="w-8 h-8 text-brand-sea-green" />,
      title: "Build Career Momentum",
      description: "Consistently demonstrate executive presence, build stronger alliances, and get your best ideas championed. Turn every meeting into a career catalyst.",
    },
  ];

  return (
    <section id="value-propositions" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-card-outer">
        <motion.div
          ref={ref}
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            More Than a Tool—It's Your Insight Panel
          </h2>
          <p className="text-lg md:text-xl text-slate-300">
            VisionsAlign assembles a team of six expert AI personas to analyze your unique communication challenges and deliver a winning strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <ValuePropositionCard
              key={index}
              icon={prop.icon}
              title={prop.title}
              description={prop.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Icon components
const TargetIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m11.9-11.9l1.414-1.414M6.05 6.05l-1.414-1.414" />
  </svg>
);

const TrendingUpIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.182 3.182m3.182-3.182v4.5m-7.5-10.5H21a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H3a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 013.75 4.5h7.5z" />
  </svg>
);

const ZapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l-1.5 6h6l-1.5 6-6-3-6 3 1.5-6h-6l1.5-6h12z" />
  </svg>
);
