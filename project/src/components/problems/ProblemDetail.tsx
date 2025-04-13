import { Clock, Database, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../layout/ui/Button";
import {Card, CardContent} from "../layout/ui/Card";
import CodeEditor from "../CodeEditor";
import { useProblemsStore } from "../stores/problemsStore";
import { useSubmissionsStore } from "../stores/submissionStore";


const ProblemDetail : React.FC = () =>{
    const { currentProblem} = useProblemsStore();
    const {submissions} = useSubmissionsStore();

    if (!currentProblem) {
        return (
          <div className="text-center text-muted-foreground py-6">
            <p>Problem data is not available.</p>
          </div>
        );
      }
  return (
    <div>
      <div className="flex items-center mb-4">
        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="text-sm">Time Limit: {currentProblem.timeLimit} ms</span>
      </div>
      <div className="flex items-center mb-4">
        <Database className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="text-sm">Memory Limit: {currentProblem.memoryLimit} MB</span>
      </div>

      <div className="h-[calc(100vh-300px)] min-h-[500px]">
        <CodeEditor 
          problemId={currentProblem.id} 
          initialCode={currentProblem.sampleCode.javascript}
        />
      </div>

      <div>
        {submissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Language</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Runtime</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Memory</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {submission.status === "accepted" ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500">Accepted</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-500">
                              {submission.status
                                .replace("_", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize">{submission.language}</td>
                    <td className="px-4 py-3">{submission.runtime} ms</td>
                    <td className="px-4 py-3">{(submission.memory / 1024).toFixed(2)} MB</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(submission.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card>
            <CardContent className="py-6">
              <div className="text-center text-muted-foreground">
                <p>No submissions yet for this problem.</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                >
                  Solve Problem
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProblemDetail;
