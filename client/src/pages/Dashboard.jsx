import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-8 text-center space-y-6">
        <div>
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Dashboard Placeholder
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome, {user?.name || 'User'}!
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Logged in as <span className="text-slate-200 font-mono">{user?.email}</span>
          </p>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/50 text-left text-xs text-slate-400 space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">User ID:</span>
            <span className="font-mono text-slate-300">{user?.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Account Created:</span>
            <span className="font-mono text-slate-300">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
