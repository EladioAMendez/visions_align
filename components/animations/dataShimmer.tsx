import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DataShimmerProps {
  children: ReactNode;
  duration?: number;
  color?: string; // CSS color value for shimmer effect
  intensity?: number; // How visible the shimmer is (0-1)
  className?: string;
}

/**
 * DataShimmer animation component
 * Creates a subtle shimmer effect that moves across elements
 * Ideal for data visualizations, insights, and highlights
 */
const DataShimmer: React.FC<DataShimmerProps> = ({ 
  children, 
  duration = 2.5,
  color = '#4ECDC4', // Teal accent color
  intensity = 0.2,
  className = ''
}) => {
  // Create a unique ID for this shimmer's gradient
  const uniqueId = React.useId();
  const gradientId = `shimmer-gradient-${uniqueId}`;
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Static content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shimmer overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear"
        }}
        style={{
          background: `linear-gradient(90deg, 
            rgba(255,255,255,0) 0%, 
            ${color}${Math.round(intensity * 255).toString(16)} 50%, 
            rgba(255,255,255,0) 100%)`
        }}
      />
    </div>
  );
};

export default DataShimmer;
