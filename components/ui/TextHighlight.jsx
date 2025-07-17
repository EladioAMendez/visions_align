"use client";

import React from 'react';

/**
 * Highlight component for emphasizing text
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to highlight
 * @param {string} props.className - Additional CSS classes
 */
export function Highlight({ children, className = '' }) {
  return (
    <span className={`text-accent font-medium ${className}`}>
      {children}
    </span>
  );
}

/**
 * Accent component for brand accent text
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to accent
 * @param {string} props.className - Additional CSS classes
 */
export function Accent({ children, className = '' }) {
  return (
    <span className={`text-success font-bold ${className}`}>
      {children}
    </span>
  );
}
