# VisionsAlign

VisionsAlign is the AI co-pilot for ambitious professionals. We translate stakeholder psychology into actionable communication strategies, ensuring your ideas don't just get heard—they get championed. This project is a full-stack SaaS application built with a modern, robust, and scalable tech stack.

## ✨ Features

-   **AI-Powered Playbooks**: Generates sophisticated stakeholder analysis and communication strategies.
-   **Tiered Subscriptions**: Offers different levels of access and features through Stripe integration.
-   **Secure Authentication**: Handles user sign-up, sign-in, and account management with NextAuth.js, supporting both magic links (email) and Google OAuth.
-   **Pre-Beta Mode**: Allows for controlled access during testing phases, replacing the pricing section with a beta access request form.
-   **Admin Dashboard**: Provides a dedicated interface for administrators to manage the application.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) ORM
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **Payments**: [Stripe](https://stripe.com/)
-   **Transactional Emails**: [Resend](https://resend.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
-   **Deployment**: [Netlify](https://www.netlify.com/)

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

## ☁️ Deployment

The application is configured for deployment on [Netlify](https://www.netlify.com/). The build process automatically runs `prisma generate` thanks to the `postinstall` script in `package.json`, ensuring the Prisma Client is correctly generated in the deployment environment.
