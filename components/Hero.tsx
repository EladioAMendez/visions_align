import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-background flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-32 px-8 py-20 lg:py-32 va-section-standard">
      <div className="flex flex-col gap-12 lg:gap-16 items-center justify-center text-center lg:text-left lg:items-start max-w-2xl lg:max-w-none">
        <h1 className="va-display text-5xl lg:text-7xl tracking-tight leading-tight">
          From Pre-Meeting Anxiety
          <br />
          <span className="text-accent">To Executive Confidence</span>
        </h1>
        <p className="text-xl lg:text-2xl text-secondary leading-relaxed max-w-xl lg:max-w-2xl">
          Maya, imagine walking into every executive meeting knowing exactly how to communicate with confidence. VisionsAlign analyzes LinkedIn profiles to decode communication styles and generates personalized meeting playbooks that transform anxiety into executive presence.
        </p>
        <a
          href="#pricing"
          className="va-btn-primary-executive"
        >
          Start Your Free Trial
        </a>

        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
          alt="VisionsAlign product demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
