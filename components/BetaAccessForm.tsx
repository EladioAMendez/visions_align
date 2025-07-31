import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BetaAccessFormProps {
  onSubmit?: (email: string, additionalInfo: string) => void;
}

export default function BetaAccessForm({ onSubmit }: BetaAccessFormProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [email, setEmail] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/beta-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          additionalInfo,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setIsSubmitted(true);
      if (onSubmit) {
        onSubmit(email, additionalInfo);
      }
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly at beta-access@visionsalign.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-slate-800/60 border border-brand-sea-green/50 rounded-2xl p-8">
          <div className="w-16 h-16 bg-brand-sea-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-brand-sea-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">Request Submitted Successfully</h3>
          <p className="text-slate-300 mb-6">
            Thank you for your interest in VisionsAlign! We'll review your request and send you early access details within 48 hours.
          </p>
          <p className="text-sm text-slate-400">
            Questions? Email us directly at{' '}
            <a href="mailto:beta-access@visionsalign.com" className="text-brand-sea-green hover:underline">
              beta-access@visionsalign.com
            </a>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Work Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sea-green focus:border-transparent"
              placeholder="maya.chen@company.com"
            />
          </div>

          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-300 mb-2">
              Tell us about your role and biggest stakeholder challenge (optional)
            </label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sea-green focus:border-transparent resize-none"
              placeholder="e.g., Senior Product Manager struggling with executive presence in VP meetings..."
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="w-full bg-brand-sea-green text-slate-900 font-semibold py-3 rounded-lg hover:bg-brand-sea-green/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Request...
              </span>
            ) : (
              'Request Beta Access'
            )}
          </button>

          <p className="text-xs text-slate-400 text-center">
            By submitting, you agree to receive updates about VisionsAlign. We respect your privacy and won't spam you.
          </p>
        </form>
      </div>
    </motion.div>
  );
}
