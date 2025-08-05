import { isPreBetaMode, getAdminEmails, getBaseUrl } from '../env';

/**
 * Application Configuration
 * Core app settings and feature flags
 * Note: This config is safe for both client and server environments
 */
export const appConfig = {
  // Basic App Info
  name: 'VisionsAlign',
  description: 'AI-powered microservice that decodes executive communication styles and generates personalized meeting playbooks for career advancement.',
  domain: 'visionsalign.com',
  url: getBaseUrl(), // Safe for both client and server
  
  // Feature Flags
  features: {
    preBetaMode: isPreBetaMode(),
    crisp: false, // Crisp chat widget
    analytics: true,
    monitoring: true,
  },
  
  // Admin Configuration
  admin: {
    emails: getAdminEmails(),
  },
  
  // UI Configuration
  theme: {
    default: 'light',
    primary: '#3b82f6', // blue-500
  },
  
  // SEO Configuration
  seo: {
    title: 'VisionsAlign - AI-Powered Meeting Playbooks',
    description: 'Transform your executive presence with AI-generated playbooks that decode stakeholder dynamics and communication styles.',
    keywords: ['executive presence', 'meeting preparation', 'stakeholder analysis', 'AI coaching'],
    ogImage: `${getBaseUrl()}/og-image.png`,
    twitterImage: `${getBaseUrl()}/twitter-image.png`,
  },
  
  // Rate Limiting
  rateLimits: {
    api: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // requests per window
    },
    playbooks: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 10, // playbooks per hour
    },
  },
} as const;
