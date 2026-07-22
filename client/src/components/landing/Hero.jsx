import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Badge, { Pill } from '../ui/Badge';
import { Card } from '../ui/Card';

const HEADLINE_OPTIONS = [
  {
    id: 1,
    title: 'Craft an ATS-Proof Resume in Minutes with AI',
    sub: 'Transform your work experience into recruiter-ready resumes. Tailor keywords, bypass applicant filters, and land 3x more interviews with intelligent formatting.',
  },
  {
    id: 2,
    title: 'Land 3x More Interviews with Intelligent Resume Optimization',
    sub: 'Stop getting rejected by automated hiring algorithms. ResumeAI formats, tailors, and polishes your bullets into high-impact bullet points recruiters love.',
  },
  {
    id: 3,
    title: 'Turn Raw Career Experience into Executive-Grade Resumes',
    sub: 'Built for engineers, designers, and tech leaders. Auto-save sections, preview ATS rendering in real-time, and export professional documents effortlessly.',
  },
];

export default function Hero() {
  const [selectedHeadline, setSelectedHeadline] = useState(HEADLINE_OPTIONS[0]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-brand-canvas">
      {/* Background CSS Dot-Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4ccff_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2">
              <Badge variant="primary" size="md" dot>
                ✨ AI-Powered Resume Builder v1.0
              </Badge>
            </div>

            {/* Headline Choice Selector Bar */}
            <div className="inline-flex items-center p-1 bg-white/70 border border-surface-200/80 rounded-xl shadow-soft-xs space-x-1 text-[11px] font-medium text-surface-600">
              <span className="px-2 py-0.5 text-surface-400 font-semibold uppercase tracking-wider text-[10px]">
                Headline Variation:
              </span>
              {HEADLINE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedHeadline(opt)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedHeadline.id === opt.id
                      ? 'bg-brand-500 text-white font-bold shadow-soft-xs'
                      : 'hover:bg-surface-100 text-surface-600'
                  }`}
                >
                  Opt #{opt.id}
                </button>
              ))}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-surface-900 tracking-tight leading-[1.12]">
              {selectedHeadline.title.split('AI')[0]}
              {selectedHeadline.title.includes('AI') && (
                <span className="text-gradient-brand">AI</span>
              )}
              {selectedHeadline.title.split('AI')[1]}
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-surface-600 font-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {selectedHeadline.sub}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-soft-md"
                  rightIcon={<span>→</span>}
                >
                  Build Resume with AI
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  leftIcon={<span>🎯</span>}
                >
                  Check ATS Score
                </Button>
              </Link>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-surface-500 font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                <span>100% ATS Ready Layouts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Instant Real-Time Auto-Save</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual CSS/SVG Resume Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-brand-400/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />

            {/* Resume Document Card Mockup */}
            <Card
              padding="p-6 md:p-8"
              className="relative w-full max-w-md bg-white border border-surface-200/90 shadow-soft-xl rounded-2xl transform transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Floating Badge 1: ATS Score */}
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-white border border-emerald-200 text-emerald-800 shadow-soft-md px-3.5 py-1.5 rounded-full flex items-center space-x-2 text-xs font-bold font-display animate-bounce">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>✨ 98% ATS Match</span>
                </div>
              </div>

              {/* Floating Badge 2: Auto-Save */}
              <div className="absolute -bottom-4 -left-4 z-20 hidden sm:block">
                <div className="bg-surface-900 text-white border border-surface-800 shadow-soft-md px-3.5 py-1.5 rounded-full flex items-center space-x-2 text-xs font-medium font-body">
                  <span className="w-2 h-2 rounded-full bg-brand-400" />
                  <span>⚡ Real-Time Auto Save</span>
                </div>
              </div>

              {/* Resume Header Skeleton */}
              <div className="text-center border-b border-surface-100 pb-4 space-y-2">
                <div className="h-6 w-44 bg-surface-900 rounded-md mx-auto" />
                <div className="flex justify-center space-x-3">
                  <div className="h-2.5 w-20 bg-surface-300 rounded" />
                  <div className="h-2.5 w-24 bg-surface-300 rounded" />
                  <div className="h-2.5 w-16 bg-surface-300 rounded" />
                </div>
              </div>

              {/* Resume Body Skeleton */}
              <div className="pt-4 space-y-5 text-left">
                {/* Section 1: Summary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-28 bg-brand-500 rounded font-mono" />
                    <Pill variant="primary" size="sm">
                      AI Enhanced
                    </Pill>
                  </div>
                  <div className="h-2 w-full bg-surface-200 rounded" />
                  <div className="h-2 w-11/12 bg-surface-200 rounded" />
                  <div className="h-2 w-4/5 bg-surface-200 rounded" />
                </div>

                {/* Section 2: Experience */}
                <div className="space-y-2.5">
                  <div className="h-3 w-32 bg-surface-800 rounded" />
                  <div className="flex justify-between items-center">
                    <div className="h-3.5 w-40 bg-surface-700 rounded" />
                    <div className="h-2.5 w-20 bg-surface-300 rounded" />
                  </div>
                  <div className="space-y-1.5 pl-2 border-l-2 border-brand-200">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      <div className="h-2 w-full bg-brand-50 rounded" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      <div className="h-2 w-10/12 bg-surface-200 rounded" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Skills Tags */}
                <div className="space-y-2 pt-1">
                  <div className="h-3 w-24 bg-surface-800 rounded" />
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-semibold rounded-md">
                      React 19
                    </span>
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-semibold rounded-md">
                      Node.js
                    </span>
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-semibold rounded-md">
                      MySQL
                    </span>
                    <span className="px-2 py-0.5 bg-surface-100 text-surface-600 text-[10px] font-semibold rounded-md">
                      TypeScript
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
