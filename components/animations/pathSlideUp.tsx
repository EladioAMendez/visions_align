import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface PathSlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number; // Distance in pixels to slide
  staggerChildren?: number; // Time between child animations
  className?: string;
}

/**
 * PathSlideUp animation component
 * Creates a slide-up effect for content blocks with optional staggered children
 */
const PathSlideUp: React.FC<PathSlideUpProps> = ({ 
  children, 
  delay = 0,
  duration = 0.6,
  distance = 20, 
  staggerChildren = 0.1,
  className = ''
}) => {
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: staggerChildren,
        delay: delay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: distance 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration,
        ease: "easeOut"
      }
    }
  };

  // If direct children need the animation
  if (React.Children.count(children) === 1 && !React.isValidElement(children)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: distance }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay,
          duration,
          ease: "easeOut"
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // For staggered child animations
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return (
            <motion.div variants={itemVariants}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
};

export default PathSlideUp;
