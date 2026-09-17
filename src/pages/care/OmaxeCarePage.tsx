import React, { useState } from 'react';
import { 
  Headphones, 
  Clock, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { COMPANY_DETAILS } from '../../data/company';

interface OmaxeCarePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const OmaxeCarePage: React.FC<OmaxeCarePageProps> = ({ onOpenEnquiry }) => {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerUnitNo: '',
    projectName: 'The Lake, New Chandigarh',
    requestType: 'Handover & Possession Query',
    description: '',
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketForm({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerUnitNo: '',
        projectName: 'The Lake, New Chandigarh',
        requestType: 'Handover & Possession Query',
        description: '',
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
              { label: 'Omaxe Care' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Dedicated Homeowner &amp; Client Support
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Omaxe Care Ecosystem
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              From allotment through post-possession maintenance, our customer relationship management team is committed to prompt resolution and seamless property stewardship.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={`tel:${COMPANY_DETAILS.tollFree.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-ink font-medium text-xs uppercase tracking-wider rounded-sm hover:bg-gold-soft transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Toll Free: {COMPANY_DETAILS.tollFree}</span>
            </a>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 border border-cream/20 text-cream hover:border-gold hover:text-gold text-xs uppercase tracking-wider font-medium rounded-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 space-y-20">
        {/* Support Commitments & SLAs */}
        <div className="space-y-10">
          <SectionHeading
            eyebrow="Our Service Standards"
            title="Service Level Agreement (SLA) Commitments"
            description="Clear turnaround benchmarks for your queries and service requests."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-ink text-gold flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">24-Hour Acknowledgment</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Every grievance or documentation query registered via email or online portal receives a unique tracking ticket within 24 business hours.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-ink text-gold flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Dedicated Relationship Manager</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Assigned personal point-of-contact for all milestone construction updates, home loan disbursement certificates, and registry documentation.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-line rounded-sm space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-ink text-gold flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg text-ink font-medium">Multi-Tier Escalation</h4>
              <p className="text-xs text-stone leading-relaxed font-light">
                Direct access to regional CRM Heads and Corporate Vice President for unresolved issues exceeding standard 7-day resolution window.
              </p>
            </div>
          </div>
        </div>

        {/* Ticket Submission Form & Help Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 p-8 bg-ivory border border-line rounded-sm space-y-6">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-gold block">
                Online Service Desk
              </span>
              <h3 className="font-display text-2xl text-ink font-medium">
                Submit a Customer Service Request
              </h3>
              <p className="text-xs text-stone mt-1">
                For existing apartment owners, retail shopkeepers, and plot allottees.
              </p>
            </div>

            {ticketSubmitted ? (
              <div className="p-8 bg-cream border border-gold text-ink rounded-sm space-y-3">
                <div className="flex items-center gap-2 text-gold font-medium text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Ticket Registered Successfully</span>
                </div>
                <p className="text-xs text-stone leading-relaxed">
                  Ticket Reference: <strong>OMX-CARE-2026-{Math.floor(10000 + Math.random() * 90000)}</strong>. Our regional CRM desk has received your request and will contact you within 24 working hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketForm.customerName}
                      onChange={(e) => setTicketForm({ ...ticketForm, customerName: e.target.value })}
                      placeholder="Primary allottee name"
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Registered Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={ticketForm.customerPhone}
                      onChange={(e) => setTicketForm({ ...ticketForm, customerPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketForm.customerEmail}
                      onChange={(e) => setTicketForm({ ...ticketForm, customerEmail: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Unit / Flat / Plot Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketForm.customerUnitNo}
                      onChange={(e) => setTicketForm({ ...ticketForm, customerUnitNo: e.target.value })}
                      placeholder="e.g. Tower 2, Flat 1402"
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Project Name *
                    </label>
                    <select
                      value={ticketForm.projectName}
                      onChange={(e) => setTicketForm({ ...ticketForm, projectName: e.target.value })}
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                    >
                      <option>The Omaxe State, New Delhi</option>
                      <option>The Lake, New Chandigarh</option>
                      <option>The Forest Spa, Faridabad</option>
                      <option>Omaxe Chowk, New Delhi</option>
                      <option>The Legends, Lucknow</option>
                      <option>The Royal Meridian, Ludhiana</option>
                      <option>Omaxe City 1, Indore</option>
                      <option>Omaxe World Street, Faridabad</option>
                      <option>Krishna Crest, Vrindavan</option>
                      <option>Omaxe Connaught Place, Greater Noida</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Nature of Request *
                    </label>
                    <select
                      value={ticketForm.requestType}
                      onChange={(e) => setTicketForm({ ...ticketForm, requestType: e.target.value })}
                      className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                    >
                      <option>Handover &amp; Possession Query</option>
                      <option>Payment Receipt / Statement of Account</option>
                      <option>Home Loan NOC / Demat Certificate</option>
                      <option>Snagging / Maintenance Rectification</option>
                      <option>Transfer of Allotment / Legal Title</option>
                      <option>Change of Address or Contact Details</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Details of Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    placeholder="Provide specific details, payment dates, or reference numbers..."
                    className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full text-xs uppercase tracking-wider font-medium"
                >
                  Submit Service Request
                </Button>
              </form>
            )}
          </div>

          {/* Escalation Matrix & Direct Helplines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
              <h4 className="font-display text-base text-ink font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-gold" />
                <span>Customer Grievance Escalation Matrix</span>
              </h4>

              <div className="space-y-3 text-xs text-stone">
                <div className="p-3 bg-cream border border-line rounded-sm">
                  <strong className="text-ink block">Level 1: Central Care Desk</strong>
                  <span>Toll Free: 1800 102 0064 | care@omaxe.com</span>
                  <div className="text-[10px] text-stone mt-1">Resolution TAT: 24 to 72 Hours</div>
                </div>

                <div className="p-3 bg-cream border border-line rounded-sm">
                  <strong className="text-ink block">Level 2: Regional Head – Customer Relations</strong>
                  <span>Email: escalation@omaxe.com</span>
                  <div className="text-[10px] text-stone mt-1">If unresolved within 4 business days</div>
                </div>

                <div className="p-3 bg-cream border border-line rounded-sm">
                  <strong className="text-ink block">Level 3: Vice President – CRM</strong>
                  <span>Email: vpcrm@omaxe.com</span>
                  <div className="text-[10px] text-stone mt-1">Highest executive escalation channel</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-ink text-cream rounded-sm space-y-3">
              <span className="text-[10px] text-gold uppercase tracking-wider block">Real-time Support</span>
              <h4 className="font-display text-lg text-cream font-normal">WhatsApp Care Assistant</h4>
              <p className="text-xs text-stone">
                Receive instant payment receipts, construction progress photos, and statement of accounts directly on WhatsApp.
              </p>
              <a
                href={`https://wa.me/919015161718?text=Hello%20Omaxe%20Care,%20I%20need%20assistance%20with%20my%20unit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gold text-ink hover:bg-gold-soft text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Omaxe Care</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
