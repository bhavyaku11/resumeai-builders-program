import React from 'react';

export default function EducationForm({ data = { items: [] }, onChange }) {
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
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      coursework: '',
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
          <h3 className="text-base font-semibold text-white">Education</h3>
          <p className="text-xs text-slate-400">
            Add degrees, certifications, and academic background.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
        >
          <span>+</span>
          <span>Add Education</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/60 border border-dashed border-slate-800 rounded-xl space-y-2">
          <p className="text-sm text-slate-400">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            + Add your first education entry
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
                  Education #{index + 1}
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
                    Institution Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.institution || ''}
                    onChange={(e) => handleItemChange(index, 'institution', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      !item.institution?.trim() ? 'border-amber-500/50' : 'border-slate-800'
                    }`}
                  />
                  {!item.institution?.trim() && (
                    <span className="text-[10px] text-amber-400 mt-1 block">
                      Institution name required to save entry
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Degree</label>
                  <input
                    type="text"
                    value={item.degree || ''}
                    onChange={(e) => handleItemChange(index, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Field of Study</label>
                  <input
                    type="text"
                    value={item.fieldOfStudy || ''}
                    onChange={(e) => handleItemChange(index, 'fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={item.startDate || ''}
                    onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                    placeholder="e.g. Sep 2020"
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
                    placeholder="e.g. May 2024"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={item.current || false}
                    onChange={(e) => handleItemChange(index, 'current', e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`current-${index}`} className="text-xs text-slate-300">
                    I am currently studying here
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    GPA / Score (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.gpa || ''}
                    onChange={(e) => handleItemChange(index, 'gpa', e.target.value)}
                    placeholder="e.g. 3.9 / 4.0"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Relevant Coursework (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.coursework || ''}
                    onChange={(e) => handleItemChange(index, 'coursework', e.target.value)}
                    placeholder="e.g. Data Structures, Algorithms"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
