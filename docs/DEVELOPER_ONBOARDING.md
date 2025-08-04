# Developer Onboarding Guide

Welcome to the VisionsAlign development team! This guide will help you get up and running quickly with our AI-powered meeting playbook platform.

## 🎯 **What is VisionsAlign?**

VisionsAlign is an AI-powered platform that helps professionals (particularly Senior Product Managers like our target persona Maya Chen) master high-stakes meetings by generating personalized communication playbooks based on stakeholder analysis.

### **Core Value Proposition**
"The Blueprint to Direct the Conversation" - We provide data-driven clarity for stakeholder dynamics through The Insight Panel (6 AI expert personas).

### **Target User: Maya Chen**
- Senior Product Manager earning ~$200k
- Struggles with executive presence in high-stakes meetings
- Has 27 minutes with VP and needs to make it count for promotion
- Frustrated with "old boys club" informal access
- Seeks calm confidence and predictable career momentum

## 🏗️ **Architecture Overview**

### **Tech Stack**
- **Frontend**: Next.js 14 with App Router, Tailwind CSS + DaisyUI
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: NextAuth.js (Google OAuth + Email)
- **Payments**: Stripe (Pro/Director tiers)
- **Email**: Resend
- **AI Integration**: n8n webhooks for playbook generation
- **Deployment**: Netlify with strict secrets scanning

### **Project Structure**
```
visions_align/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   └── (public pages)     # Landing, blog, legal pages
├── components/            # React components (atomic design)
│   ├── atoms/            # Basic UI elements (Button, Input, etc.)
│   ├── molecules/        # Component combinations (Card, Navigation)
│   ├── organisms/        # Complex components (Header, Footer, Features)
│   └── utils/            # Design tokens, animations, providers
├── libs/                 # Utility libraries
│   ├── config/          # Centralized configuration system
│   ├── api/             # API utilities and middleware
│   └── (other utils)    # Database, auth, stripe, etc.
├── docs/                # Documentation
└── prisma/              # Database schema and migrations
```

## 🚀 **Quick Start**

### **1. Prerequisites**
- Node.js 18+ and npm
- PostgreSQL database
- Git

### **2. Environment Setup**
```bash
# Clone the repository
git clone <repository-url>
cd visions_align

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### **3. Configure Environment Variables**
Edit `.env` with your values. See [`ENVIRONMENT.md`](./ENVIRONMENT.md) for detailed descriptions.

**Required Variables:**
```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_ID="your-google-oauth-id"
GOOGLE_SECRET="your-google-oauth-secret"

# Stripe (for payments)
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@visionsalign.com"

# Admin Access
ADMIN_EMAILS="your-email@domain.com"
```

### **4. Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed database
npx prisma db seed
```

### **5. Start Development**
```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 🏢 **Business Logic Overview**

### **User Tiers**
1. **Starter** (Free): 1 playbook credit, basic features
2. **Pro** ($97/month): 10 credits, "Stakeholder Playbook" (6 AI personas)
3. **Director** ($197/month): 25 credits, "Relationship Playbook" (7 personas including The Connector)

### **Playbook Generation Flow**
1. User inputs stakeholder LinkedIn profile and meeting context
2. System validates user tier and credits
3. Webhook sent to n8n with comprehensive data payload
4. AI processes stakeholder data through 6-7 expert personas
5. Generated playbook stored in database
6. User receives notification when ready

### **Pre-Beta Mode**
- Toggle via `NEXT_PUBLIC_PRE_BETA_MODE=true`
- Shows beta access form instead of pricing
- Admins bypass and see full functionality
- Email collection goes to `beta-access@visionsalign.com`

## 🔧 **Development Patterns**

### **Configuration System**
Always use centralized config instead of direct `process.env`:

```typescript
// ✅ Correct
import { appConfig, stripeConfig } from '@/libs/config';
const appName = appConfig.name;

// ❌ Avoid
const appName = process.env.NEXT_PUBLIC_APP_NAME;
```

### **Component Architecture (Atomic Design)**
- **Atoms**: Basic UI elements (`Button`, `Input`, `Modal`)
- **Molecules**: Component combinations (`Card`, `Navigation`)
- **Organisms**: Complex sections (`Header`, `Footer`, `Features`)

```typescript
// Import from atomic structure
import { Button } from '@/components/atoms/Button';
import { Features } from '@/components/organisms/Features';
```

### **API Routes**
Use standardized middleware and responses:

```typescript
import { withAuth, apiResponse } from '@/libs/api';

export const POST = withAuth(async (req, session) => {
  try {
    // Your logic here
    return apiResponse.success({ data: result });
  } catch (error) {
    return apiResponse.error('Something went wrong', 500);
  }
});
```

### **Database Access**
Use Prisma client consistently:

```typescript
import { prisma } from '@/libs/prisma';

const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { playbooks: true }
});
```

## 🎨 **Styling Guidelines**

### **Tailwind + DaisyUI**
- Use DaisyUI components for consistent design
- Custom classes prefixed with `va-` (VisionsAlign)
- Responsive design with mobile-first approach

### **Design Tokens**
Use centralized design tokens:

```typescript
import { designTokens } from '@/components/utils/design-tokens';

// Colors, spacing, typography, etc.
const primaryColor = designTokens.colors.primary[500];
```

## 🧪 **Testing & Quality**

### **Build & Validation**
```bash
# Type checking
npm run build

# Linting
npm run lint

# Development server
npm run dev
```

### **Environment Validation**
The app validates all environment variables at startup using Zod schemas. Missing required variables will cause startup failure with clear error messages.

## 📊 **Key Features**

### **Authentication Flow**
- Google OAuth + Email magic links via NextAuth.js
- Session management with JWT tokens
- Admin bypass system for pre-beta mode

### **Payment Integration**
- Stripe Checkout for subscriptions
- Webhook handling for payment events
- Customer portal for billing management
- Tier-based feature access

### **AI Integration**
- n8n webhook system for playbook generation
- Comprehensive data payload with user and stakeholder info
- Async processing with status polling
- Real-time notifications when playbooks complete

### **Email System**
- Resend integration for transactional emails
- Template system for different email types
- Beta access notifications
- User confirmation emails

## 🔐 **Security Considerations**

### **Secrets Management**
- All secrets in environment variables
- Netlify secrets scanning enabled
- No hardcoded URLs or API keys
- Zod validation for all env vars

### **Authentication**
- JWT tokens for session management
- Admin email verification
- Secure API route protection

### **Data Privacy**
- User data encrypted at rest
- LinkedIn profiles processed securely
- GDPR compliance considerations

## 📚 **Additional Documentation**

- [`ENVIRONMENT.md`](./ENVIRONMENT.md) - Environment variables guide
- [`CONFIG_USAGE.md`](./CONFIG_USAGE.md) - Configuration system usage
- [`COMPONENT_AUDIT.md`](./COMPONENT_AUDIT.md) - Component architecture analysis
- [`PRE_BETA_MODE.md`](./PRE_BETA_MODE.md) - Pre-beta mode documentation

## 🆘 **Getting Help**

### **Common Issues**
1. **Build failures**: Check environment variables and run `npm run build`
2. **Database errors**: Ensure PostgreSQL is running and `DATABASE_URL` is correct
3. **Auth issues**: Verify `NEXTAUTH_SECRET` and OAuth credentials
4. **Stripe errors**: Check webhook endpoints and API keys

### **Development Tools**
- **Prisma Studio**: `npx prisma studio` for database GUI
- **Stripe CLI**: For webhook testing
- **Next.js DevTools**: Built into development server

### **Support Channels**
- Team Slack: #visions-align-dev
- Email: team@visionsalign.com
- GitHub Issues: For bug reports and feature requests

## 🎯 **Next Steps**

After completing onboarding:
1. **Explore the codebase** - Start with `app/page.tsx` and key components
2. **Review business logic** - Understand user tiers and playbook flow
3. **Set up local development** - Get your environment running
4. **Make your first contribution** - Pick up a starter issue
5. **Join team meetings** - Weekly standup and planning sessions

Welcome to the team! 🚀
