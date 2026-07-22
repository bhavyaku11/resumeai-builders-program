import React from 'react';

export default function BulletListEditor({ bullets = [], onChange, label = 'Bullet Points' }) {
  const list = Array.isArray(bullets) ? bullets : [];

  const handleAdd = () => {
    onChange([...list, '']);
  };

  const handleRemove = (index) => {
    const newList = list.filter((_, i) => i !== index);
    onChange(newList);
  };

  const handleChange = (index, value) => {
    const newList = list.map((item, i) => (i === index ? value : item));
    onChange(newList);
  };

  const handleMove = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === list.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newList = [...list];
    const [movedItem] = newList.splice(index, 1);
    newList.splice(targetIndex, 0, movedItem);
    onChange(newList);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-slate-300">{label}</label>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
        >
          <span>+</span>
          <span>Add Bullet</span>
        </button>
      </div>

      {list.length === 0 ? (
        <p className="text-[11px] text-slate-500 italic">No bullet points added. Click "+ Add Bullet" to describe your achievements.</p>
      ) : (
        <div className="space-y-2">
          {list.map((bullet, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-slate-500 text-xs mt-2.5">•</span>
              <textarea
                rows={2}
                value={bullet}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="e.g. Architected scalable microservices reducing API latency by 40%..."
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              />
              <div className="flex flex-col space-y-1 pt-1">
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  title="Move Up"
                  className="text-[10px] text-slate-400 hover:text-white disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === list.length - 1}
                  title="Move Down"
                  className="text-[10px] text-slate-400 hover:text-white disabled:opacity-30"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  title="Delete Bullet"
                  className="text-[10px] text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
