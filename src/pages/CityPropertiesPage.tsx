import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Building,
  ArrowRight,
  Compass,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  Plane,
  Train,
  Car,
} from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { CITIES } from '../data/cities';
import { PROJECTS } from '../data/projects';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Button } from '../components/ui/Button';

interface CityPropertiesPageProps {
  onOpenEnquiry?: (projectName?: string) => void;
}

export const CityPropertiesPage: React.FC<CityPropertiesPageProps> = ({ onOpenEnquiry }) => {
  const { city: citySlug } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'residential' | 'commercial'>('all');

  const cityData = useMemo(() => {
    if (!citySlug) return null;
    const normalized = (citySlug || '').toLowerCase().replace(/-/g, ' ');
    return (
      CITIES.find(
        (c) =>
          (c.slug || '').toLowerCase() === (citySlug || '').toLowerCase() ||
          (c.name || '').toLowerCase() === normalized ||
          String(c.id || '').toLowerCase() === (citySlug || '').toLowerCase()
      ) || {
        name: citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        state: 'India',
        slug: citySlug,
        id: citySlug,
        projectCount: 4,
        description: `Explore Omaxe's distinguished residential estates, integrated townships, and prime commercial destinations in ${citySlug}.`,
      }
    );
  }, [citySlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cityData) {
      document.title = `Luxury Properties in ${cityData.name} | Omaxe Limited`;
    }
  }, [cityData]);

  const cityProjects = useMemo(() => {
    if (!cityData) return [];
    return PROJECTS.filter((p) => {
      const pCity = (p.city || '').toLowerCase();
      const cName = (cityData.name || '').toLowerCase();
      const matchCity =
        pCity === cName ||
        pCity.includes(cName) ||
        cName.includes(pCity);
      const matchCat =
        selectedCategory === 'all' || p.category === selectedCategory;
      return matchCity && matchCat;
    });
  }, [cityData, selectedCategory]);

  // Fallback related projects if city doesn't have 3+ explicitly in mock
  const displayProjects = useMemo(() => {
    if (cityProjects.length > 0) return cityProjects;
    return PROJECTS.slice(0, 3);
  }, [cityProjects]);

  if (!cityData) {
    return (
      <div className="flex-1 bg-cream text-ink py-32 px-5 text-center">
        <h1 className="font-display text-4xl font-light">City Not Found</h1>
        <Button to="/projects" variant="solid" className="mt-6">View All Projects</Button>
      </div>
    );
  }

  const connectivityPoints = [
    {
      icon: Plane,
      title: 'Airport Connectivity',
      desc: `Direct arterial expressway access to international and domestic aviation hubs serving ${cityData.name}.`,
    },
    {
      icon: Train,
      title: 'Rapid Transit & Railways',
      desc: 'Seamless linkage to high-speed railway junctions, Vande Bharat stops, and metro rail corridors.',
    },
    {
      icon: Car,
      title: 'National Highway Corridors',
      desc: 'Immediate frontage along multi-lane national highways ensuring swift regional freight and commuter travel.',
    },
  ];

  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Destinations', path: '/projects' },
              { label: cityData.name },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream border border-line text-xs font-mono uppercase tracking-[0.2em] text-gold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{cityData.state} · {cityData.projectCount || displayProjects.length}+ Landmark Developments</span>
              </div>
              <h1 className="font-display text-[40px] sm:text-6xl lg:text-[72px] font-light text-ink leading-[1.05] tracking-[-0.03em]">
                Properties in {cityData.name}
              </h1>
              <p className="text-stone text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
                {cityData.description || `Discover master-planned integrated townships, signature residential towers, and marquee commercial destinations crafted by Omaxe Limited in ${cityData.name}.`}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button
                variant="solid"
                size="md"
                onClick={() => onOpenEnquiry?.(`Inquiry for ${cityData.name} Properties`)}
                icon={<MessageSquare className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Schedule Site Visit in {cityData.name}
              </Button>
              <Button
                to="/projects"
                variant="outline"
                size="md"
                className="w-full justify-center"
              >
                Explore Other Cities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity & Infrastructure Strip */}
      <section className="bg-cream border-b border-line py-12 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {connectivityPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-4 p-4 bg-ivory border border-line">
                  <div className="w-10 h-10 bg-cream border border-line flex items-center justify-center text-gold shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-normal text-ink">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16">
        <div className="max-w-[1360px] mx-auto space-y-12">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-line pb-6">
            <div>
              <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                Portfolio in {cityData.name}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">
                Featured Developments ({displayProjects.length})
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`min-h-[44px] px-5 py-2 text-xs uppercase tracking-[0.18em] font-light transition-colors cursor-pointer border ${
                  selectedCategory === 'all'
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-ivory text-stone border-line hover:border-ink hover:text-ink'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('residential')}
                className={`min-h-[44px] px-5 py-2 text-xs uppercase tracking-[0.18em] font-light transition-colors cursor-pointer border ${
                  selectedCategory === 'residential'
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-ivory text-stone border-line hover:border-ink hover:text-ink'
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setSelectedCategory('commercial')}
                className={`min-h-[44px] px-5 py-2 text-xs uppercase tracking-[0.18em] font-light transition-colors cursor-pointer border ${
                  selectedCategory === 'commercial'
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-ivory text-stone border-line hover:border-ink hover:text-ink'
                }`}
              >
                Commercial
              </button>
            </div>
          </div>

          {/* Projects Listing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {displayProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenEnquiry={onOpenEnquiry}
              />
            ))}
          </div>

          {/* Other Cities Grid */}
          <div className="mt-24 pt-16 border-t border-line space-y-8">
            <div>
              <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                Pan-India Presence
              </span>
              <h3 className="font-display text-2xl font-light text-ink">
                Explore Other Active Cities
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {CITIES.filter((c) => c.slug !== cityData.slug).slice(0, 12).map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  to={`/properties-in/${otherCity.slug}`}
                  className="p-3 bg-ivory border border-line hover:border-gold hover:text-gold text-xs transition-colors flex flex-col justify-between"
                >
                  <span className="font-normal text-ink">{otherCity.name}</span>
                  <span className="text-[10px] text-stone font-mono mt-1">{otherCity.projectCount || 1} Projects</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
