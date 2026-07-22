import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 flex items-center justify-center text-2xl mx-auto">
              💥
            </div>
            <h2 className="text-xl font-bold text-white">Something Went Wrong</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              An unexpected application error occurred. Don't worry, your saved resume data is safe in the database.
            </p>

            <div className="pt-2 flex justify-center space-x-3">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Reload Application
              </button>
              <a
                href="/dashboard"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-600"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
