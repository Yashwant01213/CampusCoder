import { Link } from 'react-router-dom';
import { Code, Award, Users, BookOpen, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Empower Your Institution's Coding Journey
              </h1>
              <p className="text-xl mb-8">
                A complete platform for educational institutions to host coding contests, 
                foster community learning, and track student progress.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50"
                >
                  Get Started
                </Link>
                <Link
                  to="/contests"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-500"
                >
                  Explore Contests
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Coding on laptop" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Designed for Educational Institutions
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              Everything you need to enhance coding education and foster a collaborative learning environment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Custom Coding Contests</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Host institution-specific coding competitions with custom problem sets and automated evaluation.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Community Forum</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A dedicated space for students and faculty to discuss problems and share knowledge.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Learning Tracks</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beginner-friendly coding exercises tailored for students to improve their skills step by step.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Admin Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive tools for faculty to create, monitor, and analyze student performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              Simple steps to get your institution's coding platform up and running.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 dark:bg-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400">
                Step by step
              </span>
            </div>
          </div>

          <div className="mt-12 grid gap-16 lg:grid-cols-3 lg:gap-x-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mb-4">
                <span className="text-lg font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Register Your Institution</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create an account for your educational institution and set up your admin profile.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mb-4">
                <span className="text-lg font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Customize Your Platform</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set up your institution's branding, invite faculty members, and configure contest settings.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mb-4">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Launch Your First Contest</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create problem sets, set evaluation criteria, and invite students to participate.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Trusted by Educators
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              See what educational institutions are saying about our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "CodeCampus has transformed how we teach programming. Our students are more engaged and we can easily track their progress."
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Jane Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Computer Science Professor, Tech University</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "The ability to create custom contests aligned with our curriculum has been invaluable. Our students love the competitive aspect."
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                  MS
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Mark Smith</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">IT Department Head, Central High School</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "The forum feature has created a vibrant community where students help each other and discuss programming concepts."
              </p>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                  AJ
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Alex Johnson</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dean of Engineering, State College</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
              Ready to transform coding education at your institution?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of educational institutions already using CodeCampus to enhance their programming curriculum.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50"
              >
                Register Now
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-600"
              >
                Request Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;