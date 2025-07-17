import { Suspense } from 'react';
import LandingPage from "@/components/LandingPage";
import { Metadata } from 'next';
import { educationalAppSchema, organizationSchema, faqSchema } from './structured-data';

export const metadata: Metadata = {
  title: 'TeachingDream | Your AI Study Partner for FTCE',
  description: 'Transform your FTCE exam preparation with Sage, the AI-powered conversational study partner that helps you understand complex concepts, study on your schedule, and pass with confidence.',
  keywords: 'teacher certification, FTCE exam, AI tutor, study help, teaching exam prep, Florida Teacher Certification, Sage AI, conversational learning',
  openGraph: {
    title: 'TeachingDream | Pass the FTCE with Your 24/7 AI Study Partner',
    description: 'Get personalized help from Sage, the AI study partner that helps aspiring teachers understand complex concepts and pass the FTCE with confidence.',
    url: 'https://teachingdream.com',
    siteName: 'TeachingDream',
    images: [
      {
        url: 'https://teachingdream.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TeachingDream - Transform anxiety into confidence with Sage AI',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeachingDream | Your AI Study Partner for FTCE',
    description: 'Transform anxiety into confidence with Sage, your AI study partner for FTCE exam prep.',
    images: ['https://teachingdream.com/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://teachingdream.com',
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
