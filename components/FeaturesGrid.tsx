/* eslint-disable @next/next/no-img-element */
import React from "react";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188a2.25 2.25 0 00-1.732-1.732L12 9l2.018-1.25a2.25 2.25 0 001.732-1.732L17 3.812l1.25 2.188a2.25 2.25 0 001.732 1.732L22.75 9l-2.018 1.25a2.25 2.25 0 00-1.732 1.732z" />
      </svg>
    ),
    title: "LinkedIn Profile Analysis",
    description:
      "Stop guessing how executives think. Our AI analyzes LinkedIn profiles to decode their communication style, decision-making patterns, and what resonates with them—before you ever step into the room.",
    styles: "bg-primary text-primary-content",
    demo: (
      <div className="overflow-hidden h-full flex items-stretch">
        <div className="w-full translate-x-12 bg-base-200 rounded-t-box h-full p-6">
          <p className="font-medium uppercase tracking-wide text-base-content/60 text-sm mb-3">
            Executive Profile Analysis
          </p>
          <div className="relative textarea py-4 h-full mr-12 bg-base-200 group-hover:bg-base-100 group-hover:border-base-content/10 text-base-content">
            <div className="absolute left-4 top-4 group-hover:hidden flex items-center ">
              <span>Analyzing</span>
              <span className="w-[2px] h-6 bg-primary animate-pulse"></span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 duration-500">
              Sarah Chen - VP Product
            </div>
            <div className="opacity-0 group-hover:opacity-100 duration-1000 flex items-center gap-0.5">
              <span>Data-driven, prefers concise updates</span>
              <span className="w-[2px] h-6 bg-primary animate-pulse"></span>
            </div>
            <button className="btn shadow-lg btn-primary absolute right-4 bottom-6 opacity-0 group-hover:opacity-100 duration-1000">
              Generate Playbook
            </button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Personalized Meeting Playbooks",
    description: "Walk into every meeting with confidence. Get step-by-step playbooks tailored to each executive's style, including talking points, questions to ask, and exactly how to present your ideas for maximum impact.",
    styles: "md:col-span-2 bg-base-300 text-base-content",
    demo: (
      <div className="px-6 max-w-[600px] flex flex-col gap-4 overflow-hidden">
        {[
          {
            text: "Q4 Budget Review with CFO",
            secondaryText: "Lead with ROI data, focus on cost savings",
            priority: "high",
            transition: "group-hover:-mt-36 group-hover:md:-mt-28 duration-500",
          },
          {
            text: "Product Roadmap Presentation",
            secondaryText: "Visual timeline, emphasize market impact",
            priority: "medium",
          },
          {
            text: "Stakeholder Alignment Meeting",
            secondaryText: "Collaborative approach, address concerns early",
            priority: "low",
          },
        ].map((playbook, i) => (
          <div
            className={`p-4 bg-base-100 text-base-content rounded-box flex justify-between mb-2 gap-4 ${playbook?.transition}`}
            key={i}
          >
            <div>
              <p className="font-semibold mb-1">{playbook.text}</p>
              <p className="text-base-content-secondary">
                {playbook.secondaryText}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                playbook.priority === "high" ? "bg-error text-error-content" :
                playbook.priority === "medium" ? "bg-warning text-warning-content" :
                "bg-success text-success-content"
              }`}
            >
              {playbook.priority}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Relationship Tracking",
    description: "Never lose momentum with key stakeholders. Track every interaction, remember personal details, and build genuine relationships that accelerate your career progression.",
    styles: "md:col-span-2 bg-base-100 text-base-content",
    demo: (
      <div className="flex left-0 w-full h-full pt-0 lg:pt-8 overflow-hidden -mt-4">
        <div className="-rotate-[8deg] flex min-w-max overflow-x-visible h-full lg:pt-4">
          {[
            {
              insight: "Communication Style",
              value: "Data-driven",
              css: "rotate-[6deg] bg-base-200 text-base-content w-72 h-72 -ml-10 -z-10 rounded-xl p-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300",
            },
            {
              insight: "Decision Factors",
              value: "ROI & Market Impact",
              css: "rotate-[4deg] bg-base-300 text-base-content w-72 h-72 -ml-10 -z-10 rounded-xl p-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300",
            },
            {
              insight: "Meeting Preferences",
              value: "Concise, agenda-driven",
              css: "rotate-[2deg] bg-base-100 text-base-content w-72 h-72 -ml-10 -z-10 rounded-xl p-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300",
            },
            {
              insight: "Career Focus",
              value: "Strategic Growth",
              css: "rotate-[0deg] bg-primary text-primary-content w-72 h-72 -ml-10 -z-10 rounded-xl p-4 opacity-100 scale-100 transition-all duration-300",
            },
            {
              insight: "Industry Background",
              value: "B2B SaaS Experience",
              css: "rotate-[-2deg] bg-secondary text-secondary-content w-72 h-72 -ml-10 -z-10 rounded-xl p-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300",
            },
            {
              insight: "Recent Posts",
              value: "AI & Product Strategy",
              css: "rotate-[-4deg] bg-accent text-accent-content w-72 h-72 -ml-10 -z-10 rounded-xl p-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300",
            },
            {
              insight: "Leadership Style",
              value: "Collaborative & Direct",
              css: "rotate-[-6deg] bg-neutral text-neutral-content w-72 h-72 -ml-10 -z-10 rounded-xl p-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300",
            },
          ].map((insight, i) => (
            <div className={insight.css} key={i}>
              <div className="font-medium uppercase tracking-wide text-base-content/60 text-sm mb-3">
                {insight.insight}
              </div>
              <div className="text-lg font-semibold">
                {insight.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Anxiety → Confidence Transformation",
    description: "Transform that pre-meeting anxiety into executive presence. Our confidence-building system helps you reframe nervous energy into powerful, authentic leadership communication.",
    styles: "bg-neutral text-neutral-content",
    demo: (
      <div className="text-neutral-content px-6 space-y-4">
        {[
          {
            id: 1,
            text: "The CFO responded positively to the ROI-focused presentation. She appreciated the concise data-driven approach.",
            userImg:
              "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
            userName: "Sarah Chen",
            role: "VP Product",
            createdAt: "2024-09-01T00:00:00Z",
          },
          {
            id: 2,
            text: "Your communication style analysis was spot-on. The CTO loved the technical depth and timeline approach.",
            userImg:
              "https://pbs.twimg.com/profile_images/1778434561556320256/knBJT1OR_400x400.jpg",
            userName: "Michael Rodriguez",
            role: "Senior PM",
            createdAt: "2024-09-02T00:00:00Z",
            transition:
              "opacity-0 group-hover:opacity-100 duration-500 translate-x-1/4 group-hover:translate-x-0",
          },
        ]?.map((insight) => (
          <div
            key={insight.id}
            className={`px-6 py-4 bg-neutral-content text-neutral rounded-box ${insight?.transition}`}
          >
            <div className="mb-2 whitespace-pre-wrap">{insight.text}</div>
            <div className="text-neutral/80 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-7 rounded-full">
                    <img src={insight.userImg} alt={insight.userName} />
                  </div>
                </div>
                <div className="font-medium">{insight.userName}</div>
                <div className="text-xs opacity-60">• {insight.role}</div>
              </div>
              •
              <div>
                {new Date(insight.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707-1.414-1.414l.707.707 1.414-1.414l.707.707"
        />
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
            From Imposter Syndrome to Executive Presence
          </h2>
          <p className="text-xl lg:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Maya, you're not alone in feeling anxious before executive meetings. Join thousands of women in tech who've transformed their confidence with AI-powered insights tailored for ambitious professionals like you.
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

        {/* Women in Tech Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="va-display text-3xl lg:text-4xl text-center mb-12 tracking-tight">
            Real Transformations from Women Like You
          </h3>
          <div className="va-grid-2">
            <div className="va-card-executive p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-accent font-bold">SJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Sarah Johnson</h4>
                  <p className="text-sm text-muted">Senior PM, Salesforce</p>
                </div>
              </div>
              <p className="text-lg text-secondary leading-relaxed italic">
                "I used to spend hours overthinking every executive interaction. VisionsAlign gave me the confidence to lead with authority. My promotion came 6 months faster than expected."
              </p>
            </div>
            
            <div className="va-card-executive p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-accent font-bold">LC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Lisa Chen</h4>
                  <p className="text-sm text-muted">Engineering Director, Stripe</p>
                </div>
              </div>
              <p className="text-lg text-secondary leading-relaxed italic">
                "The LinkedIn analysis revealed my CEO's communication style perfectly. I walked into that board meeting feeling prepared and powerful. Game changer for my career trajectory."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
