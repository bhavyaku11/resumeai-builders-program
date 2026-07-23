import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

/* ─── 3 ORIGINAL headline options ─────────────────────────────────────────
   The highlighted phrase (shown in violet) is marked with ||...||
   so the render function can split and colorise it cleanly.               */
const HEADLINES = [
  {
    id: 1,
    // Highlighted phrase → "ATS-Optimized"
    before: 'Build an ',
    highlight: 'ATS-Optimized',
    after: ' Resume in Minutes — Powered by AI',
    sub: 'Write your experience once. ResumeAI structures it into a clean, recruiter-ready document that gets past automated screening filters and into human hands.',
  },
  {
    id: 2,
    // Highlighted phrase → "AI That Writes"
    before: '',
    highlight: 'AI That Writes',
    after: ' Your Resume the Way Recruiters Want to Read It',
    sub: 'Stop second-guessing bullet points and formatting. Our AI turns your raw career history into a polished, role-targeted resume ready to submit today.',
  },
  {
    id: 3,
    // Highlighted phrase → "Land the Interview,"
    before: '',
    highlight: 'Land the Interview,',
    after: ' Not the Rejection — AI-Built, ATS-Ready Resumes',
    sub: 'Every section is auto-saved, every keyword is optimised, and every layout is tested for ATS compatibility — so you can focus on the job, not the document.',
  },
];

/* ─── Decorative dot-grid SVG ────────────────────────────────────────── */
function DotGrid({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute pointer-events-none select-none ${className}`}
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 28 + 14}
            cy={row * 28 + 14}
            r="2"
            fill="#6D5EF0"
            fillOpacity="0.18"
          />
        ))
      )}
    </svg>
  );
}

/* ─── Resume card mockup (CSS skeleton) ──────────────────────────────── */
function ResumeCard({ className = '', style = {} }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-surface-200/90 shadow-soft-xl overflow-hidden ${className}`}
      style={style}
    >
      {/* Card top accent strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 to-brand-400" />

      <div className="px-5 py-5 space-y-4">
        {/* Header: name + contact line */}
        <div className="space-y-1.5 pb-3.5 border-b border-surface-100">
          <div className="h-4 w-36 bg-surface-900 rounded-md" />
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-2 w-20 bg-surface-300 rounded" />
            <span className="w-1 h-1 rounded-full bg-surface-300" />
            <div className="h-2 w-24 bg-surface-300 rounded" />
            <span className="w-1 h-1 rounded-full bg-surface-300" />
            <div className="h-2 w-16 bg-surface-300 rounded" />
          </div>
        </div>

        {/* Section: Summary */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-20 bg-brand-600 rounded" />
            <div className="flex-1 h-px bg-surface-200" />
            {/* "AI Enhanced" chip */}
            <span className="px-1.5 py-0.5 bg-brand-50 text-brand-600 border border-brand-200 text-[9px] font-bold rounded-md tracking-wide">
              AI
            </span>
          </div>
          <div className="h-1.5 w-full bg-surface-200 rounded" />
          <div className="h-1.5 w-11/12 bg-surface-200 rounded" />
          <div className="h-1.5 w-4/5 bg-surface-200 rounded" />
        </div>

        {/* Section: Experience */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-surface-800 rounded" />
            <div className="flex-1 h-px bg-surface-200" />
          </div>
          <div className="flex justify-between items-baseline">
            <div className="h-2.5 w-32 bg-surface-700 rounded" />
            <div className="h-1.5 w-16 bg-surface-300 rounded" />
          </div>
          <div className="pl-2.5 border-l-2 border-brand-200 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
              <div className="h-1.5 w-full bg-brand-50 rounded" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
              <div className="h-1.5 w-10/12 bg-surface-200 rounded" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
              <div className="h-1.5 w-9/12 bg-surface-200 rounded" />
            </div>
          </div>
        </div>

        {/* Section: Skills */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-16 bg-surface-800 rounded" />
            <div className="flex-1 h-px bg-surface-200" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'Node.js', 'SQL', 'TypeScript', 'Git'].map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200/80 text-[9px] font-semibold rounded-md"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Hero Component ────────────────────────────────────────────── */
export default function Hero() {
  const [active, setActive] = useState(HEADLINES[0]);

  return (
    <section className="relative hero-bg pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">

      {/* ── Subtle full-section dot texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#6D5EF0 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Soft violet orbs for depth ─────────────── */}
      <div className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-brand-200/25 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-[380px] h-[380px] rounded-full bg-brand-100/30 blur-[64px] pointer-events-none" />

      {/* ── Content wrapper ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">

          {/* ══════════════════════════════════════════
              LEFT COLUMN — Copy & CTAs
          ══════════════════════════════════════════ */}
          <div className="space-y-7 text-center lg:text-left">

            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 shadow-soft-xs">
              <span className="px-2 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-black font-display tracking-wide uppercase leading-none">
                New
              </span>
              <span className="text-[12px] font-semibold text-brand-700 tracking-tight">
                AI-Powered Resume Builder
              </span>
            </div>

            {/* Headline — 3 options selector */}
            <div className="space-y-4">
              <h1 className="text-[40px] sm:text-[52px] lg:text-[58px] font-extrabold font-display text-surface-900 tracking-[-0.03em] leading-[1.08]">
                {active.before}
                <span className="text-gradient-brand">{active.highlight}</span>
                {active.after}
              </h1>

              {/* Variation pills */}
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <span className="text-[10px] font-semibold text-surface-400 uppercase tracking-widest mr-1">
                  Headline:
                </span>
                {HEADLINES.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActive(h)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-150 ${
                      active.id === h.id
                        ? 'bg-brand-500 text-white shadow-soft-xs'
                        : 'bg-white/80 text-surface-500 border border-surface-200 hover:border-brand-300 hover:text-brand-600'
                    }`}
                  >
                    {h.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Supporting paragraph */}
            <p className="text-[15px] sm:text-base text-surface-500 font-body leading-[1.75] max-w-xl mx-auto lg:mx-0">
              {active.sub}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-soft-md px-7"
                  rightIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                >
                  Build Resume with AI
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-7"
                  leftIcon={
                    <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  Check Resume Score
                </Button>
              </Link>
            </div>

            {/* Trust micro-badges */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-[12px] font-medium text-surface-500">
              {[
                { dot: 'bg-emerald-400', text: 'Free to start' },
                { dot: 'bg-brand-500', text: 'ATS-compatible layouts' },
                { dot: 'bg-brand-400', text: 'Real-time auto-save' },
              ].map(({ dot, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              RIGHT COLUMN — Layered resume mockup
          ══════════════════════════════════════════ */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Dot-grid decoration — behind both cards */}
            <DotGrid className="bottom-0 right-0 translate-x-6 translate-y-6 z-0" />

            {/* ── Back card (offset, rotated slightly) ─ */}
            <ResumeCard
              className="absolute top-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-[300px] opacity-80 z-10"
              style={{ transform: 'rotate(3deg) translateY(20px) scale(0.92)' }}
            />

            {/* ── Front card (main, centered) ────────── */}
            <div className="relative z-20 w-[300px] lg:w-[320px]">
              <ResumeCard style={{ transform: 'rotate(-1.5deg)' }} />

              {/* Floating badge: ATS score — top-right */}
              <div className="absolute -top-4 -right-5 z-30">
                <div className="bg-white border border-emerald-200/90 text-emerald-700 shadow-soft-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold font-display whitespace-nowrap">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
                  </span>
                  94% ATS Match
                </div>
              </div>

              {/* Floating badge: auto-save — bottom-left */}
              <div className="absolute -bottom-4 -left-5 z-30 hidden sm:flex">
                <div className="bg-surface-900 text-white shadow-soft-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-medium font-body whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                  ⚡ Saved automatically
                </div>
              </div>
            </div>

            {/* ── Floating rocket icon — top-right of visual area ── */}
            <div
              className="animate-float absolute -top-8 right-0 lg:-right-4 z-30 text-3xl pointer-events-none"
              aria-hidden="true"
            >
              🚀
            </div>

            {/* Ambient glow behind all cards */}
            <div className="absolute inset-4 bg-brand-300/20 rounded-3xl blur-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
