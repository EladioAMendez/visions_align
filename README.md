# VisionsAlign

VisionsAlign is the AI co-pilot for ambitious professionals. We translate stakeholder psychology into actionable communication strategies, ensuring your ideas don't just get heard—they get championed. This project is a full-stack web application built with Next.js, Tailwind CSS, and MongoDB.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Payments**: [Stripe](https://stripe.com/)
-   **Deployment**: Assumed to be Vercel or similar.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud)

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

    Create a `.env` file in the root of the project and add the necessary environment variables. You will need to provide your own values for these.

    ```env
    # MongoDB
    MONGODB_URI=

    # NextAuth.js
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=http://localhost:3000

    # Add any other required variables for services like Stripe, Resend, etc.
    STRIPE_SECRET_KEY=
    STRIPE_WEBHOOK_SECRET=
    RESEND_API_KEY=
    ```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Runs the linter to check for code quality issues.
