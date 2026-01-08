'use client';
import { useState } from 'react';
import '../../styles/newsletterSection.css';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <section className="newsletter-container mx-auto">
      <div className="newsletter-overlay"></div>
      
      <div className="newsletter-content">
        <h3 className="newsletter-title">Stay in the Loop</h3>
        <p className="newsletter-description">
          Get exclusive access to new arrivals, special offers, and insider updates
        </p>
        
        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="newsletter-input-container">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <svg 
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.25rem',
                height: '1.25rem',
                color: '#9ca3af'
              }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <button
            type="submit"
            className="newsletter-button"
          >
            Subscribe Now
          </button>
        </form>
        
        <p className="newsletter-disclaimer">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="newsletter-decoration"></div>
      <div className="newsletter-decoration-delayed"></div>
    </section>
  );
}