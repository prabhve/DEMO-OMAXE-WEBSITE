import React, { useEffect } from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle2, Download, MessageSquare } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';

interface QualityPolicyPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

interface QualityCommitment {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  benchmarks: string[];
}

const QUALITY_COMMITMENTS: QualityCommitment[] = [
  {
    num: '01',
    title: 'Adherence to Approved Specifications',
    subtitle: 'Absolute Fidelity to Statutory Master Plans & Architectural Blueprints',
    description:
      'Every construction project undertaken by Omaxe Limited strictly adheres to the sanction drawings, structural parameters, and finishes approved by statutory municipal authorities and the Real Estate Regulatory Authority (RERA). We guarantee zero unauthorized structural deviations or non-approved modifications.',
    benchmarks: [
      '100% compliance with RERA registered architectural plans',
      'Laser-guided spatial demarcation and verified carpet areas',
      'Mandatory pre-construction municipal approval archiving',
    ],
  },
  {
    num: '02',
    title: 'ISO-Aligned Process Control',
    subtitle: 'Integrated Management Systems across Quality, Environment & Safety',
    description:
      'We operate under rigorous ISO 9001:2015 (Quality Management), ISO 14001:2015 (Environmental Management), and ISO 45001:2018 (Occupational Health & Safety) certified operating procedures. Every stage of civil construction follows standardized checklists, automated stage-gate approvals, and computerized audit logs.',
    benchmarks: [
      'Bureau Veritas certified corporate management systems',
      'Continuous stage-gate inspections from excavation to finishes',
      'Zero-harm worker safety and dust suppression frameworks',
    ],
  },
  {
    num: '03',
    title: 'Third-Party Material Testing',
    subtitle: 'NABL-Accredited Lab Verifications for Structural Raw Materials',
    description:
      'We accept no compromises on the purity and tensile strength of raw construction materials. High-ductility Fe-550D TMT reinforcement steel, 53-grade OPC cement, concrete admixtures, and aggregate gradation undergo independent third-party chemical and tensile testing at NABL-accredited civil laboratories.',
    benchmarks: [
      'Batch-wise mill test certificates for 100% of structural steel',
      'Ultrasonic pulse velocity and 28-day concrete cube compression testing',
      'Independent soil mechanics and core-drill verification',
    ],
  },
  {
    num: '04',
    title: 'Structural Safety & Seismic Audits',
    subtitle: 'Premier Engineering Institution Structural Vetting & Deflection Controls',
    description:
      'All high-rise and township structures are designed in accordance with Bureau of Indian Standards (BIS) seismic codes for Zone IV/V resilience. Structural calculations and wind-tunnel load models are vetted and peer-reviewed by faculty consultants from premier institutions such as IIT Delhi and IIT Roorkee.',
    benchmarks: [
      'Earthquake-resistant ductile detailing (IS 13920 / IS 1893)',
      'Wind tunnel aerodynamic modeling for towers above 30 floors',
      'Non-destructive testing (NDT) during reinforced concrete casting',
    ],
  },
  {
    num: '05',
    title: 'Timely Possession Commitments',
    subtitle: 'CPM/PERT Critical Path Scheduling & Proactive Construction Acceleration',
    description:
      'We recognize that timely handover is the cornerstone of homeowner trust. Project timelines are planned using modern critical path methodology (CPM) and monitored daily by centralized Project Management Offices (PMO). Supply chain buffers and mechanized aluminum formwork systems guarantee reliable possession schedules.',
    benchmarks: [
      'Mivan monolithic aluminum formwork for accelerated slab cycles',
      'Real-time ERP dashboard tracking for all procurement and civil progress',
      'Dedicated statutory liaison teams for accelerated Occupancy Certificates (OC)',
    ],
  },
  {
    num: '06',
    title: 'Post-Handover Service Standards',
    subtitle: 'Dedicated Omaxe Care Governance & Responsive Warranty Resolution',
    description:
      'Our relationship with residents begins at possession. Through our structured Omaxe Care division, we provide prompt snagging remediation, comprehensive 5-year structural warranty support, digitized facility maintenance management, and professional township asset preservation.',
    benchmarks: [
      '24/7 digitized complaint ticketing via Omaxe Resident Portal',
      'Dedicated on-site facility engineers and electro-mechanical teams',
      'Regular structural maintenance audits and preventive facade inspections',
    ],
  },
];

export const QualityPolicyPage: React.FC<QualityPolicyPageProps> = ({ onOpenEnquiry }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Quality Policy & Engineering Commitments | Omaxe Limited';
  }, []);

  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'About Us', path: '/about-us' },
              { label: 'Quality Policy' },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block mb-3">
              Engineering Rigor · Zero Tolerance for Compromise
            </span>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-[72px] font-light text-ink leading-[1.05] tracking-[-0.03em]">
              Corporate Quality Policy
            </h1>
            <p className="mt-6 text-stone text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
              At Omaxe Limited, quality is not a static milestone but an uncompromising culture of precision. We engineer landmarks that endure across generations through scientific rigor, accredited testing, and transparent execution.
            </p>
          </div>
        </div>
      </section>

      {/* Numbered Commitments Section */}
      <section className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16">
        <div className="max-w-[1360px] mx-auto space-y-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
              Core Pillars
            </span>
            <h2 className="font-display text-[32px] sm:text-4xl md:text-5xl font-light text-ink leading-[1.08] tracking-[-0.02em]">
              Our Six Quality Commitments
            </h2>
            <p className="text-stone text-base font-light leading-relaxed">
              Every Omaxe residential estate, integrated township, and commercial destination is governed by these six foundational engineering pledges.
            </p>
          </div>

          {/* Numbered Commitment List with Large Gold Numerals */}
          <div className="border-t border-b border-line divide-y divide-line">
            {QUALITY_COMMITMENTS.map((item) => (
              <div
                key={item.num}
                className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start hover:bg-ivory/50 transition-colors px-2 sm:px-4"
              >
                {/* Large Gold Numeral */}
                <div className="lg:col-span-2">
                  <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-gold leading-none tracking-tight block">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone mt-2 block">
                    Commitment
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-10 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-ink leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold font-mono">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-stone text-base font-light leading-[1.8] max-w-[70ch]">
                    {item.description}
                  </p>

                  {/* Benchmark Checkpoints */}
                  <div className="pt-4 border-t border-line/60 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {item.benchmarks.map((bm, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="text-xs text-ink font-light leading-relaxed">
                          {bm}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signed Statement Block at the Bottom */}
      <section className="bg-ivory border-t border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto bg-cream border border-line p-8 sm:p-14 lg:p-16 space-y-8 shadow-soft">
          <div className="flex items-center justify-between border-b border-line pb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-gold" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink font-semibold">
                Official Quality Declaration
              </span>
            </div>
            <span className="text-[11px] font-mono text-stone uppercase">
              Doc Ref: OMX/QMS/2026-V4
            </span>
          </div>

          <blockquote className="font-display text-xl sm:text-2xl font-light text-ink leading-relaxed italic">
            &ldquo;We reaffirm our unyielding pledge to every customer, investor, and community stakeholder: Omaxe shall never compromise on the structural integrity, safety, or quality of any space that bears our name. We build not merely for today, but for generations that follow.&rdquo;
          </blockquote>

          {/* Signed Signatures */}
          <div className="pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
            <div className="space-y-2">
              <div className="font-serif text-2xl text-gold italic font-normal tracking-wide">
                Rohtaas Goel
              </div>
              <div className="h-px w-48 bg-line" />
              <p className="font-display text-base font-normal text-ink">
                Mr. Rohtaas Goel
              </p>
              <p className="text-[11px] uppercase tracking-wider text-stone font-light">
                Founder &amp; Chairman, Omaxe Limited
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-serif text-2xl text-gold italic font-normal tracking-wide">
                Mohit Goel
              </div>
              <div className="h-px w-48 bg-line" />
              <p className="font-display text-base font-normal text-ink">
                Mr. Mohit Goel
              </p>
              <p className="text-[11px] uppercase tracking-wider text-stone font-light">
                Managing Director, Omaxe Limited
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-5 sm:px-8 text-center bg-cream">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-display text-2xl sm:text-3xl font-light text-ink">
            Have Questions Regarding Engineering Specifications?
          </h3>
          <p className="text-stone text-sm font-light leading-relaxed">
            Our technical engineering desk is available to provide detailed material test certificates, structural calculations, and RERA approval dossiers.
          </p>
          <div className="pt-2 flex justify-center">
            <Button
              variant="solid"
              size="md"
              onClick={() => onOpenEnquiry('Technical Engineering Inquiry')}
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Contact Technical Engineering Desk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
