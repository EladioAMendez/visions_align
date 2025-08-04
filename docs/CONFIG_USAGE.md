# Configuration Usage Guide

This document outlines the standardized configuration system implemented in VisionsAlign to centralize environment variables, application settings, and feature flags.

## 📁 **Configuration Structure**

The configuration system is organized into feature-specific modules under `libs/config/`:

```
libs/config/
├── index.ts          # Main config exports and legacy compatibility
├── app.ts           # Core application settings
├── auth.ts          # Authentication configuration
├── stripe.ts        # Payment processing settings
├── email.ts         # Email service configuration
├── ai.ts            # AI services configuration
└── database.ts      # Database connection settings
```

## 🔧 **Usage Patterns**

### ✅ **Correct Usage**

```typescript
// Import from centralized config
import { appConfig, stripeConfig, emailConfig } from '@/libs/config';

// Use typed configuration
const appName = appConfig.name;
const stripeKey = stripeConfig.secretKey;
const emailFrom = emailConfig.from.noReply;
```

### ❌ **Avoid Direct Environment Access**

```typescript
// DON'T do this - bypasses validation and typing
const appName = process.env.NEXT_PUBLIC_APP_NAME;
const stripeKey = process.env.STRIPE_SECRET_KEY;
```

## 📋 **Configuration Modules**

### **App Configuration (`appConfig`)**

Core application settings and feature flags.

```typescript
import { appConfig } from '@/libs/config';

// Basic app info
appConfig.name          // "VisionsAlign"
appConfig.description   // App description
appConfig.url          // Base URL from NEXTAUTH_URL
appConfig.domain       // "visionsalign.com"

// Feature flags
appConfig.features.preBetaMode    // Pre-beta mode toggle
appConfig.features.analytics      // Analytics enabled
appConfig.features.monitoring     // Monitoring enabled

// Admin settings
appConfig.admin.emails           // Array of admin emails

// SEO settings
appConfig.seo.title             // SEO title
appConfig.seo.description       // SEO description
appConfig.seo.keywords          // SEO keywords array
appConfig.seo.ogImage           // Open Graph image URL
appConfig.seo.twitterImage      // Twitter card image URL
```

### **Authentication Configuration (`authConfig`)**

NextAuth.js and authentication settings.

```typescript
import { authConfig } from '@/libs/config';

authConfig.secret              // NextAuth secret
authConfig.url                 // NextAuth URL
authConfig.providers.google    // Google OAuth settings
authConfig.database.url        // Database connection string
```

### **Stripe Configuration (`stripeConfig`)**

Payment processing and Stripe integration.

```typescript
import { stripeConfig } from '@/libs/config';

stripeConfig.publishableKey    // Public Stripe key
stripeConfig.secretKey         // Secret Stripe key
stripeConfig.webhookSecret     // Webhook endpoint secret
stripeConfig.apiVersion        // API version
```

### **Email Configuration (`emailConfig`)**

Email service and template settings.

```typescript
import { emailConfig } from '@/libs/config';

emailConfig.apiKey             // Resend API key
emailConfig.from.noReply       // No-reply address
emailConfig.from.admin         // Admin email address
emailConfig.from.support       // Support email address
emailConfig.from.betaAccess    // Beta access email

// Email templates
emailConfig.templates.welcome.subject
emailConfig.templates.betaAccess.subject
emailConfig.templates.playbookReady.subject
```

### **AI Configuration (`aiConfig`)**

AI services and webhook settings.

```typescript
import { aiConfig } from '@/libs/config';

aiConfig.openai.apiKey         // OpenAI API key (optional)
aiConfig.n8n.webhookUrl        // n8n webhook URL
```

### **Database Configuration (`databaseConfig`)**

Database connection and Prisma settings.

```typescript
import { databaseConfig } from '@/libs/config';

databaseConfig.url             // Database connection URL
databaseConfig.directUrl       // Direct connection URL
databaseConfig.prisma.log      // Prisma logging configuration
```

## 🔄 **Legacy Compatibility**

For backward compatibility, the legacy config is still available:

```typescript
import { legacyConfig } from '@/libs/config';

// Legacy config access (use sparingly)
legacyConfig.stripe.plans      // Stripe plan definitions
legacyConfig.appName          // App name (use appConfig.name instead)
```

## 🚀 **Migration Guide**

When refactoring existing code:

1. **Replace direct `process.env` usage:**
   ```typescript
   // Before
   const apiKey = process.env.STRIPE_SECRET_KEY;
   
   // After
   import { stripeConfig } from '@/libs/config';
   const apiKey = stripeConfig.secretKey;
   ```

2. **Replace legacy config imports:**
   ```typescript
   // Before
   import config from '@/config';
   const appName = config.appName;
   
   // After
   import { appConfig } from '@/libs/config';
   const appName = appConfig.name;
   ```

3. **Update component props and metadata:**
   ```typescript
   // Before
   export const metadata = {
     title: 'Hardcoded Title',
     description: process.env.NEXT_PUBLIC_DESCRIPTION,
   };
   
   // After
   import { appConfig } from '@/libs/config';
   export const metadata = {
     title: appConfig.seo.title,
     description: appConfig.seo.description,
   };
   ```

## ⚠️ **Important Notes**

1. **Environment Variables**: All environment variables are validated at startup using Zod schemas in `libs/env.ts`.

2. **Type Safety**: Configuration modules provide full TypeScript support with proper typing.

3. **Error Handling**: Missing required environment variables will cause the application to fail at startup with clear error messages.

4. **Build-time vs Runtime**: Some configurations (like sitemap generation) may still need direct environment variable access during build time.

5. **Security**: Never expose sensitive keys in client-side code. Use appropriate environment variable prefixes (`NEXT_PUBLIC_` for client-side).

## 🔍 **Validation**

The configuration system includes comprehensive validation:

- **Required variables** will cause startup failure if missing
- **Optional variables** have sensible defaults
- **Type validation** ensures correct data types
- **Format validation** for URLs, emails, etc.

## 📝 **Adding New Configuration**

To add new configuration options:

1. **Add environment variable** to `libs/env.ts` with Zod validation
2. **Create or update** the appropriate config module
3. **Export** from `libs/config/index.ts`
4. **Document** the new configuration in this guide
5. **Update** `.env.example` with the new variable

## 🧪 **Testing Configuration**

Test your configuration changes:

```bash
# Validate environment variables
npm run build

# Check for missing variables
npm run dev
```

The application will fail to start if required configuration is missing or invalid, providing clear error messages for debugging.
