import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, Home, ArrowLeft } from 'lucide-react';
import { CITIES } from '../data/cities';
import { ProjectsPage } from './ProjectsPage';
import { Breadcrumb } from '../components/ui/Breadcrumb';

interface CityShowcasePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const CityShowcasePage: React.FC<CityShowcasePageProps> = ({ onOpenEnquiry }) => {
  const { city: citySlug } = useParams<{ city: string }>();

  const cityData = CITIES.find(
    (c) => (c.slug || '').toLowerCase() === (citySlug || '').toLowerCase()
  );

  const cityName = cityData ? cityData.name : (citySlug ? citySlug.replace(/-/g, ' ') : 'City');

  useEffect(() => {
    document.title = `Properties in ${cityName} | Residential & Commercial by Omaxe`;
  }, [cityName]);

  return (
    <div>
      {/* City Editorial Header */}
      {cityData && (
        <div className="pt-28 pb-10 bg-ink text-cream border-b border-cream/10">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-6">
            <Breadcrumb
              items={[
                { label: 'Projects', to: '/projects' },
                { label: 'Cities', to: '/projects' },
                { label: cityData.name },
              ]}
              className="!py-0 text-cream/70"
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{cityData.state} · Strategic Urban Hub</span>
                </span>
                <h1 className="font-display text-3xl sm:text-5xl font-normal text-cream leading-tight">
                  Properties &amp; Townships in {cityData.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed font-light">
                  {cityData.description}
                </p>
              </div>

              <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-6 text-xs border-t md:border-t-0 md:border-l border-cream/15 pt-4 md:pt-0 md:pl-8">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone block">Developments</span>
                  <span className="font-serif text-2xl text-cream font-medium">{cityData.projectCount}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone block">Residential</span>
                  <span className="font-serif text-2xl text-gold font-medium">{cityData.residentialCount}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone block">Commercial</span>
                  <span className="font-serif text-2xl text-cream font-medium">{cityData.commercialCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render the filtered projects for this city */}
      <ProjectsPage
        onOpenEnquiry={onOpenEnquiry}
        preselectedCity={cityName}
      />
    </div>
  );
};
