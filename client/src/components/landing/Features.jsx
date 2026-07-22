import React from 'react';
import Badge from '../ui/Badge';
import { Card } from '../ui/Card';

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI Bullet Enhancer',
    description:
      'Turn basic job descriptions into high-impact bullet points enriched with strong action verbs and quantifiable metrics.',
  },
  {
    icon: '🛡️',
    title: 'ATS Parser Compatibility',
    description:
      'Guaranteed single-column, recruiter-friendly layouts without tables or complex graphics blocking ATS extraction.',
  },
  {
    icon: '🎯',
    title: 'Job Description Matching',
    description:
      'Target specific roles by matching missing technical keywords directly against your targeted job descriptions.',
  },
  {
    icon: '📄',
    title: 'Real-Time Live Preview',
    description:
      'See your formatted A4 resume document update instantly on the side as you edit personal info, experience, and skills.',
  },
  {
    icon: '⚡',
    title: 'Automated Cloud Auto-Save',
    description:
      '1-second debounced auto-saver pushes every edit safely to our cloud MySQL database so you never lose your progress.',
  },
  {
    icon: '⚡',
    title: 'Categorized Skill Tagging',
    description:
      'Group your technical competencies into clean categories like Languages, Tools, and Frameworks with custom tag pills.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-brand-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="primary" size="md" dot>
            Core Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-surface-900 tracking-tight">
            Engineered for Job Search Success
          </h2>
          <p className="text-sm sm:text-base text-surface-600 font-body leading-relaxed">
            Everything you need to craft, optimize, and manage professional ATS-friendly resumes.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat) => (
            <Card
              key={feat.title}
              hoverable
              padding="p-6"
              className="space-y-3 bg-white/90 border-surface-200/80 shadow-soft-sm hover:shadow-soft-md"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/60 flex items-center justify-center text-xl shadow-soft-xs">
                {feat.icon}
              </div>

              <h3 className="text-base font-bold font-display text-surface-900">
                {feat.title}
              </h3>

              <p className="text-xs text-surface-600 font-body leading-relaxed">
                {feat.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
