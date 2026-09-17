import React from 'react';
import { Heart, GraduationCap, Users } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';

interface CsrFocusArea {
  id: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  description: string;
  stats: string;
  statLabel: string;
}

const CSR_AREAS: CsrFocusArea[] = [
  {
    id: 'health',
    title: 'Healthcare & Wellness',
    tagline: 'Accessible Medical Outreach & Preventive Care',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1600&auto=format&fit=crop&q=80',
    description:
      'Omaxe Foundation actively champions preventative and primary healthcare accessibility across underserved peri-urban communities adjacent to our major development hubs. Through mobile medical clinics, organized multi-specialty diagnostic camps, subsidized eye surgeries, and continuous maternal-child health nutrition drives, we provide vital healthcare interventions directly to vulnerable families. Our on-site primary wellness centers across our integrated townships offer emergency first aid, pediatric immunizations, and regular health screenings for thousands of construction artisans and their dependents. By partnering with leading medical institutions and non-profit healthcare foundations, we foster resilient community health infrastructures that safeguard generational well-being and elevate baseline public health outcomes across northern and central India.',
    stats: '120,000+',
    statLabel: 'Patients Treated in Medical Camps',
  },
  {
    id: 'education',
    title: 'Education & Skill Enablement',
    tagline: 'Nurturing Potential from Early Childhood to Vocations',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80',
    description:
      'We believe transformative education is the ultimate catalyst for breaking cycles of poverty and fostering social mobility. Omaxe runs structured educational support initiatives including mobile crèches and primary learning centers at active construction sites, ensuring the children of migrant site workers receive safe, stimulating early-childhood learning environments, daily nutritious meals, and foundational literacy. Furthermore, through our vocational training academies, we empower local youth and women with industry-recognized technical skills in advanced masonry, electrical wiring, sustainable plumbing, and digital literacy. By awarding academic merit scholarships and modernizing government schools with computer labs and clean sanitation, we empower the next generation to pursue meaningful, dignified career trajectories.',
    stats: '45,000+',
    statLabel: 'Children & Artisans Empowered',
  },
  {
    id: 'community',
    title: 'Community & Environmental Stewardship',
    tagline: 'Sustainable Green Habitats & Social Infrastructure',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&auto=format&fit=crop&q=80',
    description:
      'True urban stewardship extends far beyond physical residential towers to the surrounding environmental ecology and civic fabric. Omaxe conducts massive annual afforestation drives, planting indigenous tree species across urban green belts, restoring seasonal water bodies, and implementing rainwater harvesting systems that recharge regional groundwater tables. In times of national emergencies and natural disasters, our dedicated disaster-response relief teams provide immediate humanitarian rations, emergency shelter kits, and rehabilitation assistance. We collaborate closely with local municipal panchayats to build solar-powered street lighting, hygienic community sanitation blocks, and clean drinking water filtration plants, fostering self-reliant, environmentally harmonious villages that grow in tandem with modern urban progress.',
    stats: '250,000+',
    statLabel: 'Saplings Planted Across Townships',
  },
];

export const CsrPage: React.FC = () => {
  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Corporate Social Responsibility' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block mb-3">
              Omaxe Foundation
            </span>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-[72px] font-light text-ink leading-[1.05] tracking-[-0.03em]">
              Building Hope, Enriching Lives
            </h1>
            <p className="mt-6 text-stone text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
              Guided by the ethos of purposeful nation-building, Omaxe Foundation invests in enduring social programs that uplift communities, preserve ecological balance, and empower future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16 space-y-24 sm:space-y-36">
        <div className="max-w-[1360px] mx-auto space-y-24 sm:space-y-36">
          {CSR_AREAS.map((area, index) => {
            const Icon = area.icon;
            const isEven = index % 2 === 1;

            return (
              <div
                key={area.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Visual Imagery */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-ink-soft overflow-hidden shadow-soft border border-line">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-ink/90 text-cream text-[11px] uppercase tracking-[0.18em] font-mono border border-cream/20">
                      {area.tagline}
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div
                  className={`lg:col-span-6 space-y-8 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-ivory border border-line text-gold">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                      Pillar 0{index + 1}
                    </span>
                    <h2 className="font-display text-[32px] sm:text-4xl lg:text-[44px] font-light text-ink leading-tight tracking-[-0.02em]">
                      {area.title}
                    </h2>
                  </div>

                  <p className="text-stone text-base font-light leading-[1.8] text-justify">
                    {area.description}
                  </p>

                  <div className="pt-6 border-t border-line flex items-baseline gap-4">
                    <span className="font-display text-4xl sm:text-5xl font-light text-ink">
                      {area.stats}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-stone font-light">
                      {area.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sustainable Governance Banner */}
      <section className="bg-ivory border-t border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
            Ethical Stewardship
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-light text-ink">
            Aligned with UN Sustainable Development Goals
          </h2>
          <p className="text-stone text-sm sm:text-base font-light leading-relaxed max-w-[62ch] mx-auto">
            Our corporate social responsibilities are rigorously audited and aligned with SDG 3 (Good Health), SDG 4 (Quality Education), SDG 6 (Clean Water), and SDG 11 (Sustainable Cities and Communities).
          </p>
        </div>
      </section>
    </div>
  );
};
