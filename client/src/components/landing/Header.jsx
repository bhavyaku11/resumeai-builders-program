import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-surface-200/80 shadow-soft-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Wordmark */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-extrabold font-display text-xl shadow-soft-sm group-hover:scale-105 transition-transform">
            R
          </div>
          <span className="text-xl font-extrabold font-display tracking-tight text-surface-900">
            Resume<span className="text-brand-500">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-xs font-semibold text-surface-600 hover:text-brand-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#templates"
            className="text-xs font-semibold text-surface-600 hover:text-brand-600 transition-colors"
          >
            Templates
          </a>
          <a
            href="#pricing"
            className="text-xs font-semibold text-surface-600 hover:text-brand-600 transition-colors"
          >
            Pricing
          </a>
          <Link
            to="/style-guide"
            className="text-xs font-semibold text-surface-400 hover:text-brand-600 transition-colors"
          >
            Design System
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-surface-600 hover:text-surface-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-surface-200 px-4 pt-3 pb-6 space-y-3 shadow-soft-md">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-surface-700 py-2 border-b border-surface-100"
          >
            Features
          </a>
          <a
            href="#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-surface-700 py-2 border-b border-surface-100"
          >
            Templates
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-surface-700 py-2 border-b border-surface-100"
          >
            Pricing
          </a>
          <div className="pt-2 flex flex-col space-y-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
