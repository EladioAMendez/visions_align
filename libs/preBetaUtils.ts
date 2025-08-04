/**
 * Utility functions for managing pre-beta mode and admin access
 */

import { appConfig } from './config';

/**
 * Check if the app is currently in pre-beta mode
 */
export function isPreBetaMode(): boolean {
  return appConfig.features.preBetaMode;
}

/**
 * Check if an email is in the admin whitelist
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = appConfig.admin.emails;
  return adminEmails.includes(email);
}

/**
 * Check if a user should have admin access (bypass pre-beta restrictions)
 */
export function hasAdminAccess(userEmail?: string | null): boolean {
  if (!userEmail) return false;
  return isAdminEmail(userEmail);
}

/**
 * Determine if pricing/checkout should be shown to a user
 * Returns true if:
 * - Pre-beta mode is disabled, OR
 * - User is an admin (has bypass access)
 */
export function shouldShowPricing(userEmail?: string | null): boolean {
  if (!isPreBetaMode()) return true;
  return hasAdminAccess(userEmail);
}

/**
 * Determine if dashboard access should be allowed
 * Returns true if:
 * - Pre-beta mode is disabled, OR
 * - User is an admin, OR
 * - User has been granted beta access (you can extend this logic later)
 */
export function shouldAllowDashboardAccess(userEmail?: string | null): boolean {
  if (!isPreBetaMode()) return true;
  return hasAdminAccess(userEmail);
}

/**
 * Get the appropriate section component name based on mode and user
 */
export function getPricingSectionComponent(userEmail?: string | null): 'PricingSection' | 'BetaAccessSection' {
  return shouldShowPricing(userEmail) ? 'PricingSection' : 'BetaAccessSection';
}
