/**
 * Centralized Configuration System
 * 
 * This module provides type-safe, validated configuration for the entire application.
 * All environment variables are validated on startup, and configuration is organized
 * by feature area for better maintainability.
 */

// Environment validation (must be imported first)
export { env, isDevelopment, isProduction, isTest, isPreBetaMode, getAdminEmails, isAdminEmail, getBaseUrl, getSiteUrl } from '../env';

// Feature-specific configurations
export { appConfig } from './app';
export { authConfig } from './auth';
export { stripeConfig } from './stripe';
export { emailConfig } from './email';
export { aiConfig } from './ai';
export { databaseConfig } from './database';

// Legacy config for backward compatibility (will be phased out)
export { default as legacyConfig } from '../../config';

/**
 * Unified configuration object
 * Use this for accessing all configuration in a structured way
 */
export const config = {
  app: () => import('./app').then(m => m.appConfig),
  auth: () => import('./auth').then(m => m.authConfig),
  stripe: () => import('./stripe').then(m => m.stripeConfig),
  email: () => import('./email').then(m => m.emailConfig),
  ai: () => import('./ai').then(m => m.aiConfig),
  database: () => import('./database').then(m => m.databaseConfig),
} as const;

/**
 * Configuration validation
 * Call this on app startup to ensure all required config is present
 */
export const validateConfiguration = async (): Promise<void> => {
  try {
    // Environment variables are already validated by env.ts
    console.log('✅ Environment variables validated successfully');
    
    // Additional configuration validation can be added here
    const configs = await Promise.all([
      import('./app').then(m => m.appConfig),
      import('./auth').then(m => m.authConfig),
      import('./stripe').then(m => m.stripeConfig),
      import('./email').then(m => m.emailConfig),
      import('./ai').then(m => m.aiConfig),
      import('./database').then(m => m.databaseConfig),
    ]);
    
    console.log('✅ All configuration modules loaded successfully');
  } catch (error) {
    console.error('❌ Configuration validation failed:', error);
    throw error;
  }
};
