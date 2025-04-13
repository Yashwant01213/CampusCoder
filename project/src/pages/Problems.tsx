import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Tag, CheckCircle, Clock, Award } from 'lucide-react';
import AddProblemForm from '../components/AddProblemForm'; 
import { useAuth } from '../contexts/AuthContext';
import Modal from 'react-modal';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  solvedCount: number;
  timeLimit: string;
  memoryLimit: string;
  solved: boolean;
  description:string;
  constraints:string[];
  input:string;
  output:string;
}  

// eslint-disable-next-line react-refresh/only-export-components
export const mockProblems: Problem[] = [
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'Easy',
      tags: ['Arrays', 'Hash Table'],
      solvedCount: 1250,
      timeLimit: '1s',
      memoryLimit: '256MB',
      solved: true,
      description: 'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to target.',
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ],
      input: 'An integer n, followed by n space-separated integers. Then an integer target.',
      output: 'Two space-separated integers representing the indices.'
    },
    {
      id: '2',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      tags: ['String', 'Sliding Window', 'Hash Table'],
      solvedCount: 850,
      timeLimit: '1s',
      memoryLimit: '256MB',
      solved: false,
      description: 'Given a string, find the length of the longest substring without repeating characters.',
      constraints: [
        '0 <= s.length <= 5 * 10^4',
        's consists of English letters, digits, symbols and spaces.'
      ],
      input: 'A single string s.',
      output: 'An integer representing the length of the longest substring.'
    },
    {
      id: '3',
      title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      tags: ['Arrays', 'Binary Search', 'Divide and Conquer'],
      solvedCount: 320,
      timeLimit: '2s',
      memoryLimit: '256MB',
      solved: false,
      description: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
      constraints: [
        'nums1.length == m, nums2.length == n',
        '0 <= m, n <= 10^6',
        '1 <= m + n <= 2 * 10^6',
        '-10^6 <= nums1[i], nums2[i] <= 10^6'
      ],
      input: 'Two arrays of integers, nums1 and nums2.',
      output: 'A float representing the median.'
    },
    {
      id: '4',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      tags: ['Stack', 'String'],
      solvedCount: 980,
      timeLimit: '1s',
      memoryLimit: '256MB',
      solved: true,
      description: 'Given a string containing just the characters (), {}, and [], determine if the input string is valid.',
      constraints: [
        '1 <= s.length <= 10^4',
        's consists of parentheses only: ()[]{}'
      ],
      input: 'A single string s.',
      output: 'true if the string is valid, false otherwise.'
    },
    {
      id: '5',
      title: 'Merge K Sorted Lists',
      difficulty: 'Hard',
      tags: ['Linked List', 'Divide and Conquer', 'Heap'],
      solvedCount: 280,
      timeLimit: '2s',
      memoryLimit: '256MB',
      solved: false,
      description: 'Merge k sorted linked lists and return it as one sorted list.',
      constraints: [
        'k == lists.length',
        '0 <= k <= 10^4',
        '0 <= lists[i].length <= 500',
        '-10^4 <= lists[i][j] <= 10^4'
      ],
      input: 'k lists, each containing integers in sorted order.',
      output: 'A single sorted linked list.'
    },
    {
      id: '6',
      title: 'LRU Cache',
      difficulty: 'Medium',
      tags: ['Hash Table', 'Linked List', 'Design'],
      solvedCount: 520,
      timeLimit: '1s',
      memoryLimit: '256MB',
      solved: false,
      description: 'Design and implement a data structure for Least Recently Used (LRU) cache.',
      constraints: [
        '1 <= capacity <= 3000',
        '0 <= key <= 10^4',
        '0 <= value <= 10^5'
      ],
      input: 'A sequence of get and put operations.',
      output: 'The result of get operations.'
    },
    {
      id: '7',
      title: 'Number of Islands',
      difficulty: 'Medium',
      tags: ['DFS', 'BFS', 'Union Find', 'Matrix'],
      solvedCount: 680,
      timeLimit: '1s',
      memoryLimit: '256MB',
      solved: true,
      description: 'Given a 2D grid map of 1s (land) and 0s (water), count the number of islands.',
      constraints: [
        '1 <= m, n <= 300',
        'grid[i][j] is "0" or "1"'
      ],
      input: 'A 2D grid of "1" and "0".',
      output: 'An integer representing the number of islands.'
    },
    {
      id: '8',
      title: 'Trapping Rain Water',
      difficulty: 'Hard',
      tags: ['Arrays', 'Two Pointers', 'Dynamic Programming', 'Stack'],
      solvedCount: 240,
      timeLimit: '1s',
      memoryLimit: '256MB',
      solved: false,
      description: 'Given n non-negative integers representing elevation map, compute how much water it can trap after raining.',
      constraints: [
        'n == height.length',
        '1 <= n <= 2 * 10^4',
        '0 <= height[i] <= 10^5'
      ],
      input: 'An array of non-negative integers.',
      output: 'An integer representing total water trapped.'
    }
];
  

const Problems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

 
  const { user } = useAuth(); // example hook
const userRole = user?.role;


  // Get all unique tags
  const allTags = Array.from(new Set(mockProblems.flatMap(problem => problem.tags))).sort();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredProblems = mockProblems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'solved' && problem.solved) || 
                         (filterStatus === 'unsolved' && !problem.solved);
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => problem.tags.includes(tag));
    
    return matchesSearch && matchesDifficulty && matchesStatus && matchesTags;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 dark:text-green-400';
      case 'Medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Hard':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Practice Problems</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Improve your coding skills with our collection of programming challenges.
        </p>
      </div>
      {(userRole === 'admin' || userRole === 'faculty') && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add New Problem
        </button>
      )}

      <Modal
        isOpen={showForm}
        onRequestClose={() => setShowForm(false)}
        contentLabel="Add New Problem"
        className="max-w-3xl mx-auto mt-20 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <AddProblemForm  />
      </Modal>

      {/* Filters and Search */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="solved">Solved</option>
                  <option value="unsolved">Unsolved</option>
                </select>
              </div>
            </div>
            
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Tag className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Solved By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Limits
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {problem.solved ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/workspace/${problem.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium">
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {problem.solvedCount} students
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{problem.timeLimit}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          <span>{problem.memoryLimit}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No problems found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problems;