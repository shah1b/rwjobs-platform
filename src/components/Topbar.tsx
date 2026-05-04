import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Topbar = () => {
  const { currentPanel, setPanel, setSearchQuery } = useStore();

  const titles: Record<string, string> = {
    home: 'Dashboard',
    browse: 'Browse Jobs',
    agent: 'AI Agent',
    saved: 'Saved Jobs',
    profile: 'Profile'
  };

  return (
    <header className="topbar">
      <span className="page-title">{titles[currentPanel] || 'Dashboard'}</span>
      <div className="topbar-actions">
        <div className="search-topbar">
          <Search size={15} />
          <input 
            type="text" 
            placeholder="Search jobs, skills, companies…" 
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setPanel('browse');
            }}
          />
        </div>
        <button className="icon-btn">
          <div className="notif-dot"></div>
          <Bell size={16} />
        </button>
        <button className="icon-btn" onClick={() => setPanel('profile')}>
          <User size={16} />
        </button>
      </div>
    </header>
  );
};
