import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Trophy } from 'lucide-react';
import { Contest } from '../types';
import { format } from 'date-fns';

interface ContestCardProps {
  contest: Contest;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const navigate = useNavigate();

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
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/contest/${contest.id}`)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{contest.title}</h3>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(contest.difficulty)}`}>
              {contest.difficulty}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contest.status)}`}>
              {contest.status}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{contest.description}</p>
        
        <div className="flex items-center gap-6 text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{format(new Date(contest.startDate), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{contest.participants} participants</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy size={18} />
            <span>{contest.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;