import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Briefcase, FileText, 
  Users, Bookmark, Download, Plus, Search, 
  Filter, Clock, MoreHorizontal, Send, 
  Zap, ArrowUpRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const HomePanel = () => {
  const { user, jobs } = useStore();
  const [chartMode, setChartMode] = useState<'week' | 'month'>('week');

  const topMatches = [...jobs].sort((a, b) => b.match - a.match).slice(0, 3);
  const availableJobsCount = jobs.length;
  const savedJobsCount = Array.from(useStore.getState().savedJobs).length;

  const chartData = {
    week: {
      labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Matches',
          data: [32, 48, 41, 65, 58, 89],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37,99,235,.08)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#2563EB',
        },
        {
          label: 'Applications',
          data: [2, 4, 3, 7, 5, 8],
          borderColor: '#16A34A',
          backgroundColor: 'rgba(22,163,74,.06)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#16A34A',
        }
      ],
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Matches',
          data: [55, 72, 60, 89],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37,99,235,.08)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Applications',
          data: [1, 2, 2, 3],
          borderColor: '#16A34A',
          backgroundColor: 'rgba(22,163,74,.06)',
          tension: 0.4,
          fill: true,
        }
      ],
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#666',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } }
    }
  };

  return (
    <div className="home-panel">
      {/* Page Header */}
      <div className="page-head fade-up">
        <div>
          <h1 className="page-title">Good morning, {user?.email?.split('@')[0] || 'Rahul'} 👋</h1>
          <p className="page-sub">Here's what's happening with your job search today.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm">
            <Download size={13} />
            Export
          </button>
          <button className="btn btn-primary btn-sm">
            <Plus size={13} />
            New Application
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid fade-up delay-1" style={{ gap: '20px', marginBottom: '24px' }}>
        <StatCard label="Available Jobs" value={availableJobsCount.toString()} trend="+24%" trendDir="up" icon={Briefcase} />
        <StatCard label="Applications" value="3" trend="+2" trendDir="up" icon={FileText} />
        <StatCard label="Profile Views" value="12" trend="+8" trendDir="up" icon={Users} />
        <StatCard label="Saved Jobs" value={savedJobsCount.toString()} trend="-1" trendDir="dn" icon={Bookmark} />
      </div>

      {/* Main Grid */}
      <div className="grid-body fade-up delay-2">
        {/* Left Col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Chart Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Match Activity</div>
                <div className="card-desc">New job matches per week over 6 months</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div className="chart-tabs">
                  <button 
                    className={`chart-tab ${chartMode === 'week' ? 'active' : ''}`}
                    onClick={() => setChartMode('week')}
                  >
                    Weekly
                  </button>
                  <button 
                    className={`chart-tab ${chartMode === 'month' ? 'active' : ''}`}
                    onClick={() => setChartMode('month')}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-wrap">
                <Line data={chartData[chartMode]} options={chartOptions as any} />
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Top Matches</div>
                <div className="card-desc">Showing AI-matched jobs for your profile</div>
              </div>
            </div>
            <div className="table-controls">
              <div className="table-search">
                <Search size={13} color="var(--txt-3)" />
                <input type="text" placeholder="Filter jobs..." />
              </div>
              <button className="table-filter-btn"><Filter size={13} /> Filter</button>
              <div className="table-spacer"></div>
              <button className="table-cols-btn"><MoreHorizontal size={13} /> Columns</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Role / Company</th>
                  <th>Match</th>
                  <th>Type</th>
                  <th>Salary (USD)</th>
                  <th>Posted</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {topMatches.map(job => (
                  <JobRow 
                    key={job.id}
                    role={job.title}
                    company={job.company}
                    match={`${job.match}%`}
                    type={job.type}
                    salary={job.salary}
                    posted={job.posted}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col */}
        <div className="right-stack">
          {/* AI Agent */}
          <div className="agent-card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }}></div>
                <div className="card-title">AI Career Agent</div>
              </div>
            </div>
            <div className="agent-messages" style={{ padding: '20px', gap: '16px' }}>
              <div className="msg ai">
                <div className="msg-av" style={{ background: 'var(--blue)', color: '#fff' }}>AI</div>
                <div className="msg-bubble" style={{ background: 'var(--bg-muted)', borderRadius: '12px 12px 12px 2px', padding: '12px 16px' }}>
                  Your resume matches <strong>94%</strong> of React roles. Adding GraphQL could boost it to 98%.
                </div>
              </div>
              <div className="msg user">
                <div className="msg-bubble" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', borderRadius: '12px 12px 2px 12px', padding: '12px 16px' }}>
                  Which roles have async-friendly teams?
                </div>
              </div>
            </div>
            <div className="agent-input-area" style={{ padding: '12px 16px', background: 'var(--bg-card)' }}>
              <input className="agent-input" type="text" placeholder="Ask your AI agent..." style={{ fontSize: '14px' }} />
              <button className="agent-send" style={{ borderRadius: '50%', width: '32px', height: '32px' }}><Send size={14} /></button>
            </div>
          </div>

          {/* Salary Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Salary in BDT</div>
                <div className="card-desc">Live conversion · 1 USD = 120 BDT</div>
              </div>
              <Zap size={14} color="var(--amber)" />
            </div>
            <div className="bdt-rows">
              <div className="bdt-row"><span>$5,000 / mo</span><span>≈ <strong>৳6,00,000</strong></span></div>
              <div className="bdt-row"><span>$10,000 / mo</span><span>≈ <strong>৳12,00,000</strong></span></div>
            </div>
          </div>

          {/* Profile Strength */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Profile Strength</div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>60%</span>
            </div>
            <div className="prog-rows">
              <ProgressItem label="Resume uploaded" value={100} />
              <ProgressItem label="Skills listed" value={80} />
              <ProgressItem label="Job preferences" value={60} />
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, trendDir, icon: Icon }: any) => (
  <div className="stat-card" style={{ padding: '24px' }}>
    <div className="sc-header" style={{ marginBottom: '16px' }}>
      <span className="sc-label" style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
      <div className="sc-icon" style={{ background: 'var(--bg-muted)', width: '40px', height: '40px', borderRadius: '10px' }}>
        <Icon size={18} color="var(--txt-2)" />
      </div>
    </div>
    <div className="sc-value" style={{ fontSize: '28px', fontWeight: 700 }}>{value}</div>
    <div className="sc-trend" style={{ marginTop: '12px', gap: '6px', fontSize: '13px' }}>
      {trendDir === 'up' ? <TrendingUp size={14} className="up" /> : <TrendingDown size={14} className="dn" />}
      <span className={trendDir} style={{ fontWeight: 600 }}>{trend}</span>
      <span className="sc-trend-lbl" style={{ color: 'var(--txt-3)' }}>vs last period</span>
    </div>
  </div>
);

const JobRow = ({ role, company, match, type, salary, posted }: any) => (
  <tr>
    <td>
      <div className="td-co">
        <div className="co-av" style={{ background: 'var(--bg-muted)', color: 'var(--txt)' }}>{company.substring(0, 2)}</div>
        <div>
          <div className="td-title">{role}</div>
          <div className="td-co-name">{company} · Remote</div>
        </div>
      </div>
    </td>
    <td><span className="badge badge-green"><span className="badge-dot"></span>{match}</span></td>
    <td><span className="badge badge-outline">{type}</span></td>
    <td><span className="salary">{salary}</span></td>
    <td style={{ color: 'var(--txt-2)' }}>{posted}</td>
    <td><button className="row-menu-btn"><MoreHorizontal size={14} /></button></td>
  </tr>
);

const ProgressItem = ({ label, value }: { label: string, value: number }) => (
  <div className="prog-item">
    <div className="prog-top"><span className="prog-lbl">{label}</span><span className="prog-val">{value}%</span></div>
    <div className="prog-bar"><div className="prog-fill" style={{ width: `${value}%` }}></div></div>
  </div>
);
