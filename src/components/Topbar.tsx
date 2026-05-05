import React from 'react';
import { Search, Bell, User, Sun, Moon, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Topbar = () => {
  const { currentPanel, user } = useStore();

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
    <header className="topbar">
      <div className="topbar-breadcrumb">
        VibeJobs
        <ChevronRight size={14} className="topbar-sep" />
        <span>{titles[currentPanel] || 'Dashboard'}</span>
      </div>
      
      <div className="tb-spacer"></div>
      
      <span className="tb-date">{today}</span>
      
      <button className="tb-icon-btn" title="Command Palette ⌘K">
        <Search size={15} />
      </button>
      
      <button className="tb-icon-btn" title="Notifications">
        <Bell size={15} />
        <div className="tb-notif-dot"></div>
      </button>
      
      <button className="theme-btn" onClick={toggleTheme} title="Toggle Theme">
        <Sun size={15} className="sun-icon" />
      </button>
      
      <div className="tb-user-av">
        {user?.email?.substring(0, 1).toUpperCase() || 'U'}
      </div>
    </header>
  );
};
