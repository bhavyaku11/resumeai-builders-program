import React from 'react';
import BulletListEditor from './BulletListEditor';

export default function ExperienceForm({ data = { items: [] }, onChange }) {
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
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
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
          <h3 className="text-base font-semibold text-white">Work Experience</h3>
          <p className="text-xs text-slate-400">
            Detail your professional roles, responsibilities, and achievements.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
        >
          <span>+</span>
          <span>Add Experience</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/60 border border-dashed border-slate-800 rounded-xl space-y-2">
          <p className="text-sm text-slate-400">No work experience entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            + Add your first work experience entry
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
                  Experience #{index + 1}
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

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.company || ''}
                    onChange={(e) => handleItemChange(index, 'company', e.target.value)}
                    placeholder="e.g. Google"
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      !item.company?.trim() ? 'border-amber-500/50' : 'border-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={item.role || ''}
                    onChange={(e) => handleItemChange(index, 'role', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={item.location || ''}
                    onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                    placeholder="e.g. Mountain View, CA"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={item.startDate || ''}
                    onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                    placeholder="e.g. Jan 2022"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">End Date</label>
                  <input
                    type="text"
                    value={item.current ? 'Present' : item.endDate || ''}
                    disabled={item.current}
                    onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                    placeholder="e.g. Present"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id={`exp-current-${index}`}
                    checked={item.current || false}
                    onChange={(e) => handleItemChange(index, 'current', e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`exp-current-${index}`} className="text-xs text-slate-300">
                    I am currently working here
                  </label>
                </div>
              </div>

              {/* Bullet Points List Editor */}
              <div className="pt-2 border-t border-slate-800/60">
                <BulletListEditor
                  bullets={item.bullets || []}
                  onChange={(newBullets) => handleItemChange(index, 'bullets', newBullets)}
                  label="Key Achievements & Responsibilities"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
