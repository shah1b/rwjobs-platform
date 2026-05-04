import React from 'react';
import { FileText, Clock, CheckCircle, XCircle, ExternalLink, MoreVertical } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AppsPanel = () => {
  const { user } = useStore();

  const dummyApps = [
    { id: 1, title: 'Senior Brand Designer', company: 'Linear', status: 'interviewing', date: 'May 2, 2024', logo: 'LI', color: '#000' },
    { id: 2, title: 'Product Designer', company: 'Airbnb', status: 'applied', date: 'May 1, 2024', logo: 'AB', color: '#FF5A5F' },
    { id: 3, title: 'Visual Identity Lead', company: 'Stripe', status: 'rejected', date: 'April 28, 2024', logo: 'ST', color: '#635BFF' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'var(--txt3)';
      case 'interviewing': return 'var(--acc2)';
      case 'offer': return 'var(--acc)';
      case 'rejected': return 'var(--acc3)';
      default: return 'var(--txt2)';
    }
  };

  if (!user) {
    return (
      <div className="panel" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <div className="empty-icon" style={{ margin: '0 auto 20px' }}>
          <FileText size={48} color="var(--txt3)" />
        </div>
        <h2>Track your applications</h2>
        <p style={{ color: 'var(--txt2)', marginBottom: '20px' }}>Sign in to start tracking your remote job applications and interview status.</p>
        <button className="btn-primary">Sign In to Continue</button>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="section-hdr">
        <span className="section-title">My Applications</span>
        <span className="result-count">{dummyApps.length} total</span>
      </div>

      <div className="apps-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {dummyApps.map((app) => (
          <div key={app.id} className="job-card" style={{ cursor: 'default' }}>
            <div className="jc-top" style={{ marginBottom: 0 }}>
              <div className="co-logo" style={{ background: app.color, color: '#fff' }}>{app.logo}</div>
              <div className="jc-info" style={{ flex: 1 }}>
                <div className="jc-title">{app.title}</div>
                <div className="jc-company">{app.company} · Applied on {app.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  color: getStatusColor(app.status),
                  background: `${getStatusColor(app.status)}15`,
                  padding: '4px 10px',
                  borderRadius: '50px',
                  display: 'inline-block'
                }}>
                  {app.status}
                </div>
              </div>
              <button className="icon-btn" style={{ border: 'none', background: 'transparent' }}>
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(200, 241, 53, .05)', border: '1px dashed rgba(200, 241, 53, .2)', borderRadius: 'var(--r)', textAlign: 'center' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>Want to automate this?</h4>
        <p style={{ fontSize: '12px', color: 'var(--txt2)', marginBottom: '14px' }}>Our AI Agent can automatically track your applications if you use "Quick Apply".</p>
        <button className="btn-secondary" style={{ fontSize: '12px' }}>Learn More</button>
      </div>
    </div>
  );
};
