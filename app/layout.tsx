import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import dynamic from "next/dynamic";
import "./globals.css";

// Dynamically import our layout component to avoid SSR issues with useEffect
const Layout = dynamic(() => import("@/components/layout/Layout"), { ssr: false });

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
	// Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="visionsalign">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Master executive communication with VisionsAlign - AI-powered insights that decode executive communication styles and generate personalized meeting playbooks for career advancement." />
        <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta name="theme-color" content="#1A2332" />
      </head>
      <body className="bg-background text-primary font-sans">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
