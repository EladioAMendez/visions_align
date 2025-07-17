# FTCE Question Animation Implementation Guide

This guide provides detailed instructions for implementing an interactive right-side animation showcasing an FTCE practice question and the "Ask Why" feature for TeachingDream's Sage AI study partner.

## Step 1: Set Up State Management

```jsx
// Start with these state hooks
const [journeyStage, setJourneyStage] = useState(0); // 0: question, 1: thinking, 2: answer+explanation
const [interactionCount, setInteractionCount] = useState(0);
const prefersReducedMotion = useReducedMotion(); // For accessibility
```

## Step 2: Create the Device Frame Container

```jsx
<motion.div className="lg:w-1/2">
  <motion.div 
    className="relative aspect-[4/3] max-w-[500px] mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    {/* Device frame that responds to user interactions */}
    <motion.div
      className="absolute inset-0 rounded-xl border-4 border-white bg-white shadow-2xl overflow-hidden"
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      onClick={handleInteraction}
      animate={{ 
        boxShadow: journeyStage === 2 ? 
          ['0 4px 6px -1px rgba(0, 0, 0, 0.1)', '0 15px 25px -5px rgba(78, 205, 196, 0.3)', '0 4px 6px -1px rgba(0, 0, 0, 0.1)'] : 
          '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ boxShadow: { duration: 3, repeat: Infinity } }}
    >
      {/* Device screen content goes here */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Header showing "Sage AI Study Partner" */}
        <motion.div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div 
              className="h-3 w-3 rounded-full bg-accent"
              animate={{ 
                opacity: journeyStage >= 1 ? [0.6, 1, 0.6] : 0.4,
                scale: journeyStage >= 1 ? [1, 1.2, 1] : 1
              }}
              transition={{ 
                duration: 2, 
                repeat: journeyStage >= 1 ? Infinity : 0,
                repeatType: "mirror" 
              }}
            />
            <span className="text-sm font-medium text-primary">Sage AI Study Partner</span>
          </div>
          <motion.div 
            className="text-xs font-mono text-accent"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: journeyStage >= 1 ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            ACTIVE
          </motion.div>
        </motion.div>
```

## Step 3: Implement the Three Journey Stages

### Stage 1: FTCE Question Stage
```jsx
{/* Content area with FTCE question */}
<div className="flex-1 p-3 relative">
  {/* Initial FTCE question */}
  {journeyStage === 0 && (
    <motion.div 
      className="absolute inset-0 p-4 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Question from user */}
      <motion.div 
        className="self-end bg-accent/10 rounded-tl-lg rounded-tr-lg rounded-bl-lg px-3 py-2 mb-3 max-w-[80%]"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-primary">
          Which sentence contains a subject-verb agreement error?
          A) The committee of doctors agrees on the diagnosis.
          B) Each of the students have completed their assignments.
          C) Neither the teacher nor the students were prepared for the drill.
          D) The data shows an increase in literacy rates.
        </p>
      </motion.div>
    </motion.div>
  )}
```

### Stage 2: Thinking/Processing Stage
```jsx
{/* Discovery phase - Sage thinking */}
{journeyStage >= 1 && (
  <motion.div 
    className="absolute inset-0 p-4 flex flex-col"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Question carries over from previous stage */}
    <motion.div 
      className="self-end bg-accent/10 rounded-tl-lg rounded-tr-lg rounded-bl-lg px-3 py-2 mb-3 max-w-[80%]"
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm text-primary">
        According to FTCE: Which instructional approach aligns with the UDL principle of "multiple means of representation"?
      </p>
    </motion.div>
    
    {/* Sage Response */}
    <motion.div 
      className="self-start bg-white border border-accent/20 shadow-sm rounded-tr-lg rounded-br-lg rounded-bl-lg px-3 py-2 max-w-[85%]"
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <p className="text-sm text-primary">
        <AnimatePresence>
          {journeyStage === 1 && (
            <motion.span 
              className="inline-flex items-center space-x-1"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>Thinking</span>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block h-1 w-1 bg-accent rounded-full"
              >.</motion.span>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="inline-block h-1 w-1 bg-accent rounded-full"
              >.</motion.span>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="inline-block h-1 w-1 bg-accent rounded-full"
              >.</motion.span>
            </motion.span>
          )}
```

### Stage 3: Answer with "Ask Why" Feature
```jsx
{journeyStage === 2 && (
  <motion.span 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <b>Answer:</b> You selected C, but the correct answer is B: "Each of the students have completed their assignments."
    <br/><br/>
    <span className="bg-accent/20 px-2 py-1 rounded text-accent font-medium">Ask why →</span>
    <br/><br/>
    <b>Explanation:</b> "Each" is a singular subject that requires the singular verb form "has" instead of the plural "have" - don't worry, this is a common error that many people miss!
  </motion.span>
)}
```

### Add Mastery Progress Visualization
```jsx
{/* Mastery progress visualization - only visible in confidence stage */}
{journeyStage === 2 && (
  <motion.div 
    className="mt-auto pt-4 space-y-2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
  >
    <div className="flex justify-between text-xs text-primary">
      <span>Mastery Progress: UDL Principles</span>
      <span>95%</span>
    </div>
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-gradient-to-r from-accent to-success rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: "95%" }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
    </div>
    <div className="flex justify-end">
      <motion.span 
        className="text-xs font-medium text-white bg-success px-2 py-1 rounded-full"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
        aria-live="polite"
        aria-atomic="true"
      >
        95% Ready for Exam
      </motion.span>
    </div>
  </motion.div>
)}
```

## Step 4: Add AI Interface Overlay

```jsx
{/* AI Interface Overlay */}
<motion.div 
  className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-5 rounded-card shadow-xl max-w-[80%] border-2 border-accent/20"
  initial={{ y: 50, opacity: 0 }}
  animate={{ 
    y: 0, 
    opacity: 1,
    boxShadow: ['0 4px 10px -1px rgba(0, 0, 0, 0.1)', '0 10px 20px -3px rgba(78, 205, 196, 0.4)', '0 4px 10px -1px rgba(0, 0, 0, 0.1)']
  }}
  transition={{ 
    repeat: Infinity, 
    duration: 2, 
  }}
>
  <div className="flex items-start gap-4">
    <div className="relative">
      <motion.div 
        className="w-10 h-10 bg-gradient rounded-full flex items-center justify-center text-white font-medium text-lg shadow-inner"
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, repeatDelay: 3 },
          scale: { type: "spring", stiffness: 400 }
        }}
      >
        S
      </motion.div>
      <motion.div 
        className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full"
        animate={{ scale: prefersReducedMotion ? 1 : [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: prefersReducedMotion ? 0 : Infinity }}
      />
    </div>
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.0 }}
    >
      <div className="bg-accent/10 p-2 rounded-card">
        <div className="relative">
          <p className="text-sm text-primary">
            Let me explain the <span className="text-accent font-medium">subject-verb agreement</span> error for you...
          </p>
          <motion.span 
            className="inline-flex pl-1"
            animate={{
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="relative top-0 mx-px h-1 w-1 rounded-full bg-accent"></span>
            <span className="relative top-0 mx-px h-1 w-1 rounded-full bg-accent"></span>
            <span className="relative top-0 mx-px h-1 w-1 rounded-full bg-accent"></span>
          </motion.span>
        </div>
      </div>
    </motion.div>
  </div>
</motion.div>
```

## Step 5: Add Interactive Prompt

```jsx
{/* Interactive prompt that changes with journey stage */}
<motion.div 
  className="mt-3 text-center text-sm text-secondary"
  initial={{ opacity: 0 }}
  animate={{ opacity: interactionCount > 0 ? 0 : 0.9 }}
  transition={{ duration: 0.5 }}
>
  {journeyStage === 0 && "👆 Click to see an FTCE practice question"}
  {journeyStage === 1 && "👆 Click to see Sage's answer with explanation"}
  {journeyStage === 2 && ""}
</motion.div>
```

## Step 6: Implement the Interaction Handler

```jsx
// Implement this function to handle interactions
const handleInteraction = () => {
  setInteractionCount(prev => prev + 1);
  
  // Progress to the next stage
  if (journeyStage === 0) {
    setJourneyStage(1);
    // Optional: Add a timer to auto-progress after "thinking" 
    setTimeout(() => {
      if (journeyStage === 1) {
        setJourneyStage(2);
      }
    }, 2000);
  } 
  // Progress to final stage immediately if clicked during thinking
  else if (journeyStage === 1) {
    setJourneyStage(2);
  }
};
```

## Step 7: Add CSS Variables and Constants

```jsx
// Add these color variables to your CSS or use Tailwind variables
// accent: #4ECDC4
// success: #8BE0DB
// gradient: linear-gradient(to right, #4ECDC4, #8BE0DB)

// Define animation timing constants
const animationSpeed = {
  fast: 0.3,
  medium: 0.8,
  slow: 1.5
};
```

## Step 8: Include Necessary Imports

```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
```

## Color Palette Reference
- Primary Teal (accent): #4ECDC4
- Success Mint: #8BE0DB
- Text Primary: #1e293b
- Text Secondary: #64748b
- Background White: #ffffff
- Card Background: #f8fafc

## Implementation Context

This animation showcases TeachingDream's Sage AI study partner helping aspiring teachers prepare for the Florida Teacher Certification Examinations (FTCE). The animation specifically highlights:

1. **Three-Stage Journey**: Question → Thinking → Answer with "Ask Why" feature
2. **Emotional Arc**: From study anxiety to confidence
3. **Key Feature**: The "Ask Why" button that differentiates Sage from other AI tools by providing conceptual explanations
4. **Target Pain Point**: "The Study Wall" - when students encounter concepts they don't understand
5. **Visual Indicators**: Progress bar showing mastery of concepts

These elements combine to tell the story of how Sage transforms anxiety into confidence by not just providing answers but building deep understanding.
