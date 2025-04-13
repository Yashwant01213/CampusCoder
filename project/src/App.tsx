// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from './contexts/ThemeContext';
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import Home from './pages/Home';
// import Contests from './pages/Contests';
// import Problems from './pages/Problems';
// import Forum from './pages/Forum';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import NotFound from './pages/NotFound';
// import Dashboard from './pages/Dashboard';
// import { AuthProvider } from './contexts/AuthContext';
// import AiChatbot from './components/AiChatbot';
// import { Code } from 'lucide-react';
// import CodeEditor from './components/CodeEditor';
// import ProblemDetail from './components/problems/ProblemDetail';
// import CreatePost from './components/Forum/CreatePost';
// import SubmissionsTester from './components/Submissions/SubmissionsTester';





// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <Router>
//           <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
//             <Navbar />
//             <main className="flex-grow">
//               <Routes>
      
//                 <Route path="/" element={<Home />} />
//                 <Route path="/contests" element={<Contests />} />
//                 <Route path="/problems" element={<Problems />} />
//                 <Route path="/code" element={<Code />} />
//                 <Route path="/forum" element={<Forum />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/workspace/:id" element={<CodeEditor />} />
//                 <Route path="/createPost" element={<CreatePost/>} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/dashboard" element={<Dashboard/>} />
//                 <Route path="/new" element={<ProblemDetail/>}/>
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </main>
//             <AiChatbot/>
//             <Footer />
//           </div>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Contests from './pages/Contests';
import Problems from './pages/Problems';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import AiChatbot from './components/AiChatbot';
import { Code } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import ProblemDetail from './components/problems/ProblemDetail';
import CreatePost from './components/Forum/CreatePost';
import ProtectedRoute from './components/ProtectedRoute'; // 👈 Import this
import CreateContest from './pages/CreateContest';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>

                {/* ✅ Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* 🔐 Protected Routes */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/contests" element={<ProtectedRoute><Contests /></ProtectedRoute>} />
                <Route path="/problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><CreateContest /></ProtectedRoute>} />
                <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
                <Route path="/code" element={<ProtectedRoute><Code /></ProtectedRoute>} />
                <Route path="/workspace/:id" element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
                <Route path="/createPost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                <Route path="/new" element={<ProtectedRoute><ProblemDetail /></ProtectedRoute>} />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <AiChatbot />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
