/**
 * Stripe Configuration
 * Centralized payment processing configuration
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

// Helper to safely get client-side environment variables
const getClientEnvVar = (key: string): string | null => {
  return process.env[key] || null;
};

export const stripeConfig = {
  // API Keys (server-side only)
  secretKey: getServerEnvVar('STRIPE_SECRET_KEY'),
  webhookSecret: getServerEnvVar('STRIPE_WEBHOOK_SECRET'),
  
  // Price IDs (public variables, safe for client-side)
  prices: {
    pro: getClientEnvVar('NEXT_PUBLIC_STRIPE_PRICE_ID_PRO'),
    director: getClientEnvVar('NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR'),
  },
  
  // API Configuration
  apiVersion: '2023-08-16' as const,
  
  // Webhook configuration
  webhook: {
    tolerance: 300, // 5 minutes
  },
  
  // Customer portal configuration
  customerPortal: {
    returnUrl: `${getServerEnvVar('NEXTAUTH_URL') || ''}/dashboard/billing`,
  },
  
  // Checkout configuration
  checkout: {
    mode: 'subscription' as const,
    successUrl: `${getServerEnvVar('NEXTAUTH_URL') || ''}/dashboard?success=true`,
    cancelUrl: `${getServerEnvVar('NEXTAUTH_URL') || ''}/pricing?canceled=true`,
    allowPromotionCodes: true,
  },
} as const;
