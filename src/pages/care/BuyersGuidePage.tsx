import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Download, 
  HelpCircle, 
  Calculator, 
  ShieldCheck, 
  ArrowRight,
  Landmark
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';

interface BuyersGuidePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const BuyersGuidePage: React.FC<BuyersGuidePageProps> = ({ onOpenEnquiry }) => {
  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(8000000); // 80 Lakh
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20);

  // EMI calculation logic
  const calculateEMI = () => {
    const monthlyRate = interestRate / (12 * 100);
    const months = tenureYears * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI();
  const totalPayment = monthlyEMI * tenureYears * 12;
  const totalInterest = totalPayment - loanAmount;

  const steps = [
    {
      num: '01',
      title: 'Curate & Shortlist Property',
      desc: 'Evaluate location connectivity, social infrastructure, unit configurations, and builder track record across residential and commercial verticals.',
    },
    {
      num: '02',
      title: 'Verify RERA Credentials',
      desc: 'Check state RERA registration certificate, sanctioned architectural plans, land title clearances, and environmental statutory approvals.',
    },
    {
      num: '03',
      title: 'Booking & Allotment Letter',
      desc: 'Submit KYC documentation and 10% earnest token money to lock in price and receive the formal Builder-Buyer Agreement (BBA).',
    },
    {
      num: '04',
      title: 'Banking & Home Loan Processing',
      desc: 'Secure preferential home loan interest rates from our consortium of approved leading banks including SBI, HDFC, ICICI, and Axis Bank.',
    },
    {
      num: '05',
      title: 'Construction-Linked Invoicing',
      desc: 'Pay transparently tied directly to independently certified structural slab completions with photographic proof and site updates.',
    },
    {
      num: '06',
      title: 'Snagging & Joint Handover Audit',
      desc: 'Inspect your apartment fixtures, electrical sockets, paint finish, and plumbing fittings alongside our quality control engineer.',
    },
    {
      num: '07',
      title: 'Sub-Registrar Conveyance & Key Handover',
      desc: 'Complete stamp duty registry, execution of the Sale Deed, issuance of Occupancy Certificate (OC), and welcome key handover.',
    },
  ];

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
              { label: "Buyer's Guide" },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Knowledge Base for Real Estate Buyers
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              The Intelligent Buyer’s Guide
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Demystifying the real estate journey with legal clarity, financial planning tools, and regulatory guidelines to empower your investment decisions.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert('Downloading Omaxe_Homebuyers_Guide_2026.pdf (6.8 MB)')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-ink font-medium text-xs uppercase tracking-wider rounded-sm hover:bg-gold-soft transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete Guide (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 space-y-20">
        {/* Step-by-Step Flow */}
        <div className="space-y-12">
          <SectionHeading
            eyebrow="Milestone Roadmap"
            title="The 7-Step Homebuying Process"
            description="From initial discovery to proud keys-in-hand possession."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="p-6 bg-ivory border border-line rounded-sm space-y-3 relative">
                <span className="font-mono text-3xl font-bold text-gold/40 block">
                  {step.num}
                </span>
                <h4 className="font-display text-lg text-ink font-medium">
                  {step.title}
                </h4>
                <p className="text-xs text-stone leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}

            {/* Assistance Card */}
            <div className="p-6 bg-ink text-cream rounded-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">Need Personal Guidance?</span>
                <h4 className="font-display text-xl text-cream font-normal">Dedicated Home Advisor</h4>
                <p className="text-xs text-stone leading-relaxed">
                  Our wealth advisors can walk you through bank financing, tax breaks, and project configurations in detail.
                </p>
              </div>
              <Button
                variant="gold"
                size="sm"
                onClick={() => onOpenEnquiry('Buyer Guidance Consultation')}
                className="w-full text-xs uppercase tracking-wider"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive EMI Calculator */}
        <div className="p-8 lg:p-12 bg-ivory border border-line rounded-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold block">
              Financial Planning
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal">
              Interactive Home Loan EMI Estimator
            </h3>
            <p className="text-xs text-stone leading-relaxed font-light">
              Calculate your projected monthly installments based on prevailing lending benchmarks across top Indian banking partners.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              {/* Loan Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone font-medium">Loan Amount</span>
                  <span className="font-display text-base text-ink font-semibold">
                    ₹{(loanAmount / 100000).toFixed(1)} Lakh
                  </span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={500000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone font-mono">
                  <span>₹10 Lakh</span>
                  <span>₹2.5 Cr</span>
                  <span>₹5.0 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone font-medium">Annual Interest Rate (%)</span>
                  <span className="font-display text-base text-ink font-semibold">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={12.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone font-mono">
                  <span>7.5%</span>
                  <span>9.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              {/* Tenure Years */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone font-medium">Tenure (Years)</span>
                  <span className="font-display text-base text-ink font-semibold">
                    {tenureYears} Years ({tenureYears * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone font-mono">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="lg:col-span-5 p-6 bg-cream border border-gold/40 rounded-sm space-y-4">
              <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">
                Estimated Monthly Outflow
              </span>
              <div className="font-display text-3xl sm:text-4xl text-ink font-normal">
                ₹{monthlyEMI.toLocaleString('en-IN')} <span className="text-xs text-stone font-sans">/ month</span>
              </div>

              <div className="border-t border-line pt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-stone">Principal Amount</span>
                  <strong className="text-ink font-mono">₹{loanAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-stone">Total Interest Payable</span>
                  <strong className="text-stone font-mono">₹{totalInterest.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone">Total Amount (Principal + Interest)</span>
                  <strong className="text-gold font-mono">₹{totalPayment.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Essential Legal Checklist & Tax Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
            <h4 className="font-display text-xl text-ink font-medium flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <span>Mandatory Buyer Checklist</span>
            </h4>
            <ul className="space-y-3 text-xs text-stone">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span><strong>PAN &amp; Aadhaar Card:</strong> Required for both Indian residents and overseas Indian passports for RERA documentation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Encumbrance Certificate:</strong> Proves the title deed is free from any prior mortgages or private commercial liens.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span><strong>RERA Sanctioned Layouts:</strong> Ensure carpet area calculations conform strictly to the Real Estate Regulatory Act.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
            <h4 className="font-display text-xl text-ink font-medium flex items-center gap-2">
              <Landmark className="w-5 h-5 text-gold" />
              <span>Income Tax Deductions (India)</span>
            </h4>
            <ul className="space-y-3 text-xs text-stone">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Section 24(b):</strong> Deduct up to ₹2,00,000 per financial year on home loan interest payments for self-occupied properties.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Section 80C:</strong> Claim up to ₹1,50,000 against the principal repayment component as well as stamp duty and registration fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Joint Ownership:</strong> Both co-borrowers (e.g. husband and wife) can claim deductions separately, doubling tax savings.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
