// // import  { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { MessageSquare, User, Clock, Search, Tag, ThumbsUp, MessageCircle, Filter } from 'lucide-react';
// // import { formatDistanceToNow } from 'date-fns';

// // interface ForumPost {
// //   id: string;
// //   title: string;
// //   content: string;
// //   author: {
// //     id: string;
// //     name: string;
// //     role: 'student' | 'faculty' | 'admin';
// //   };
// //   createdAt: Date;
// //   tags: string[];
// //   upvotes: number;
// //   replies: number;
// //   views: number;
// // }
// // // 
// // const mockPosts: ForumPost[] = [
// //   {
// //     id: '1',
// //     title: 'How to optimize dynamic programming solutions?',
// //     content: 'I\'m struggling with optimizing my dynamic programming solutions. Any tips on reducing time complexity?',
// //     author: {
// //       id: '101',
// //       name: 'Alex Johnson',
// //       role: 'student'
// //     },
// //     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
// //     tags: ['Dynamic Programming', 'Algorithms', 'Optimization'],
// //     upvotes: 15,
// //     replies: 8,
// //     views: 120
// //   },
// //   {
// //     id: '2',
// //     title: 'Best resources for learning graph algorithms?',
// //     content: 'Can anyone recommend good resources for learning graph algorithms from scratch?',
// //     author: {
// //       id: '102',
// //       name: 'Dr. Sarah Williams',
// //       role: 'faculty'
// //     },
// //     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
// //     tags: ['Graphs', 'Algorithms', 'Learning Resources'],
// //     upvotes: 32,
// //     replies: 12,
// //     views: 245
// //   },
// //   {
// //     id: '3',
// //     title: 'Struggling with recursion concepts',
// //     content: 'I find it difficult to think recursively. How can I improve my understanding of recursion?',
// //     author: {
// //       id: '103',
// //       name: 'Michael Chen',
// //       role: 'student'
// //     },
// //     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
// //     tags: ['Recursion', 'Fundamentals'],
// //     upvotes: 18,
// //     replies: 15,
// //     views: 189
// //   },
// //   {
// //     id: '4',
// //     title: 'Tips for the upcoming Algorithm Championship?',
// //     content: 'The Algorithm Championship is next week. Any last-minute preparation tips?',
// //     author: {
// //       id: '104',
// //       name: 'Emma Rodriguez',
// //       role: 'student'
// //     },
// //     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
// //     tags: ['Contest Prep', 'Algorithms', 'Tips'],
// //     upvotes: 27,
// //     replies: 9,
// //     views: 210
// //   },
// //   {
// //     id: '5',
// //     title: 'Understanding time complexity analysis',
// //     content: 'I\'m confused about how to analyze the time complexity of nested loops with different bounds.',
// //     author: {
// //       id: '105',
// //       name: 'Prof. Robert Lee',
// //       role: 'faculty'
// //     },
// //     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
// //     tags: ['Time Complexity', 'Analysis', 'Algorithms'],
// //     upvotes: 41,
// //     replies: 18,
// //     views: 320
// //   },
// //   {
// //     id: '6',
// //     title: 'How to approach competitive programming?',
// //     content: 'I\'m new to competitive programming. What\'s the best way to start and improve?',
// //     author: {
// //       id: '106',
// //       name: 'David Kim',
// //       role: 'student'
// //     },
// //     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
// //     tags: ['Competitive Programming', 'Beginners', 'Strategy'],
// //     upvotes: 35,
// //     replies: 22,
// //     views: 280
// //   }
// // ];

// // const Forum: React.FC = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedTags, setSelectedTags] = useState<string[]>([]);
// //   const [sortBy, setSortBy] = useState<string>('recent');

// //   // Get all unique tags
// //   const allTags = Array.from(new Set(mockPosts.flatMap(post => post.tags))).sort();

// //   const toggleTag = (tag: string) => {
// //     if (selectedTags.includes(tag)) {
// //       setSelectedTags(selectedTags.filter(t => t !== tag));
// //     } else {
// //       setSelectedTags([...selectedTags, tag]);
// //     }
// //   };

// //   const filteredPosts = mockPosts.filter(post => {
// //     const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
    
// //     return matchesSearch && matchesTags;
// //   });

// //   const sortedPosts = [...filteredPosts].sort((a, b) => {
// //     switch (sortBy) {
// //       case 'recent':
// //         return b.createdAt.getTime() - a.createdAt.getTime();
// //       case 'popular':
// //         return b.upvotes - a.upvotes;
// //       case 'active':
// //         return b.replies - a.replies;
// //       default:
// //         return b.createdAt.getTime() - a.createdAt.getTime();
// //     }
// //   });

// //   const getRoleBadgeColor = (role: string) => {
// //     switch (role) {
// //       case 'faculty':
// //         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
// //       case 'admin':
// //         return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
// //       default:
// //         return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
// //     }
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //       <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community Forum</h1>
// //           <p className="text-lg text-gray-600 dark:text-gray-400">
// //             Discuss coding problems, share knowledge, and learn from your peers.
// //           </p>
// //         </div>
// //         <div className="mt-4 md:mt-0">
// //           <Link
// //             to="/forum/new"
// //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// //           >
// //             <MessageSquare className="h-5 w-5 mr-2" />
// //             New Discussion
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Filters and Search */}
// //       <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
// //         <div className="flex flex-col space-y-4">
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Filter className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <select
// //                 className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 value={sortBy}
// //                 onChange={(e) => setSortBy(e.target.value)}
// //               >
// //                 <option value="recent">Most Recent</option>
// //                 <option value="popular">Most Popular</option>
// //                 <option value="active">Most Active</option>
// //               </select>
// //             </div>
            
// //             <div className="relative flex-grow max-w-md">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Search className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 type="text"
// //                 className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 placeholder="Search discussions..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //           </div>
          
// //           <div>
// //             <div className="flex items-center mb-2">
// //               <Tag className="h-5 w-5 text-gray-400 mr-2" />
// //               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular tags:</span>
// //             </div>
// //             <div className="flex flex-wrap gap-2">
// //               {allTags.map(tag => (
// //                 <button
// //                   key={tag}
// //                   onClick={() => toggleTag(tag)}
// //                   className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
// //                     selectedTags.includes(tag)
// //                       ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
// //                       : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
// //                   }`}
// //                 >
// //                   {tag}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Forum Posts */}
// //       <div className="space-y-6">
// //         {sortedPosts.length > 0 ? (
// //           sortedPosts.map((post) => (
// //             <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
// //               <div className="p-6">
// //                 <div className="flex items-start justify-between">
// //                   <div>
// //                     <Link to={`/forum/${post.id}`} className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
// //                       {post.title}
// //                     </Link>
// //                     <div className="mt-2 flex items-center space-x-4">
// //                       <div className="flex items-center">
// //                         <User className="h-4 w-4 text-gray-400 mr-1" />
// //                         <span className="text-sm text-gray-600 dark:text-gray-400">{post.author.name}</span>
// //                         <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(post.author.role)}`}>
// //                           {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)}
// //                         </span>
// //                       </div>
// //                       <div className="flex items-center">
// //                         <Clock className="h-4 w-4 text-gray-400 mr-1" />
// //                         <span className="text-sm text-gray-600 dark:text-gray-400">
// //                           {formatDistanceToNow(post.createdAt, { addSuffix: true })}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center space-x-4">
// //                     <div className="flex items-center text-gray-500 dark:text-gray-400">
// //                       <ThumbsUp className="h-5 w-5 mr-1" />
// //                       <span>{post.upvotes}</span>
// //                     </div>
// //                     <div className="flex items-center text-gray-500 dark:text-gray-400">
// //                       <MessageCircle className="h-5 w-5 mr-1" />
// //                       <span>{post.replies}</span>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 <p className="mt-4 text-gray-600 dark:text-gray-400 line-clamp-2">
// //                   {post.content}
// //                 </p>
                
// //                 <div className="mt-4 flex flex-wrap gap-2">
// //                   {post.tags.map(tag => (
// //                     <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
// //                       {tag}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
// //             <p className="text-gray-600 dark:text-gray-400">No discussions found matching your criteria.</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Forum;
// // CommunityForum.tsx - Updated React component for a MERN-based Community Forum with image & doc upload functionality

import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare, User, Clock, Search, Tag,
  ThumbsUp, MessageCircle, Filter, FileImage, FileText
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CreatePost from '../components/Forum/CreatePost'; // adjust the path as needed
import Modal from 'react-modal'; // for modal behavior
import axios from 'axios';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: 'student' | 'faculty' | 'admin';
  };
  createdAt: Date;
  tags: string[];
  upvotes: number;
  replies: number;
  views: number;
  imageUrl?: string;
  documentUrl?: string;
}

const Forum: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('recent');

  // Sample data should be fetched from API in production
  const mockPosts: ForumPost[] = [
    {
          id: '1',
          title: 'How to optimize dynamic programming solutions?',
          content: 'I\'m struggling with optimizing my dynamic programming solutions. Any tips on reducing time complexity?',
          author: {
            id: '101',
            name: 'Alex Johnson',
            role: 'student'
          },
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          tags: ['Dynamic Programming', 'Algorithms', 'Optimization'],
          upvotes: 15,
          replies: 8,
          views: 120
        },
        {
          id: '2',
          title: 'Best resources for learning graph algorithms?',
          content: 'Can anyone recommend good resources for learning graph algorithms from scratch?',
          author: {
            id: '102',
            name: 'Dr. Sarah Williams',
            role: 'faculty'
          },
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          tags: ['Graphs', 'Algorithms', 'Learning Resources'],
          upvotes: 32,
          replies: 12,
          views: 245
        },
        {
          id: '3',
          title: 'Struggling with recursion concepts',
          content: 'I find it difficult to think recursively. How can I improve my understanding of recursion?',
          author: {
            id: '103',
            name: 'Michael Chen',
            role: 'student'
          },
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          tags: ['Recursion', 'Fundamentals'],
          upvotes: 18,
          replies: 15,
          views: 189
        },
        {
          id: '4',
          title: 'Tips for the upcoming Algorithm Championship?',
          content: 'The Algorithm Championship is next week. Any last-minute preparation tips?',
          author: {
            id: '104',
            name: 'Emma Rodriguez',
            role: 'student'
          },
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
          tags: ['Contest Prep', 'Algorithms', 'Tips'],
          upvotes: 27,
          replies: 9,
          views: 210
        },
        {
          id: '5',
          title: 'Understanding time complexity analysis',
          content: 'I\'m confused about how to analyze the time complexity of nested loops with different bounds.',
          author: {
            id: '105',
            name: 'Prof. Robert Lee',
            role: 'faculty'
          },
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
          tags: ['Time Complexity', 'Analysis', 'Algorithms'],
          upvotes: 41,
          replies: 18,
          views: 320
        },
        {
          id: '6',
          title: 'How to approach competitive programming?',
          content: 'I\'m new to competitive programming. What\'s the best way to start and improve?',
          author: {
            id: '106',
            name: 'David Kim',
            role: 'student'
          },
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
          tags: ['Competitive Programming', 'Beginners', 'Strategy'],
          upvotes: 35,
          replies: 22,
          views: 280
        }
  ]; // same as previous sample data

  const [showModal, setShowModal] = useState(false);
const [backendPosts, setBackendPosts] = useState<ForumPost[]>([]);
const handlePostCreated = async () => {
  setShowModal(false);
  try {
    const res = await axios.get('/api/forum/posts');
    setBackendPosts(res.data);
  } catch (err) {
    console.error('Error refreshing posts:', err);
  }
};
const combinedPosts = [...backendPosts, ...mockPosts];

// const filteredPosts = combinedPosts.filter(post => {
//   const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     post.content.toLowerCase().includes(searchTerm.toLowerCase());
//   const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
//   return matchesSearch && matchesTags;
// });
const filteredPosts = combinedPosts.filter(post => {
  const matchesSearch =
    (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    (post.content?.toLowerCase().includes(searchTerm.toLowerCase()) || '');

  const matchesTags =
    selectedTags.length === 0 || selectedTags.some(tag => post.tags?.includes(tag));

  return matchesSearch && matchesTags;
});


const sortedPosts = [...filteredPosts].sort((a, b) => {
  switch (sortBy) {
    case 'recent': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    case 'popular': return b.upvotes - a.upvotes;
    case 'active': return b.replies - a.replies;
    default: return 0;
  }
});




useEffect(() => {
  const fetchBackendPosts = async () => {
    try {
      const res = await axios.get('/api/forum/posts');
      setBackendPosts(res.data);
    } catch (err) {
      console.error('Error fetching backend posts:', err);
    }
  };
  fetchBackendPosts();
}, []);

  const allTags = Array.from(new Set(mockPosts.flatMap(post => post.tags))).sort();

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'faculty': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community Forum</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discuss coding problems, share knowledge, and learn from your peers.
          </p>
        </div>
        {/* <Link
          to="/forum/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          New Discussion
        </Link> */}
            <button
  onClick={() => setShowModal(true)}
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
>
  <MessageSquare className="h-5 w-5 mr-2" />
  New Discussion
</button>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <select
                className="pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="active">Most Active</option>
              </select>
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                className="pl-10 pr-4 py-2 w-full border rounded-md dark:bg-gray-700"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <Tag className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium">Popular tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${selectedTags.includes(tag) ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Post Listing */}
      <div className="space-y-6">
        {sortedPosts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <Link to={`/forum/${post.id}`} className="text-xl font-semibold text-indigo-700">
                  {post.title}
                </Link>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" /> {post.author.name}
                    <span className={`ml-2 px-2 py-0.5 rounded ${getRoleBadgeColor(post.author.role)}`}>
                      {post.author.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {formatDistanceToNow(post.createdAt)} ago
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" /> {post.upvotes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" /> {post.replies}
                </div>
              </div>
            </div>

            <p className="mt-3 text-gray-700 dark:text-gray-300 line-clamp-2">{post.content}</p>

            {/* File/Media display */}
            <div className="mt-3 flex gap-4">
              {post.imageUrl && (
                <a href={post.imageUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-500">
                  <FileImage className="h-4 w-4" /> Image
                </a>
              )}
              {post.documentUrl && (
                <a href={post.documentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-500">
                  <FileText className="h-4 w-4" /> Document
                </a>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{tag}</span>
              ))}
            </div>
          </div>
        ))}
        
      </div>
  
<Modal
  isOpen={showModal}
  onRequestClose={() => setShowModal(false)}
  contentLabel="Create New Post"
  className="max-w-2xl mx-auto mt-20 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
>
  <CreatePost onPostCreated={handlePostCreated} />
 </Modal> 
    </div>
  );
  
};


export default Forum;

