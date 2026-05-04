import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { LogIn, UserPlus, Mail, Lock, Loader2, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AuthPanel = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setPanel } = useStore();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      setPanel('home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="panel" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <div className="auth-card" style={{ 
        background: 'var(--bg2)', 
        border: '1px solid var(--brd)', 
        borderRadius: 'var(--r)', 
        padding: '32px' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="logo-mark" style={{ margin: '0 auto 12px' }}>
            <Sparkles size={20} color="#06070D" />
          </div>
          <h2 style={{ fontFamily: 'var(--font)', fontWeight: 900, fontSize: '24px' }}>
            {isLogin ? 'Welcome Back' : 'Join RemoteHunt'}
          </h2>
          <p style={{ color: 'var(--txt2)', fontSize: '13px', marginTop: '4px' }}>
            {isLogin ? 'Sign in to sync your saved jobs' : 'Start your remote career today'}
          </p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(255,107,107,.1)', 
            border: '1px solid rgba(255,107,107,.2)', 
            color: 'var(--acc3)', 
            padding: '10px', 
            borderRadius: 'var(--r3)', 
            fontSize: '12px', 
            marginBottom: '16px' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="input-group">
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--txt3)' }} />
              <input 
                type="email" 
                className="chat-inp" 
                placeholder="Email address" 
                style={{ width: '100%', paddingLeft: '42px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--txt3)' }} />
              <input 
                type="password" 
                className="chat-inp" 
                placeholder="Password" 
                style={{ width: '100%', paddingLeft: '42px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', height: '44px' }} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--brd)' }}></div>
          <span style={{ fontSize: '11px', color: 'var(--txt3)', textTransform: 'uppercase', fontWeight: 700 }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--brd)' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <button className="btn-secondary" style={{ justifyContent: 'center' }} onClick={handleGoogleLogin}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px' }}>
          <span style={{ color: 'var(--txt2)' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--acc)', 
              fontWeight: 700, 
              marginLeft: '6px', 
              cursor: 'pointer' 
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
