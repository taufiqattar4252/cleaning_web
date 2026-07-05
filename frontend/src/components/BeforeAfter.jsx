import React, { useState, useRef, useEffect } from 'react';

const ImageSlider = ({ beforeSrc, afterSrc }) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', () => setIsDragging(false));
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      ref={sliderRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        boxShadow: 'var(--shadow-lg)',
        border: '4px solid white'
      }}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Before Image (Background) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${beforeSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{
          position: 'absolute', top: '24px', left: '24px',
          background: '#1e293b', color: 'white',
          padding: '6px 20px', borderRadius: '8px', 
          fontSize: '1rem', fontWeight: 500,
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}>Before</div>
      </div>

      {/* After Image (Clipped) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${afterSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`
      }}>
        <div style={{
          position: 'absolute', top: '24px', right: '24px',
          background: '#10b981', color: 'white',
          padding: '6px 20px', borderRadius: '8px', 
          fontSize: '1rem', fontWeight: 500,
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}>After</div>
      </div>

      {/* Slider Handle */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        left: `${position}%`,
        width: '4px',
        background: 'white',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          width: '56px', height: '56px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 16l-4-4 4-4 M14 16l4-4-4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const BeforeAfter = () => {
  const examples = [
    {
      caption: "Deep Kitchen Clean",
      before: "/images/kitchen_before.png",
      after: "/images/kitchen_after.png"
    },
    {
      caption: "Bathroom Refresh",
      before: "/images/bathroom_before.png",
      after: "/images/bathroom_after.png"
    },
    {
      caption: "Office Space Reset",
      before: "/images/office_before.png",
      after: "/images/office_after.png"
    },
    {
      caption: "Living Room Recovery",
      before: "/images/living_room_before.png",
      after: "/images/living_room_after.png"
    }
  ];

  return (
    <section id="results" className="section section-bg-light">
      <div className="container reveal">
        <h2 className="section-title">See the <span>CleanCanada Difference</span></h2>
        <p className="section-subtitle">Drag the sliders below to see the stunning results of our professional cleaning services.</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '40px'
        }}>
          {examples.map((ex, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <ImageSlider 
                beforeSrc={ex.before} 
                afterSrc={ex.after} 
              />
              <h3 style={{ 
                textAlign: 'center', 
                fontSize: '1.1rem', 
                fontWeight: 500,
                color: 'var(--text-heading)' 
              }}>
                {ex.caption}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
