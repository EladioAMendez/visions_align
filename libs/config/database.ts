import { env, isDevelopment } from '../env';

/**
 * Database Configuration
 * Centralized database connection and query configuration
 */
export const databaseConfig = {
  // Connection
  url: env.DATABASE_URL,
  
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
