import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', serviceType: '', address: '', message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', serviceType: '', address: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container reveal" style={{ maxWidth: '650px' }}>
        <h2 className="section-title">Get a <span>Free Quote</span></h2>
        <p className="section-subtitle">Fill out the form below and our team will get back to you within 24 hours.</p>
        
        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <h3 style={{ color: 'var(--secondary)', fontSize: '1.5rem', marginBottom: '16px' }}>Thank You!</h3>
              <p>Your request has been received. We'll be in touch shortly.</p>
              <button onClick={() => setStatus(null)} className="btn btn-primary" style={{ marginTop: '24px' }}>Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="name" style={{ fontWeight: 500 }}>Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="email" style={{ fontWeight: 500 }}>Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="phone" style={{ fontWeight: 500 }}>Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-base)', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="serviceType" style={{ fontWeight: 500 }}>Service Needed</label>
                  <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} required style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-base)', outline: 'none' }}>
                    <option value="" disabled>Select a service</option>
                    <option value="Home Cleaning">Home Cleaning</option>
                    <option value="Office Cleaning">Office Cleaning</option>
                    <option value="Deep Cleaning">Deep Cleaning</option>
                    <option value="Move In/Out">Move In/Out</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="address" style={{ fontWeight: 500 }}>Property Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required placeholder="Street, City, Postal Code" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-base)', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="message" style={{ fontWeight: 500 }}>Additional Details</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="4" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-base)', outline: 'none', resize: 'vertical' }}></textarea>
              </div>

              {status === 'error' && <p style={{ color: '#ef4444' }}>Something went wrong. Please try again.</p>}
              
              <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ width: '100%', fontSize: '1.125rem', marginTop: '16px' }}>
                {status === 'loading' ? 'Sending...' : 'Get My Free Quote'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
