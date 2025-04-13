import { useParams } from 'react-router-dom';
import { Calendar, Clock, Users, Timer } from 'lucide-react';
import { Contest } from './Contests';
import { format } from 'date-fns';

// Temporary mock data
const mockContest: Contest = {
  id: '1',
  title: 'Algorithm Challenge 2024',
  description: 'Test your algorithmic skills with this challenging contest featuring dynamic programming and graph theory problems. Participants will face a series of increasingly difficult problems that will test their understanding of fundamental computer science concepts and their ability to optimize solutions.',
  startDate: '2024-03-20T10:00:00Z',
  endDate: '2024-03-20T14:00:00Z',
  difficulty: 'Medium',
  status: 'Upcoming',
  participants: 150,
  instituteId: 'inst1'
};

const ContestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contest = mockContest; // In real app, fetch contest by id

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{contest.title}</h1>
          <div className="flex gap-2">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getDifficultyColor(contest.difficulty)}`}>
              {contest.difficulty}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(contest.status)}`}>
              {contest.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar size={20} />
              <span>Start: {format(new Date(contest.startDate), 'PPP p')}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Clock size={20} />
              <span>End: {format(new Date(contest.endDate), 'PPP p')}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Users size={20} />
              <span>{contest.participants} participants</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Timer size={20} />
              <span>Duration: 4 hours</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{contest.description}</p>
        </div>

        <div className="flex justify-center">
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            Register for Contest
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestDetail;