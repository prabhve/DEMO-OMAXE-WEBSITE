import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VIDEO_TESTIMONIALS } from '../../data/testimonials';
import { VideoModal } from '../ui/VideoModal';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);

  const activeItem = VIDEO_TESTIMONIALS[activeIndex];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % VIDEO_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + VIDEO_TESTIMONIALS.length) % VIDEO_TESTIMONIALS.length);
  };

  return (
    <section
      aria-label="Client Video Testimonials"
      className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16 bg-cream text-ink border-t border-line relative"
    >
      <div className="max-w-[1120px] mx-auto text-center">
        {/* Eyebrow & Section Heading */}
        <div className="space-y-4 mb-12 sm:mb-16">
          <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
            Enduring Relationships
          </span>
          <h2 className="font-display text-[32px] sm:text-4xl md:text-5xl lg:text-[56px] font-light text-ink leading-[1.08] tracking-[-0.02em]">
            Voices of Trust &amp; Legacy
          </h2>
        </div>

        {/* Serene Monumental Quote */}
        <div className="py-4 sm:py-8">
          <blockquote className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[48px] font-light leading-[1.18] tracking-[-0.02em] text-ink max-w-[62ch] mx-auto">
            &ldquo;{activeItem.quote || 'Living at Omaxe has provided our family with unparalleled peace of mind, thoughtful amenities, and lasting pride of ownership.'}&rdquo;
          </blockquote>
        </div>

        {/* Author Details */}
        <div className="mt-10 sm:mt-14 space-y-3">
          <cite className="not-italic block">
            <span className="font-display text-2xl text-ink font-light block">
              {activeItem.name}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-stone mt-2 block font-light">
              {activeItem.descriptor} {activeItem.project ? `· ${activeItem.project}` : ''}
            </span>
          </cite>
        </div>

        {/* Video Watch Action */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() =>
              setSelectedVideo({
                id: activeItem.videoId,
                title: `${activeItem.name} — Video Testimonial`,
              })
            }
            className="min-h-[44px] inline-flex items-center gap-3 px-6 py-3 border border-gold text-ink hover:bg-gold hover:text-ivory text-[11px] uppercase tracking-[0.22em] font-light rounded-none transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-gold hover:fill-ivory" />
            <span>Watch Video Story</span>
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="mt-14 sm:mt-20 flex items-center justify-center gap-8">
          <button
            onClick={prevTestimonial}
            aria-label="Previous testimony"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-3 border border-line hover:border-ink text-ink rounded-none transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            0{activeIndex + 1} / 0{VIDEO_TESTIMONIALS.length}
          </span>

          <button
            onClick={nextTestimonial}
            aria-label="Next testimony"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-3 border border-line hover:border-ink text-ink rounded-none transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* View All Testimonials Link */}
        <div className="mt-10">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-gold hover:text-ink font-light transition-colors"
          >
            <span>View All Video Testimonials</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};
