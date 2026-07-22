import React from 'react';
import BulletListEditor from './BulletListEditor';

export default function ProjectsForm({ data = { items: [] }, onChange }) {
  const items = Array.isArray(data.items) ? data.items : [];

  const updateItems = (newItems) => {
    onChange({
      ...data,
      items: newItems,
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      techStack: '',
      link: '',
      bullets: [''],
    };
    updateItems([...items, newItem]);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  const handleMove = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newItems = [...items];
    const [movedItem] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, movedItem);
    updateItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateItems(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white">Projects</h3>
          <p className="text-xs text-slate-400">
            Showcase key personal or professional projects and technical accomplishments.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
        >
          <span>+</span>
          <span>Add Project</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/60 border border-dashed border-slate-800 rounded-xl space-y-2">
          <p className="text-sm text-slate-400">No project entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            + Add your first project entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-4 relative group"
            >
              {/* Item Header Controls */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Project #{index + 1}
                </span>

                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    title="Move Up"
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === items.length - 1}
                    title="Move Down"
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    title="Delete Entry"
                    className="p-1 text-red-400 hover:text-red-300 text-xs ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Project Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.name || ''}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="e.g. AI Resume Builder"
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      !item.name?.trim() ? 'border-amber-500/50' : 'border-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tech Stack (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={item.techStack || ''}
                    onChange={(e) => handleItemChange(index, 'techStack', e.target.value)}
                    placeholder="e.g. React, Node.js, Express, MySQL"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Project / GitHub URL
                  </label>
                  <input
                    type="url"
                    value={item.link || ''}
                    onChange={(e) => handleItemChange(index, 'link', e.target.value)}
                    placeholder="https://github.com/user/project"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Project Overview / Description
                  </label>
                  <input
                    type="text"
                    value={item.description || ''}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Full-stack AI resume builder with live ATS preview and automated formatting..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Bullet Points List Editor */}
              <div className="pt-2 border-t border-slate-800/60">
                <BulletListEditor
                  bullets={item.bullets || []}
                  onChange={(newBullets) => handleItemChange(index, 'bullets', newBullets)}
                  label="Key Features & Highlights"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
