import { Suspense } from 'react';
import LandingPage from "@/components/LandingPage";
import { Metadata } from 'next';
import { educationalAppSchema, organizationSchema, faqSchema } from './structured-data';

export const metadata: Metadata = {
  title: 'VisionsAlign | AI-Powered Communication Strategy',
  description: 'Unlock executive influence and master every meeting with VisionsAlign. Our AI-powered platform helps you generate tailored communication strategies to persuade, influence, and succeed.',
  keywords: 'communication strategy, executive influence, stakeholder analysis, AI meeting prep, presentation skills, leadership communication',
  openGraph: {
    title: 'VisionsAlign | Engineering Resonance in Every Interaction',
    description: 'Generate AI-driven playbooks to understand stakeholders, tailor your message, and achieve your objectives in high-stakes meetings.',
    url: process.env.NEXTAUTH_URL,
    siteName: 'VisionsAlign',
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}/og-image.png`, // Replace with actual URL
        width: 1200,
        height: 630,
        alt: 'VisionsAlign - AI-Powered Communication Strategy for Leaders',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VisionsAlign | Master Your Meetings with AI Strategy',
    description: 'Stop guessing, start influencing. VisionsAlign gives you the AI-powered insights to win over any audience.',
    images: [`${process.env.NEXTAUTH_URL}/twitter-image.png`], // Replace with actual URL
  },
  alternates: {
    canonical: process.env.NEXTAUTH_URL,
  },
};

// Add structured data for better SEO
export default function Home(): JSX.Element {
  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPage />
      </Suspense>
    </>
  );
}
