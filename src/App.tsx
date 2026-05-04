import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { BottomNav } from './components/BottomNav';
import { useStore, type Job } from './store/useStore';
import { supabase } from './lib/supabase';
import { HomePanel } from './components/panels/Home';
import { BrowsePanel } from './components/panels/Browse';
import { AgentPanel } from './components/panels/Agent';
import { SavedPanel } from './components/panels/Saved';
import { ProfilePanel } from './components/panels/Profile';
import { AuthPanel } from './components/panels/Auth';
import { Modal } from './components/Modal';

const mapCategory = (cat: string) => {
  const m: Record<string, string> = {
    'Software Development': 'Engineering',
    'Design': 'Design',
    'Product': 'Product',
    'Marketing': 'Marketing',
    'Data': 'Data',
    'DevOps / Sysadmin': 'DevOps',
    'Business': 'Business',
    'Customer Support': 'Support',
    'Human Resources': 'HR',
    'Sales': 'Sales',
    'Writing': 'Writing'
  };
  return m[cat] || 'Engineering';
};

function App() {
  const { currentPanel, setJobs, setLoading, setUser } = useStore();

  useEffect(() => {
    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://remotive.com/api/remote-jobs?limit=50');
        const data = await res.json();
        const mappedJobs: Job[] = data.jobs.map((job: any) => {
          const colors = [
            { bg: '#0d1f3c', txt: '#60A5FA' },
            { bg: '#1a1030', txt: '#A78BFA' },
            { bg: '#0d1f17', txt: '#6EE7B7' },
            { bg: '#2a2a14', txt: '#FCD34D' },
            { bg: '#181818', txt: '#E5E7EB' }
          ];
          const color = colors[job.id % colors.length];

          return {
            id: job.id,
            title: job.title,
            company: job.company_name,
            logo: job.company_name ? job.company_name.substring(0, 2).toUpperCase() : 'CO',
            logoColor: color.bg,
            logoText: color.txt,
            tags: job.tags && job.tags.length ? job.tags.slice(0, 3) : [job.category],
            salary: job.salary || 'Competitive',
            salaryMin: job.salary ? parseInt(job.salary.replace(/[^0-9]/g, '')) || 0 : 0,
            posted: new Date(job.publication_date).toLocaleDateString(),
            match: Math.floor(Math.random() * 20) + 80,
            cat: mapCategory(job.category),
            featured: Math.random() > 0.8,
            source: "Remotive",
            desc: job.description,
            reqs: "Please see the full description for specific requirements.",
            benefits: "Please see the full description for benefits.",
            location: job.candidate_required_location || "Remote",
            experience: "See description",
            type: (job.job_type || '').replace('_', ' ') || 'Full-time'
          };
        });
        setJobs(mappedJobs);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchJobs();
  }, [setJobs, setLoading]);

  const renderPanel = () => {
    switch (currentPanel) {
      case 'home': return <HomePanel />;
      case 'browse': return <BrowsePanel />;
      case 'agent': return <AgentPanel />;
      case 'saved': return <SavedPanel />;
      case 'profile': return <ProfilePanel />;
      case 'auth': return <AuthPanel />;
      case 'apps': return <div className="panel"><h2>Applications</h2><p>Your job applications will appear here.</p></div>;
      case 'alerts': return <div className="panel"><h2>Job Alerts</h2><p>Manage your job alerts and notifications.</p></div>;
      default: return <HomePanel />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main">
        <Topbar />
        <div className="content">
          {renderPanel()}
        </div>
      </main>
      <BottomNav />
      <Modal />
    </div>
  );
}

export default App;
