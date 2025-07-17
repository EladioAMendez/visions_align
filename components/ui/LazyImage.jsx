"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LazyImage({ src, alt, width, height, className, priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Use IntersectionObserver to detect when image is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the image is visible
    );

    // Find the parent element to observe
    const element = document.getElementById(`lazy-img-${src.replace(/[^\w]/g, '-')}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.disconnect();
      }
    };
  }, [src]);

  return (
    <div 
      id={`lazy-img-${src.replace(/[^\w]/g, '-')}`} 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Shimmer effect placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-background to-card to-background"
          animate={{ 
            x: ["0%", "100%"],
            transition: { 
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }
          }}
        />
      )}
      
      {/* The actual image */}
      {(priority || isInView) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
}
