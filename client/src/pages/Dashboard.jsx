import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/resumes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setResumes(data.resumes || []);
      }
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchResumes();
    }
  }, [token]);

  const handleCreateResume = async (e) => {
    e.preventDefault();
    const titleToUse = newTitle.trim() || 'My Resume';
    setCreating(true);
    setError('');

    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: titleToUse }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create resume');
        setCreating(false);
      } else {
        setShowModal(false);
        setNewTitle('');
        navigate(`/builder/${data.resumeId}`);
      }
    } catch (err) {
      console.error('Error creating resume:', err);
      setError('Network error. Failed to create resume.');
      setCreating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-slate-800/80 border-b border-slate-700/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            ResumeAI
          </h1>
          <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-300">Dashboard</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-300 hidden sm:inline">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200 rounded-lg transition-colors border border-slate-600"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-slate-800 to-indigo-950/50 p-6 md:p-8 rounded-2xl border border-slate-700/80 shadow-lg gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome back, {user?.name}!</h2>
            <p className="text-slate-400 text-sm mt-1">
              Create, manage, and tailor AI-powered resumes for your dream roles.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 self-start md:self-auto"
          >
            <span className="text-lg">+</span>
            <span>New Resume</span>
          </button>
        </div>

        {/* Resumes List Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>Your Resumes</span>
            <span className="text-xs px-2 py-0.5 bg-slate-800 rounded-full text-slate-400 font-mono">
              {resumes.length}
            </span>
          </h3>

          {loading ? (
            <div className="p-12 text-center text-slate-400">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Loading your resumes...
            </div>
          ) : resumes.length === 0 ? (
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <div className="text-4xl">📄</div>
              <h4 className="text-base font-semibold text-white">No resumes created yet</h4>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Click "+ New Resume" above to create your first resume.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                + New Resume
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumes.map((res) => (
                <Link
                  key={res.id}
                  to={`/builder/${res.id}`}
                  className="bg-slate-800 hover:bg-slate-750 border border-slate-700/80 hover:border-indigo-500/50 rounded-xl p-5 transition-all group shadow-md hover:shadow-indigo-500/10 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xl">📄</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 rounded text-slate-400 border border-slate-700">
                        ID #{res.id}
                      </span>
                    </div>
                    <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors text-base truncate">
                      {res.title}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
                    <span>Updated {new Date(res.updated_at).toLocaleDateString()}</span>
                    <span className="text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                      Edit →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* New Resume Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create New Resume</h3>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateResume} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Resume Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Software Engineer 2026"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  autoFocus
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError('');
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {creating ? 'Creating...' : 'Create & Open'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
