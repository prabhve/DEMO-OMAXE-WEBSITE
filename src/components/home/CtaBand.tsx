import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '../ui/Button';

interface CtaBandProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ onOpenEnquiry }) => {
  return (
    <section
      aria-label="Private Consultation Call to Action"
      className="relative py-60 sm:py-72 lg:py-80 overflow-hidden bg-ink text-cream"
    >
      {/* Full-bleed background image with deep serene scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2000&auto=format&fit=crop&q=80"
          alt="Luxury architectural twilight ambiance"
          loading="lazy"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-ink/90" />
      </div>

      {/* Content with Monumental Silence and Light Serif */}
      <div className="relative z-10 max-w-[960px] mx-auto px-8 text-center space-y-10">
        <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
          Private Appointment
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light text-cream leading-[1.08] tracking-[-0.02em]">
          Experience our master-planned sanctuaries firsthand.
        </h2>

        <p className="text-base text-cream/70 font-light leading-[1.75] max-w-[62ch] mx-auto">
          Allow our senior private client advisory team to curate a bespoke viewing itinerary tailored to your residence or commercial portfolio objectives.
        </p>

        <div className="pt-6">
          <Button
            onClick={() => onOpenEnquiry('Schedule a Visit')}
            variant="gold-outline"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Schedule a Private Viewing
          </Button>
        </div>
      </div>
    </section>
  );
};
