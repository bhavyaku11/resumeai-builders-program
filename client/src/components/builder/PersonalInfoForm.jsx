import React from 'react';
import Input, { TextArea } from '../ui/Input';

export default function PersonalInfoForm({ data = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-surface-200/80 pb-3">
        <h3 className="text-base font-bold font-display text-surface-900">Personal Information</h3>
        <p className="text-xs text-surface-500">
          Enter your basic contact details and a professional summary.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="fullName"
          isRequired
          placeholder="e.g. Jane Doe"
          value={data.fullName || ''}
          onChange={handleChange}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          isRequired
          placeholder="janedoe@example.com"
          value={data.email || ''}
          onChange={handleChange}
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="+1 (555) 000-0000"
          value={data.phone || ''}
          onChange={handleChange}
        />

        <Input
          label="Location"
          name="location"
          placeholder="San Francisco, CA"
          value={data.location || ''}
          onChange={handleChange}
        />

        <Input
          label="LinkedIn URL"
          type="url"
          name="linkedin"
          placeholder="linkedin.com/in/janedoe"
          value={data.linkedin || ''}
          onChange={handleChange}
        />

        <Input
          label="Portfolio / GitHub URL"
          type="url"
          name="github"
          placeholder="github.com/janedoe"
          value={data.github || ''}
          onChange={handleChange}
        />
      </div>

      <div>
        <TextArea
          label="Professional Summary"
          name="summary"
          rows={4}
          placeholder="Passionate Full Stack Engineer with 4+ years of experience building scalable web applications..."
          value={data.summary || ''}
          onChange={handleChange}
          helperText="Keep summary between 2-4 sentences highlighting core tech stack."
        />
      </div>
    </div>
  );
}
