import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Briefcase, FileText, 
  Users, Bookmark, Download, Plus, Search, 
  Filter, Clock, MoreHorizontal, Send, 
  Zap, ArrowUpRight, Upload, X, CheckCircle, Loader2
} from 'lucide-react';
import { useStore, type Job } from '../../store/useStore';
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
  const { user, jobs, resumeData, setResumeData, savedJobs, setSelectedJob, setPanel } = useStore();
  const [chartMode, setChartMode] = useState<'week' | 'month'>('week');
  const [isUploading, setIsUploading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [agentInput, setAgentInput] = useState('');
  const [agentMessages, setAgentMessages] = useState([
    { role: 'ai', text: `Your resume matches 94% of React roles. Adding GraphQL could boost it to 98%.` },
    { role: 'user', text: `Which roles have async-friendly teams?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // AI Matching Logic
  const processedJobs = jobs.map(job => {
    if (!resumeData) return job;
    
    const jobText = (job.title + ' ' + (job.desc || '') + ' ' + (job.tags || []).join(' ')).toLowerCase();
    const skills = resumeData.skills;
    let matchScore = 0;
    
    skills.forEach(skill => {
      if (jobText.includes(skill.toLowerCase())) matchScore += 10;
    });

    const baseMatch = Math.floor(Math.random() * 10) + 70;
    const finalMatch = Math.min(99, baseMatch + matchScore);

    return { ...job, match: finalMatch };
  });

  const filteredMatches = processedJobs
    .filter(j => j.title.toLowerCase().includes(filterText.toLowerCase()) || j.company.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => (b.match || 0) - (a.match || 0))
    .slice(0, 5);

  const availableJobsCount = jobs.length;
  const savedJobsCount = Array.from(savedJobs).length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const mockSkills = ['React', 'TypeScript', 'Node.js', 'JavaScript', 'Tailwind', 'SQL'];
      setResumeData({
        content: "Extracted content from " + file.name,
        fileName: file.name,
        skills: mockSkills,
        uploadedAt: new Date().toISOString()
      });
      setIsUploading(false);
    }, 1500);
  };

  const handleAgentSend = () => {
    if (!agentInput.trim() || isTyping) return;
    
    const newMsgs = [...agentMessages, { role: 'user', text: agentInput }];
    setAgentMessages(newMsgs);
    setAgentInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Based on your profile, I recommend looking at Linear or Vercel. They have strong async cultures.",
        "I've found 3 new roles that match your TypeScript expertise. Would you like me to draft cover letters?",
        "Your match score for Senior Engineering roles has increased since you updated your resume!",
        "Most remote-first companies prefer candidates with experience in distributed teams. Your background is a great fit."
      ];
      const randomResp = responses[Math.floor(Math.random() * responses.length)];
      setAgentMessages(prev => [...prev, { role: 'ai', text: randomResp }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleExport = () => {
    alert("Exporting your job search activity to CSV...");
  };

  const handleNewApp = () => {
    setPanel('browse');
    alert("Browse jobs to start a new application!");
  };

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
      <div className="page-head fade-up">
        <div>
          <h1 className="page-title">Good morning, {user?.email?.split('@')[0] || 'Rahul'} 👋</h1>
          <p className="page-sub">Here's what's happening with your job search today.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleExport}>
            <Download size={13} />
            Export
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleNewApp}>
            <Plus size={13} />
            New Application
          </button>
        </div>
      </div>

      <div className="stats-grid fade-up delay-1" style={{ gap: '20px', marginBottom: '24px' }}>
        <StatCard label="Available Jobs" value={availableJobsCount.toString()} trend="+100%" trendDir="up" icon={Briefcase} />
        <StatCard label="Applications" value="12" trend="+3" trendDir="up" icon={FileText} />
        <StatCard label="Profile Views" value="84" trend="+12%" trendDir="up" icon={Users} />
        <StatCard label="Saved Jobs" value={savedJobsCount.toString()} trend="0%" trendDir="up" icon={Bookmark} />
      </div>

      <div className="home-main-grid fade-up delay-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!resumeData && (
            <div className="card" style={{ background: 'linear-gradient(135deg, var(--blue), var(--purple))', color: '#fff', border: 'none' }}>
              <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '32px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '20px' }}>
                  <Upload size={32} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Unlock Personalized AI Matches</h3>
                  <p style={{ opacity: 0.9, fontSize: '15px' }}>Upload your CV to let our AI find the best remote roles for your specific skill set.</p>
                </div>
                <div>
                  <input type="file" id="cv-upload" hidden onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
                  <label htmlFor="cv-upload" className="btn" style={{ background: '#fff', color: 'var(--blue)', cursor: 'pointer', padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    {isUploading ? 'Analyzing...' : 'Upload CV'}
                  </label>
                </div>
              </div>
            </div>
          )}
          
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Match Activity</div>
                <div className="card-desc">New job matches per week over 6 months</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div className="chart-tabs">
                  <button className={`chart-tab ${chartMode === 'week' ? 'active' : ''}`} onClick={() => setChartMode('week')}>Weekly</button>
                  <button className={`chart-tab ${chartMode === 'month' ? 'active' : ''}`} onClick={() => setChartMode('month')}>Monthly</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-wrap">
                <Line data={chartData[chartMode]} options={chartOptions as any} />
              </div>
            </div>
          </div>

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
                <input 
                  type="text" 
                  placeholder="Filter by title or company..." 
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
              <button className="table-filter-btn"><Filter size={13} /> Filter</button>
              <div className="table-spacer"></div>
              <button className="table-cols-btn"><MoreHorizontal size={13} /> Columns</button>
            </div>
            <div className="dash-table-wrap">
              <table className="dash-table">
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
                  {filteredMatches.map(job => (
                    <JobRow 
                      key={job.id}
                      job={job}
                      onClick={() => setSelectedJob(job.id)}
                    />
                  ))}
                  {filteredMatches.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--txt-3)' }}>
                        No matches found for "{filterText}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="right-stack">
          <div className="agent-card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }}></div>
                <div className="card-title">AI Career Agent</div>
              </div>
            </div>
            <div className="agent-messages" style={{ padding: '20px', gap: '16px', maxHeight: '300px', overflowY: 'auto' }}>
              {agentMessages.map((msg, i) => (
                <div key={i} className={`msg ${msg.role}`}>
                  {msg.role === 'ai' && <div className="msg-av" style={{ background: 'var(--blue)', color: '#fff' }}>AI</div>}
                  <div className="msg-bubble" style={{ 
                    background: msg.role === 'ai' ? 'var(--bg-muted)' : 'var(--accent)', 
                    color: msg.role === 'ai' ? 'inherit' : 'var(--accent-fg)',
                    borderRadius: msg.role === 'ai' ? '12px 12px 12px 2px' : '12px 12px 2px 12px', 
                    padding: '12px 16px',
                    fontSize: '13px',
                    lineHeight: 1.5
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="msg ai">
                  <div className="msg-av" style={{ background: 'var(--blue)', color: '#fff' }}>AI</div>
                  <div className="msg-bubble" style={{ background: 'var(--bg-muted)', borderRadius: '12px 12px 12px 2px', padding: '12px 16px', opacity: 0.7 }}>
                    Typing...
                  </div>
                </div>
              )}
            </div>
            <div className="agent-input-area" style={{ padding: '12px 16px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
              <input 
                className="agent-input" 
                type="text" 
                placeholder="Ask your AI agent..." 
                style={{ fontSize: '14px' }} 
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAgentSend()}
              />
              <button 
                className="agent-send" 
                style={{ borderRadius: '50%', width: '32px', height: '32px' }}
                onClick={handleAgentSend}
                disabled={isTyping || !agentInput.trim()}
              >
                <Send size={14} />
              </button>
            </div>
          </div>

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

          <div className="card">
            <div className="card-header">
              <div className="card-title">Profile Strength</div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{resumeData ? '85%' : '20%'}</span>
            </div>
            <div className="prog-rows">
              <ProgressItem label="Resume uploaded" value={resumeData ? 100 : 0} />
              <ProgressItem label="Skills listed" value={resumeData ? 90 : 0} />
              <ProgressItem label="Job preferences" value={resumeData ? 70 : 0} />
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setPanel('profile')}>
                {resumeData ? 'Update Profile' : 'Complete Profile'}
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

const JobRow = ({ job, onClick }: { job: Job, onClick: () => void }) => (
  <tr style={{ cursor: 'pointer' }} onClick={onClick}>
    <td>
      <div className="td-co">
        <div className="co-av" style={{ background: job.logoColor, color: job.logoText }}>{job.logo}</div>
        <div>
          <div className="td-title">{job.title}</div>
          <div className="td-co-name">{job.company} · Remote</div>
        </div>
      </div>
    </td>
    <td><span className="badge badge-green"><span className="badge-dot"></span>{job.match}%</span></td>
    <td><span className="badge badge-outline">{job.type}</span></td>
    <td><span className="salary">{job.salary}</span></td>
    <td style={{ color: 'var(--txt-2)' }}>{job.posted}</td>
    <td><button className="row-menu-btn" onClick={(e) => { e.stopPropagation(); }}><MoreHorizontal size={14} /></button></td>
  </tr>
);

const ProgressItem = ({ label, value }: { label: string, value: number }) => (
  <div className="prog-item">
    <div className="prog-top"><span className="prog-lbl">{label}</span><span className="prog-val">{value}%</span></div>
    <div className="prog-bar"><div className="prog-fill" style={{ width: `${value}%` }}></div></div>
  </div>
);
