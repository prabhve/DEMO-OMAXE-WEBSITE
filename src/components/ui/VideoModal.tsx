import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '../../utils/analytics';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoId,
  title = 'Omaxe Video Presentation',
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      trackEvent(ANALYTICS_EVENTS.VIDEO_PLAY, { videoId, title });
      // Focus the close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);

      // Disable body scroll
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, videoId, title, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-ink/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-ink border border-cream/20 shadow-2xl rounded-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream/10 bg-ink-soft">
          <span className="text-[11px] uppercase tracking-[0.18em] text-gold font-normal truncate max-w-[80%]">
            {title}
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close video player"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-stone hover:text-cream transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Aspect Ratio Video Frame (No sound autoplay) */}
        <div className="relative w-full pb-[56.25%] bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
