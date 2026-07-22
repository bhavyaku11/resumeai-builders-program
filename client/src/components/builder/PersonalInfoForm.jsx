import React from 'react';

export default function PersonalInfoForm({ data = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-800 pb-3 mb-4">
        <h3 className="text-base font-semibold text-white">Personal Information</h3>
        <p className="text-xs text-slate-400">
          Enter your basic contact details and a professional summary.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Full Name <span className="text-indigo-400">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={data.fullName || ''}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Email Address <span className="text-indigo-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            placeholder="janedoe@example.com"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={data.phone || ''}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={data.location || ''}
            onChange={handleChange}
            placeholder="San Francisco, CA"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/janedoe"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Portfolio / GitHub URL</label>
          <input
            type="url"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            placeholder="github.com/janedoe"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">Professional Summary</label>
        <textarea
          name="summary"
          rows={4}
          value={data.summary || ''}
          onChange={handleChange}
          placeholder="Passionate Full Stack Engineer with 4+ years of experience building scalable web applications..."
          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
        />
      </div>
    </div>
  );
}
