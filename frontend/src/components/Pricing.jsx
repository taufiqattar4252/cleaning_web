import React, { useState } from 'react';
import { Check } from 'lucide-react';

const tiers = [
  { name: 'Basic', price: '$99', desc: 'Perfect for small apartments and quick touch-ups.', features: ['Dusting & Wiping', 'Vacuuming & Mopping', 'Bathroom Quick Clean', 'Kitchen Surfaces'] },
  { name: 'Standard', price: '$149', desc: 'Our most popular option for regular home maintenance.', features: ['Everything in Basic', 'Deep Bathroom Clean', 'Inside Microwaves', 'Making Beds', 'Trash Removal'] },
  { name: 'Premium', price: '$249', desc: 'Thorough deep clean for move-ins or spring cleaning.', features: ['Everything in Standard', 'Inside Fridges/Ovens', 'Interior Windows', 'Baseboards & Blinds', 'Cabinet Interiors'] }
];

const Pricing = () => {
  const [selectedTier, setSelectedTier] = useState(1);

  return (
    <section id="pricing" className="section section-bg-light">
      <div className="container reveal">
        <h2 className="section-title">Transparent <span>Pricing</span></h2>
        <p className="section-subtitle">No hidden fees, just straightforward pricing for a spotless space.</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          {tiers.map((tier, idx) => {
            const isSelected = selectedTier === idx;
            
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedTier(idx)}
                style={{
                  background: 'white',
                  padding: '40px 32px',
                  borderRadius: '16px',
                  boxShadow: isSelected ? '0 10px 30px rgba(14, 165, 233, 0.15)' : '0 4px 20px rgba(0,0,0,0.05)',
                  border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border)',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  position: 'relative',
                  zIndex: isSelected ? 10 : 1,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--primary)', color: 'white', padding: '4px 16px',
                    borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600
                  }}>
                    Selected
                  </div>
                )}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{tier.name}</h3>
                <p style={{ color: 'var(--text-body)', marginBottom: '24px', height: '48px' }}>{tier.desc}</p>
                <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '32px', color: 'var(--text-heading)' }}>
                  {tier.price}<span style={{ fontSize: '1rem', color: 'var(--text-body)', fontWeight: 400 }}>/visit</span>
                </div>
                
                <ul style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-body)' }}>
                      <div style={{ background: 'var(--bg-surface-hover)', padding: '4px', borderRadius: '50%', color: 'var(--secondary)' }}>
                        <Check size={16} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a href="#contact" className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                  Book Now
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
