import React from 'react';
import { User, MapPin, Briefcase, Zap, Star } from 'lucide-react';

export const ProfilePanel = () => {
  return (
    <div className="panel">
      <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
        <div className="profile-sidebar">
          <div className="profile-card" style={{ 
            background: 'linear-gradient(145deg, #0B1A1A, #0B1422)',
            border: '1px solid rgba(200, 241, 53, .15)',
            borderRadius: 'var(--r)',
            padding: '28px',
            textAlign: 'center'
          }}>
            <div className="user-av" style={{ width: 80, height: 80, margin: '0 auto 14px', fontSize: 26 }}>H</div>
            <h2 className="profile-name" style={{ fontSize: 20, fontWeight: 900 }}>Hasan sh4hib</h2>
            <p style={{ color: 'var(--txt2)', fontSize: 13 }}>Creative Director & Brand Designer</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12, color: 'var(--txt3)', marginTop: 8 }}>
              <MapPin size={12} /> Dhaka, Bangladesh
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="settings-block" style={{ background: 'var(--bg2)', borderRadius: 'var(--r2)', border: '1px solid var(--brd)', marginBottom: '20px' }}>
            <div style={{ padding: 18, borderBottom: '1px solid var(--brd)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={14} color="var(--acc)" /> Job Preferences
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: 'var(--txt2)' }}>Work type</span>
                <span style={{ color: 'var(--acc)', fontWeight: 600 }}>Remote only</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: 'var(--txt2)' }}>Target Salary</span>
                <span style={{ color: 'var(--txt)', fontWeight: 600 }}>$60k – $120k</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--txt2)' }}>Availability</span>
                <span style={{ color: 'var(--acc2)', fontWeight: 600 }}>Immediate</span>
              </div>
            </div>
          </div>

          <div className="settings-block" style={{ background: 'var(--bg2)', borderRadius: 'var(--r2)', border: '1px solid var(--brd)' }}>
            <div style={{ padding: 18, borderBottom: '1px solid var(--brd)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={14} color="var(--acc4)" /> Skills & Expertise
            </div>
            <div style={{ padding: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Brand Design', 'UI/UX', 'Product Strategy', 'Typography', 'Visual Identity', 'Figma', 'React'].map(skill => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
