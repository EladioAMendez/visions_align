# OAuth Callback Fix Guide

## Problem
Users trying to sign in with Google on the production site get redirected to `http://localhost:3000/api/auth/callback/google` instead of the production callback URL.

## Root Cause
The Google OAuth configuration in Google Cloud Console only has localhost:3000 as an authorized redirect URI.

## Solution Steps

### 1. Update Google Cloud Console OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your OAuth 2.0 Client ID (the one used for VisionsAlign)
4. Click **Edit** on the OAuth client
5. In the **Authorized redirect URIs** section, ADD (don't replace) your production URL:
   ```
   https://visionsalign.com/api/auth/callback/google
   ```
6. Keep the existing localhost entry for development:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Click **Save**

### 2. Verify Environment Variables

Ensure your production environment (Netlify) has the correct `NEXTAUTH_URL`:
```
NEXTAUTH_URL=https://visionsalign.com
```

### 3. Test the Fix

1. Deploy the changes
2. Try signing in with a non-admin Google account
3. The callback should now redirect to your production domain instead of localhost

## Important Notes

- **Keep both URLs**: You need localhost for development and production URL for live site
- **No code changes needed**: This is purely a Google OAuth configuration issue
- **Immediate effect**: Changes take effect immediately after saving in Google Cloud Console

## Verification

After the fix, the OAuth flow should be:
1. User clicks "Sign in with Google" on https://visionsalign.com
2. Google redirects to: `https://visionsalign.com/api/auth/callback/google?code=...`
3. User successfully lands on dashboard or appropriate page

## Troubleshooting

If you still have issues:
1. Check that `NEXTAUTH_URL` is set correctly in Netlify environment variables
2. Verify the Google OAuth client ID and secret are correct in production
3. Ensure the callback URL in Google Cloud Console exactly matches your domain
