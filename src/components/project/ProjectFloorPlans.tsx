import React, { useState } from 'react';
import { Layers, FileText, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProjectFloorPlansProps {
  projectTitle: string;
  category: string;
  configuration: string;
  onOpenEnquiry: (topic?: string) => void;
}

interface PlanItem {
  id: string;
  name: string;
  type: string;
  superArea: string;
  carpetArea: string;
  balconies: string;
  description: string;
}

export const ProjectFloorPlans: React.FC<ProjectFloorPlansProps> = ({
  projectTitle,
  category,
  configuration,
  onOpenEnquiry,
}) => {
  // Derive realistic plan variations based on category and config
  const plans: PlanItem[] = category === 'commercial'
    ? [
        {
          id: 'retail-anchor',
          name: 'Flagship Anchor Retail Store',
          type: 'Ground Level Prime Frontage',
          superArea: '2,500 - 6,000 sq.ft.',
          carpetArea: '1,850 - 4,500 sq.ft.',
          balconies: 'Double-height storefront',
          description: 'Sprawling high-street retail footprints engineered for luxury international flagships with dedicated service dock access and high-visibility glass facades.',
        },
        {
          id: 'retail-boutique',
          name: 'Luxury Boutique Showroom',
          type: 'First / Second Boulevard Level',
          superArea: '850 - 1,800 sq.ft.',
          carpetArea: '620 - 1,350 sq.ft.',
          balconies: 'Wide arcade colonnade',
          description: 'Intimate, curated high-street retail units ideal for couture ateliers, premium watchmakers, jewellery gallerias, and artisan craft boutiques.',
        },
        {
          id: 'fnb-terrace',
          name: 'Gourmet Rooftop Restaurant Suite',
          type: 'Terrace & Open-to-Sky Dining',
          superArea: '3,200 - 8,500 sq.ft.',
          carpetArea: '2,400 - 6,200 sq.ft.',
          balconies: 'Expansive private terrace deck',
          description: 'Panoramic open-air dining decks with built-in provisions for kitchen exhaust, grease traps, heavy-load service lifts, and uninterrupted city skyline views.',
        },
      ]
    : [
        {
          id: 'plan-3bhk',
          name: '3 BHK Signature Residence',
          type: '3 Bed · 3 Bath · Powder Room · Utility',
          superArea: '1,850 - 2,450 sq.ft.',
          carpetArea: '1,380 - 1,820 sq.ft.',
          balconies: '3 Wrap-around Balconies',
          description: 'Optimal cross-ventilation, generous living-dining expanses with floor-to-ceiling double-glazed windows, and distinct separation between family suites and entertainment areas.',
        },
        {
          id: 'plan-4bhk',
          name: '4 BHK Grand Suite + Servant Room',
          type: '4 Bed · 5 Bath · Family Lounge · Servant Quarter',
          superArea: '2,950 - 3,850 sq.ft.',
          carpetArea: '2,200 - 2,900 sq.ft.',
          balconies: 'Expansive 10-ft Deep Terrace Deck',
          description: 'Palatial master suite featuring walk-in wardrobes, dual vanity en-suite, separate service entry, and dedicated executive work-from-home lounge.',
        },
        {
          id: 'plan-penthouse',
          name: 'Sky Penthouse Villa',
          type: 'Duplex · 5 Bed · Private Plunge Pool · Terrace',
          superArea: '4,850 - 6,500 sq.ft.',
          carpetArea: '3,700 - 5,100 sq.ft.',
          balconies: 'Private Rooftop Sky Deck',
          description: 'Crown-jewel duplex residence offering double-height living salons, private elevator access, infinite horizons, and a bespoke outdoor jacuzzi lounge.',
        },
      ];

  const [activePlanId, setActivePlanId] = useState<string>(plans[0].id);
  const activePlan = plans.find((p) => p.id === activePlanId) || plans[0];

  return (
    <div className="space-y-8">
      {/* Plan Selection Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-4">
        {plans.map((plan) => {
          const isActive = plan.id === activePlanId;
          return (
            <button
              key={plan.id}
              onClick={() => setActivePlanId(plan.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-btn font-medium rounded-sm transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-ink text-cream shadow-soft'
                  : 'bg-ivory border border-line text-stone hover:text-ink hover:border-gold'
              }`}
            >
              {plan.name}
            </button>
          );
        })}
      </div>

      {/* Plan Details & Architectural Blueprint Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-ivory border border-line rounded-sm p-6 sm:p-8">
        {/* Left: Schematic Layout Representation */}
        <div className="lg:col-span-6 bg-cream border border-line rounded-sm p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
          {/* Blueprint Stylized Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#A8823C_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          {/* Architectural Diagram Box */}
          <div className="relative z-10 w-full max-w-sm aspect-[4/3] border-2 border-dashed border-gold/60 rounded-sm p-6 flex flex-col justify-between bg-ivory/80 backdrop-blur-sm">
            <div className="flex justify-between items-start border-b border-line pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold block">
                  Scale: 1:100 Architectural CAD
                </span>
                <span className="font-display text-lg text-ink font-normal">
                  {activePlan.name}
                </span>
              </div>
              <Layers className="w-5 h-5 text-gold shrink-0" />
            </div>

            <div className="space-y-2 py-4 text-center">
              <span className="font-mono text-xs text-stone uppercase tracking-widest block">
                {activePlan.type}
              </span>
              <span className="font-display text-2xl text-ink font-medium block">
                {activePlan.superArea}
              </span>
              <span className="text-[11px] text-stone block">
                Super Built-up Area
              </span>
            </div>

            <div className="pt-3 border-t border-line flex justify-between text-[11px] text-stone">
              <span>Carpet Area: {activePlan.carpetArea}</span>
              <span>{activePlan.balconies}</span>
            </div>
          </div>

          <span className="relative z-10 text-[10px] text-stone uppercase tracking-wider mt-4">
            *Representative layout. Actual architectural drawings supplied on request.
          </span>
        </div>

        {/* Right: Specifications & Plan Enquiry */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-gold block">
              Configuration Specification
            </span>
            <h4 className="font-display text-2xl sm:text-3xl text-ink font-normal">
              {activePlan.name}
            </h4>
            <p className="text-xs text-stone leading-relaxed font-light">
              {activePlan.description}
            </p>
          </div>

          {/* Specs List */}
          <div className="space-y-3 py-2 border-y border-line">
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-stone">Super Built-Up Area</span>
              <span className="font-medium text-ink font-mono">{activePlan.superArea}</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-stone">Estimated Carpet Area</span>
              <span className="font-medium text-ink font-mono">{activePlan.carpetArea}</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-stone">Balconies / Decks</span>
              <span className="font-medium text-ink">{activePlan.balconies}</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-stone">Internal Finishes</span>
              <span className="font-medium text-ink">Imported Italian Marble &amp; Hardwood</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              onClick={() => onOpenEnquiry(`Request Floor Plan: ${projectTitle} - ${activePlan.name}`)}
              variant="primary"
              icon={<FileText className="w-4 h-4" />}
            >
              Request Floor Plan &amp; CAD
            </Button>
            <Button
              onClick={() => onOpenEnquiry(`Schedule Sample Flat Visit: ${projectTitle}`)}
              variant="secondary"
              icon={<Check className="w-4 h-4" />}
            >
              Tour Sample Residence
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
