import React from 'react';
import { AWARDS } from '../../data/company';

export const AwardsMarquee: React.FC = () => {
  // Curated prominent honors
  const accolades = AWARDS.slice(0, 3);

  return (
    <div
      aria-label="Awards and Accolades"
      className="bg-ink text-cream py-16 border-y border-cream/10 select-none"
    >
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center md:text-left">
          {accolades.map((item) => (
            <div key={item.id} className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-gold block">
                {item.organization}
              </span>
              <p className="font-display text-xl font-light text-cream leading-snug tracking-[-0.02em]">
                {item.title}
              </p>
              <p className="text-[11px] text-stone font-light">
                {item.project}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
