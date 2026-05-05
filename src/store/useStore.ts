// RemoteHunt Store - Market Ready
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  currentPanel: 'landing' | 'home' | 'browse' | 'agent' | 'saved' | 'profile' | 'apps' | 'alerts' | 'auth';
  isLoading: boolean;
  searchQuery: string;
  selectedJobId: number | string | null;
  user: any | null;
  authMode: 'login' | 'signup';
  
  setJobs: (jobs: Job[]) => void;
  toggleSave: (id: number | string) => void;
  setPanel: (panel: 'landing' | 'home' | 'browse' | 'agent' | 'saved' | 'profile' | 'apps' | 'alerts' | 'auth') => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedJob: (id: number | string | null) => void;
  setUser: (user: any) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      jobs: [],
      savedJobs: new Set(),
      currentPanel: 'landing',
      isLoading: true,
      searchQuery: '',
      selectedJobId: null,
      user: null,
      authMode: 'login',

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

      setSelectedJob: (id) => set({ selectedJobId: id }),

      setUser: (user) => set({ user }),
      setAuthMode: (mode) => set({ authMode: mode }),
      hasSeenOnboarding: false,
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
    }),
    {
      name: 'vibejobs-storage-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        savedJobs: Array.from(state.savedJobs),
        hasSeenOnboarding: state.hasSeenOnboarding,
      }) as any,
      onRehydrateStorage: () => (state) => {
        if (state && state.savedJobs) {
          state.savedJobs = new Set(state.savedJobs);
        }
      },
    }
  )
);
