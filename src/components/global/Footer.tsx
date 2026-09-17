import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Facebook, Linkedin, Youtube, Instagram, Twitter } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/company';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-ink text-cream border-t border-ink-soft">
      {/* Newsletter Capture Row */}
      <div className="border-b border-cream/10">
        <div className="max-w-[1360px] mx-auto px-8 lg:px-16 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                Private Dispatch
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[40px] text-cream font-light leading-tight tracking-[-0.02em]">
                Receive curated property insights &amp; previews.
              </h3>
            </div>

            <div className="lg:col-span-6">
              {newsletterSubscribed ? (
                <div className="flex items-center gap-3 text-gold py-3 text-sm">
                  <Check className="w-5 h-5 text-gold" />
                  <span>Thank you. You have been registered for private communications.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address for curated property insights
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-ink-soft/80 border border-cream/20 px-5 py-3.5 min-h-[44px] text-sm text-cream placeholder:text-stone focus:border-gold outline-none rounded-sm transition-colors"
                  />
                  <button
                    type="submit"
                    className="btn-luxury-gold px-8 py-3.5 min-h-[44px] text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap rounded-sm cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 5 Columns + Disclosures */}
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16 py-24 sm:py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 sm:gap-12">
          {/* Column 1: About Us */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
              About Omaxe
            </h4>
            <ul className="space-y-2.5 text-xs text-stone">
              <li>
                <Link to="/about-us" className="hover:text-cream transition-colors duration-200">
                  Our Legacy
                </Link>
              </li>
              <li>
                <Link to="/about-us/leadership-team" className="hover:text-cream transition-colors duration-200">
                  Leadership Team
                </Link>
              </li>
              <li>
                <Link to="/about-us/cmd-message" className="hover:text-cream transition-colors duration-200">
                  Chairman&apos;s Message
                </Link>
              </li>
              <li>
                <Link to="/about-us/mission-and-vision" className="hover:text-cream transition-colors duration-200">
                  Mission &amp; Vision
                </Link>
              </li>
              <li>
                <Link to="/about-us/quality-policy" className="hover:text-cream transition-colors duration-200">
                  Quality Policy
                </Link>
              </li>
              <li>
                <Link to="/about-us/awards-and-honors" className="hover:text-cream transition-colors duration-200">
                  Awards &amp; Honors
                </Link>
              </li>
              <li>
                <Link to="/about-us/success-story" className="hover:text-cream transition-colors duration-200">
                  Success Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Projects */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
              Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs text-stone">
              <li>
                <Link to="/projects?category=residential" className="hover:text-cream transition-colors duration-200">
                  Residential Residences
                </Link>
              </li>
              <li>
                <Link to="/projects?category=commercial" className="hover:text-cream transition-colors duration-200">
                  Commercial Destinations
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cream transition-colors duration-200">
                  All Master-Plans
                </Link>
              </li>
              <li>
                <Link to="/projects?status=Ready+to+Move" className="hover:text-cream transition-colors duration-200">
                  Ready to Move
                </Link>
              </li>
              <li>
                <Link to="/projects?status=Under+Construction" className="hover:text-cream transition-colors duration-200">
                  Under Construction
                </Link>
              </li>
              <li>
                <Link to="/nri-corner" className="hover:text-cream transition-colors duration-200">
                  NRI Investment Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Investors */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
              Investor Relations
            </h4>
            <ul className="space-y-2.5 text-xs text-stone">
              <li>
                <Link to="/investor" className="hover:text-cream transition-colors duration-200">
                  IR Overview
                </Link>
              </li>
              <li>
                <Link to="/investor?tab=annual-reports" className="hover:text-cream transition-colors duration-200">
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link to="/investor?tab=financials" className="hover:text-cream transition-colors duration-200">
                  Financial Results
                </Link>
              </li>
              <li>
                <Link to="/investor?tab=governance" className="hover:text-cream transition-colors duration-200">
                  Corporate Governance
                </Link>
              </li>
              <li>
                <Link to="/investor?tab=shareholding" className="hover:text-cream transition-colors duration-200">
                  Shareholding Pattern
                </Link>
              </li>
              <li>
                <Link to="/investor?tab=contact" className="hover:text-cream transition-colors duration-200">
                  Investor Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Locations */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
              Key Locations
            </h4>
            <ul className="space-y-2.5 text-xs text-stone">
              <li>
                <Link to="/properties-in/new-delhi" className="hover:text-cream transition-colors duration-200">
                  New Delhi
                </Link>
              </li>
              <li>
                <Link to="/properties-in/new-chandigarh" className="hover:text-cream transition-colors duration-200">
                  New Chandigarh
                </Link>
              </li>
              <li>
                <Link to="/properties-in/lucknow" className="hover:text-cream transition-colors duration-200">
                  Lucknow
                </Link>
              </li>
              <li>
                <Link to="/properties-in/ludhiana" className="hover:text-cream transition-colors duration-200">
                  Ludhiana
                </Link>
              </li>
              <li>
                <Link to="/properties-in/faridabad" className="hover:text-cream transition-colors duration-200">
                  Faridabad
                </Link>
              </li>
              <li>
                <Link to="/properties-in/indore" className="hover:text-cream transition-colors duration-200">
                  Indore
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Omaxe Care */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
              Omaxe Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone">
              <li>
                <Link to="/care/omaxe-care" className="hover:text-cream transition-colors duration-200">
                  Customer Care
                </Link>
              </li>
              <li>
                <Link to="/care/buyers-guide" className="hover:text-cream transition-colors duration-200">
                  Buyer&apos;s Guide
                </Link>
              </li>
              <li>
                <Link to="/care/vendors" className="hover:text-cream transition-colors duration-200">
                  Vendor Empanelment
                </Link>
              </li>
              <li>
                <Link to="/business-associate" className="hover:text-cream transition-colors duration-200">
                  Business Associates
                </Link>
              </li>
              <li>
                <Link to="/career/current-openings" className="hover:text-cream transition-colors duration-200">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-cream transition-colors duration-200">
                  Concierge &amp; Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Compliance & Disclosures */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
              Disclosures
            </h4>
            <ul className="space-y-2.5 text-xs text-stone">
              <li>
                <Link to="/compliance" className="hover:text-cream transition-colors duration-200 flex items-center gap-1">
                  <span>Compliance &amp; Approvals</span>
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="hover:text-cream transition-colors duration-200 flex items-center gap-1">
                  <span>Environment Clearance</span>
                </Link>
              </li>
              <li>
                <Link to="/csr" className="hover:text-cream transition-colors duration-200 flex items-center gap-1">
                  <span>CSR &amp; Foundation</span>
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-cream transition-colors duration-200 flex items-center gap-1">
                  <span>Video Testimonials</span>
                </Link>
              </li>
              <li>
                <Link to="/investor?tab=governance" className="hover:text-cream transition-colors duration-200">
                  Whistleblower Policy
                </Link>
              </li>
              <li>
                <Link to="/media/press-releases" className="hover:text-cream transition-colors duration-200">
                  Media &amp; Press Releases
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cream transition-colors duration-200">
                  The Omaxe Journal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Address & Stock ticker row */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-stone">
          <div>
            <span className="text-cream font-medium">Registered Office: </span>
            <span>{COMPANY_DETAILS.headquarters}</span>
          </div>
          <div className="flex items-center gap-6">
            <span>BSE: <strong className="text-cream">{COMPANY_DETAILS.bseCode}</strong></span>
            <span>NSE: <strong className="text-cream">{COMPANY_DETAILS.nseSymbol}</strong></span>
            <span>CIN: <strong className="text-cream">{COMPANY_DETAILS.cin}</strong></span>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal links, Socials */}
        <div className="mt-8 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-stone">
            &copy; {new Date().getFullYear()} Omaxe Limited. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-stone">
            <Link to="/privacy-policy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-cream transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/disclaimer" className="hover:text-cream transition-colors">
              Disclaimer
            </Link>
            <Link to="/sitemap" className="hover:text-cream transition-colors">
              Sitemap
            </Link>
            <Link to="/admin" className="hover:text-gold text-stone/70 transition-colors">
              Admin Portal
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={COMPANY_DETAILS.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Omaxe on Facebook"
              className="text-stone hover:text-gold transition-colors duration-200"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_DETAILS.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Omaxe on LinkedIn"
              className="text-stone hover:text-gold transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_DETAILS.social.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Omaxe on X"
              className="text-stone hover:text-gold transition-colors duration-200"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_DETAILS.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Omaxe on YouTube"
              className="text-stone hover:text-gold transition-colors duration-200"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_DETAILS.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Omaxe on Instagram"
              className="text-stone hover:text-gold transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Verbatim Disclaimer */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <p className="text-[11px] text-stone/70 leading-[1.75] font-light max-w-[62ch]">
            {COMPANY_DETAILS.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
