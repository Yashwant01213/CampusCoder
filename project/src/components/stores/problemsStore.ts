import { create } from 'zustand';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  testCases: TestCase[];
  sampleCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  timeLimit: number; // in milliseconds
  memoryLimit: number; // in MB
  createdBy: string;
  createdAt: string;
}

interface ProblemState {
  problems: Problem[];
  currentProblem: Problem | null;
  isLoading: boolean;
  error: string | null;
  fetchProblems: () => Promise<void>;
  fetchProblemById: (id: string) => Promise<void>;
  createProblem: (problem: Omit<Problem, 'id' | 'createdAt'>) => Promise<void>;
  updateProblem: (id: string, problem: Partial<Problem>) => Promise<void>;
  deleteProblem: (id: string) => Promise<void>;
}

// Mock data for initial development
const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    tags: ['array', 'hash-table'],
    testCases: [
      {
        id: '1-1',
        input: '[2,7,11,15], 9',
        expectedOutput: '[0,1]',
        isHidden: false
      },
      {
        id: '1-2',
        input: '[3,2,4], 6',
        expectedOutput: '[1,2]',
        isHidden: false
      }
    ],
    sampleCode: {
      javascript: 'function twoSum(nums, target) {\n  // Your code here\n}',
      python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}'
    },
    timeLimit: 1000,
    memoryLimit: 128,
    createdBy: 'admin',
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Reverse Linked List',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'medium',
    tags: ['linked-list', 'recursion'],
    testCases: [
      {
        id: '2-1',
        input: '[1,2,3,4,5]',
        expectedOutput: '[5,4,3,2,1]',
        isHidden: false
      }
    ],
    sampleCode: {
      javascript: 'function reverseList(head) {\n  // Your code here\n}',
      python: 'def reverse_list(head):\n    # Your code here\n    pass',
      java: 'class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your code here\n    }\n}',
      cpp: 'ListNode* reverseList(ListNode* head) {\n    // Your code here\n}'
    },
    timeLimit: 1000,
    memoryLimit: 128,
    createdBy: 'admin',
    createdAt: '2023-01-02T00:00:00.000Z'
  },

];

export const useProblemsStore = create<ProblemState>()((set) => ({
  problems: mockProblems,
  currentProblem: null,
  isLoading: false,
  error: null,
  
  fetchProblems: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll just use the mock data
      set({ problems: mockProblems, isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to fetch problems', isLoading: false });
    }
  },
  
  fetchProblemById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const problem = mockProblems.find(p => p.id === id) || null;
      set({ currentProblem: problem, isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to fetch problem', isLoading: false });
    }
  },
  
  createProblem: async (problem) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const newProblem: Problem = {
        ...problem,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      set(state => ({ 
        problems: [...state.problems, newProblem], 
        isLoading: false 
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to create problem', isLoading: false });
    }
  },
  
  updateProblem: async (id, problemData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        problems: state.problems.map(p => 
          p.id === id ? { ...p, ...problemData } : p
        ),
        currentProblem: state.currentProblem?.id === id 
          ? { ...state.currentProblem, ...problemData } 
          : state.currentProblem,
        isLoading: false
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to update problem', isLoading: false });
    }
  },
  
  deleteProblem: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      set(state => ({
        problems: state.problems.filter(p => p.id !== id),
        isLoading: false
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to delete problem', isLoading: false });
    }
  }
}));