import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../../data/company';
import { SectionHeading } from '../ui/SectionHeading';

export const JournalSection: React.FC = () => {
  // Cut visible count to 2 featured editorial essays
  const featuredArticles = JOURNAL_ARTICLES.slice(0, 2);

  return (
    <section
      aria-label="Omaxe Journal"
      className="py-56 sm:py-72 lg:py-80 bg-cream text-ink border-t border-line relative"
    >
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <SectionHeading
            eyebrow="Editorial &amp; Insights"
            title="The Omaxe Journal"
          />
          <Link to="/blog" className="link-tertiary text-[11px] uppercase tracking-[0.18em] shrink-0 text-gold">
            <span>The Complete Archive</span>
            <ArrowRight className="w-3 h-3 text-gold" />
          </Link>
        </div>

        {/* 2-Column Monumental Editorial Essays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {featuredArticles.map((article) => (
            <article key={article.id} className="group text-left space-y-6">
              {/* Expansive Architectural Photography */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-ink-soft">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-luxury"
                />
              </div>

              {/* Text Body with Generous Silence */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-gold font-normal">
                  <span>{article.category}</span>
                  <span className="text-stone font-light">{article.readTime}</span>
                </div>

                <h3 className="font-display text-2xl font-light text-ink group-hover:text-gold transition-colors duration-300 leading-snug tracking-[-0.02em]">
                  {article.title}
                </h3>

                <p className="text-stone text-[11px] leading-[1.75] font-light line-clamp-3 max-w-[62ch]">
                  {article.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    to={`/blog#${article.slug}`}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-normal text-stone hover:text-gold transition-colors"
                  >
                    <span>Read Monograph</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
