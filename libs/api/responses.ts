import { NextResponse } from 'next/server';

/**
 * Standardized API Response Types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}

/**
 * Standard HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Error Codes for consistent error handling
 */
export const ERROR_CODES = {
  // Authentication & Authorization
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // Business Logic
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  
  // External Services
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  PAYMENT_ERROR: 'PAYMENT_ERROR',
  EMAIL_ERROR: 'EMAIL_ERROR',
  AI_SERVICE_ERROR: 'AI_SERVICE_ERROR',
  
  // System
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const;

/**
 * Success Response Builder
 */
export function successResponse<T>(
  data: T,
  status: number = HTTP_STATUS.OK,
  meta?: Partial<ApiResponse['meta']>
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };

  return NextResponse.json(response, { status });
}

/**
 * Error Response Builder
 */
export function errorResponse(
  code: string,
  message: string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  details?: any
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  return NextResponse.json(response, { status });
}

/**
 * Common Error Response Helpers
 */
export const commonErrors = {
  unauthorized: (message = 'Authentication required') =>
    errorResponse(ERROR_CODES.UNAUTHORIZED, message, HTTP_STATUS.UNAUTHORIZED),

  forbidden: (message = 'Access denied') =>
    errorResponse(ERROR_CODES.FORBIDDEN, message, HTTP_STATUS.FORBIDDEN),

  notFound: (resource = 'Resource', id?: string) =>
    errorResponse(
      ERROR_CODES.RESOURCE_NOT_FOUND,
      `${resource}${id ? ` with ID ${id}` : ''} not found`,
      HTTP_STATUS.NOT_FOUND
    ),

  badRequest: (message = 'Invalid request') =>
    errorResponse(ERROR_CODES.INVALID_INPUT, message, HTTP_STATUS.BAD_REQUEST),

  validation: (message = 'Validation failed', details?: any) =>
    errorResponse(ERROR_CODES.VALIDATION_ERROR, message, HTTP_STATUS.UNPROCESSABLE_ENTITY, details),

  conflict: (message = 'Resource already exists') =>
    errorResponse(ERROR_CODES.RESOURCE_ALREADY_EXISTS, message, HTTP_STATUS.CONFLICT),

  quotaExceeded: (message = 'Quota exceeded') =>
    errorResponse(ERROR_CODES.QUOTA_EXCEEDED, message, HTTP_STATUS.TOO_MANY_REQUESTS),

  internalError: (message = 'Internal server error', details?: any) =>
    errorResponse(ERROR_CODES.INTERNAL_ERROR, message, HTTP_STATUS.INTERNAL_SERVER_ERROR, details),

  externalService: (service: string, message?: string) =>
    errorResponse(
      ERROR_CODES.EXTERNAL_SERVICE_ERROR,
      message || `${service} service unavailable`,
      HTTP_STATUS.SERVICE_UNAVAILABLE
    ),

  methodNotAllowed: (allowedMethods: string[]) =>
    NextResponse.json(
      {
        success: false,
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: `Method not allowed. Allowed methods: ${allowedMethods.join(', ')}`,
        },
        meta: { timestamp: new Date().toISOString() },
      },
      { 
        status: HTTP_STATUS.METHOD_NOT_ALLOWED,
        headers: { Allow: allowedMethods.join(', ') }
      }
    ),
};
