import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BetaAccessForm from '../BetaAccessForm';

export default function BetaAccessSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: "target",
      title: "The Insight Panel",
      description: "6 AI expert personas analyze your stakeholder's psychology and communication style"
    },
    {
      icon: "brain",
      title: "Executive Resonance",
      description: "Data-driven playbooks that turn high-stakes meetings into career acceleration opportunities"
    },
    {
      icon: "chart",
      title: "Strategic Preparation",
      description: "Transform from reactive meeting participant to confident conversation director"
    },
    {
      icon: "trending",
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
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-sea-green/20 flex items-center justify-center">
                {feature.icon === 'target' && (
                  <svg className="w-6 h-6 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  </svg>
                )}
                {feature.icon === 'brain' && (
                  <svg className="w-6 h-6 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )}
                {feature.icon === 'chart' && (
                  <svg className="w-6 h-6 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
                {feature.icon === 'trending' && (
                  <svg className="w-6 h-6 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
              </div>
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
