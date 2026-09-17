import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../../data/company';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onOpenEnquiry: (projectTitle?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnquiry }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;
  const slideInterval = 7000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, slideInterval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlide, isPaused, slideCount]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideCount]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      aria-label="Hero Showcase"
      className="relative w-full h-[100svh] min-h-[720px] max-h-[1200px] overflow-hidden bg-ink text-cream select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Crossfade and Subtle Slow Motion */}
      {HERO_SLIDES.map((item, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={item.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1200 ease-luxury ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className={`w-full h-full ${isActive ? 'animate-ken-burns' : ''}`}>
              <img
                src={item.image}
                alt={item.title}
                fetchPriority={index === 0 ? 'high' : 'low'}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Muted luxury scrims */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
          </div>
        );
      })}

      {/* Main Hero Content - Silence and Monumental Typography */}
      <div className="relative z-20 max-w-[1360px] mx-auto h-full px-5 sm:px-8 lg:px-16 flex flex-col justify-end pb-48 sm:pb-40">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <div>
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
              {slide.eyebrow}
            </span>
          </div>

          {/* Headline: h1 at 40px on mobile, 80px on desktop */}
          <h1 className="font-display text-[40px] sm:text-6xl md:text-7xl lg:text-[80px] font-light text-cream leading-[1.05] tracking-[-0.02em]">
            {slide.title}
          </h1>

          {/* Subtitle constrained to 62ch with 1.75 line-height */}
          <p className="text-base text-cream/80 max-w-[62ch] font-light leading-[1.75]">
            {slide.subtitle}
          </p>

          {/* Action Buttons: Crisp, Uncluttered, stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Button
              to={slide.link}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Estate
            </Button>
            <Button
              onClick={() => onOpenEnquiry(slide.title)}
              variant="gold-outline"
              size="md"
            >
              Private Appointment
            </Button>
          </div>
        </div>

        {/* Bottom Bar: Slide Indicators */}
        <div className="absolute bottom-8 sm:bottom-12 inset-x-0 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-4 sm:gap-8">
            {HERO_SLIDES.map((item, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentSlide(idx)}
                  className="group min-h-[44px] min-w-[44px] flex flex-col items-start justify-center gap-2 text-left cursor-pointer transition-opacity"
                  aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                >
                  <span
                    className={`text-[11px] font-mono tracking-[0.18em] transition-colors duration-400 ${
                      isActive ? 'text-gold' : 'text-cream/40 group-hover:text-cream'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div className="w-10 sm:w-16 h-px bg-cream/20 overflow-hidden">
                    <div
                      className={`h-full bg-gold transition-all duration-700 ease-luxury ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-1/3'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
