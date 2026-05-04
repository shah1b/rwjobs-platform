import React from 'react';
import { Home, Search, Sparkles, Bookmark, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const BottomNav = () => {
  const { currentPanel, setPanel } = useStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Browse', icon: Search },
    { id: 'agent', label: 'Agent', icon: Sparkles },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bottom-mobile-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`mobile-nav-btn ${currentPanel === item.id ? 'active' : ''}`}
          onClick={() => setPanel(item.id as any)}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
