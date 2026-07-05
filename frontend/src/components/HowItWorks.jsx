import React from 'react';
import { CalendarCheck, Sparkles, Smile } from 'lucide-react';

const steps = [
  { num: '01', icon: CalendarCheck, title: 'Book Online', desc: 'Choose your service and schedule a time that works for you in under 60 seconds.' },
  { num: '02', icon: Sparkles, title: 'We Clean', desc: 'Our fully equipped and insured professionals arrive and make your space sparkle.' },
  { num: '03', icon: Smile, title: 'You Relax', desc: 'Enjoy your pristine environment and the peace of mind that comes with a clean space.' }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-base)' }}>
      
      {/* Ambient Background Glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsla(200, 98%, 49%, 0.08) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, hsla(160, 84%, 39%, 0.05) 0%, transparent 70%)', zIndex: 0 }}></div>

      <div className="container reveal" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">How It <span>Works</span></h2>
        <p className="section-subtitle">A simple, hassle-free process to get your space perfectly clean.</p>
        
        <div style={{ position: 'relative', marginTop: '80px' }}>
          {/* Glowing connecting line (desktop only) */}
          <div className="hidden-mobile" style={{
            position: 'absolute',
            top: '45px', left: '10%', right: '10%',
            height: '4px', 
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
            borderRadius: '4px',
            opacity: 0.2,
            zIndex: 0
          }}></div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            position: 'relative',
            zIndex: 1
          }}>
            {steps.map((step, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(16px)',
                padding: '48px 32px',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: 'translateY(0)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(14, 165, 233, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
              }}
              >
                {/* Large Background Number Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '20px',
                  fontSize: '8rem',
                  fontWeight: 900,
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(14, 165, 233, 0.08)',
                  zIndex: 0,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  lineHeight: 1
                }}>
                  {step.num}
                </div>

                <div style={{
                  width: '90px', height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 32px',
                  color: 'white',
                  boxShadow: '0 10px 25px rgba(14, 165, 233, 0.4)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <step.icon size={40} />
                </div>
                
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', fontWeight: 600, color: 'var(--text-heading)', position: 'relative', zIndex: 1 }}>{step.title}</h3>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.6, fontWeight: 300, fontSize: '1rem', position: 'relative', zIndex: 1 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
