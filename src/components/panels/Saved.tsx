import React from 'react';
import { Bookmark, Search, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { JobCard } from '../JobCard';

export const SavedPanel = () => {
  const { jobs, savedJobs, setPanel } = useStore();
  
  const savedList = jobs.filter(job => savedJobs.has(job.id));

  return (
    <div className="panel fade-up">
      <div className="page-head" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="page-title">Saved Jobs</h1>
          <p className="page-sub">Review and manage the positions you've bookmarked</p>
        </div>
        <div style={{ background: 'var(--blue-light)', color: 'var(--blue)', padding: '6px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: 700 }}>
          {savedList.length} bookmarked
        </div>
      </div>

      <div className="saved-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
        {savedList.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 20px', background: 'var(--bg-muted)', borderRadius: 'var(--r-xl)' }}>
            <div style={{ background: 'var(--bg-card)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify-content: 'center', margin: '0 auto 20px' }}>
              <Bookmark size={32} color="var(--txt-3)" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>No saved jobs yet</h3>
            <p style={{ color: 'var(--txt-2)', marginBottom: '24px' }}>Tap the bookmark icon on any job card to save it for later review.</p>
            <button className="btn btn-primary" onClick={() => setPanel('browse')}>
              Browse Jobs <ArrowUpRight size={16} />
            </button>
          </div>
        ) : (
          savedList.map(job => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};
