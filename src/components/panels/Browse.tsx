import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { JobCard } from '../JobCard';
import { Code, Palette, Box, BarChart, Terminal, Cpu } from 'lucide-react';

export const BrowsePanel = () => {
  const { jobs, isLoading, searchQuery } = useStore();
  const [activeCat, setActiveCat] = useState('All');

  const categories = [
    { id: 'All', label: 'All Jobs', icon: null },
    { id: 'Engineering', label: 'Engineering', icon: Code },
    { id: 'Design', label: 'Design', icon: Palette },
    { id: 'Product', label: 'Product', icon: Box },
    { id: 'Marketing', label: 'Marketing', icon: BarChart },
    { id: 'Data', label: 'Data', icon: Cpu },
    { id: 'DevOps', label: 'DevOps', icon: Terminal },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesCat = activeCat === 'All' || job.cat === activeCat;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="panel">
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-pill ${activeCat === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCat(cat.id)}
          >
            {cat.icon && <cat.icon size={13} />}
            {cat.label}
          </button>
        ))}
        <span className="result-count">{filteredJobs.length} jobs found</span>
      </div>

      <div className="jobs-list">
        {isLoading ? (
          <div className="skeleton" style={{ height: '130px', marginBottom: '12px' }} />
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
};
