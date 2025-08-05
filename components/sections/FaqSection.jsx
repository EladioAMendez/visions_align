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
    question: "Is this just another personality test?",
    answer: "No. Personality tests are static and generic. VisionsAlign provides dynamic, context-aware intelligence. The Insight Panel analyzes specific stakeholders for specific meetings, giving you actionable tactics, not just broad personality traits. It's the difference between a map and a GPS."
  },
  {
    question: "How is this different from ChatGPT?",
    answer: <>ChatGPT is a general-purpose tool. VisionsAlign is a specialist. We've trained our AI on a proprietary dataset of executive communication patterns, negotiation strategies, and psychological drivers of influence. You get a team of six expert AI personas collaborating on your behalf—something a general model can't replicate.</>
  },
  {
    question: "What is Strategic Empathy?",
    answer: <>Strategic Empathy is our core principle—and a hallmark of modern leadership. The most effective executives have always invested time to understand their audience; VisionsAlign provides a more efficient, data-driven framework for that essential work. <br/><br/>Our platform enhances genuine understanding and respect, giving you the same relational intelligence that top performers use naturally. We operate exclusively on publicly available professional data, turning what used to be intuitive into systematic.</>
  },
  {
    question: "What kind of data do you connect to?",
    answer: "For stakeholder analysis, you can start with just a LinkedIn profile URL. To generate a meeting playbook, you can connect your calendar, upload meeting agendas, or simply describe the meeting's context and goals. The more context you provide, the more precise the playbook will be."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use enterprise-grade encryption and follow strict data privacy protocols. Your inputs are used solely to generate your private playbooks and are never used for training our models. Your career strategy is yours alone."
  },
  {
    question: "How long does it take to get a playbook?",
    answer: "From connecting your data to a ready-to-use playbook takes about 90 seconds. Our goal is to make high-level strategic preparation accessible and efficient, eliminating hours of manual research and anxiety."
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
