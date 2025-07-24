/* eslint-disable @next/next/no-img-element */
import React from "react";

const features = [
  {
    title: "Decode Stakeholder Psychology",
    description: "Go beyond surface-level data. Our AI team identifies the core motivations, communication styles, and decision triggers of any stakeholder.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243a3 3 0 01-4.243-4.243" />
      </svg>
    ),
  },
  {
    title: "Eliminate Pre-Meeting Anxiety",
    description: "Replace guesswork and late-night rehearsals with the calm confidence that comes from a data-driven, actionable plan.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Build Career Momentum",
    description: "Turn every high-stakes meeting into a sponsorship opportunity, build stronger relationships, and accelerate your path to leadership.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];
const FeaturesGrid = () => {
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-8 va-section-standard">
        <div className="text-center mb-20 lg:mb-32">
          <h2 className="va-display text-4xl lg:text-6xl mb-8 tracking-tight">
            More Than a Tool—It's Your AI Brain Trust
          </h2>
          <p className="text-xl lg:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Every analysis is powered by a team of six interacting AI experts, giving you an unparalleled strategic edge.
          </p>
        </div>

        <div className="va-grid-3 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="va-card-feature va-hover-executive va-fade-in-up"
            >
              <div className="va-icon-feature mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-4">{feature.title}</h3>
              <p className="text-lg text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default FeaturesGrid;
