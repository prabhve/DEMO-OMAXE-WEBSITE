import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Layers, 
  Wrench, 
  HardHat, 
  Compass 
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';

interface VendorEmpanelmentPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const VendorEmpanelmentPage: React.FC<VendorEmpanelmentPageProps> = ({ onOpenEnquiry }) => {
  const [vendorSubmitted, setVendorSubmitted] = useState(false);
  const [vendorForm, setVendorForm] = useState({
    companyName: '',
    incorporationYear: '2015',
    panNo: '',
    gstin: '',
    category: 'Civil & Structural Contracting',
    turnover: '₹25 Cr – ₹50 Cr',
    authorizedPerson: '',
    email: '',
    phone: '',
    city: 'New Delhi',
    pastProjectsSummary: '',
  });

  const categories = [
    { title: 'Civil & Structural Works', icon: Building2, desc: 'Piling, RCC framework, ready-mix concrete supply, precast components, and masonry works.' },
    { title: 'MEP, HVAC & Firefighting', icon: Wrench, desc: 'Substations, electrical cabling, HVAC chillers, plumbing networks, fire hydrants, and BMS automation.' },
    { title: 'Facade, Glazing & Interiors', icon: Layers, desc: 'Curtain wall glazing, ACP cladding, Italian marble flooring, false ceiling, and acoustic treatments.' },
    { title: 'Heavy Plant & Earthmoving', icon: Truck, desc: 'Tower cranes, boom placers, transit mixers, earth excavators, and passenger hoists.' },
    { title: 'Landscape & Horticulture', icon: Compass, desc: 'Hardscape stone paving, irrigation systems, mature tree transplantation, water bodies, and illumination.' },
    { title: 'Site Safety & Environmental', icon: HardHat, desc: 'PPE equipment, anti-smog water cannons, noise barriers, environmental monitoring, and solar installations.' },
  ];

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVendorSubmitted(true);
    setTimeout(() => {
      setVendorSubmitted(false);
      setVendorForm({
        companyName: '',
        incorporationYear: '2015',
        panNo: '',
        gstin: '',
        category: 'Civil & Structural Contracting',
        turnover: '₹25 Cr – ₹50 Cr',
        authorizedPerson: '',
        email: '',
        phone: '',
        city: 'New Delhi',
        pastProjectsSummary: '',
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
              { label: 'Omaxe Care', href: '/care/customer-care' },
              { label: 'Vendor Empanelment' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Supply Chain &amp; Procurement Portal
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Vendor &amp; Contractor Empanelment
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Collaborate with one of India’s most prolific infrastructure developers. We invite certified contracting enterprises, material suppliers, and specialized engineering partners into our audited vendor consortium.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert('Downloading Omaxe_Vendor_Prequalification_Dossier.pdf (2.4 MB)')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-ink font-medium text-xs uppercase tracking-wider rounded-sm hover:bg-gold-soft transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Prequalification Form (VPQ)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 space-y-20">
        {/* Categories of Empanelment */}
        <div className="space-y-10">
          <SectionHeading
            eyebrow="Procurement Verticals"
            title="Open Empanelment Categories"
            description="We actively source industry-leading engineering, materials, and machinery providers across all operational hubs."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="p-6 bg-ivory border border-line rounded-sm space-y-3">
                  <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-lg text-ink font-medium">{cat.title}</h4>
                  <p className="text-xs text-stone leading-relaxed font-light">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vendor Registration Form */}
        <div className="p-8 lg:p-12 bg-ivory border border-line rounded-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gold block">
              E-Procurement Registration
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium">
              Submit Vendor Expression of Interest (EOI)
            </h3>
            <p className="text-xs text-stone leading-relaxed font-light">
              Registered applicants undergo commercial due diligence, past technical audits, and statutory credential verification before formal empanelment.
            </p>
          </div>

          {vendorSubmitted ? (
            <div className="p-8 bg-cream border border-gold text-ink rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-gold font-medium text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Vendor EOI Successfully Received</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                Thank you for applying. Reference Dossier ID: <strong>OMX-PROC-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>. The Central Procurement &amp; Contracts Committee at Omaxe House will review your submission and contact the authorized representative within 7 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleVendorSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Company / Firm Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.companyName}
                    onChange={(e) => setVendorForm({ ...vendorForm, companyName: e.target.value })}
                    placeholder="e.g. UltraTech Infra Ltd."
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    GSTIN Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.gstin}
                    onChange={(e) => setVendorForm({ ...vendorForm, gstin: e.target.value })}
                    placeholder="e.g. 07AAAAA0000A1Z5"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Company PAN *
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.panNo}
                    onChange={(e) => setVendorForm({ ...vendorForm, panNo: e.target.value })}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Primary Category *
                  </label>
                  <select
                    value={vendorForm.category}
                    onChange={(e) => setVendorForm({ ...vendorForm, category: e.target.value })}
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                  >
                    <option>Civil &amp; Structural Contracting</option>
                    <option>MEP, Electrical &amp; HVAC</option>
                    <option>Facade, Glazing &amp; Finishing</option>
                    <option>Heavy Plant &amp; Machinery Lease</option>
                    <option>Landscaping &amp; Horticulture</option>
                    <option>Site Safety, CCTV &amp; Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Annual Turnover (Last FY)
                  </label>
                  <select
                    value={vendorForm.turnover}
                    onChange={(e) => setVendorForm({ ...vendorForm, turnover: e.target.value })}
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                  >
                    <option>₹5 Cr – ₹10 Cr</option>
                    <option>₹10 Cr – ₹25 Cr</option>
                    <option>₹25 Cr – ₹50 Cr</option>
                    <option>₹50 Cr – ₹100 Cr</option>
                    <option>₹100 Cr+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Headquartered City *
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.city}
                    onChange={(e) => setVendorForm({ ...vendorForm, city: e.target.value })}
                    placeholder="City"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Authorized Representative Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.authorizedPerson}
                    onChange={(e) => setVendorForm({ ...vendorForm, authorizedPerson: e.target.value })}
                    placeholder="Director / Sales Head"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Official Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={vendorForm.email}
                    onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                    placeholder="procurement@yourcompany.com"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Direct Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={vendorForm.phone}
                    onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                  Summary of Past Major Real Estate / Infrastructure Projects Executed
                </label>
                <textarea
                  rows={3}
                  value={vendorForm.pastProjectsSummary}
                  onChange={(e) => setVendorForm({ ...vendorForm, pastProjectsSummary: e.target.value })}
                  placeholder="Mention clients, project names, scope of work completed, and contract value..."
                  className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full sm:w-auto px-8 text-xs uppercase tracking-wider font-medium"
                >
                  Submit Empanelment Application
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Ethical Procurement Code */}
        <div className="p-6 bg-cream border border-line rounded-sm flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-gold shrink-0 mt-1" />
          <div className="space-y-1 text-xs text-stone leading-relaxed">
            <h5 className="font-display text-sm text-ink font-medium">Fair Tender &amp; Integrity Compliance</h5>
            <p>
              Omaxe Limited maintains an uncompromising zero-tolerance policy against corrupt practices, bid collusions, or inducement. All commercial awards follow algorithmic electronic comparative statements (CS) vetted by independent statutory auditors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
