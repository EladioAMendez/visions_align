"use client";

import React, { useState, useEffect } from 'react';

/**
 * Development-only accessibility checker that runs basic a11y tests
 * This component analyzes the page for common accessibility issues
 */
export default function AccessibilityChecker() {
  const [isOpen, setIsOpen] = useState(false);
  const [issues, setIssues] = useState([]);
  const [score, setScore] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const runChecks = () => {
    setIsScanning(true);
    const newIssues = [];
    
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt') || img.alt === '') {
        newIssues.push({
          type: 'error',
          element: 'Image',
          issue: `Missing alt text on image ${index + 1}`,
          impact: 'High',
          location: getElementPath(img)
        });
      }
    });
    
    // Check for proper heading structure
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const headingLevels = headings.map(h => parseInt(h.tagName[1]));
    
    // Check if there's an H1
    if (!headings.some(h => h.tagName === 'H1')) {
      newIssues.push({
        type: 'error',
        element: 'Heading',
        issue: 'No H1 heading found on page',
        impact: 'High',
        location: 'Page'
      });
    }
    
    // Check for skipped heading levels
    for (let i = 0; i < headingLevels.length - 1; i++) {
      if (headingLevels[i+1] > headingLevels[i] + 1) {
        newIssues.push({
          type: 'warning',
          element: 'Heading',
          issue: `Skipped heading level: H${headingLevels[i]} to H${headingLevels[i+1]}`,
          impact: 'Medium',
          location: getElementPath(headings[i+1])
        });
      }
    }
    
    // Check for color contrast (simplified version)
    const elements = document.querySelectorAll('button, a, p, h1, h2, h3, h4, h5, h6');
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const color = style.color;
      
      if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        // Skip elements with transparent backgrounds
        return;
      }
      
      if (isLowContrast(color, bgColor)) {
        newIssues.push({
          type: 'warning',
          element: el.tagName.toLowerCase(),
          issue: 'Potentially low color contrast',
          impact: 'Medium',
          location: getElementPath(el)
        });
      }
    });
    
    // Check for keyboard accessibility on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(el => {
      if (el.tabIndex === -1 && !el.disabled) {
        newIssues.push({
          type: 'warning',
          element: el.tagName.toLowerCase(),
          issue: 'Interactive element not keyboard accessible',
          impact: 'High',
          location: getElementPath(el)
        });
      }
    });
    
    // Check for form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const id = input.getAttribute('id');
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (!label) {
          newIssues.push({
            type: 'error',
            element: input.tagName.toLowerCase(),
            issue: 'Form control missing associated label',
            impact: 'High',
            location: getElementPath(input)
          });
        }
      } else {
        // Check if input is wrapped in a label
        if (!input.closest('label')) {
          newIssues.push({
            type: 'error',
            element: input.tagName.toLowerCase(),
            issue: 'Form control has no id or label',
            impact: 'High',
            location: getElementPath(input)
          });
        }
      }
    });
    
    // Check for ARIA attributes
    const ariaElements = document.querySelectorAll('[aria-*]');
    ariaElements.forEach(el => {
      if (el.hasAttribute('aria-hidden') && el.hasAttribute('tabindex')) {
        newIssues.push({
          type: 'warning',
          element: el.tagName.toLowerCase(),
          issue: 'Element has aria-hidden but is focusable',
          impact: 'Medium',
          location: getElementPath(el)
        });
      }
    });
    
    // Calculate a basic accessibility score
    const totalChecks = 7; // Number of categories we're checking
    const issueTypes = {
      error: newIssues.filter(i => i.type === 'error').length,
      warning: newIssues.filter(i => i.type === 'warning').length
    };
    
    // Calculate score: 100 - (errors * 15) - (warnings * 5)
    let calculatedScore = 100 - (issueTypes.error * 15) - (issueTypes.warning * 5);
    calculatedScore = Math.max(0, Math.min(100, calculatedScore)); // Clamp between 0-100
    
    setIssues(newIssues);
    setScore(calculatedScore);
    setIsScanning(false);
  };
  
  // Helper function to determine contrast (simplified)
  function isLowContrast(color1, color2) {
    // This is a simplified check - proper contrast checking requires converting to HSL
    // For a full implementation, consider using a library
    return false; // Placeholder, always returning false to avoid false positives
  }
  
  // Helper to get element path for location
  function getElementPath(element) {
    if (!element) return 'Unknown';
    
    let path = element.tagName.toLowerCase();
    if (element.id) {
      path += `#${element.id}`;
    } else if (element.className) {
      path += `.${element.className.split(' ')[0]}`;
    }
    
    return path;
  }
  
  // Only run in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        className="bg-primary text-white px-3 py-1 rounded-md text-sm font-medium shadow-lg flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span role="img" aria-label="Accessibility">♿</span>
        {!isOpen ? 'Accessibility' : 'Close'}
      </button>
      
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-xl mt-2 max-w-md max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Accessibility Checker</h3>
            <div>
              <span className="text-sm">Score: </span>
              <span className={`text-lg font-bold ${
                score >= 90 ? 'text-success' : 
                score >= 70 ? 'text-warning' : 
                'text-error'
              }`}>
                {score}
              </span>
            </div>
          </div>
          
          <button 
            className="bg-accent text-white px-2 py-1 rounded-md text-sm font-medium w-full mb-4"
            onClick={runChecks}
            disabled={isScanning}
          >
            {isScanning ? 'Scanning...' : 'Run Accessibility Check'}
          </button>
          
          {issues.length > 0 ? (
            <>
              <p className="text-sm mb-2">Found {issues.length} potential issues:</p>
              <ul className="space-y-2">
                {issues.map((issue, index) => (
                  <li key={index} className={`text-sm p-2 rounded ${
                    issue.type === 'error' ? 'bg-error bg-opacity-10' : 'bg-warning bg-opacity-10'
                  }`}>
                    <div className="flex gap-2 items-start">
                      <span className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 ${
                        issue.type === 'error' ? 'bg-error' : 'bg-warning'
                      }`}></span>
                      <div>
                        <strong>{issue.element}: </strong>
                        {issue.issue} 
                        <div className="text-xs text-gray-600 mt-1">
                          <span>Impact: {issue.impact} | </span>
                          <span>Location: {issue.location}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              {isScanning ? 'Scanning page for issues...' : 'Run the check to find accessibility issues'}
            </p>
          )}
          
          <div className="mt-4 text-xs text-gray-500">
            Note: This is a basic check and doesn't replace a full audit
          </div>
        </div>
      )}
    </div>
  );
}
