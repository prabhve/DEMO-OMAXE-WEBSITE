import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Building,
  Calendar,
  Layers,
  ShieldCheck,
  Download,
  Share2,
  Phone,
  Check,
  MessageSquare,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { Project } from '../types';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectAmenities } from '../components/project/ProjectAmenities';
import { ProjectGallery } from '../components/project/ProjectGallery';
import { ProjectFloorPlans } from '../components/project/ProjectFloorPlans';
import { ProjectLocation } from '../components/project/ProjectLocation';
import { useProjectSEO } from '../hooks/useProjectSEO';

interface ProjectDetailPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onOpenEnquiry }) => {
  const { category, city, slug } = useParams<{ category: string; city: string; slug: string }>();

  // Find project by slug
  const project: Project | undefined = PROJECTS.find(
    (p) => p.slug === slug || p.id === slug
  );

  // Active section tab
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'plans' | 'gallery' | 'location'>('overview');

  // Dynamic SEO head tags (title, meta description, keywords, OpenGraph, Twitter card, geo tags, schema JSON-LD)
  useProjectSEO(project);

  // Sidebar quick form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) {
    return (
      <div className="pt-36 pb-24 bg-cream text-ink min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-md space-y-6">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold block">
            Property Not Found
          </span>
          <h1 className="font-display text-4xl text-ink font-normal">
            Development Under Curation
          </h1>
          <p className="text-xs sm:text-sm text-stone leading-relaxed font-light">
            The requested project specification could not be located in our current public ledger. Please explore our full portfolio or connect with our concierge.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button to="/projects" variant="primary">
              View All Projects
            </Button>
            <Button onClick={() => onOpenEnquiry('Unlisted Property Inquiry')} variant="secondary">
              Inquire with Concierge
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Similar projects (same city or same category, excluding current)
  const similarProjects = PROJECTS.filter(
    (p) => p.id !== project.id && (p.city === project.city || p.category === project.category)
  ).slice(0, 3);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;
    setLeadSubmitted(true);
    setTimeout(() => {
      onOpenEnquiry(`${project.title} - Site Visit Request for ${leadName} (${leadPhone})`);
    }, 400);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${project.title} - Omaxe Limited`,
        text: `Explore ${project.title} (${project.type}) at ${project.location ? `${project.location}, ` : ''}${project.city}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-cream text-ink min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Projects', to: '/projects' },
            {
              label: project.category === 'residential' ? 'Residential' : 'Commercial',
              to: `/projects?category=${project.category}`,
            },
            { label: project.city, to: `/projects?city=${encodeURIComponent(project.city)}` },
            { label: project.title },
          ]}
        />

        {/* Hero Header Card */}
        <div className="relative rounded-sm overflow-hidden bg-ink text-cream border border-cream/10 shadow-lift">
          {/* Main Hero Background Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-ink-soft">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Cinematic Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            <div className="absolute inset-0 bg-ink/20" />
          </div>

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
            {/* Top Badges & Share Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-ink/80 backdrop-blur-sm border border-gold/50 px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase text-gold rounded-sm">
                  {project.category}
                </span>
                <span className="bg-ink/80 backdrop-blur-sm px-3 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-cream/90 rounded-sm">
                  {project.status}
                </span>
                {project.isSignature && (
                  <span className="bg-gold text-ink font-semibold px-3 py-1 text-[10px] tracking-[0.14em] uppercase rounded-sm flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Signature Landmark</span>
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                aria-label="Share project"
                className="p-2.5 bg-ink/70 hover:bg-gold text-cream hover:text-ink backdrop-blur-sm rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-medium">
                  {isCopied ? 'Link Copied' : 'Share'}
                </span>
              </button>
            </div>

            {/* Bottom Headline & Metadata */}
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2 text-stone/90 text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>{project.location ? `${project.location}, ` : ''}{project.city}, {project.state}</span>
                <span className="text-cream/30">·</span>
                <span className="font-mono text-[11px] text-stone/80">{project.reraNo}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[80px] font-light text-cream leading-[1.05] tracking-[-0.02em]">
                {project.title}
              </h1>

              <p className="text-sm sm:text-base text-cream/80 font-light max-w-2xl leading-relaxed">
                {project.type}
              </p>

              {/* Price & CTA Row */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-stone block">Starting Price</span>
                  <span className="font-serif text-2xl sm:text-3xl text-gold font-normal">
                    {project.priceStarting}
                  </span>
                </div>

                <div className="h-8 w-[1px] bg-cream/20 hidden sm:block" />

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    onClick={() => onOpenEnquiry(project.title)}
                    variant="gold-outline"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Enquire with Concierge
                  </Button>
                  <Button
                    onClick={() => onOpenEnquiry(`Download Brochure: ${project.title}`)}
                    variant="secondary"
                    size="sm"
                    className="!border-cream/30 !text-cream hover:!bg-cream hover:!text-ink"
                    icon={<Download className="w-3.5 h-3.5" />}
                  >
                    Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Strip / Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 bg-ivory border border-line rounded-sm p-6 shadow-soft">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-stone flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-gold shrink-0" />
              Property Type
            </span>
            <span className="text-xs sm:text-sm font-medium text-ink block leading-snug">
              {project.type}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-stone flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gold shrink-0" />
              Configuration
            </span>
            <span className="text-xs sm:text-sm font-medium text-ink block leading-snug line-clamp-2">
              {project.configuration}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-stone flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
              Possession Date
            </span>
            <span className="text-xs sm:text-sm font-medium text-ink block leading-snug">
              {project.possession}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-stone flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
              Total Area / Land
            </span>
            <span className="text-xs sm:text-sm font-medium text-ink block leading-snug">
              {project.area}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-stone flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
              RERA Filing
            </span>
            <span className="text-xs font-mono text-ink block leading-snug">
              {project.reraNo}
            </span>
          </div>
        </div>

        {/* Navigation Sticky Tabs Bar */}
        <div className="sticky top-20 z-20 bg-cream/95 backdrop-blur-md border-b border-line py-2.5 flex items-center gap-2 overflow-x-auto luxury-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Highlights' },
            { id: 'amenities', label: 'Bespoke Amenities' },
            { id: 'plans', label: 'Floor Plans & Layouts' },
            { id: 'gallery', label: 'Photographic Gallery' },
            { id: 'location', label: 'Location & Connectivity' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 min-h-[44px] text-xs uppercase tracking-btn font-medium rounded-sm whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center ${
                activeTab === tab.id
                  ? 'bg-ink text-cream shadow-sm'
                  : 'text-stone hover:text-ink hover:bg-ivory'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main 12-Column Grid (8 Content + 4 Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* TAB 1: OVERVIEW & HIGHLIGHTS */}
            {activeTab === 'overview' && (
              <div className="space-y-10">
                {/* Editorial Description */}
                <div className="bg-ivory border border-line rounded-sm p-6 sm:p-8 space-y-4">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold block">
                    Architectural Narrative
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink leading-tight">
                    About {project.title}
                  </h2>
                  <p className="text-stone text-sm sm:text-base leading-[1.8] font-light">
                    {project.description}
                  </p>
                </div>

                {/* Key Architectural Highlights */}
                <div className="bg-ivory border border-line rounded-sm p-6 sm:p-8 space-y-6">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold block">
                    Key Landmark Signatures
                  </span>
                  <div className="divide-y divide-line">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="py-4 flex items-start gap-4">
                        <span className="font-mono text-xs text-gold tracking-widest mt-0.5">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <p className="text-xs sm:text-sm text-ink leading-relaxed font-normal flex-1">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Gallery Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-medium text-stone">
                      Visual Showcase Preview
                    </span>
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className="link-tertiary text-xs text-gold"
                    >
                      View Full Gallery ({project.gallery.length} Images)
                    </button>
                  </div>
                  <ProjectGallery images={project.gallery} title={project.title} />
                </div>
              </div>
            )}

            {/* TAB 2: BESPOKE AMENITIES */}
            {activeTab === 'amenities' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold block">
                    Curated Lifestyle Privileges
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                    Bespoke Amenities &amp; Infrastructure
                  </h2>
                  <p className="text-xs sm:text-sm text-stone font-light">
                    Engineered to uncompromising five-star standards, ensuring holistic wellness, recreation, and effortless everyday living.
                  </p>
                </div>
                <ProjectAmenities amenities={project.amenities} />
              </div>
            )}

            {/* TAB 3: FLOOR PLANS & LAYOUTS */}
            {activeTab === 'plans' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold block">
                    Dimensional Schematics
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                    Floor Plans &amp; Configurations
                  </h2>
                  <p className="text-xs sm:text-sm text-stone font-light">
                    Select a configuration to review layout dimensions, room allocations, and private outdoor terrace provisions.
                  </p>
                </div>
                <ProjectFloorPlans
                  projectTitle={project.title}
                  category={project.category}
                  configuration={project.configuration}
                  onOpenEnquiry={onOpenEnquiry}
                />
              </div>
            )}

            {/* TAB 4: PHOTOGRAPHIC GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold block">
                    Visual Archive
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                    Photographic Portfolio
                  </h2>
                  <p className="text-xs sm:text-sm text-stone font-light">
                    Explore high-resolution captures of the facade, interior sanctuaries, landscaped courtyards, and signature amenities.
                  </p>
                </div>
                <ProjectGallery images={project.gallery} title={project.title} />
              </div>
            )}

            {/* TAB 5: LOCATION & CONNECTIVITY */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold block">
                    Strategic Geography
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                    Location &amp; Connectivity Highlights
                  </h2>
                  <p className="text-xs sm:text-sm text-stone font-light">
                    Situated along prime growth corridors with rapid transit hubs, premier educational campuses, and business districts within easy reach.
                  </p>
                </div>
                <ProjectLocation project={project} />
              </div>
            )}

            {/* RERA & Statutory Compliance Banner */}
            <div className="bg-ivory border border-line rounded-sm p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-gold">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-display text-lg text-ink font-normal">
                  RERA Compliance &amp; Regulatory Disclosures
                </h3>
              </div>
              <p className="text-xs text-stone leading-relaxed font-light">
                This project is registered under the Real Estate (Regulation and Development) Act with registration number{' '}
                <strong className="text-ink font-medium font-mono">{project.reraNo}</strong>.
                All plans, approvals, layout plans, and statutory clearances can be validated on the official State RERA authority portal. The artistic impressions, walkthroughs, and representations are indicative and subject to change per regulatory guidelines.
              </p>
              <div className="flex items-center gap-4 text-xs text-gold">
                <a
                  href="https://rera.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-tertiary text-xs"
                >
                  Visit State RERA Portal
                </a>
                <span className="text-line">·</span>
                <button
                  onClick={() => onOpenEnquiry(`Request Statutory Compliance Dossier: ${project.title}`)}
                  className="hover:text-ink transition-colors underline cursor-pointer"
                >
                  Request Compliance Dossier
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Consultation Sidebar (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            {/* Quick Enquiry Card */}
            <div className="bg-ivory border border-line rounded-sm p-6 sm:p-7 shadow-lift space-y-5">
              <div className="space-y-1 border-b border-line pb-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold block">
                  Private Client Concierge
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-ink font-normal">
                  Inquire About This Property
                </h3>
                <p className="text-xs text-stone font-light">
                  Direct consultation with the dedicated portfolio director for {project.title}.
                </p>
              </div>

              {leadSubmitted ? (
                <div className="p-6 bg-cream border border-gold/40 rounded-sm text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-ink text-gold flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-lg text-ink">Inquiry Submitted</h4>
                  <p className="text-xs text-stone leading-relaxed">
                    Thank you, {leadName}. Our senior relationship manager for {project.city} will connect with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="detail-lead-name" className="block text-[10px] uppercase tracking-wider text-stone font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      id="detail-lead-name"
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full bg-cream border border-line px-3 py-2.5 min-h-[44px] text-xs text-ink rounded-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="detail-lead-phone" className="block text-[10px] uppercase tracking-wider text-stone font-medium mb-1">
                      Contact Number *
                    </label>
                    <input
                      id="detail-lead-phone"
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-cream border border-line px-3 py-2.5 min-h-[44px] text-xs text-ink rounded-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="detail-lead-email" className="block text-[10px] uppercase tracking-wider text-stone font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      id="detail-lead-email"
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="name@organization.com"
                      className="w-full bg-cream border border-line px-3 py-2.5 min-h-[44px] text-xs text-ink rounded-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-luxury-primary py-3.5 min-h-[44px] text-xs uppercase tracking-btn font-medium rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Private Viewing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[10px] text-stone text-center font-light leading-relaxed">
                    By submitting, you authorize Omaxe representatives to reach out via call/WhatsApp.
                  </p>
                </form>
              )}

              {/* Direct Support Channels */}
              <div className="pt-4 border-t border-line space-y-3">
                <a
                  href="tel:+911141856780"
                  className="flex items-center justify-between p-3 rounded-sm bg-cream/70 hover:bg-cream border border-line text-xs transition-colors"
                >
                  <div className="flex items-center gap-2.5 text-ink">
                    <Phone className="w-4 h-4 text-gold" />
                    <span>Direct Sales Line</span>
                  </div>
                  <span className="font-mono text-[11px] text-stone font-medium">+91 11 4185 6780</span>
                </a>

                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(
                    `Hello Omaxe Concierge, I would like to enquire about ${project.title} in ${project.city}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-sm bg-emerald-50 hover:bg-emerald-100/60 border border-emerald-200 text-xs transition-colors"
                >
                  <div className="flex items-center gap-2.5 text-emerald-900 font-medium">
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>WhatsApp Concierge</span>
                  </div>
                  <span className="text-[11px] text-emerald-700">Immediate</span>
                </a>
              </div>
            </div>

            {/* Download Brochure Card */}
            <div className="bg-ink text-cream rounded-sm p-6 border border-cream/10 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-medium block">
                Official Collateral
              </span>
              <h4 className="font-display text-lg text-cream font-normal">
                Project Dossier &amp; Price List
              </h4>
              <p className="text-xs text-stone font-light leading-relaxed">
                Download the complete architectural brochure, payment schedule, and specification sheet.
              </p>
              <Button
                onClick={() => onOpenEnquiry(`Download Brochure: ${project.title}`)}
                variant="gold-outline"
                size="sm"
                className="w-full justify-center"
                icon={<Download className="w-3.5 h-3.5" />}
              >
                Download PDF Dossier
              </Button>
            </div>
          </div>
        </div>

        {/* Similar & Nearby Developments Section */}
        {similarProjects.length > 0 && (
          <div className="pt-16 border-t border-line space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold block">
                  Complementary Portfolios
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                  Similar Developments in {project.city} &amp; NCR
                </h2>
              </div>
              <Link to="/projects" className="link-tertiary text-xs text-gold shrink-0">
                <span>View Complete Portfolio</span>
                <ArrowRight className="w-3 h-3 text-gold" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
