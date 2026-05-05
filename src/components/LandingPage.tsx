import React from 'react';
import { Bot, Globe, ArrowRight, Zap, ShieldCheck, Cpu, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

export const LandingPage = () => {
  const { setPanel, setAuthMode, user } = useStore();

  return (
    <div className="vibe-landing">
      {/* Navbar */}
      <nav className="v-nav">
        <div className="container v-nav-inner">
          <div className="logo-group" onClick={() => setPanel('home')}>
            <img src="/Logo- VJ.png" alt="VibeJobs" className="nav-logo-img" />
          </div>
          
          <div className="nav-actions">
            <a href="#features" className="nav-link">Platform</a>
            <a href="#vision" className="nav-link">Vision</a>
            {user ? (
              <button className="btn-v-primary-sm" onClick={() => setPanel('browse')}>Enter App</button>
            ) : (
              <button className="btn-v-primary-sm" onClick={() => { setAuthMode('login'); setPanel('auth'); }}>Sign In</button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="v-hero">
        <div className="container">
          <div className="hero-content-minimal">
            <div className="v-badge">
              <div className="v-badge-dot" />
              <span>Next-Gen Career Intelligence</span>
            </div>
            <h1 className="hero-title">
              Elevate your career.<br />
              <span className="text-vibe">Work globally from Bangladesh.</span>
            </h1>
            <p className="hero-subtitle">
              VibeJobs leverages deep-learning AI to match elite Bangladeshi talent with premium remote USD opportunities. Minimal noise. Maximum impact.
            </p>
            <div className="hero-cta-minimal">
              {user ? (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-v-primary-lg" onClick={() => setPanel('home')}>
                    Go to Dashboard <ArrowRight size={20} />
                  </button>
                  <button className="btn-v-secondary-lg" onClick={() => setPanel('landing')}>
                    Explore Landing
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button className="btn-v-primary-lg" onClick={() => { setAuthMode('login'); setPanel('auth'); }}>
                    Start Your Journey <ArrowRight size={20} />
                  </button>
                  <button className="btn-v-secondary-lg" onClick={() => { setAuthMode('signup'); setPanel('auth'); }}>
                    SignUp
                  </button>
                </div>
              )}
              <div className="trust-minimal">
                <span className="trust-number">1.2k+</span>
                <span className="trust-label">Professionals Joined</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="v-features">
        <div className="container">
          <div className="v-section-header">
            <h2 className="v-title">Engineered for Excellence</h2>
            <p className="v-subtitle">The most advanced toolkit for the modern remote professional.</p>
          </div>

          <div className="v-bento-grid">
            <div className="v-bento-card bento-hero">
              <div className="bento-icon"><Cpu size={32} /></div>
              <h3>AI Match Engine</h3>
              <p>Our deep-learning engine analyzes your profile's DNA to find roles that perfectly align with your technical stack.</p>
              <div className="match-visual-minimal">
                <div className="m-circle-minimal">98%<br/><span>Match</span></div>
              </div>
            </div>

            <div className="v-bento-card">
              <div className="bento-icon"><ShieldCheck size={24} /></div>
              <h3>Verified USD Roles</h3>
              <p>Every job on VibeJobs is verified for remote-friendly cultures and competitive global pay.</p>
            </div>

            <div className="v-bento-card">
              <div className="bento-icon"><Globe size={24} /></div>
              <h3>GMT+6 Optimized</h3>
              <p>Filter roles by timezone flexibility. Find companies that value your lifestyle.</p>
            </div>

            <div className="v-bento-card bento-wide">
              <div className="bento-content-side">
                <div className="bento-icon"><Zap size={24} /></div>
                <h3>Taka Transparency</h3>
                <p>Live BDT conversion integrated across the platform. Know your local purchasing power instantly.</p>
              </div>
              <div className="bento-taka-minimal">
                <div className="taka-val">$5,000</div>
                <ArrowRight size={16} color="var(--txt3)" />
                <div className="taka-val highlight">৳6,00,000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="v-vision">
        <div className="container">
          <div className="vision-card-minimal">
            <Star className="vision-star-icon" size={32} />
            <h2>The elite remote community.</h2>
            <p>A career accelerator for the top 1% of talent in the region.</p>
            <button className="btn-v-secondary-lg" onClick={() => setPanel('auth')}>Join the Community</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="v-footer">
        <div className="container v-footer-inner">
          <div className="logo-group">
            <img src="/Logo- VJ.png" alt="VibeJobs" className="nav-logo-img" />
          </div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
