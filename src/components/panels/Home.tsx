import React from 'react';
import { Sparkles, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { JobCard } from '../JobCard';

export const HomePanel = () => {
  const { jobs, isLoading, setPanel } = useStore();

  const topPicks = [...jobs]
    .sort((a, b) => b.match - a.match)
    .slice(0, 4);

  return (
    <div className="panel">
      <div className="hero-strip">
        <div className="hero-text">
          <h1>Find Your <span>Dream Remote</span> Job Today</h1>
          <p>AI-powered matching across 50+ platforms. Tailored to your skills, timezone, and salary expectations.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setPanel('agent')}>
              <Sparkles size={14} />
              Launch AI Agent
            </button>
            <button className="btn-secondary" onClick={() => setPanel('browse')}>
              Browse All Jobs
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <span className="hstat-num">{jobs.length || 247}</span>
            <span className="hstat-label">Total Jobs</span>
          </div>
          <div className="hstat">
            <span className="hstat-num">98%</span>
            <span className="hstat-label">Match Rate</span>
          </div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon" style={{ background: 'rgba(200,241,53,.08)' }}>
              <TrendingUp size={16} color="var(--acc)" />
            </div>
            <span className="stat-change up">↑ 24%</span>
          </div>
          <div className="stat-num">{jobs.length}</div>
          <div className="stat-label">New jobs today</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon" style={{ background: 'rgba(91,127,255,.08)' }}>
              <CheckCircle size={16} color="var(--acc2)" />
            </div>
            <span className="stat-change up">↑ 8</span>
          </div>
          <div className="stat-num">3</div>
          <div className="stat-label">Applications sent</div>
        </div>
        {/* Add more stat cards as needed */}
      </div>

      <div className="section-hdr">
        <span className="section-title">Top Picks for You</span>
        <button className="section-link" onClick={() => setPanel('browse')}>
          See all
        </button>
      </div>

      <div className="jobs-list">
        {isLoading ? (
          <>
            <div className="skeleton" style={{ height: '130px', marginBottom: '12px' }} />
            <div className="skeleton" style={{ height: '130px', marginBottom: '12px' }} />
          </>
        ) : (
          topPicks.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};
