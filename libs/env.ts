import { z } from 'zod';

/**
 * Environment Variable Schema
 * This defines all environment variables used in the application
 * with proper validation and type safety.
 */
const envSchema = z.object({
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
  NEXT_PUBLIC_STRIPE_PRICE_ID_PRO: z.string().min(1, 'NEXT_PUBLIC_STRIPE_PRICE_ID_PRO is required'),
  NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR: z.string().min(1, 'NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR is required'),
  
  // Email
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  EMAIL_FROM: z.string().email().optional(),
  
  // AI Services
  OPENAI_API_KEY: z.string().optional(),
  N8N_WEBHOOK_URL: z.string().url('N8N_WEBHOOK_URL must be a valid URL'),
  
  // Admin
  ADMIN_EMAILS: z.string().min(1, 'ADMIN_EMAILS is required (comma-separated list)'),
  
  // Feature Flags
  NEXT_PUBLIC_PRE_BETA_MODE: z.enum(['true', 'false']).default('false'),
  
  // Optional/Legacy (for cleanup)
  ALPHA_VANTAGE_API_KEY: z.string().optional(),
  COINDESK_API_KEY: z.string().optional(),
  THECOCKTAILDB_API_KEY: z.string().optional(),
  THEMEALDB_API_KEY: z.string().optional(),
  DATAFAST_SITE_ID: z.string().optional(),
  SERPER_API_KEY: z.string().optional(),
});

/**
 * Parsed and validated environment variables
 */
let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Environment validation failed:');
    error.errors.forEach((err) => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
    process.exit(1);
  }
  throw error;
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
export const isPreBetaMode = () => env.NEXT_PUBLIC_PRE_BETA_MODE === 'true';

/**
 * Admin email helpers
 */
export const getAdminEmails = (): string[] => {
  return env.ADMIN_EMAILS.split(',').map(email => email.trim());
};

export const isAdminEmail = (email: string): boolean => {
  return getAdminEmails().includes(email);
};

/**
 * URL helpers
 */
export const getBaseUrl = (): string => {
  return env.NEXTAUTH_URL;
};

export const getSiteUrl = (): string => {
  return env.SITE_URL || env.NEXTAUTH_URL;
};
