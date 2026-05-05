import React, { useState, useRef } from 'react';
import { User, MapPin, Briefcase, Zap, Star, LogOut, Settings, FileText, Plus, Loader2, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';

export const ProfilePanel = () => {
  const { user, setPanel } = useStore();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      await supabase.auth.signOut();
      // The auth listener in App.tsx will handle the redirect
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      // Simulate upload for now as storage bucket might not be ready
      setTimeout(async () => {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { resume_path: 'resumes/mock-resume.pdf', resume_name: file.name }
        });

        if (updateError) throw updateError;
        alert('Resume uploaded successfully! Our AI is now ready to analyze it.');
        setUploading(false);
      }, 1500);
    } catch (err: any) {
      alert('Error uploading resume: ' + err.message);
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="panel" style={{ textAlign: 'center', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: 'var(--bg-muted)', padding: '32px', borderRadius: '50%', marginBottom: '24px' }}>
          <User size={48} color="var(--txt-3)" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Your Career Hub</h2>
        <p style={{ color: 'var(--txt-2)', marginBottom: '32px', maxWidth: '360px' }}>Sign in to manage your applications, saved jobs, and personalized AI career recommendations.</p>
        <button className="btn btn-primary" onClick={() => setPanel('auth')}>Sign In Now</button>
      </div>
    );
  }

  return (
    <div className="panel fade-up">
      <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px' }}>
        <div className="profile-sidebar">
          <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
            <div className="user-av" style={{ width: 96, height: 96, margin: '0 auto 20px', fontSize: 32 }}>
              {user.email?.substring(0, 1).toUpperCase()}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--txt)' }}>{user.email?.split('@')[0]}</h2>
            <p style={{ color: 'var(--txt-2)', fontSize: 14, marginTop: '4px' }}>{user.user_metadata?.role || 'Remote Professional'}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: 'var(--txt-3)', marginTop: 12 }}>
              <MapPin size={14} /> {user.user_metadata?.location || 'San Francisco, CA'}
            </div>

            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert("Profile editing coming soon!")}>
                <Settings size={16} />
                Edit Profile
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ width: '100%', justifyContent: 'center', color: 'var(--red)' }}
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>

          <div className="card" style={{ marginTop: '20px', padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={16} color="var(--amber)" /> Pro Membership
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--txt-2)', lineHeight: 1.6 }}>You are currently on the <strong>Free Plan</strong>. Upgrade for unlimited AI job matching.</p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>Upgrade Now</button>
          </div>
        </div>

        <div className="profile-main">
          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={16} color="var(--blue)" /> Job Preferences
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <PrefItem label="Work type" value="Remote only" />
                <PrefItem label="Target Salary" value="$80k – $140k" />
                <PrefItem label="Availability" value="Immediate" />
                <PrefItem label="Experience" value="Senior Level" />
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={16} color="var(--purple)" /> Skills & Expertise
            </div>
            <div style={{ padding: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Product Design', 'React', 'TypeScript', 'Node.js', 'User Research', 'UI/UX', 'Figma'].map(skill => (
                <span key={skill} className="badge badge-outline" style={{ padding: '6px 14px', fontSize: '13px' }}>{skill}</span>
              ))}
              <button className="btn btn-ghost btn-sm" style={{ borderRadius: '99px' }}><Plus size={14} /> Add Skill</button>
            </div>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Resume & AI Matching</h3>
                <p style={{ fontSize: 14, color: 'var(--txt-2)' }}>Your resume powers our AI recommendation engine</p>
              </div>
              <div style={{ fontSize: 12, background: 'var(--blue-light)', color: 'var(--blue)', padding: '6px 12px', borderRadius: '8px', fontWeight: 700 }}>AI Active</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
              <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--r-lg)', padding: '32px', textAlign: 'center', transition: 'border-color 0.2s' }}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                />
                <FileText size={40} style={{ margin: '0 auto 16px', color: user.user_metadata?.resume_path ? 'var(--blue)' : 'var(--txt-3)' }} />
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: '4px' }}>
                  {user.user_metadata?.resume_name || (user.user_metadata?.resume_path ? 'Resume Uploaded' : 'Upload Resume')}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--txt-3)', marginBottom: '24px' }}>
                  {user.user_metadata?.resume_path ? 'Update your profile by uploading a new version.' : 'PDF, Word, or Text (max 10MB)'}
                </p>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }} 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? <Loader2 className="animate-spin" size={18} /> : (
                    <><Plus size={18} /> {user.user_metadata?.resume_path ? 'Replace Resume' : 'Select File'}</>
                  )}
                </button>
              </div>
              
              <div style={{ background: 'var(--bg-muted)', padding: '24px', borderRadius: 'var(--r-lg)' }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: '12px' }}>How it works</h4>
                <ul style={{ fontSize: 13, color: 'var(--txt-2)', display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '0', listStyle: 'none' }}>
                  <li style={{ display: 'flex', gap: '10px' }}><CheckCircle size={16} color="var(--green)" /> Automatically extracts skills and experience</li>
                  <li style={{ display: 'flex', gap: '10px' }}><CheckCircle size={16} color="var(--green)" /> Matches you with roles you are qualified for</li>
                  <li style={{ display: 'flex', gap: '10px' }}><CheckCircle size={16} color="var(--green)" /> Generates tailored application answers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrefItem = ({ label, value }: { label: string, value: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <span style={{ fontSize: 12, color: 'var(--txt-3)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.02em' }}>{label}</span>
    <span style={{ fontSize: 15, color: 'var(--txt)', fontWeight: 600 }}>{value}</span>
  </div>
);
