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
      style={{ marginBottom: '20px', padding: '24px', cursor: 'pointer' }}
      onClick={() => setSelectedJob(job.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <div className="td-co">
          <div 
            className="co-av" 
            style={{ 
              background: job.logoColor, 
              color: job.logoText,
              width: '48px',
              height: '48px',
              borderRadius: 'var(--r-lg)',
              fontSize: '14px',
              fontWeight: 700
            }}
          >
            {job.logo}
          </div>
          <div>
            <div className="td-title" style={{ fontSize: '16px', fontWeight: 600 }}>{job.title}</div>
            <div className="td-co-name" style={{ marginTop: '4px', fontSize: '14px' }}>
              {job.company} · {job.location}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
          <span className="badge badge-green" style={{ background: 'var(--green-light)', color: 'var(--green)' }}>
            <span className="badge-dot"></span>
            {job.match}% Match
          </span>
          {job.featured && <span className="badge badge-blue">Featured</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', margin: '20px 0', flexWrap: 'wrap' }}>
        {job.tags.slice(0, 4).map((tag, i) => (
          <span key={i} className="badge badge-outline" style={{ fontSize: '11px', padding: '3px 10px' }}>{tag}</span>
        ))}
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: '20px',
        borderTop: '1px solid var(--border)',
        marginTop: '20px'
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div>
            <div className="salary" style={{ fontSize: '15px', fontWeight: 700 }}>{job.salary}</div>
            <div className="bdt" style={{ marginTop: '4px', fontSize: '12px' }}>≈ {bdtLabel} BDT</div>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--txt-3)', fontWeight: 500 }}>
            {job.posted}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px 12px' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(job.id);
            }}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} style={{ color: isSaved ? 'var(--blue)' : 'var(--txt-3)' }} />
          </button>
          <button 
            className="btn btn-primary btn-sm"
            style={{ padding: '8px 16px' }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(job.url, '_blank');
            }}
          >
            Apply <ExternalLink size={14} style={{ marginLeft: '4px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};
