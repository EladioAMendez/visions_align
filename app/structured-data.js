/**
 * Structured data for TeachingDream.com using Next.js 13 App Router approach
 */

// Educational app structured data
export const educationalAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sage by TeachingDream",
  "applicationCategory": "EducationalApplication",
  "offers": {
    "@type": "Offer",
    "price": "10.00",
    "priceCurrency": "USD",
    "description": "Starting at $10/month for text-only access. $19/month for voice access."
  },
  "description": "AI-powered conversational study partner for aspiring teachers preparing for the Florida Teacher Certification Examinations (FTCE).",
  "operatingSystem": "Web",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  },
  "featureList": "24/7 AI study partner, Voice & Text interactions, Personalized learning, Targeted FTCE preparation"
};

// Organization structured data
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TeachingDream",
  "url": "https://teachingdream.com",
  "logo": "https://teachingdream.com/logo.png",
  "description": "EdTech platform helping aspiring teachers prepare for certification exams through AI-powered conversational learning.",
  "sameAs": [
    "https://twitter.com/teachingdream",
    "https://facebook.com/teachingdream",
    "https://instagram.com/teachingdream"
  ]
};

// FAQs structured data
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Sage by TeachingDream?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sage is an AI-powered conversational study partner designed specifically to help aspiring teachers prepare for the Florida Teacher Certification Examinations (FTCE). Available 24/7 via text and voice, Sage helps you understand complex concepts through natural conversation."
      }
    },
    {
      "@type": "Question",
      "name": "How much does TeachingDream cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TeachingDream offers a free 7-day trial, after which plans start at $10/month for text-only access, or $19/month for both text and voice access to Sage."
      }
    },
    {
      "@type": "Question",
      "name": "Can Sage help me prepare for specific FTCE subjects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Sage is trained on the complete FTCE curriculum, including all subject areas, professional education test, and general knowledge test. Simply ask about any topic you're struggling with."
      }
    },
    {
      "@type": "Question",
      "name": "How does Sage differ from traditional study methods?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike static textbooks or video courses, Sage provides a conversational experience. You can ask follow-up questions, request clearer explanations, and engage in a natural dialogue that adapts to your understanding."
      }
    }
  ]
};
