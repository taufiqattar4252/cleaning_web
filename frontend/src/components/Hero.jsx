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
    <section className="hero">
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
        <div className="hero-badge">
          ✨ The standard in premium cleaning
        </div>
        <h1 className="hero-title">
          A Cleaner Space,<br/>
          <span className="hero-title-highlight">A Clearer Mind.</span>
        </h1>
        <p className="hero-desc">
          Professional residential and commercial cleaning services across Canada. We handle the mess with precision and care, so you can focus on what matters most.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">Get a Free Quote</a>
          <a href="#services" className="btn btn-explore">Explore Services</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
