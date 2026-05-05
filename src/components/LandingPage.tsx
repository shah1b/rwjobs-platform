import React from 'react';
import { Sparkles, Bot, FileText, Globe, ArrowRight, Zap, TrendingUp, ShieldCheck, Cpu, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

export const LandingPage = () => {
  const { setPanel, user } = useStore();

  return (
    <div className="vibe-landing">
      {/* Dynamic Background */}
      <div className="bg-noise" />
      <div className="radial-glow top-right" />
      <div className="radial-glow bottom-left" />

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
              <button className="btn-v-primary-sm" onClick={() => setPanel('auth')}>Sign In</button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="v-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text-content">
              <div className="v-badge">
                <div className="v-badge-dot" />
                <span>Next-Gen Career Intelligence</span>
              </div>
              <h1 className="hero-title">
                The Future of <span className="text-gradient">Remote Work</span> in Bangladesh.
              </h1>
              <p className="hero-subtitle">
                VibeJobs leverages Gemini-powered AI to bridge the gap between Bangladeshi talent and global USD opportunities. No more manual searching. Just perfect matches.
              </p>
              <div className="hero-cta-group">
                {user ? (
                  <button className="btn-v-primary-lg" onClick={() => setPanel('browse')}>
                    Go to Dashboard <ArrowRight size={20} />
                  </button>
                ) : (
                  <button className="btn-v-primary-lg" onClick={() => setPanel('auth')}>
                    Start Your Journey <ArrowRight size={20} />
                  </button>
                )}
                <div className="trust-badge">
                  <div className="trust-avatars">
                    <div className="t-av" style={{ background: '#FF6B6B' }}>A</div>
                    <div className="t-av" style={{ background: '#4ECDC4' }}>S</div>
                    <div className="t-av" style={{ background: '#FFE66D' }}>R</div>
                  </div>
                  <span>Joined by 1.2k+ Pros</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="v-card-stack">
                <div className="v-card v-card-1">
                  <div className="v-card-header">
                    <Bot size={16} color="var(--acc)" />
                    <span>AI Analysis Complete</span>
                  </div>
                  <div className="v-card-body">
                    <div className="v-bar" style={{ width: '85%' }} />
                    <div className="v-bar" style={{ width: '60%' }} />
                  </div>
                </div>
                <div className="v-card v-card-2">
                  <TrendingUp size={24} color="var(--acc)" />
                  <div className="v-card-val">$84k<span>/yr</span></div>
                  <div className="v-card-label">Avg. Match Salary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid (Anthropics Design Style) */}
      <section id="features" className="v-features">
        <div className="container">
          <div className="v-section-header">
            <h2 className="v-title">Engineered for <span>Impact</span></h2>
            <p className="v-subtitle">We've built the most advanced toolkit for the modern remote professional.</p>
          </div>

          <div className="v-bento-grid">
            <div className="v-bento-card bento-hero">
              <div className="bento-icon"><Cpu size={32} /></div>
              <h3>Gemini Match Engine</h3>
              <p>Our deep-learning engine analyzes your resume's DNA to find roles that perfectly align with your technical stack and career trajectory.</p>
              <div className="bento-visual match-visual">
                <div className="m-circle">98% Match</div>
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
                <p>Live BDT conversion (1 USD = 120 BDT) integrated across the platform. Know your local purchasing power instantly.</p>
              </div>
              <div className="bento-taka-visual">
                <div className="taka-bubble">$5,000</div>
                <ArrowRight size={16} />
                <div className="taka-bubble highlight">৳6,00,000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Vision */}
      <section id="vision" className="v-vision">
        <div className="container">
          <div className="vision-card">
            <div className="vision-star"><Star fill="var(--acc)" size={24} /></div>
            <h2>Building the elite remote community of Bangladesh.</h2>
            <p>VibeJobs isn't just a job board. It's a career accelerator for the top 1% of talent in the region.</p>
            <button className="btn-v-primary-lg" onClick={() => setPanel('auth')}>Join the Community</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="v-footer">
        <div className="container v-footer-inner">
          <div className="logo-group">
            <img src="/Logo- VJ.png" alt="VibeJobs" className="nav-logo-img" />
          </div>
          <div className="footer-copyright">
            © 2026 VibeJobs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
