import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-32 px-8 py-20 lg:py-32 va-section-standard">
      <div className="flex flex-col gap-12 lg:gap-16 items-center justify-center text-center lg:text-left lg:items-start max-w-2xl lg:max-w-none">
        <h1 className="va-display text-5xl lg:text-7xl tracking-tight leading-tight">
          Engineer Resonance.
          <br />
          <span className="text-accent">Win Executive Buy-In.</span>
        </h1>
        <p className="text-xl lg:text-2xl text-secondary leading-relaxed max-w-xl lg:max-w-2xl">
          VisionsAlign is the AI co-pilot for ambitious professionals. We translate stakeholder psychology into actionable communication strategies, ensuring your ideas don't just get heard—they get championed.
        </p>
        <a href="#pricing" className="btn btn-primary btn-lg">
          Get Your First Playbook Free
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
