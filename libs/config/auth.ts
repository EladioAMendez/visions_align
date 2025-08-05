/**
 * Authentication Configuration
 * Centralized auth-related configuration
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

export const authConfig = {
  // NextAuth configuration (server-side only)
  secret: getServerEnvVar('NEXTAUTH_SECRET'),
  baseUrl: getServerEnvVar('NEXTAUTH_URL'),
  
  // OAuth providers (server-side only)
  google: {
    clientId: getServerEnvVar('GOOGLE_ID'),
    clientSecret: getServerEnvVar('GOOGLE_SECRET'),
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
