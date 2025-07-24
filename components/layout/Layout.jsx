"use client";

import React, { useEffect } from 'react';

export default function Layout({ children }) {
  // Add performance monitoring and optimization
  useEffect(() => {
    // Report web vitals when the page loads
    const reportWebVitals = ({ name, delta, id }) => {
      // You can send these metrics to your analytics provider here
      console.log(`Web Vital: ${name}`, delta, id);
    };

    // Add listener for web vitals
    if (typeof window !== 'undefined' && 'addEventListener' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          // Use the Performance API to measure page load metrics
          if ('performance' in window) {
            const performanceEntries = window.performance.getEntriesByType('navigation');
            if (performanceEntries.length > 0) {
              const navigationEntry = performanceEntries[0];
              reportWebVitals({
                name: 'FCP',
                delta: navigationEntry.firstContentfulPaint,
                id: 'FCP'
              });
              reportWebVitals({
                name: 'LCP', 
                delta: navigationEntry.largestContentfulPaint,
                id: 'LCP'
              });
            }
          }
        }, 0);
      });
    }
    
    // Preconnect to external domains we'll need later
    const preconnectLinks = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnectLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Clean up on unmount
    return () => {
      if (typeof window !== 'undefined' && 'removeEventListener' in window) {
        window.removeEventListener('load', reportWebVitals);
      }
    };
  }, []);
  
  return (
    <>
      {children}
    </>
  );
}
