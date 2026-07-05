import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.25)'
          }}>
            <Sparkles size={22} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.5px' }}>
            Clean<span style={{ color: 'var(--primary)', fontWeight: 400 }}>Canada</span>
          </span>
        </a>
        <nav className={`nav-links ${isMobileOpen ? 'mobile-open' : ''}`}>
          <a href="#" onClick={() => setIsMobileOpen(false)}>Home</a>
          <a href="#services" onClick={() => setIsMobileOpen(false)}>Services</a>
          <a href="#results" onClick={() => setIsMobileOpen(false)}>Before & After</a>
          <a href="#why-us" onClick={() => setIsMobileOpen(false)}>Why Us</a>
          <a href="#how-it-works" onClick={() => setIsMobileOpen(false)}>How It Works</a>
          <a href="#testimonials" onClick={() => setIsMobileOpen(false)}>Testimonials</a>
          <a href="#pricing" onClick={() => setIsMobileOpen(false)}>Pricing</a>
          <a href="#contact" onClick={() => setIsMobileOpen(false)}>Contact</a>
          <Link to="/admin" onClick={() => setIsMobileOpen(false)} className="btn btn-primary" style={{ padding: '8px 20px', marginLeft: '12px' }}>Login</Link>
        </nav>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
