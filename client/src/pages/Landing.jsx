import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-50 font-body text-surface-900 selection:bg-brand-500/20 selection:text-brand-700">
      {/* Header Bar */}
      <Header />

      {/* Hero Section */}
      <main>
        <Hero />
      </main>
    </div>
  );
}
