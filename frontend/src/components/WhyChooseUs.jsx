import React from 'react';
import { Star, Users, ShieldCheck, Sprout } from 'lucide-react';

const reasons = [
  { icon: Star, title: '5-Star Rated', desc: 'Consistently highly rated by our customers across all platforms for our impeccable service.' },
  { icon: Users, title: '500+ Happy Clients', desc: 'Trusted by hundreds of homeowners and businesses to maintain their spaces beautifully.' },
  { icon: ShieldCheck, title: 'Fully Insured', desc: 'Rest easy knowing our professionals are fully bonded, insured, and background-checked.' },
  { icon: Sprout, title: 'Eco-Friendly Products', desc: 'We use sustainable, green products that are safe for your pets, children, and the environment.' }
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="section" style={{ 
      background: 'var(--bg-base)', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Light theme ambient glowing orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, hsla(200, 98%, 49%, 0.05) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', right: '0%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsla(160, 84%, 39%, 0.05) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="container reveal" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">Why <span>Choose Us</span></h2>
        <p className="section-subtitle">
          We don't just clean; we care for your space as if it were our own, delivering uncompromising quality.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginTop: '60px'
        }}>
          {reasons.map((reason, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 1)',
              padding: '48px 32px',
              borderRadius: '24px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.2)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(14, 165, 233, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.03)';
            }}
            >
              
              <div style={{
                width: '72px', height: '72px',
                borderRadius: '20px',
                background: 'var(--bg-surface-hover)',
                border: '1px solid rgba(14, 165, 233, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                color: 'var(--primary)',
                position: 'relative'
              }}>
                <reason.icon size={32} />
              </div>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', fontWeight: 600, color: 'var(--text-heading)' }}>{reason.title}</h3>
              <p style={{ color: 'var(--text-body)', lineHeight: 1.6, fontWeight: 300, fontSize: '0.95rem' }}>{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
