import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass, PhoneCall, Building2, Search } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';

interface NotFoundPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="bg-cream min-h-screen pt-28 pb-20 flex flex-col justify-center">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full py-12">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: '404 Page Not Found' },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-xs text-[11px] font-mono uppercase tracking-widest text-gold">
              <span>Status 404 · Uncharted Route</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl text-ink font-normal leading-[1.1]">
              The Destination You Seek Remains Unbuilt.
            </h1>

            <p className="text-stone text-sm sm:text-base leading-relaxed max-w-xl font-light">
              The architectural coordinates you followed do not correspond to an active master plan. It may have been relocated, archived, or temporarily withdrawn for ongoing refinement.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button to="/" variant="primary" size="md" className="min-h-[44px]">
                <Home className="w-4 h-4 mr-2" />
                <span>Return to Homepage</span>
              </Button>
              <Button to="/projects" variant="secondary" size="md" className="min-h-[44px]">
                <Compass className="w-4 h-4 mr-2" />
                <span>Browse All Projects</span>
              </Button>
              <Button
                onClick={() => onOpenEnquiry('404 Assistance')}
                variant="gold-outline"
                size="md"
                className="min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4 mr-2 text-gold" />
                <span>Consult Concierge</span>
              </Button>
            </div>
          </div>

          {/* Right Quick Nav Card */}
          <div className="lg:col-span-5">
            <div className="p-8 bg-ivory border border-line rounded-sm shadow-soft space-y-6">
              <div className="border-b border-line pb-4">
                <span className="text-[10px] uppercase tracking-wider text-gold font-medium block">
                  Curated Destinations
                </span>
                <h3 className="font-display text-xl text-ink font-medium mt-1">
                  Popular Portals
                </h3>
              </div>

              <ul className="space-y-3 text-xs">
                <li>
                  <Link
                    to="/projects?category=residential"
                    className="flex items-center justify-between p-3 bg-cream hover:bg-gold/10 border border-line hover:border-gold/40 rounded-sm transition-colors group min-h-[44px]"
                  >
                    <span className="font-medium text-ink group-hover:text-gold transition-colors">
                      Luxury Residential Residences
                    </span>
                    <span className="text-[11px] text-stone">Explore →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects?category=commercial"
                    className="flex items-center justify-between p-3 bg-cream hover:bg-gold/10 border border-line hover:border-gold/40 rounded-sm transition-colors group min-h-[44px]"
                  >
                    <span className="font-medium text-ink group-hover:text-gold transition-colors">
                      Commercial Landmarks &amp; Retail
                    </span>
                    <span className="text-[11px] text-stone">Explore →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/investor"
                    className="flex items-center justify-between p-3 bg-cream hover:bg-gold/10 border border-line hover:border-gold/40 rounded-sm transition-colors group min-h-[44px]"
                  >
                    <span className="font-medium text-ink group-hover:text-gold transition-colors">
                      Investor Relations Hub
                    </span>
                    <span className="text-[11px] text-stone">BSE / NSE →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/nri-corner"
                    className="flex items-center justify-between p-3 bg-cream hover:bg-gold/10 border border-line hover:border-gold/40 rounded-sm transition-colors group min-h-[44px]"
                  >
                    <span className="font-medium text-ink group-hover:text-gold transition-colors">
                      NRI Wealth Advisory Desk
                    </span>
                    <span className="text-[11px] text-stone">Global Desk →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="flex items-center justify-between p-3 bg-cream hover:bg-gold/10 border border-line hover:border-gold/40 rounded-sm transition-colors group min-h-[44px]"
                  >
                    <span className="font-medium text-ink group-hover:text-gold transition-colors">
                      Corporate Headquarters &amp; Branches
                    </span>
                    <span className="text-[11px] text-stone">Directory →</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
