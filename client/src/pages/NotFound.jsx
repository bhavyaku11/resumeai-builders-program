import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
        <div className="text-5xl font-black text-indigo-500 tracking-wider">404</div>
        <h2 className="text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-slate-400 text-xs">
          The requested page or resume URL does not exist or has been moved.
        </p>

        <div className="pt-2">
          <Link
            to="/dashboard"
            className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
