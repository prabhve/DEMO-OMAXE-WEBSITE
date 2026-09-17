import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search } from 'lucide-react';
import { Modal } from './Modal';

const POPULAR_ICONS = [
  'Sparkles', 'Shield', 'ShieldCheck', 'Compass', 'Waves', 'Bell', 'Film', 'Zap',
  'Wine', 'Plane', 'Home', 'Building2', 'Building', 'Trees', 'Car', 'Phone',
  'Mail', 'MapPin', 'Calendar', 'Clock', 'Award', 'CheckCircle', 'Star',
  'Eye', 'Heart', 'Coffee', 'Wifi', 'Dumbbell', 'Briefcase', 'GraduationCap',
  'Crosshair', 'Flame', 'Sun', 'Moon', 'Droplet', 'Layers', 'Activity',
];

interface IconPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedIcon,
}) => {
  const [search, setSearch] = useState('');

  const filtered = POPULAR_ICONS.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Icon" maxWidth="md">
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md focus:ring-amber-500"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto p-1">
          {filtered.map((name) => {
            const IconComponent = (LucideIcons as any)[name] || LucideIcons.Sparkles;
            const isSelected = selectedIcon === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => {
                  onSelect(name);
                  onClose();
                }}
                title={name}
                className={`flex flex-col items-center justify-center p-2.5 rounded border transition-colors ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-600'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-[10px] truncate max-w-full">{name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
