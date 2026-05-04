import React from 'react';
import { Bookmark, Sparkles } from 'lucide-react';
import { type Job, useStore } from '../store/useStore';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { savedJobs, toggleSave } = useStore();
  const isSaved = savedJobs.has(job.id);

  return (
    <div className={`job-card ${job.featured ? 'featured' : ''}`}>
      <div className="jc-top">
        <div 
          className="co-logo" 
          style={{ background: job.logoColor, color: job.logoText }}
        >
          {job.logo}
        </div>
        <div className="jc-info">
          <div className="jc-title">{job.title}</div>
          <div className="jc-company">
            {job.company} · <span style={{ color: 'var(--acc2)', fontSize: '11px' }}>{job.source}</span>
          </div>
        </div>
        <div className="jc-meta">
          <div className="match-pill">{job.match}% match</div>
          {job.featured && <div className="feat-pill">Featured</div>}
        </div>
      </div>
      
      <div className="jc-tags">
        {job.tags.map((tag, i) => (
          <span key={i} className={`tag ${i === job.tags.length - 1 ? 'remote' : ''}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="jc-bottom">
        <div>
          <div className="jc-salary">{job.salary}/yr</div>
          <div className="jc-posted">Posted {job.posted}</div>
        </div>
        <div className="jc-actions">
          <button 
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(job.id);
            }}
          >
            <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button className="apply-quick">Apply</button>
        </div>
      </div>
    </div>
  );
};
