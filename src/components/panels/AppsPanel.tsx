import React from 'react';
import { FileText, Clock, CheckCircle, XCircle, ExternalLink, MoreVertical, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AppsPanel = () => {
  const { user, setPanel } = useStore();

  const dummyApps = [
    { id: 1, title: 'Senior Brand Designer', company: 'Linear', status: 'interviewing', date: 'May 2, 2024', logo: 'LI', color: '#000' },
    { id: 2, title: 'Product Designer', company: 'Airbnb', status: 'applied', date: 'May 1, 2024', logo: 'AB', color: '#FF5A5F' },
    { id: 3, title: 'Visual Identity Lead', company: 'Stripe', status: 'rejected', date: 'April 28, 2024', logo: 'ST', color: '#635BFF' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'var(--blue)';
      case 'interviewing': return 'var(--amber)';
      case 'offer': return 'var(--green)';
      case 'rejected': return 'var(--red)';
      default: return 'var(--txt-2)';
    }
  };

  if (!user) {
    return (
      <div className="panel" style={{ textAlign: 'center', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: 'var(--bg-muted)', padding: '32px', borderRadius: '50%', marginBottom: '24px' }}>
          <FileText size={48} color="var(--txt-3)" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Track your applications</h2>
        <p style={{ color: 'var(--txt-2)', marginBottom: '32px', maxWidth: '360px' }}>Sign in to start tracking your remote job applications and interview status.</p>
        <button className="btn btn-primary" onClick={() => setPanel('auth')}>Sign In to Continue</button>
      </div>
    );
  }

  return (
    <div className="panel fade-up">
      <div className="page-head" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="page-title">My Applications</h1>
          <p className="page-sub">Track and manage your ongoing job applications</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setPanel('browse')}>
          <Plus size={14} />
          Find New Jobs
        </button>
      </div>

      <div className="apps-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {dummyApps.map((app) => (
          <div key={app.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="co-av" style={{ background: app.color, color: '#fff', width: '44px', height: '44px', borderRadius: '10px', fontSize: '14px' }}>
                {app.logo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--txt)' }}>{app.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--txt-2)', marginTop: '2px' }}>
                  {app.company} · <span style={{ color: 'var(--txt-3)' }}>Applied {app.date}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  color: getStatusColor(app.status),
                  background: `${getStatusColor(app.status)}15`,
                  padding: '4px 12px',
                  borderRadius: '99px',
                  letterSpacing: '0.02em',
                  border: `1px solid ${getStatusColor(app.status)}30`
                }}>
                  {app.status}
                </div>
                <button className="row-menu-btn" onClick={() => alert(`Managing application for ${app.title}`)}>
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '32px', 
        background: 'var(--blue-light)', 
        border: '1px dashed var(--blue)', 
        borderRadius: 'var(--r-xl)', 
        textAlign: 'center' 
      }}>
        <div style={{ background: '#fff', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify-content: 'center', margin: '0 auto 16px', boxShadow: 'var(--shadow-sm)' }}>
          <Sparkles size={20} color="var(--blue)" />
        </div>
        <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>Want to automate this?</h4>
        <p style={{ fontSize: '14px', color: 'var(--txt-2)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>Our AI Agent can automatically track your applications and follow up with recruiters.</p>
        <button className="btn btn-secondary" onClick={() => setPanel('agent')}>Explore AI Agent</button>
      </div>
    </div>
  );
};
