import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BetaAccessForm from '../BetaAccessForm';

export default function BetaAccessSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: "🎯",
      title: "The Insight Panel",
      description: "6 AI expert personas analyze your stakeholder's psychology and communication style"
    },
    {
      icon: "🧠",
      title: "Executive Resonance",
      description: "Data-driven playbooks that turn high-stakes meetings into career acceleration opportunities"
    },
    {
      icon: "📊",
      title: "Strategic Preparation",
      description: "Transform from reactive meeting participant to confident conversation director"
    },
    {
      icon: "🚀",
      title: "Career Momentum",
      description: "Build predictable influence with the leaders who control your promotion timeline"
    }
  ];

  return (
    <section id="beta-access" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-card-outer">
        <motion.div
          ref={ref}
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center bg-brand-sea-green/10 border border-brand-sea-green/30 rounded-full px-4 py-2 mb-6">
            <span className="text-brand-sea-green text-sm font-semibold">Limited Beta Access</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            The Blueprint to Direct the Conversation
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Join ambitious professionals who are transforming anxiety-inducing executive meetings into 
            opportunities for <strong className="text-brand-sea-green">relational mastery and career acceleration</strong>.
          </p>

          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 mb-12">
            <p className="text-slate-300 text-lg mb-4">
              <strong className="text-white">"I have exactly 27 minutes with the VP next Tuesday.</strong> 
              If I don't make it count, I'll be stuck at this level for another year."
            </p>
            <p className="text-slate-400 text-sm">
              — Maya Chen, Senior Product Manager (and thousands like her)
            </p>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Why Beta Testers Choose VisionsAlign
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Immediate ROI</h4>
              <p className="text-slate-400 text-sm">See results in your very first high-stakes meeting</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Data-Driven</h4>
              <p className="text-slate-400 text-sm">Backed by psychological research, not generic advice</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Exclusive Access</h4>
              <p className="text-slate-400 text-sm">Shape the product before public launch</p>
            </div>
          </div>
        </motion.div>

        {/* Beta Access Form */}
        <BetaAccessForm />

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            <strong className="text-slate-300">Limited spots available.</strong> We're accepting a small cohort of 
            ambitious professionals who understand that relationships compound faster than code. 
            Beta access includes direct input on product development and preferential pricing at launch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
