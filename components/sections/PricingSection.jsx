import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const CheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const PricingPlanCard = ({ plan, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isPopular = plan.popular;

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
          <p className="text-slate-400 text-center mb-6 h-12">{plan.description}</p>
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
        <Link href={plan.ctaLink} passHref>
          <div className={`w-full text-center font-semibold py-3 rounded-lg transition-colors duration-300 cursor-pointer ${isPopular ? 'bg-success text-slate-900 hover:bg-success/90' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
            {plan.cta}
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default function PricingSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: null,
      description: "For individuals ready to experience the power of a single, expertly-crafted playbook.",
      features: [
        "1 Playbook Credit",
        "Analysis of 1 Stakeholder",
        "Standard Email Support",
        "Access to Core Insights",
      ],
      cta: "Generate Your First Playbook",
      ctaLink: "/get-started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "month",
      description: "For professionals who regularly engage in high-stakes communication.",
      features: [
        "10 Playbook Credits per Month",
        "Analysis of up to 25 Stakeholders",
        "Priority Email & Chat Support",
        "Advanced Personality & Value Mapping",
        "Calendar Integration (Coming Soon)",
      ],
      cta: "Get Started with Pro",
      ctaLink: "/get-started?plan=pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: null,
      description: "For teams and organizations requiring scalable communication excellence.",
      features: [
        "Unlimited Playbook Credits",
        "Unlimited Stakeholder Analysis",
        "Dedicated Account Manager",
        "Team Management & Reporting",
        "API Access & Custom Integrations",
      ],
      cta: "Contact Sales",
      ctaLink: "/contact-sales",
      popular: false,
    },
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
            Choose the plan that aligns with your professional goals. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch pt-8">
          {pricingPlans.map((plan, index) => (
            <PricingPlanCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
