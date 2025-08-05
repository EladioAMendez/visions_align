/**
 * Database Configuration
 * Centralized database-related configuration
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

// Helper to check if we're in development mode
const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Database Configuration
 * Centralized database connection and query configuration
 */
export const databaseConfig = {
  // Connection
  url: getServerEnvVar('DATABASE_URL'),
  
  // Prisma Configuration
  prisma: {
    log: isDevelopment() 
      ? ['query', 'error', 'warn'] as const
      : ['error'] as const,
    errorFormat: 'pretty' as const,
  },
  
  // Connection Pool Settings
  pool: {
    timeout: 20000, // 20 seconds
    idleTimeout: 300000, // 5 minutes
  },
  
  // Query Configuration
  query: {
    timeout: 10000, // 10 seconds
    retries: 3,
  },
} as const;
