import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function BulletListEditor({ bullets = [''], onChange, label = 'Bullet Points' }) {
  const handleBulletChange = (index, value) => {
    const newBullets = [...bullets];
    newBullets[index] = value;
    onChange(newBullets);
  };

  const handleAddBullet = () => {
    onChange([...bullets, '']);
  };

  const handleRemoveBullet = (index) => {
    if (bullets.length === 1) {
      onChange(['']);
      return;
    }
    const newBullets = bullets.filter((_, i) => i !== index);
    onChange(newBullets);
  };

  const handleMoveBullet = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === bullets.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newBullets = [...bullets];
    const [movedBullet] = newBullets.splice(index, 1);
    newBullets.splice(targetIndex, 0, movedBullet);
    onChange(newBullets);
  };

  return (
    <div className="space-y-3 font-body">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-surface-700 uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={handleAddBullet}
          className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center space-x-1 cursor-pointer"
        >
          <span>+</span>
          <span>Add Bullet Point</span>
        </button>
      </div>

      <div className="space-y-2">
        {bullets.map((bullet, index) => (
          <div key={index} className="flex items-start space-x-2 group">
            <span className="text-surface-400 text-xs mt-2.5 shrink-0">•</span>

            <div className="flex-1">
              <Input
                value={bullet}
                onChange={(e) => handleBulletChange(index, e.target.value)}
                placeholder="Describe key achievement, technology used, or impact..."
              />
            </div>

            <div className="flex items-center space-x-1 pt-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleMoveBullet(index, 'up')}
                disabled={index === 0}
                title="Move Up"
                className="p-1 text-surface-400 hover:text-surface-800 disabled:opacity-30 text-xs cursor-pointer"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => handleMoveBullet(index, 'down')}
                disabled={index === bullets.length - 1}
                title="Move Down"
                className="p-1 text-surface-400 hover:text-surface-800 disabled:opacity-30 text-xs cursor-pointer"
              >
                ▼
              </button>
              <button
                type="button"
                onClick={() => handleRemoveBullet(index)}
                title="Delete Bullet"
                className="p-1 text-rose-500 hover:text-rose-700 text-xs ml-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
