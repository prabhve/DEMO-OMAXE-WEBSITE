import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown, Menu, X, ArrowRight, MapPin } from 'lucide-react';
import { CITIES } from '../../data/cities';
import { PROJECTS } from '../../data/projects';
import { COMPANY_DETAILS } from '../../data/company';
import { ProjectCategory } from '../../types';

interface HeaderProps {
  onOpenEnquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<ProjectCategory | null>(null);
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>('new-delhi');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Determine if we're on homepage where hero starts transparent
  const isHomePage = location.pathname === '/';

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega-menu and mobile menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsAboutHovered(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnterNav = (category: ProjectCategory) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(category);
    // Find first city with this category
    const validCities = CITIES.filter((c) =>
      category === 'residential' ? c.residentialCount > 0 : c.commercialCount > 0
    );
    if (validCities.length > 0 && !validCities.some((c) => c.slug === selectedCitySlug)) {
      setSelectedCitySlug(validCities[0].slug);
    }
  };

  const handleMouseLeaveNav = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const isTransparent = isHomePage && !isScrolled && !activeMegaMenu;

  // Filter cities for current mega menu category
  const filteredCities = CITIES.filter((city) => {
    if (!activeMegaMenu) return false;
    return activeMegaMenu === 'residential'
      ? city.residentialCount > 0
      : city.commercialCount > 0;
  });

  // Selected city object
  const currentCity = CITIES.find((c) => c.slug === selectedCitySlug) || filteredCities[0] || CITIES[0];

  // Projects in this city and category
  const cityProjects = PROJECTS.filter(
    (p) =>
      p.category === activeMegaMenu &&
      (p.city || '').toLowerCase() === (currentCity?.name || '').toLowerCase()
  );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-luxury ${
          isTransparent
            ? 'bg-transparent text-cream py-6'
            : 'bg-cream/98 backdrop-blur-md text-ink border-b border-line py-3.5 shadow-sm'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            to="/"
            className="group flex flex-col items-start focus-visible:outline-none"
            aria-label="Omaxe Limited Home"
          >
            <span
              className={`font-display text-2xl sm:text-[28px] tracking-[0.22em] font-normal uppercase transition-colors duration-300 ${
                isTransparent ? 'text-cream group-hover:text-gold-soft' : 'text-ink group-hover:text-gold'
              }`}
            >
              OMAXE
            </span>
            <span
              className={`text-[8px] uppercase tracking-[0.3em] font-medium transition-colors duration-300 ${
                isTransparent ? 'text-cream/70' : 'text-stone'
              }`}
            >
              Turning Dreams into Reality
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8" aria-label="Main Navigation">
            {/* Residential with MegaMenu */}
            <div
              className="relative py-2"
              onMouseEnter={() => handleMouseEnterNav('residential')}
              onMouseLeave={handleMouseLeaveNav}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 cursor-pointer ${
                  activeMegaMenu === 'residential'
                    ? 'text-gold'
                    : isTransparent
                    ? 'text-cream hover:text-gold'
                    : 'text-ink hover:text-gold'
                }`}
              >
                <span>Residential</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMegaMenu === 'residential' ? 'rotate-180 text-gold' : ''}`} />
              </button>
            </div>

            {/* Commercial with MegaMenu */}
            <div
              className="relative py-2"
              onMouseEnter={() => handleMouseEnterNav('commercial')}
              onMouseLeave={handleMouseLeaveNav}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 cursor-pointer ${
                  activeMegaMenu === 'commercial'
                    ? 'text-gold'
                    : isTransparent
                    ? 'text-cream hover:text-gold'
                    : 'text-ink hover:text-gold'
                }`}
              >
                <span>Commercial</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMegaMenu === 'commercial' ? 'rotate-180 text-gold' : ''}`} />
              </button>
            </div>

            <Link
              to="/projects"
              className={`text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                isTransparent ? 'text-cream hover:text-gold' : 'text-ink hover:text-gold'
              }`}
            >
              All Projects
            </Link>

            {/* About Us with Flyout Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsAboutHovered(true)}
              onMouseLeave={() => setIsAboutHovered(false)}
            >
              <Link
                to="/about-us"
                className={`flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                  isTransparent ? 'text-cream hover:text-gold' : 'text-ink hover:text-gold'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-3 h-3 text-gold/80 transition-transform duration-200" />
              </Link>

              {/* Desktop About Us Flyout Dropdown */}
              {isAboutHovered && (
                <div className="absolute top-full left-0 w-72 pt-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-cream border border-line rounded-sm p-3 shadow-lift space-y-1">
                    <Link
                      to="/about-us"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Corporate Heritage</div>
                      <div className="text-[10px] text-stone font-light">Four decades of turning dreams into reality</div>
                    </Link>
                    <Link
                      to="/about-us/leadership-team"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Leadership Team &amp; Board</div>
                      <div className="text-[10px] text-stone font-light">Executive profiles of our directors</div>
                    </Link>
                    <Link
                      to="/about-us/cmd-message"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Chairman’s Statement</div>
                      <div className="text-[10px] text-stone font-light">From Founder Mr. Rohtaas Goel</div>
                    </Link>
                    <Link
                      to="/about-us/mission-and-vision"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Mission, Vision &amp; Ethos</div>
                      <div className="text-[10px] text-stone font-light">Our foundational core values</div>
                    </Link>
                    <Link
                      to="/about-us/quality-policy"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Quality Policy &amp; Standards</div>
                      <div className="text-[10px] text-stone font-light">5-stage audit and ISO accreditations</div>
                    </Link>
                    <Link
                      to="/about-us/awards-and-honors"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Awards &amp; Accolades</div>
                      <div className="text-[10px] text-stone font-light">Timeline of national recognitions</div>
                    </Link>
                    <Link
                      to="/about-us/success-story"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Our Success Story</div>
                      <div className="text-[10px] text-stone font-light">The 1987 to 2026 milestone journey</div>
                    </Link>
                    <Link
                      to="/csr"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">CSR &amp; Omaxe Foundation</div>
                      <div className="text-[10px] text-stone font-light">Health, education, and community stewardship</div>
                    </Link>
                    <Link
                      to="/compliance"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Compliance &amp; Disclosures</div>
                      <div className="text-[10px] text-stone font-light">Environmental clearances &amp; layout approvals</div>
                    </Link>
                    <Link
                      to="/testimonials"
                      className="block px-3 py-2 text-xs font-medium text-ink hover:text-gold hover:bg-ivory rounded-sm transition-colors"
                    >
                      <div className="font-medium">Video Testimonials</div>
                      <div className="text-[10px] text-stone font-light">Client stories of trust and pride</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/investor"
              className={`text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                isTransparent ? 'text-cream hover:text-gold' : 'text-ink hover:text-gold'
              }`}
            >
              Investors
            </Link>

            <Link
              to="/nri-corner"
              className={`text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                isTransparent ? 'text-cream hover:text-gold' : 'text-ink hover:text-gold'
              }`}
            >
              NRI Corner
            </Link>

            <Link
              to="/media/press-releases"
              className={`text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                isTransparent ? 'text-cream hover:text-gold' : 'text-ink hover:text-gold'
              }`}
            >
              Media
            </Link>

            <Link
              to="/care/omaxe-care"
              className={`text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                isTransparent ? 'text-cream hover:text-gold' : 'text-ink hover:text-gold'
              }`}
            >
              Care
            </Link>

            <Link
              to="/contact-us"
              className={`text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                isTransparent ? 'text-cream hover:text-gold' : 'text-ink hover:text-gold'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            {/* Phone */}
            <a
              href={`tel:${COMPANY_DETAILS.salesPhone.replace(/\s+/g, '')}`}
              className={`hidden md:flex items-center gap-2 text-xs font-medium tracking-wide transition-colors duration-300 ${
                isTransparent ? 'text-cream/90 hover:text-cream' : 'text-ink/90 hover:text-gold'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{COMPANY_DETAILS.salesPhone}</span>
            </a>

            {/* Enquire Button */}
            <button
              onClick={onOpenEnquiry}
              className="btn-luxury-gold px-6 py-2.5 min-h-[44px] flex items-center justify-center text-[11px] font-medium uppercase tracking-[0.14em] rounded-sm cursor-pointer"
            >
              Enquire
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={`xl:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors cursor-pointer rounded-xs ${
                isTransparent ? 'text-cream' : 'text-ink'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMegaMenu && (
          <div
            className="hidden xl:block absolute top-full inset-x-0 bg-cream border-b border-line shadow-2xl py-8 px-12 transition-all duration-300 ease-luxury"
            onMouseEnter={() => {
              if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeaveNav}
          >
            <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-8">
              {/* Left Column: Scrollable Cities */}
              <div className="col-span-3 border-r border-line pr-6 max-h-[380px] overflow-y-auto luxury-scrollbar">
                <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-gold mb-3">
                  Select Market ({filteredCities.length} Cities)
                </p>
                <div className="space-y-1">
                  {filteredCities.map((city) => (
                    <button
                      key={city.slug}
                      type="button"
                      onMouseEnter={() => setSelectedCitySlug(city.slug)}
                      onClick={() => setSelectedCitySlug(city.slug)}
                      className={`w-full text-left px-3 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors duration-200 flex items-center justify-between cursor-pointer ${
                        selectedCitySlug === city.slug
                          ? 'bg-ink text-cream'
                          : 'text-stone hover:text-ink hover:bg-line/40'
                      }`}
                    >
                      <span>{city.name}</span>
                      <span className={`text-[10px] ${selectedCitySlug === city.slug ? 'text-gold' : 'text-stone/60'}`}>
                        {activeMegaMenu === 'residential' ? city.residentialCount : city.commercialCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Project Cards Grid for selected City */}
              <div className="col-span-9 flex flex-col justify-between pl-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-display text-2xl text-ink font-normal">
                        {currentCity?.name} {activeMegaMenu === 'residential' ? 'Residential' : 'Commercial'} Properties
                      </h4>
                      <p className="text-xs text-stone">{currentCity?.description}</p>
                    </div>
                    <Link
                      to={`/properties-in/${currentCity?.slug}?category=${activeMegaMenu}`}
                      className="link-tertiary text-xs"
                      onClick={() => setActiveMegaMenu(null)}
                    >
                      <span>Explore {currentCity?.name}</span>
                      <ArrowRight className="w-3 h-3 text-gold" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-5">
                    {cityProjects.length > 0 ? (
                      cityProjects.slice(0, 3).map((project) => (
                        <Link
                          key={project.id}
                          to={`/projects/${project.category}/${(project.city || 'all').toLowerCase().replace(/\s+/g, '-')}/${project.slug}`}
                          onClick={() => setActiveMegaMenu(null)}
                          className="group block bg-ivory border border-line rounded-sm overflow-hidden hover:shadow-md transition-all duration-300"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-ink-soft">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-wider font-medium bg-ink/80 text-cream px-2 py-0.5 rounded-sm">
                              {project.status}
                            </span>
                          </div>
                          <div className="p-3.5">
                            <h5 className="font-display text-base text-ink font-normal group-hover:text-gold transition-colors line-clamp-1">
                              {project.title}
                            </h5>
                            <p className="text-[11px] text-stone line-clamp-1 mt-0.5">
                              {project.configuration}
                            </p>
                            <span className="text-[11px] font-medium text-gold block mt-2">
                              {project.priceStarting}
                            </span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-3 py-10 text-center bg-ivory border border-line rounded-sm">
                        <p className="text-xs text-stone">
                          Additional master-planned developments in {currentCity?.name} are being prepared for public release.
                        </p>
                        <Link
                          to={`/properties-in/${currentCity?.slug}`}
                          className="link-tertiary mt-3"
                          onClick={() => setActiveMegaMenu(null)}
                        >
                          View City Overview
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom row in MegaMenu */}
                <div className="pt-4 mt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs text-stone">
                    Need personalised recommendations in {currentCity?.name}?
                  </span>
                  <button
                    onClick={() => {
                      setActiveMegaMenu(null);
                      onOpenEnquiry();
                    }}
                    className="text-xs font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-soft cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Request City Portfolio</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 bg-cream text-ink flex flex-col overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="p-6 border-b border-line flex items-center justify-between">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col">
              <span className="font-display text-2xl tracking-[0.2em] font-normal uppercase text-ink">
                OMAXE
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] font-medium text-stone">
                Turning Dreams into Reality
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation"
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-ink hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6 space-y-4 flex-1">
            {/* Residential Accordion */}
            <div className="border-b border-line pb-2">
              <button
                onClick={() =>
                  setMobileAccordion((prev) => (prev === 'residential' ? null : 'residential'))
                }
                className="w-full min-h-[44px] flex items-center justify-between text-left py-2 font-display text-2xl text-ink"
              >
                <span>Residential</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    mobileAccordion === 'residential' ? 'rotate-180 text-gold' : 'text-stone'
                  }`}
                />
              </button>
              {mobileAccordion === 'residential' && (
                <div className="pt-2 pl-4 space-y-2">
                  <Link
                    to="/projects?category=residential"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs uppercase tracking-wider text-gold font-medium py-1"
                  >
                    View All Residential Projects →
                  </Link>
                  <div className="grid grid-cols-1 gap-1 pt-1">
                    {CITIES.filter((c) => c.residentialCount > 0)
                      .slice(0, 10)
                      .map((c) => (
                        <Link
                          key={c.slug}
                          to={`/properties-in/${c.slug}?category=residential`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="min-h-[44px] flex items-center text-xs text-stone hover:text-ink py-1"
                        >
                          {c.name} ({c.residentialCount})
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Commercial Accordion */}
            <div className="border-b border-line pb-2">
              <button
                onClick={() =>
                  setMobileAccordion((prev) => (prev === 'commercial' ? null : 'commercial'))
                }
                className="w-full min-h-[44px] flex items-center justify-between text-left py-2 font-display text-2xl text-ink"
              >
                <span>Commercial</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    mobileAccordion === 'commercial' ? 'rotate-180 text-gold' : 'text-stone'
                  }`}
                />
              </button>
              {mobileAccordion === 'commercial' && (
                <div className="pt-2 pl-4 space-y-2">
                  <Link
                    to="/projects?category=commercial"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs uppercase tracking-wider text-gold font-medium py-1"
                  >
                    View All Commercial Projects →
                  </Link>
                  <div className="grid grid-cols-1 gap-1 pt-1">
                    {CITIES.filter((c) => c.commercialCount > 0)
                      .slice(0, 10)
                      .map((c) => (
                        <Link
                          key={c.slug}
                          to={`/properties-in/${c.slug}?category=commercial`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="min-h-[44px] flex items-center text-xs text-stone hover:text-ink py-1"
                        >
                          {c.name} ({c.commercialCount})
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center font-display text-2xl text-ink border-b border-line pb-2"
            >
              All Projects
            </Link>

            {/* About Us Accordion */}
            <div className="border-b border-line pb-2">
              <button
                onClick={() => setMobileAccordion(mobileAccordion === 'about' ? null : 'about')}
                className="w-full min-h-[44px] flex items-center justify-between text-left py-2 font-display text-2xl text-ink"
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    mobileAccordion === 'about' ? 'rotate-180 text-gold' : 'text-stone'
                  }`}
                />
              </button>
              {mobileAccordion === 'about' && (
                <div className="pt-2 pl-4 space-y-1">
                  <Link
                    to="/about-us"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs uppercase tracking-wider text-gold font-medium py-1"
                  >
                    Corporate Overview →
                  </Link>
                  <Link
                    to="/about-us/leadership-team"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs text-stone hover:text-ink py-1"
                  >
                    Leadership Team &amp; Directors
                  </Link>
                  <Link
                    to="/about-us/cmd-message"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs text-stone hover:text-ink py-1"
                  >
                    Chairman’s Message
                  </Link>
                  <Link
                    to="/about-us/mission-and-vision"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs text-stone hover:text-ink py-1"
                  >
                    Mission &amp; Vision
                  </Link>
                  <Link
                    to="/about-us/quality-policy"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs text-stone hover:text-ink py-1"
                  >
                    Quality Policy &amp; Standards
                  </Link>
                  <Link
                    to="/about-us/awards-and-honors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs text-stone hover:text-ink py-1"
                  >
                    Awards &amp; Honors
                  </Link>
                  <Link
                    to="/about-us/success-story"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center text-xs text-stone hover:text-ink py-1"
                  >
                    Our Success Story
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/investor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center font-display text-2xl text-ink border-b border-line pb-2"
            >
              Investors Relations
            </Link>

            <Link
              to="/nri-corner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center font-display text-2xl text-ink border-b border-line pb-2"
            >
              NRI Corner
            </Link>

            <Link
              to="/media/press-releases"
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center font-display text-2xl text-ink border-b border-line pb-2"
            >
              Media &amp; News
            </Link>

            <Link
              to="/career/life-at-omaxe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center font-display text-2xl text-ink border-b border-line pb-2"
            >
              Careers &amp; Culture
            </Link>

            <Link
              to="/care/omaxe-care"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-display text-2xl text-ink border-b border-line pb-4"
            >
              Omaxe Care
            </Link>

            <Link
              to="/business-associate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-display text-2xl text-ink border-b border-line pb-4"
            >
              Business Associates
            </Link>

            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-display text-2xl text-ink border-b border-line pb-4"
            >
              The Omaxe Journal
            </Link>

            <Link
              to="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-display text-2xl text-ink border-b border-line pb-4"
            >
              Contact Us
            </Link>
          </div>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-line space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full btn-luxury-primary py-4 text-xs tracking-btn"
            >
              Enquire Now
            </button>
            <div className="text-center text-xs text-stone">
              Toll Free: <a href={`tel:${COMPANY_DETAILS.tollFree}`} className="text-ink font-medium">{COMPANY_DETAILS.tollFree}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
