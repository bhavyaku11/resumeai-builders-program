import React, { useState } from 'react';

export default function SkillsForm({ data = { categories: [] }, onChange }) {
  const categories = Array.isArray(data.categories) ? data.categories : [];
  const [newSkillInput, setNewSkillInput] = useState({});

  const updateCategories = (newCategories) => {
    onChange({
      ...data,
      categories: newCategories,
    });
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: 'New Skill Category',
      skills: [],
    };
    updateCategories([...categories, newCategory]);
  };

  const handleRemoveCategory = (catIndex) => {
    const newCategories = categories.filter((_, i) => i !== catIndex);
    updateCategories(newCategories);
  };

  const handleCategoryNameChange = (catIndex, newName) => {
    const newCategories = categories.map((cat, i) => {
      if (i === catIndex) {
        return { ...cat, name: newName };
      }
      return cat;
    });
    updateCategories(newCategories);
  };

  const handleAddSkill = (catIndex) => {
    const text = (newSkillInput[catIndex] || '').trim();
    if (!text) return;

    const newCategories = categories.map((cat, i) => {
      if (i === catIndex) {
        // Prevent exact duplicates in the same category
        if (cat.skills.includes(text)) return cat;
        return { ...cat, skills: [...cat.skills, text] };
      }
      return cat;
    });

    updateCategories(newCategories);
    setNewSkillInput((prev) => ({ ...prev, [catIndex]: '' }));
  };

  const handleRemoveSkill = (catIndex, skillIndex) => {
    const newCategories = categories.map((cat, i) => {
      if (i === catIndex) {
        const newSkills = cat.skills.filter((_, sI) => sI !== skillIndex);
        return { ...cat, skills: newSkills };
      }
      return cat;
    });
    updateCategories(newCategories);
  };

  const handleKeyDown = (e, catIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(catIndex);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white">Skills</h3>
          <p className="text-xs text-slate-400">
            Organize your technical, domain, and soft skills into categorized groups.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1 shadow-sm"
        >
          <span>+</span>
          <span>Add Category</span>
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/60 border border-dashed border-slate-800 rounded-xl space-y-2">
          <p className="text-sm text-slate-400">No skill categories added yet.</p>
          <button
            type="button"
            onClick={handleAddCategory}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            + Add your first skill category
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat, catIndex) => (
            <div
              key={cat.id || catIndex}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) => handleCategoryNameChange(catIndex, e.target.value)}
                  placeholder="Category Name (e.g. Technical Skills)"
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveCategory(catIndex)}
                  title="Delete Category"
                  className="p-1 text-red-400 hover:text-red-300 text-xs font-medium"
                >
                  ✕
                </button>
              </div>

              {/* Tag List */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills &&
                  cat.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-200"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(catIndex, skillIndex)}
                        className="text-slate-400 hover:text-red-400 ml-1 font-bold text-[10px]"
                      >
                        ×
                      </button>
                    </span>
                  ))}
              </div>

              {/* Add Skill Tag Input */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  value={newSkillInput[catIndex] || ''}
                  onChange={(e) =>
                    setNewSkillInput({ ...newSkillInput, [catIndex]: e.target.value })
                  }
                  onKeyDown={(e) => handleKeyDown(e, catIndex)}
                  placeholder="Type a skill and press Enter..."
                  className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(catIndex)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
