import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  ShieldCheck,
  History,
  ArrowRight,
  Download,
  Target,
  Quote,
  Play,
  HeartHandshake,
  FileText,
  Cpu,
  Compass,
  Trees,
  Leaf,
} from 'lucide-react';
import { COMPANY_STATS } from '../../data/company';
import { GROUP_COMPANIES } from '../../data/documents';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { VideoModal } from '../../components/ui/VideoModal';

interface AboutUsPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

const PORTFOLIO_TYPES = [
  'Integrated & Hi-Tech Townships',
  'Group Housing',
  'SCOs',
  'Shopping Malls',
  'Hotels',
  'Office Complexes',
  'IT Parks',
  'Mixed-Use Developments',
  'Developed Plots',
  'Villas',
  'Independent Floors',
  'Penthouses',
  'Service Apartments',
];

const PHILOSOPHY_PILLARS = [
  {
    title: 'Smart Infrastructure',
    icon: Cpu,
    text: 'Engineering master-planned urban ecosystems equipped with subterranean utility ducts, sensor-managed storm water drain networks, centralized wastewater recycling facilities, and automated smart-grid electrical distribution systems designed for generational durability and zero civic friction.',
  },
  {
    title: 'Strategic Locations',
    icon: Compass,
    text: 'Positioning developments along high-growth economic arteries, regional rapid transit corridors, and greenfield expressway interchanges, guaranteeing superior capital appreciation, effortless multi-directional connectivity, and immediate catchment access for families and flourishing enterprises alike.',
  },
  {
    title: 'Green Spaces',
    icon: Trees,
    text: 'Integrating extensive biophilic open landscapes, protected forest canopies, organic fruit orchards, and central water bodies into every residential master plan, ensuring clean air quality, serene pedestrian living, and authentic connection with nature.',
  },
  {
    title: 'Sustainable Construction',
    icon: Leaf,
    text: 'Employing IGBC-certified green building frameworks, solar-powered communal utilities, low-carbon monolithic concrete construction, and advanced rainwater harvesting aquifers that actively replenish natural water tables while minimizing overall environmental carbon footprints.',
  },
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenEnquiry }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | Corporate Heritage & Four Decades of Trust - Omaxe Limited';
  }, []);

  const aboutSections = [
    {
      title: 'Leadership & Board of Directors',
      description: 'Meet our visionary executive board steering India’s premier township and civic infrastructure developments.',
      link: '/about-us/leadership-team',
      icon: Users,
      badge: 'Executive Governance',
    },
    {
      title: 'Chairman’s Message',
      description: 'A personal address from Founder & Chairman Mr. Rohtaas Goel on four decades of value creation and nation-building.',
      link: '/about-us/cmd-message',
      icon: Quote,
      badge: 'From the Founder',
    },
    {
      title: 'Mission & Vision',
      description: 'The foundational philosophy, core ethics, and sustainable pledges that guide every architectural creation.',
      link: '/about-us/mission-and-vision',
      icon: Target,
      badge: 'Corporate Ethos',
    },
    {
      title: 'Quality Policy & Standards',
      description: 'ISO-benchmarked engineering rigor, seismic safety frameworks, and strict multi-stage audit protocols.',
      link: '/about-us/quality-policy',
      icon: ShieldCheck,
      badge: 'Engineering Rigor',
    },
    {
      title: 'Awards & Accolades',
      description: 'National and international honors recognizing pioneering achievements in townships, retail, and civic architecture.',
      link: '/about-us/awards-and-honors',
      icon: Award,
      badge: 'Industry Honors',
    },
    {
      title: 'Our Success Story',
      description: 'The four-decade journey from a modest 1987 civil contracting firm to India’s most trusted public real estate conglomerate.',
      link: '/about-us/success-story',
      icon: History,
      badge: '1987 – 2026',
    },
    {
      title: 'Corporate Social Responsibility',
      description: 'Discover how Omaxe Foundation enriches lives across Health, Education, and Community Stewardship.',
      link: '/csr',
      icon: HeartHandshake,
      badge: 'Omaxe Foundation',
    },
    {
      title: 'Statutory Compliance & Filings',
      description: 'Public disclosures, environment clearances, approved layout plans, and RERA certifications.',
      link: '/compliance',
      icon: FileText,
      badge: 'Regulatory Transparency',
    },
  ];

  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About Us' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block mb-3">
              Corporate Heritage · Established 1987
            </span>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-[72px] font-light text-ink leading-[1.05] tracking-[-0.03em]">
              Turning Dreams into Reality Across Bharat
            </h1>
            <p className="mt-6 text-stone text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
              From our origins as a dedicated construction contracting firm in 1987 to becoming one of India’s most revered publicly listed real estate conglomerates, Omaxe has delivered over 13.02 million square meters of master-planned spaces across 31 cities.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                to="/about-us/success-story"
                variant="solid"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore 39-Year Timeline
              </Button>
              <Button
                to="/about-us/cmd-message"
                variant="outline"
                size="md"
              >
                Chairman's Vision
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Film Full-Bleed Video Band */}
      <section
        aria-label="Corporate Film"
        className="relative w-full bg-ink text-cream overflow-hidden border-b border-cream/15"
      >
        <div className="relative aspect-[21/9] min-h-[360px] sm:min-h-[480px] w-full flex items-center justify-center">
          {/* Dark Still Image Background */}
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2000&auto=format&fit=crop&q=80"
            alt="The Omaxe Story Corporate Film Still"
            className="absolute inset-0 w-full h-full object-cover grayscale-[25%] brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />

          {/* Center Play Button & Serif Caption */}
          <div className="relative z-10 text-center px-4 space-y-6 flex flex-col items-center">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              aria-label="Play Corporate Film"
              className="group min-h-[64px] min-w-[64px] w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-gold/80 flex items-center justify-center bg-ink/50 backdrop-blur-sm hover:scale-110 hover:bg-gold hover:text-cream transition-all duration-500 cursor-pointer shadow-lift"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-gold group-hover:fill-cream text-gold group-hover:text-cream ml-1 transition-colors" />
            </button>
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold block">
                Official Corporate Film
              </span>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-cream tracking-tight">
                The Omaxe Story
              </h2>
              <p className="text-xs sm:text-sm text-stone font-light tracking-wide max-w-md mx-auto">
                Discover the vision, engineering mastery, and human stories that have shaped modern Indian skylines since 1987.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-ivory border-b border-line px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {COMPANY_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-gold">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm font-normal text-ink">
                {stat.label}
              </div>
              <p className="text-[11px] text-stone font-light">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Development Philosophy - 4 Pillars in 2x2 Grid */}
      <section
        aria-label="Development Philosophy"
        className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16 bg-cream border-b border-line"
      >
        <div className="max-w-[1360px] mx-auto space-y-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
              Guiding Principles
            </span>
            <h2 className="font-display text-[32px] sm:text-4xl md:text-5xl font-light text-ink leading-[1.08] tracking-[-0.02em]">
              Development Philosophy
            </h2>
            <p className="text-stone text-base font-light leading-relaxed">
              Every master plan we conceive is founded upon four unyielding architectural pillars that harmonize ecological stewardship with high-performance engineering.
            </p>
          </div>

          {/* 2x2 Grid with Generous Padding & Hairline Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-line bg-ivory divide-y md:divide-y-0 md:divide-x divide-line">
            <div className="divide-y divide-line">
              {PHILOSOPHY_PILLARS.slice(0, 2).map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="p-8 sm:p-12 lg:p-16 space-y-6 hover:bg-cream/40 transition-colors">
                    <div className="w-12 h-12 flex items-center justify-center text-gold border border-line bg-cream">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-light text-ink">
                      {pillar.title}
                    </h3>
                    <p className="text-stone text-base font-light leading-[1.75]">
                      {pillar.text}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="divide-y divide-line border-t md:border-t-0 border-line">
              {PHILOSOPHY_PILLARS.slice(2, 4).map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="p-8 sm:p-12 lg:p-16 space-y-6 hover:bg-cream/40 transition-colors">
                    <div className="w-12 h-12 flex items-center justify-center text-gold border border-line bg-cream">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-light text-ink">
                      {pillar.title}
                    </h3>
                    <p className="text-stone text-base font-light leading-[1.75]">
                      {pillar.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Types Tag Cloud */}
      <section
        aria-label="Portfolio Types"
        className="py-16 sm:py-24 px-5 sm:px-8 lg:px-16 bg-ivory border-b border-line"
      >
        <div className="max-w-[1360px] mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
              Diverse Capabilities
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">
              Comprehensive Portfolio Types
            </h2>
            <p className="text-xs sm:text-sm text-stone font-light max-w-xl">
              Explore our landmark developments categorized by typologies. Select any classification to discover matching projects across India.
            </p>
          </div>

          {/* Tag Cloud of Bordered Pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            {PORTFOLIO_TYPES.map((type) => (
              <Link
                key={type}
                to={`/projects?type=${encodeURIComponent(type)}`}
                className="min-h-[44px] px-5 py-2.5 rounded-full border border-line bg-cream hover:border-gold hover:bg-ink hover:text-cream text-xs uppercase tracking-wider font-light text-ink transition-all duration-300 inline-flex items-center gap-2 group"
              >
                <span>{type}</span>
                <ArrowRight className="w-3 h-3 text-gold group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Group Companies Section */}
      <section
        aria-label="Group Companies"
        className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16 bg-cream border-b border-line"
      >
        <div className="max-w-[1360px] mx-auto space-y-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
              Corporate Structure
            </span>
            <h2 className="font-display text-[32px] sm:text-4xl font-light text-ink leading-tight">
              Group Companies
            </h2>
            <p className="text-stone text-base font-light leading-relaxed">
              Omaxe Limited executes marquee developments and public-private partnerships through specialized SPVs and group development entities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {GROUP_COMPANIES.map((company) => (
              <div
                key={company.name}
                className="bg-ivory border border-line p-8 space-y-4 hover:border-gold transition-colors"
              >
                <ShieldCheck className="w-6 h-6 text-gold" />
                <h3 className="font-display text-xl font-normal text-ink leading-snug">
                  {company.name}
                </h3>
                <p className="text-xs text-stone font-light leading-relaxed">
                  {company.role}
                </p>
                <div className="pt-3 border-t border-line">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gold block">
                    Key Development Focus:
                  </span>
                  <p className="text-xs text-ink font-light mt-1">
                    {company.projects.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Deep-Dive Sub-Pages */}
      <section className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16 bg-ivory">
        <div className="max-w-[1360px] mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
              Corporate Governance
            </span>
            <h2 className="font-display text-[32px] sm:text-4xl font-light text-ink">
              Explore Our Organization
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutSections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <Link
                  key={idx}
                  to={sec.link}
                  className="group p-6 bg-cream border border-line hover:border-gold transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-ivory border border-line flex items-center justify-center text-gold group-hover:bg-ink group-hover:text-gold transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-ink font-normal group-hover:text-gold transition-colors">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-stone font-light leading-relaxed mt-2">
                        {sec.description}
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 mt-4 border-t border-line flex items-center justify-between text-xs text-gold">
                    <span className="uppercase tracking-wider text-[10px] font-mono">{sec.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Film Video Modal */}
      {isVideoModalOpen && (
        <VideoModal
          isOpen={isVideoModalOpen}
          videoId="ISMVWmkeYi8"
          title="The Omaxe Story — Official Corporate Film"
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </div>
  );
};
