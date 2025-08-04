import { Suspense } from 'react';
import LandingPage from "@/components/LandingPage";
import { Metadata } from 'next';
import { educationalAppSchema, organizationSchema, faqSchema } from './structured-data';
import { appConfig } from '@/libs/config';

export const metadata: Metadata = {
  title: appConfig.seo.title,
  description: appConfig.seo.description,
  keywords: [...appConfig.seo.keywords],
  openGraph: {
    title: appConfig.seo.title,
    description: appConfig.seo.description,
    url: appConfig.url,
    siteName: appConfig.name,
    images: [
      {
        url: appConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: appConfig.seo.title,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: appConfig.seo.title,
    description: appConfig.seo.description,
    images: [appConfig.seo.twitterImage],
  },
  alternates: {
    canonical: appConfig.url,
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
