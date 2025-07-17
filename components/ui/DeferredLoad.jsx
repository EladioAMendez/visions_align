"use client";

import { useState, useEffect } from 'react';

// This component defers loading of non-critical UI elements
// until after the page has loaded to improve initial load performance
export default function DeferredLoad({ children, delay = 200 }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Wait until after first paint plus optional delay
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Only render children once the page has had time to load critical content
  return shouldRender ? children : null;
}
