import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import EducationForm from '../components/builder/EducationForm';
import ResumePreview from '../components/builder/ResumePreview';

const ACTIVE_SECTIONS = [
  { id: 'personal_info', label: 'Personal Info', icon: '👤', sortOrder: 1 },
  { id: 'education', label: 'Education', icon: '🎓', sortOrder: 2 },
  { id: 'experience', label: 'Experience', icon: '💼', sortOrder: 3 },
  { id: 'projects', label: 'Projects', icon: '🚀', sortOrder: 4 },
  { id: 'skills', label: 'Skills', icon: '⚡', sortOrder: 5 },
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
  const [saveStatus, setSaveStatus] = useState('All changes saved'); // 'Saving...', 'All changes saved', 'Failed to save'

  // Sections content dictionary
  const [sectionsData, setSectionsData] = useState({
    personal_info: {},
    education: { items: [] },
  });

  const saveTimerRef = useRef({});

  // Fetch Resume and Existing Sections
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

          // Populate sectionsData from API response
          const initialSections = {
            personal_info: {},
            education: { items: [] },
          };

          if (Array.isArray(data.resume.sections)) {
            data.resume.sections.forEach((sec) => {
              initialSections[sec.section_type] = sec.content;
            });
          }

          setSectionsData(initialSections);
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

  // Save section content to API
  const saveSectionToApi = useCallback(
    async (sectionType, content) => {
      setSaveStatus('Saving...');
      try {
        const secMeta = ACTIVE_SECTIONS.find((s) => s.id === sectionType);
        const sortOrder = secMeta ? secMeta.sortOrder : 1;

        const response = await fetch(`/api/resumes/${resumeId}/sections/${sectionType}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
            sort_order: sortOrder,
          }),
        });

        if (response.ok) {
          setSaveStatus('All changes saved');
        } else {
          setSaveStatus('Failed to save');
        }
      } catch (err) {
        console.error('Failed to auto-save section:', err);
        setSaveStatus('Failed to save');
      }
    },
    [resumeId, token]
  );

  // Handle local state change and trigger 1-second debounced auto-save
  const handleSectionChange = (sectionType, newContent) => {
    setSectionsData((prev) => ({
      ...prev,
      [sectionType]: newContent,
    }));

    setSaveStatus('Saving...');

    // Clear existing timer for this section
    if (saveTimerRef.current[sectionType]) {
      clearTimeout(saveTimerRef.current[sectionType]);
    }

    // Set 1-second debounce timer
    saveTimerRef.current[sectionType] = setTimeout(() => {
      saveSectionToApi(sectionType, newContent);
    }, 1000);
  };

  const handleRetrySave = () => {
    if (sectionsData[activeTab]) {
      saveSectionToApi(activeTab, sectionsData[activeTab]);
    }
  };

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

        {/* Save Status Indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs font-medium">
            {saveStatus === 'Saving...' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span className="text-amber-400">Saving...</span>
              </>
            )}
            {saveStatus === 'All changes saved' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-emerald-400">All changes saved</span>
              </>
            )}
            {saveStatus === 'Failed to save' && (
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="text-red-400">Failed to save</span>
                <button
                  onClick={handleRetrySave}
                  className="px-2 py-0.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded text-[10px] font-semibold transition-colors"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Two-Panel Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Section Navigation & Active Form */}
        <div className="w-full md:w-1/2 lg:w-5/12 border-r border-slate-800 flex flex-col bg-slate-900/50">
          {/* Horizontal scrollable tabs */}
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

          <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
            {/* Sidebar nav */}
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

            {/* Active Form Area */}
            <div className="flex-1 p-6 overflow-y-auto min-h-[400px]">
              {activeTab === 'personal_info' && (
                <PersonalInfoForm
                  data={sectionsData.personal_info || {}}
                  onChange={(newVal) => handleSectionChange('personal_info', newVal)}
                />
              )}

              {activeTab === 'education' && (
                <EducationForm
                  data={sectionsData.education || { items: [] }}
                  onChange={(newVal) => handleSectionChange('education', newVal)}
                />
              )}

              {activeTab !== 'personal_info' && activeTab !== 'education' && (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <div className="text-3xl">🚧</div>
                  <h4 className="text-sm font-semibold text-slate-300">
                    {ACTIVE_SECTIONS.find((s) => s.id === activeTab)?.label} Form Coming Next
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Form controls for {activeTab} will be added in upcoming steps.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Real-time Live Resume Preview */}
        <div className="w-full md:w-1/2 lg:w-7/12 bg-slate-950 p-4 md:p-8 flex items-start justify-center min-h-[450px] overflow-y-auto">
          <ResumePreview sections={sectionsData} />
        </div>
      </div>
    </div>
  );
}
