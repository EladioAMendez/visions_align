import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AccessRestricted() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="min-h-screen bg-slate-900 flex items-center justify-center px-4"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Dashboard Access Restricted
          </h1>
          
          <p className="text-slate-300 mb-6 text-lg">
            We're currently in limited beta mode. Dashboard access is restricted to approved beta testers and administrators.
          </p>
          
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 mb-6">
            <p className="text-slate-300 text-sm">
              <strong className="text-white">Want early access?</strong> Request beta access below to join our exclusive cohort of ambitious professionals.
            </p>
          </div>
          
          <div className="space-y-4">
            <a
              href="/#beta-access"
              className="inline-block w-full bg-brand-sea-green text-slate-900 font-semibold py-3 px-6 rounded-lg hover:bg-brand-sea-green/90 transition-colors duration-300"
            >
              Request Beta Access
            </a>
            
            <a
              href="/"
              className="inline-block w-full bg-slate-700 text-slate-300 font-semibold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors duration-300"
            >
              Back to Home
            </a>
          </div>
          
          <p className="text-xs text-slate-400 mt-6">
            Questions? Email us at{' '}
            <a href="mailto:beta-access@visionsalign.com" className="text-brand-sea-green hover:underline">
              beta-access@visionsalign.com
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
