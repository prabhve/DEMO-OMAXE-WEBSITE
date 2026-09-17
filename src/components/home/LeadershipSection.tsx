import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LEADERSHIP } from '../../data/company';
import { SectionHeading } from '../ui/SectionHeading';

export const LeadershipSection: React.FC = () => {
  return (
    <section
      aria-label="Leadership Team"
      className="py-56 sm:py-72 lg:py-80 bg-cream text-ink relative"
    >
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <SectionHeading
            eyebrow="Stewardship"
            title="Executive Leadership"
          />
          <Link to="/about-us/leadership-team" className="link-tertiary text-[11px] uppercase tracking-[0.18em] shrink-0 text-gold">
            <span>The Full Board</span>
            <ArrowRight className="w-3 h-3 text-gold" />
          </Link>
        </div>

        {/* Gallery-style Unboxed Editorial Portraits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {LEADERSHIP.map((leader) => (
            <div key={leader.id} className="group text-left space-y-6">
              {/* Tall Architectural Portrait */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none bg-ink-soft">
                <img
                  src={leader.image}
                  alt={leader.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-luxury"
                />
              </div>

              {/* Minimalist Editorial Name & Designation */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                  {leader.role}
                </span>
                <h3 className="font-display text-2xl font-light text-ink leading-tight tracking-[-0.02em]">
                  {leader.name}
                </h3>
                <p className="text-[11px] text-stone leading-[1.75] font-light line-clamp-2 max-w-[62ch]">
                  {leader.bio}
                </p>
              </div>

              <div className="pt-1">
                <Link
                  to={`/about-us/leadership-team#${leader.id}`}
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-normal text-stone hover:text-gold transition-colors duration-300"
                >
                  <span>Profile Overview</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
