import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Newspaper, 
  Tv, 
  Megaphone, 
  Calendar, 
  Download, 
  FileText, 
  ExternalLink,
  Play,
  Check,
  Share2,
  Image as ImageIcon
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { 
  PRESS_RELEASES_DATA, 
  PRINT_COVERAGE_DATA, 
  VIDEO_MEDIA_DATA, 
  CAMPAIGNS_DATA, 
  EVENTS_DATA 
} from '../../data/media';
import { COMPANY_DETAILS } from '../../data/company';

export type MediaSection = 
  | 'press-releases' 
  | 'print-coverage' 
  | 'electronic-media' 
  | 'campaigns' 
  | 'events' 
  | 'media-kit';

interface MediaHubPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const MediaHubPage: React.FC<MediaHubPageProps> = ({ onOpenEnquiry }) => {
  const { section } = useParams<{ section?: string }>();
  const [activeSection, setActiveSection] = useState<MediaSection>('press-releases');
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (section && ['press-releases', 'print-coverage', 'electronic-media', 'campaigns', 'events', 'media-kit'].includes(section)) {
      setActiveSection(section as MediaSection);
    } else {
      setActiveSection('press-releases');
    }
  }, [section]);

  const copyMediaEmail = () => {
    navigator.clipboard.writeText('corporatecomm@omaxe.com');
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Media Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Media Center', href: '/media/press-releases' },
              { 
                label: activeSection === 'press-releases' ? 'Press Releases'
                  : activeSection === 'print-coverage' ? 'Print Coverage'
                  : activeSection === 'electronic-media' ? 'Electronic Media'
                  : activeSection === 'campaigns' ? 'Brand Campaigns'
                  : activeSection === 'events' ? 'Events & Launches'
                  : 'Media Kit'
              },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Official Press Room &amp; Corporate Communications
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Media Center
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Official corporate announcements, verified national news coverage, brand campaign archives, and high-resolution media resources.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        {/* Navigation Tabs for all 6 Media Sections */}
        <div className="border-b border-line mb-10 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 sm:gap-4 min-w-max pb-3">
            {[
              { id: 'press-releases', label: 'Press Releases', icon: FileText, path: '/media/press-releases' },
              { id: 'print-coverage', label: 'Print & Digital News', icon: Newspaper, path: '/media/print-coverage' },
              { id: 'electronic-media', label: 'Electronic & Video Media', icon: Tv, path: '/media/electronic-media' },
              { id: 'campaigns', label: 'Brand Campaigns', icon: Megaphone, path: '/media/campaigns' },
              { id: 'events', label: 'Events & Launches', icon: Calendar, path: '/media/events' },
              { id: 'media-kit', label: 'Media Kit & Assets', icon: Download, path: '/media/media-kit' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  onClick={() => setActiveSection(tab.id as MediaSection)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] rounded-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-ink text-gold shadow-sm'
                      : 'text-stone hover:text-ink hover:bg-ivory'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* SECTION 1: Press Releases */}
        {activeSection === 'press-releases' && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Official Dispatches"
              title="Corporate Press Releases"
              description="Chronological repository of official corporate declarations, business milestones, and joint venture announcements."
              alignment="left"
            />

            <div className="space-y-4">
              {PRESS_RELEASES_DATA.map((item) => (
                <div key={item.id} className="p-6 bg-ivory border border-line rounded-sm space-y-3 hover:border-gold/50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 bg-cream border border-line text-[10px] uppercase font-mono tracking-widest text-ink rounded-xs">
                        {item.category}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <span className="text-gold font-mono text-[11px]">Ref: {item.id.toUpperCase()}</span>
                  </div>

                  <h3 className="font-display text-xl text-ink font-medium leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone leading-relaxed font-light">
                    {item.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-line/60">
                    <button
                      onClick={() => alert(`Opening press release PDF for: ${item.title}`)}
                      className="inline-flex items-center gap-1 text-xs text-gold font-medium hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Official PDF Release</span>
                    </button>
                    <span className="text-[11px] text-stone">New Delhi / National Bureau</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: Print Coverage */}
        {activeSection === 'print-coverage' && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="National Editorial Coverage"
              title="Print &amp; Digital News Features"
              description="In-depth investigative reports, infrastructure analyses, and leadership features across leading financial dailies."
              alignment="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PRINT_COVERAGE_DATA.map((item) => (
                <div key={item.id} className="bg-ivory border border-line rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-card transition-shadow">
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.headline}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-ink/90 text-gold px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-xs">
                      {item.publication}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-stone">
                        <span>{item.date}</span>
                        <span>{item.edition}</span>
                      </div>
                      <h3 className="font-display text-lg text-ink font-medium leading-snug">
                        {item.headline}
                      </h3>
                      <p className="text-xs text-stone font-light leading-relaxed">
                        "{item.snippet}"
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Viewing full archived press article from ${item.publication}`)}
                      className="inline-flex items-center gap-1.5 text-xs text-gold font-medium hover:text-ink transition-colors"
                    >
                      <span>Read Publication Archive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Electronic Media */}
        {activeSection === 'electronic-media' && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Broadcast Features &amp; Virtual Tours"
              title="Electronic &amp; Video Media"
              description="Television interviews, drone construction chronicles, and architectural walk-throughs."
              alignment="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VIDEO_MEDIA_DATA.map((item) => (
                <div key={item.id} className="bg-ivory border border-line rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-card transition-shadow">
                  <div className="relative h-48 bg-ink group cursor-pointer" onClick={() => alert(`Playing broadcast: ${item.title}`)}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gold/90 text-ink flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-ink/90 text-cream px-2 py-0.5 text-[10px] font-mono rounded-xs">
                      {item.duration}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] text-stone">
                        <span className="text-gold font-medium uppercase tracking-wider">{item.channel}</span>
                        <span>{item.date}</span>
                      </div>
                      <h4 className="font-display text-sm text-ink font-medium leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone font-light line-clamp-2">
                        {item.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Opening stream for: ${item.title}`)}
                      className="w-full py-2 bg-cream hover:bg-ink hover:text-gold text-ink text-xs font-medium uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3 h-3" />
                      <span>Watch Broadcast</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Brand Campaigns */}
        {activeSection === 'campaigns' && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Creative Direction &amp; Identity"
              title="Brand Campaigns &amp; Advertisements"
              description="Curated visual retrospectives of our nationwide marketing and print advertising campaigns."
              alignment="left"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {CAMPAIGNS_DATA.map((item) => (
                <div key={item.id} className="bg-ivory border border-line rounded-sm overflow-hidden flex flex-col justify-between">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-ink/90 text-cream px-3 py-1 text-[10px] uppercase tracking-widest rounded-xs">
                      {item.year}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] uppercase tracking-wider text-gold font-mono block">
                      {item.medium}
                    </span>
                    <h3 className="font-display text-lg text-ink font-medium">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gold font-medium italic">
                      "{item.tagline}"
                    </p>
                    <p className="text-xs text-stone font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: Ground Events & Launches */}
        {activeSection === 'events' && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Conclaves &amp; Milestones"
              title="Ground Launches &amp; Ceremonies"
              description="Memorable foundation stone unveilings, partner conclaves, and handover celebrations."
              alignment="left"
            />

            <div className="space-y-8">
              {EVENTS_DATA.map((item) => (
                <div key={item.id} className="p-6 lg:p-8 bg-ivory border border-line rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 h-60 rounded-sm overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone">
                      <span className="text-gold font-semibold uppercase tracking-wider">{item.date}</span>
                      <span>·</span>
                      <span>{item.location}</span>
                      <span>·</span>
                      <span className="font-mono text-[11px] text-ink font-medium">{item.attendance}</span>
                    </div>

                    <h3 className="font-display text-2xl text-ink font-normal leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone leading-relaxed font-light">
                      {item.description}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => alert(`Opening photo gallery for event: ${item.title}`)}
                        className="inline-flex items-center gap-1.5 text-xs text-gold font-medium hover:underline"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>View High-Res Event Gallery</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: Media Kit */}
        {activeSection === 'media-kit' && (
          <div className="space-y-12">
            <SectionHeading
              eyebrow="Media Resources &amp; Brand Guidelines"
              title="Official Media Kit &amp; Brand Assets"
              description="Download official vector logo packages, corporate fact sheets, leadership headshots, and editorial contact guidelines."
              alignment="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
                <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base text-ink font-medium">Official Brand Logo Package</h4>
                <p className="text-xs text-stone leading-relaxed font-light">
                  Vector SVG, high-resolution EPS, and transparent PNG files of the Omaxe wordmark in primary ink, gold, and reverse white variants.
                </p>
                <button
                  onClick={() => alert('Downloading Omaxe_Brand_Logos_2026.zip (18.4 MB)')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-ink text-gold hover:bg-gold hover:text-ink text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Logos (ZIP)</span>
                </button>
              </div>

              <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
                <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base text-ink font-medium">Corporate Fact Sheet 2026</h4>
                <p className="text-xs text-stone leading-relaxed font-light">
                  Two-page briefing sheet containing delivered square footage, geographical presence across 31 cities, board biographies, and key projects.
                </p>
                <button
                  onClick={() => alert('Downloading Omaxe_Corporate_Factsheet_2026.pdf (3.2 MB)')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-ink text-gold hover:bg-gold hover:text-ink text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Factsheet (PDF)</span>
                </button>
              </div>

              <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
                <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                  <Megaphone className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base text-ink font-medium">Leadership Press Photographs</h4>
                <p className="text-xs text-stone leading-relaxed font-light">
                  High-resolution editorial headshots of Founder &amp; Chairman Mr. Rohtaas Goel, Managing Director Mr. Mohit Goel, and executive directors.
                </p>
                <button
                  onClick={() => alert('Downloading Omaxe_Leadership_Portraits.zip (42.1 MB)')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-ink text-gold hover:bg-gold hover:text-ink text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Portraits (ZIP)</span>
                </button>
              </div>
            </div>

            {/* Media Contact Box */}
            <div className="p-8 bg-ink text-cream rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] text-gold uppercase tracking-wider block">Official Spokesperson Liaison</span>
                <h3 className="font-display text-2xl text-cream font-normal">Press &amp; Media Inquiries</h3>
                <p className="text-xs text-stone">For interview requests, television appearances, and editorial statements:</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={copyMediaEmail}
                  className="px-5 py-3 bg-gold text-ink hover:bg-gold-soft text-xs font-medium uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
                >
                  {copiedText ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedText ? 'Email Copied' : 'corporatecomm@omaxe.com'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
