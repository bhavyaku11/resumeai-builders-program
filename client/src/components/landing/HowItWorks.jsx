import React from 'react';
import Badge from '../ui/Badge';
import { Card } from '../ui/Card';

const STEPS = [
  {
    step: '01',
    icon: '📝',
    title: 'Build Your Structured Resume',
    description:
      'Enter your work experience, education, projects, and skills into our intuitive form editor with instant 1-second auto-save persistence.',
    tag: 'Step 1',
  },
  {
    step: '02',
    icon: '⚡',
    title: 'Get AI Feedback & ATS Score',
    description:
      'Our intelligent AI analyzes your bullet points, enhances action verbs, and verifies ATS parser compatibility in real time.',
    tag: 'Step 2',
  },
  {
    step: '03',
    icon: '🎯',
    title: 'Match Job Description & Export',
    description:
      'Tailor your resume keywords to match specific job postings and export a recruiter-ready single-column ATS document.',
    tag: 'Step 3',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-surface-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="primary" size="md" dot>
            Three Simple Steps
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-surface-900 tracking-tight">
            How HireSetu Works
          </h2>
          <p className="text-sm sm:text-base text-surface-600 font-body leading-relaxed">
            From raw career background to ATS-optimized resume in minutes with our streamlined workflow.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((item, idx) => (
            <Card
              key={item.step}
              hoverable
              padding="p-8"
              className="relative space-y-4 bg-surface-50/50 border-surface-200/80 hover:border-brand-300"
            >
              {/* Step Badge & Icon */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200/60 flex items-center justify-center text-2xl shadow-soft-xs">
                  {item.icon}
                </div>
                <span className="text-3xl font-extrabold font-display text-brand-300 opacity-60">
                  {item.step}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-surface-900">
                  {item.title}
                </h3>
                <p className="text-xs text-surface-600 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Connector line indicator for desktop */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-brand-300 font-bold text-xl">
                  →
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
