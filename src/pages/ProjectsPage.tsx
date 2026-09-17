import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Building,
  IndianRupee,
  Grid3X3,
  Rows3,
  X,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Download,
  Calendar,
} from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { CITIES } from '../data/cities';
import { Project, ProjectCategory, ProjectStatus } from '../types';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectCardSkeleton } from '../components/ui/ProjectCardSkeleton';
import { Button } from '../components/ui/Button';

interface ProjectsPageProps {
  onOpenEnquiry: (topic?: string) => void;
  preselectedCity?: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenEnquiry,
  preselectedCity,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL parameters
  const initialCategory = searchParams.get('category') || '';
  const initialCity = preselectedCity || searchParams.get('city') || '';
  const initialBudget = searchParams.get('budget') || '';
  const initialStatus = searchParams.get('status') || '';
  const initialSearch = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedBudget, setSelectedBudget] = useState<string>(initialBudget);
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync state when URL params change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [searchParams, preselectedCity]);

  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category') || '');
    if (searchParams.get('city') || preselectedCity) {
      setSelectedCity(preselectedCity || searchParams.get('city') || '');
    }
    if (searchParams.get('budget')) setSelectedBudget(searchParams.get('budget') || '');
    if (searchParams.get('status')) setSelectedStatus(searchParams.get('status') || '');
    if (searchParams.get('q')) setSearchQuery(searchParams.get('q') || '');
  }, [searchParams, preselectedCity]);

  // Update URL params on filter change
  const updateParams = (newFilters: {
    category?: string;
    city?: string;
    budget?: string;
    status?: string;
    q?: string;
    sort?: string;
  }) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateParams({ category: cat });
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    updateParams({ city });
  };

  const handleBudgetChange = (budget: string) => {
    setSelectedBudget(budget);
    updateParams({ budget });
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    updateParams({ status });
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    updateParams({ q });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateParams({ sort });
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedCity('');
    setSelectedBudget('');
    setSelectedStatus('');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Check if any filter is active
  const hasActiveFilters = Boolean(
    selectedCategory || selectedCity || selectedBudget || selectedStatus || searchQuery
  );

  // Filter and Sort Logic
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }

      // City filter
      if (selectedCity && (project.city || '').toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Status filter
      if (selectedStatus && project.status !== selectedStatus) {
        return false;
      }

      // Budget filter
      if (selectedBudget) {
        const priceStr = String(project.priceStarting || '').toLowerCase();
        if (selectedBudget === 'under-1cr') {
          if (!priceStr.includes('lakh') && !priceStr.includes('0.')) {
            return false;
          }
        } else if (selectedBudget === '1cr-2.5cr') {
          if (!priceStr.includes('1.') && !priceStr.includes('2.')) {
            return false;
          }
        } else if (selectedBudget === 'above-2.5cr') {
          if (
            !priceStr.includes('2.4') &&
            !priceStr.includes('2.5') &&
            !priceStr.includes('3') &&
            !priceStr.includes('4') &&
            !priceStr.includes('request')
          ) {
            return false;
          }
        }
      }

      // Keyword query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = (project.title || '').toLowerCase().includes(query);
        const matchesCity = (project.city || '').toLowerCase().includes(query);
        const matchesState = (project.state || '').toLowerCase().includes(query);
        const matchesType = (project.type || '').toLowerCase().includes(query);
        const matchesHighlights = (project.highlights || []).some((h) => (h || '').toLowerCase().includes(query));
        if (!matchesTitle && !matchesCity && !matchesState && !matchesType && !matchesHighlights) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.isSignature && !b.isSignature) return -1;
        if (!a.isSignature && b.isSignature) return 1;
        return 0;
      }
      if (sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'city-asc') {
        return a.city.localeCompare(b.city);
      }
      if (sortBy === 'price-asc') {
        return a.priceStarting.localeCompare(b.priceStarting);
      }
      if (sortBy === 'price-desc') {
        return b.priceStarting.localeCompare(a.priceStarting);
      }
      return 0;
    });
  }, [selectedCategory, selectedCity, selectedBudget, selectedStatus, searchQuery, sortBy]);

  // Set document title
  useEffect(() => {
    const titleCity = selectedCity ? `in ${selectedCity}` : 'Across India';
    const titleCategory = selectedCategory
      ? selectedCategory === 'residential'
        ? 'Residential Properties'
        : 'Commercial Destinations'
      : 'All Projects';
    document.title = `${titleCategory} ${titleCity} | Omaxe Limited`;
  }, [selectedCity, selectedCategory]);

  return (
    <div className="pt-28 pb-24 bg-cream text-ink min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'Projects', to: '/projects' },
            ...(selectedCity ? [{ label: selectedCity }] : []),
            ...(selectedCategory ? [{ label: selectedCategory === 'residential' ? 'Residential' : 'Commercial' }] : []),
          ]}
        />

        {/* Editorial Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
              Curated Architectural Portfolio
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[80px] font-light text-ink leading-[1.05] tracking-[-0.02em]">
              {selectedCity ? `Developments in ${selectedCity}` : 'Master Developments & Landmarks'}
            </h1>
            <p className="text-stone text-base leading-[1.75] font-light max-w-[62ch]">
              Explore iconic residential sanctuaries, self-sustaining eco-townships, and destination commercial hubs built across 31 cities with four decades of architectural precision.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-ivory border border-line rounded-sm p-1">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                className={`p-2 rounded-sm transition-colors ${
                  viewMode === 'grid' ? 'bg-ink text-cream' : 'text-stone hover:text-ink'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List View"
                className={`p-2 rounded-sm transition-colors ${
                  viewMode === 'list' ? 'bg-ink text-cream' : 'text-stone hover:text-ink'
                }`}
              >
                <Rows3 className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-ivory border border-line rounded-sm text-xs font-medium uppercase tracking-wider text-ink"
              aria-expanded={showMobileFilters}
              aria-label="Toggle mobile filter controls"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
              <span>Filters ({filteredProjects.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-ivory border border-line rounded-sm p-4 sm:p-5 shadow-soft space-y-4">
          {/* Top Row: Category Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Segmented Pills (Horizontal scroll on mobile) */}
            <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <div className="inline-flex items-center bg-cream border border-line rounded-sm p-1 min-w-max">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`px-3.5 py-2 min-h-[38px] text-xs uppercase tracking-btn font-medium rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedCategory === ''
                      ? 'bg-ink text-cream shadow-sm'
                      : 'text-stone hover:text-ink'
                  }`}
                >
                  All Developments
                </button>
                <button
                  onClick={() => handleCategoryChange('residential')}
                  className={`px-3.5 py-2 min-h-[38px] text-xs uppercase tracking-btn font-medium rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'residential'
                      ? 'bg-ink text-cream shadow-sm'
                      : 'text-stone hover:text-ink'
                  }`}
                >
                  Residential
                </button>
                <button
                  onClick={() => handleCategoryChange('commercial')}
                  className={`px-3.5 py-2 min-h-[38px] text-xs uppercase tracking-btn font-medium rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'commercial'
                      ? 'bg-ink text-cream shadow-sm'
                      : 'text-stone hover:text-ink'
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            {/* Search Input Field */}
            <div className="relative flex-1 max-w-md w-full">
              <label htmlFor="project-search-input" className="sr-only">
                Search developments by name, micro-market, or features
              </label>
              <Search className="w-4 h-4 text-stone absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="project-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by project name, micro-market, or feature..."
                className="w-full bg-cream border border-line/90 pl-10 pr-10 py-2.5 min-h-[44px] text-xs text-ink placeholder-stone/70 rounded-sm focus:outline-none focus:border-gold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Row: Dropdowns on Desktop or Mobile Filter Tray */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-line/70 ${
              showMobileFilters ? 'block' : 'hidden md:grid'
            }`}
          >
            {/* City Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 bg-cream border border-line/80 rounded-sm">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] uppercase tracking-wider text-stone font-medium">
                  City Market
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-ink focus:outline-none cursor-pointer py-0.5"
                >
                  <option value="">All Markets (31 Cities)</option>
                  {CITIES.map((city) => (
                    <option key={city.slug} value={city.name}>
                      {city.name} ({city.projectCount})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 bg-cream border border-line/80 rounded-sm">
              <Building className="w-4 h-4 text-gold shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] uppercase tracking-wider text-stone font-medium">
                  Construction Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-ink focus:outline-none cursor-pointer py-0.5"
                >
                  <option value="">All Statuses</option>
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Newly Launched">Newly Launched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Budget Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 bg-cream border border-line/80 rounded-sm">
              <IndianRupee className="w-4 h-4 text-gold shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] uppercase tracking-wider text-stone font-medium">
                  Budget Expectation
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-ink focus:outline-none cursor-pointer py-0.5"
                >
                  <option value="">Any Budget</option>
                  <option value="under-1cr">Under ₹ 1 Crore</option>
                  <option value="1cr-2.5cr">₹ 1 Cr – ₹ 2.5 Cr</option>
                  <option value="above-2.5cr">₹ 2.5 Cr &amp; Above</option>
                </select>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 bg-cream border border-line/80 rounded-sm">
              <SlidersHorizontal className="w-4 h-4 text-gold shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] uppercase tracking-wider text-stone font-medium">
                  Sort Portfolio By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium text-ink focus:outline-none cursor-pointer py-0.5"
                >
                  <option value="featured">Featured Landmarks</option>
                  <option value="name-asc">Project Name (A - Z)</option>
                  <option value="city-asc">City (A - Z)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Row & Results Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-stone font-mono text-[11px]">
                Showing {filteredProjects.length} of {PROJECTS.length} Developments
              </span>

              {/* Active Badges */}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-cream px-2.5 py-1 border border-line rounded-sm text-[11px] text-ink">
                  Category: <strong className="capitalize font-medium">{selectedCategory}</strong>
                  <button onClick={() => handleCategoryChange('')} className="hover:text-gold ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCity && (
                <span className="inline-flex items-center gap-1 bg-cream px-2.5 py-1 border border-line rounded-sm text-[11px] text-ink">
                  City: <strong className="font-medium">{selectedCity}</strong>
                  <button onClick={() => handleCityChange('')} className="hover:text-gold ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedStatus && (
                <span className="inline-flex items-center gap-1 bg-cream px-2.5 py-1 border border-line rounded-sm text-[11px] text-ink">
                  Status: <strong className="font-medium">{selectedStatus}</strong>
                  <button onClick={() => handleStatusChange('')} className="hover:text-gold ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedBudget && (
                <span className="inline-flex items-center gap-1 bg-cream px-2.5 py-1 border border-line rounded-sm text-[11px] text-ink">
                  Budget: <strong className="font-medium">{selectedBudget}</strong>
                  <button onClick={() => handleBudgetChange('')} className="hover:text-gold ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-cream px-2.5 py-1 border border-line rounded-sm text-[11px] text-ink">
                  Query: <strong className="font-medium">&ldquo;{searchQuery}&rdquo;</strong>
                  <button onClick={() => handleSearchChange('')} className="hover:text-gold ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-gold hover:text-ink transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Project Results Display */}
        {isLoading ? (
          /* Loading Skeletons State */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProjectCardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          /* Empty State */
          <div className="bg-ivory border border-line rounded-sm p-12 sm:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-soft">
            <div className="w-14 h-14 rounded-full bg-cream border border-gold/40 text-gold flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-ink font-normal">
                No developments found
              </h3>
              <p className="text-xs sm:text-sm text-stone leading-relaxed font-light">
                We could not find any active projects matching your specific filter parameters. Please adjust your criteria or consult our private client concierge for bespoke off-market assets.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button onClick={handleResetFilters} variant="primary" className="min-h-[44px]">
                Clear All Filters
              </Button>
              <Button onClick={() => onOpenEnquiry('Custom Property Search')} variant="secondary" className="min-h-[44px]">
                Request Custom Search
              </Button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          /* List / Editorial Row View */
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-ivory border border-line rounded-sm overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:border-gold/60 hover:shadow-lift flex flex-col md:flex-row gap-6 items-center"
              >
                {/* Thumbnail */}
                <div className="relative w-full md:w-[320px] aspect-[16/10] overflow-hidden rounded-sm bg-ink-soft shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-ink/80 backdrop-blur-sm px-2.5 py-0.5 rounded-sm text-[9px] uppercase tracking-wider text-gold font-medium">
                    {project.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-ink/80 backdrop-blur-sm px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-wider text-cream font-medium">
                    {project.status}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center gap-2 text-xs text-stone">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{project.city}, {project.state}</span>
                    <span className="text-line">·</span>
                    <span className="text-[11px] font-mono text-stone">{project.reraNo}</span>
                  </div>

                  <h3 className="font-display text-2xl text-ink group-hover:text-gold transition-colors font-normal">
                    <Link to={`/projects/${project.category}/${(project.city || 'all').toLowerCase().replace(/\s+/g, '-')}/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-stone line-clamp-2 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-line text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone block">Configuration</span>
                      <span className="font-medium text-ink line-clamp-1">{project.configuration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone block">Area</span>
                      <span className="font-medium text-ink">{project.area}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone block">Starting Price</span>
                      <span className="font-serif text-sm text-gold font-medium">{project.priceStarting}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-line pt-4 md:pt-0 md:pl-6">
                  <Button
                    to={`/projects/${project.category}/${(project.city || 'all').toLowerCase().replace(/\s+/g, '-')}/${project.slug}`}
                    variant="primary"
                    size="sm"
                    className="flex-1 md:flex-initial"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    View Project
                  </Button>
                  <Button
                    onClick={() => onOpenEnquiry(project.title)}
                    variant="secondary"
                    size="sm"
                    className="flex-1 md:flex-initial"
                  >
                    Enquire
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Concierge Assistance Band */}
        <div className="bg-ink text-cream rounded-none p-8 sm:p-12 border border-cream/10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
              Private Client Advisory
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light text-cream leading-[1.08] tracking-[-0.02em]">
              Seeking a bespoke residence or commercial flagship?
            </h2>
            <p className="text-xs sm:text-sm text-stone leading-[1.75] font-light max-w-[62ch]">
              Our Senior Wealth &amp; Investment Desk arranges customized site visits, confidential repatriable NRI transactions, and floor plan customizations for family offices and institutional investors.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                onClick={() => onOpenEnquiry('Portfolio Concierge Consultation')}
                variant="gold-outline"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Schedule Private Consultation
              </Button>
              <Button
                onClick={() => onOpenEnquiry('Master Portfolio Brochure Request')}
                variant="secondary"
                size="sm"
                className="!border-cream/30 !text-cream hover:!bg-cream hover:!text-ink"
                icon={<Download className="w-3.5 h-3.5" />}
              >
                Download Master Catalog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
