"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FaqItem = ({ question, answer, isOpen, onClick, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className="mb-4 border border-border rounded-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button 
        className="w-full text-left px-6 py-4 flex items-center justify-between bg-card hover:bg-background/50 transition-colors"
        onClick={onClick}
      >
        <span className="font-medium text-primary">{question}</span>
        <motion.span 
          className="text-accent"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.span>
      </button>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 bg-card">
          <p className="text-secondary">{answer}</p>
        </div>
      </motion.div>
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
      question: "Will I be charged after the free trial?",
      answer: "No. Your 7-day free trial gives you full access to Sage. Continue on our flexible monthly plan or choose not to subscribe – no automatic charges, no hidden fees. Your peace of mind is our priority."
    },
    {
      question: "Is Sage just another practice test?",
      answer: "Far from it! Sage goes beyond right/wrong. It's a conversational AI that explains why answers are correct, guides you through concepts you struggle with, and adapts to your learning style. It's a teacher, not just a verdict."
    },
    {
      question: "Can I use Sage on my phone?",
      answer: "Absolutely! Sage is designed for seamless use on any device – phone, tablet, computer. Study whenever, wherever. Turn short breaks into productive learning sessions."
    },
    {
      question: "How is Sage different from my textbook?",
      answer: "Think of Sage as the interactive, patient tutor your textbook wishes it could be. Instead of rereading confusing paragraphs, ask Sage to explain concepts differently, provide examples, or break down complex problems. It's active learning, not passive reading."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 px-card-outer bg-background">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
            Your Questions, Answered. Your Doubts Dissolved.
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            We know you have questions. We're here to provide clear, reassuring answers. Here are common queries about Sage and how it will help you succeed.
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
