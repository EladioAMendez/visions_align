
import React, { useState } from 'react';
import './App.css'; // Assuming App.css will contain the styles

// Utility component for icons (replace with actual icon library like Font Awesome or React Icons)
const Icon = ({ name, className }) => <span className={`icon ${className}`}>{name}</span>;

const App = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">VisionsAlign</div>
          <ul className="nav-links">
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#pricing" className="nav-link">Pricing</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Persistent CTA (Sticky Header) */}
      <div className="sticky-cta-bar">
        <div className="container">
          <button className="btn btn-primary sticky-cta-btn">Start Free Trial</button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-headline">Unlock Your Executive Influence. Master Every Meeting.</h1>
            <p className="hero-subtext">
              Transform anxiety into strategic advantage. VisionsAlign decodes leadership styles and crafts personalized playbooks, so you walk into every VP conversation with calm confidence and a clear path to promotion.
            </p>
            <button className="btn btn-primary hero-cta-btn">
              Get Your Free Playbook Today!
            </button>
            {/* Microinteraction text - dynamically shown/hidden via CSS/JS */}
            <p className="hero-cta-info">No credit card required. Start your journey to influence now!</p>
          </div>
          <div className="hero-image">
            {/* Replace with actual image paths */}
            <img src="/images/maya-stressed.png" alt="Stressed professional" className="image-before" />
            <img src="/images/maya-confident.png" alt="Confident professional" className="image-after" />
          </div>
        </div>
      </section>

      {/* Urgency/Special Offer (Optional) */}
      <section className="urgency-offer-section">
        <div className="container">
          <h2 className="section-headline">Don't Miss Your Moment to Lead.</h2>
          <p className="offer-text">
            Unlock your first month of VisionsAlign Premium for <strong>20% off</strong> when you sign up <strong>today!</strong> This exclusive offer is for the next 48 hours only to help you prepare for your next critical executive meeting.
          </p>
          <div className="countdown-timer">48:00:00</div>
          <p className="fomo-text">Join thousands of leaders like you who are already transforming their careers. Don't get left behind!</p>
          <button className="btn btn-success offer-cta-btn">Claim Your Discount Now</button>
        </div>
      </section>

      {/* Value Proposition / Benefits Snapshot */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-headline">Your Strategic Advantage, Delivered in Minutes.</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <Icon name="brain-lightning" className="benefit-icon" />
              <h3>Decode Leadership Styles Instantly.</h3>
              <p>Uncover the communication preferences, values, and decision triggers of any stakeholder from their LinkedIn profile. No more guesswork.</p>
            </div>
            <div className="benefit-item">
              <Icon name="playbook" className="benefit-icon" />
              <h3>Generate Bespoke Meeting Playbooks.</h3>
              <p>Walk into every conversation with a custom-tailored agenda, talking points, and rapport-building strategies. Feel prepared, not panicked.</p>
            </div>
            <div className="benefit-item">
              <Icon name="heart-arrow" className="benefit-icon" />
              <h3>Boost Your Confidence & Influence.</h3>
              <p>Transform pre-meeting anxiety into calm confidence. Build stronger relationships and accelerate your career with every interaction.</p>
            </div>
            <div className="benefit-item">
              <Icon name="clock-fast" className="benefit-icon" />
              <h3>Save Hours of Prep Time.</h3>
              <p>Stop the late-night rehearsals and endless second-guessing. Get actionable insights in minutes, so you can focus on what matters most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof-section">
        <div className="container">
          <h2 className="section-headline">Real Stories. Real Impact. Real Confidence.</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="quote">
                "Before VisionsAlign, I was stuck in a cycle of anxiety before every VP meeting. Now, I walk in with a clear agenda and genuine confidence. It's not just a tool; it's my secret weapon for career momentum."
              </p>
              <p className="author">- Maya C., Senior Product Manager, Fortune 500 Tech</p>
            </div>
            <div className="testimonial-card">
              <p className="quote">
                "This app changed how I approach leadership. The insights are uncanny, and the playbooks are gold. I feel so much more in control of my career trajectory."
              </p>
              <p className="author">- Sarah L., Director of Engineering, Tech Startup</p>
            </div>
          </div>
          <p className="credibility-text">Trusted by ambitious professionals at leading companies worldwide.</p>
          <div className="company-logos">
            {/* Replace with actual company logos */}
            <img src="/images/company-logo-1.png" alt="Company Logo 1" />
            <img src="/images/company-logo-2.png" alt="Company Logo 2" />
            <img src="/images/company-logo-3.png" alt="Company Logo 3" />
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="product-showcase-section">
        <div className="container">
          <h2 className="section-headline">See VisionsAlign in Action. Your Path to Influence.</h2>
          <div className="video-placeholder">
            {/* Replace with actual video embed or player component */}
            <p>Video showcasing VisionsAlign in action (Before/After transformation)</p>
          </div>
          <p className="video-summary">
            Experience the power of VisionsAlign.com. Our intuitive platform analyzes key stakeholder profiles, revealing their communication preferences and decision-making styles. We then generate custom meeting playbooks, equipping you with actionable insights and personalized strategies for every executive interaction. Transform your approach, build stronger relationships, and accelerate your career with confidence. See how VisionsAlign turns guesswork into strategic success, helping you achieve your professional goals with ease. From understanding a leader's visual preferences to crafting the perfect opening line, VisionsAlign provides the clarity and confidence you need to excel.
          </p>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="mid-page-cta-section">
        <div className="container">
          <button className="btn btn-primary mid-page-cta-btn">Ready for Your Strategic Advantage? Get Started Free!</button>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-headline">Your Questions, Answered.</h2>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(0)}>
                Q: Is my data private and secure?
                <span className={`faq-arrow ${activeFaq === 0 ? 'expanded' : ''}`}>&#9660;</span>
              </div>
              <div className={`faq-answer ${activeFaq === 0 ? 'show' : ''}`}>
                <p>A: Absolutely. We prioritize your privacy and data security. All LinkedIn profile data is processed with the highest encryption standards and is never shared with third parties. Your insights are yours alone.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(1)}>
                Q: Will I be charged after the free trial?
                <span className={`faq-arrow ${activeFaq === 1 ? 'expanded' : ''}`}>&#9660;</span>
              </div>
              <div className={`faq-answer ${activeFaq === 1 ? 'show' : ''}`}>
                <p>A: No, you will not be automatically charged. Our free trial is genuinely free, no credit card required. You can continue on our free plan with limited features, or choose to upgrade to a premium subscription when you’re ready to unlock full power.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(2)}>
                Q: How quickly can I get insights for my next meeting?
                <span className={`faq-arrow ${activeFaq === 2 ? 'expanded' : ''}`}>&#9660;</span>
              </div>
              <div className={`faq-answer ${activeFaq === 2 ? 'show' : ''}`}>
                <p>A: VisionsAlign is designed for speed. You can typically generate a comprehensive meeting playbook within minutes of inputting a LinkedIn profile. Get actionable guidance exactly when you need it.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(3)}>
                Q: Can VisionsAlign help me with internal team communication too?
                <span className={`faq-arrow ${activeFaq === 3 ? 'expanded' : ''}`}>&#9660;</span>
              </div>
              <div className={`faq-answer ${activeFaq === 3 ? 'show' : ''}`}>
                <p>A: While primarily focused on external executive interactions, the principles of understanding communication styles can absolutely be applied to internal team dynamics. Many users find our insights valuable for improving cross-functional collaboration and building stronger internal relationships.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA / Sign-Up Section */}
      <section className="final-cta-section">
        <div className="container">
          <h2 className="section-headline">Ready to Align Your Vision with Influence?</h2>
          <p className="encouraging-text">
            Stop rehearsing at 2 a.m. and start leading with confidence. VisionsAlign is your system for predictable career momentum and authentic influence. Your next breakthrough is just a click away.
          </p>
          <div className="signup-form">
            <input type="email" placeholder="Email Address" className="email-input" />
            <button className="btn btn-success signup-btn">Get Your Free Playbook Now!</button>
          </div>
          <p className="reiterate-offer">No credit card required. Start your journey to influence today!</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href="#" className="footer-link">Home</a>
            <a href="#" className="footer-link">Features</a>
            <a href="#" className="footer-link">Pricing</a>
            <a href="#" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
          <div className="social-icons">
            {/* Replace with actual social media icons */}
            <a href="#" className="social-icon">LinkedIn</a>
            <a href="#" className="social-icon">X (Twitter)</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;


