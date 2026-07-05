import React from 'react';
import { Home, Building2, Sparkles, Box, Droplets, Leaf } from 'lucide-react';

const services = [
  { icon: Home, title: 'Home Cleaning', desc: 'Comprehensive cleaning for your house or apartment, tailored to your schedule and preferences.' },
  { icon: Building2, title: 'Office Cleaning', desc: 'Maintain a professional, spotless workspace for your team and clients with minimal disruption.' },
  { icon: Sparkles, title: 'Deep Cleaning', desc: 'A thorough top-to-bottom clean, perfect for spring cleaning, special events, or a total reset.' },
  { icon: Box, title: 'Move-In/Move-Out', desc: 'Ensure your old or new space is immaculate and perfectly ready for the next chapter.' },
  { icon: Droplets, title: 'Window Cleaning', desc: 'Streak-free window washing for both interior and exterior glass surfaces.' },
  { icon: Leaf, title: 'Eco-Friendly Cleaning', desc: 'Safe, green cleaning solutions that protect your family, pets, and the environment.' }
];

const Services = () => {
  return (
    <section id="services" className="section section-bg-light">
      <div className="container reveal">
        <h2 className="section-title">Our Premium <span>Services</span></h2>
        <p className="section-subtitle">We offer a wide range of specialized cleaning solutions tailored to meet the highest standards of hygiene and presentation.</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {services.map((service, index) => (
            <div key={index} className="card">
              <div className="icon-box">
                <service.icon size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 500 }}>{service.title}</h3>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.6, fontWeight: 300, fontSize: '0.95rem' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
