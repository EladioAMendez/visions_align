"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    quote: "Before TeachingDream.com, I was drowning in textbooks and self-doubt. Now, I actually understand the material, and I'm walking into my FTCE exam with a quiet confidence I never thought possible. This app changed everything!",
    author: "Sarah L.",
    title: "Aspiring Elementary Teacher",
    rating: 5,
  },
  {
    quote: "I used to hit a wall every time I tried to study math. Sage broke it down for me in a way that finally clicked. It's like having a personal tutor available 24/7, without the judgment or the crazy price tag.",
    author: "Michael P.",
    title: "Student Teacher",
    rating: 5,
  },
  {
    quote: "The best part? No more feeling alone. Sage is always there to help, even at 2 AM when I'm panicking about a concept. It's truly a dream come true for busy students like me.",
    author: "Jessica M.",
    title: "Future Educator",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className={`bg-card p-6 rounded-card shadow-md border border-border ${isActive ? 'block' : 'hidden md:block'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.span
            key={i}
            className="text-accent text-xl mr-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            ★
          </motion.span>
        ))}
      </div>
      <p className="text-secondary italic mb-4">"{testimonial.quote}"</p>
      <div className="mt-4">
        <p className="text-primary font-medium">{testimonial.author}</p>
        <p className="text-secondary text-sm">{testimonial.title}</p>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" className="py-16 px-card-outer bg-background">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
            Real Teachers. Real Confidence. Real Stories.
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Hear from aspiring educators who transformed their study experience with Sage.
          </p>
        </motion.div>

        {/* Desktop View: Show all testimonials in a grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-card-inner">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} isActive={true} />
          ))}
        </div>

        {/* Mobile View: Carousel */}
        <div className="md:hidden">
          <TestimonialCard testimonial={testimonials[activeIndex]} isActive={true} />
          
          {/* Carousel Controls */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  activeIndex === index ? 'bg-accent' : 'bg-border'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Ratings/Mentions */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center mt-12 space-y-4 md:space-y-0 md:space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center">
            <div className="text-accent text-xl mr-2">★★★★★</div>
            <span className="text-secondary">on App Store</span>
          </div>
          <div className="text-primary font-medium">
            "Featured in 'Top EdTech Innovations for 2025'"
          </div>
        </motion.div>
      </div>
    </section>
  );
}
