"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "Will this help with my pre-meeting anxiety?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Absolutely. Maya, we designed VisionsAlign specifically for women who feel that knot in their stomach before executive meetings. You'll get personalized playbooks that eliminate the guesswork and give you the confidence that comes from being fully prepared.</p>
        <p>Our users report a 73% reduction in pre-meeting anxiety within the first month.</p>
      </div>
    ),
  },
  {
    question: "How does the LinkedIn analysis work?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Our AI analyzes LinkedIn profiles to decode communication styles, decision-making patterns, and what resonates with each executive. You'll know exactly how to frame your ideas, what questions to ask, and how to present yourself for maximum impact.</p>
        <p>It takes 30 seconds to analyze a profile and generates insights you can't get anywhere else.</p>
      </div>
    ),
  },
  {
    question: "Is this designed for women in tech specifically?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Yes. While our tools work for everyone, we've built VisionsAlign with insights from hundreds of successful women in tech who've navigated the unique challenges of male-dominated executive rooms.</p>
        <p>You'll join a community of ambitious women supporting each other's rise to leadership.</p>
      </div>
    ),
  },
  {
    question: "How quickly will I see career results?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Most users see immediate improvements in their confidence and executive presence. Career advancement typically follows within 3-6 months as you build stronger relationships and demonstrate consistent leadership communication.</p>
        <p>Sarah from Salesforce got promoted 6 months faster than expected. Lisa from Stripe landed a board presentation that changed her career trajectory.</p>
      </div>
    ),
  },
  {
    question: "What if I'm not naturally confident?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Neither were most of our successful users. Confidence isn't something you're born with—it's something you build through preparation and proven strategies. VisionsAlign gives you the tools to develop authentic executive presence, even if you currently struggle with imposter syndrome.</p>
        <p>Our anxiety-to-confidence transformation system has helped hundreds of women find their executive voice.</p>
      </div>
    ),
  },
  {
    question: "Can I get a refund if it doesn't work for me?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Absolutely. We offer a 30-day money-back guarantee because we're confident in the transformation VisionsAlign delivers. If you don't see improvements in your confidence and executive communication within 30 days, we'll refund your investment.</p>
        <p>Email us at maya@visionsalign.com with any questions or concerns.</p>
      </div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
