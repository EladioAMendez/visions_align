"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Is this ethical?",
    answer: "We define this as Strategic Empathy—a core principle of modern leadership. Effective leaders have always invested time to understand their audience; VisionsAlign provides a more efficient, data-driven framework for that essential work. Our platform is designed to enhance genuine understanding and respect, not to enable manipulation. To ensure this, we operate exclusively on publicly available professional data."
  },
  {
    question: "How is this different from ChatGPT?",
        answer: <>While ChatGPT is a generalist, VisionsAlign is a specialist. <span className="text-slate-200">The Insight Panel</span> is composed of six distinct expert personas (e.g., a Strategist, a Data Scientist, a Psychologist) who collaborate to analyze your specific challenge from multiple angles, delivering a more nuanced and actionable playbook than any single AI can.</>
  },
  {
    question: "What's the ROI?",
    answer: "The ROI is career velocity. It's the promotion you get six months early. It's the budget that gets approved. It's the startup that gets funded. Our users don't just win meetings; they build the influence needed to accelerate their careers."
  },
  {
    question: "How long does it take?",
    answer: "What used to take 10+ hours of manual research, brainstorming, and slide-building now takes about 15 minutes. VisionsAlign automates the prep work so you can focus on the performance."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption for all data, both in transit and at rest. Your inputs are used exclusively to generate your private playbook and are never used for training our models."
  },
  {
    question: "Does this replace human connection?",
    answer: "No. It enhances it. By handling the analytical heavy lifting, VisionsAlign frees you to focus on what humans do best: building rapport, showing genuine empathy, and making the personal connection that ultimately closes the deal or wins the room."
  }
];

export default function FaqSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-card-outer">
        <motion.div 
          ref={ref}
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Your Questions, Answered
          </h2>
          <p className="text-lg md:text-xl text-slate-300">
            Everything you need to know to get started with VisionsAlign.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-slate-700">
                <AccordionTrigger className="text-lg font-medium text-slate-100 hover:text-white text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 text-base leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
