import React from 'react';

export const SeoCopyBlock: React.FC = () => {
  const pillars = [
    {
      title: 'Four Decades of Engineering Precision & Governance',
      description:
        'Established in 1987 as a premier civil contracting enterprise, Omaxe carries an architectural heritage anchored in structural rigor, ISO-certified benchmarks, and transparent corporate governance as a BSE/NSE listed entity.',
    },
    {
      title: 'Pioneering Regional Mega-Townships & PPP Infrastructure',
      description:
        'Transforming regional Tier II & III growth corridors across Punjab, Uttar Pradesh, Madhya Pradesh, and Haryana through self-sustaining eco-townships and landmark Public-Private Partnerships.',
    },
    {
      title: 'Restrained Luxury, Enduring Trust & Generational Delivery',
      description:
        'With over 13.02 Million Sq.Mtr. handed over across 31 cities, Omaxe delivers timeless architecture, dedicated post-handover facility care, and deep relationship stewardship for over 150,000 families and investors.',
    },
  ];

  return (
    <section
      aria-label="Company Overview and Heritage"
      className="py-56 sm:py-72 lg:py-80 bg-cream text-ink border-t border-line relative"
    >
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-8">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
              Architectural Legacy
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light text-ink leading-[1.08] tracking-[-0.02em]">
              One of the Leading Real Estate Developers in India
            </h2>

            <p className="text-stone text-base leading-[1.75] font-light max-w-[62ch]">
              Omaxe Limited has consistently shaped modern India’s built landscape. Guided by our motto &ldquo;Turning Dreams into Reality,&rdquo; our integrated developments harmonize modern architectural aesthetics, ecological preservation, and long-term socio-economic vitality.
            </p>
          </div>

          {/* Right Column: Three Pillars as Elegant Hairline Rows */}
          <div className="lg:col-span-7 divide-y divide-line border-t border-b border-line">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="py-12 space-y-3">
                <h3 className="font-display text-base font-normal text-ink leading-snug tracking-[-0.01em]">
                  {pillar.title}
                </h3>
                <p className="text-stone text-base leading-[1.75] font-light max-w-[62ch]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
