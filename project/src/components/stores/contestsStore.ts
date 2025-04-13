import { create } from 'zustand';

export interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  problems: string[]; // Problem IDs
  participants: string[]; // User IDs
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

interface ContestState {
  contests: Contest[];
  currentContest: Contest | null;
  isLoading: boolean;
  error: string | null;
  fetchContests: () => Promise<void>;
  fetchContestById: (id: string) => Promise<void>;
  createContest: (contest: Omit<Contest, 'id' | 'createdAt'>) => Promise<void>;
  updateContest: (id: string, contest: Partial<Contest>) => Promise<void>;
  deleteContest: (id: string) => Promise<void>;
  registerForContest: (contestId: string, userId: string) => Promise<void>;
}

// Mock data for initial development
const mockContests: Contest[] = [
  {
    id: '1',
    title: 'Weekly Coding Challenge',
    description: 'Solve 3 problems in 2 hours to win prizes!',
    startTime: '2023-06-01T10:00:00.000Z',
    endTime: '2023-06-01T12:00:00.000Z',
    problems: ['1', '2'],
    participants: ['user1', 'user2'],
    createdBy: 'admin',
    createdAt: '2023-05-25T00:00:00.000Z',
    isActive: true
  },
  {
    id: '2',
    title: 'Algorithms Masterclass',
    description: 'Test your algorithm skills with these challenging problems.',
    startTime: '2023-06-15T14:00:00.000Z',
    endTime: '2023-06-15T17:00:00.000Z',
    problems: ['2'],
    participants: ['user1'],
    createdBy: 'admin',
    createdAt: '2023-05-30T00:00:00.000Z',
    isActive: false
  }
];

export const useContestsStore = create<ContestState>()((set) => ({
  contests: mockContests,
  currentContest: null,
  isLoading: false,
  error: null,
  
  fetchContests: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set({ contests: mockContests, isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to fetch contests', isLoading: false });
    }
  },
  
  fetchContestById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const contest = mockContests.find(c => c.id === id) || null;
      set({ currentContest: contest, isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to fetch contest', isLoading: false });
    }
  },
  
  createContest: async (contest) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const newContest: Contest = {
        ...contest,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      set(state => ({ 
        contests: [...state.contests, newContest], 
        isLoading: false 
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to create contest', isLoading: false });
    }
  },
  
  updateContest: async (id, contestData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        contests: state.contests.map(c => 
          c.id === id ? { ...c, ...contestData } : c
        ),
        currentContest: state.currentContest?.id === id 
          ? { ...state.currentContest, ...contestData } 
          : state.currentContest,
        isLoading: false
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to update contest', isLoading: false });
    }
  },
  
  deleteContest: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        contests: state.contests.filter(c => c.id !== id),
        isLoading: false
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to delete contest', isLoading: false });
    }
  },
  
  registerForContest: async (contestId, userId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        contests: state.contests.map(c => 
          c.id === contestId 
            ? { ...c, participants: [...c.participants, userId] } 
            : c
        ),
        isLoading: false
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to register for contest', isLoading: false });
    }
  }
}));