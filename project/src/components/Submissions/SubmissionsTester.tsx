import React, { useEffect, useState } from 'react';
import { useSubmissionsStore } from '../stores/submissionStore';

const SubmissionsTester = () => {
  const {
    submissions,
    currentSubmission,
    isLoading,
    error,
    fetchSubmissions,
    fetchSubmissionById,
    createSubmission,
  } = useSubmissionsStore();

  const [form, setForm] = useState({
    problemId: '',
    userId: '',
    code: '',
    language: 'javascript' as 'javascript' | 'python' | 'java' | 'cpp',
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createSubmission(form);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submission Tester</h1>

      {/* Form */}
      <div className="space-y-4 bg-white p-4 rounded shadow">
        <input name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" className="w-full p-2 border rounded" />
        <input name="problemId" value={form.problemId} onChange={handleChange} placeholder="Problem ID" className="w-full p-2 border rounded" />
        <select name="language" value={form.language} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <textarea name="code" value={form.code} onChange={handleChange} placeholder="Code" rows={6} className="w-full p-2 border rounded" />
        <button onClick={handleSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Submit Code
        </button>
      </div>

      {/* Submissions List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">All Submissions</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {submissions.map((sub) => (
              <li key={sub.id} className="p-3 bg-gray-100 rounded">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Problem: {sub.problemId}</p>
                    <p>User: {sub.userId}</p>
                    <p>Status: <span className={`font-semibold ${sub.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>{sub.status}</span></p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{sub.language}</p>
                    <p>{sub.runtime}ms</p>
                    <p>{sub.memory}KB</p>
                  </div>
                </div>
                <button
                  className="mt-2 text-indigo-600 hover:underline"
                  onClick={() => fetchSubmissionById(sub.id)}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Current Submission Details */}
      {currentSubmission && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">Submission Details</h3>
          <pre className="mt-2 bg-gray-100 p-2 rounded overflow-x-auto">{currentSubmission.code}</pre>
          <ul className="mt-2">
            {currentSubmission.testCaseResults?.map((tc, i) => (
              <li key={i} className="text-sm">
                <span className={tc.passed ? 'text-green-600' : 'text-red-600'}>
                  {tc.passed ? '✔️' : '❌'} Test Case {tc.testCaseId}: {tc.output || 'No Output'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SubmissionsTester;
