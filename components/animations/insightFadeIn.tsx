import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InsightFadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * InsightFadeIn animation component
 * Used for revealing insights and important information with a gentle fade in effect
 */
const InsightFadeIn: React.FC<InsightFadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
};

export default InsightFadeIn;
