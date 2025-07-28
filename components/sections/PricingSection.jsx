import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { signIn } from 'next-auth/react';
import apiClient from '@/libs/api';
import config from '@/config';

const CheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const PricingPlanCard = ({ plan, index, isLoading, onCheckout }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isPopular = plan.isFeatured || plan.popular;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className={`relative flex flex-col h-full p-8 rounded-2xl border ${isPopular ? 'bg-slate-800 border-brand-sea-green/50' : 'bg-slate-800/60 border-slate-700'}`}
    >
      {isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-success text-slate-900 text-sm font-semibold py-1 px-3 rounded-full shadow-md">
            Most Popular
          </div>
        </div>
      )}
      <div className="flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-semibold text-white text-center mb-2">{plan.name}</h3>
          <p className="text-slate-400 text-center mb-10 min-h-[4rem]">{plan.description}</p>
          <div className="text-center mb-8">
            <span className="text-5xl font-bold text-white">{plan.price}</span>
            {plan.period && <span className="text-slate-400">/{plan.period}</span>}
          </div>
          <ul className="space-y-4 mb-10">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <CheckIcon className="w-6 h-6 text-brand-sea-green mr-3 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => onCheckout(plan)}
          disabled={isLoading}
          className={`w-full text-center font-semibold py-3 rounded-lg transition-colors duration-300 cursor-pointer ${isPopular ? 'bg-success text-slate-900 hover:bg-success/90' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'} disabled:opacity-50`}>
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            plan.cta || `Choose ${plan.name}`
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default function PricingSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (plan) => {
    if (plan.name === "Starter" || plan.price === "Free") {
      // For free plan, just sign in
      signIn('google');
      return;
    }

    setIsLoading(true);

    try {
      const { url } = await apiClient.post('/stripe/create-checkout', {
        priceId: plan.priceId,
        successUrl: window.location.origin + '/dashboard?success=true',
        cancelUrl: window.location.href,
        mode: 'subscription',
      });

      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create pricing plans with free starter + config plans
  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: null,
      description: "Get a free playbook to win your next critical meeting.",
      features: [
        "1 Playbook Credit",
        "Analysis of 1 Stakeholder",
        "Access to The Insight Panel",
        "Standard Email Support",
      ],
      cta: "Generate Your First Playbook",
      popular: false,
    },
    ...config.stripe.plans.map(plan => ({
      ...plan,
      price: `$${plan.price}`,
      period: "month",
      features: plan.features.map(f => f.name || f),
      popular: plan.isFeatured,
    }))
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-card-outer">
        <motion.div
          ref={ref}
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-slate-300">
            Choose the plan that aligns with your professional goals. Start free, no credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch pt-8">
          {pricingPlans.map((plan, index) => (
            <PricingPlanCard 
              key={index} 
              plan={plan} 
              index={index} 
              isLoading={isLoading}
              onCheckout={handleCheckout}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
