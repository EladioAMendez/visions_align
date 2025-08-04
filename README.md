# VisionsAlign 🎯

> **The Blueprint to Direct the Conversation**

AI-powered meeting playbooks that decode stakeholder dynamics and communication styles to help professionals master high-stakes meetings and accelerate their career advancement.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?style=flat-square&logo=stripe)](https://stripe.com/)

## 🎯 **What is VisionsAlign?**

VisionsAlign transforms your executive presence by generating AI-powered playbooks that analyze stakeholder communication styles and provide personalized strategies for high-stakes meetings.

### **Target User: Maya Chen**
- Senior Product Manager earning ~$200k
- Struggles with executive presence in critical meetings
- Has 27 minutes with VP and needs to make it count for promotion
- Seeks calm confidence and predictable career momentum

### **Core Value Proposition**
"The Blueprint to Direct the Conversation" - We provide data-driven clarity for stakeholder dynamics through The Insight Panel (6-7 AI expert personas).

## ✨ **Key Features**

- 🧠 **AI-Powered Analysis**: 6-7 expert AI personas analyze stakeholder communication styles
- 📋 **Personalized Playbooks**: Tailored meeting strategies based on stakeholder profiles
- 🎯 **Tier-Based Access**: Pro (Stakeholder Playbook) and Director (Relationship Playbook) tiers
- 🔐 **Secure Authentication**: Google OAuth and email-based login
- 💳 **Stripe Integration**: Seamless subscription management
- 📧 **Email Notifications**: Real-time playbook completion alerts
- 🚀 **Pre-Beta Mode**: Beta access collection and user onboarding

## ✨ Features

-   **AI-Powered Playbooks**: Generates sophisticated stakeholder analysis and communication strategies.
-   **Tiered Subscriptions**: Offers different levels of access and features through Stripe integration.
-   **Secure Authentication**: Handles user sign-up, sign-in, and account management with NextAuth.js, supporting both magic links (email) and Google OAuth.
-   **Pre-Beta Mode**: Allows for controlled access during testing phases, replacing the pricing section with a beta access request form.
-   **Admin Dashboard**: Provides a dedicated interface for administrators to manage the application.

## 🛠️ **Tech Stack**

### **Frontend**
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Components**: Atomic Design System
- **TypeScript**: Full type safety

### **Backend**
- **API**: Next.js API Routes
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) ORM
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Google OAuth + Email)
- **Payments**: [Stripe](https://stripe.com/) subscriptions
- **Email**: [Resend](https://resend.com/) transactional emails

### **AI Integration**
- **Orchestration**: n8n webhook system
- **Processing**: 6-7 AI expert personas
- **Analysis**: Stakeholder communication style decoding

### **Deployment**
- **Platform**: [Netlify](https://www.netlify.com/) with secrets scanning
- **CDN**: Global edge network
- **Security**: Environment variable validation

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v22 or later recommended)
-   [npm](https://www.npmjs.com/)
-   A [PostgreSQL](https://www.postgresql.org/download/) database instance (e.g., via Docker, Supabase, or a local installation).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/EladioAMendez/visions_align.git
    cd visions_align
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Then, fill in the required values in your new `.env` file:
    ```env
    # Database
    # Example for a local PostgreSQL instance
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # NextAuth.js
    # Generate a secret with: openssl rand -base64 32
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=http://localhost:3000

    # Authentication Providers
    GOOGLE_ID=
    GOOGLE_SECRET=

    # Email Service (Resend)
    RESEND_API_KEY=
    EMAIL_FROM="Your Name <your-email@example.com>"

    # Stripe
    STRIPE_SECRET_KEY=
    STRIPE_WEBHOOK_SECRET=
    # The price IDs from your Stripe products
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO=
    NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR=

    # Application Logic
    # Comma-separated list of admin emails
    ADMIN_EMAILS=
    # Set to true to enable pre-beta mode
    NEXT_PUBLIC_PRE_BETA_MODE=false
    ```

4.  **Apply database schema:**

    This command will apply the schema defined in `prisma/schema.prisma` to your database.
    ```bash
    npx prisma db push
    ```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm run postinstall`: Generates the Prisma Client (runs automatically after `npm install`).
-   `npm run start`: Starts a production server.
-   `npm run lint`: Runs the linter to check for code quality issues.

## ☁️ **Deployment**

The application is configured for deployment on [Netlify](https://www.netlify.com/) with comprehensive security scanning and global CDN distribution.

### **Deployment Features**
- **Automatic Builds**: Git-based deployment pipeline
- **Secrets Scanning**: Built-in security validation
- **Environment Variables**: Centralized configuration management
- **Global CDN**: Optimized content delivery
- **SSL/HTTPS**: Automatic certificate management

## 📚 **Documentation**

Comprehensive documentation is available in the `/docs` directory:

### **🚀 Getting Started**
- **[Developer Onboarding](./docs/DEVELOPER_ONBOARDING.md)** - Complete setup guide for new developers
- **[Environment Setup](./docs/ENVIRONMENT.md)** - Environment variables and configuration
- **[Quick Start Guide](#-getting-started)** - Basic setup instructions

### **🏗️ Architecture & Design**
- **[System Architecture](./docs/ARCHITECTURE.md)** - High-level system design and technical decisions
- **[Component Architecture](./docs/COMPONENT_AUDIT.md)** - Atomic design system and component structure
- **[Configuration System](./docs/CONFIG_USAGE.md)** - Centralized config usage patterns

### **🔧 Development**
- **[API Reference](./docs/API_REFERENCE.md)** - Complete API endpoint documentation
- **[Pre-Beta Mode](./docs/PRE_BETA_MODE.md)** - Beta access system documentation
- **[Development Workflow](#-development)** - Local development and testing

### **📋 Project Management**
- **[Component Audit](./docs/COMPONENT_AUDIT.md)** - Component analysis and migration plan
- **[Environment Guide](./docs/ENVIRONMENT.md)** - Detailed environment variable reference

## 🎯 **Business Logic**

### **User Tiers**
- **Starter** (Free): 1 playbook credit, basic features
- **Pro** ($97/month): 10 credits, "Stakeholder Playbook" (6 AI personas)
- **Director** ($197/month): 25 credits, "Relationship Playbook" (7 personas including The Connector)

### **AI Processing Pipeline**
1. User inputs stakeholder LinkedIn profile and meeting context
2. System validates user tier and available credits
3. Webhook sent to n8n with comprehensive data payload
4. AI processes stakeholder data through 6-7 expert personas
5. Generated playbook stored in database with real-time status updates
6. User receives notification when playbook is ready

### **Pre-Beta Mode**
Toggle via `NEXT_PUBLIC_PRE_BETA_MODE=true` to:
- Show beta access form instead of pricing section
- Collect user emails for beta access
- Allow admin bypass for full functionality testing
