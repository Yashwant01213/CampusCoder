import React, { useState } from 'react';
import axios from 'axios';

interface AddProblemFormProps {
  onProblemAdded?: () => void; // optional callback
}

const AddProblemForm: React.FC<AddProblemFormProps> = ({ onProblemAdded }) => {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [constraints, setConstraints] = useState('');
  const [examples, setExamples] = useState([{ input: '', output: '', explanation: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddExample = () => {
    setExamples([...examples, { input: '', output: '', explanation: '' }]);
  };

  const handleExampleChange = (index: number, field: string, value: string) => {
    const updatedExamples = [...examples];
    updatedExamples[index][field as keyof typeof updatedExamples[0]] = value;
    setExamples(updatedExamples);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:4000/api/problems',
        {
          title,
          difficulty,
          tags: tags.split(',').map((tag) => tag.trim()),
          description,
          inputFormat,
          outputFormat,
          constraints,
          examples,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming JWT is stored here
          },
        }
      );

      alert('Problem added successfully!');
      setTitle('');
      setDifficulty('Easy');
      setTags('');
      setDescription('');
      setInputFormat('');
      setOutputFormat('');
      setConstraints('');
      setExamples([{ input: '', output: '', explanation: '' }]);

      if (onProblemAdded) onProblemAdded();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add problem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Problem</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Problem Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      <textarea
        placeholder="Problem Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded h-28 resize-none dark:bg-gray-700 dark:text-white"
        required
      />

      <input
        type="text"
        placeholder="Input Format"
        value={inputFormat}
        onChange={(e) => setInputFormat(e.target.value)}
        className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="Output Format"
        value={outputFormat}
        onChange={(e) => setOutputFormat(e.target.value)}
        className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
      />

      <textarea
        placeholder="Constraints"
        value={constraints}
        onChange={(e) => setConstraints(e.target.value)}
        className="w-full px-4 py-2 border rounded h-20 resize-none dark:bg-gray-700 dark:text-white"
      />

      <div>
        <label className="block font-semibold text-gray-700 dark:text-white mb-2">Examples</label>
        {examples.map((example, idx) => (
          <div key={idx} className="space-y-2 mb-4">
            <input
              type="text"
              placeholder="Input"
              value={example.input}
              onChange={(e) => handleExampleChange(idx, 'input', e.target.value)}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Output"
              value={example.output}
              onChange={(e) => handleExampleChange(idx, 'output', e.target.value)}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Explanation (optional)"
              value={example.explanation}
              onChange={(e) => handleExampleChange(idx, 'explanation', e.target.value)}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddExample} className="text-blue-600 hover:underline">
          + Add another example
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow"
      >
        {loading ? 'Adding...' : 'Add Problem'}
      </button>
    </form>
  );
};

export default AddProblemForm;
