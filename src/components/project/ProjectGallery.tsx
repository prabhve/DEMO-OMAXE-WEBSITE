import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const prevImage = () => {
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Preview Container */}
      <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-ink-soft group">
        <img
          src={images[activeIdx]}
          alt={`${title} - View ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Expand / Lightbox Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          aria-label="View Fullscreen"
          className="absolute top-4 right-4 p-2.5 bg-ink/75 hover:bg-gold text-cream hover:text-ink backdrop-blur-sm rounded-sm transition-colors duration-200 cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Counter Badge */}
        <div className="absolute bottom-4 left-4 bg-ink/80 backdrop-blur-sm px-3 py-1 text-[11px] font-mono tracking-widest text-gold rounded-sm">
          {String(activeIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>

        {/* Left/Right Overlaid Navigation */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none">
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="p-3 bg-ink/60 hover:bg-gold text-cream hover:text-ink backdrop-blur-sm rounded-sm pointer-events-auto transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="p-3 bg-ink/60 hover:bg-gold text-cream hover:text-ink backdrop-blur-sm rounded-sm pointer-events-auto transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-[16/10] rounded-sm overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                activeIdx === idx
                  ? 'border-gold ring-2 ring-gold/30 scale-[1.02]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 p-3 text-cream/70 hover:text-gold transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={images[activeIdx]}
              alt={`${title} Fullscreen`}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-sm shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-2 sm:-left-12 p-3 bg-ink/70 hover:bg-gold text-cream hover:text-ink rounded-sm transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-2 sm:-right-12 p-3 bg-ink/70 hover:bg-gold text-cream hover:text-ink rounded-sm transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
