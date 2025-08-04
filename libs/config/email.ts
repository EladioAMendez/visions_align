import { env } from '../env';

/**
 * Email Configuration
 * Centralized email service configuration
 */
export const emailConfig = {
  // Resend API
  apiKey: env.RESEND_API_KEY,
  
  // From addresses
  from: {
    noReply: env.EMAIL_FROM || 'noreply@visionsalign.com',
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
      pass: env.RESEND_API_KEY,
    },
  },
} as const;
