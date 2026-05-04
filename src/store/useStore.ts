import { create } from 'zustand';

export type Job = {
  id: number | string;
  title: string;
  company: string;
  logo: string;
  logoColor: string;
  logoText: string;
  tags: string[];
  salary: string;
  salaryMin: number;
  posted: string;
  match: number;
  cat: string;
  featured: boolean;
  source: string;
  desc: string;
  reqs: string;
  benefits: string;
  location: string;
  experience: string;
  type: string;
};

interface AppState {
  jobs: Job[];
  savedJobs: Set<number | string>;
  currentPanel: 'home' | 'browse' | 'agent' | 'saved' | 'profile';
  isLoading: boolean;
  searchQuery: string;
  
  setJobs: (jobs: Job[]) => void;
  toggleSave: (id: number | string) => void;
  setPanel: (panel: 'home' | 'browse' | 'agent' | 'saved' | 'profile') => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>((set) => ({
  jobs: [],
  savedJobs: new Set(),
  currentPanel: 'home',
  isLoading: true,
  searchQuery: '',

  setJobs: (jobs) => set({ jobs, isLoading: false }),
  
  toggleSave: (id) => set((state) => {
    const newSaved = new Set(state.savedJobs);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    return { savedJobs: newSaved };
  }),

  setPanel: (panel) => set({ currentPanel: panel }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
