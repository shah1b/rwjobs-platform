import React from 'react';
import { Search, Bell, User, Sun, Moon, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Topbar = () => {
  const { currentPanel, setPanel, user } = useStore();

  const titles: Record<string, string> = {
    home: 'Dashboard',
    browse: 'Browse Jobs',
    agent: 'AI Agent',
    saved: 'Saved Jobs',
    profile: 'Profile',
    apps: 'Applications',
    alerts: 'Job Alerts',
    settings: 'Settings'
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
  };

  const today = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <header className="topbar" style={{ padding: '0 24px', height: '64px' }}>
      <div className="topbar-breadcrumb" style={{ fontSize: '14px', gap: '8px' }}>
        <span onClick={() => setPanel('landing')} style={{ cursor: 'pointer', color: 'var(--txt-3)', fontWeight: 500 }}>VibeJobs</span>
        <ChevronRight size={14} className="topbar-sep" style={{ opacity: 0.4 }} />
        <span style={{ fontWeight: 600 }}>{titles[currentPanel] || 'Dashboard'}</span>
      </div>
      
      <div className="tb-spacer"></div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span className="tb-date" style={{ fontSize: '13px', padding: '6px 12px', background: 'var(--bg-muted)', border: 'none', color: 'var(--txt-2)' }}>{today}</span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="tb-icon-btn" title="Command Palette ⌘K" style={{ width: '36px', height: '36px' }}>
            <Search size={16} />
          </button>
          
          <button className="tb-icon-btn" title="Notifications" style={{ width: '36px', height: '36px' }}>
            <Bell size={16} />
            <div className="tb-notif-dot" style={{ top: '8px', right: '8px' }}></div>
          </button>
          
          <button className="theme-btn" onClick={toggleTheme} title="Toggle Theme" style={{ width: '36px', height: '36px' }}>
            <Sun size={16} className="sun-icon" />
          </button>
        </div>
        
        <div className="tb-user-av" style={{ width: '36px', height: '36px', fontSize: '12px', border: 'none', background: 'linear-gradient(135deg, var(--blue), var(--purple))' }}>
          {user?.email?.substring(0, 1).toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  );
};
