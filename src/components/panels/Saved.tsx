import React from 'react';
import { Bookmark } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { JobCard } from '../JobCard';

export const SavedPanel = () => {
  const { jobs, savedJobs } = useStore();
  
  const savedList = jobs.filter(job => savedJobs.has(job.id));

  return (
    <div className="panel">
      <div className="section-hdr">
        <span className="section-title">
          Saved Jobs 
          <span style={{ 
            background: 'var(--bg3)', 
            borderRadius: '50px', 
            padding: '2px 10px', 
            fontSize: '13px', 
            marginLeft: '8px' 
          }}>
            {savedList.length}
          </span>
        </span>
      </div>

      <div className="saved-grid">
        {savedList.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Bookmark size={32} color="var(--txt3)" />
            </div>
            <h3>No saved jobs yet</h3>
            <p>Tap the bookmark icon on any job card to save it for later review.</p>
          </div>
        ) : (
          savedList.map(job => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};
