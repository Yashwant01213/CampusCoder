import React, { useState } from 'react';
import axios from 'axios';

export const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', 'user-id'); // Replace with actual user ID from auth

    files.forEach((file) => {
      formData.append('attachments', file);
    });

    // try {
    //   await axios.post('/api/forum/posts', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    //   alert('Post created successfully!');
    //   setTitle('');
    //   setContent('');
    //   setFiles([]);
    // } catch (err: any) {
    //   setError(err?.response?.data?.message || 'Something went wrong!');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Discussion</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Describe your discussion topic..."
          className="w-full px-4 py-2 border rounded-md h-32 resize-none dark:bg-gray-700 dark:text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-indigo-600 file:text-white file:rounded-md file:cursor-pointer hover:file:bg-indigo-700"
        />

        {files.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Files:</strong> {files.map(file => file.name).join(', ')}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md shadow"
        >
          {loading ? 'Posting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
