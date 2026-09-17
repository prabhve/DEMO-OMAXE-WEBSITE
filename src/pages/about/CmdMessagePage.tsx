import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Quote,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { LEADERSHIP } from '../../data/company';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';

interface CmdMessagePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const CmdMessagePage: React.FC<CmdMessagePageProps> = ({ onOpenEnquiry }) => {
  const chairman = LEADERSHIP.find((l) => l.id === 'rohtaas-goel') || LEADERSHIP[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Chairman’s Message | Mr. Rohtaas Goel - Omaxe Limited";
  }, []);

  return (
    <div className="pt-28 pb-24 bg-cream text-ink min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-16">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Corporate Heritage', to: '/about-us' },
            { label: 'Chairman’s Statement' },
          ]}
        />

        {/* Hero Banner */}
        <div className="relative rounded-sm overflow-hidden bg-ink text-cream border border-cream/10 p-8 sm:p-14 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(#A8823C_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gold/15 border border-gold/40 text-gold text-xs font-medium uppercase tracking-[0.2em]">
              <Quote className="w-3.5 h-3.5" />
              <span>Chairman’s Desk · Corporate Address</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-cream leading-tight">
              Building with Purpose, Nurturing Generations
            </h1>

            <p className="text-sm sm:text-base text-stone leading-relaxed font-light">
              "A house is built with steel, bricks, and concrete; but a home, a neighborhood, and a community are built with empathy, integrity, and timeless commitment."
            </p>
          </div>
        </div>

        {/* Letter Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Chairman Portrait & Credentials Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-ivory border border-line rounded-sm p-6 space-y-4 shadow-soft">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-ink-soft border border-line">
                <img
                  src={chairman.image}
                  alt={chairman.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-1 text-center">
                <h3 className="font-display text-xl text-ink font-normal">
                  {chairman.name}
                </h3>
                <p className="text-xs text-gold font-serif italic">
                  Founder &amp; Chairman
                </p>
                <p className="text-[11px] text-stone font-light pt-1">
                  Former President, NAREDCO (Govt. of India)
                </p>
              </div>

              <div className="pt-4 border-t border-line space-y-2 text-xs text-stone font-light">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-ink">Inception:</span>
                  <span>1987</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-ink">Delivered Space:</span>
                  <span>13.02M sq.mtr.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-ink">Families Housed:</span>
                  <span>150,000+</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/about-us/leadership-team/${chairman.id}`}
                  className="w-full py-2 px-3 rounded-sm bg-cream border border-line text-ink hover:border-gold hover:text-gold text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>View Full Executive Bio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Core Tenets Widget */}
            <div className="bg-ivory border border-line rounded-sm p-6 space-y-4">
              <div className="text-[10px] uppercase font-mono tracking-wider text-gold font-semibold">
                Guiding Maxims
              </div>
              <ul className="space-y-3 text-xs text-stone font-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Honoring commitments before chasing profitability.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Democratizing world-class infrastructure in regional Bharat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Preserving environmental vitality for future generations.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Letter Narrative Body */}
          <div className="lg:col-span-8 bg-ivory border border-line rounded-sm p-8 sm:p-12 space-y-8 shadow-soft">
            <div className="border-b border-line pb-6 space-y-1">
              <div className="text-xs uppercase font-mono tracking-wider text-stone">
                From the Desk of the Chairman
              </div>
              <div className="font-display text-2xl sm:text-3xl text-ink font-normal">
                Dear Friends, Homeowners, and Valued Partners,
              </div>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-stone font-light leading-relaxed">
              <p>
                When I commenced this journey in 1987 with a modest civil contracting firm, India’s infrastructure landscape was fundamentally different. What has remained immutable across these four decades is our unshakeable belief that real estate is not merely a commercial business of cement and steel, but a noble instrument of nation-building.
              </p>

              <div className="relative p-6 bg-cream border-l-2 border-gold rounded-r-sm my-6">
                <p className="font-serif italic text-base sm:text-lg text-ink">
                  "Every foundation we cast is a sacred pledge between Omaxe and a family investing their life’s savings and dreams into our hands."
                </p>
              </div>

              <p>
                At the turn of the century, as rapid urbanization began to redefine India, most development remained barricaded within the few metropolitan cities. We asked ourselves a simple yet audacious question: Why should families in Lucknow, Indore, Ludhiana, New Chandigarh, or Faridabad not enjoy the same wide tree-lined boulevards, dependable underground utilities, multi-tier security, and modern leisure clubhouses that global capitals boast?
              </p>

              <p>
                That conviction birthed Omaxe’s regional township revolution. Over the years, we have had the privilege of transforming over 13.02 million square meters of raw land into vibrant, self-sustaining communities that today echo with the laughter of more than 150,000 families.
              </p>

              <p>
                Today, as India strides confidently toward becoming a global economic vanguard, Omaxe is writing its next chapters through transformative Public-Private Partnerships. From restoring vehicular harmony and retail grandeur in Old Delhi with <em>Omaxe Chowk</em>, to creating North India’s premier 50.4-acre integrated sports and commercial district at <em>The Omaxe State</em> in Dwarka with the Delhi Development Authority, we continue to break new ground.
              </p>

              <p>
                As we honor our past, we remain steadfast in embracing green construction technologies, biophilic architectural designs, and unyielding corporate governance. I extend my deepest personal gratitude to every homeowner, our institutional partners, our vendors, and our dedicated team of engineers and professionals who turn this dream into reality every single day.
              </p>
            </div>

            {/* Formal Signature Block */}
            <div className="pt-8 border-t border-line flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="font-serif italic text-2xl text-ink font-medium tracking-wide">
                  Rohtaas Goel
                </div>
                <div className="text-xs text-ink font-medium">
                  Mr. Rohtaas Goel
                </div>
                <div className="text-[11px] text-stone font-light">
                  Founder &amp; Chairman, Omaxe Limited
                </div>
                <div className="text-[10px] text-gold font-mono uppercase tracking-wider">
                  New Delhi, India
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  to="/about-us/leadership-team"
                  variant="secondary"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Meet the Board
                </Button>
                <Button
                  onClick={() => onOpenEnquiry('Chairman Office Consultation')}
                  variant="gold-outline"
                  size="sm"
                >
                  Write to Office
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
