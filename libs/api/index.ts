/**
 * API Utilities
 * Centralized API helpers for consistent request/response handling
 */

export * from './responses';
export * from './middleware';

// Re-export commonly used combinations
export {
  successResponse,
  errorResponse,
  commonErrors,
  HTTP_STATUS,
  ERROR_CODES,
} from './responses';

export {
  withAuth,
  withAdminAuth,
  withMethods,
  withErrorHandling,
  withLogging,
  withAuthAndLogging,
  withAdminAuthAndLogging,
  withBasicHandling,
  compose,
} from './middleware';
