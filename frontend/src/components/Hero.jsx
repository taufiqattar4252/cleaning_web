import React, { useState, useEffect } from 'react';

const backgrounds = [
  '/images/living_room_after.png',
  '/images/kitchen_after.png',
  '/images/office_after.png'
];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" style={{
      padding: '180px 0 120px',
      position: 'relative',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Changing Background Images */}
      {backgrounds.map((bg, idx) => (
        <div key={idx} style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: currentBg === idx ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out',
          zIndex: -2,
          transform: currentBg === idx ? 'scale(1)' : 'scale(1.05)'
        }}></div>
      ))}

      {/* Dark Gradient Overlay so images are visible but text is readable */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
        zIndex: -1
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,0,0,0.4)', color: '#fff',
          padding: '6px 20px', borderRadius: '99px', fontWeight: 500, fontSize: '0.9rem',
          marginBottom: '32px', border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          ✨ The standard in premium cleaning
        </div>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          fontWeight: 600, 
          marginBottom: '24px', 
          color: 'white',
          letterSpacing: '-0.03em',
          lineHeight: 1.1
        }}>
          A Cleaner Space,<br/>
          <span style={{ 
            background: 'linear-gradient(135deg, #60a5fa, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>A Clearer Mind.</span>
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'rgba(255,255,255,0.9)', 
          maxWidth: '700px', 
          margin: '0 auto 48px',
          fontWeight: 300
        }}>
          Professional residential and commercial cleaning services across Canada. We handle the mess with precision and care, so you can focus on what matters most.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" className="btn btn-primary">Get a Free Quote</a>
          <a href="#services" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(5px)' }}>Explore Services</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
