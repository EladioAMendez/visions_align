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
    question: "Is this just another personality test?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>No. Personality tests are static and generic. VisionsAlign provides dynamic, context-aware intelligence. Our AI Brain Trust analyzes specific stakeholders for specific meetings, giving you actionable tactics, not just broad personality traits. It's the difference between a map and a GPS.</p>
      </div>
    ),
  },
  {
    question: "How is this different from ChatGPT?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>ChatGPT is a general-purpose tool. VisionsAlign is a specialist. We've trained our AI on a proprietary dataset of executive communication patterns, negotiation strategies, and psychological drivers of influence. You get a team of six expert AI personas collaborating on your behalf—something a general model can't replicate.</p>
      </div>
    ),
  },
  {
    question: "What kind of data do you connect to?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>For stakeholder analysis, you can start with just a LinkedIn profile URL. To generate a meeting playbook, you can connect your calendar, upload meeting agendas, or simply describe the meeting's context and goals. The more context you provide, the more precise the playbook will be.</p>
      </div>
    ),
  },
  {
    question: "Is my data secure?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>Yes. We use enterprise-grade encryption and follow strict data privacy protocols. Your inputs are used solely to generate your private playbooks and are never used for training our models. Your career strategy is yours alone.</p>
      </div>
    ),
  },
  {
    question: "How long does it take to get a playbook?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>From connecting your data to a ready-to-use playbook takes about 90 seconds. Our goal is to make high-level strategic preparation accessible and efficient, eliminating hours of manual research and anxiety.</p>
      </div>
    ),
  },
  {
    question: "What if I'm not satisfied?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>We offer a 30-day, no-questions-asked money-back guarantee. We are confident that VisionsAlign will provide immense value, but if you're not satisfied for any reason, we'll issue a full refund.</p>
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
