import React from 'react';
import { Bell, BellOff, Settings, Plus, Mail } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AlertsPanel = () => {
  const { user } = useStore();

  const alerts = [
    { id: 1, title: 'Senior Design Roles', criteria: 'Remote · $120k+ · Design', active: true },
    { id: 2, title: 'Engineering in Europe', criteria: 'Remote · Engineering · GMT+1 to GMT+3', active: false },
  ];

  if (!user) {
    return (
      <div className="panel" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <div className="empty-icon" style={{ margin: '0 auto 20px' }}>
          <Bell size={48} color="var(--txt3)" />
        </div>
        <h2>Never miss an opening</h2>
        <p style={{ color: 'var(--txt2)', marginBottom: '20px' }}>Sign in to create custom job alerts and get notified as soon as a match is found.</p>
        <button className="btn-primary">Get Started</button>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="section-hdr">
        <span className="section-title">Job Alerts</span>
        <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
          <Plus size={14} />
          New Alert
        </button>
      </div>

      <div className="alerts-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {alerts.map((alert) => (
          <div key={alert.id} className="settings-block" style={{ 
            background: 'rgba(0,0,0,0.02)', 
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--r2)', 
            border: '1px solid rgba(0,0,0,0.05)',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800 }}>{alert.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--txt2)', marginTop: '4px' }}>{alert.criteria}</p>
              </div>
              <div className={`icon-btn ${alert.active ? 'active' : ''}`} style={{ 
                background: alert.active ? 'rgba(0, 82, 255, .1)' : 'transparent',
                color: alert.active ? 'var(--acc)' : 'var(--txt3)',
                borderColor: alert.active ? 'var(--acc)' : 'var(--brd)'
              }}>
                {alert.active ? <Bell size={16} /> : <BellOff size={16} />}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--txt2)' }}>
                <Mail size={12} /> Email Daily
              </div>
              <button className="section-link" style={{ marginLeft: 'auto', fontSize: '12px' }}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      <div className="empty-state" style={{ marginTop: '40px', padding: '40px', border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(0,0,0,0.01)', borderRadius: 'var(--r)', textAlign: 'center' }}>
        <div className="empty-icon" style={{ margin: '0 auto 16px' }}>
          <Settings size={24} color="var(--txt3)" />
        </div>
        <h4 style={{ fontSize: '15px' }}>Notification Settings</h4>
        <p style={{ fontSize: '13px', color: 'var(--txt2)', marginBottom: '16px' }}>Manage how and when you receive job updates.</p>
        <button className="btn-secondary">Configure Notifications</button>
      </div>
    </div>
  );
};
