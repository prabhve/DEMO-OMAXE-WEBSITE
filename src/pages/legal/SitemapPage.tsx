import React from 'react';
import { Link } from 'react-router-dom';
import { Network, ExternalLink, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';

interface SitemapSection {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}

const SITEMAP_DATA: SitemapSection[] = [
  {
    title: 'About Omaxe',
    links: [
      { label: 'Corporate Profile', href: '/about-us' },
      { label: 'Board of Directors & Leadership', href: '/about-us/leadership-team' },
      { label: "Chairman & Managing Director's Message", href: '/about-us/cmd-message' },
      { label: 'Mission, Vision & Core Values', href: '/about-us/mission-and-vision' },
      { label: 'Quality & Environmental Policy', href: '/about-us/quality-policy' },
      { label: 'Awards, Accreditations & Honors', href: '/about-us/awards-and-honors' },
      { label: 'Four Decades Success Story', href: '/about-us/success-story' },
    ],
  },
  {
    title: 'Featured Projects & Corridors',
    links: [
      { label: 'All Projects Showcase', href: '/projects' },
      { label: 'The Omaxe State, Sector 19B, Dwarka, New Delhi', href: '/project/the-omaxe-state-dwarka', badge: 'Flagship PPP' },
      { label: 'The Lake, New Chandigarh', href: '/project/the-lake-new-chandigarh' },
      { label: 'Omaxe Chowk, Chandni Chowk, Delhi', href: '/project/omaxe-chowk-delhi' },
      { label: 'The Forest Spa, Faridabad', href: '/project/the-forest-spa-faridabad' },
      { label: 'The Legends, Lucknow', href: '/project/the-legends-lucknow' },
      { label: 'The Royal Meridian, Ludhiana', href: '/project/the-royal-meridian-ludhiana' },
      { label: 'Omaxe City 1, Indore', href: '/project/omaxe-city-1-indore' },
      { label: 'Omaxe World Street, Faridabad', href: '/project/omaxe-world-street-faridabad' },
      { label: 'Krishna Crest, Vrindavan', href: '/project/krishna-crest-vrindavan' },
      { label: 'Omaxe Connaught Place, Greater Noida', href: '/project/omaxe-connaught-place-noida' },
    ],
  },
  {
    title: 'Investor Relations Hub',
    links: [
      { label: 'Investor Relations Overview', href: '/investor-relations' },
      { label: 'Quarterly Financial Results', href: '/investor-relations/financial-results' },
      { label: 'Statutory Annual Reports', href: '/investor-relations/annual-reports' },
      { label: 'Shareholding Pattern Disclosures', href: '/investor-relations/shareholding-pattern' },
      { label: 'Corporate Governance & Committees', href: '/investor-relations/corporate-governance' },
      { label: 'Stock Exchange Quotations (BSE & NSE)', href: '/investor-relations/stock-information' },
      { label: 'Investor Contacts & Grievance Redressal', href: '/investor-relations/investor-contacts' },
    ],
  },
  {
    title: 'Media Center',
    links: [
      { label: 'Official Press Releases', href: '/media/press-releases' },
      { label: 'Print & Digital Editorial News', href: '/media/print-coverage' },
      { label: 'Electronic & Broadcast Video Media', href: '/media/electronic-media' },
      { label: 'Brand Advertising Campaigns', href: '/media/campaigns' },
      { label: 'Ground Conclaves & Launches', href: '/media/events' },
      { label: 'Media Kit & High-Res Brand Assets', href: '/media/media-kit' },
    ],
  },
  {
    title: 'Global Indians & Partners',
    links: [
      { label: 'NRI Corner & Wealth Advisory', href: '/nri-corner' },
      { label: 'Channel Partner & Business Associate Program', href: '/business-associate' },
      { label: 'Vendor & Contractor Empanelment', href: '/care/vendor-empanelment' },
    ],
  },
  {
    title: 'Careers & Culture',
    links: [
      { label: 'Life at Omaxe & Culture', href: '/career/life-at-omaxe' },
      { label: 'Current Career Opportunities', href: '/career/current-openings' },
    ],
  },
  {
    title: 'Omaxe Care & Client Knowledge',
    links: [
      { label: 'Customer Care Desk & Service Requests', href: '/care/customer-care' },
      { label: "The Intelligent Buyer's Guide & EMI Calculator", href: '/care/buyers-guide' },
      { label: 'The Omaxe Journal (Essays & Insights)', href: '/blog' },
      { label: 'Contact Us & Pan-India Offices', href: '/contact-us' },
    ],
  },
  {
    title: 'Statutory, Legal & Compliance',
    links: [
      { label: 'Privacy Policy (DPDP Act)', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Statutory Disclaimers', href: '/disclaimer' },
      { label: 'RERA Registrations & Statutory Disclosures', href: '/disclosures' },
      { label: 'XML & HTML Website Sitemap', href: '/sitemap' },
    ],
  },
];

export const SitemapPage: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Website Sitemap' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Complete Digital Architecture Directory
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Website Sitemap
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Hierarchical index of all public corporate sections, project portfolios, investor archives, and regulatory resources across Omaxe.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SITEMAP_DATA.map((sec, idx) => (
            <div key={idx} className="p-6 bg-ivory border border-line rounded-sm space-y-4">
              <h3 className="font-display text-base text-ink font-medium border-b border-line pb-2.5">
                {sec.title}
              </h3>
              <ul className="space-y-2.5 text-xs text-stone">
                {sec.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      to={link.href}
                      className="group flex items-start gap-1.5 hover:text-gold transition-colors leading-relaxed"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                      <span>
                        {link.label}
                        {link.badge && (
                          <span className="ml-1.5 px-1.5 py-0.2 bg-gold/15 text-gold text-[9px] font-mono uppercase tracking-wider rounded-xs">
                            {link.badge}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
