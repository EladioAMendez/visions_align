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
    question: "What is VisionsAlign?",
    answer: "VisionsAlign is a strategic communication platform that helps leaders align their teams, articulate their vision, and drive measurable results. We provide tools for data-driven insights, stakeholder engagement, and transparent progress tracking."
  },
  {
    question: "Is using AI for communication insights ethical?",
    answer: "We define this as Strategic Empathy—a core principle of modern leadership. Effective leaders have always invested time to understand their audience; VisionsAlign provides a more efficient, data-driven framework for that essential work. Our platform is designed to enhance genuine understanding and respect, not to enable manipulation. To ensure this, we operate exclusively on publicly available professional data."
  },
  {
    question: "Who is this platform for?",
    answer: "Our platform is designed for executives, project managers, and team leaders who need to ensure their strategic initiatives are understood, adopted, and successfully executed across their organizations."
  },
  {
    question: "How does VisionsAlign improve communication?",
    answer: "By providing a centralized hub for your vision, goals, and progress, we eliminate information silos. Our tools help you craft clear, compelling messages and our analytics show you how effectively those messages are resonating with your team."
  },
  {
    question: "Can I integrate VisionsAlign with other tools?",
    answer: "Yes, we are developing integrations for popular project management and communication tools like Slack, Jira, and Asana to ensure a seamless workflow. Please check our roadmap or contact us for specific requests."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer comprehensive support including an extensive knowledge base, email support, and dedicated onboarding assistance for enterprise clients to ensure you get the most value from VisionsAlign."
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-slate-300">
            Have questions? We've got answers. If you don't see what you're looking for, feel free to contact us.
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
