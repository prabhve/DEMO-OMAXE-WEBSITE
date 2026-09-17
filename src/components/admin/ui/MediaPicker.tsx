import React, { useState } from 'react';
import { Image as ImageIcon, Search, Check, Upload, Folder, X } from 'lucide-react';
import { Modal } from './Modal';
import { SEED_MEDIA } from '../../../lib/api/seed-data';
import { MediaAsset } from '../../../lib/api/types';

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, asset?: MediaAsset) => void;
  title?: string;
  selectedUrl?: string;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Media Asset',
  selectedUrl,
}) => {
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  const filtered = SEED_MEDIA.filter(
    (m) =>
      m.fileName.toLowerCase().includes(search.toLowerCase()) ||
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleConfirm = () => {
    if (selectedAsset) {
      onSelect(selectedAsset.url, selectedAsset);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="4xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedAsset}
            onClick={handleConfirm}
            className="px-4 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-40 rounded"
          >
            Choose Image
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Search & Filter Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets by file name, tag or title..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors">
            <Upload className="w-3.5 h-3.5 text-amber-600" />
            <span>Upload New</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const blobUrl = URL.createObjectURL(file);
                  onSelect(blobUrl);
                  onClose();
                }
              }}
            />
          </label>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto p-1">
          {filtered.map((item) => {
            const isChosen = selectedAsset?.id === item.id || (!selectedAsset && selectedUrl === item.url);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedAsset(item)}
                className={`group relative rounded-md overflow-hidden border cursor-pointer aspect-4/3 transition-all ${
                  isChosen
                    ? 'border-amber-600 ring-2 ring-amber-500/50'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                <img
                  src={item.url}
                  alt={item.altText || item.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
                  <p className="text-[11px] font-medium truncate">{item.title || item.fileName}</p>
                  <p className="text-[10px] text-neutral-300">{(item.sizeBytes / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                {isChosen && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-amber-600 rounded-full flex items-center justify-center text-white shadow">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
