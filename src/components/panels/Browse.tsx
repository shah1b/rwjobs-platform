import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { JobCard } from '../JobCard';
import { Code, Palette, Box, BarChart, Terminal, Cpu, Briefcase, TrendingUp, Search, XCircle } from 'lucide-react';

export const BrowsePanel = () => {
  const { jobs, isLoading, searchQuery, setSearchQuery } = useStore();
  const [activeCat, setActiveCat] = useState('All');

  const categories = [
    { id: 'All', label: 'All Jobs', icon: null },
    { id: 'Engineering', label: 'Engineering', icon: Code },
    { id: 'Design', label: 'Design', icon: Palette },
    { id: 'Product', label: 'Product', icon: Box },
    { id: 'Marketing', label: 'Marketing', icon: BarChart },
    { id: 'Data', label: 'Data', icon: Cpu },
    { id: 'DevOps', label: 'DevOps', icon: Terminal },
    { id: 'Business', label: 'Business', icon: Briefcase },
    { id: 'Sales', label: 'Sales', icon: TrendingUp },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesCat = activeCat === 'All' || job.cat === activeCat;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="panel fade-up">
      <div className="page-head" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Browse Remote Jobs</h1>
          <p className="page-sub">Discover your next opportunity from 2,000+ curated remote roles</p>
        </div>
      </div>

      <div className="filter-bar" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-pill ${activeCat === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCat(cat.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '8px 16px', 
              borderRadius: '99px',
              fontSize: '13px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              background: activeCat === cat.id ? 'var(--accent)' : 'var(--bg-muted)',
              color: activeCat === cat.id ? 'var(--accent-fg)' : 'var(--txt-2)',
              border: '1px solid',
              borderColor: activeCat === cat.id ? 'transparent' : 'var(--border)'
            }}
          >
            {cat.icon && <cat.icon size={14} />}
            {cat.label}
          </button>
        ))}
      </div>

      <div className="results-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="result-count" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--txt-2)' }}>
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
        </span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ fontSize: '12px', color: 'var(--blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <XCircle size={12} /> Clear search
          </button>
        )}
      </div>

      <div className="jobs-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="card" style={{ height: '180px', background: 'var(--bg-muted)', opacity: 0.5 }} />
          ))
        ) : filteredJobs.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 20px', background: 'var(--bg-muted)', borderRadius: 'var(--r-xl)' }}>
            <div style={{ background: 'var(--bg-card)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify-content: 'center', margin: '0 auto 20px' }}>
              <Search size={32} color="var(--txt-3)" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>No jobs found</h3>
            <p style={{ color: 'var(--txt-2)' }}>Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};
