import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        {/* Global navigation for product sections; includes links to Features, Benefits, Testimonials, Product Showcase, FAQs, Pricing, and Contact. */}
        {/* Microinteraction: Consider a subtle fade-in or slide-down animation on load. */}
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#benefits">Benefits</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#product-showcase">Product Showcase</a></li>
          <li><a href="#faqs">FAQs</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Prominent feature area with a headline, subheadline, and call-to-action button. */}
        <h1>Stop Hitting the Study Wall. Start Teaching.</h1>
        <p className="hero-subtext">
          That knot of anxiety? The endless rereading? Sage, your AI study partner from TeachingDream.com, dissolves it all by familiarizing you with question types and walking you through content conversationally.
          Get certified. Confidently. Your dream classroom awaits.
        </p>
        {/* Imagery: A vibrant, yet calming image of a student (Jessica Miller type) with a serene expression, confidently interacting with a tablet or phone displaying a clean, conversational AI interface. The background subtly features elements of a classroom or a graduation cap, symbolizing her future. */}
        <div className="hero-image-placeholder ai-response shimmer"></div>
        {/* Microinteraction: The CTA button pulses gently (React Bits `pulse` effect), while Sage's responses in the AI interface appear with a subtle shimmer (MagicUI `shimmer` effect) as if materializing with clarity. */}
        <button className="cta-button pulse">Start Your Free 7-Day Trial (No Credit Card Required)</button>
      </section>

      {/* Value Proposition / Benefits Snapshot */}
      <section className="value-proposition-section">
        <h2>Finally, Understanding Clicks.</h2>
        <div className="benefits-grid">
          {/* Microinteraction: Each benefit card appears with a smooth `fade-in-up` animation (MagicUI/React Bits) as the user scrolls, emphasizing clarity and progress. */}
          <div className="benefit-item">
            <h3>Break Through the Study Wall</h3>
            <p>No more vague explanations. Sage delivers instant, personalized answers that <em>click</em>. We'll guide you, step-by-step, until you truly understand.</p>
          </div>
          <div className="benefit-item">
            <h3>Reclaim Your Time & Sanity</h3>
            <p>Juggling life is hard. Sage fits into <em>your</em> schedule, turning wasted moments into powerful study sessions. Five minutes waiting for coffee? That's a productive learning session. No guilt. Just progress.</p>
          </div>
          <div className="benefit-item">
            <h3>End the Isolation, Find Your Confidence</h3>
            <p>Studying alone is lonely. Sage is your infinitely patient, judgment-free study partner, available 24/7. Ask anything, anytime. Transform that imposter syndrome into unshakeable self-belief.</p>
          </div>
          <div className="benefit-item">
            <h3>Pass with Peace of Mind</h3>
            <p>Stop dreading exam day. Our adaptive system targets <em>your</em> weak spots, ensuring you walk into the testing center feeling prepared, capable, and deserving of success.</p>
          </div>
        </div>
      </section>

      {/* Social Proof (Customer Testimonials or Ratings) */}
      <section className="social-proof-section">
        <h2>Real Teachers. Real Confidence. Real Stories.</h2>
        <div className="testimonials-carousel">
          {/* Microinteraction: Testimonials cycle smoothly in a carousel (React Bits `Carousel` component), with star ratings subtly pulsing (React Bits `pulse` effect) to draw attention to the overwhelming positive feedback. */}
          <div className="testimonial-item">
            <p>"Before TeachingDream.com, I was drowning in textbooks and self-doubt. Now, I actually <em>understand</em> the material, and I'm walking into my FTCE exam with a quiet confidence I never thought possible. This app changed everything!"</p>
            <p className="author">- Sarah L., Aspiring Elementary Teacher</p>
          </div>
          <div className="testimonial-item">
            <p>"I used to hit a wall every time I tried to study math. Sage broke it down for me in a way that finally clicked. It's like having a personal tutor available 24/7, without the judgment or the crazy price tag."</p>
            <p className="author">- Michael P., Student Teacher</p>
          </div>
          <div className="testimonial-item">
            <p>"The best part? No more feeling alone. Sage is always there to help, even at 2 AM when I'm panicking about a concept. It's truly a dream come true for busy students like me."</p>
            <p className="author">- Jessica M., Future Educator</p>
          </div>
        </div>
        <div className="ratings-mentions">
          <p>★★★★★ on App Store</p>
          <p>"Featured in 'Top EdTech Innovations for 2025'" - <em>TeachingDream.com</em></p>
        </div>
      </section>

      {/* Product Showcase (Visual or Video) */}
      <section className="product-showcase-section">
        <h2>See Understanding Happen.</h2>
        <p>
          Watch Sage in action. Our interactive demo reveals how effortless and effective personalized learning can be.
          See complex concepts clarify, and your confidence grow with every question answered.
        </p>
        {/* Visual/Video Suggestion: A short (1-2 minute) animated video or interactive GIF carousel. It starts with a frustrated Jessica, then transitions to her confidently interacting with Sage on her phone during a short break. Highlight: */}
        {/* The "Ask Anything" Moment": A quick shot of typing a confusing question (e.g., "distributive property") into the chat. (Microinteraction: Text input with a subtle `typing` animation from 21st.dev.) */}
        {/* The Conversational Explanation: Show Sage's multi-turn, Socratic dialogue, with text appearing smoothly (MagicUI `fadeInUp` animation). */}
        {/* The "Click" Moment: A visual representation of understanding – perhaps a lightbulb icon or a subtle `pulseOnCorrect` animation (from the brand's proposed animations) on the screen when a concept is grasped. */}
        {/* Progress Tracking: A brief glimpse of a clean dashboard (using `shadcn/ui` components) showing progress and identified weak spots. */}
        {/* Anytime, Anywhere: Show the app being used seamlessly on a mobile device in different contexts. */}
        <div className="video-placeholder"></div>
      </section>

      {/* Call-to-Action (Mid-page and Persistent) */}
      <section className="mid-page-cta-section">
        <p>
          Ready to transform your study experience and step into your teaching career with confidence?
          Join thousands of aspiring educators who are already finding clarity and success with Sage.
        </p>
        {/* Microinteraction: A persistent, sticky CTA button at the bottom of the screen (React Bits `StickyButton` component) remains visible as the user scrolls, ensuring constant accessibility. The button itself pulses gently (React Bits `pulse` effect) to draw attention without distraction. */}
        <button className="cta-button">Start Your Free 7-Day Trial Today!</button>
      </section>

      {/* Urgency or Special Offer (Optional) */}
      <section className="urgency-offer-section">
        <p>
          Don't let test anxiety hold you back. Your dream classroom is waiting.
          For a limited time, unlock an exclusive bonus study guide when you start your free trial today!
        </p>
        {/* Microinteraction: A subtle, non-intrusive banner at the top of the page or integrated into the CTA section, perhaps with a gentle `shimmer` effect (MagicUI) to highlight the limited-time offer. The text "Today Only" or "Limited Time" could have a slight `pulse` (React Bits) to emphasize urgency. */}
      </section>

      {/* Frequently Asked Questions */}
      <section className="faq-section">
        <h2>Your Questions, Answered. Your Doubts Dissolved.</h2>
        <p>
          We know you have questions. We're here to provide clear, reassuring answers.
          Here are common queries about Sage and how it will help you succeed.
        </p>
        {/* Microinteraction: An accordion-style FAQ section (shadcn/ui `Accordion` component) where clicking a question expands to reveal the answer with a smooth animation. The question text could subtly `pulse` (React Bits) when hovered over. */}
        <div className="faq-item">
          <h3>Q: Will I be charged after the free trial?</h3>
          <p>A: No. Your 7-day free trial gives you full access to Sage. Continue on our flexible monthly plan or choose not to subscribe – no automatic charges, no hidden fees. Your peace of mind is our priority.</p>
        </div>
        <div className="faq-item">
          <h3>Q: Is Sage just another practice test?</h3>
          <p>A: Far from it! Sage goes beyond right/wrong. It's a conversational AI that explains <em>why</em> answers are correct, guides you through concepts you struggle with, and adapts to <em>your</em> learning style. It's a teacher, not just a verdict.</p>
        </div>
        <div className="faq-item">
          <h3>Q: Can I use Sage on my phone?</h3>
          <p>A: Absolutely! Sage is designed for seamless use on any device – phone, tablet, computer. Study whenever, wherever. Turn short breaks into productive learning sessions.</p>
        </div>
        <div className="faq-item">
          <h3>Q: How is Sage different from my textbook?</h3>
          <p>A: Think of Sage as the interactive, patient tutor your textbook wishes it could be. Instead of rereading confusing paragraphs, ask Sage to explain concepts differently, provide examples, or break down complex problems. It's active learning, not passive reading.</p>
        </div>
      </section>

      {/* Final CTA / Sign-Up Section */}
      <section className="final-cta-section">
        <h2>Your Dream Classroom Awaits. Take the First Step.</h2>
        <p>
          You've worked tirelessly. Don't let one test stand between you and your dream career.
          With Sage, you'll gain the understanding, the confidence, and the certification you deserve. Stop worrying. Start teaching.
        </p>
        {/* Microinteraction: A visually clean background for this section, with a subtle `retro-grid` or `particles` background effect (Vanta.js) to create a modern, engaging feel without distracting from the CTA. The CTA button should be brightly colored and use a `confetti` effect (React Bits `ConfettiButton` component) upon successful submission, providing positive reinforcement. */}
        <button className="cta-button">Get Started with Your Free Trial Now!</button>
        {/* Sign-Up Form (Optional): A simple email input field with a prominent "Get Started" button. */}
        <div className="signup-form-placeholder">
          <input type="email" placeholder="Your Email Address" />
          <button>Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        {/* Additional links, contact information, and social media icons. */}
        <p>&copy; {new Date().getFullYear()} TeachingDream.com. All rights reserved.</p>
        <ul>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms of Service</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default LandingPage;


