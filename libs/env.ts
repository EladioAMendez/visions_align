import { z } from 'zod';

/**
 * Environment Variable Schema
 * This defines all environment variables used in the application
 * with proper validation and type safety.
 */

/**
 * Server-side environment variables schema
 * Validates all required environment variables on the server
 */
const serverEnvSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // App URLs
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),
  SITE_URL: z.string().url().optional(),
  
  // Authentication
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  GOOGLE_ID: z.string().min(1, 'GOOGLE_ID is required'),
  GOOGLE_SECRET: z.string().min(1, 'GOOGLE_SECRET is required'),
  
  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  
  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET is required'),
  
  // Email
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  EMAIL_FROM: z.string().email().optional(),
  
  // AI Services
  N8N_WEBHOOK_URL: z.string().url('N8N_WEBHOOK_URL must be a valid URL'),
  
  // Admin
  ADMIN_EMAILS: z.string().min(1, 'ADMIN_EMAILS is required (comma-separated list)'),
  
  // Optional/Legacy (for cleanup)
  ALPHA_VANTAGE_API_KEY: z.string().optional(),
  COINDESK_API_KEY: z.string().optional(),
  THECOCKTAILDB_API_KEY: z.string().optional(),
  THEMEALDB_API_KEY: z.string().optional(),
  DATAFAST_SITE_ID: z.string().optional(),
  SERPER_API_KEY: z.string().optional(),
});

/**
 * Client-side environment variables schema
 * Only validates NEXT_PUBLIC_ variables that are available in the browser
 */
const clientEnvSchema = z.object({
  // Node.js environment (available in browser via Next.js)
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Stripe (public variables only)
  NEXT_PUBLIC_STRIPE_PRICE_ID_PRO: z.string().min(1, 'NEXT_PUBLIC_STRIPE_PRICE_ID_PRO is required'),
  NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR: z.string().min(1, 'NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR is required'),
  
  // Feature Flags
  NEXT_PUBLIC_PRE_BETA_MODE: z.enum(['true', 'false']).default('false'),
});

/**
 * Determine if we're in a browser environment
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Parsed and validated environment variables
 */
let serverEnv: z.infer<typeof serverEnvSchema>;
let clientEnv: z.infer<typeof clientEnvSchema>;
let env: z.infer<typeof serverEnvSchema> | z.infer<typeof clientEnvSchema>;

// Server-side validation (Node.js environment)
if (!isBrowser) {
  try {
    serverEnv = serverEnvSchema.parse(process.env);
    env = serverEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Server environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
} else {
  // Client-side validation (browser environment)
  try {
    // In browser, we only have access to NEXT_PUBLIC_ variables and some built-in ones
    const clientProcessEnv = {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_STRIPE_PRICE_ID_PRO: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
      NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR,
      NEXT_PUBLIC_PRE_BETA_MODE: process.env.NEXT_PUBLIC_PRE_BETA_MODE,
    };
    clientEnv = clientEnvSchema.parse(clientProcessEnv);
    env = clientEnv as any; // Type assertion for compatibility
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Client environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      throw new Error('Environment validation failed. Check console for details.');
    }
    throw error;
  }
}

/**
 * Type-safe environment variables
 * Use this instead of process.env throughout the application
 */
export { env };

/**
 * Helper functions for common environment checks
 */
export const isDevelopment = () => env.NODE_ENV === 'development';
export const isProduction = () => env.NODE_ENV === 'production';
export const isTest = () => env.NODE_ENV === 'test';

/**
 * Pre-beta mode helpers
 */
export const isPreBetaMode = () => (env as any).NEXT_PUBLIC_PRE_BETA_MODE === 'true';

/**
 * Admin email helpers (server-side only)
 */
export const getAdminEmails = (): string[] => {
  if (isBrowser) {
    console.warn('getAdminEmails() called in browser environment - returning empty array');
    return [];
  }
  return (env as z.infer<typeof serverEnvSchema>).ADMIN_EMAILS.split(',').map((email: string) => email.trim());
};

export const isAdminEmail = (email: string): boolean => {
  if (isBrowser) {
    console.warn('isAdminEmail() called in browser environment - returning false');
    return false;
  }
  return getAdminEmails().includes(email);
};

/**
 * URL helpers (server-side only)
 */
export const getBaseUrl = (): string => {
  if (isBrowser) {
    return window.location.origin;
  }
  return (env as z.infer<typeof serverEnvSchema>).NEXTAUTH_URL;
};

export const getSiteUrl = (): string => {
  if (isBrowser) {
    return window.location.origin;
  }
  const serverEnvTyped = env as z.infer<typeof serverEnvSchema>;
  return serverEnvTyped.SITE_URL || serverEnvTyped.NEXTAUTH_URL;
};
