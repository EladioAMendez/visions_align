import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AlignPulseProps {
  children: ReactNode;
  intensity?: number; // Scale of pulse (1.0-1.1 recommended)
  duration?: number; // Duration of full pulse cycle in seconds
  continuous?: boolean; // Whether to pulse continuously or just once
  className?: string;
}

/**
 * AlignPulse animation component
 * Creates a subtle pulse effect, ideal for buttons and CTA elements
 */
const AlignPulse: React.FC<AlignPulseProps> = ({ 
  children, 
  intensity = 1.05, 
  duration = 2,
  continuous = true,
  className = ''
}) => {
  return (
    <motion.div
      animate={
        continuous 
          ? { 
              scale: [1, intensity, 1],
            } 
          : { scale: 1 }
      }
      transition={{ 
        repeat: continuous ? Infinity : 0, 
        duration: duration,
        ease: "easeInOut"
      }}
      whileHover={{ scale: intensity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AlignPulse;
