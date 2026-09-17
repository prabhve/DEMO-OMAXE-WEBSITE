import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  GraduationCap, 
  Compass, 
  Sparkles, 
  Award, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Quote
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';

interface LifeAtOmaxePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const LifeAtOmaxePage: React.FC<LifeAtOmaxePageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Careers', href: '/career/current-openings' },
              { label: 'Life at Omaxe' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Culture, People &amp; Purpose
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Building Nations, Shaping Careers
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Join an institution driven by engineering ambition, mutual respect, and meritocracy — where over 3,000 professionals transform urban skylines every day.
            </p>
          </div>

          <div className="pt-2">
            <Link to="/career/current-openings">
              <Button variant="gold" size="md" className="text-xs uppercase tracking-wider">
                Explore Current Openings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 space-y-20">
        {/* Core Cultural Pillars */}
        <div className="space-y-12">
          <SectionHeading
            eyebrow="The Fabric of Our Culture"
            title="Four Pillars of Life at Omaxe"
            description="Our foundational operating philosophy that empowers every team member to innovate with confidence."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Architectural Audacity</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                We take pride in solving complex civic challenges — from building Asia’s largest heritage parking in Chandni Chowk to creating Delhi's first Olympic sports-led commercial district.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Continuous Learning</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Through the Omaxe Leadership Academy, our teams access modern building information modeling (BIM), safety leadership certifications, and executive mentorship.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Uncompromising Meritocracy</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Growth is accelerated by outcome delivery and operational integrity, not hierarchy. Young engineers frequently lead multi-crore site execution mandates.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Holistic Wellness</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Comprehensive health insurance for extended families, parental leave policies, annual preventive wellness checkups, and collaborative mental health workshops.
              </p>
            </div>
          </div>
        </div>

        {/* Voices of Omaxe */}
        <div className="p-8 lg:p-12 bg-ivory border border-line rounded-sm space-y-10">
          <SectionHeading
            eyebrow="Employee Perspectives"
            title="Voices from the Field &amp; Studio"
            alignment="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-cream border border-line rounded-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-gold/60" />
                <p className="text-xs text-stone italic leading-relaxed">
                  "Leading the structural casting of 'The Lake' towers in New Chandigarh taught me that scale at Omaxe is never just about concrete — it’s about precision ecological engineering and creating generational landmarks."
                </p>
              </div>
              <div className="border-t border-line pt-3">
                <h5 className="font-display text-sm text-ink font-medium">Vikramaditya Sharma</h5>
                <span className="text-[11px] text-stone">Chief Project Engineer · 9 Years at Omaxe</span>
              </div>
            </div>

            <div className="p-6 bg-cream border border-line rounded-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-gold/60" />
                <p className="text-xs text-stone italic leading-relaxed">
                  "As a female structural architect, working on Omaxe Chowk gave me immense autonomy. Managing heritage constraints alongside cutting-edge underground robotic piling was a career-defining experience."
                </p>
              </div>
              <div className="border-t border-line pt-3">
                <h5 className="font-display text-sm text-ink font-medium">Pooja Nambiar</h5>
                <span className="text-[11px] text-stone">Senior Urban Design Lead · 6 Years at Omaxe</span>
              </div>
            </div>

            <div className="p-6 bg-cream border border-line rounded-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-gold/60" />
                <p className="text-xs text-stone italic leading-relaxed">
                  "What sets Omaxe apart is the direct access to top leadership. The Chairman and MD know site heads by name, and thoughtful suggestions to enhance buyer experience are welcomed instantly."
                </p>
              </div>
              <div className="border-t border-line pt-3">
                <h5 className="font-display text-sm text-ink font-medium">Ramanpreet Singh</h5>
                <span className="text-[11px] text-stone">General Manager – CRM &amp; Handover · 11 Years at Omaxe</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner to Current Openings */}
        <div className="p-8 lg:p-12 bg-ink text-cream rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-gold font-medium block">
              Take the Next Step
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-cream font-normal">
              Ready to write your own chapter with Omaxe?
            </h3>
            <p className="text-xs text-stone">
              We are actively looking for talented leaders in Civil Engineering, Architectural Design, Commercial Leasing, and CRM across Delhi, Punjab, and Uttar Pradesh.
            </p>
          </div>
          <Link to="/career/current-openings">
            <Button variant="gold" size="md" className="whitespace-nowrap text-xs uppercase tracking-wider">
              Browse Open Positions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
