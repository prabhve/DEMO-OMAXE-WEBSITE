import React from 'react';
import { MapPin, Plane, Train, Car, GraduationCap, Building2, Hospital } from 'lucide-react';
import { Project } from '../../types';

interface ProjectLocationProps {
  project: Project;
}

export const ProjectLocation: React.FC<ProjectLocationProps> = ({ project }) => {
  // Landmarks curated by city
  const connectivityItems = [
    {
      icon: Plane,
      title: 'International Airport',
      distance: '20-25 Mins',
      desc: 'Seamless expressway transit without bottleneck intersections.',
    },
    {
      icon: Train,
      title: 'Metro / Rapid Transit Station',
      distance: '5-8 Mins',
      desc: 'Direct operational link to central commercial business hubs.',
    },
    {
      icon: Car,
      title: 'National Highway / Expressway',
      distance: '2 Mins',
      desc: 'Immediate arterial access to multi-lane elevated corridors.',
    },
    {
      icon: Hospital,
      title: 'Super-Specialty Healthcare',
      distance: '10 Mins',
      desc: 'World-renowned medical institutes and 24/7 trauma centers nearby.',
    },
    {
      icon: GraduationCap,
      title: 'Premier Educational Institutions',
      distance: '10-15 Mins',
      desc: 'Elite IB world schools and top technical universities.',
    },
    {
      icon: Building2,
      title: 'Central Business District',
      distance: '15 Mins',
      desc: 'Prime corporate headquarters, tech hubs, and diplomatic enclaves.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Map visualizer & address container */}
      <div className="bg-ivory border border-line rounded-sm overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-medium mb-1">
              <MapPin className="w-4 h-4" />
              <span>Prime Strategic Address</span>
            </div>
            <h4 className="font-display text-2xl text-ink font-normal">
              {project.location ? `${project.location}, ` : ''}{project.city}, {project.state}
            </h4>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${project.title} ${project.location || ''} ${project.city} India`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-tertiary text-xs text-gold whitespace-nowrap self-start md:self-auto"
          >
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Line-Art Cartographic Representation */}
        <div className="my-6 relative aspect-[21/9] w-full bg-cream border border-line rounded-sm overflow-hidden flex items-center justify-center">
          {/* Subtle grid patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(#6B645B_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

          {/* Road Network Graphic lines */}
          <svg className="w-full h-full stroke-stone/30 stroke-[1.5] fill-none">
            <path d="M 0 50 Q 200 80 400 40 T 800 90 T 1200 60" />
            <path d="M 100 0 Q 150 150 220 300 T 350 500" strokeWidth="2.5" stroke="#A8823C" opacity="0.6" />
            <path d="M 0 150 L 1200 130" strokeDasharray="6 4" />
            <path d="M 500 0 Q 550 200 700 400" />
          </svg>

          {/* Central Pulsing Pin for the Project */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-8 h-8 rounded-full bg-gold/20 animate-ping" />
              <div className="w-10 h-10 rounded-full bg-ink text-gold border-2 border-gold flex items-center justify-center shadow-lift">
                <MapPin className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="mt-3 bg-ink/90 backdrop-blur-sm px-4 py-1.5 rounded-sm border border-gold/40 text-center shadow-lift">
              <span className="font-display text-sm text-cream font-medium block">
                {project.title}
              </span>
              <span className="text-[10px] text-stone uppercase tracking-widest block">
                {project.location ? `${project.location} · ${project.city}` : project.city}
              </span>
            </div>
          </div>
        </div>

        {/* Proximity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {connectivityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-sm bg-cream/50 border border-line/60">
                <div className="w-9 h-9 rounded-sm bg-ivory border border-line flex items-center justify-center text-gold shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-ink">{item.title}</span>
                    <span className="text-[11px] font-mono font-medium text-gold">{item.distance}</span>
                  </div>
                  <p className="text-[11px] text-stone font-light leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
