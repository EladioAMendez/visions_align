import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../next-auth';
import { commonErrors } from './responses';
import { isAdminEmail } from '../env';

/**
 * Authentication Middleware
 * Validates user session and adds user info to request context
 */
export function withAuth(
  handler: (request: NextRequest & { user: any }) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return commonErrors.unauthorized();
      }

      // Add user to request context
      const requestWithUser = Object.assign(request, { user: session.user });
      
      return await handler(requestWithUser);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return commonErrors.internalError('Authentication failed');
    }
  };
}

/**
 * Admin Authentication Middleware
 * Validates admin access
 */
export function withAdminAuth(
  handler: (request: NextRequest & { user: any }) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user?.email) {
        return commonErrors.unauthorized();
      }

      if (!isAdminEmail(session.user.email)) {
        return commonErrors.forbidden('Admin access required');
      }

      const requestWithUser = Object.assign(request, { user: session.user });
      
      return await handler(requestWithUser);
    } catch (error) {
      console.error('Admin auth middleware error:', error);
      return commonErrors.internalError('Admin authentication failed');
    }
  };
}

/**
 * Method Validation Middleware
 * Ensures only allowed HTTP methods are used
 */
export function withMethods(
  allowedMethods: string[],
  handler: (request: NextRequest) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    if (!allowedMethods.includes(request.method)) {
      return commonErrors.methodNotAllowed(allowedMethods);
    }
    
    return await handler(request);
  };
}

/**
 * Error Handling Middleware
 * Catches and standardizes all unhandled errors
 */
export function withErrorHandling(
  handler: (request: NextRequest) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    try {
      return await handler(request);
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('validation')) {
          return commonErrors.validation(error.message);
        }
        if (error.message.includes('not found')) {
          return commonErrors.notFound();
        }
      }
      
      return commonErrors.internalError(
        'An unexpected error occurred',
        process.env.NODE_ENV === 'development' ? error : undefined
      );
    }
  };
}

/**
 * Request Logging Middleware
 * Logs API requests for monitoring and debugging
 */
export function withLogging(
  handler: (request: NextRequest) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    const start = Date.now();
    const { method, url } = request;
    
    console.log(`[API] ${method} ${url} - Started`);
    
    try {
      const response = await handler(request);
      const duration = Date.now() - start;
      
      console.log(`[API] ${method} ${url} - ${response.status} (${duration}ms)`);
      
      return response;
    } catch (error) {
      const duration = Date.now() - start;
      console.error(`[API] ${method} ${url} - Error (${duration}ms):`, error);
      throw error;
    }
  };
}

/**
 * Compose multiple middleware functions
 */
export function compose(...middlewares: Array<(handler: any) => any>) {
  return (handler: any) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}

/**
 * Common middleware combinations
 */
export const withAuthAndLogging = compose(withErrorHandling, withLogging, withAuth);
export const withAdminAuthAndLogging = compose(withErrorHandling, withLogging, withAdminAuth);
export const withBasicHandling = compose(withErrorHandling, withLogging);
