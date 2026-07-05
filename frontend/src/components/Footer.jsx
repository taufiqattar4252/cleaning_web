import React from 'react';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', color: 'white', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', marginBottom: '60px' }}>
          
          <div style={{ maxWidth: '300px' }}>
            <a href="#" className="logo" style={{ color: 'white', marginBottom: '16px' }}>
              <Sparkles className="text-primary-blue" size={28} />
              CleanCanada
            </a>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
              Professional residential and commercial cleaning services across Canada. A cleaner space, a clearer mind.
            </p>
            <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
              <a href="#" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4.01c-1 .49-1.98.68-3 .99-1.12-1.26-2.7-1.5-4.5-1.5-3.23 0-5.8 2.57-5.8 5.8 0 .45.05.9.15 1.33C4.14 10.3 2.05 5.56 2.05 5.56s-1.5 3 1.25 5.3c-.92 0-1.85-.28-2.65-.72v.07c0 2.8 1.95 5.14 4.58 5.66-.48.13-.98.2-1.5.2-.37 0-.74-.03-1.1-.1.74 2.3 2.88 3.98 5.42 4.02-1.95 1.53-4.4 2.45-7.05 2.45-.48 0-.96-.03-1.44-.08 2.57 1.64 5.6 2.6 8.9 2.6 10.67 0 16.5-8.84 16.5-16.5 0-.25 0-.5-.02-.75 1.13-.82 2.1-1.85 2.85-3.02z"></path></svg>
              </a>
              <a href="#" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '24px', fontWeight: 600 }}>Quick Links</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#94a3b8' }}>
                <li><a href="#services" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color='var(--primary-blue)'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>Our Services</a></li>
                <li><a href="#results" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color='var(--primary-blue)'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>Before & After</a></li>
                <li><a href="#why-us" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color='var(--primary-blue)'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>Why Choose Us</a></li>
                <li><a href="#pricing" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color='var(--primary-blue)'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '24px', fontWeight: 600 }}>Contact Info</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#94a3b8' }}>
                <li>1-800-CLEAN-CAN</li>
                <li>hello@cleancanada.ca</li>
                <li>123 Maple Street<br/>Toronto, ON M5V 2H1</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
          <p>&copy; {new Date().getFullYear()} CleanCanada. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
