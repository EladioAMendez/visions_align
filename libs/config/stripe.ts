import { env } from '../env';

/**
 * Stripe Configuration
 * Centralized payment processing configuration
 */
export const stripeConfig = {
  // API Keys
  secretKey: env.STRIPE_SECRET_KEY,
  webhookSecret: env.STRIPE_WEBHOOK_SECRET,
  
  // Price IDs
  prices: {
    pro: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    director: env.NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR,
  },
  
  // API Configuration
  apiVersion: '2023-08-16' as const,
  
  // Webhook configuration
  webhook: {
    tolerance: 300, // 5 minutes
  },
  
  // Customer portal configuration
  customerPortal: {
    returnUrl: `${env.NEXTAUTH_URL}/dashboard/billing`,
  },
  
  // Checkout configuration
  checkout: {
    mode: 'subscription' as const,
    successUrl: `${env.NEXTAUTH_URL}/dashboard?success=true`,
    cancelUrl: `${env.NEXTAUTH_URL}/pricing?canceled=true`,
    allowPromotionCodes: true,
  },
} as const;
