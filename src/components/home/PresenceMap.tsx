import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { CITIES } from '../../data/cities';
import { SectionHeading } from '../ui/SectionHeading';
import {
  INDIA_VIEW_BOX,
  INDIA_OUTER_BOUNDARY,
  INDIA_INNER_BORDERS,
  INDIA_STATES,
  CITY_GEO_POSITIONS,
  PRESENCE_STATE_NAMES,
} from '../../data/indiaMapData';

interface RegionalCorridor {
  id: string;
  name: string;
  territory: string;
  cities: string[]; // city slugs
}

const REGIONAL_CORRIDORS: RegionalCorridor[] = [
  {
    id: 'ncr',
    name: 'National Capital Region',
    territory: 'Delhi · Noida · Greater Noida · Gurugram · Faridabad',
    cities: ['new-delhi', 'noida', 'greater-noida', 'gurugram', 'faridabad'],
  },
  {
    id: 'punjab-tricity',
    name: 'Punjab & Tri-City',
    territory: 'Chandigarh · New Chandigarh · Ludhiana · Amritsar · Patiala',
    cities: ['chandigarh', 'new-chandigarh', 'ludhiana', 'amritsar', 'patiala', 'derabassi', 'bathinda'],
  },
  {
    id: 'up-heartland',
    name: 'Uttar Pradesh Heartland',
    territory: 'Lucknow · Prayagraj · Agra · Vrindavan · Ghaziabad',
    cities: ['lucknow', 'prayagraj', 'agra', 'vrindavan', 'ghaziabad', 'indirapuram'],
  },
  {
    id: 'haryana-belt',
    name: 'Haryana Industrial Corridor',
    territory: 'Sonepat · Rohtak · Bahadurgarh · Palwal · Jhajjar',
    cities: ['sonepat', 'rohtak', 'bahadurgarh', 'palwal', 'jhajjar', 'yamuna-nagar'],
  },
  {
    id: 'central-west',
    name: 'Central & Western India',
    territory: 'Indore · Ujjain · Ratlam · Jaipur · Bhiwadi',
    cities: ['indore', 'ujjain', 'ratlam', 'jaipur', 'bhiwadi'],
  },
];

export const PresenceMap: React.FC = () => {
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>('new-delhi');
  const [hoveredCitySlug, setHoveredCitySlug] = useState<string | null>(null);
  const [activeCorridorId, setActiveCorridorId] = useState<string>('ncr');

  const currentCitySlug = hoveredCitySlug || selectedCitySlug;
  const currentCity = useMemo(() => {
    return CITIES.find((c) => c.slug === currentCitySlug) || CITIES[0];
  }, [currentCitySlug]);

  const activeCorridor = useMemo(() => {
    return REGIONAL_CORRIDORS.find((c) => c.id === activeCorridorId) || REGIONAL_CORRIDORS[0];
  }, [activeCorridorId]);

  return (
    <section
      id="national-presence-section"
      aria-label="National Presence"
      className="py-56 sm:py-72 lg:py-80 bg-ink text-cream border-t border-cream/10 relative overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16 relative z-10">
        {/* Section Header with Monumental Serif and Silence */}
        <div className="max-w-3xl mb-24">
          <SectionHeading
            eyebrow="National Footprint"
            title="Presence Across 31 Indian Cities"
            theme="dark"
          />
        </div>

        {/* Two-Column Serene Architectural Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left Column: Authentic Survey of India Geographic Map */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full border border-cream/10 rounded-none p-6 sm:p-10 bg-ink-soft/30">
              {/* Geographic SVG Canvas */}
              <div className="relative w-full aspect-[6/7] max-h-[640px] flex items-center justify-center select-none">
                <svg
                  id="real-india-map-svg"
                  viewBox={INDIA_VIEW_BOX}
                  className="w-full h-full"
                  role="img"
                  aria-label="Real map of India showing Omaxe presence across 31 cities"
                >
                  <defs>
                    <linearGradient id="statePresenceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#CCA96B" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#B38E46" stopOpacity="0.03" />
                    </linearGradient>

                    <linearGradient id="stateActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B38E46" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#B38E46" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>

                  {/* Indian States Layer */}
                  <g id="states-layer">
                    {INDIA_STATES.map((state) => {
                      const isPresenceState = PRESENCE_STATE_NAMES.includes(state.name);
                      const isCurrentState =
                        currentCity &&
                        (state.name === currentCity.state ||
                          (currentCity.state === 'Delhi NCR' && state.name === 'Delhi'));

                      let fillColor = 'rgba(20, 18, 15, 0.4)';
                      if (isPresenceState) {
                        fillColor = isCurrentState
                          ? 'url(#stateActiveGrad)'
                          : 'url(#statePresenceGrad)';
                      }

                      return (
                        <path
                          key={state.code || state.name}
                          d={state.path}
                          fill={fillColor}
                          stroke="rgba(232, 227, 218, 0.10)"
                          strokeWidth="0.6"
                          className="transition-colors duration-400"
                        >
                          <title>{state.name}</title>
                        </path>
                      );
                    })}
                  </g>

                  {/* Internal State Borders Mesh */}
                  <path
                    d={INDIA_INNER_BORDERS}
                    fill="none"
                    stroke="rgba(232, 227, 218, 0.12)"
                    strokeWidth="0.75"
                    strokeLinejoin="round"
                  />

                  {/* Outer Sovereign Boundary */}
                  <path
                    d={INDIA_OUTER_BOUNDARY}
                    fill="none"
                    stroke="#B38E46"
                    strokeWidth="1.4"
                    strokeOpacity="0.6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* City Markings at Exact Coordinates */}
                  <g id="city-markings-layer">
                    {CITIES.map((city) => {
                      const coords = CITY_GEO_POSITIONS[city.slug];
                      if (!coords) return null;

                      const isSelected = selectedCitySlug === city.slug;
                      const isHovered = hoveredCitySlug === city.slug;
                      const isCurrent = isHovered || isSelected;
                      const inActiveCorridor = activeCorridor.cities.includes(city.slug);

                      return (
                        <g
                          key={city.slug}
                          id={`city-marker-${city.slug}`}
                          transform={`translate(${coords.x}, ${coords.y})`}
                          className={`cursor-pointer transition-all duration-300 ${
                            inActiveCorridor || isCurrent ? 'opacity-100' : 'opacity-35'
                          }`}
                          onMouseEnter={() => setHoveredCitySlug(city.slug)}
                          onMouseLeave={() => setHoveredCitySlug(null)}
                          onClick={() => setSelectedCitySlug(city.slug)}
                        >
                          {/* Marker pin */}
                          <circle
                            r={isCurrent ? 4 : 2.5}
                            fill={isCurrent ? '#CCA96B' : '#B38E46'}
                            stroke="#14120F"
                            strokeWidth={isCurrent ? '1.2' : '0.8'}
                          />

                          {/* Center dot */}
                          <circle
                            r={isCurrent ? 1.5 : 1}
                            fill="#FFFFFF"
                          />

                          {/* Discreet Label Tag for current city */}
                          {isCurrent && (
                            <g transform="translate(0, -10)" className="pointer-events-none">
                              <rect
                                x={coords.x > 450 ? -84 : 4}
                                y="-16"
                                width={city.name.length * 6 + 18}
                                height="18"
                                rx="0"
                                fill="#14120F"
                                stroke="#B38E46"
                                strokeWidth="0.6"
                              />
                              <text
                                x={coords.x > 450 ? -76 : 10}
                                y="-4"
                                fill="#FAF8F5"
                                fontSize="10"
                                fontWeight="300"
                                fontFamily="sans-serif"
                                letterSpacing="0.08em"
                              >
                                {city.name}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Serene Regional Corridors Index */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                Regional Corridors
              </span>
              <p className="text-stone text-[11px] font-light leading-[1.75] max-w-[62ch]">
                Explore key territorial developments across northern and central economic axes.
              </p>
            </div>

            {/* List of 5 Regional Corridors */}
            <div className="divide-y divide-cream/10 border-y border-cream/10">
              {REGIONAL_CORRIDORS.map((corridor) => {
                const isActive = activeCorridorId === corridor.id;
                return (
                  <button
                    key={corridor.id}
                    onClick={() => {
                      setActiveCorridorId(corridor.id);
                      setSelectedCitySlug(corridor.cities[0]);
                    }}
                    className={`w-full py-5 text-left transition-all duration-300 flex flex-col gap-1 cursor-pointer group ${
                      isActive ? 'text-cream' : 'text-stone hover:text-cream'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-display text-2xl font-light transition-colors ${
                          isActive ? 'text-gold' : 'text-cream group-hover:text-gold-soft'
                        }`}
                      >
                        {corridor.name}
                      </span>
                      <span className="text-[11px] text-stone font-light">
                        {corridor.cities.length} Cities
                      </span>
                    </div>
                    <span className="text-[11px] text-stone font-light tracking-wide line-clamp-1">
                      {corridor.territory}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quiet Spotlight on Selected City */}
            {currentCity && (
              <div className="pt-4 space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                    Active Destination
                  </span>
                  <h4 className="font-display text-2xl font-light text-cream tracking-[-0.02em]">
                    {currentCity.name}, {currentCity.state}
                  </h4>
                  <p className="text-stone text-[11px] leading-[1.75] font-light max-w-[62ch]">
                    {currentCity.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/properties-in/${currentCity.slug}`}
                    className="link-tertiary !text-cream hover:!text-gold text-[11px] inline-flex items-center gap-2"
                  >
                    <span>View All Properties in {currentCity.name}</span>
                    <ArrowRight className="w-3 h-3 text-gold" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
