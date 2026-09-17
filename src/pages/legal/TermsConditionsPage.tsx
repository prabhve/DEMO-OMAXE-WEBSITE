import React from 'react';
import { FileCheck, Shield, AlertCircle } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { COMPANY_DETAILS } from '../../data/company';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms & Conditions' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Legal Framework &amp; Usage Terms
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Terms &amp; Conditions
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Governing your access to and utilization of the website, mobile digital applications, and corporate services of Omaxe Limited.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-ivory border border-line p-8 sm:p-12 rounded-sm space-y-8 text-xs sm:text-sm text-stone leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing this website, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions. If you do not accept these terms in their entirety, you must discontinue the use of this portal immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">2. Nature of Website Information</h2>
            <p>
              The visual renders, floor plans, dimensions, elevations, master layouts, amenities, and project timelines depicted on this website are conceptual and artist’s impressions. They do not constitute a legal offer, warranty, or contractual commitment between Omaxe Limited and any prospective customer.
            </p>
            <p>
              All property purchases, allotments, and payment milestones are strictly governed by the formal bilateral <strong>Allotment Letter</strong> and <strong>Builder-Buyer Agreement (BBA)</strong> executed between the buyer and Omaxe Limited or its affiliated project entity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">3. RERA Disclosures &amp; Approvals</h2>
            <p>
              All ongoing residential and commercial developments displayed on this platform are registered with their respective State Real Estate Regulatory Authorities (RERA) as mandated under the Real Estate (Regulation and Development) Act, 2016. Visitors are encouraged to verify state RERA portals for sanctioned drawings, stage-wise development schedules, and statutory approvals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">4. Intellectual Property Rights</h2>
            <p>
              All text, architectural illustrations, photographic imagery, video walk-throughs, vector emblems, brand trademarks, and proprietary source code featured on this portal are the intellectual property of Omaxe Limited or licensed under appropriate commercial arrangements.
            </p>
            <p>
              Reproduction, redistribution, scraping, modification, or commercial exploitation of any material without prior written authorization from the Corporate Communications Department of Omaxe Limited is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">5. External Hyperlinks &amp; Third-Party Services</h2>
            <p>
              This website may contain links to external third-party portals, including stock exchanges (BSE, NSE), banking institutions, and social media platforms. Omaxe exercises no editorial control over such external websites and assumes no liability for their contents or privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">6. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms and Conditions shall be construed and governed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or relating to the use of this website shall be subject to the exclusive jurisdiction of the competent courts located in <strong>New Delhi, India</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
