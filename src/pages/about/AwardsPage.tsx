import React, { useState, useMemo, useEffect } from 'react';
import {
  Award,
  Calendar,
  Building2,
  Trophy,
  Star,
  Filter,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Download,
} from 'lucide-react';
import { AWARDS } from '../../data/company';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';

interface AwardsPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const AwardsPage: React.FC<AwardsPageProps> = ({ onOpenEnquiry }) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Awards & Honors | Filterable Timeline of Accolades - Omaxe Limited';
  }, []);

  // Extract distinct years sorted descending
  const years = useMemo(() => {
    const set = new Set(AWARDS.map((a) => a.year));
    return ['All', ...Array.from(set).sort((a, b) => Number(b) - Number(a))];
  }, []);

  // Filter awards by year and search query
  const filteredAwards = useMemo(() => {
    return AWARDS.filter((award) => {
      const matchYear = selectedYear === 'All' || award.year === selectedYear;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        (award.title || '').toLowerCase().includes(q) ||
        (award.project || '').toLowerCase().includes(q) ||
        (award.organization || '').toLowerCase().includes(q);
      return matchYear && matchSearch;
    });
  }, [selectedYear, searchQuery]);

  // Group awards by year for timeline rendering
  const timelineGroups = useMemo(() => {
    const groups: { [year: string]: typeof AWARDS } = {};
    filteredAwards.forEach((award) => {
      if (!groups[award.year]) {
        groups[award.year] = [];
      }
      groups[award.year].push(award);
    });

    // Return array of year groups sorted descending
    return Object.keys(groups)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => ({
        year,
        items: groups[year],
      }));
  }, [filteredAwards]);

  return (
    <div className="pt-28 pb-24 bg-cream text-ink min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-16">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Corporate Heritage', to: '/about-us' },
            { label: 'Awards & Honors' },
          ]}
        />

        {/* Hero Section */}
        <div className="relative rounded-sm overflow-hidden bg-ink text-cream border border-cream/10 p-8 sm:p-14 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(#A8823C_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gold/15 border border-gold/40 text-gold text-xs font-medium uppercase tracking-[0.2em]">
              <Trophy className="w-3.5 h-3.5" />
              <span>National &amp; Global Accolades</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-cream leading-tight">
              A Timeline of Industry Recognition
            </h1>

            <p className="text-sm sm:text-base text-stone leading-relaxed font-light">
              Explore our chronological timeline of excellence — celebrating national real estate honors, public-private partnership achievements, and iconic architectural milestones across India.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                onClick={() => onOpenEnquiry('Media Kit & Awards Verification Dossier')}
                variant="gold-outline"
                size="sm"
                icon={<Download className="w-3.5 h-3.5" />}
              >
                Download Awards Dossier
              </Button>
            </div>
          </div>
        </div>

        {/* Filter and Timeline Controls */}
        <div className="bg-ivory border border-line rounded-sm p-6 sm:p-8 space-y-6 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold font-semibold">
                <Filter className="w-4 h-4" />
                <span>Filter Timeline by Year</span>
              </div>
              <p className="text-xs text-stone font-light">
                Showing {filteredAwards.length} accolades across {timelineGroups.length} timeline milestones
              </p>
            </div>

            {/* Keyword Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Search award, project, or body..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-sm bg-cream border border-line focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Year Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-line/60 pt-4 scrollbar-none">
            {years.map((yr) => {
              const count = yr === 'All'
                ? AWARDS.length
                : AWARDS.filter((a) => a.year === yr).length;

              const isSelected = selectedYear === yr;

              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-4 py-1.5 rounded-sm text-xs font-mono tracking-wider uppercase transition-all shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gold text-ink font-semibold shadow-soft'
                      : 'bg-cream border border-line text-stone hover:text-ink hover:border-gold'
                  }`}
                >
                  <span>{yr === 'All' ? 'All Years' : yr}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-ink/20 text-ink' : 'bg-line/60 text-stone'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filterable Timeline View */}
        {timelineGroups.length === 0 ? (
          <div className="p-16 text-center bg-ivory border border-line rounded-sm space-y-4">
            <Trophy className="w-10 h-10 text-stone/40 mx-auto" />
            <h3 className="font-display text-xl text-ink font-normal">
              No accolades match your filter
            </h3>
            <p className="text-xs text-stone font-light">
              Try adjusting your year filter or clearing the search keyword.
            </p>
            <button
              onClick={() => {
                setSelectedYear('All');
                setSearchQuery('');
              }}
              className="text-xs text-gold underline font-medium"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="relative space-y-16">
            {/* Timeline Spine for Desktop */}
            <div className="hidden lg:block absolute top-6 bottom-6 left-[180px] w-px bg-gradient-to-b from-gold via-line to-gold/30" />

            {timelineGroups.map((group) => (
              <div key={group.year} className="relative space-y-6">
                {/* Year Badge Node */}
                <div className="flex items-center gap-4 lg:gap-8">
                  <div className="w-auto lg:w-[180px] lg:text-right shrink-0">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-ink text-gold border border-gold/30 font-mono text-sm sm:text-base font-medium shadow-soft">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>{group.year}</span>
                    </div>
                  </div>

                  {/* Marker Circle */}
                  <div className="hidden lg:flex w-7 h-7 rounded-full bg-cream border-2 border-gold items-center justify-center shrink-0 z-10 shadow-soft -ml-3.5">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>

                  <div className="h-px bg-line flex-1 hidden sm:block" />
                </div>

                {/* Awards Cards in this Year Group */}
                <div className="lg:pl-[212px] grid grid-cols-1 md:grid-cols-2 gap-6">
                  {group.items.map((award) => (
                    <div
                      key={award.id}
                      className="group p-6 sm:p-7 bg-ivory border border-line rounded-sm space-y-4 hover:border-gold hover:shadow-lift transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-10 h-10 rounded-sm bg-cream border border-line flex items-center justify-center text-gold group-hover:bg-ink group-hover:text-gold transition-colors shrink-0">
                            <Award className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-stone/90 bg-cream px-2.5 py-0.5 rounded-sm border border-line">
                            {award.year}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-lg sm:text-xl text-ink font-normal group-hover:text-gold transition-colors leading-snug">
                            {award.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-gold font-medium mt-1.5">
                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{award.project}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-2 border-t border-line/60 flex items-center justify-between text-xs text-stone font-light">
                        <span className="text-[11px] uppercase tracking-wider font-mono">
                          {award.organization}
                        </span>
                        <Star className="w-3.5 h-3.5 text-gold/60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="bg-ink text-cream rounded-sm p-8 sm:p-12 border border-cream/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gold">
              Editorial &amp; Media Inquiries
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-cream">
              Accredited by Leading National &amp; Global Conclaves
            </h3>
            <p className="text-xs text-stone font-light leading-relaxed">
              Our awards reflect nearly four decades of pioneering urban regional development, high-street revitalization, and Public-Private Partnership landmarks.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Button
              to="/about-us/success-story"
              variant="gold-outline"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Read Success Story
            </Button>
            <Button
              onClick={() => onOpenEnquiry('Media & Press Inquiries')}
              variant="secondary"
              size="sm"
              className="!border-cream/30 !text-cream hover:!bg-cream hover:!text-ink"
            >
              Media Desk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
