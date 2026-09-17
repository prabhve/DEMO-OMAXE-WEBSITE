import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../ui/ProjectCard';

export const SignatureProjects: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Curated 3 flagship masterpieces to cut visual density and elevate luxury
  const signatureList = PROJECTS.slice(0, 3);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      aria-label="Signature Developments"
      className="py-56 sm:py-72 lg:py-80 bg-cream text-ink relative"
    >
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16">
        {/* Editorial Heading and Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <SectionHeading
            eyebrow="Architectural Landmarks"
            title="Signature Developments"
          />

          {/* Minimalist Prev/Next controls */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous signature project"
              className="p-4 border border-line hover:border-ink text-ink rounded-none transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next signature project"
              className="p-4 border border-line hover:border-ink text-ink rounded-none transition-all duration-300 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spacious Masterpiece Row */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 overflow-x-auto luxury-scrollbar pb-4"
        >
          {signatureList.map((project) => (
            <div key={project.id} className="w-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
