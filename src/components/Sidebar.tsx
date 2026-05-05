import React from 'react';
import { 
  LayoutDashboard, Search, Sparkles, Bookmark, 
  FileText, Bell, User, Settings, Command,
  ChevronDown, ChevronUp, MoreHorizontal, Home, X
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Sidebar = () => {
  const { currentPanel, setPanel, user, sidebarOpen, setSidebarOpen } = useStore();

  const navItems = [
    { id: 'landing', label: 'Public Home', icon: Home },
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
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="sb-brand" style={{ padding: '0 24px' }}>
          <div className="brand-icon" style={{ width: '32px', height: '32px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
            </svg>
          </div>
          <span className="brand-name" style={{ fontSize: '18px', fontWeight: 300 }}>
            <span style={{ fontWeight: 800 }}>Vibe</span>Jobs
          </span>
          <button className="mobile-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Search Trigger */}
        <div className="sb-search" style={{ padding: '16px 12px' }}>
          <div className="search-inner" style={{ padding: '10px 14px', background: 'var(--bg-muted)' }}>
            <Search size={14} color="var(--txt-3)" />
            <span style={{ fontSize: '13px' }}>Quick search...</span>
            <span className="search-kbd" style={{ fontSize: '9px' }}>⌘K</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sb-nav" style={{ padding: '8px 12px' }}>
          <div className="nav-group">
            <div className="nav-group-lbl" style={{ padding: '12px 12px 8px', fontSize: '11px', letterSpacing: '0.05em' }}>Discover</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
                onClick={() => setPanel(item.id as any)}
                style={{ padding: '10px 12px', gap: '12px', fontSize: '14px' }}
              >
                <item.icon size={18} style={{ opacity: currentPanel === item.id ? 1 : 0.6 }} />
                <span style={{ fontWeight: currentPanel === item.id ? 600 : 400 }}>{item.label}</span>
                {item.badge && (
                  <span className={`ni-badge ${item.badgeColor || ''}`} style={{ fontSize: '10px', padding: '2px 8px' }}>{item.badge}</span>
                )}
              </button>
            ))}
          </div>

          <div className="nav-sep" style={{ margin: '12px 12px' }}></div>

          <div className="nav-group">
            <div className="nav-group-lbl" style={{ padding: '12px 12px 8px', fontSize: '11px', letterSpacing: '0.05em' }}>My Workspace</div>
            {myJobs.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
                onClick={() => setPanel(item.id as any)}
                style={{ padding: '10px 12px', gap: '12px', fontSize: '14px' }}
              >
                <item.icon size={18} style={{ opacity: currentPanel === item.id ? 1 : 0.6 }} />
                <span style={{ fontWeight: currentPanel === item.id ? 600 : 400 }}>{item.label}</span>
                {item.badge && (
                  <span className={`ni-badge ${item.badgeColor || ''}`} style={{ fontSize: '10px', padding: '2px 8px' }}>{item.badge}</span>
                )}
              </button>
            ))}
          </div>

          <div className="nav-sep" style={{ margin: '12px 12px' }}></div>

          <div className="nav-group">
            <div className="nav-group-lbl" style={{ padding: '12px 12px 8px', fontSize: '11px', letterSpacing: '0.05em' }}>Settings</div>
            {account.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${currentPanel === item.id ? 'active' : ''}`}
                onClick={() => setPanel(item.id as any)}
                style={{ padding: '10px 12px', gap: '12px', fontSize: '14px' }}
              >
                <item.icon size={18} style={{ opacity: currentPanel === item.id ? 1 : 0.6 }} />
                <span style={{ fontWeight: currentPanel === item.id ? 600 : 400 }}>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="sb-footer" style={{ padding: '16px' }}>
          <button className="user-btn" style={{ padding: '10px' }}>
            <div className="user-av" style={{ width: '36px', height: '36px', fontSize: '13px' }}>
              {user?.email?.substring(0, 1).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <div className="user-name" style={{ fontSize: '14px', fontWeight: 600 }}>{user?.email?.split('@')[0] || 'Guest User'}</div>
              <div className="user-email" style={{ fontSize: '12px' }}>{user?.email || 'guest@vibejobs.com'}</div>
            </div>
            <MoreHorizontal size={16} className="user-caret" />
          </button>
        </div>
      </aside>
    </>
  );
};
