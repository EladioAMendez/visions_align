# Pre-Beta Mode Implementation Guide

## Overview

VisionsAlign now supports a "pre-beta" mode that allows you to collect email requests for beta access instead of showing the full Stripe-enabled pricing and registration flow. This is perfect for launching with limited access while building anticipation.

## Environment Variables

Add these to your `.env` file:

```bash
# Pre-beta mode toggle (set to "true" to enable pre-beta mode)
NEXT_PUBLIC_PRE_BETA_MODE=false

# Admin email whitelist (should already exist)
ADMIN_EMAILS=your-admin@email.com,another-admin@email.com

# Email service (for beta access requests)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@visionsalign.com
```

## How It Works

### Pre-Beta Mode Enabled (`NEXT_PUBLIC_PRE_BETA_MODE=true`)

**For Regular Users:**
- Landing page shows `BetaAccessSection` instead of `PricingSection`
- Users see a form to request beta access via email
- Form submissions are sent to `beta-access@visionsalign.com`
- Dashboard access is restricted (redirects to home with notification)

**For Admin Users (in `ADMIN_EMAILS`):**
- Landing page shows full `PricingSection` (admin bypass)
- Dashboard access is always allowed
- Can test full functionality while site is in pre-beta mode

### Pre-Beta Mode Disabled (`NEXT_PUBLIC_PRE_BETA_MODE=false`)

- Normal operation: all users see pricing and can access dashboard
- Full Stripe checkout flow enabled
- No restrictions on dashboard access

## Key Components

### 1. BetaAccessForm (`/components/BetaAccessForm.tsx`)
- Email collection form with Maya Chen-focused messaging
- Validates email and sends to beta access API
- Shows success/error states

### 2. BetaAccessSection (`/components/sections/BetaAccessSection.tsx`)
- Replaces PricingSection in pre-beta mode
- Features grid highlighting The Insight Panel
- Emphasizes exclusivity and data-driven approach

### 3. Beta Access API (`/app/api/beta-access/route.ts`)
- Handles form submissions
- Sends notification emails to `beta-access@visionsalign.com`
- Sends confirmation emails to users
- Includes detailed request information

### 4. Pre-Beta Utils (`/libs/preBetaUtils.ts`)
- `isPreBetaMode()`: Check if pre-beta mode is enabled
- `isAdminEmail(email)`: Check if email is in admin whitelist
- `shouldShowPricing(userEmail)`: Determine if pricing should be shown
- `shouldAllowDashboardAccess(userEmail)`: Control dashboard access

## Admin Access

Admins (emails in `ADMIN_EMAILS`) always have full access:
- See the normal pricing section even in pre-beta mode
- Can access dashboard without restrictions
- Can test full functionality

## User Experience Flow

### Regular User in Pre-Beta Mode:
1. Visits landing page → sees beta access form
2. Submits email → receives confirmation
3. Tries to access dashboard → redirected with notification
4. Sees notification in hero section about restricted access

### Admin User in Pre-Beta Mode:
1. Visits landing page → sees full pricing (bypass)
2. Can sign up and access dashboard normally
3. Can test all functionality

## Email Notifications

### To Beta Access Team:
- Subject: "New Beta Access Request - VisionsAlign"
- Includes user email, timestamp, and role/challenge details
- Formatted HTML email with user information

### To User:
- Subject: "Welcome to VisionsAlign Beta - Request Received"
- Confirmation that request was received
- Sets expectation for 48-hour response time

## Switching Between Modes

### Enable Pre-Beta Mode:
```bash
# In .env file
NEXT_PUBLIC_PRE_BETA_MODE=true
```

### Disable Pre-Beta Mode (Normal Operation):
```bash
# In .env file
NEXT_PUBLIC_PRE_BETA_MODE=false
```

**Note:** Changes to `NEXT_PUBLIC_*` variables require a server restart.

## Testing Checklist

### Pre-Beta Mode Testing:
- [ ] Landing page shows BetaAccessSection instead of PricingSection
- [ ] Beta access form submits successfully
- [ ] Email notifications are sent correctly
- [ ] Dashboard access is restricted for non-admin users
- [ ] Admin users can still access dashboard
- [ ] Admin users see full pricing section
- [ ] Access restriction notification appears when redirected

### Normal Mode Testing:
- [ ] Landing page shows PricingSection
- [ ] Stripe checkout works normally
- [ ] Dashboard access works for all authenticated users
- [ ] No beta access form visible

## Troubleshooting

### Beta Access Form Not Submitting:
- Check `RESEND_API_KEY` is set correctly
- Verify `EMAIL_FROM` domain is verified in Resend
- Check browser console for API errors

### Admin Bypass Not Working:
- Verify email is exactly in `ADMIN_EMAILS` (case-sensitive)
- Check that user is signed in with the admin email
- Restart server after changing environment variables

### Dashboard Access Issues:
- Ensure `NEXT_PUBLIC_PRE_BETA_MODE` is set correctly
- Check that admin email is in `ADMIN_EMAILS`
- Verify user session contains the correct email

## Brand Alignment

The pre-beta implementation maintains alignment with the Maya Chen persona:
- **Data-driven language**: "exclusive early access," "limited beta"
- **Career-focused messaging**: "shape the product," "preferential pricing"
- **Professional tone**: Clean, modern UI with psychological safety
- **Urgency without pressure**: "Limited spots available" but not pushy

## Security Considerations

- Admin emails are server-side only (`ADMIN_EMAILS`)
- Pre-beta mode flag is client-side (`NEXT_PUBLIC_*`) for UI rendering
- Dashboard access is protected server-side regardless of client state
- Email validation prevents basic spam/invalid submissions
