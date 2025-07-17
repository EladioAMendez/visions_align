"use client";

import { useState, useEffect } from 'react';

// Breakpoints match Tailwind CSS default breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export default function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  // Initialize based on current screen size
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoints.md : false
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== 'undefined' 
      ? window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg 
      : false
  );
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpoints.lg : true
  );
  
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      setIsMobile(width < breakpoints.md);
      setIsTablet(width >= breakpoints.md && width < breakpoints.lg);
      setIsDesktop(width >= breakpoints.lg);
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away to update state with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints
  };
}
