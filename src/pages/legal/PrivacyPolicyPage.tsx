import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { COMPANY_DETAILS } from '../../data/company';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Digital Personal Data Protection (DPDP) Act Compliance
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Privacy Policy
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Effective Date: January 01, 2026 · Omaxe Limited and its subsidiary companies are committed to protecting the confidentiality and privacy of personal data collected through our digital interfaces.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-ivory border border-line p-8 sm:p-12 rounded-sm space-y-8 text-xs sm:text-sm text-stone leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">1. Introduction &amp; Corporate Identity</h2>
            <p>
              This Privacy Policy applies to <strong>Omaxe Limited</strong> (CIN: {COMPANY_DETAILS.cin}), having its corporate office at {COMPANY_DETAILS.address}, and its group entities, joint ventures, and subsidiaries (collectively referred to as "Omaxe", "we", "us", or "our").
            </p>
            <p>
              By accessing our website ({COMPANY_DETAILS.website}), customer mobile portals, or registering inquiries via our digital advertisements, you consent to the data collection and processing practices articulated in this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">2. Information We Collect</h2>
            <p>We collect information necessary to deliver transparent real estate services and comply with Indian statutory requirements:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Contact &amp; Identification Data:</strong> Full legal name, residential address, email address, telephone numbers, and country of residence.</li>
              <li><strong>Statutory Due Diligence:</strong> Permanent Account Number (PAN), Aadhaar details, passport credentials (for NRIs), and banking identifiers for booking payments.</li>
              <li><strong>Transactional Details:</strong> Unit allotments, installment payment receipts, loan sanction letters, and customer support ticket histories.</li>
              <li><strong>Digital Identifiers:</strong> IP addresses, browser specifications, operating system logs, and anonymous cookies to optimize website performance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">3. Purpose and Legal Basis of Processing</h2>
            <p>Personal information is processed strictly for legitimate corporate purposes:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Facilitating site visits, unit allotments, and execution of Builder-Buyer Agreements (BBA).</li>
              <li>Submitting statutory filings with State Real Estate Regulatory Authorities (RERA) and municipal registry bodies.</li>
              <li>Disseminating construction milestone updates, demand notices, and audited annual reports to shareholders.</li>
              <li>Direct telephone and electronic communication regarding project inquiries initiated by you.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">4. Information Sharing &amp; Third Parties</h2>
            <p>
              Omaxe does not monetize or trade personal data to unsolicited third-party marketing entities. Information may be shared solely under strict non-disclosure agreements with:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Authorized banking partners for processing home loan applications upon your request.</li>
              <li>Registrar &amp; Share Transfer Agents (Link Intime India Pvt. Ltd.) for shareholder dividend and equity records.</li>
              <li>Sub-Registrar offices and government revenue authorities for legal title deed conveyance.</li>
              <li>Judicial, law enforcement, or regulatory bodies when mandated by Indian court orders or SEBI/RERA directives.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">5. Data Retention &amp; Security Architecture</h2>
            <p>
              We implement industry-standard 256-bit TLS encryption, role-based database permissions, and routine vulnerability assessments to safeguard records. Real estate conveyance records and tax invoice vouchers are retained for statutory periods mandated under the Indian Companies Act and Income Tax Act.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl text-ink font-medium">6. Data Protection Officer (DPO) Contact</h2>
            <p>
              For grievances, requests to review personal data, or withdrawal of marketing consent under the Digital Personal Data Protection Act, please contact:
            </p>
            <div className="p-4 bg-cream border border-line rounded-sm space-y-1 text-xs">
              <p><strong>Grievance Officer:</strong> Chief Data Protection Officer, Omaxe Limited</p>
              <p><strong>Corporate Address:</strong> Omaxe House, 7, LSC, Kalkaji, New Delhi - 110019</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@omaxe.com" className="text-gold hover:underline">privacy@omaxe.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
