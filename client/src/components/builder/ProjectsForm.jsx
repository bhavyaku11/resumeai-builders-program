import React from 'react';
import BulletListEditor from './BulletListEditor';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';

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
      <div className="flex items-center justify-between border-b border-surface-200/80 pb-3">
        <div>
          <h3 className="text-base font-bold font-display text-surface-900">Projects</h3>
          <p className="text-xs text-surface-500">
            Showcase key personal or professional projects and technical accomplishments.
          </p>
        </div>
        <Button size="sm" variant="primary" onClick={handleAdd} leftIcon={<span>+</span>}>
          Add Project
        </Button>
      </div>

      {items.length === 0 ? (
        <Card padding="p-8" className="text-center bg-white/60 border-dashed border-surface-300 space-y-2">
          <p className="text-xs text-surface-500">No project entries added yet.</p>
          <Button size="sm" variant="ghost" onClick={handleAdd}>
            + Add your first project entry
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card
              key={item.id || index}
              padding="p-5"
              className="bg-white border-surface-200 shadow-soft-xs space-y-4 relative"
            >
              {/* Item Header Controls */}
              <div className="flex items-center justify-between border-b border-surface-100 pb-2">
                <Badge variant="secondary" size="sm">
                  Project #{index + 1}
                </Badge>

                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    title="Move Up"
                    className="p-1 text-surface-400 hover:text-surface-800 disabled:opacity-30 text-xs cursor-pointer"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === items.length - 1}
                    title="Move Down"
                    className="p-1 text-surface-400 hover:text-surface-800 disabled:opacity-30 text-xs cursor-pointer"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    title="Delete Entry"
                    className="p-1 text-rose-500 hover:text-rose-700 text-xs ml-2 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    label="Project Name"
                    isRequired
                    value={item.name || ''}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="e.g. AI Resume Builder"
                    error={!item.name?.trim() ? 'Project name required' : ''}
                  />
                </div>

                <Input
                  label="Tech Stack (Comma-separated)"
                  value={item.techStack || ''}
                  onChange={(e) => handleItemChange(index, 'techStack', e.target.value)}
                  placeholder="e.g. React, Node.js, Express, MySQL"
                />

                <Input
                  label="Project / GitHub URL"
                  type="url"
                  value={item.link || ''}
                  onChange={(e) => handleItemChange(index, 'link', e.target.value)}
                  placeholder="https://github.com/user/project"
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Project Overview / Description"
                    value={item.description || ''}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Full-stack AI resume builder with live ATS preview..."
                  />
                </div>
              </div>

              {/* Bullet Points List Editor */}
              <div className="pt-2 border-t border-surface-100">
                <BulletListEditor
                  bullets={item.bullets || []}
                  onChange={(newBullets) => handleItemChange(index, 'bullets', newBullets)}
                  label="Key Features & Highlights"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
