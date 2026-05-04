import React from 'react';
import { LayoutDashboard, Search, Sparkles, Bookmark, FileText, Bell, User, Settings, MoreHorizontal } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Sidebar = () => {
  const { currentPanel, setPanel } = useStore();

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard, badge: 'New', badgeColor: 'green' },
    { id: 'browse', label: 'Browse Jobs', icon: Search, badge: '247' },
    { id: 'agent', label: 'AI Agent', icon: Sparkles },
  ];

  const myJobs = [
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark },
    { id: 'apps', label: 'Applications', icon: FileText, badge: '3' },
    { id: 'alerts', label: 'Job Alerts', icon: Bell },
  ];

  const account = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-area">
        <div className="logo">
          <div className="logo-mark">
            <Sparkles size={20} />
          </div>
          <span className="logo-text">Remote<span>Hunt</span></span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-label">Discover</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
              onClick={() => setPanel(item.id as any)}
            >
              <item.icon size={18} />
              {item.label}
              {item.badge && (
                <span className={`nav-badge ${item.badgeColor || ''}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </div>

        <div className="nav-section">
          <div className="nav-section-label">My Jobs</div>
          {myJobs.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
              onClick={() => setPanel(item.id as any)}
            >
              <item.icon size={18} />
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </div>

        <div className="nav-section">
          <div className="nav-section-label">Account</div>
          {account.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
              onClick={() => setPanel(item.id as any)}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-bottom">
        <div className="user-card" onClick={() => setPanel('profile')}>
          <div className="user-av">H</div>
          <div className="user-info">
            <div className="user-name">Hasan sh4hib</div>
            <div className="user-role">Brand Designer · GMT+6</div>
          </div>
          <MoreHorizontal size={14} className="user-dots" />
        </div>
      </div>
    </aside>
  );
};
