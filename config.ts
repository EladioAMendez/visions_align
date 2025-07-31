import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "VisionsAlign",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "AI-powered microservice that decodes executive communication styles and generates personalized meeting playbooks for career advancement.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "visionsalign.com",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // PRO PLAN - STAKEHOLDER PLAYBOOK
        // The priceId is coming from your Stripe dashboard. You can get it by clicking on the product > pricing.
        // This is used to display the pricing table and to create the checkout session.
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
        isFeatured: true,
        name: "Pro",
        description: "Stakeholder Playbook: Deep-dive analysis to help you win the meeting.",
        price: 29,
        priceAnchor: 49,
        features: [
          { name: "6 AI Expert Personas" },
          { name: "Stakeholder-focused analysis" },
          { name: "Analyze up to 10 stakeholders/month" },
          { name: "Generate unlimited playbooks" },
          { name: "Calendar Integration" },
        ],
      },
      {
        // DIRECTOR PLAN - RELATIONSHIP PLAYBOOK
        // The priceId is coming from your Stripe dashboard. You can get it by clicking on the product > pricing.
        // This is used to display the pricing table and to create the checkout session.
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_DIRECTOR,
        name: "Director",
        description: "Relationship Playbook: Comparative analysis to help you win the promotion.",
        price: 49,
        priceAnchor: 99,
        features: [
          { name: "Everything in Pro, plus:" },
          { name: "Exclusive 'The Connector' AI persona" },
          { name: "User + Stakeholder comparative analysis" },
          { name: "Communication style synergy mapping" },
          { name: "Analyze unlimited stakeholders" },
          { name: "Priority Support" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `VisionsAlign <noreply@resend.visionsalign.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `VisionsAlign Team <team@resend.visionsalign.com>`,
    // Email shown to customer if they need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "socrates.73@gmail.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you use any theme other than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users to after a successful login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
  preBeta: {
    // Pre-beta mode settings
    enabled: process.env.NEXT_PUBLIC_PRE_BETA_MODE === 'true',
    betaAccessEmail: 'beta-access@visionsalign.com',
    // Admin emails are handled via ADMIN_EMAILS environment variable
  },
} as ConfigProps;

export default config;
