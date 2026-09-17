import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Send, 
  Globe2, 
  ShieldCheck 
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { COMPANY_DETAILS, REGIONAL_OFFICES } from '../../data/company';

interface ContactUsPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onOpenEnquiry }) => {
  const [selectedOffice, setSelectedOffice] = useState('All');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Sales & Property Inquiries',
    city: 'New Delhi',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: 'Sales & Property Inquiries',
        city: 'New Delhi',
        message: '',
      });
    }, 5000);
  };

  const filteredOffices = selectedOffice === 'All' 
    ? REGIONAL_OFFICES 
    : REGIONAL_OFFICES.filter((off) => (off.city || '').toLowerCase().includes((selectedOffice || '').toLowerCase()));

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Pan-India Presence &amp; Corporate Liaison
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Connect with Omaxe
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Whether exploring prime residential acquisitions, institutional commercial leases, or shareholder relations, our national teams stand ready to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-ink-soft/70 border border-cream/10 rounded-sm">
              <span className="text-[10px] text-stone uppercase tracking-wider block">Customer Toll Free</span>
              <a href={`tel:${COMPANY_DETAILS.tollFree.replace(/\s+/g, '')}`} className="text-lg font-display text-gold hover:underline">
                {COMPANY_DETAILS.tollFree}
              </a>
            </div>
            <div className="p-4 bg-ink-soft/70 border border-cream/10 rounded-sm">
              <span className="text-[10px] text-stone uppercase tracking-wider block">Corporate Reception</span>
              <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="text-lg font-display text-cream hover:underline">
                {COMPANY_DETAILS.phone}
              </a>
            </div>
            <div className="p-4 bg-ink-soft/70 border border-cream/10 rounded-sm">
              <span className="text-[10px] text-stone uppercase tracking-wider block">Corporate Email</span>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-lg font-display text-cream hover:underline">
                {COMPANY_DETAILS.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 space-y-20">
        {/* Contact Form & Corporate HQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 p-8 bg-ivory border border-line rounded-sm space-y-6">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-gold block">
                Direct Communications
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-ink font-medium">
                Send a Message
              </h3>
              <p className="text-xs text-stone mt-1">
                Your inquiry will be routed directly to the designated department head.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-cream border border-gold text-ink rounded-sm space-y-3">
                <div className="flex items-center gap-2 text-gold font-medium text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message Received Successfully</span>
                </div>
                <p className="text-xs text-stone leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Inquiry Reference: <strong>OMX-MSG-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>. A team member from <strong>{formData.department}</strong> will reply to {formData.email} within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Inquiry Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                    >
                      <option>Sales &amp; Property Inquiries</option>
                      <option>Investor Relations &amp; Secretarial</option>
                      <option>NRI Private Wealth Desk</option>
                      <option>Commercial Leasing &amp; Retail</option>
                      <option>Customer Care &amp; Handover</option>
                      <option>Media &amp; Public Relations</option>
                      <option>Procurement &amp; Vendor Empanelment</option>
                      <option>Careers &amp; Human Resources</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Your Message / Requirement *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or preferred property location..."
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full text-xs uppercase tracking-wider font-medium"
                >
                  Send Inquiry to Omaxe
                </Button>
              </form>
            )}
          </div>

          {/* Corporate HQ Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-ivory border border-line rounded-sm space-y-4">
              <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">
                Corporate Headquarters
              </span>
              <h4 className="font-display text-xl text-ink font-medium">Omaxe House, New Delhi</h4>
              
              <div className="space-y-3 text-xs text-stone">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {COMPANY_DETAILS.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-gold shrink-0" />
                  <span>{COMPANY_DETAILS.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-gold hover:underline">
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <span>Monday – Saturday: 9:30 AM – 6:30 PM IST</span>
                </div>
              </div>

              <div className="pt-2 border-t border-line/60">
                <a
                  href="https://maps.google.com/?q=Omaxe+House+Kalkaji+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gold font-medium hover:underline"
                >
                  <span>Open in Google Maps Navigation</span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-ink text-cream rounded-sm space-y-3">
              <span className="text-[10px] text-gold uppercase tracking-wider block">Global Indian Desk</span>
              <h4 className="font-display text-lg text-cream font-normal">Overseas NRI Advisory</h4>
              <p className="text-xs text-stone">
                For clients resident in UAE, UK, Singapore, USA, and Canada, connect directly with our international desk.
              </p>
              <div className="text-xs text-stone space-y-1 pt-1">
                <div>Email: <a href="mailto:nri@omaxe.com" className="text-gold hover:underline">nri@omaxe.com</a></div>
                <div>WhatsApp: <span className="text-cream">+91 90151 61718</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Offices Directory */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <SectionHeading
              eyebrow="Nationwide Network"
              title="Regional Branch Offices"
              alignment="left"
            />

            <div className="flex flex-wrap gap-2">
              {['All', 'Chandigarh', 'Lucknow', 'Faridabad', 'Ludhiana', 'Indore'].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedOffice(c)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                    selectedOffice === c
                      ? 'bg-ink text-gold'
                      : 'bg-ivory text-stone hover:text-ink border border-line'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffices.map((off, idx) => (
              <div key={idx} className="p-6 bg-ivory border border-line rounded-sm space-y-3">
                <span className="text-[10px] font-mono text-gold uppercase tracking-wider block">
                  {off.city} Regional Office
                </span>
                <h4 className="font-display text-base text-ink font-medium">{off.name}</h4>
                <div className="space-y-2 text-xs text-stone">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{off.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{off.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                    <a href={`mailto:${off.email}`} className="text-gold hover:underline">{off.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
