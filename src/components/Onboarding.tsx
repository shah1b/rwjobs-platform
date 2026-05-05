import React, { useState } from 'react';
import { Sparkles, Bot, FileText, ArrowRight, CheckCircle, Globe, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

const steps = [
  {
    title: "Welcome to VibeJobs",
    desc: "Your gateway to high-paying international remote roles, optimized for the Bangladeshi timezone (GMT+6).",
    icon: <Globe size={48} color="var(--acc)" />,
    features: ["Global Opportunities", "USD & BDT Salary Tracking", "Top-tier Companies"]
  },
  {
    title: "AI Career Agent",
    desc: "Meet your 24/7 personal recruiter. Our Gemini-powered AI scans thousands of platforms to find your perfect match.",
    icon: <Bot size={48} color="var(--acc)" />,
    features: ["Intelligent Search", "Interview Prep", "Salary Negotiation"]
  },
  {
    title: "Resume Power-Up",
    desc: "Upload your resume and let our AI do the rest. We analyze your skills to unlock personalized job recommendations.",
    icon: <FileText size={48} color="var(--acc)" />,
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
      <div className="onboarding-card">
        <div className="onboarding-progress">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`progress-dot ${i <= currentStep ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="onboarding-content animate-fade-in">
          <div className="onboarding-icon-wrap">
            {steps[currentStep].icon}
            <div className="icon-glow" />
          </div>
          
          <h1 className="onboarding-title">{steps[currentStep].title}</h1>
          <p className="onboarding-desc">{steps[currentStep].desc}</p>
          
          <div className="onboarding-features">
            {steps[currentStep].features.map((f, i) => (
              <div key={i} className="onboarding-feature-item">
                <CheckCircle size={14} color="var(--acc)" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="onboarding-footer">
          <button className="btn-secondary" onClick={completeOnboarding}>
            Skip
          </button>
          <button className="btn-primary" onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .onboarding-overlay {
          position: fixed;
          inset: 0;
          background: rgba(6, 7, 13, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }
        .onboarding-card {
          width: 100%;
          max-width: 500px;
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 32px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        }
        .onboarding-progress {
          display: flex;
          gap: 8px;
          margin-bottom: 40px;
          justify-content: center;
        }
        .progress-dot {
          width: 32px;
          height: 4px;
          background: var(--brd);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .progress-dot.active {
          background: var(--acc);
          width: 48px;
        }
        .onboarding-content {
          text-align: center;
        }
        .onboarding-icon-wrap {
          width: 100px;
          height: 100px;
          background: rgba(200, 241, 53, 0.05);
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          position: relative;
        }
        .icon-glow {
          position: absolute;
          inset: 0;
          background: var(--acc);
          filter: blur(30px);
          opacity: 0.1;
          border-radius: 50%;
        }
        .onboarding-title {
          font-family: var(--font);
          font-weight: 900;
          font-size: 28px;
          margin-bottom: 16px;
          background: linear-gradient(to bottom, #fff, #ccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .onboarding-desc {
          color: var(--txt2);
          line-height: 1.6;
          font-size: 15px;
          margin-bottom: 32px;
        }
        .onboarding-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          margin-bottom: 40px;
        }
        .onboarding-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--txt);
          background: rgba(255,255,255,0.03);
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .onboarding-footer {
          display: flex;
          gap: 16px;
        }
        .onboarding-footer button {
          flex: 1;
          height: 54px;
          border-radius: 16px;
          font-weight: 700;
          font-size: 15px;
          justify-content: center;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` }} />
    </div>
  );
};
