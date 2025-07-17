"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Highlight, Accent } from '../ui/TextHighlight';

export default function PricingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hoveredPlan, setHoveredPlan] = React.useState(null);
  const [isAnnualBilling, setIsAnnualBilling] = React.useState(false);

  const pricingPlans = [
    {
      name: "Text Plan",
      price: "$10",
      period: "monthly",
      description: "Chat with Sage anytime, anywhere. Perfect for on-the-go studying.",
      features: [
        "Unlimited text conversations",
        "24/7 availability",
        "Personalized explanations",
        "Concept mastery tracking",
        "Practice question generation",
      ],
      cta: "Start Your Free 7-Day Trial",
      popular: false,
      ctaColor: "bg-accent hover:bg-accent/90",
    },
    {
      name: "Voice + Text Plan",
      price: "$19",
      period: "monthly",
      description: "Our most popular plan. Full access to Sage in text and voice modes.",
      features: [
        "Everything in Text Plan",
        "Voice conversations",
        "Audio explanations",
        "Screen sharing capabilities",
        "Priority support",
      ],
      cta: "Start Your Free 7-Day Trial",
      popular: true,
      ctaColor: "bg-success hover:bg-success/90",
    }
  ];

  // Calculate the discounted annual prices (2 months free)
  const getPrice = (plan, index) => {
    const monthlyPrice = parseInt(plan.price.replace('$', ''));
    if (isAnnualBilling) {
      const annualPrice = (monthlyPrice * 10).toFixed(0); // 2 months free
      return `$${annualPrice}`;
    }
    return plan.price;
  };

  const getPeriod = () => isAnnualBilling ? 'yearly' : 'monthly';
  
  // Staggered animation for features
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section id="pricing" className="py-16 px-card-outer bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-success/5 blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-2">
            <div className="h-1.5 w-16 bg-gradient-to-r from-accent to-success mx-auto mb-6 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
              Affordable Plans for <Highlight>Every</Highlight> Student
            </h2>
          </div>
          <motion.p 
            className="text-lg text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            No confusing tiers or hidden fees. Just simple pricing that works for your budget.
            All plans include our <Accent>7-day free trial</Accent> with no credit card required.
          </motion.p>
        </motion.div>
        
        {/* Billing toggle */}
        <motion.div 
          className="flex justify-center items-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <span className={`mr-3 ${isAnnualBilling ? 'text-secondary' : 'text-primary font-medium'}`}>Monthly</span>
          <div 
            className={`w-14 h-7 rounded-full p-1 cursor-pointer ${isAnnualBilling ? 'bg-success' : 'bg-accent'}`}
            onClick={() => setIsAnnualBilling(!isAnnualBilling)}
          >
            <motion.div 
              className="w-5 h-5 bg-white rounded-full shadow-md"
              initial={false}
              animate={{
                x: isAnnualBilling ? 28 : 0
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
          <span className={`ml-3 ${isAnnualBilling ? 'text-primary font-medium' : 'text-secondary'}`}>Annual</span>
          
          {isAnnualBilling && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-3 bg-success/10 text-success text-xs px-2 py-1 rounded-full"
            >
              Save 16%
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-card-inner max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-card p-8 rounded-card ${plan.popular ? 'shadow-xl' : 'shadow-md'} border ${
                plan.popular ? 'border-success' : 'border-border'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-grid-pattern"></div>
              </div>
              
              {/* Popular badge with animation */}
              {plan.popular && (
                <motion.div 
                  className="absolute -top-3 -right-3 bg-success text-white text-center text-sm py-1 px-4 rounded-full shadow-md"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.9, 1, 0.9], rotate: [0, 2, 0, -2, 0] }}
                  transition={{ scale: { repeat: Infinity, duration: 4 }, rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                >
                  <span className="flex items-center">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="inline-block mr-1"
                    >
                      ★
                    </motion.span>
                    Most Popular
                  </span>
                </motion.div>
              )}
              
              {/* Plan name with underline animation on hover */}
              <h3 className="text-2xl font-medium text-primary mb-2 relative inline-block">
                {plan.name}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredPlan === index ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </h3>
              
              {/* Animated price transition */}
              <motion.div 
                className="flex items-baseline mb-4"
                key={`${index}-${isAnnualBilling}`} // Force re-render on billing toggle
                initial={{ opacity: 0.5, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl font-bold text-accent">{getPrice(plan, index)}</span>
                <span className="text-secondary ml-1">/{getPeriod()}</span>
              </motion.div>
              
              <p className="text-secondary mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center"
                    custom={i}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={featureVariants}
                  >
                    <motion.div
                      className={`mr-2 text-success flex items-center justify-center h-5 w-5 rounded-full ${hoveredPlan === index ? 'bg-success/10' : ''}`}
                      whileHover={{ scale: 1.2, backgroundColor: 'rgba(107, 207, 127, 0.2)' }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: i }}
                      >
                        ✓
                      </motion.span>
                    </motion.div>
                    <span className={hoveredPlan === index && i === 0 ? 'text-primary font-medium' : ''}>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="#trial"
                  className={`inline-block w-full text-center text-white px-6 py-3 rounded-md font-medium ${plan.ctaColor} transition-all relative overflow-hidden group`}
                >
                  <motion.span 
                    className="absolute inset-0 bg-white/20 transform -translate-x-full"
                    animate={hoveredPlan === index ? { translateX: '200%' } : { translateX: '-100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  {plan.cta}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center mt-16 text-secondary max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* FAQ quick links */}
          <p>All plans can be canceled anytime. No hidden fees.</p>
          
          <motion.div 
            className="mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-accent/10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ y: 20 }}
            animate={inView ? { y: 0 } : { y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="text-left">
              <h4 className="text-primary font-medium">Still have questions?</h4>
              <p className="text-sm text-secondary">Check our detailed FAQ section</p>
            </div>
            
            <motion.div
              className="bg-accent/20 hover:bg-accent/30 text-accent px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#faq" className="flex items-center">
                View FAQ
                <motion.span 
                  className="ml-1"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center">
              <motion.span
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                className="mr-1"
              >
                🎓
              </motion.span>
              Student discounts available with valid ID
            </span>
            
            <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm flex items-center">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mr-1"
              >
                💯
              </motion.span>
              100% satisfaction guarantee
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
