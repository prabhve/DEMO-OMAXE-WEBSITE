import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Building } from 'lucide-react';
import { CITIES } from '../../data/cities';
import { trackEvent, ANALYTICS_EVENTS } from '../../utils/analytics';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent(ANALYTICS_EVENTS.SEARCH_SUBMIT, {
      city: selectedCity || 'all',
      category: selectedCategory || 'all',
    });
    const params = new URLSearchParams();
    if (selectedCity) params.set('city', selectedCity);
    if (selectedCategory) params.set('category', selectedCategory);

    navigate(`/projects?${params.toString()}`);
  };

  return (
    <div className="relative z-30 max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-12 -mt-14 sm:-mt-16">
      {/* Serene Architectural Search Bar */}
      <div className="bg-ivory border border-line rounded-none shadow-soft p-5 sm:p-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Field 1: City Selection */}
          <div className="md:col-span-5 flex items-center gap-4">
            <MapPin className="w-4 h-4 text-gold shrink-0" />
            <div className="w-full">
              <label
                htmlFor="search-city"
                className="block text-[11px] uppercase tracking-[0.18em] font-normal text-gold mb-1"
              >
                Destination / City
              </label>
              <select
                id="search-city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full min-h-[44px] bg-transparent text-sm font-light text-ink focus:outline-none cursor-pointer py-2 border-b border-transparent focus:border-gold transition-colors"
              >
                <option value="">All Markets (31 Indian Cities)</option>
                {CITIES.map((city) => (
                  <option key={city.slug} value={city.name}>
                    {city.name} — {city.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-10 bg-line" />

          {/* Field 2: Property Type */}
          <div className="md:col-span-4 flex items-center gap-4">
            <Building className="w-4 h-4 text-gold shrink-0" />
            <div className="w-full">
              <label
                htmlFor="search-type"
                className="block text-[11px] uppercase tracking-[0.18em] font-normal text-gold mb-1"
              >
                Collection
              </label>
              <select
                id="search-type"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full min-h-[44px] bg-transparent text-sm font-light text-ink focus:outline-none cursor-pointer py-2 border-b border-transparent focus:border-gold transition-colors"
              >
                <option value="">All Developments</option>
                <option value="residential">Private Residential Estates</option>
                <option value="commercial">Commercial Destinations</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="md:col-span-2 md:col-start-11 flex justify-end">
            <button
              type="submit"
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-ink hover:bg-gold text-cream hover:text-ivory text-[11px] uppercase tracking-[0.22em] font-light rounded-none transition-all duration-400 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Trending Searches Row */}
        <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <span className="text-[11px] uppercase tracking-[0.18em] text-gold font-normal shrink-0">
            Trending:
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-stone">
            <Link
              to="/projects/commercial/new-delhi/omaxe-chowk-new-delhi"
              className="hover:text-gold transition-colors underline-offset-4 hover:underline"
            >
              Omaxe Chowk Delhi
            </Link>
            <span className="text-line">·</span>
            <Link
              to="/projects/residential/new-chandigarh/the-lake-new-chandigarh"
              className="hover:text-gold transition-colors underline-offset-4 hover:underline"
            >
              The Lake, New Chandigarh
            </Link>
            <span className="text-line">·</span>
            <Link
              to="/projects/commercial/faridabad/omaxe-world-street-faridabad"
              className="hover:text-gold transition-colors underline-offset-4 hover:underline"
            >
              World Street, Faridabad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
