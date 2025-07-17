"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and in the browser
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return;
    }

    // Report Core Web Vitals
    const reportWebVitals = (metric) => {
      // You can send to your analytics service here
      console.log(metric);
    };

    // Monitor CLS (Cumulative Layout Shift)
    let cls = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      }
      reportWebVitals({ name: 'CLS', value: cls });
    }).observe({ type: 'layout-shift', buffered: true });

    // Monitor LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        reportWebVitals({ name: 'LCP', value: entry.startTime });
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // Monitor FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        reportWebVitals({ 
          name: 'FID', 
          value: entry.processingStart - entry.startTime 
        });
      }
    }).observe({ type: 'first-input', buffered: true });

    // Monitor TTI (Time to Interactive)
    if ('PerformanceLongTaskTiming' in window) {
      new PerformanceObserver(() => {
        const timing = performance.timing;
        reportWebVitals({
          name: 'TTI',
          value: timing.domInteractive - timing.navigationStart
        });
      }).observe({ type: 'longtask' });
    }
    
    // Monitor resource loading
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(entry => {
        if (entry.initiatorType === 'resource' && 
            (entry.name.includes('.js') || 
             entry.name.includes('.css') || 
             entry.name.includes('.jpg') || 
             entry.name.includes('.png'))) {
          reportWebVitals({
            name: 'ResourceTiming',
            value: {
              resource: entry.name,
              duration: entry.duration,
              size: entry.transferSize
            }
          });
        }
      });
    }).observe({ type: 'resource', buffered: true });

  }, []);

  // This component doesn't render anything
  return null;
}
