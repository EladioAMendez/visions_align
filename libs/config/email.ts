/**
 * Email Configuration
 * Centralized email service configuration
 * Note: This config is safe for both client and server environments
 */

// Helper to safely get server-side environment variables
const getServerEnvVar = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    // Client-side: return null for server-only variables
    return null;
  }
  // Server-side: access process.env directly
  return process.env[key] || null;
};

export const emailConfig = {
  // Resend API (server-side only)
  apiKey: getServerEnvVar('RESEND_API_KEY'),
  
  // From addresses
  from: {
    noReply: getServerEnvVar('EMAIL_FROM') || 'noreply@visionsalign.com',
    admin: 'VisionsAlign Team <team@resend.visionsalign.com>',
    support: 'socrates.73@gmail.com',
    betaAccess: 'beta-access@visionsalign.com',
  },
  
  // Email templates
  templates: {
    welcome: {
      subject: 'Welcome to VisionsAlign',
    },
    betaAccess: {
      subject: 'Beta Access Request Received',
    },
    playbookReady: {
      subject: 'Your Playbook is Ready',
    },
  },
  
  // SMTP configuration for NextAuth
  smtp: {
    host: 'smtp.resend.com',
    port: 587,
    auth: {
      user: 'resend',
      pass: getServerEnvVar('RESEND_API_KEY'),
    },
  },
} as const;
