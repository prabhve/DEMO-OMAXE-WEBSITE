import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Compass,
  Eye,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';

interface MissionVisionPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const MissionVisionPage: React.FC<MissionVisionPageProps> = ({ onOpenEnquiry }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Mission, Vision & Core Values | Corporate Ethos - Omaxe Limited';
  }, []);

  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Unwavering Trust & Integrity',
      description: 'We believe fiduciary accountability and absolute transparency are sacred. From RERA compliance to listed governance, our word is our bedrock.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer Centricity',
      description: 'Putting homeowners, retail tenants, and investors at the core of all decisions. Every blueprint is drawn to enhance daily living comfort and enduring value.',
    },
    {
      icon: Layers,
      title: 'Engineering Rigor',
      description: 'Rooted in our 1987 civil contracting heritage. We enforce strict seismic safety, multi-stage material audits, and zero-defect structural tolerances.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Stewardship',
      description: 'Active commitment to ecological harmony. We mandate native landscaping, extensive rainwater harvesting, and IGBC-certified green architecture.',
    },
    {
      icon: Compass,
      title: 'Empowering Regional Bharat',
      description: 'Democratizing high-standard urban life across Tier II and Tier III cities. Bringing modern township infrastructure to the heart of emerging India.',
    },
    {
      icon: Sparkles,
      title: 'Continuous Innovation',
      description: 'Pioneering mega Public-Private Partnerships, robotic construction techniques, and experiential retail environments that redefine Indian urbanism.',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-cream text-ink min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-16">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Corporate Heritage', to: '/about-us' },
            { label: 'Mission & Vision' },
          ]}
        />

        {/* Hero Section */}
        <div className="relative rounded-sm overflow-hidden bg-ink text-cream border border-cream/10 p-8 sm:p-14 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(#A8823C_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gold/15 border border-gold/40 text-gold text-xs font-medium uppercase tracking-[0.2em]">
              <Target className="w-3.5 h-3.5" />
              <span>Corporate Philosophy &amp; Guiding Compass</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-cream leading-tight">
              A Noble Purpose in Every Square Meter
            </h1>

            <p className="text-sm sm:text-base text-stone leading-relaxed font-light">
              Since 1987, Omaxe has been steered by an unshakeable ethical compass: to design living, commercial, and civic spaces that honor human aspiration and endure through generations.
            </p>
          </div>
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="p-8 sm:p-12 bg-ivory border border-line rounded-sm space-y-6 shadow-soft relative overflow-hidden">
            <div className="w-12 h-12 rounded-sm bg-cream border border-line flex items-center justify-center text-gold">
              <Eye className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold font-semibold">
                Our Vision
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                To Be India’s Most Trusted Infrastructure Conglomerate
              </h2>
            </div>

            <p className="text-sm text-stone font-light leading-relaxed">
              To be the most admired, transparent, and forward-looking real estate and infrastructure development conglomerate in India — recognized for transforming regional skylines, democratizing world-class townships, and creating spaces where communities thrive in enduring harmony.
            </p>

            <ul className="space-y-2.5 pt-4 border-t border-line text-xs text-stone font-light">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Catalyzing regional economic growth across Tier II &amp; Tier III hubs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Delivering benchmark civic infrastructure through innovative PPP models.</span>
              </li>
            </ul>
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-12 bg-ivory border border-line rounded-sm space-y-6 shadow-soft relative overflow-hidden">
            <div className="w-12 h-12 rounded-sm bg-cream border border-line flex items-center justify-center text-gold">
              <Target className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold font-semibold">
                Our Mission
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-ink font-normal">
                Turning Dreams into Reality Through Engineering Purity
              </h2>
            </div>

            <p className="text-sm text-stone font-light leading-relaxed">
              To conceptualize, construct, and deliver high-quality residential sanctuaries, bustling retail high streets, and monumental sports and civic destinations on schedule, utilizing progressive engineering methodologies, sustainable materials, and customer-first care.
            </p>

            <ul className="space-y-2.5 pt-4 border-t border-line text-xs text-stone font-light">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Adhering strictly to uncompromising quality and safety protocols.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Fostering continuous long-term value for investors and homeowners alike.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The 6 Core Values */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold block">
                The Omaxe Ethos
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                Our Foundational Values
              </h2>
            </div>
            <p className="text-xs text-stone max-w-md font-light">
              The six non-negotiable principles that guide our engineers, architects, managers, and board members every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-7 bg-ivory border border-line rounded-sm space-y-4 hover:border-gold transition-colors shadow-soft"
                >
                  <div className="w-10 h-10 rounded-sm bg-cream border border-line flex items-center justify-center text-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg text-ink font-normal">
                    {val.title}
                  </h3>
                  <p className="text-xs text-stone font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic Commitments Banner */}
        <div className="bg-ink text-cream rounded-sm p-8 sm:p-12 border border-cream/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gold">
              Responsible Corporate Citizenship
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-cream">
              Committed to Sustainable &amp; Inclusive Growth
            </h3>
            <p className="text-xs text-stone font-light leading-relaxed">
              Explore our strict quality policies, environmental certifications, and zero-tolerance engineering audit guidelines.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Button
              to="/about-us/quality-policy"
              variant="gold-outline"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Inspect Quality Policy
            </Button>
            <Button
              onClick={() => onOpenEnquiry('ESG & Corporate Governance Information')}
              variant="secondary"
              size="sm"
              className="!border-cream/30 !text-cream hover:!bg-cream hover:!text-ink"
            >
              Inquire Corporate Affairs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
