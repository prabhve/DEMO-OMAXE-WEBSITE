import React from 'react';
import { Award, Compass, ShieldCheck, Trophy } from 'lucide-react';

interface ReasonItem {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export const WhyChooseOmaxe: React.FC = () => {
  const reasons: ReasonItem[] = [
    {
      num: '01',
      icon: Award,
      title: 'Decades of Expertise',
      description:
        'Over 39 years of engineering excellence, delivering monumental townships and setting benchmarks in modern Indian urban architecture.',
    },
    {
      num: '02',
      icon: Compass,
      title: 'Pan-India Presence',
      description:
        'Transforming regional growth corridors with landmark developments established across 31 strategic cities and 8 major Indian states.',
    },
    {
      num: '03',
      icon: ShieldCheck,
      title: 'Customer-Centric Approach',
      description:
        'Transparent corporate governance as a BSE/NSE listed developer, backed by uncompromising quality standards and timely handover stewardship.',
    },
    {
      num: '04',
      icon: Trophy,
      title: 'Award-Winning Projects',
      description:
        'Consistently recognized and honored by India’s most prestigious real estate institutions and national infrastructure bodies.',
    },
  ];

  return (
    <section
      aria-label="Why Choose Omaxe"
      className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16 bg-cream text-ink border-t border-line"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Eyebrow & Section Heading */}
        <div className="mb-16 sm:mb-24 space-y-4">
          <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
            Enduring Value
          </span>
          <h2 className="font-display text-[32px] sm:text-4xl md:text-5xl lg:text-[56px] font-light text-ink leading-[1.08] tracking-[-0.02em]">
            Why Choose Omaxe
          </h2>
        </div>

        {/* 4 Large Numbered Editorial Rows Separated by Hairlines */}
        <div className="border-t border-b border-line divide-y divide-line">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start hover:bg-ivory/60 transition-colors px-2 sm:px-4"
              >
                {/* Number & Icon */}
                <div className="md:col-span-3 flex items-center gap-6">
                  <span className="font-display text-2xl sm:text-3xl font-light text-gold tracking-tight">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center text-gold">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                </div>

                {/* Heading & 2 Lines of Copy */}
                <div className="md:col-span-9 space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-ink leading-snug tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="text-stone text-base font-light leading-[1.75] max-w-[62ch]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
