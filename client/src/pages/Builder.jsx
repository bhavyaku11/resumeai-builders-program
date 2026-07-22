import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ACTIVE_SECTIONS = [
  { id: 'personal_info', label: 'Personal Info', icon: '👤' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
];

const COMING_SOON_SECTIONS = [
  { id: 'certifications', label: 'Certifications', icon: '📜' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'positions_of_responsibility', label: 'Positions of Responsibility', icon: '🛡️' },
  { id: 'languages', label: 'Languages', icon: '🌐' },
  { id: 'interests', label: 'Interests', icon: '🎯' },
];

export default function Builder() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('personal_info');
  const [saveStatus, setSaveStatus] = useState('Saved'); // 'Saved', 'Saving...', 'Unsaved'

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/resumes/${resumeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to load resume');
        } else {
          setResume(data.resume);
        }
      } catch (err) {
        console.error('Error fetching resume:', err);
        setError('Network error loading resume');
      } finally {
        setLoading(false);
      }
    };

    if (resumeId && token) {
      fetchResume();
    }
  }, [resumeId, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-400 font-medium">Loading resume builder...</span>
        </div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl max-w-md text-center space-y-4">
          <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto text-xl">
            ⚠️
          </div>
          <h2 className="text-xl font-bold text-white">Error Loading Resume</h2>
          <p className="text-slate-400 text-sm">{error || 'Resume not found'}</p>
          <Link
            to="/dashboard"
            className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-slate-800/90 border-b border-slate-700/80 backdrop-blur px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors text-sm flex items-center space-x-1"
          >
            <span>←</span>
            <span className="hidden sm:inline font-medium">Dashboard</span>
          </Link>
          <div className="h-5 w-px bg-slate-700"></div>
          <h1 className="text-base md:text-lg font-bold text-white tracking-tight truncate max-w-xs md:max-w-md">
            {resume.title}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Save Status Indicator */}
          <div className="flex items-center space-x-2 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">{saveStatus}</span>
          </div>

          <div className="hidden sm:block text-xs px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded text-indigo-400 font-mono">
            ID: {resume.id}
          </div>
        </div>
      </header>

      {/* Main Two-Panel Content Shell */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Section Navigation & Form Area */}
        <div className="w-full md:w-1/2 lg:w-5/12 border-r border-slate-800 flex flex-col bg-slate-900/50">
          {/* Section Navigation Tabs (Horizontal scroll on mobile, tab grid) */}
          <div className="p-3 bg-slate-800/40 border-b border-slate-800 overflow-x-auto scrollbar-none">
            <div className="flex space-x-2">
              {ACTIVE_SECTIONS.map((sec) => {
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveTab(sec.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    <span>{sec.icon}</span>
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section List Sidebar + Active Form Split */}
          <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
            {/* Vertical Section Selector Sidebar */}
            <div className="w-full md:w-48 bg-slate-800/20 border-b md:border-b-0 md:border-r border-slate-800 p-2 space-y-1">
              <div className="px-2 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Sections
              </div>
              {ACTIVE_SECTIONS.map((sec) => {
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveTab(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{sec.icon}</span>
                      <span>{sec.label}</span>
                    </span>
                  </button>
                );
              })}

              <div className="pt-2">
                <div className="px-2 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  More Sections
                </div>
                {COMING_SOON_SECTIONS.map((sec) => (
                  <div
                    key={sec.id}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-500 opacity-60 flex items-center justify-between cursor-not-allowed"
                  >
                    <span className="flex items-center space-x-2">
                      <span>{sec.icon}</span>
                      <span>{sec.label}</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-400 font-mono">
                      Soon
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Section Placeholder Form Area */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center border-t md:border-t-0 border-slate-800 min-h-[300px]">
              <div className="p-4 bg-slate-800/60 rounded-full border border-slate-700/60 text-2xl mb-3">
                {ACTIVE_SECTIONS.find((s) => s.id === activeTab)?.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {ACTIVE_SECTIONS.find((s) => s.id === activeTab)?.label} Form
              </h3>
              <p className="text-slate-400 text-xs max-w-xs mb-4">
                Section editing fields for {ACTIVE_SECTIONS.find((s) => s.id === activeTab)?.label} will be loaded here in the next step.
              </p>
              <div className="px-3 py-1.5 bg-slate-800 rounded border border-slate-700 text-slate-400 text-xs font-mono">
                Active Tab ID: <span className="text-indigo-400">{activeTab}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Live Resume Preview */}
        <div className="w-full md:w-1/2 lg:w-7/12 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[400px] overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl flex flex-col items-center justify-center space-y-4 min-h-[450px]">
            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 flex items-center justify-center text-2xl">
              📄
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Live Resume Preview</h3>
              <p className="text-slate-400 text-sm mt-1">Preview will appear here</p>
            </div>
            <div className="w-full max-w-xs space-y-2 pt-4 opacity-40">
              <div className="h-3 bg-slate-700 rounded-full w-3/4 mx-auto"></div>
              <div className="h-2 bg-slate-800 rounded-full w-1/2 mx-auto"></div>
              <div className="h-2 bg-slate-800 rounded-full w-5/6 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
