"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Highlight, Accent } from '../ui/TextHighlight';
import DataShimmer from '../animations/dataShimmer';
import PathSlideUp from '../animations/pathSlideUp';
import ConnectExpand from '../animations/connectExpand';

export default function ProductShowcaseSection() {
  const [conversationStep, setConversationStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState('text'); // 'text' or 'voice'
  const [typingComplete, setTypingComplete] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeFeature, setActiveFeature] = useState('playbook'); // 'playbook', 'insights', 'prep'
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  // Reference for the conversation container
  const conversationRef = React.useRef(null);
  
  // Auto-scroll to the bottom of the conversation
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversationStep, typingComplete]);
  
  // Auto-play functionality
  useEffect(() => {
    let timer;
    if (isAutoPlaying && !isTyping && conversationStep < conversation.length - 1) {
      timer = setTimeout(() => {
        handleNextStep();
      }, 3000); // Auto-advance after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, conversationStep, isTyping]);

  // Demo conversation between user and VisionsAlign
  const conversation = [
    {
      user: "I have a meeting with my VP next week to discuss my promotion. How should I prepare?",
      ai: "I'll analyze your VP's leadership style based on their LinkedIn profile and company data. Based on my analysis, your VP is a **Decisive Strategist** who values data-driven discussion and clear outcomes. Let me create your meeting playbook.",
    },
    {
      user: "What key points should I emphasize in the meeting?",
      ai: "For your VP's leadership style, focus on these 3 areas:\n\n1. **Quantify Your Impact** - Lead with specific metrics showing your contributions\n2. **Strategic Vision** - Outline your 12-month plan for your new role\n3. **Direct Communication** - Be concise and solutions-oriented\n\nI've prepared talking points for each area in your playbook.",
    },
    {
      user: "How should I handle objections about my technical experience?",
      ai: "With a Decisive Strategist like your VP, address objections with this approach:\n\n• Acknowledge the concern directly\n• Provide concrete examples of relevant technical wins\n• Present your learning plan with specific milestones\n• End with a confident statement of your capability\n\nI've added specific language to your playbook for this scenario.",
    },
    {
      user: "What meeting structure would work best with my VP?",
      ai: "Based on your VP's communication preferences, here's your optimal meeting structure:\n\n1. **Opening (2 min)**: Thank them, state meeting purpose\n2. **Achievement Brief (5 min)**: Key metrics and wins\n3. **Growth Vision (8 min)**: Your promotion plan and goals\n4. **Q&A (10 min)**: Prepared responses for likely questions\n5. **Next Steps (5 min)**: Specific action items and timeline\n\nThis structure aligns with their preferred decision-making approach.",
    },
  ];

  // Typing simulation function
  const simulateTyping = (step) => {
    setIsTyping(true);
    // Add this step to the completed typing after a delay
    setTimeout(() => {
      setTypingComplete(prev => ({ ...prev, [step]: true }));
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random typing time between 1-2 seconds
  };
  
  // Move to next step in the conversation
  const handleNextStep = () => {
    if (conversationStep < conversation.length - 1) {
      const nextStep = conversationStep + 1;
      setConversationStep(nextStep);
      setTypingComplete(prev => ({ ...prev, [nextStep]: false }));
      simulateTyping(nextStep);
    }
  };

  // Go back to previous step
  const handlePrevStep = () => {
    if (conversationStep > 0) {
      const prevStep = conversationStep - 1;
      setConversationStep(prevStep);
      // We don't need to simulate typing when going back
      setTypingComplete(prev => ({ ...prev, [prevStep]: true }));
    }
  };
  
  // Switch between product features
  const handleFeatureChange = (feature) => {
    setActiveFeature(feature);
  };
  
  // Toggle auto-play functionality
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying && conversationStep === conversation.length - 1) {
      // If we're at the end, restart from the beginning
      setConversationStep(0);
      setTypingComplete({});
      simulateTyping(0);
    }
  };
  
  // Toggle between text and voice modes
  const toggleMode = () => {
    setActiveMode(activeMode === 'text' ? 'voice' : 'text');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  // Initialize typing effect on first render
  useEffect(() => {
    simulateTyping(0);
  }, []);

  // Animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  // Check if we should show the typing indicator
  const showTypingIndicator = (step) => {
    return conversationStep === step && !typingComplete[step] && isTyping;
  };

  // Function to render typing dots animation
  const renderTypingIndicator = () => {
    return (
      <div className="flex space-x-1 mt-1 mb-2 items-center h-6">
        <motion.div 
          className="w-2 h-2 rounded-full bg-accent" 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', delay: 0 }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-accent" 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', delay: 0.15 }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-accent" 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', delay: 0.3 }}
        />
      </div>
    );
  };
  
  // Feature content based on active feature
  const featureContent = {
    playbook: {
      title: "Leadership Playbooks",
      description: "Personalized strategies for every stakeholder meeting",
      image: "/images/playbook-preview.png",
      stats: [
        { label: "Meeting Success Rate", value: "94%" },
        { label: "Time Saved per Meeting", value: "2.5 hrs" }
      ]
    },
    insights: {
      title: "Leadership Style Insights",
      description: "Deep analysis of communication and decision patterns",
      image: "/images/insights-preview.png",
      stats: [
        { label: "Accuracy Rating", value: "96%" },
        { label: "Leadership Types", value: "16" }
      ]
    },
    prep: {
      title: "Meeting Prep Assistant",
      description: "AI-guided preparation for high-stakes interactions",
      image: "/images/prep-preview.png",
      stats: [
        { label: "Promotion Rate", value: "3.5×" },
        { label: "Confidence Boost", value: "87%" }
      ]
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="product" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-success/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">
            <span className="relative inline-block">
              <span className="relative z-10">Transform</span>
              <motion.span 
                className="absolute bottom-1 left-0 w-full h-3 bg-accent/20 rounded"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
            </span>
            {' '} Your <Accent>Career Trajectory</Accent>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            See how VisionsAlign helps you navigate critical leadership interactions with personalized executive insights.
          </p>
        </motion.div>
        
        {/* Interactive Demo */}
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-lg overflow-hidden mb-16">
          {/* Demo Header */}
          <div className="bg-primary p-4 flex justify-between items-center border-b border-border">
            <div className="flex items-center">
               <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center text-white font-medium mr-3"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    V
                  </motion.div>
                  <h3 className="text-white font-medium">VisionsAlign</h3>
            </div>
            
            {/* Control buttons */}
            <div className="flex space-x-3">
              {/* Toggle buttons for interaction mode */}
              <div className="flex items-center bg-primary-focus/30 rounded-full p-1 relative">
                {/* Text mode button */}
                <motion.button
                  onClick={() => setActiveMode('text')}
                  className={`p-1.5 rounded-full flex items-center justify-center ${activeMode === 'text' ? 'bg-accent text-white' : 'text-white/70'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <span className="w-5 h-5 flex items-center justify-center text-sm">💬</span>
                </motion.button>
                
                {/* Voice mode button */}
                <motion.button
                  onClick={() => setActiveMode('voice')}
                  className={`p-1.5 rounded-full flex items-center justify-center ${activeMode === 'voice' ? 'bg-accent text-white' : 'text-white/70'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <span className="w-5 h-5 flex items-center justify-center text-sm">🎤</span>
                </motion.button>
                
                {/* Tooltip */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div 
                      className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-primary-focus text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} mode activated
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Auto-play toggle */}
              <motion.button
                onClick={toggleAutoPlay}
                className={`p-1.5 rounded-full ${isAutoPlaying ? 'bg-success text-white' : 'bg-primary-focus/30 text-white/70'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <motion.span 
                  className="w-5 h-5 flex items-center justify-center text-sm"
                  animate={isAutoPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 1.5, repeat: isAutoPlaying ? Infinity : 0, ease: 'linear' }}
                >
                  {isAutoPlaying ? '⏹️' : '▶️'}
                </motion.span>
              </motion.button>
            </div>
          </div>
          
          {/* Conversation Container with custom scrollbar */}
          <div 
            ref={conversationRef}
            className="h-96 overflow-y-auto p-4 bg-gradient-to-b from-white to-card/30 scroll-container"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4ECDC4 #f1f1f1'
            }}
          >
            {conversation.slice(0, conversationStep + 1).map((exchange, index) => (
              <div key={index} className="mb-6">
                {/* User Message */}
                <motion.div 
                  className="flex mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="bg-background rounded-tl-2xl rounded-tr-2xl rounded-br-2xl p-3 shadow-sm max-w-[80%] ml-auto relative"
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* User avatar */}
                    <div className="absolute -left-2 -top-2 w-6 h-6 bg-primary/90 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      E
                    </div>
                    <p className="text-primary">{exchange.user}</p>
                  </motion.div>
                </motion.div>
                
                {/* Sage's Reply */}
                <div className="flex items-start">
                  {/* Sage avatar */}
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-accent to-success rounded-full flex items-center justify-center text-white font-medium mr-2 flex-shrink-0 shadow-sm"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    V
                  </motion.div>
                  
                  <div className="flex-grow">
                    <AnimatePresence>
                      {/* Typing indicator or completed message */}
                      {showTypingIndicator(index) ? (
                        <motion.div 
                          key="typing"
                          className="bg-accent/10 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-3 shadow-sm inline-block"
                          initial={{ opacity: 0, y: 10, width: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          {renderTypingIndicator()}
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="message"
                          className="bg-accent/10 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-3 shadow-sm max-w-[85%]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: typingComplete[index] ? 1 : 0, y: typingComplete[index] ? 0 : 10 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <p className="text-primary whitespace-pre-line">{exchange.ai}</p>
                          
                          {/* Understanding click badge - animated entry */}
                          {index === 2 && typingComplete[index] && (
                            <motion.div 
                              className="mt-2 p-2 bg-success/20 rounded border border-success/30 text-success relative overflow-hidden"
                              initial={{ opacity: 0, scale: 0.9, height: 0 }}
                              animate={{ opacity: 1, scale: 1, height: 'auto' }}
                              transition={{ delay: 0.8 }}
                            >
                              {/* Confetti effect */}
                              <div className="absolute inset-0 overflow-hidden opacity-30">
                                {[...Array(20)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute w-1.5 h-1.5 rounded-full"
                                    style={{
                                      background: i % 3 === 0 ? '#4ECDC4' : i % 3 === 1 ? '#6BCF7F' : '#FFD166',
                                      top: `${Math.random() * 100}%`,
                                      left: `${Math.random() * 100}%`
                                    }}
                                    animate={{
                                      y: [0, -10, 0],
                                      x: [0, Math.random() * 10 - 5, 0],
                                      opacity: [1, 0.7, 0]
                                    }}
                                    transition={{ duration: 2, repeat: 1, repeatType: 'reverse', delay: i * 0.1 }}
                                  />
                                ))}
                              </div>
                              
                              <motion.div 
                                className="relative z-10 flex items-center"
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ type: "spring" }}
                              >
                                <motion.span
                                  animate={{ rotate: [0, 15, 0, -15, 0, 15, 0] }}
                                  transition={{ duration: 1.5, delay: 0.5 }}
                                  className="mr-1 text-lg"
                                >
                                  🎉
                                </motion.span>
                                <div>
                                  <div className="text-sm font-medium">Leadership Style Insight!</div>
                                  <div className="text-xs">Style identified: Decisive Strategist</div>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                          
                          {/* Progress indicator for step 3 */}
                          {index === 3 && typingComplete[index] && (
                            <motion.div 
                              className="mt-3 bg-white/50 rounded-lg p-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 }}
                            >
                              <div className="text-xs text-secondary mb-1">Analysis Progress</div>
                              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-accent to-success"
                                  initial={{ width: 0 }}
                                  animate={{ width: '85%' }}
                                  transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                                />
                              </div>
                              <div className="flex justify-between text-xs mt-1">
                                <span>Leadership Style Analysis</span>
                                <span className="text-success font-medium">85%</span>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
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
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          >
            <motion.div 
              className="text-accent text-2xl mb-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              📊
            </motion.div>
            <h3 className="text-lg font-medium text-primary mb-2">Leadership Playbooks</h3>
            <p className="text-secondary">Instantly generate personalized strategies for navigating critical leadership interactions with key stakeholders.</p>
          </motion.div>

          <motion.div 
            className="bg-card p-6 rounded-card shadow-md border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          >
            <motion.div 
              className="text-accent text-2xl mb-3"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              👥
            </motion.div>
            <h3 className="text-lg font-medium text-primary mb-2">Leadership Style Analysis</h3>
            <p className="text-secondary">Get deep insights into your executives' leadership preferences, priorities, and communication styles based on AI analysis.</p>
          </motion.div>

          <motion.div 
            className="bg-card p-6 rounded-card shadow-md border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          >
            <motion.div 
              className="text-accent text-2xl mb-3"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📊
            </motion.div>
            <h3 className="text-lg font-medium text-primary mb-2">Meeting Prep Assistant</h3>
            <p className="text-secondary">Prepare for crucial meetings with executives and stakeholders with AI-generated talking points and insights.</p>
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link 
            href="/#pricing" 
            className="inline-block bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Try VisionsAlign Free for 14 Days</span>
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              animate={{ x: [-100, 250] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
              style={{ width: '30%', transform: 'skewX(-20deg)' }}
            />
          </Link>
          <p className="text-secondary mt-4 text-sm">No credit card required</p>
        </motion.div>
      </div>
      
      {/* Add CSS for custom scrollbar */}
      <style jsx global>{`
        .scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: #4ECDC4;
          border-radius: 10px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: #3bafaa;
        }
      `}</style>
    </section>
  );
}
