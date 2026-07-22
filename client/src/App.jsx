import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-lg">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          ResumeAI
        </h1>
        <p className="text-slate-400 text-lg">
          AI-Powered Modern Resume Builder
        </p>
        <div className="inline-block px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-sm font-mono text-emerald-400">
          Client Scaffolding Ready
        </div>
      </div>
    </div>
  );
}
