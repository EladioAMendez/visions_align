import { env } from '../env';

/**
 * Authentication Configuration
 * Centralized auth-related configuration
 */
export const authConfig = {
  // NextAuth configuration
  secret: env.NEXTAUTH_SECRET,
  baseUrl: env.NEXTAUTH_URL,
  
  // OAuth providers
  google: {
    clientId: env.GOOGLE_ID,
    clientSecret: env.GOOGLE_SECRET,
  },
  
  // URLs
  loginUrl: '/api/auth/signin',
  callbackUrl: '/dashboard',
  
  // Session configuration
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Pages
  pages: {
    signIn: '/api/auth/signin',
    error: '/auth/error',
  },
} as const;
