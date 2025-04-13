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

