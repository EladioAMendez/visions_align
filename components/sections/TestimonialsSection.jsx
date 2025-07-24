"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    quote: "VisionsAlign was a game-changer for my promotion. The stakeholder analysis was shockingly accurate, and the communication playbook gave me the confidence to nail my presentation.",
    name: "Jessica M.",
    title: "Senior Product Manager, Tech Corp",
  },
  {
    quote: "I used to dread meetings with our executive team. Now, I see them as opportunities. VisionsAlign helped me understand their motivations and speak their language. The difference is night and day.",
    name: "David L.",
    title: "Director of Engineering, Innovate Inc.",
  },
  {
    quote: "As a founder, I'm constantly pitching to investors and partners. This tool is my secret weapon for building rapport and getting to 'yes' faster. The AI insights are brilliant.",
    name: "Sarah K.",
    title: "Founder & CEO, StartUp Solutions",
  },
  {
    quote: "The ability to generate a tailored communication strategy in minutes is invaluable. It's saved me countless hours of prep time and made my team's presentations far more effective.",
    name: "Michael B.",
    title: "VP of Sales, Enterprise Co.",
  },
];

const InitialsAvatar = ({ name }) => {
  const getInitials = (nameStr) => {
    if (!nameStr) return '?';
    const parts = nameStr.replace(/\./g, '').split(' ');
    if (parts.length > 1 && parts[1]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameStr.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className="w-12 h-12 rounded-full mr-4 border-2 border-brand-sea-green/50 bg-slate-700 flex items-center justify-center flex-shrink-0">
      <span className="text-lg font-semibold text-white">{initials}</span>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <div className="flex flex-col h-full p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
    <div className="flex-grow mb-6">
      <p className="text-lg text-slate-300 leading-relaxed">"{testimonial.quote}"</p>
    </div>
    <div className="flex items-center">
      <InitialsAvatar name={testimonial.name} />
      <div>
        <p className="font-semibold text-white">{testimonial.name}</p>
        <p className="text-sm text-slate-400">{testimonial.title}</p>
      </div>
    </div>
  </div>
);

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-card-outer">
        <motion.div
          ref={ref}
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Trusted by High-Achievers Like You
          </h2>
          <p className="text-lg md:text-xl text-slate-300">
            Here's what industry leaders are saying about their experience with VisionsAlign.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative h-80">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="absolute w-full h-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
