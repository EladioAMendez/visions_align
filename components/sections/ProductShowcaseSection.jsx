"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ProductShowcaseSection() {
  const [conversationStep, setConversationStep] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Demo conversation between user and Sage
  const conversation = [
    {
      user: "I'm confused about the distributive property in algebra. Can you explain it?",
      sage: "Sure! The distributive property is a fundamental concept in algebra. It allows you to multiply a number by a sum by multiplying each term separately and then adding the products. Let me show you how it works.",
    },
    {
      user: "Can you give me an example?",
      sage: "Absolutely! Let's take the expression 3(x + 5). Using the distributive property, this equals 3x + 15. I multiplied both terms inside the parentheses (x and 5) by 3. Would you like to try one?",
    },
    {
      user: "Yes, how about 4(2x - 7)?",
      sage: "Great example! Let's solve 4(2x - 7) step by step:\n\n1. Multiply 4 by the first term: 4 × 2x = 8x\n2. Multiply 4 by the second term: 4 × (-7) = -28\n3. Combine the results: 8x - 28\n\nSo 4(2x - 7) = 8x - 28. Does that make sense?",
    },
    {
      user: "Yes! I think I understand now. So the distributive property just means I multiply what's outside the parentheses by each term inside?",
      sage: "Exactly! You've got it. That's precisely what the distributive property means: a(b + c) = ab + ac. It works for any combination of numbers and variables. It's a powerful tool that you'll use throughout algebra and beyond.",
    },
  ];

  // Move to next step in the conversation
  const handleNextStep = () => {
    if (conversationStep < conversation.length - 1) {
      setConversationStep(conversationStep + 1);
    }
  };

  // Go back to previous step
  const handlePrevStep = () => {
    if (conversationStep > 0) {
      setConversationStep(conversationStep - 1);
    }
  };

  return (
    <section id="showcase" className="py-16 px-card-outer bg-white">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
            See Understanding Happen.
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Watch Sage in action. Our interactive demo reveals how effortless and effective personalized
            learning can be. See complex concepts clarify, and your confidence grow with every question answered.
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <div className="max-w-4xl mx-auto bg-card rounded-card shadow-lg border border-border overflow-hidden">
          {/* Demo Header */}
          <div className="bg-background p-4 border-b border-border flex items-center">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-medium">
              S
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-primary">Sage</h3>
              <p className="text-sm text-secondary">Your AI Study Partner</p>
            </div>
            <div className="ml-auto flex space-x-2">
              <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-full">Text Mode</span>
              <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full">Voice Available</span>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="h-96 overflow-y-auto p-6">
            {conversation.slice(0, conversationStep + 1).map((exchange, index) => (
              <div key={index} className="mb-6">
                {/* User Message */}
                <motion.div 
                  className="flex items-start mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                    J
                  </div>
                  <div className="ml-3 bg-background p-3 rounded-card max-w-[80%]">
                    <p className="text-primary">{exchange.user}</p>
                  </div>
                </motion.div>

                {/* Sage Response */}
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white">
                    S
                  </div>
                  <motion.div 
                    className="ml-3 bg-accent/10 p-3 rounded-card max-w-[80%]"  
                    animate={index === conversationStep ? { boxShadow: ['0 0 0 rgba(78, 205, 196, 0)', '0 0 10px rgba(78, 205, 196, 0.4)', '0 0 0 rgba(78, 205, 196, 0)'] } : {}}
                    transition={{ duration: 2, repeat: index === conversationStep ? Infinity : 0 }}
                  >
                    <p className="text-primary whitespace-pre-line">{exchange.sage}</p>
                    {index === 2 && (
                      <motion.div 
                        className="mt-2 p-2 bg-success/20 rounded border border-success/30 text-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="text-sm font-medium">Understanding Click! 🎉</div>
                        <div className="text-xs">Concept mastered: Distributive Property</div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="p-4 border-t border-border flex justify-between items-center bg-background">
            <button 
              onClick={handlePrevStep} 
              disabled={conversationStep === 0}
              className={`px-4 py-2 rounded-card ${conversationStep === 0 ? 'text-secondary/50 bg-background' : 'text-secondary bg-background/80 hover:bg-background'}`}
            >
              Previous
            </button>
            <div className="text-secondary">
              Step {conversationStep + 1} of {conversation.length}
            </div>
            <button 
              onClick={handleNextStep} 
              disabled={conversationStep === conversation.length - 1}
              className={`px-4 py-2 rounded-card ${conversationStep === conversation.length - 1 ? 'text-secondary/50 bg-background' : 'text-white bg-accent hover:bg-accent/90'}`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-card-inner mt-12">
          <motion.div 
            className="bg-card p-6 rounded-card shadow-md border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="text-accent text-2xl mb-3">💬</div>
            <h3 className="text-lg font-medium text-primary mb-2">Ask Anything, Anytime</h3>
            <p className="text-secondary">No more waiting for office hours. Get immediate, personalized explanations whenever you need them.</p>
          </motion.div>

          <motion.div 
            className="bg-card p-6 rounded-card shadow-md border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-accent text-2xl mb-3">🔍</div>
            <h3 className="text-lg font-medium text-primary mb-2">Conversational Learning</h3>
            <p className="text-secondary">Sage adapts to your learning style with Socratic dialogue that builds true understanding, not just memorization.</p>
          </motion.div>

          <motion.div 
            className="bg-card p-6 rounded-card shadow-md border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="text-accent text-2xl mb-3">📊</div>
            <h3 className="text-lg font-medium text-primary mb-2">Track Your Progress</h3>
            <p className="text-secondary">Monitor your growth with insights into mastered concepts and areas that need more focus.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
