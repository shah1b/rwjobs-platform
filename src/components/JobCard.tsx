import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';
import { type Job, useStore } from '../store/useStore';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { savedJobs, toggleSave, setSelectedJob } = useStore();
  const isSaved = savedJobs.has(job.id);

  const bdtValue = (parseInt(job.salary.replace(/[^0-9]/g, '')) * 120);
  const bdtLabel = bdtValue > 10000000 ? `৳${(bdtValue/10000000).toFixed(2)}Cr` : `৳${(bdtValue/100000).toFixed(0)}L`;

  return (
    <div 
      className={`card fade-up`}
      style={{ marginBottom: '16px', padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
      onClick={() => setSelectedJob(job.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="td-co">
          <div 
            className="co-av" 
            style={{ 
              background: job.logoColor, 
              color: job.logoText,
              width: '40px',
              height: '40px',
              borderRadius: 'var(--r-md)',
              fontSize: '12px'
            }}
          >
            {job.logo}
          </div>
          <div>
            <div className="td-title" style={{ fontSize: '15px' }}>{job.title}</div>
            <div className="td-co-name">{job.company} · {job.location}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="badge badge-green"><span className="badge-dot"></span>{job.match}% match</span>
          {job.featured && <span className="badge badge-blue">Featured</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', margin: '12px 0' }}>
        {job.tags.slice(0, 4).map((tag, i) => (
          <span key={i} className="badge badge-outline">{tag}</span>
        ))}
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: '12px',
        borderTop: '1px solid var(--border)',
        marginTop: '12px'
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>
            <div className="salary">{job.salary}</div>
            <div className="bdt" style={{ marginTop: '2px' }}>≈ {bdtLabel} BDT</div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--txt-3)', alignSelf: 'center' }}>
            Posted {job.posted}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="tb-icon-btn"
            style={{ width: '32px', height: '32px' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(job.id);
            }}
          >
            <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} style={{ color: isSaved ? 'var(--blue)' : 'var(--txt-2)' }} />
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://remotive.com', '_blank');
            }}
          >
            Apply <ExternalLink size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
