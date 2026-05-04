import React from 'react';
import { X, MapPin, Briefcase, Clock, DollarSign, ExternalLink, Bookmark, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Modal = () => {
  const { jobs, selectedJobId, setSelectedJob, savedJobs, toggleSave } = useStore();
  
  if (!selectedJobId) return null;

  const job = jobs.find(j => j.id === selectedJobId);
  if (!job) return null;

  const isSaved = savedJobs.has(job.id);

  return (
    <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div 
            className="co-logo" 
            style={{ background: job.logoColor, color: job.logoText, width: 54, height: 54, fontSize: 18 }}
          >
            {job.logo}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font)', fontWeight: 900, fontSize: 20, marginBottom: 4 }}>{job.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--txt2)', fontSize: 13 }}>
              <span>{job.company}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--txt3)' }}></span>
              <span style={{ color: 'var(--acc2)' }}>{job.source}</span>
            </div>
          </div>
          <button className="icon-btn" onClick={() => setSelectedJob(null)} style={{ border: 'none', background: 'transparent' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
            <div style={{ background: 'var(--bg2)', padding: '12px 16px', borderRadius: 'var(--r2)', border: '1px solid var(--brd)' }}>
              <div style={{ color: 'var(--txt3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Salary</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>
                {job.salary}
                <span style={{ color: 'var(--txt3)', fontSize: '11px', marginLeft: 4, display: 'block' }}>
                  ≈ ৳{(parseInt(job.salary.replace(/[^0-9]/g, '')) * 120 / 1000).toFixed(0)}k BDT
                </span>
              </div>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '12px 16px', borderRadius: 'var(--r2)', border: '1px solid var(--brd)' }}>
              <div style={{ color: 'var(--txt3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Location</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{job.location}</div>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '12px 16px', borderRadius: 'var(--r2)', border: '1px solid var(--brd)' }}>
              <div style={{ color: 'var(--txt3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Job Type</div>
              <div style={{ fontWeight: 700, fontSize: 14, textTransform: 'capitalize' }}>{job.type}</div>
            </div>
            <div style={{ background: 'var(--bg2)', padding: '12px 16px', borderRadius: 'var(--r2)', border: '1px solid var(--brd)' }}>
              <div style={{ color: 'var(--txt3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Match Score</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--acc)' }}>{job.match}%</div>
            </div>
          </div>

          <div className="job-description-content">
            <h3 style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 800, marginBottom: 12 }}>About the role</h3>
            <div 
              style={{ color: 'var(--txt2)', fontSize: 14, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: job.desc }} 
            />
            
            <h3 style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 800, marginTop: 24, marginBottom: 12 }}>Requirements</h3>
            <p style={{ color: 'var(--txt2)', fontSize: 14, lineHeight: 1.7 }}>{job.reqs}</p>

            <h3 style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 800, marginTop: 24, marginBottom: 12 }}>Benefits</h3>
            <p style={{ color: 'var(--txt2)', fontSize: 14, lineHeight: 1.7 }}>{job.benefits}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className={`btn-secondary ${isSaved ? 'saved' : ''}`} 
            onClick={() => toggleSave(job.id)}
            style={{ flex: '0 0 auto', borderColor: isSaved ? 'var(--acc4)' : 'var(--brd2)', color: isSaved ? 'var(--acc4)' : 'var(--txt)' }}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Saved' : 'Save Job'}
          </button>
          <button className="btn-secondary" style={{ flex: '0 0 auto' }}>
            <Share2 size={16} />
          </button>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            Apply for this position
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
