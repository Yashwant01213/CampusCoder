// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import ContestCard from '../components/ContestCard';
// // import { Contest, ContestStatus, Difficulty } from '../';

// export type Difficulty = 'Easy' | 'Medium' | 'Hard';
// export type ContestStatus = 'Upcoming' | 'Active' | 'Completed';

// export interface Contest {
//   id: string;
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   difficulty: Difficulty;
//   status: ContestStatus;
//   participants: number;
//   instituteId: string;
// }


// // Temporary mock data
// const mockContests: Contest[] = [
//   {
//     id: '1',
//     title: 'Algorithm Challenge 2024',
//     description: 'Test your algorithmic skills with this challenging contest featuring dynamic programming and graph theory problems.',
//     startDate: '2024-03-20T10:00:00Z',
//     endDate: '2024-03-20T14:00:00Z',
//     difficulty: 'Medium',
//     status: 'Upcoming',
//     participants: 150,
//     instituteId: 'inst1'
//   },
//   {
//     id: '2',
//     title: 'Web Development Hackathon',
//     description: 'Build a full-stack application in 4 hours using React and Node.js.',
//     startDate: '2024-03-15T09:00:00Z',
//     endDate: '2024-03-15T13:00:00Z',
//     difficulty: 'Hard',
//     status: 'Completed',
//     participants: 75,
//     instituteId: 'inst1'
//   }
// ];

// const ContestPage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<ContestStatus | 'All'>('All');
//   const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');

//   const filteredContests = mockContests.filter(contest => {
//     const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'All' || contest.status === statusFilter;
//     const matchesDifficulty = difficultyFilter === 'All' || contest.difficulty === difficultyFilter;
//     return matchesSearch && matchesStatus && matchesDifficulty;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Coding Contests</h1>
        
        
//         <div className="flex flex-col md:flex-row gap-4">
        
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search contests..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="flex gap-4">
//             <select
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value as ContestStatus | 'All')}
//             >
//               <option value="All">All Status</option>
//               <option value="Upcoming">Upcoming</option>
//               <option value="Active">Active</option>
//               <option value="Completed">Completed</option>
//             </select>
            
//             <select
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={difficultyFilter}
//               onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | 'All')}
//             >
//               <option value="All">All Difficulties</option>
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredContests.map(contest => (
//           <ContestCard key={contest.id} contest={contest} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ContestPage;
import React, { useState } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import ContestCard from '../components/ContestCard';
import { useNavigate } from 'react-router-dom';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type ContestStatus = 'Upcoming' | 'Active' | 'Completed';

export interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  difficulty: Difficulty;
  status: ContestStatus;
  participants: number;
  instituteId: string;
}

// Temporary mock data
const mockContests: Contest[] = [
  {
    id: '1',
    title: 'Algorithm Challenge 2024',
    description: 'Test your algorithmic skills with this challenging contest.',
    startDate: '2024-03-20T10:00:00Z',
    endDate: '2024-03-20T14:00:00Z',
    difficulty: 'Medium',
    status: 'Upcoming',
    participants: 150,
    instituteId: 'inst1',
  },
  {
    id: '2',
    title: 'Web Development Hackathon',
    description: 'Build a full-stack app in 4 hours.',
    startDate: '2024-03-15T09:00:00Z',
    endDate: '2024-03-15T13:00:00Z',
    difficulty: 'Hard',
    status: 'Completed',
    participants: 75,
    instituteId: 'inst1',
  },
];

const ContestPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContestStatus | 'All'>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
  const navigate = useNavigate();
  const filteredContests = mockContests.filter((contest) => {
    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || contest.status === statusFilter;
    const matchesDifficulty = difficultyFilter === 'All' || contest.difficulty === difficultyFilter;
    return matchesSearch && matchesStatus && matchesDifficulty;
  });
 
  const handleCreateContest = () => {
    navigate('/create')
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Create Contest Button */}
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={handleCreateContest}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50"
        >
          <PlusCircle size={20} />
          <span>Create Contest</span>
        </button>
      </div>

      {/* Search + Filters */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Coding Contests</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search contests..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ContestStatus | 'All')}
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | 'All')}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContests.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
    </div>
  );
};

export default ContestPage;
