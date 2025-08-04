# Environment Variables Guide

This document describes all environment variables used in the VisionsAlign application.

## Required Environment Variables

### App Configuration
```bash
# Base URL for the application (production URL)
NEXTAUTH_URL=https://visionsalign.com

# NextAuth secret for JWT signing (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-nextauth-secret-here
```

### Authentication
```bash
# Google OAuth credentials (from Google Cloud Console)
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

### Database
```bash
# PostgreSQL database connection string
DATABASE_URL=postgresql://username:password@localhost:5432/visions_align
```

### Stripe Payment Processing
```bash
# Stripe secret key (from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_or_live_key_here

# Stripe webhook secret (from Stripe webhook endpoint)
STRIPE_WEBHOOK_SECRET=whsec_webhook_secret_here

# Stripe price IDs for subscription plans
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO=price_pro_plan_id
NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR=price_director_plan_id
```

### Email Service
```bash
# Resend API key for sending emails
RESEND_API_KEY=re_your_resend_api_key

# Optional: Custom from email address
EMAIL_FROM=noreply@visionsalign.com
```

### AI Services
```bash
# OpenAI API key for GPT integration
OPENAI_API_KEY=sk-your-openai-api-key

# n8n webhook URL for playbook generation
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/playbooks
```

### Admin Configuration
```bash
# Comma-separated list of admin email addresses
ADMIN_EMAILS=admin@visionsalign.com,socrates.73@gmail.com
```

## Optional Environment Variables

### Feature Flags
```bash
# Enable pre-beta mode (restricts access to beta signup form)
NEXT_PUBLIC_PRE_BETA_MODE=false

# Optional site URL (defaults to NEXTAUTH_URL if not set)
SITE_URL=https://visionsalign.com
```

### Legacy Variables (Can be removed)
These variables are no longer used and can be safely removed from your environment:
- `ALPHA_VANTAGE_API_KEY`
- `COINDESK_API_KEY` 
- `THECOCKTAILDB_API_KEY`
- `THEMEALDB_API_KEY`
- `DATAFAST_SITE_ID`
- `SERPER_API_KEY`

## Environment Setup

### Development
1. Copy `.env.example` to `.env.local`
2. Fill in all required variables
3. Use `http://localhost:3000` for `NEXTAUTH_URL` in development

### Production (Netlify)
1. Set all required variables in Netlify environment settings
2. Use your production domain for `NEXTAUTH_URL`
3. Ensure all secrets are properly configured

## Validation

The application validates all environment variables on startup using Zod schema validation. If any required variables are missing or invalid, the application will fail to start with detailed error messages.

## Security Notes

- Never commit `.env` files to version control
- Use strong, randomly generated secrets
- Rotate API keys regularly
- Use different keys for development and production
- Store sensitive variables securely in your deployment platform
