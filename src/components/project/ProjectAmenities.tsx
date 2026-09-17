import React from 'react';
import {
  Trophy,
  ShoppingBag,
  Hotel,
  Utensils,
  Car,
  Compass,
  Waves,
  LifeBuoy,
  Sparkles,
  Activity,
  Film,
  ShieldCheck,
  Bell,
  Sun,
  ArrowUpCircle,
  Cpu,
  Train,
  Wind,
  MoveVertical,
  Flag,
  Coffee,
  Briefcase,
  Trees,
  Zap,
  Award,
  Users,
  Heart,
  Smile,
  Building,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface ProjectAmenitiesProps {
  amenities: { name: string; icon: string }[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Trophy,
  ShoppingBag,
  Hotel,
  Utensils,
  Car,
  Compass,
  Waves,
  LifeBuoy,
  Sparkles,
  Activity,
  Film,
  ShieldCheck,
  Bell,
  Sun,
  ArrowUpCircle,
  Cpu,
  Train,
  Wind,
  MoveVertical,
  Flag,
  Coffee,
  Briefcase,
  Trees,
  Zap,
  Award,
  Users,
  Heart,
  Smile,
  Building,
  Eye,
};

export const ProjectAmenities: React.FC<ProjectAmenitiesProps> = ({ amenities }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {amenities.map((item, idx) => {
        const IconComponent = ICON_MAP[item.icon] || CheckCircle2;
        return (
          <div
            key={idx}
            className="p-5 bg-ivory border border-line rounded-sm flex items-center gap-4 transition-all duration-300 hover:border-gold/60 hover:shadow-soft group"
          >
            <div className="w-10 h-10 rounded-sm bg-cream flex items-center justify-center text-gold group-hover:bg-ink group-hover:text-gold transition-colors duration-300 shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-medium text-ink leading-snug block">
                {item.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone/80">
                Premium Specification
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
