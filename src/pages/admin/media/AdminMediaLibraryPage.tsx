import React, { useState, useEffect } from 'react';
import {
  Upload,
  Search,
  Filter,
  Grid,
  List as ListIcon,
  FolderPlus,
  Trash2,
  Download,
  Copy,
  Tag,
  CheckCircle2,
  Folder,
  Image as ImageIcon,
  Film,
  FileText,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { MediaAsset } from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { Modal } from '../../../components/admin/ui/Modal';
import { ConfirmDialog } from '../../../components/admin/ui/ConfirmDialog';
import { Input, FormField } from '../../../components/admin/ui/FormField';

export const AdminMediaLibraryPage: React.FC = () => {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Image editing modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const addToast = useAdminStore((s) => s.addToast);

  const loadMedia = async () => {
    const list = await api.media.list({
      folder: activeFolder !== 'ALL' ? activeFolder : undefined,
      search: search || undefined,
    });
    const folderList = (await api.media.getFolders?.()) || ['General', 'Exterior', 'Interior', 'Amenities'];
    setMedia(list.data || []);
    setFolders(folderList);
  };

  useEffect(() => {
    loadMedia();
  }, [activeFolder, search]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const blobUrl = URL.createObjectURL(file);
        await api.media.upload(file, {
          title: file.name.split('.')[0],
          folder: activeFolder !== 'ALL' ? activeFolder : 'General',
          tags: ['Upload', '2026'],
        });
      }
      addToast({
        title: 'Upload Complete',
        description: `Successfully uploaded ${files.length} asset(s).`,
        type: 'success',
      });
      loadMedia();
    } catch (err: any) {
      addToast({ title: 'Upload Failed', description: err.message, type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const idsToDelete = selectedAsset ? [selectedAsset.id] : selectedIds;
      await Promise.all(idsToDelete.map((id) => api.media.delete(id)));
      addToast({
        title: 'Assets Deleted',
        description: `Removed ${idsToDelete.length} item(s) from storage.`,
        type: 'success',
      });
      setSelectedAsset(null);
      setSelectedIds([]);
      loadMedia();
    } catch (err: any) {
      addToast({ title: 'Delete Failed', description: err.message, type: 'error' });
    }
  };

  const copyUrlToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    addToast({
      title: 'Link Copied',
      description: 'Asset CDN URL copied to clipboard.',
      type: 'info',
    });
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    setFolders((prev) => [...prev, newFolderName.trim()]);
    setActiveFolder(newFolderName.trim());
    setNewFolderName('');
    setShowFolderModal(false);
    addToast({ title: 'Folder Created', description: `Created folder "${newFolderName}"`, type: 'success' });
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Digital Asset & Media Hub
          </h1>
          <p className="text-xs text-neutral-500">
            Organize high-resolution architectural photography, blueprints, brochures, and video assets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFolderModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 rounded-md shadow-2xs"
          >
            <FolderPlus className="w-3.5 h-3.5 text-amber-600" />
            <span>New Folder</span>
          </button>

          <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#A8823C] hover:bg-[#8e6d2f] rounded-md transition-colors shadow-2xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Uploading...' : 'Upload Files'}</span>
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*,video/*,application/pdf"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </label>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column: Folder Navigation */}
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Directories
          </h3>

          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveFolder('ALL')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                activeFolder === 'ALL'
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-[#A8823C] font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span>All Assets</span>
              </div>
              <span className="text-[10px] text-neutral-400">{media.length}</span>
            </button>

            {folders.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFolder(f)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                  activeFolder === f
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-[#A8823C] font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-amber-600" />
                  <span className="truncate">{f}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center/Right Columns: Media Grid & Details Drawer */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search & View Toggle Bar */}
          <div className="flex items-center justify-between gap-3 bg-white dark:bg-neutral-900 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assets by file name, tag, or title..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md focus:ring-1 focus:ring-[#A8823C]"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${
                  viewMode === 'grid'
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-[#A8823C]'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${
                  viewMode === 'list'
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-[#A8823C]'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Media Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {media.map((item) => {
                const isSelected = selectedAsset?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAsset(item)}
                    className={`group relative rounded-lg overflow-hidden border cursor-pointer aspect-4/3 transition-all ${
                      isSelected
                        ? 'border-[#A8823C] ring-2 ring-amber-500/50 shadow-md'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.altText || item.fileName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent p-2.5 text-white">
                      <p className="text-xs font-medium truncate">{item.title || item.fileName}</p>
                      <p className="text-[10px] text-neutral-300">
                        {item.dimensions?.width}x{item.dimensions?.height} ·{' '}
                        {(item.sizeBytes / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800">
              {media.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedAsset(item)}
                  className="flex items-center justify-between p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.url} alt="" className="w-10 h-10 object-cover rounded shrink-0" />
                    <div className="truncate">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                        {item.title || item.fileName}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {item.folder} · {(item.sizeBytes / 1024 / 1024).toFixed(1)} MB · {item.mimeType}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrlToClipboard(item.url);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Asset Inspection & Manipulation Modal */}
      {selectedAsset && (
        <Modal
          isOpen={Boolean(selectedAsset)}
          onClose={() => setSelectedAsset(null)}
          title={selectedAsset.title || selectedAsset.fileName}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyUrlToClipboard(selectedAsset.url)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 rounded"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy CDN URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#A8823C] hover:bg-[#8e6d2f] rounded"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Adjust Filters</span>
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 flex items-center justify-center max-h-80">
              <img
                src={selectedAsset.url}
                alt={selectedAsset.altText || ''}
                className="max-h-80 w-auto object-contain"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-neutral-400 block">File Name:</span>
                <span className="font-mono text-neutral-800 dark:text-neutral-200">{selectedAsset.fileName}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Dimensions:</span>
                <span>{selectedAsset.dimensions?.width} × {selectedAsset.dimensions?.height} px</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Folder:</span>
                <span>{selectedAsset.folder}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">File Size:</span>
                <span>{(selectedAsset.sizeBytes / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* New Folder Modal */}
      <Modal
        isOpen={showFolderModal}
        onClose={() => setShowFolderModal(false)}
        title="Create New Folder"
        maxWidth="sm"
        footer={
          <button
            type="button"
            onClick={handleCreateFolder}
            className="px-4 py-1.5 text-xs font-medium text-white bg-[#A8823C] rounded"
          >
            Create
          </button>
        }
      >
        <FormField label="Folder Name" required>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="e.g. Commercial Brochures"
            autoFocus
          />
        </FormField>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteSelected}
        title="Delete Media File"
        description="Are you sure you want to delete this media asset? Any pages or projects currently embedding this URL will encounter a missing asset."
        confirmText="Confirm Delete"
      />
    </div>
  );
};
