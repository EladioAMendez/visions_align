"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Default to light mode

  // Apply the theme to the document
  useEffect(() => {
    // Force light mode by default
    document.documentElement.setAttribute('data-theme', 'light');
    // Also add a class to ensure light mode styles are applied
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    
    return () => {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('light');
    };
  }, [theme]);

  // Theme variables - TeachingDream brand colors
  const themeColors = {
    background: "#F1F5F9",
    card: "#FFFFFF",
    primary: "#1E293B",
    secondary: "#64748B",
    accent: "#4ECDC4",
    success: "#6BCF7F",
    border: "#F1F5F9",
  };

  // Export functions and values
  const value = {
    theme,
    setTheme,
    colors: themeColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
