import React, { useState, useRef } from 'react';
import { User, MapPin, Briefcase, Zap, Star, LogOut, Settings, FileText, Plus, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';

export const ProfilePanel = () => {
  const { user, setPanel } = useStore();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setPanel('home');
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save to user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { resume_path: filePath }
      });

      if (updateError) throw updateError;
      alert('Resume uploaded successfully! Our AI is now ready to analyze it.');
    } catch (err: any) {
      alert('Error uploading resume: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="panel" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2>Sign in to view your profile</h2>
        <p style={{ color: 'var(--txt2)', marginBottom: '20px' }}>Manage your applications, saved jobs, and career preferences.</p>
        <button className="btn-primary" onClick={() => setPanel('auth')}>Sign In Now</button>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
        <div className="profile-sidebar">
          <div className="profile-card" style={{ 
            background: 'rgba(0,0,0,0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,0,0, 0.05)',
            borderRadius: 'var(--r)',
            padding: '28px',
            textAlign: 'center'
          }}>
            <div className="user-av" style={{ width: 80, height: 80, margin: '0 auto 14px', fontSize: 26 }}>
              {user.email?.substring(0, 1).toUpperCase()}
            </div>
            <h2 className="profile-name" style={{ fontSize: 20, fontWeight: 900 }}>{user.email?.split('@')[0]}</h2>
            <p style={{ color: 'var(--txt2)', fontSize: 13 }}>{user.user_metadata?.role || 'Remote Professional'}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12, color: 'var(--txt3)', marginTop: 8 }}>
              <MapPin size={12} /> {user.user_metadata?.location || 'Location not set'}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Settings size={14} />
                Edit Profile
              </button>
              <button 
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'center', color: 'var(--acc3)', borderColor: 'rgba(255,107,107,.2)' }}
                onClick={handleLogout}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="settings-block" style={{ background: 'rgba(0,0,0,0.02)', backdropFilter: 'blur(20px)', borderRadius: 'var(--r2)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <div style={{ padding: 18, borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
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

          <div className="settings-block" style={{ background: 'rgba(0,0,0,0.02)', backdropFilter: 'blur(20px)', borderRadius: 'var(--r2)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <div style={{ padding: 18, borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={14} color="var(--acc4)" /> Skills & Expertise
            </div>
            <div style={{ padding: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Brand Design', 'UI/UX', 'Product Strategy', 'Typography', 'Visual Identity', 'Figma', 'React'].map(skill => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="settings-block" style={{ gridColumn: 'span 2', background: 'rgba(0,0,0,0.02)', backdropFilter: 'blur(20px)', borderRadius: 'var(--r2)', border: '1px solid rgba(0,0,0,0.05)', padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800 }}>Resume & AI Matching</h3>
              <div style={{ fontSize: 11, background: 'rgba(0, 82, 255, .1)', color: 'var(--acc)', padding: '4px 8px', borderRadius: 4, fontWeight: 700 }}>AI Powered</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ border: '1px dashed rgba(0,0,0,0.1)', borderRadius: 'var(--r)', padding: '24px', textAlign: 'center' }}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                />
                <FileText size={32} style={{ margin: '0 auto 12px', color: user.user_metadata?.resume_path ? 'var(--acc)' : 'var(--txt3)' }} />
                <h4 style={{ fontSize: 14, marginBottom: 4 }}>
                  {user.user_metadata?.resume_path ? 'Resume Uploaded' : 'Upload Resume'}
                </h4>
                <p style={{ fontSize: 12, color: 'var(--txt2)', marginBottom: 16 }}>
                  {user.user_metadata?.resume_path ? 'Ready for AI analysis' : 'PDF or Word, max 5MB'}
                </p>
                <button 
                  className="btn-primary" 
                  style={{ fontSize: 12, padding: '8px 16px' }} 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? <Loader2 className="animate-spin" size={14} /> : (
                    <><Plus size={14} /> {user.user_metadata?.resume_path ? 'Update File' : 'Select File'}</>
                  )}
                </button>
              </div>
              <div>
                <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                  Upload your resume to let our AI agent analyze your experience. It will automatically:
                </p>
                <ul style={{ fontSize: 12, color: 'var(--txt2)', marginTop: 12, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>✨ Highlight your top skills</li>
                  <li>🔍 Suggest perfectly matched remote roles</li>
                  <li>✍️ Draft personalized cover letters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
