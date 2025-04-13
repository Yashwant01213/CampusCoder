import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProblemsStore } from '../components/stores/problemsStore';
import { useContestsStore } from '../components/stores/contestsStore';
import { useSubmissionsStore } from '../components/stores/submissionStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/layout/ui/Card';
import { Button } from '../components/layout/ui/Button';
import { Badge } from  '../components/layout/ui/Badge';
import { 
  Code, 
  Trophy, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.name;
  const { problems, fetchProblems } = useProblemsStore();
  const { contests, fetchContests } = useContestsStore();
  const { submissions, fetchSubmissions } = useSubmissionsStore();

  useEffect(() => {
    fetchProblems();
    fetchContests();
    if (user) {
      fetchSubmissions(user.id);
    }
  }, [fetchProblems, fetchContests, fetchSubmissions, user]);

  // Filter active contests
  const activeContests = contests.filter(contest => {
    const now = new Date();
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);
    return now >= startTime && now <= endTime;
  });

  // Filter upcoming contests
  const upcomingContests = contests.filter(contest => {
    const now = new Date();
    const startTime = new Date(contest.startTime);
    return now < startTime;
  });

  // Calculate statistics
  const totalSolved = submissions.filter(s => s.status === 'accepted').length;
  const totalAttempted = new Set(submissions.map(s => s.problemId)).size;
  const successRate = totalAttempted > 0 
    ? Math.round((totalSolved / totalAttempted) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSolved}</div>
            <p className="text-xs text-muted-foreground">
              out of {problems.length} problems
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">
              based on {submissions.length} submissions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Contests</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeContests.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingContests.length} upcoming contests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Contests */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Active Contests</h2>
          <Link to="/contests">
            <Button variant="outline" size="sm">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {activeContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeContests.map(contest => (
              <Card key={contest.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{contest.title}</CardTitle>
                    <Badge variant="default">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{contest.description}</p>
                  <div className="flex items-center text-sm mb-2">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      Ends: {format(new Date(contest.endTime), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm mb-4">
                    <Code className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{contest.problems.length} Problems</span>
                  </div>
                  <Link to={`/contests/${contest.id}`}>
                    <Button className="w-full">Enter Contest</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-6">
              <div className="text-center text-muted-foreground">
                <Trophy className="mx-auto h-12 w-12 mb-2 opacity-50" />
                <p>No active contests at the moment.</p>
                <p className="text-sm">Check back later or explore the problem set.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Submissions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Submissions</h2>
        </div>
        
        {submissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left text-sm font-medium">Problem</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Language</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Runtime</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {submissions.slice(0, 5).map(submission => {
                  const problem = problems.find(p => p.id === submission.problemId);
                  return (
                    <tr key={submission.id} className="border-b border-border">
                      <td className="px-4 py-3">
                        <Link to={`/problems/${submission.problemId}`} className="text-primary hover:underline">
                          {problem?.title || 'Unknown Problem'}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {submission.status === 'accepted' ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-green-500">Accepted</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-red-500">
                                {submission.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize">{submission.language}</td>
                      <td className="px-4 py-3">{submission.runtime} ms</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {format(new Date(submission.createdAt), 'MMM d, h:mm a')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Card>
            <CardContent className="py-6">
              <div className="text-center text-muted-foreground">
                <Code className="mx-auto h-12 w-12 mb-2 opacity-50" />
                <p>No submissions yet.</p>
                <Link to="/problems">
                  <Button variant="outline" className="mt-2">
                    Solve Problems
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;