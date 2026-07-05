import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Sarah Jenkins', quote: '"CleanCanada completely transformed my home. The deep clean was incredibly thorough and the team was so professional!"' },
  { name: 'Michael Chen', quote: '"We use them for our weekly office cleaning. Reliable, trustworthy, and the place always looks immaculate on Monday mornings."' },
  { name: 'Jessica Patel', quote: '"I love that they use eco-friendly products. It gives me peace of mind with my kids and pets running around. Highly recommend!"' }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section">
      <div className="container reveal">
        <h2 className="section-title">What Our <span>Clients Say</span></h2>
        <p className="section-subtitle">Don't just take our word for it.</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {reviews.map((review, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '40px 32px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', color: '#fbbf24' }}>
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
              </div>
              <p style={{ fontSize: '1.125rem', fontStyle: 'italic', marginBottom: '24px', color: 'var(--text-heading)' }}>
                {review.quote}
              </p>
              <p style={{ fontWeight: 600, color: 'var(--primary)' }}>- {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
