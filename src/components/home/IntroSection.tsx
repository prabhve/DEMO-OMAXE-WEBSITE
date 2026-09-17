import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const IntroSection: React.FC = () => {
  return (
    <section
      aria-label="About Omaxe"
      className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16 bg-cream text-ink relative"
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left Column: Monumental Light Serif & Editorial Prose */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            <div className="space-y-4 sm:space-y-6">
              <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                Heritage Since 1987
              </span>
              <h2 className="font-display text-[32px] sm:text-4xl md:text-5xl lg:text-[56px] font-light text-ink leading-[1.08] tracking-[-0.02em]">
                Turning dreams into timeless reality across India’s evolving horizons.
              </h2>
            </div>

            <div className="space-y-6 text-stone text-base leading-[1.75] font-light max-w-[62ch]">
              <p>
                Founded in 1987 by visionary entrepreneur Mr. Rohtaas Goel, Omaxe has quietly sculpted the built landscape of modern India with restraint, architectural rigor, and enduring integrity. Listed on the National and Bombay Stock Exchanges, our path is rooted in four decades of uncompromising craftsmanship.
              </p>
              <p>
                From expansive low-density sanctuaries to self-contained 300-acre integrated townships and landmark sports-retail destinations in the capital, we create places that endure for generations.
              </p>
            </div>

            <div className="pt-4">
              <Button
                to="/about-us"
                variant="tertiary"
                icon={<ArrowRight className="w-3.5 h-3.5 text-gold" />}
              >
                Our Story &amp; Philosophy
              </Button>
            </div>
          </div>

          {/* Right Column: Single Monumental Architectural Still */}
          <div className="lg:col-span-6 flex justify-end">
            <div className="relative w-full max-w-[540px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-ink-soft">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
                  alt="Architectural sanctuary by Omaxe"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[15%] transition-all duration-1000 ease-luxury hover:grayscale-0 hover:scale-105"
                />
              </div>
              <div className="mt-4 flex justify-between items-center text-[11px] uppercase tracking-[0.18em] text-stone font-light">
                <span>The Forest Spa, Sector 43</span>
                <span>Faridabad, NCR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
