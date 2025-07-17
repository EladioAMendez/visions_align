"use client";

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function ResponsiveImage({ 
  src, 
  alt, 
  width, 
  height,
  mobileSrc, // Optional alternative image for mobile
  className = "",
  priority = false,
  animation = true
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Determine if we're on a mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const imageSrc = isMobile && mobileSrc ? mobileSrc : src;
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={animation ? { opacity: 0, y: 20 } : {}}
      animate={animation && inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        className="w-full h-auto"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </motion.div>
  );
}
