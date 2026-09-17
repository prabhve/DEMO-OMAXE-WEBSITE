import React from 'react';
import { ExternalLink } from 'lucide-react';
import { IN_THE_NEWS } from '../../data/news';

export const InTheNewsStrip: React.FC = () => {
  return (
    <section
      aria-label="In the News"
      className="py-16 sm:py-20 bg-ivory text-ink border-b border-line"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
            In the News
          </span>
          <span className="text-[11px] font-light text-stone tracking-wide">
            National Press Coverage
          </span>
        </div>

        {/* Three Hairline-Separated Rows */}
        <div className="border-t border-b border-line divide-y divide-line">
          {IN_THE_NEWS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-h-[56px] py-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-cream/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 flex-1">
                <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold shrink-0">
                  {item.publication}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-light text-ink group-hover:text-gold transition-colors leading-snug tracking-[-0.01em]">
                  {item.headline}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-stone group-hover:text-gold transition-colors shrink-0 self-start md:self-center">
                <span className="text-[11px] uppercase tracking-wider font-light">Read Article</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
