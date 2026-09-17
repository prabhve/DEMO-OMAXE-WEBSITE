import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  aspectRatio?: string;
  label?: string;
  hint?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  onRemove,
  aspectRatio = 'aspect-16/9',
  label = 'Upload Image',
  hint = 'PNG, JPG, WebP up to 10MB',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    
    // Simulate upload progress
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            const blobUrl = URL.createObjectURL(file);
            onChange(blobUrl);
            setUploadProgress(null);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  if (value) {
    return (
      <div className="relative group rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800">
        <div className={`w-full ${aspectRatio} overflow-hidden`}>
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-2.5 py-1 text-xs font-medium text-white bg-neutral-800/80 hover:bg-neutral-800 rounded shadow transition-colors"
          >
            Replace
          </button>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="p-1 text-white bg-rose-600/80 hover:bg-rose-600 rounded shadow transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors text-center ${
        isDragging
          ? 'border-amber-500 bg-amber-50/30 dark:bg-amber-950/20'
          : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-900/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {uploadProgress !== null ? (
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-xs font-medium text-neutral-600 dark:text-neutral-400">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 transition-all duration-150"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mb-2">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{label}</p>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{hint}</p>
        </>
      )}
    </div>
  );
};
