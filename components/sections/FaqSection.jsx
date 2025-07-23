"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Highlight, Accent } from '../ui/TextHighlight';
import InsightFadeIn from '../animations/insightFadeIn';

const FaqItem = ({ question, answer, isOpen, onClick, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className="mb-6 border border-accent/10 rounded-xl overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ boxShadow: isOpen ? "" : "0 8px 30px rgba(0, 0, 0, 0.05)" }}
    >
      <button 
        className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-accent/5 transition-colors"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-primary text-lg">{question}</span>
        <motion.div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${isOpen ? 'bg-accent text-white' : 'bg-accent/10 text-accent'}`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <InsightFadeIn>
              <div className="p-6 pt-2 bg-white border-t border-accent/5">
                <p className="text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }}></p>
              </div>
            </InsightFadeIn>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: "How does VisionsAlign analyze leadership styles?",
      answer: "VisionsAlign uses advanced AI to analyze <strong>digital footprints</strong> such as LinkedIn profiles, company communications, and publicly available data to identify communication preferences, decision-making patterns, and motivational triggers. Our proprietary algorithm has been trained on thousands of successful executive interactions to provide you with actionable insights into any stakeholder's leadership style."
    },
    {
      question: "Do I need to connect my LinkedIn or social accounts?",
      answer: "No connection is required for basic analysis. Simply paste a LinkedIn URL or enter a leader's name and company to generate insights. For <em>enhanced accuracy</em>, you can optionally connect your own LinkedIn to help our AI understand context and relationship dynamics, but this is completely optional and secure."
    },
    {
      question: "How long before an important meeting should I use VisionsAlign?",
      answer: "For optimal results, we recommend running an analysis at least 24 hours before your meeting. This gives you time to review your personalized playbook, internalize the strategies, and practice key talking points. However, our <strong>Quick Prep</strong> feature can generate essential insights in under 5 minutes for those last-minute meetings."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. VisionsAlign adheres to enterprise-grade security standards with SOC 2 compliance. We never store the leadership analyses we generate—once delivered to you, they're automatically purged from our systems. Your career advancement strategies stay completely confidential, and we never share or sell user data to third parties."
    },
    {
      question: "What's included in the free version vs. premium?",
      answer: "The free version gives you three leadership analyses per month with basic playbook generation. Premium unlocks <em>unlimited</em> analyses, deeper psychological insights, custom meeting agendas, follow-up recommendations, and our exclusive 'Promotion Accelerator' toolkit that tracks relationship development over time with key stakeholders in your career path."
    },
    {
      question: "Can VisionsAlign help with team dynamics, not just individual meetings?",
      answer: "Yes! Our <strong>Team Harmony</strong> feature (available in Premium) analyzes multiple stakeholders simultaneously to help you navigate complex group dynamics. Perfect for team presentations, panel interviews, or executive committee meetings where understanding the interplay of different leadership styles is crucial."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-accent/5">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
            <Highlight>Questions</Highlight> About Advancing Your <Highlight>Career</Highlight>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Everything you need to know about transforming executive interactions with <Accent>VisionsAlign</Accent> and accelerating your professional growth.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
