import React from 'react';
import { COMPANY_STATS } from '../../data/company';
import { StatCounter } from '../ui/StatCounter';

export const StatsBand: React.FC = () => {
  return (
    <section
      aria-label="Company Statistics"
      className="bg-ink text-cream py-48 sm:py-60 lg:py-64 border-y border-cream/10 relative"
    >
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16">
        {/* Eyebrow Label */}
        <div className="text-center mb-20">
          <p className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
            Milestones &amp; Footprint
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {COMPANY_STATS.map((stat, index) => (
            <StatCounter key={index} stat={stat} />
          ))}
        </div>

        {/* Minimalist Footnote */}
        <div className="mt-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone font-light">
            Portfolio Deliveries and Urban Footprint as on 31st March 2025
          </p>
        </div>
      </div>
    </section>
  );
};
