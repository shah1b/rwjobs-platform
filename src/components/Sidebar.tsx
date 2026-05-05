import React from 'react';
import { 
  LayoutDashboard, Search, Sparkles, Bookmark, 
  FileText, Bell, User, Settings, Command,
  ChevronDown, ChevronUp, MoreHorizontal
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Sidebar = () => {
  const { currentPanel, setPanel, user } = useStore();

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'browse', label: 'Browse Jobs', icon: Search, badge: '247' },
    { id: 'agent', label: 'AI Agent', icon: Sparkles, badge: 'New', badgeColor: 'blue' },
  ];

  const myJobs = [
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark, badge: '12' },
    { id: 'apps', label: 'Applications', icon: FileText, badge: '3', badgeColor: 'accent' },
    { id: 'alerts', label: 'Job Alerts', icon: Bell },
  ];

  const account = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sb-brand">
        <div className="brand-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>
        </div>
        <span className="brand-name">VibeJobs</span>
        <span className="brand-badge">Pro</span>
      </div>

      {/* Search Trigger */}
      <div className="sb-search">
        <div className="search-inner">
          <Search size={13} color="var(--txt-3)" />
          <span>Search or jump to…</span>
          <span className="search-kbd">⌘K</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sb-nav">
        <div className="nav-group">
          <div className="nav-group-lbl">Discover</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
              onClick={() => setPanel(item.id as any)}
            >
              <item.icon size={15} />
              {item.label}
              {item.badge && (
                <span className={`ni-badge ${item.badgeColor || ''}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </div>

        <div className="nav-sep"></div>

        <div className="nav-group">
          <div className="nav-group-lbl">My Jobs</div>
          {myJobs.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
              onClick={() => setPanel(item.id as any)}
            >
              <item.icon size={15} />
              {item.label}
              {item.badge && (
                <span className={`ni-badge ${item.badgeColor || ''}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </div>

        <div className="nav-sep"></div>

        <div className="nav-group">
          <div className="nav-group-lbl">Account</div>
          {account.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
              onClick={() => setPanel(item.id as any)}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="sb-footer">
        <button className="user-btn">
          <div className="user-av">
            {user?.email?.substring(0, 1).toUpperCase() || 'U'}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.email?.split('@')[0] || 'Guest User'}</div>
            <div className="user-email">{user?.email || 'guest@vibejobs.com'}</div>
          </div>
          <MoreHorizontal size={14} className="user-caret" />
        </button>
      </div>
    </aside>
  );
};
