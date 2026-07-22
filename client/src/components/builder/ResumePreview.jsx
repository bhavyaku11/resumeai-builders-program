import React from 'react';

export default function ResumePreview({ sections = {} }) {
  const personal = sections.personal_info || {};
  const educationObj = sections.education || { items: [] };
  const educationItems = Array.isArray(educationObj.items) ? educationObj.items : [];

  const hasPersonal = personal.fullName || personal.email || personal.phone || personal.location || personal.summary;
  const hasEducation = educationItems.length > 0 && educationItems.some((i) => i.institution);

  return (
    <div className="w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl p-8 md:p-10 font-sans min-h-[750px] transition-all">
      {!hasPersonal && !hasEducation ? (
        <div className="h-full flex flex-col items-center justify-center py-24 text-slate-400 text-center space-y-3">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">
            📄
          </div>
          <div>
            <h4 className="font-bold text-slate-600">Your Resume Preview</h4>
            <p className="text-xs text-slate-400 mt-1">Start typing in the forms to see your resume come to life.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
              {personal.fullName || 'YOUR NAME'}
            </h1>

            {/* Contact Details Bar */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600 font-medium">
              {personal.email && <span>📧 {personal.email}</span>}
              {personal.phone && <span>📞 {personal.phone}</span>}
              {personal.location && <span>📍 {personal.location}</span>}
              {personal.linkedin && <span>🔗 {personal.linkedin}</span>}
              {personal.github && <span>🌐 {personal.github}</span>}
            </div>

            {/* Professional Summary */}
            {personal.summary && (
              <p className="mt-3 text-xs text-slate-700 leading-relaxed font-normal">
                {personal.summary}
              </p>
            )}
          </div>

          {/* Education Section */}
          {hasEducation && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                Education
              </h2>

              <div className="space-y-3">
                {educationItems.map((edu, idx) => {
                  if (!edu.institution) return null;
                  return (
                    <div key={edu.id || idx} className="text-xs space-y-1">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{edu.institution}</span>
                        <span className="font-medium text-slate-500">
                          {edu.startDate} {edu.startDate || edu.endDate ? '–' : ''}{' '}
                          {edu.current ? 'Present' : edu.endDate}
                        </span>
                      </div>

                      <div className="flex justify-between text-slate-700 italic">
                        <span>
                          {edu.degree} {edu.degree && edu.fieldOfStudy ? 'in' : ''} {edu.fieldOfStudy}
                        </span>
                        {edu.gpa && <span className="not-italic text-slate-600 font-medium">GPA: {edu.gpa}</span>}
                      </div>

                      {edu.coursework && (
                        <p className="text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-600">Coursework:</span> {edu.coursework}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
