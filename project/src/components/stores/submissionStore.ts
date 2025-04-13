import { create } from 'zustand';

export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  language: 'javascript' | 'python' | 'java' | 'cpp';
  status: 'pending' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded' | 'runtime_error';
  runtime: number; // in milliseconds
  memory: number; // in KB
  createdAt: string;
  testCaseResults?: {
    testCaseId: string;
    passed: boolean;
    output?: string;
    error?: string;
  }[];
  contestId?: string;
}

interface SubmissionState {
  submissions: Submission[];
  currentSubmission: Submission | null;
  isLoading: boolean;
  error: string | null;
  fetchSubmissions: (userId?: string, problemId?: string) => Promise<void>;
  fetchSubmissionById: (id: string) => Promise<void>;
  createSubmission: (submission: Omit<Submission, 'id' | 'createdAt' | 'status' | 'runtime' | 'memory'>) => Promise<void>;
}

// Mock data for initial development
const mockSubmissions: Submission[] = [
  {
    id: '1',
    problemId: '1',
    userId: 'user1',
    code: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n}',
    language: 'javascript',
    status: 'accepted',
    runtime: 76,
    memory: 38400,
    createdAt: '2023-06-01T10:30:00.000Z',
    testCaseResults: [
      {
        testCaseId: '1-1',
        passed: true,
        output: '[0,1]'
      },
      {
        testCaseId: '1-2',
        passed: true,
        output: '[1,2]'
      }
    ]
  },
  {
    id: '2',
    problemId: '2',
    userId: 'user1',
    code: 'function reverseList(head) {\n  let prev = null;\n  let current = head;\n  while (current) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}',
    language: 'javascript',
    status: 'wrong_answer',
    runtime: 65,
    memory: 36200,
    createdAt: '2023-06-02T14:20:00.000Z',
    testCaseResults: [
      {
        testCaseId: '2-1',
        passed: false,
        output: '[5,4,3,2]',
        error: 'Expected [5,4,3,2,1] but got [5,4,3,2]'
      }
    ],
    contestId: '1'
  }
];

export const useSubmissionsStore = create<SubmissionState>()((set) => ({
  submissions: mockSubmissions,
  currentSubmission: null,
  isLoading: false,
  error: null,
  
  fetchSubmissions: async (userId, problemId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call with filters
      let filteredSubmissions = [...mockSubmissions];
      
      if (userId) {
        filteredSubmissions = filteredSubmissions.filter(s => s.userId === userId);
      }
      
      if (problemId) {
        filteredSubmissions = filteredSubmissions.filter(s => s.problemId === problemId);
      }
      
      set({ submissions: filteredSubmissions, isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to fetch submissions', isLoading: false });
    }
  },
  
  fetchSubmissionById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const submission = mockSubmissions.find(s => s.id === id) || null;
      set({ currentSubmission: submission, isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to fetch submission', isLoading: false });
    }
  },
  
  createSubmission: async (submission) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call that evaluates the code
      // For now, we'll just simulate a successful submission
      const newSubmission: Submission = {
        ...submission,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: Math.random() > 0.3 ? 'accepted' : 'wrong_answer',
        runtime: Math.floor(Math.random() * 100) + 50,
        memory: Math.floor(Math.random() * 10000) + 30000,
        testCaseResults: [
          {
            testCaseId: '1-1',
            passed: true,
            output: '[0,1]'
          }
        ]
      };
      
      set(state => ({ 
        submissions: [...state.submissions, newSubmission],
        currentSubmission: newSubmission,
        isLoading: false 
      }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to create submission', isLoading: false });
    }
  }
}));