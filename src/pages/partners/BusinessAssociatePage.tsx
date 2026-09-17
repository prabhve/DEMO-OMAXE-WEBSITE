import React, { useState } from 'react';
import { 
  Handshake, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Car, 
  FileCheck, 
  PhoneCall, 
  Mail,
  Building2
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';

interface BusinessAssociatePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const BusinessAssociatePage: React.FC<BusinessAssociatePageProps> = ({ onOpenEnquiry }) => {
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    agencyName: '',
    reraAgentNo: '',
    principalBrokerName: '',
    email: '',
    phone: '',
    city: 'New Delhi',
    brokerageType: 'Private Wealth & Luxury Real Estate',
    experienceYears: '5-10 Years',
    annualSalesVolume: '₹25 Cr – ₹50 Cr',
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSubmitted(true);
    setTimeout(() => {
      setPartnerSubmitted(false);
      setPartnerForm({
        agencyName: '',
        reraAgentNo: '',
        principalBrokerName: '',
        email: '',
        phone: '',
        city: 'New Delhi',
        brokerageType: 'Private Wealth & Luxury Real Estate',
        experienceYears: '5-10 Years',
        annualSalesVolume: '₹25 Cr – ₹50 Cr',
      });
    }, 5000);
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Business Associates' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Channel Partner &amp; Wealth Advisory Alliance
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Omaxe Business Associate Program
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Collaborate with an iconic national builder. Unlock priority inventory access, prompt commission disbursement cycles, bespoke site logistics, and international associate conclaves.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 space-y-20">
        {/* Associate Perks */}
        <div className="space-y-10">
          <SectionHeading
            eyebrow="Mutual Prosperity"
            title="The Omaxe Partner Advantage"
            description="Built on a foundation of uncompromised transparency, punctuality, and mutual trust."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Fast-Track Commission</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Transparent milestone-linked payouts processed electronically within 15 days of buyer agreement execution and initial demand realization.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Priority Inventory Allotment</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Exclusive pre-launch previews and corner unit reservations across marquee flagships like The Omaxe State, Dwarka and The Lake, New Chandigarh.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Bespoke Client Logistics</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Complimentary luxury chauffeur-driven site visit cabs for your prospective high-net-worth buyers, accompanied by on-site hospitality.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Annual Global Conclaves</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Top performing business associates qualify for our prestigious annual leadership summit held across world capitals including London, Vienna, and Tokyo.
              </p>
            </div>
          </div>
        </div>

        {/* Channel Partner Registration Form */}
        <div className="p-8 lg:p-12 bg-ivory border border-line rounded-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gold block">
              Official RERA Registration
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium">
              Channel Partner Empanelment Application
            </h3>
            <p className="text-xs text-stone leading-relaxed font-light">
              In strict adherence to state RERA regulations, all channel partners must possess a valid state Real Estate Regulatory Authority Agent Certificate.
            </p>
          </div>

          {partnerSubmitted ? (
            <div className="p-8 bg-cream border border-gold text-ink rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-gold font-medium text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Partner Application Successfully Registered</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                Thank you, <strong>{partnerForm.principalBrokerName}</strong>. Application Reference: <strong>OMX-CP-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>. The Head of Channel Sales will contact you with the empanelment kit and agreement within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePartnerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Agency / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.agencyName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, agencyName: e.target.value })}
                    placeholder="e.g. Apex Realty Advisory LLP"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    RERA Agent Registration No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.reraAgentNo}
                    onChange={(e) => setPartnerForm({ ...partnerForm, reraAgentNo: e.target.value })}
                    placeholder="e.g. HARERA/GGM/2022/123"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Principal Broker / Managing Director *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.principalBrokerName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, principalBrokerName: e.target.value })}
                    placeholder="Full legal name"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    placeholder="partner@yourfirm.com"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Mobile / WhatsApp Contact *
                  </label>
                  <input
                    type="tel"
                    required
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Operating Primary City *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerForm.city}
                    onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                    placeholder="e.g. New Delhi, Chandigarh, Lucknow"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Practice Specialization
                  </label>
                  <select
                    value={partnerForm.brokerageType}
                    onChange={(e) => setPartnerForm({ ...partnerForm, brokerageType: e.target.value })}
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                  >
                    <option>Private Wealth &amp; Luxury Real Estate</option>
                    <option>Commercial Retail &amp; Office Leasing</option>
                    <option>Township &amp; Plotted Developments</option>
                    <option>NRI &amp; International Portfolio Advisory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Industry Experience
                  </label>
                  <select
                    value={partnerForm.experienceYears}
                    onChange={(e) => setPartnerForm({ ...partnerForm, experienceYears: e.target.value })}
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                  >
                    <option>3–5 Years</option>
                    <option>5–10 Years</option>
                    <option>10–15 Years</option>
                    <option>15+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Annual Gross Transaction Value
                  </label>
                  <select
                    value={partnerForm.annualSalesVolume}
                    onChange={(e) => setPartnerForm({ ...partnerForm, annualSalesVolume: e.target.value })}
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                  >
                    <option>₹10 Cr – ₹25 Cr</option>
                    <option>₹25 Cr – ₹50 Cr</option>
                    <option>₹50 Cr – ₹100 Cr</option>
                    <option>₹100 Cr+</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full sm:w-auto px-8 text-xs uppercase tracking-wider font-medium"
                >
                  Submit Channel Partner Application
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
