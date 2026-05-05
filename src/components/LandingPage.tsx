import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const LandingPage = () => {
  const { setPanel, setAuthMode, user, jobs } = useStore();
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingMode, setBillingMode] = useState<'monthly'|'annual'>('monthly');
  const [nlSubscribed, setNlSubscribed] = useState(false);
  const [nlEmail, setNlEmail] = useState('');

  const faqs = [
    {q:"How does the AI matching work?",a:"We parse your CV using a fine-tuned language model, extract your skills and experience, then score every live job against your profile — factoring in skill overlap, seniority, industry, and location. Each role gets a 0–100 compatibility score."},
    {q:"Is my CV data stored securely?",a:"Yes. All CVs are encrypted at rest (AES-256) and in transit (TLS 1.3). We never sell your data, and you can delete everything permanently at any time from your settings."},
    {q:"What file formats do you support?",a:"PDF, DOCX, and TXT up to 10MB. You can also paste your LinkedIn URL or describe your experience manually — no CV required to get started."},
    {q:"How is VibeJobs different from LinkedIn or Indeed?",a:"Traditional boards make you search. VibeJobs makes jobs find you — ranked by genuine suitability, not sponsorship. We also give actionable skill gap insights and AI-written cover letters, not just listings."},
    {q:"Can I use VibeJobs as a recent graduate?",a:"Absolutely. Our model is trained on entry-level and graduate roles and weighs academic projects, internships, and transferable skills. Being early in your career is never a disadvantage with our AI."},
    {q:"What if I want to change industries?",a:"Enable Career Pivot Mode in your preferences. Our AI will emphasize transferable skills and surface roles that value your background as a unique asset — not a liability."},
  ];

  const topJobs = jobs.slice(0, 5);

  const handleSubscribe = () => {
    if (nlEmail && nlEmail.includes('@')) {
      setNlSubscribed(true);
    }
  };

  const handleNavJobs = () => {
    if (user) setPanel('browse');
    else { setAuthMode('login'); setPanel('auth'); }
  };

  const handleAuth = (mode: 'login'|'signup') => {
    if (user) {
      setPanel('home');
    } else {
      setAuthMode(mode);
      setPanel('auth');
    }
  };

  return (
    <div className="lp-wrap">
      {/* NAV */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <a className="lp-logo" onClick={() => user ? setPanel('home') : null}>
            <div className="lp-logo-mark">⚡</div>
            <span className="lp-logo-text" style={{ fontWeight: 300 }}>
              <span style={{ fontWeight: 800 }}>Vibe</span>Jobs
            </span>
          </a>
          <div className="lp-nav-links">
            <button className="lp-nav-btn" onClick={handleNavJobs}>Jobs</button>
            <button className="lp-nav-btn">Blog</button>
            <button className="lp-nav-btn" onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})}>Pricing</button>
            <button className="lp-nav-btn">About</button>
          </div>
          <div className="lp-nav-actions">
            {user ? (
              <button className="btn btn-primary btn-sm" onClick={() => setPanel('home')}>Dashboard</button>
            ) : (
              <>
                <button className="btn btn-ghost btn-sm" onClick={() => handleAuth('login')}>Sign in</button>
                <button className="btn btn-primary btn-sm" onClick={() => handleAuth('signup')}>Get Started</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-orb lp-orb1"></div>
        <div className="lp-orb lp-orb2"></div>
        <div className="lp-orb lp-orb3"></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            AI-Powered Job Matching — Now in Beta
          </div>
          <h1 className="hero-h">
            Your dream job,<br /><em>found for you.</em>
          </h1>
          <p className="hero-sub">
            Upload your CV and our AI agents match you with the best roles, analyze skill gaps, and write personalized cover letters — in under 60 seconds.
          </p>
          <div className="hero-cta-row">
            <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }} onClick={() => handleAuth('signup')}>⚡ Get Your Matches Free</button>
            <button className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '16px' }} onClick={handleNavJobs}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              Browse Jobs
            </button>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-val">{jobs.length > 0 ? jobs.length : '50+'}</div><div className="hero-stat-lbl">Live Remote Roles</div></div>
            <div><div className="hero-stat-val">AI</div><div className="hero-stat-lbl">Match Scoring</div></div>
            <div><div className="hero-stat-val">24/7</div><div className="hero-stat-lbl">Real-time Alerts</div></div>
            <div><div className="hero-stat-val">60s</div><div className="hero-stat-lbl">CV Analysis</div></div>
          </div>

          {/* Card Mockup */}
          <div className="hero-mockup" style={{ marginTop: '56px' }}>
            <div className="mock-card">
              <div className="mock-header">
                <div className="mock-logo" style={{ background: '#5E6AD215', color: '#5E6AD2', border: '1px solid var(--border)' }}>L</div>
                <div style={{ flex: 1 }}>
                  <div className="mock-job-title">Senior Product Designer</div>
                  <div className="mock-job-co">Linear · Remote (US) · $140k–$175k</div>
                </div>
                <div className="ring-wrap">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border-strong)" strokeWidth="4" />
                    <circle cx="24" cy="24" r="20" fill="none" stroke="var(--green)" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray="118.4 125.6" transform="rotate(-90 24 24)" />
                  </svg>
                  <span className="ring-val">94</span>
                </div>
              </div>
              <div className="mock-pills">
                <span className="mpill mpill-grn">Figma</span>
                <span className="mpill mpill-grn">Design Systems</span>
                <span className="mpill mpill-grn">UX Research</span>
                <span className="mpill mpill-amber">Accessibility</span>
                <span className="mpill mpill-neutral">Prototyping</span>
              </div>
              <div className="mock-bar"><div className="mock-bar-fill" style={{ width: '94%' }}></div></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--txt-3)', marginTop: '4px' }}>
                <span>Skill match</span>
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>Excellent fit ✓</span>
              </div>
              <div className="mock-actions">
                <button className="mock-btn-p">Apply Now →</button>
                <button className="mock-btn-s">Cover Letter</button>
                <button className="mock-btn-s">Skill Gap</button>
              </div>
            </div>
            <div className="mock-notif">
              <div className="mock-notif-icon">🔔</div>
              <div>
                <div className="mock-notif-title">3 new matches today</div>
                <div className="mock-notif-sub">Based on your updated profile · just now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <div className="logo-strip-sec">
        <div className="logo-strip-label">Trusted by people from</div>
        <div className="logo-strip">
          <div className="logo-item">Stripe</div>
          <div className="logo-item">Notion</div>
          <div className="logo-item">Linear</div>
          <div className="logo-item">Vercel</div>
          <div className="logo-item">Figma</div>
          <div className="logo-item">Monzo</div>
          <div className="logo-item">Revolut</div>
          <div className="logo-item">Pitch</div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="lp-sec">
        <div className="lp-sec-inner">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-tag">Features</div>
            <h2 className="sec-h">Everything your job search needs</h2>
            <p className="sec-sub" style={{ maxWidth: '500px', margin: '0 auto' }}>Six AI-powered tools that work together to get you hired faster and smarter.</p>
          </div>
          <div className="feat-grid">
            <div className="feat-item">
              <div className="feat-icon" style={{ background: 'var(--green-light)' }}>🧠</div>
              <div className="feat-title">AI-Powered Matching</div>
              <div className="feat-desc">Our model reads your CV and scores thousands of live jobs by skill, seniority, and growth potential.</div>
            </div>
            <div className="feat-item">
              <div className="feat-icon" style={{ background: 'var(--amber-light)' }}>⚡</div>
              <div className="feat-title">Instant Results</div>
              <div className="feat-desc">Get a curated shortlist of your best roles in under 60 seconds. No endless scrolling, no wasted applications.</div>
            </div>
            <div className="feat-item">
              <div className="feat-icon" style={{ background: 'var(--blue-light)' }}>📊</div>
              <div className="feat-title">Skill Gap Analysis</div>
              <div className="feat-desc">See exactly which skills you have, which you're missing, and a learning path to close the gap fast.</div>
            </div>
            <div className="feat-item">
              <div className="feat-icon" style={{ background: 'var(--purple-light)' }}>✉️</div>
              <div className="feat-title">AI Cover Letters</div>
              <div className="feat-desc">One click generates a compelling, company-specific cover letter based on your profile and the role's description.</div>
            </div>
            <div className="feat-item">
              <div className="feat-icon" style={{ background: 'var(--green-light)' }}>🎯</div>
              <div className="feat-title">Smart Job Alerts</div>
              <div className="feat-desc">Get notified the moment a new role matches your profile — never miss a perfect fit again.</div>
            </div>
            <div className="feat-item">
              <div className="feat-icon" style={{ background: 'var(--amber-light)' }}>🎤</div>
              <div className="feat-title">Interview Prep AI</div>
              <div className="feat-desc">Practice answers with an AI coach that tailors questions to the specific role and company you're targeting.</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hiw-sec">
        <div className="lp-sec-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="sec-tag">How It Works</div>
            <h2 className="sec-h">From CV to offer in 4 steps</h2>
            <p className="sec-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>No manual searching. Our AI does the heavy lifting.</p>
          </div>
          <div className="steps-row">
            <div className="step-item">
              <div className="step-num">01</div>
              <div className="step-title">Upload Your CV</div>
              <div className="step-desc">Drop a PDF, DOCX, or paste text. Our parser extracts your full profile in seconds.</div>
            </div>
            <div className="step-item">
              <div className="step-num">02</div>
              <div className="step-title">Get Matched</div>
              <div className="step-desc">AI scores thousands of live jobs against your profile and surfaces your best matches.</div>
            </div>
            <div className="step-item">
              <div className="step-num">03</div>
              <div className="step-title">Close the Gap</div>
              <div className="step-desc">Review your skill gap report and generate a tailored cover letter with one click.</div>
            </div>
            <div className="step-item">
              <div className="step-num">04</div>
              <div className="step-title">Apply & Track</div>
              <div className="step-desc">Apply directly through VibeJobs and track all your applications in one dashboard.</div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE JOBS PREVIEW */}
      <section className="lp-sec" style={{ paddingTop: '72px', paddingBottom: '72px' }}>
        <div className="lp-sec-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
            <div>
              <div className="sec-tag">Live Roles</div>
              <h2 className="sec-h" style={{ marginBottom: 0 }}>Featured jobs right now</h2>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={handleNavJobs}>View all {jobs.length > 0 ? jobs.length : '800+'}+ roles →</button>
          </div>
          <p className="sec-sub" style={{ marginBottom: 0 }}>A taste of what's waiting for you.</p>
          <div className="jobs-preview-grid">
            {topJobs.map((job, idx) => (
              <div key={job.id} className={`job-prev-card ${idx < 2 ? 'feat' : ''}`} onClick={handleNavJobs}>
                <div className="job-prev-header">
                  <div className="job-prev-logo" style={{ background: job.logoColor, color: job.logoText }}>{job.logo}</div>
                  <div style={{ flex: 1 }}>
                    <div className="job-prev-title">{job.title}</div>
                    <div className="job-prev-meta">{job.company} · {job.location || 'Remote'}</div>
                  </div>
                  <div className="job-prev-salary">{job.salary || 'Competitive'}</div>
                </div>
                <div className="job-prev-skills">
                  {job.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="job-skill-pill">{tag}</span>
                  ))}
                  {job.tags.length > 3 && (
                    <span className="job-skill-pill">+{job.tags.length - 3}</span>
                  )}
                </div>
              </div>
            ))}
            <div className="job-prev-card" style={{ border: '1px dashed var(--border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '120px', cursor: 'pointer', background: 'transparent' }} onClick={handleNavJobs}>
              <div style={{ fontSize: '24px' }}>+</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--txt-2)' }}>{jobs.length > 5 ? jobs.length - 5 : '800'}+ more roles</div>
              <div style={{ fontSize: '12px', color: 'var(--txt-3)' }}>Sign up to see matches</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lp-sec" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="lp-sec-inner">
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div className="sec-tag">Testimonials</div>
            <h2 className="sec-h">People who found their next role</h2>
            <p className="sec-sub" style={{ maxWidth: '460px', margin: '0 auto' }}>Real results from real job seekers.</p>
          </div>
          <div className="testi-grid">
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">"I went from uploading my CV to three interviews in under a week. The skill gap breakdown made my cover letters actually relevant for the first time."</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: '#3B82F6' }}>PN</div>
                <div>
                  <div className="testi-name">Priya Nair</div>
                  <div className="testi-role">Sr. Product Designer → Monzo</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">"I'd been passively searching for months. VibeJobs surfaced a role I'd never have found myself — perfect match in every dimension. Landed the job in 3 weeks."</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: '#22C55E' }}>JO</div>
                <div>
                  <div className="testi-name">James Okafor</div>
                  <div className="testi-role">Software Engineer → Revolut</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">"The AI cover letter feature is frighteningly good. It understood my tone and the specific angle each company was looking for. Saved hours every application."</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: '#A855F7' }}>SL</div>
                <div>
                  <div className="testi-name">Sara Lindqvist</div>
                  <div className="testi-role">Head of Marketing → Pitch</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">"VibeJobs scored me a 94% match before I even knew the role existed. The interview prep suggestions were spot-on — I walked in with complete confidence."</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: '#F59E0B', color: '#000' }}>DP</div>
                <div>
                  <div className="testi-name">David Park</div>
                  <div className="testi-role">ML Engineer → Anthropic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="lp-sec" id="pricing">
        <div className="lp-sec-inner">
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div className="sec-tag">Pricing</div>
            <h2 className="sec-h">Simple, transparent pricing</h2>
            <p className="sec-sub" style={{ maxWidth: '440px', margin: '0 auto' }}>Start free. Upgrade when you're ready.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '28px 0' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: '10px', padding: '4px', display: 'inline-flex' }}>
              <button onClick={() => setBillingMode('monthly')} style={{ padding: '7px 18px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: '7px', fontFamily: 'var(--font)', background: billingMode === 'monthly' ? 'var(--green)' : 'transparent', color: billingMode === 'monthly' ? '#000' : 'var(--txt-3)', transition: 'all 0.18s' }}>Monthly</button>
              <button onClick={() => setBillingMode('annual')} style={{ padding: '7px 18px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', borderRadius: '7px', fontFamily: 'var(--font)', background: billingMode === 'annual' ? 'var(--green)' : 'transparent', color: billingMode === 'annual' ? '#000' : 'var(--txt-3)', transition: 'all 0.18s' }}>Annual <span style={{ fontSize: '11px', fontWeight: 700, color: billingMode === 'annual' ? '#000' : 'var(--green)' }}>(−20%)</span></button>
            </div>
          </div>
          <div className="pricing-grid">
            {/* Starter */}
            <div className="price-card">
              <div className="price-name" style={{ color: 'var(--txt)' }}>Starter</div>
              <div style={{ display: 'flex', alignItems: 'baseline', margin: '10px 0' }}>
                <span className="price-amount" style={{ color: 'var(--txt)' }}>$0</span>
                <span className="price-per">/ forever free</span>
              </div>
              <p className="price-desc" style={{ color: 'var(--txt-3)' }}>Perfect for casual explorers and students.</p>
              <div className="price-feat-list">
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> 5 AI job matches / month</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> CV upload & parsing</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> Basic skill analysis</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> 1 job alert keyword</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> Community access</div>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }} onClick={() => handleAuth('signup')}>Get Started Free</button>
            </div>
            {/* Pro */}
            <div className="price-card highlight">
              <div className="price-badge">Most Popular</div>
              <div className="price-name" style={{ color: '#000' }}>Pro</div>
              <div style={{ display: 'flex', alignItems: 'baseline', margin: '10px 0' }}>
                <span className="price-amount" style={{ color: '#000' }}>${billingMode === 'monthly' ? '19' : '15'}</span>
                <span className="price-per hl">/ month {billingMode === 'annual' ? '(billed annually)' : ''}</span>
              </div>
              <p className="price-desc" style={{ color: 'rgba(0,0,0,.6)' }}>Everything you need for a serious job search.</p>
              <div className="price-feat-list">
                <div className="price-feat-item" style={{ color: 'rgba(0,0,0,.75)' }}><div className="price-check" style={{ background: 'rgba(255,255,255,.25)', color: '#000' }}>✓</div> Unlimited AI job matches</div>
                <div className="price-feat-item" style={{ color: 'rgba(0,0,0,.75)' }}><div className="price-check" style={{ background: 'rgba(255,255,255,.25)', color: '#000' }}>✓</div> Advanced skill gap analysis</div>
                <div className="price-feat-item" style={{ color: 'rgba(0,0,0,.75)' }}><div className="price-check" style={{ background: 'rgba(255,255,255,.25)', color: '#000' }}>✓</div> Unlimited cover letters</div>
                <div className="price-feat-item" style={{ color: 'rgba(0,0,0,.75)' }}><div className="price-check" style={{ background: 'rgba(255,255,255,.25)', color: '#000' }}>✓</div> One-click apply</div>
                <div className="price-feat-item" style={{ color: 'rgba(0,0,0,.75)' }}><div className="price-check" style={{ background: 'rgba(255,255,255,.25)', color: '#000' }}>✓</div> Application tracker</div>
                <div className="price-feat-item" style={{ color: 'rgba(0,0,0,.75)' }}><div className="price-check" style={{ background: 'rgba(255,255,255,.25)', color: '#000' }}>✓</div> Interview prep AI</div>
                <div className="price-feat-item" style={{ color: 'rgba(0,0,0,.75)' }}><div className="price-check" style={{ background: 'rgba(255,255,255,.25)', color: '#000' }}>✓</div> Priority support</div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '24px', background: '#000', color: '#fff' }} onClick={() => handleAuth('signup')}>Start 14-Day Free Trial</button>
            </div>
            {/* Teams */}
            <div className="price-card">
              <div className="price-name" style={{ color: 'var(--txt)' }}>Teams</div>
              <div style={{ display: 'flex', alignItems: 'baseline', margin: '10px 0' }}>
                <span className="price-amount" style={{ color: 'var(--txt)' }}>${billingMode === 'monthly' ? '49' : '39'}</span>
                <span className="price-per">/ seat / month {billingMode === 'annual' ? '(billed annually)' : ''}</span>
              </div>
              <p className="price-desc" style={{ color: 'var(--txt-3)' }}>For talent teams and career services.</p>
              <div className="price-feat-list">
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> Everything in Pro</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> Team dashboard</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> Bulk CV uploads</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> Recruiter API access</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> Analytics & reporting</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> Dedicated success manager</div>
                <div className="price-feat-item" style={{ color: 'var(--txt-2)' }}><div className="price-check" style={{ background: 'var(--green-light)' }}>✓</div> SSO & compliance</div>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }} onClick={() => document.location.href = 'mailto:sales@vibejobs.com'}>Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp-sec" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
        <div className="lp-sec-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="sec-tag">FAQ</div>
            <h2 className="sec-h">Common questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="faq-q-text">{f.q}</span>
                  <span className={`faq-icon ${openFaq === i ? 'open' : ''}`}>+</span>
                </button>
                {openFaq === i && <p className="faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div className="cta-band">
        <div className="cta-inner">
          <div className="cta-orb1"></div>
          <div className="cta-orb2"></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="cta-eyebrow">Start Today — It's Free</div>
            <h2 className="cta-h">Your next role is<br /><em style={{ fontStyle: 'italic' }}>one upload away.</em></h2>
            <p className="cta-sub">Join 40,000+ professionals who found their perfect match with VibeJobs.</p>
            <div className="cta-btns">
              <button className="btn btn-primary" style={{ background: '#fff', color: '#000', padding: '14px 28px', fontSize: '16px' }} onClick={() => handleAuth('signup')}>⚡ Upload Your CV</button>
              <button className="btn btn-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.3)', padding: '14px 28px', fontSize: '16px' }} onClick={handleNavJobs}>Browse Live Jobs</button>
            </div>
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <section className="nl-sec">
        <div className="nl-inner">
          <h3 className="nl-h">Weekly job market insights</h3>
          <p className="nl-sub">Salary data, hiring signals, and career trends. No spam, ever.</p>
          <div>
            {!nlSubscribed ? (
              <div className="nl-form">
                <input 
                  className="nl-input" 
                  type="email" 
                  placeholder="you@company.com" 
                  value={nlEmail} 
                  onChange={e => setNlEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSubscribe() }}
                />
                <button className="btn-nl" onClick={handleSubscribe}>Subscribe</button>
              </div>
            ) : (
              <div className="nl-success">🎉 You're in! Welcome to the VibeJobs community.</div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-grid">
            <div>
              <div className="lp-logo" style={{ marginBottom: '10px' }} onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                <div className="lp-logo-mark">⚡</div>
                <span className="lp-logo-text" style={{ fontWeight: 300 }}>
                  <span style={{ fontWeight: 800 }}>Vibe</span>Jobs
                </span>
              </div>
              <p className="lp-footer-brand-desc">AI-powered job matching that puts the right roles in front of the right people — fast, fair, and frictionless.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
                <a className="lp-footer-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }} href="#">𝕏</a>
                <a className="lp-footer-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }} href="#">in</a>
                <a className="lp-footer-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px' }} href="#">gh</a>
              </div>
            </div>
            <div>
              <div className="lp-footer-col-title">Product</div>
              <a className="lp-footer-link" href="#">Job Matching</a>
              <a className="lp-footer-link" href="#">Skill Analysis</a>
              <a className="lp-footer-link" href="#">Cover Letters</a>
              <a className="lp-footer-link" href="#">Job Alerts</a>
              <a className="lp-footer-link" href="#">Interview Prep</a>
            </div>
            <div>
              <div className="lp-footer-col-title">Company</div>
              <a className="lp-footer-link" href="#">About</a>
              <a className="lp-footer-link" href="#">Blog</a>
              <a className="lp-footer-link" href="#">Careers</a>
              <a className="lp-footer-link" href="#">Press</a>
              <a className="lp-footer-link" href="#">Contact</a>
            </div>
            <div>
              <div className="lp-footer-col-title">Legal</div>
              <a className="lp-footer-link" href="#">Privacy Policy</a>
              <a className="lp-footer-link" href="#">Terms of Service</a>
              <a className="lp-footer-link" href="#">Cookie Policy</a>
              <a className="lp-footer-link" href="#">GDPR</a>
              <a className="lp-footer-link" href="#">Security</a>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">© 2026 VibeJobs, Inc. All rights reserved.</span>
            <span className="lp-footer-tagline">Developed By shah1bHasan</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
