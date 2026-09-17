import React, { useState } from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  Landmark, 
  Calculator, 
  FileCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Video, 
  Award,
  PhoneCall,
  Mail
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { COMPANY_DETAILS } from '../../data/company';

interface NriCornerPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const NriCornerPage: React.FC<NriCornerPageProps> = ({ onOpenEnquiry }) => {
  const [currency, setCurrency] = useState<'USD' | 'AED' | 'GBP' | 'CAD' | 'SGD'>('USD');
  const [investmentAmtINR, setInvestmentAmtINR] = useState(25000000); // 2.5 Cr
  const [submitted, setSubmitted] = useState(false);
  const [nriForm, setNriForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United Arab Emirates',
    city: 'Dubai',
    preferredCity: 'New Delhi',
    budget: '₹2.5 Cr – ₹5 Cr',
    timeframe: 'Immediate (0-3 Months)',
    message: '',
  });

  const exchangeRates: Record<string, { rate: number; symbol: string; name: string }> = {
    USD: { rate: 86.5, symbol: '$', name: 'US Dollar' },
    AED: { rate: 23.55, symbol: 'AED', name: 'UAE Dirham' },
    GBP: { rate: 110.2, symbol: '£', name: 'British Pound' },
    CAD: { rate: 63.8, symbol: 'C$', name: 'Canadian Dollar' },
    SGD: { rate: 64.9, symbol: 'S$', name: 'Singapore Dollar' },
  };

  const convertedValue = Math.round(investmentAmtINR / exchangeRates[currency].rate);
  const estimatedAnnualYield = Math.round(investmentAmtINR * 0.065); // 6.5% rental yield for commercial/prime
  const estimatedCapitalAppreciation = Math.round(investmentAmtINR * 0.11); // 11% p.a.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setNriForm({
        name: '',
        email: '',
        phone: '',
        country: 'United Arab Emirates',
        city: 'Dubai',
        preferredCity: 'New Delhi',
        budget: '₹2.5 Cr – ₹5 Cr',
        timeframe: 'Immediate (0-3 Months)',
        message: '',
      });
    }, 5000);
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Hero Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/15 via-ink to-ink pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'NRI Corner' },
            ]}
          />
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs uppercase tracking-widest font-medium">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Global Indian Wealth &amp; Realty Advisory</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal leading-tight">
              Invest in India’s Resilient Economic Transformation
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Tailored portfolio advisory, transparent RBI &amp; FEMA compliance, complete repatriation assistance, and dedicated international relationship managers across London, Dubai, Singapore, and North America.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button
              variant="gold"
              size="md"
              onClick={() => {
                const el = document.getElementById('nri-concierge-form');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs uppercase tracking-wider"
            >
              Request Dedicated NRI Relationship Manager
            </Button>
            <a
              href={`mailto:${COMPANY_DETAILS.nriEmail}`}
              className="inline-flex items-center gap-2 px-5 py-3 border border-cream/20 text-cream hover:border-gold hover:text-gold text-xs uppercase tracking-wider font-medium rounded-sm transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{COMPANY_DETAILS.nriEmail}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 space-y-20">
        {/* Core Pillars of NRI Investment */}
        <div className="space-y-12">
          <SectionHeading
            eyebrow="Seamless Global Stewardship"
            title="The Omaxe NRI Advantage"
            description="Why over 15,000 global Indian families across 40+ countries entrust their wealth creation to Omaxe."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">100% Repatriation</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Full remittance of original investment funds and capital gains back to your overseas account via standard NRE/NRO banking channels under RBI master directions.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">RERA &amp; Clear Titles</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Every project is registered with state RERA authorities with comprehensive legal due diligence, freehold encumbrance-free titles, and escrow bank governance.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Virtual 3D Tours</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Experience high-definition drone progress footage, 3D architectural walk-throughs, and interactive live video consultations directly from your home abroad.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-ink text-gold flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Power of Attorney (PoA)</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Execute all legal paperwork without travelling to India. Our legal team assists with Indian Embassy / Consulate attestation and local state registration.
              </p>
            </div>
          </div>
        </div>

        {/* Currency & Return Calculator */}
        <div className="p-8 lg:p-12 bg-ivory border border-line rounded-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold block">
              Investment Estimator
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
              Global Currency Parity &amp; Projected Returns
            </h3>
            <p className="text-xs text-stone leading-relaxed font-light">
              Estimate your entry ticket in your local home currency alongside projected rental and capital returns across prime North Indian growth corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Slider */}
            <div className="lg:col-span-7 space-y-6">
              {/* Currency Selector */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-2">
                  Select Your Base Currency
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['USD', 'AED', 'GBP', 'CAD', 'SGD'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-4 py-2 text-xs font-mono font-medium rounded-sm transition-all ${
                        currency === curr
                          ? 'bg-ink text-gold border border-ink'
                          : 'bg-cream text-stone hover:text-ink border border-line'
                      }`}
                    >
                      {curr} ({exchangeRates[curr].symbol})
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone font-medium">Property Value (INR)</span>
                  <span className="font-display text-lg text-ink font-semibold">
                    ₹{(investmentAmtINR / 10000000).toFixed(2)} Crore
                  </span>
                </div>
                <input
                  type="range"
                  min={10000000} // 1 Cr
                  max={100000000} // 10 Cr
                  step={2500000} // 25 Lakh
                  value={investmentAmtINR}
                  onChange={(e) => setInvestmentAmtINR(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone font-mono">
                  <span>₹1.0 Cr</span>
                  <span>₹5.0 Cr</span>
                  <span>₹10.0 Cr</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-5 p-6 bg-cream border border-gold/30 rounded-sm space-y-4">
              <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">
                Approximate Foreign Value
              </span>
              <div className="font-display text-3xl sm:text-4xl text-ink font-normal">
                {exchangeRates[currency].symbol} {convertedValue.toLocaleString()}
              </div>
              <p className="text-[11px] text-stone">
                Calculated at indicative benchmark rate (1 {currency} ≈ ₹{exchangeRates[currency].rate})
              </p>

              <div className="border-t border-line pt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-stone">Est. Annual Rental Yield (6.5%)</span>
                  <strong className="text-ink font-mono">
                    ₹{(estimatedAnnualYield / 100000).toFixed(2)} Lakh / yr
                  </strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone">Projected 3-Yr Capital Value</span>
                  <strong className="text-gold font-mono">
                    ₹{((investmentAmtINR + estimatedCapitalAppreciation * 3) / 10000000).toFixed(2)} Cr
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & FEMA FAQ Accordion */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Regulatory Framework"
            title="NRI Investment &amp; FEMA Guidelines Explained"
            alignment="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone">
            <div className="p-6 bg-ivory border border-line rounded-sm space-y-2">
              <h4 className="font-display text-base text-ink font-medium">Who is eligible to purchase property in India?</h4>
              <p className="leading-relaxed">
                Under the Foreign Exchange Management Act (FEMA), Non-Resident Indians (NRIs) holding an Indian passport, Persons of Indian Origin (PIOs), and Overseas Citizens of India (OCI cardholders) are freely permitted to acquire residential and commercial properties in India without requiring any prior approval from the Reserve Bank of India (RBI).
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-2">
              <h4 className="font-display text-base text-ink font-medium">Which bank accounts should be utilized for transactions?</h4>
              <p className="leading-relaxed">
                Payments must be remitted through normal banking channels by inward remittance from abroad or from funds held in an NRE (Non-Resident External), NRO (Non-Resident Ordinary), or FCNR (Foreign Currency Non-Resident) bank account maintained with an authorized dealer bank in India.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-2">
              <h4 className="font-display text-base text-ink font-medium">How is repatriation of sale proceeds handled?</h4>
              <p className="leading-relaxed">
                If the property was purchased using foreign exchange remittances (NRE/FCNR), the entire principal acquisition cost can be repatriated outside India without limits (up to two residential properties). Any capital gains or sale proceeds funded via NRO accounts can be repatriated up to USD 1,000,000 per financial year under Form 15CA &amp; 15CB certification.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-2">
              <h4 className="font-display text-base text-ink font-medium">What is the Power of Attorney (PoA) procedure?</h4>
              <p className="leading-relaxed">
                If you cannot visit India for physical signing, you may execute a Special Power of Attorney in favor of a trusted relative or legal representative. The document is signed in the presence of the Indian Consulate or a Notary Public in your resident country, apostilled/consularized, and subsequently adjudicated by the Sub-Registrar in India.
              </p>
            </div>
          </div>
        </div>

        {/* NRI Concierge Form */}
        <div id="nri-concierge-form" className="p-8 lg:p-12 bg-ink text-cream rounded-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold block">
              Private Concierge Desk
            </span>
            <h3 className="font-display text-3xl text-cream font-normal">
              Schedule a Confidential Overseas Consultation
            </h3>
            <p className="text-xs text-stone leading-relaxed font-light">
              Our Senior NRI Relationship Director will coordinate an online video walkthrough or arrange a one-on-one briefing in Dubai, London, or Singapore.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-ink-soft border border-gold rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-gold text-base font-medium">
                <CheckCircle2 className="w-5 h-5" />
                <span>NRI Priority Request Registered</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">
                Thank you, {nriForm.name}. A senior NRI Portfolio Advisor will reach out on {nriForm.phone} or {nriForm.email} within 24 hours respecting your local {nriForm.country} time zone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-cream/80 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={nriForm.name}
                    onChange={(e) => setNriForm({ ...nriForm, name: e.target.value })}
                    placeholder="Your legal name"
                    className="w-full bg-ink-soft border border-cream/20 px-3.5 py-2.5 text-xs text-cream placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-cream/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={nriForm.email}
                    onChange={(e) => setNriForm({ ...nriForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-ink-soft border border-cream/20 px-3.5 py-2.5 text-xs text-cream placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-cream/80 mb-1">
                    WhatsApp / Phone (with Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={nriForm.phone}
                    onChange={(e) => setNriForm({ ...nriForm, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-ink-soft border border-cream/20 px-3.5 py-2.5 text-xs text-cream placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-cream/80 mb-1">
                    Country of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    value={nriForm.country}
                    onChange={(e) => setNriForm({ ...nriForm, country: e.target.value })}
                    placeholder="e.g. United Arab Emirates, UK, USA"
                    className="w-full bg-ink-soft border border-cream/20 px-3.5 py-2.5 text-xs text-cream placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-cream/80 mb-1">
                    Preferred Destination City
                  </label>
                  <select
                    value={nriForm.preferredCity}
                    onChange={(e) => setNriForm({ ...nriForm, preferredCity: e.target.value })}
                    className="w-full bg-ink-soft border border-cream/20 px-3.5 py-2.5 text-xs text-cream focus:border-gold outline-none rounded-sm"
                  >
                    <option>New Delhi (The Omaxe State / Omaxe Chowk)</option>
                    <option>New Chandigarh (The Lake)</option>
                    <option>Lucknow (The Legends / Waterscapes)</option>
                    <option>Faridabad (The Forest Spa / World Street)</option>
                    <option>Ludhiana (The Royal Meridian)</option>
                    <option>Indore (Omaxe City 1)</option>
                    <option>Vrindavan (Krishna Crest)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-cream/80 mb-1">
                    Investment Budget
                  </label>
                  <select
                    value={nriForm.budget}
                    onChange={(e) => setNriForm({ ...nriForm, budget: e.target.value })}
                    className="w-full bg-ink-soft border border-cream/20 px-3.5 py-2.5 text-xs text-cream focus:border-gold outline-none rounded-sm"
                  >
                    <option>₹1.5 Cr – ₹2.5 Cr</option>
                    <option>₹2.5 Cr – ₹5 Cr</option>
                    <option>₹5 Cr – ₹10 Cr</option>
                    <option>₹10 Cr+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-cream/80 mb-1">
                  Specific Requirements or Preferred Time for Call
                </label>
                <textarea
                  rows={3}
                  value={nriForm.message}
                  onChange={(e) => setNriForm({ ...nriForm, message: e.target.value })}
                  placeholder="Share details on property type (Luxury Apartment, Commercial Retail, Penthouse) and convenient time zone for call..."
                  className="w-full bg-ink-soft border border-cream/20 px-3.5 py-2.5 text-xs text-cream placeholder:text-stone focus:border-gold outline-none rounded-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="md"
                className="w-full sm:w-auto px-8 text-xs uppercase tracking-wider font-medium"
              >
                Submit NRI Priority Enquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
