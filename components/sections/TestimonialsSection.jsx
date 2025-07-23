"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Highlight, Accent } from '../ui/TextHighlight';
import InsightFadeIn from '../animations/insightFadeIn';

const testimonials = [
  {
    quote: "Before using VisionsAlign, I'd spend hours rehearsing conversations with executives in my head. Now, I receive a personalized leadership style breakdown and <em>actionable meeting playbook</em> in minutes. I just landed a VP role I've been pursuing for two years!",
    author: "Alexandra K.",
    title: "Senior Product Manager, Fortune 500 Tech Company",
    rating: 5,
    avatar: "/images/avatars/alexandra.jpg",
  },
  {
    quote: "When I was passed over for promotion three times, I knew something had to change. VisionsAlign helped me understand my communication blindspots and adapt my approach for each executive. Six months later, I'm leading my own team and have direct impact on company strategy.",
    author: "David T.",
    title: "Director of Operations, E-Commerce",
    rating: 5,
    avatar: "/images/avatars/david.jpg",
  },
  {
    quote: "As an introvert navigating a corporate landscape of extroverts, I struggled to get my ideas recognized. VisionsAlign gave me the <em>strategic playbook</em> I needed for each meeting, helping me build rapport with decision-makers on their terms. Game-changing for my career.",
    author: "Min-Ji P.",
    title: "Strategy Consultant, Rising to Partner",
    rating: 5,
    avatar: "/images/avatars/minji.jpg",
  },
];

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className={`relative bg-white p-8 rounded-card shadow-lg ${isActive ? 'block' : 'hidden md:block'} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Decorative quotation mark */}
      <div className="absolute top-4 right-4 text-6xl text-accent/10 font-serif leading-none">
        "
      </div>
      
      {/* Accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent to-success"></div>
      
      {/* Rating stars */}
      <div className="flex items-center mb-5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.span
            key={i}
            className="text-accent text-xl mr-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 1, 
              delay: i * 0.1 // Staggered animation
            }}
          >
            ★
          </motion.span>
        ))}
      </div>
      
      {/* Testimonial content */}
      <InsightFadeIn delay={0.3}>
        <div className="relative">
          <p 
            className="text-secondary text-lg leading-relaxed mb-6" 
            dangerouslySetInnerHTML={{ __html: `"${testimonial.quote}"` }}
          ></p>
          
          {/* Author info with avatar */}
          <div className="flex items-center mt-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-success/20 flex items-center justify-center text-primary font-medium mr-4 overflow-hidden">
              {testimonial.avatar ? (
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.textContent = testimonial.author.charAt(0);
                  }}
                />
              ) : testimonial.author.charAt(0)}
            </div>
            <div>
              <p className="text-primary font-medium">{testimonial.author}</p>
              <p className="text-secondary text-sm">{testimonial.title}</p>
            </div>
          </div>
        </div>
      </InsightFadeIn>
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
    <section id="testimonials" className="relative py-24 px-card-outer overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute top-24 left-10 w-64 h-64 bg-success/5 rounded-full blur-2xl"></div>
      
      {/* Container */}
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-6">
            <Highlight><strong>Career-Defining</strong></Highlight> Results
          </h2>
          
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            Professionals across industries are transforming their executive influence with <Accent>VisionsAlign</Accent>.
          </p>
          
          {/* Decorative accent line */}
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-accent to-success mx-auto mt-8"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
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
          
          {/* Enhanced Carousel Controls */}
          <div className="flex flex-col items-center mt-8">
            <div className="flex items-center justify-center mb-4">
              <motion.button
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center text-accent mr-4 focus:outline-none"
                onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                ←
              </motion.button>
              
              <div className="flex">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 mx-1.5 rounded-full ${activeIndex === index ? 'bg-accent shadow-lg shadow-accent/30' : 'bg-gray-300'}`}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    animate={activeIndex === index ? { scale: [1, 1.3, 1], opacity: 1 } : { opacity: 0.7 }}
                    transition={{ duration: 0.6 }}
                  />
                ))}
              </div>
              
              <motion.button
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center text-accent ml-4 focus:outline-none"
                onClick={() => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                →
              </motion.button>
            </div>
            
            <p className="text-secondary text-sm">
              <span className="text-primary font-medium">{activeIndex + 1}</span> of {testimonials.length}
            </p>
          </div>
        </div>

        {/* Enhanced Ratings/Mentions with visual styling */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center mt-16 space-y-6 md:space-y-0 md:space-x-12 p-8 bg-white/50 backdrop-blur-sm rounded-card shadow-sm border border-accent/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center bg-gradient-to-r from-accent/5 to-success/5 px-6 py-3 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex text-accent text-2xl mr-3">
              {[...Array(5)].map((_, i) => (
                <motion.span 
                  key={i} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  ★
                </motion.span>
              ))}
            </div>
            <span className="text-primary font-medium">4.9 on Capterra</span>
          </motion.div>
          
          <motion.div 
            className="text-primary font-medium flex items-center bg-gradient-to-r from-success/5 to-accent/5 px-6 py-3 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-success mr-2">★</span>
            "Featured in <Accent>Top HR Tech Solutions of 2025</Accent>"
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
