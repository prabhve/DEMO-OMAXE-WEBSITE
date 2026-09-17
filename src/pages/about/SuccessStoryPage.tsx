import React, { useEffect, useState } from 'react';
import {
  History,
  TrendingUp,
  Building2,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Landmark,
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';

interface MilestoneItem {
  year: string;
  title: string;
  category: string;
  description: string;
  stats?: string;
  image: string;
  highlight?: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    year: '1987',
    title: 'Genesis as a Construction Contracting Pioneer',
    category: 'Foundational Era',
    description:
      'Mr. Rohtaas Goel establishes Omaxe Builders Private Ltd as an elite civil construction and contracting firm, executing high-precision institutional and commercial structures for premier public and private enterprises.',
    stats: 'Foundation of Engineering Rigor',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80',
    highlight: 'Incorporation & First Major Civil Contracts',
  },
  {
    year: '2001',
    title: 'Pioneering Entry into Real Estate Development',
    category: 'Real Estate Pivot',
    description:
      'Omaxe steps directly into real estate development with premium executive floors and residential housing in Gurugram, setting new architectural standards for contemporary luxury living.',
    stats: 'First Residential Footprint',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
    highlight: 'Gurugram Executive Floors',
  },
  {
    year: '2003',
    title: 'First 85-Acre Integrated Township in Greater Noida',
    category: 'Township Mastery',
    description:
      'Launch of Omaxe’s inaugural 85-acre integrated mega-township in Greater Noida (NRI City), introducing master-planned green ecosystems, clubhouses, and subterranean utilities to northern India.',
    stats: '85-Acre Master-Plan',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80',
    highlight: 'NRI City, Greater Noida Launch',
  },
  {
    year: '2007',
    title: 'Landmark Listing on BSE & NSE',
    category: 'Public Listing',
    description:
      'Omaxe Limited launches its historic Initial Public Offering (IPO), achieving a monumental oversubscription of 68 times. The company officially lists on BSE and NSE, inaugurating a golden era of transparent institutional governance.',
    stats: '68x IPO Oversubscription',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80',
    highlight: 'Public Debut on National Stock Exchanges',
  },
  {
    year: '2020',
    title: 'Financial Resilience & Robust Balance Sheet',
    category: 'Institutional Strength',
    description:
      'Consolidating nearly four decades of nation-building, Omaxe achieves a reported corporate net worth of ₹1,638 crore, delivering continuous value to over 150,000 discerning families and retail investors.',
    stats: '₹1,638 Cr Net Worth Benchmark',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    highlight: 'Sustained Net Worth & Portfolio Maturation',
  },
  {
    year: '2023',
    title: 'Omaxe Chowk Opens in Chandni Chowk (PPP Landmark)',
    category: 'Civic Infrastructure',
    description:
      'In a transformative Public-Private Partnership with the Government of India and MCD, Omaxe inaugurates Omaxe Chowk in historic Chandni Chowk, New Delhi — delivering 2,100 car parking bays and India’s largest organized retail-food destination.',
    stats: 'India’s Largest Heritage Retail & Parking PPP',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd302?w=1200&auto=format&fit=crop&q=80',
    highlight: 'Chandni Chowk Urban Revitalization',
  },
  {
    year: '2025',
    title: 'The Omaxe State Named "Iconic Project of the Year"',
    category: 'National Recognition',
    description:
      'The Omaxe State — a ₹2,500 crore 50.4-acre sports and commercial city-hub in Sector 19B Dwarka, New Delhi — is nationally celebrated as the "Iconic Project of the Year" for pioneering world-class stadium and high-street infrastructure.',
    stats: '50.4-Acre World-Class Sports Complex',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    highlight: 'Iconic Project of the Year Award',
  },
  {
    year: '2026',
    title: 'Delivering Across 31 Cities and 8 Indian States',
    category: 'Pan-India Footprint',
    description:
      'With over 13.02 million square meters of completed developments and 3.99 million square meters under active construction, Omaxe reinforces its stature as Bharat’s most trusted multi-city developer, transforming Tier II & III growth corridors.',
    stats: '31 Cities · 8 States · 150,000+ Families',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80',
    highlight: 'Four Decades of Enduring Trust',
  },
];

export const SuccessStoryPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('1987');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Success Story | 1987 to 2026 Landmark Journey - Omaxe Limited';
  }, []);

  const scrollToMilestone = (year: string) => {
    setSelectedYear(year);
    const element = document.getElementById(`milestone-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'About Us', path: '/about-us' },
              { label: 'Our Success Story' },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block mb-3">
              1987 – 2026 Landmark Journey
            </span>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-[72px] font-light text-ink leading-[1.05] tracking-[-0.03em]">
              Four Decades of Nation-Building
            </h1>
            <p className="mt-6 text-stone text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
              From our modest origins as a dedicated construction contracting firm in 1987 to a publicly listed infrastructure powerhouse shaping 31 cities across 8 states, explore the defining milestones of Omaxe’s legacy.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Vertical Timeline with Sticky Year Rail */}
      <section className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sticky Year Rail on Left (Desktop) / Horizontal Nav (Mobile) */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32 bg-ivory border border-line p-6 space-y-6 shadow-soft">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold block mb-1">
                    Timeline Navigator
                  </span>
                  <h3 className="font-display text-lg font-normal text-ink">
                    Key Historical Eras
                  </h3>
                </div>

                <div className="flex lg:flex-col flex-wrap gap-2">
                  {MILESTONES.map((m) => (
                    <button
                      key={m.year}
                      onClick={() => scrollToMilestone(m.year)}
                      className={`min-h-[44px] px-4 py-2.5 text-left text-xs uppercase tracking-[0.18em] transition-all cursor-pointer border flex items-center justify-between gap-3 ${
                        selectedYear === m.year
                          ? 'bg-ink text-cream border-ink font-normal'
                          : 'bg-cream text-stone border-line hover:border-gold hover:text-ink font-light'
                      }`}
                    >
                      <span className="font-mono text-sm">{m.year}</span>
                      <span className="text-[10px] opacity-75 hidden sm:inline truncate max-w-[120px]">
                        {m.highlight?.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-line text-xs text-stone font-light">
                  Click any milestone to quickly jump to that historical chapter.
                </div>
              </div>
            </aside>

            {/* Vertical Milestones Stream */}
            <div className="lg:col-span-9 space-y-20 relative">
              {/* Vertical Center Line for Desktop */}
              <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-px bg-line" />

              {MILESTONES.map((m, index) => (
                <div
                  key={m.year}
                  id={`milestone-${m.year}`}
                  className="relative lg:pl-24 scroll-mt-36"
                >
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute left-6 top-8 w-5 h-5 rounded-full bg-ivory border-2 border-gold items-center justify-center -translate-x-1/2 shadow-soft">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>

                  {/* Milestone Card */}
                  <div className="bg-ivory border border-line overflow-hidden shadow-soft group hover:border-gold transition-colors duration-300">
                    {/* Image Banner */}
                    <div className="relative aspect-[21/9] sm:aspect-[2.4/1] bg-ink-soft overflow-hidden">
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1.5 bg-ink/85 text-gold text-xs font-mono uppercase tracking-[0.2em] border border-gold/40">
                        {m.category}
                      </div>

                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 text-cream">
                        <span className="font-display text-3xl sm:text-5xl font-light text-gold block leading-none">
                          {m.year}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-10 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold block">
                          {m.highlight}
                        </span>
                        <h2 className="font-display text-[32px] sm:text-3xl lg:text-4xl font-light text-ink leading-snug">
                          {m.title}
                        </h2>
                      </div>

                      <p className="text-stone text-base font-light leading-[1.8]">
                        {m.description}
                      </p>

                      <div className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border border-line text-xs font-mono text-ink">
                          <Sparkles className="w-3.5 h-3.5 text-gold" />
                          <span>{m.stats}</span>
                        </div>
                        <span className="text-xs font-mono text-stone">
                          Milestone 0{index + 1} / 0{MILESTONES.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
