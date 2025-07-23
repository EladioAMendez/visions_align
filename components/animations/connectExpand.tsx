import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ConnectExpandProps {
  children: ReactNode;
  scale?: number; // How much to scale on hover/animation
  duration?: number;
  className?: string;
  animate?: boolean; // Whether to animate automatically or just on hover
}

/**
 * ConnectExpand animation component
 * Creates a subtle expansion effect for relationship elements and connections
 * Typically used for social icons, network visualizations, and relationship indicators
 */
const ConnectExpand: React.FC<ConnectExpandProps> = ({ 
  children, 
  scale = 1.2,
  duration = 0.3,
  animate = false,
  className = ''
}) => {
  return (
    <motion.div
      className={className}
      animate={animate ? { scale: [1, scale, 1] } : undefined}
      transition={animate ? { 
        repeat: Infinity,
        repeatType: "reverse",
        duration: duration,
        ease: "easeInOut"
      } : { duration: 0.2 }}
      whileHover={{ 
        scale: scale,
        transition: {
          duration: duration / 2,
          ease: "easeOut"
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default ConnectExpand;
