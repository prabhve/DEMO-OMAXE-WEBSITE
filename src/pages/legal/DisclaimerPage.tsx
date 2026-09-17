import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Statutory Disclaimer' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Statutory Disclaimers &amp; Regulatory Notices
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Disclaimer
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Formal legal notices regarding digital renderings, specifications, stock trading volatility, and real estate market risks.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-ivory border border-line p-8 sm:p-12 rounded-sm space-y-8 text-xs sm:text-sm text-stone leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">Real Estate Marketing &amp; Architectural Disclaimer</h2>
            <p>
              The contents of this website — including computer-generated three-dimensional renders, photographs, virtual walkthroughs, architectural perspectives, plans, specifications, dimensions, amenities, facilities, and surrounding infrastructure — are indicative, artistic impressions and conceptual in nature.
            </p>
            <p>
              The developer reserves the unconditional right to alter, modify, amend, or substitute any layout, specification, or dimension in the interest of continuing development or in compliance with statutory approvals from municipal corporations, town planning departments, or environmental authorities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">RERA Statutory Verification</h2>
            <p>
              Prospective purchasers are advised to independently verify all details, specifications, carpet areas, RERA registration credentials, and terms of allotment by visiting our official sales galleries or reviewing the respective state RERA websites before entering into any financial transaction or signing an agreement to sell.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">Investor Relations &amp; Forward-Looking Statements</h2>
            <p>
              Certain statements published in the Investor Relations section of this website constitute "forward-looking statements" within the meaning of applicable securities legislation. These statements relate to future events, pipeline deliveries, capital expenditures, revenue realizations, or operational forecasts.
            </p>
            <p>
              Actual results may differ materially from those expressed or implied due to external economic circumstances, raw material cost fluctuations, regulatory delays, changes in interest rate environments, and judicial interpretations. Omaxe Limited undertakes no obligation to publicly update or revise any forward-looking statement following new information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">Fraudulent Communication Alert</h2>
            <p>
              The public is cautioned that Omaxe Limited does not solicit deposits or personal banking credentials through unsolicited telephone calls, instant messaging apps, or unverified social media profiles. All financial remittances must be made solely in favor of the designated escrow bank accounts of the company or its relevant project subsidiary.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
