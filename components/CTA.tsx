import Image from "next/image";
import config from "@/config";

const CTA = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-accent va-section-standard">
      <div className="absolute inset-0 bg-primary/80"></div>
      <div className="relative max-w-4xl mx-auto px-8 text-center">
        <h2 className="va-display text-4xl lg:text-6xl text-white mb-8 tracking-tight">
          Ready to Walk Into Your Next Meeting With Confidence?
        </h2>
        <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Maya, imagine never feeling that pre-meeting anxiety again. Join hundreds of ambitious women in tech who've transformed their executive presence and accelerated their careers with VisionsAlign.
        </p>
        <a
          href="#pricing"
          className="va-btn-accent-executive"
        >
          Start Your Free Trial
        </a>
      </div>
    </section>
  );
};

export default CTA;
