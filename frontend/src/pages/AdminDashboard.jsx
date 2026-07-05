import React, { useState, useEffect } from 'react';
import {
  Sparkles, Calendar, User, Mail, Phone, Settings, RefreshCw, LogOut,
  Lock, AlertCircle, LayoutDashboard, Users, ChevronDown, ChevronUp, MessageSquare, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError('Incorrect password');
      }
    } catch (err) {
      setLoginError('Could not connect to server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setContacts([]);
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      setContacts(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif", background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', padding: '48px 40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <div style={{
            width: '64px', height: '64px', margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #0f172a, #334155)',
            borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
            boxShadow: '0 10px 20px rgba(15, 23, 42, 0.2)'
          }}>
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>CleanAdmin Portal</h2>
          <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '0.95rem' }}>Enter your credentials to access the secure CRM.</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {loginError && (
              <div style={{ background: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: '8px', border: '1px solid #f87171', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <AlertCircle size={16} /> {loginError}
              </div>
            )}
            <input
              type="password"
              placeholder="Master Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              style={{ padding: '14px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', outline: 'none', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }}
            />
            <button type="submit" disabled={isLoggingIn} style={{
              width: '100%', padding: '14px', fontSize: '1rem', borderRadius: '8px',
              background: '#0ea5e9', color: 'white', border: 'none', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s'
            }}>
              {isLoggingIn ? 'Verifying...' : 'Sign In'}
            </button>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', marginTop: '16px', display: 'inline-block' }}>
              &larr; Return to Website
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // Calculate metrics
  const totalLeads = contacts.length;
  const recentLeads = contacts.filter(c => {
    const date = new Date(c.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }).length;

  // Render CRM Dashboard
  return (
    <>
      <style>{`
        .admin-layout { display: flex; flex-direction: row; }
        .admin-sidebar { width: 260px; flex-shrink: 0; display: flex; flex-direction: column; }
        .admin-nav { display: flex; flex-direction: column; flex: 1; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; }
        .admin-header-controls { display: flex; align-items: center; gap: 16px; }
        .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        @media (max-width: 768px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar { width: 100%; }
          .admin-nav { flex-direction: row; flex-wrap: wrap; padding: 16px !important; }
          .admin-nav a { flex: 1; justify-content: center; text-align: center; }
          .admin-nav p { width: 100%; text-align: center; margin-bottom: 8px; }
          .admin-header { flex-direction: column; align-items: stretch; gap: 16px; }
          .admin-header-controls { justify-content: space-between; }
        }
      `}</style>
      <div className="admin-layout" style={{ fontFamily: "'Poppins', sans-serif", background: '#f1f5f9', minHeight: '100vh' }}>

        {/* Sidebar Navigation */}
        <aside className="admin-sidebar" style={{ background: '#0f172a', color: 'white' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#0ea5e9', padding: '6px', borderRadius: '8px', color: 'white', display: 'flex' }}>
                <Settings size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
                Clean<span style={{ color: '#0ea5e9', fontWeight: 400 }}>Admin</span>
              </span>
            </div>
          </div>

          <nav className="admin-nav" style={{ padding: '24px 16px', gap: '8px' }}>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '1px', marginBottom: '8px', paddingLeft: '8px' }}>Main Menu</p>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: activeTab === 'dashboard' ? 'rgba(255,255,255,0.05)' : 'transparent', color: activeTab === 'dashboard' ? 'white' : '#94a3b8', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s' }}>
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('customers'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: activeTab === 'customers' ? 'rgba(255,255,255,0.05)' : 'transparent', color: activeTab === 'customers' ? 'white' : '#94a3b8', textDecoration: 'none', fontWeight: 500, transition: 'all 0.2s' }}>
              <Users size={18} /> Customers
            </a>
          </nav>

          <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', width: '100%', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', fontWeight: 500, justifyContent: 'center' }}>
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Top Header */}
          <header className="admin-header" style={{ background: 'white', padding: '16px 32px', borderBottom: '1px solid #e2e8f0' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>
              {activeTab === 'dashboard' ? 'Overview' : 'Customer Database'}
            </h1>
            <div className="admin-header-controls">
              <button onClick={fetchContacts} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', color: '#475569', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem' }}>
                <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh Data
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #e2e8f0', paddingLeft: '16px' }}>
                <div style={{ width: '36px', height: '36px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9', fontWeight: 600 }}>
                  A
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155' }}>Admin User</span>
              </div>
            </div>
          </header>

        {/* Scrollable Dashboard Content */}
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>

          {/* Metrics Row (Only on Dashboard Tab) */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Total Leads</h3>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>{totalLeads}</div>
              </div>
              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Recent Leads (7 Days)</h3>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>{recentLeads}</div>
              </div>
              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>System Status</h3>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span> Online
                </div>
              </div>
            </div>
          )}

          {/* Data Table */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>Recent Submissions</h2>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>Loading data...</div>
            ) : error ? (
              <div style={{ margin: '24px', background: '#fef2f2', color: '#ef4444', padding: '16px', borderRadius: '8px', border: '1px solid #f87171' }}>
                {error}
              </div>
            ) : contacts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <MessageSquare size={24} color="#94a3b8" />
                </div>
                <h3 style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '8px' }}>No leads found</h3>
                <p style={{ color: '#64748b' }}>New contact form submissions will appear here.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '16px 24px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.5px', width: '60px' }}>Sr No.</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.5px' }}>Date</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.5px' }}>Customer</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.5px' }}>Contact Info</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.5px' }}>Service Requested</th>
                      <th style={{ padding: '16px 24px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.5px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <React.Fragment key={contact._id}>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', background: expandedRow === contact._id ? '#f8fafc' : 'white', transition: 'background 0.2s' }}>
                          <td style={{ padding: '16px 24px', color: '#0ea5e9', fontSize: '0.9rem', verticalAlign: 'middle', fontWeight: 600 }}>
                            {index + 1}
                          </td>
                          <td style={{ padding: '16px 24px', color: '#475569', fontSize: '0.9rem', verticalAlign: 'middle' }}>
                            <div style={{ fontWeight: 500 }}>{new Date(contact.createdAt).toLocaleDateString()}</div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </td>
                          <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{contact.name}</div>
                            {contact.address && (
                              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={12} />
                                {contact.address.length > 25 ? `${contact.address.substring(0, 25)}...` : contact.address}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>
                            <div style={{ fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><Mail size={14} color="#94a3b8" /> {contact.email}</div>
                            <div style={{ fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} color="#94a3b8" /> {contact.phone}</div>
                          </td>
                          <td style={{ padding: '16px 24px', verticalAlign: 'middle' }}>
                            <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>
                              {contact.serviceType}
                            </span>
                          </td>
                          <td style={{ padding: '16px 24px', verticalAlign: 'middle', textAlign: 'right' }}>
                            <button
                              onClick={() => toggleRow(contact._id)}
                              style={{
                                background: 'transparent', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '6px',
                                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, color: '#475569',
                                display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
                              }}
                            >
                              {expandedRow === contact._id ? 'Close' : 'View Message'}
                              {expandedRow === contact._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                          </td>
                        </tr>
                        {expandedRow === contact._id && (
                          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <td colSpan="6" style={{ padding: '24px', position: 'relative' }}>
                              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: '#0ea5e9' }}></div>
                              <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Property Address</h4>
                                  <p style={{ margin: 0, color: '#334155', lineHeight: 1.6, fontSize: '0.95rem', background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    {contact.address || <span style={{ color: '#ef4444', fontStyle: 'italic' }}>Address not provided (legacy lead).</span>}
                                  </p>
                                </div>
                                <div>
                                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Message / Additional Details</h4>
                                  <p style={{ margin: 0, color: '#334155', lineHeight: 1.6, fontSize: '0.95rem', background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    {contact.message || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No additional details provided.</span>}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
