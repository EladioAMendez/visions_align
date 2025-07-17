import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        {/* Global navigation for product sections; includes links to features, pricing, and contact. */}
        {/* Microinteraction: Consider a subtle fade-in or slide-down animation on load. */}
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Prominent feature area with a headline, subheadline, and call-to-action button. */}
        <h1>Finally Understand It. Pass with Confidence.</h1>
        <p>
          Tired of hitting a study wall? Sage, your AI study partner, transforms frustrating test prep into clear, confident understanding.
          Get certified, launch your dream career, and leave anxiety behind.
        </p>
        {/* Imagery: A vibrant, yet calming image of a student (Jessica Miller type) with a serene expression, confidently interacting with a tablet or phone displaying a clean, conversational AI interface. The background subtly features elements of a classroom or a graduation cap, symbolizing her future. */}
        <div className="hero-image-placeholder"></div>
        {/* Microinteraction: A gentle pulse effect on the CTA button, and a subtle shimmer effect on the AI interface when it 'responds'. */}
        <button className="cta-button">Start Your Free 7-Day Trial (No Credit Card Required)</button>
      </section>

      {/* Value Proposition / Benefits Snapshot */}
      <section className="value-proposition-section">
        <h2>Unlock Your Potential. Experience the Difference.</h2>
        <div className="benefits-grid">
          {/* Microinteraction: A subtle 'fade-in-up' animation for each benefit as it appears on scroll, emphasizing clarity and progress. */}
          <div className="benefit-item">
            <h3>Break Through the Study Wall</h3>
            <p>No more confusing textbooks or vague explanations. Sage provides instant, clear, and personalized answers, guiding you step-by-step until it clicks.</p>
          </div>
          <div className="benefit-item">
            <h3>Reclaim Your Time & Sanity</h3>
            <p>Juggling work, student teaching, and coursework is tough. Sage fits into your life, turning wasted moments into productive study sessions – whether you have 5 minutes or an hour. Study on your terms, without the guilt.</p>
          </div>
          <div className="benefit-item">
            <h3>End the Isolation, Find Your Confidence</h3>
            <p>Studying alone can be lonely and discouraging. Sage is your patient, judgment-free study partner, available 24/7 to answer every question, no matter how many times you ask. Transform anxiety into unshakeable self-belief.</p>
          </div>
          <div className="benefit-item">
            <h3>Pass with Peace of Mind</h3>
            <p>Stop dreading exam day. Our comprehensive, adaptive learning system focuses on your weak spots, ensuring you walk into the testing center feeling fully prepared and deserving of success.</p>
          </div>
        </div>
      </section>

      {/* Social Proof (Customer Testimonials or Ratings) */}
      <section className="social-proof-section">
        <h2>Real Teachers. Real Success. Real Confidence.</h2>
        <div className="testimonials-carousel">
          {/* Microinteraction: A subtle carousel effect for testimonials, with a gentle 'pulse' animation on the star ratings to draw attention to the positive feedback. */}
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
        <h2>See How Understanding Clicks.</h2>
        <p>
          Experience Sage in action. Our interactive demo shows you exactly how effortless and effective personalized learning can be.
          Watch as complex concepts become clear, and your confidence grows with every question answered.
        </p>
        {/* Visual/Video Suggestion: A short (1-2 minute) animated video or interactive GIF carousel showcasing key interactions with Sage. */}
        {/* Microinteraction: The video player or GIF carousel itself could have subtle `shimmer` loading states. When a key concept is explained, a small, delightful `pulseOnCorrect` animation could appear on the relevant text or UI element within the simulated app screen. The overall flow should feel smooth and intuitive, reflecting the ease of use. */}
        <div className="video-placeholder"></div>
      </section>

      {/* Call-to-Action (Mid-page and Persistent) */}
      <section className="mid-page-cta-section">
        <p>
          Ready to transform your study experience and step into your teaching career with confidence?
          Join thousands of aspiring educators who are already finding clarity and success with Sage.
        </p>
        {/* Microinteraction: A persistent, sticky CTA button at the bottom of the screen that remains visible as the user scrolls, ensuring the call to action is always accessible. The button itself should have a subtle `pulse` animation to draw attention without being distracting. */}
        <button className="cta-button">Start Your Free 7-Day Trial Today!</button>
      </section>

      {/* Urgency or Special Offer (Optional) */}
      <section className="urgency-offer-section">
        <p>
          Don't let test anxiety hold you back any longer. Your dream classroom is waiting.
          For a limited time, unlock an exclusive bonus study guide when you start your free trial today!
        </p>
        {/* Microinteraction: A subtle, non-intrusive banner at the top of the page or integrated into the CTA section, perhaps with a gentle `shimmer` effect to highlight the limited-time offer. The text "Today Only" or "Limited Time" could have a slight `pulse` to emphasize urgency. */}
      </section>

      {/* Frequently Asked Questions */}
      <section className="faq-section">
        <h2>Your Questions, Answered.</h2>
        <p>
          We know you have questions, and we're here to provide clear, reassuring answers.
          Here are some common queries about Sage and how it can help you succeed.
        </p>
        {/* Microinteraction: An accordion-style FAQ section where clicking a question expands to reveal the answer, with a smooth animation for the expand/collapse action. The question text could subtly `pulse` when hovered over. */}
        <div className="faq-item">
          <h3>Q: Will I be charged after the free trial?</h3>
          <p>A: No. Your 7-day free trial gives you full access to Sage. You can continue on our flexible monthly plan or choose not to subscribe – no automatic charges, no hidden fees. Your peace of mind is our priority.</p>
        </div>
        <div className="faq-item">
          <h3>Q: Is Sage just another practice test?</h3>
          <p>A: Far from it! While practice is important, Sage goes beyond simply telling you if you're right or wrong. It's a conversational AI that explains <em>why</em> answers are correct, guides you through concepts you struggle with, and adapts to your learning style. It's a teacher, not just a verdict.</p>
        </div>
        <div className="faq-item">
          <h3>Q: Can I use Sage on my phone?</h3>
          <p>A: Absolutely! Sage is designed for seamless use on any device – phone, tablet, or computer. Study whenever and wherever it's convenient for you, turning even short breaks into productive learning sessions.</p>
        </div>
        <div className="faq-item">
          <h3>Q: How is Sage different from my textbook?</h3>
          <p>A: Think of Sage as the interactive, patient tutor your textbook wishes it could be. Instead of rereading confusing paragraphs, you can ask Sage to explain concepts in a different way, provide examples, or break down complex problems step-by-step. It's active learning, not passive reading.</p>
        </div>
      </section>

      {/* Final CTA / Sign-Up Section */}
      <section className="final-cta-section">
        <h2>Your Dream Classroom Awaits. Take the First Step.</h2>
        <p>
          You've worked tirelessly to get here. Don't let one test stand between you and the career you've always dreamed of.
          With Sage, you'll gain the understanding, the confidence, and the certification you deserve. It's time to stop worrying and start teaching.
        </p>
        {/* Microinteraction: A visually clean background for this section, with a subtle `retro-grid` or `particles` background effect (from Vanta.js or React Bits) to create a modern, engaging feel without distracting from the CTA. The CTA button should be brightly colored and use a `confetti` effect (from React Bits) upon successful submission of the form, providing positive reinforcement. */}
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


