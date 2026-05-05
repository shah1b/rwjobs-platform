import React, { useState } from 'react';
import { Sparkles, Bot, FileText, ArrowRight, CheckCircle, Globe, Zap, X } from 'lucide-react';
import { useStore } from '../store/useStore';

const steps = [
  {
    title: "Welcome to VibeJobs",
    desc: "Your gateway to high-paying international remote roles, optimized for the global job market.",
    icon: <Globe size={40} color="var(--blue)" />,
    features: ["Global Opportunities", "USD & BDT Salary Tracking", "Top-tier Companies"]
  },
  {
    title: "AI Career Agent",
    desc: "Meet your 24/7 personal recruiter. Our AI scans thousands of platforms to find your perfect match.",
    icon: <Bot size={40} color="var(--purple)" />,
    features: ["Intelligent Search", "Interview Prep", "Salary Negotiation"]
  },
  {
    title: "Resume Power-Up",
    desc: "Upload your resume and let our AI do the rest. We analyze your skills to unlock personalized job recommendations.",
    icon: <FileText size={40} color="var(--green)" />,
    features: ["Skill Analysis", "Match Scoring", "Profile Optimization"]
  }
];

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeOnboarding } = useStore();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card fade-up">
        <button className="onboarding-close" onClick={completeOnboarding}>
          <X size={20} />
        </button>

        <div className="onboarding-progress">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`progress-dot ${i <= currentStep ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding-content">
          <div className="onboarding-icon-wrap" style={{ background: currentStep === 0 ? 'var(--blue-light)' : currentStep === 1 ? 'var(--purple-light)' : 'var(--green-light)' }}>
            {steps[currentStep].icon}
          </div>
          
          <h1 className="onboarding-title">{steps[currentStep].title}</h1>
          <p className="onboarding-desc">{steps[currentStep].desc}</p>
          
          <div className="onboarding-features">
            {steps[currentStep].features.map((f, i) => (
              <div key={i} className="onboarding-feature-item">
                <CheckCircle size={14} color="var(--blue)" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="onboarding-footer">
          <button className="btn btn-ghost" onClick={completeOnboarding}>
            Skip
          </button>
          <button className="btn btn-primary" onClick={handleNext} style={{ flex: 2 }}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .onboarding-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }
        .onboarding-card {
          width: 100%;
          max-width: 480px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          padding: 48px;
          position: relative;
          box-shadow: var(--shadow-lg);
        }
        .onboarding-close {
          position: absolute;
          top: 24px;
          right: 24px;
          color: var(--txt-3);
          transition: color 0.2s;
        }
        .onboarding-close:hover { color: var(--txt); }
        
        .onboarding-progress {
          display: flex;
          gap: 8px;
          margin-bottom: 40px;
          justify-content: center;
        }
        .progress-dot {
          width: 24px;
          height: 4px;
          background: var(--border);
          border-radius: 99px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .progress-dot.active {
          background: var(--blue);
          width: 48px;
        }
        .onboarding-content {
          text-align: center;
        }
        .onboarding-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          transition: all 0.3s ease;
        }
        .onboarding-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 12px;
          color: var(--txt);
          letter-spacing: -0.02em;
        }
        .onboarding-desc {
          color: var(--txt-2);
          line-height: 1.6;
          font-size: 15px;
          margin-bottom: 32px;
        }
        .onboarding-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          margin-bottom: 48px;
        }
        .onboarding-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--txt-2);
          background: var(--bg-muted);
          padding: 8px 16px;
          border-radius: 99px;
          font-weight: 500;
        }
        .onboarding-footer {
          display: flex;
          gap: 12px;
        }
      ` }} />
    </div>
  );
};
