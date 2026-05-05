import React, { useState } from 'react';
import { Bell, BellOff, Settings, Plus, Mail, MoreHorizontal, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AlertsPanel = () => {
  const { user, setPanel } = useStore();
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Senior Design Roles', criteria: 'Remote · $120k+ · Design', active: true },
    { id: 2, title: 'Engineering in Europe', criteria: 'Remote · Engineering · GMT+1 to GMT+3', active: false },
  ]);

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleNewAlert = () => {
    alert("Opening 'Create Job Alert' wizard...");
  };

  if (!user) {
    return (
      <div className="panel" style={{ textAlign: 'center', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: 'var(--bg-muted)', padding: '32px', borderRadius: '50%', marginBottom: '24px' }}>
          <Bell size={48} color="var(--txt-3)" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Never miss an opening</h2>
        <p style={{ color: 'var(--txt-2)', marginBottom: '32px', maxWidth: '360px' }}>Sign in to create custom job alerts and get notified as soon as a match is found.</p>
        <button className="btn btn-primary" onClick={() => setPanel('auth')}>Get Started</button>
      </div>
    );
  }

  return (
    <div className="panel fade-up">
      <div className="page-head" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="page-title">Job Alerts</h1>
          <p className="page-sub">Manage your automated search filters and notifications</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleNewAlert}>
          <Plus size={14} />
          New Alert
        </button>
      </div>

      <div className="alerts-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {alerts.map((alert) => (
          <div key={alert.id} className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--txt)' }}>{alert.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--txt-2)', marginTop: '4px' }}>{alert.criteria}</p>
              </div>
              <button 
                onClick={() => toggleAlert(alert.id)}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '12px',
                  background: alert.active ? 'var(--blue-light)' : 'var(--bg-muted)',
                  color: alert.active ? 'var(--blue)' : 'var(--txt-3)',
                  border: '1px solid',
                  borderColor: alert.active ? 'var(--blue-mid)' : 'var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {alert.active ? <Bell size={18} /> : <BellOff size={18} />}
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--txt-2)', fontWeight: 500 }}>
                <Mail size={14} color="var(--blue)" /> Email Daily
              </div>
              <div style={{ flex: 1 }}></div>
              <button className="btn btn-ghost btn-sm" onClick={() => alert("Editing alert...")}>Edit</button>
              <button className="row-menu-btn" onClick={() => alert("Options")}><MoreHorizontal size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '40px', padding: '32px', textAlign: 'center', background: 'var(--bg-muted)', borderStyle: 'dashed' }}>
        <div style={{ background: 'var(--bg-card)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justify-content: 'center', margin: '0 auto 16px', border: '1px solid var(--border)' }}>
          <Settings size={20} color="var(--txt-2)" />
        </div>
        <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>Global Notification Settings</h4>
        <p style={{ fontSize: '14px', color: 'var(--txt-2)', marginBottom: '24px' }}>Manage how and when you receive job updates across all alerts.</p>
        <button className="btn btn-secondary" onClick={() => alert("Opening notification settings...")}>Configure Notifications</button>
      </div>
    </div>
  );
};
