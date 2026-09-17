import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  TrendingUp, 
  FileText, 
  Download, 
  PieChart, 
  ShieldCheck, 
  BarChart3, 
  PhoneCall, 
  CheckCircle2, 
  ExternalLink,
  Search,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { COMPANY_DETAILS } from '../../data/company';
import { 
  FINANCIAL_RESULTS_DATA, 
  ANNUAL_REPORTS_DATA, 
  SHAREHOLDING_DATA, 
  GOVERNANCE_COMMITTEES 
} from '../../data/investor';

export type InvestorTab = 
  | 'overview' 
  | 'financials' 
  | 'annual-reports' 
  | 'shareholding' 
  | 'governance' 
  | 'stock-info' 
  | 'contact';

interface InvestorHubPageProps {
  initialTab?: InvestorTab;
  onOpenEnquiry: (topic?: string) => void;
}

export const InvestorHubPage: React.FC<InvestorHubPageProps> = ({ 
  initialTab = 'overview', 
  onOpenEnquiry 
}) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<InvestorTab>(initialTab);
  const [reportSearch, setReportSearch] = useState('');
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    folioNo: '',
    name: '',
    email: '',
    phone: '',
    category: 'Dividend / Warrant Query',
    message: '',
  });

  // Sync tab with URL search params (e.g. ?tab=financials) or path route
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab') as InvestorTab | null;
    
    if (tabParam && ['overview', 'financials', 'annual-reports', 'shareholding', 'governance', 'stock-info', 'contact'].includes(tabParam)) {
      setActiveTab(tabParam);
    } else if (location.pathname.includes('/financial-results')) {
      setActiveTab('financials');
    } else if (location.pathname.includes('/annual-reports')) {
      setActiveTab('annual-reports');
    } else if (location.pathname.includes('/shareholding-pattern')) {
      setActiveTab('shareholding');
    } else if (location.pathname.includes('/corporate-governance')) {
      setActiveTab('governance');
    } else if (location.pathname.includes('/stock-information')) {
      setActiveTab('stock-info');
    } else if (location.pathname.includes('/investor-contacts')) {
      setActiveTab('contact');
    } else {
      setActiveTab(initialTab);
    }
  }, [location, initialTab]);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGrievanceSubmitted(true);
    setTimeout(() => {
      setGrievanceSubmitted(false);
      setFormData({
        folioNo: '',
        name: '',
        email: '',
        phone: '',
        category: 'Dividend / Warrant Query',
        message: '',
      });
    }, 4500);
  };

  const filteredFinancials = FINANCIAL_RESULTS_DATA.filter((item) => {
    const q = (reportSearch || '').toLowerCase();
    return (
      !q ||
      (item.title || '').toLowerCase().includes(q) ||
      (item.quarter || '').toLowerCase().includes(q) ||
      (item.financialYear || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Top Banner */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Investor Relations' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              BSE: 532880 · NSE: OMAXE · CIN: L74899DL1989PLC038088
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Investor Relations
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Fostering enduring stakeholder value through rigorous governance, transparent financial reporting, and audited statutory disclosures.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-cream/10">
            <div className="p-4 bg-ink-soft/60 border border-cream/10 rounded-sm">
              <span className="text-[10px] text-stone uppercase tracking-wider block">BSE Code</span>
              <span className="text-xl font-display text-cream font-medium">{COMPANY_DETAILS.bseCode}</span>
            </div>
            <div className="p-4 bg-ink-soft/60 border border-cream/10 rounded-sm">
              <span className="text-[10px] text-stone uppercase tracking-wider block">NSE Symbol</span>
              <span className="text-xl font-display text-gold font-medium">{COMPANY_DETAILS.nseSymbol}</span>
            </div>
            <div className="p-4 bg-ink-soft/60 border border-cream/10 rounded-sm">
              <span className="text-[10px] text-stone uppercase tracking-wider block">Delivered Area</span>
              <span className="text-xl font-display text-cream font-medium">13.02M Sq.Mtr.</span>
            </div>
            <div className="p-4 bg-ink-soft/60 border border-cream/10 rounded-sm">
              <span className="text-[10px] text-stone uppercase tracking-wider block">Promoter Holding</span>
              <span className="text-xl font-display text-cream font-medium">74.14% Unpledged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        {/* Sub-Navigation Tabs */}
        <div className="border-b border-line mb-10 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 sm:gap-4 min-w-max pb-3">
            {[
              { id: 'overview', label: 'IR Overview', icon: Building2 },
              { id: 'financials', label: 'Financial Results', icon: TrendingUp },
              { id: 'annual-reports', label: 'Annual Reports', icon: FileText },
              { id: 'shareholding', label: 'Shareholding Pattern', icon: PieChart },
              { id: 'governance', label: 'Corporate Governance', icon: ShieldCheck },
              { id: 'stock-info', label: 'Stock Information', icon: BarChart3 },
              { id: 'contact', label: 'Investor Contacts & Grievances', icon: PhoneCall },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as InvestorTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-ink text-gold shadow-sm'
                      : 'text-stone hover:text-ink hover:bg-ivory'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-6">
                <SectionHeading
                  eyebrow="Corporate Stewardship"
                  title="Architecting Resilient Real Estate Growth"
                  alignment="left"
                />
                <div className="space-y-4 text-sm text-stone leading-relaxed font-light">
                  <p>
                    Listed on both the Bombay Stock Exchange (BSE) and the National Stock Exchange of India (NSE) since 2007, Omaxe Limited has consistently maintained exemplary statutory rigor, prudent capital allocation, and unwavering shareholder trust.
                  </p>
                  <p>
                    Over nearly four decades, the company has delivered 13.02 million square meters (approx. 140 million square feet) of master-planned townships, iconic high-street retail promenades, premium commercial spaces, and integrated civic landmarks.
                  </p>
                  <p>
                    Today, Omaxe is spearheading landmark Public-Private Partnership (PPP) ventures, including "The Omaxe State" in Dwarka Sector 19B, New Delhi, spanning 50.4 acres in partnership with the Delhi Development Authority (DDA), and "Omaxe Chowk" in historic Chandni Chowk.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-6 bg-ivory border border-line rounded-sm space-y-2">
                    <span className="text-gold font-mono text-xs uppercase tracking-widest block">Quarterly Filing</span>
                    <h4 className="font-display text-lg text-ink font-medium">Q3 FY26 Financial Highlights</h4>
                    <p className="text-xs text-stone">Consolidated total income and operational cash inflows demonstrate robust resilience.</p>
                    <button
                      onClick={() => setActiveTab('financials')}
                      className="text-xs text-gold font-medium hover:underline inline-flex items-center gap-1 pt-2"
                    >
                      <span>View Financial Disclosures</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="p-6 bg-ivory border border-line rounded-sm space-y-2">
                    <span className="text-gold font-mono text-xs uppercase tracking-widest block">Statutory Compliance</span>
                    <h4 className="font-display text-lg text-ink font-medium">SEBI (LODR) Regulations 2015</h4>
                    <p className="text-xs text-stone">All committee charters, policies, and quarterly governance reports updated.</p>
                    <button
                      onClick={() => setActiveTab('governance')}
                      className="text-xs text-gold font-medium hover:underline inline-flex items-center gap-1 pt-2"
                    >
                      <span>Review Governance Policies</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Links */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
                  <h4 className="font-display text-base text-ink font-medium border-b border-line pb-3">
                    Quick Downloads
                  </h4>
                  <ul className="space-y-3 text-xs">
                    <li>
                      <button
                        onClick={() => setActiveTab('annual-reports')}
                        className="w-full text-left flex items-center justify-between text-stone hover:text-gold p-2 hover:bg-cream rounded-sm transition-colors"
                      >
                        <span className="truncate">Annual Report 2024-25 (PDF)</span>
                        <Download className="w-3.5 h-3.5 shrink-0 text-gold" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('financials')}
                        className="w-full text-left flex items-center justify-between text-stone hover:text-gold p-2 hover:bg-cream rounded-sm transition-colors"
                      >
                        <span className="truncate">Q3 FY26 Earnings Presentation</span>
                        <Download className="w-3.5 h-3.5 shrink-0 text-gold" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('shareholding')}
                        className="w-full text-left flex items-center justify-between text-stone hover:text-gold p-2 hover:bg-cream rounded-sm transition-colors"
                      >
                        <span className="truncate">Shareholding Pattern Q3 FY26</span>
                        <Download className="w-3.5 h-3.5 shrink-0 text-gold" />
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('governance')}
                        className="w-full text-left flex items-center justify-between text-stone hover:text-gold p-2 hover:bg-cream rounded-sm transition-colors"
                      >
                        <span className="truncate">Code of Conduct &amp; Ethics</span>
                        <Download className="w-3.5 h-3.5 shrink-0 text-gold" />
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-ink text-cream rounded-sm space-y-3">
                  <span className="text-[10px] text-gold uppercase tracking-wider block">Investor Desk</span>
                  <h4 className="font-display text-lg text-cream font-normal">Need Shareholder Assistance?</h4>
                  <p className="text-xs text-stone">Connect directly with our dedicated Nodal Officer or Registrar &amp; Share Transfer Agents.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold text-gold hover:bg-gold hover:text-ink text-xs"
                    onClick={() => setActiveTab('contact')}
                  >
                    Contact Investor Desk
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Financial Results */}
        {activeTab === 'financials' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <SectionHeading
                  eyebrow="Audited Disclosures"
                  title="Quarterly &amp; Annual Financial Results"
                  alignment="left"
                />
                <p className="text-stone text-xs mt-1">Submitted in accordance with Regulation 33 of SEBI (LODR) Regulations, 2015.</p>
              </div>

              {/* Search box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={reportSearch}
                  onChange={(e) => setReportSearch(e.target.value)}
                  placeholder="Filter by quarter or year..."
                  className="w-full bg-ivory border border-line pl-9 pr-4 py-2 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                />
              </div>
            </div>

            <div className="bg-ivory border border-line rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream border-b border-line text-stone uppercase tracking-wider font-medium text-[11px]">
                    <tr>
                      <th className="py-3.5 px-6">Document Title</th>
                      <th className="py-3.5 px-4">Period</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Release Date</th>
                      <th className="py-3.5 px-4 text-right">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredFinancials.map((report) => (
                      <tr key={report.id} className="hover:bg-cream/60 transition-colors">
                        <td className="py-4 px-6 font-medium text-ink">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gold shrink-0" />
                            <span>{report.title}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-stone whitespace-nowrap">{report.quarter}</td>
                        <td className="py-4 px-4 text-stone whitespace-nowrap">
                          <span className="px-2 py-0.5 bg-cream border border-line text-[10px] uppercase tracking-wider rounded-xs text-ink">
                            {report.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-stone whitespace-nowrap">{report.date}</td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <a
                            href="#download"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Downloading ${report.title} (${report.pdfSize})`);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs text-gold font-medium hover:text-ink transition-colors"
                          >
                            <span>PDF ({report.pdfSize})</span>
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Annual Reports */}
        {activeTab === 'annual-reports' && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Comprehensive Corporate Chronicles"
              title="Statutory Annual Reports"
              description="Detailed balance sheets, profit & loss accounts, cash-flow statements, director reports, and independent auditor disclosures."
              alignment="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ANNUAL_REPORTS_DATA.map((report) => (
                <div key={report.year} className="bg-ivory border border-line rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-card transition-shadow">
                  <div className="relative h-48 overflow-hidden bg-ink">
                    <img
                      src={report.coverImage}
                      alt={report.title}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-ink/90 text-gold px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-xs">
                      FY {report.year}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h4 className="font-display text-base text-ink font-medium leading-snug">
                        {report.title}
                      </h4>
                      <p className="text-xs text-stone italic line-clamp-2">
                        "{report.theme}"
                      </p>
                      <div className="text-[11px] text-stone/80 pt-2 flex items-center justify-between">
                        <span>{report.pages} Pages</span>
                        <span>Size: {report.fileSize}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Initiating download for ${report.title}`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-ink text-gold hover:bg-gold hover:text-ink text-xs font-medium uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Shareholding Pattern */}
        {activeTab === 'shareholding' && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Equitable Capital Distribution"
              title="Shareholding Pattern as on December 31, 2025"
              description="Compliant with Regulation 31 of SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015."
              alignment="left"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 bg-ivory border border-line rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-cream border-b border-line text-stone uppercase tracking-wider font-medium text-[11px]">
                      <tr>
                        <th className="py-3.5 px-6">Shareholder Category</th>
                        <th className="py-3.5 px-4 text-right">No. of Shares</th>
                        <th className="py-3.5 px-4 text-right">% of Equity Capital</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {SHAREHOLDING_DATA.map((entity, i) => (
                        <tr key={i} className="hover:bg-cream/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-ink">
                            <div>{entity.category}</div>
                            <div className="text-[11px] text-stone font-light">{entity.description}</div>
                          </td>
                          <td className="py-4 px-4 text-right font-mono text-stone">{entity.sharesCount}</td>
                          <td className="py-4 px-4 text-right font-mono font-medium text-ink">
                            {entity.percentage.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-cream font-medium text-ink">
                        <td className="py-3.5 px-6">Total Issued &amp; Subscribed Equity</td>
                        <td className="py-3.5 px-4 text-right font-mono">18,29,16,320</td>
                        <td className="py-3.5 px-4 text-right font-mono text-gold font-bold">100.00%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
                  <h4 className="font-display text-base text-ink font-medium">
                    Key Shareholder Highlights
                  </h4>
                  <div className="space-y-3 text-xs text-stone leading-relaxed">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Zero Pledged Shares:</strong> 100% of promoter and promoter group holdings are entirely unencumbered.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Demat Compliance:</strong> 99.98% of equity shares held in electronic dematerialized format (NSDL &amp; CDSL).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>SEBI Minimum Public Float:</strong> Consistently meeting required non-promoter public holding thresholds.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Corporate Governance */}
        {activeTab === 'governance' && (
          <div className="space-y-10" id="governance-section">
            <SectionHeading
              eyebrow="Integrity &amp; Compliance"
              title="Corporate Governance Framework"
              description="Omaxe Limited adheres to the highest benchmarks of corporate transparency, ethical conduct, and fiduciary responsibility."
              alignment="left"
            />

            {/* Committees Grid */}
            <div className="space-y-4">
              <h3 className="font-display text-xl text-ink font-normal">Board Committees</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GOVERNANCE_COMMITTEES.map((com, idx) => (
                  <div key={idx} className="p-6 bg-ivory border border-line rounded-sm space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-lg text-ink font-medium">{com.name}</h4>
                      <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-1" />
                    </div>
                    <div className="text-xs text-stone space-y-1">
                      <div><strong className="text-ink">Chairperson:</strong> {com.chairperson}</div>
                      <div><strong className="text-ink">Committee Members:</strong> {com.members.join(', ')}</div>
                    </div>
                    <p className="text-xs text-stone/90 leading-relaxed border-t border-line pt-2.5">
                      {com.mandate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Whistleblower Policy & CSR Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div id="whistleblower" className="p-6 bg-cream border border-gold/40 rounded-sm space-y-3">
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">Vigil Mechanism</span>
                <h4 className="font-display text-xl text-ink font-medium">Whistleblower Policy</h4>
                <p className="text-xs text-stone leading-relaxed">
                  Provides a formal channel for directors, employees, and stakeholders to report genuine concerns regarding unethical behavior, fraud, or violations of the Code of Conduct, with absolute protection against victimization.
                </p>
                <div className="text-xs text-stone pt-2">
                  <span className="font-medium text-ink">Nodal Vigil Officer Email: </span>
                  <a href="mailto:vigil@omaxe.com" className="text-gold hover:underline">vigil@omaxe.com</a>
                </div>
              </div>

              <div id="csr" className="p-6 bg-cream border border-gold/40 rounded-sm space-y-3">
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">Social Responsibility</span>
                <h4 className="font-display text-xl text-ink font-medium">CSR Policy &amp; Initiatives</h4>
                <p className="text-xs text-stone leading-relaxed">
                  Omaxe dedicates 2% of average net profits towards local community health centers, primary school infrastructure, ecological afforestation, and construction worker skill training across project sites.
                </p>
                <div className="text-xs text-stone pt-2">
                  <span className="font-medium text-ink">CSR Annual Report: </span>
                  <button onClick={() => alert('Opening CSR Statutory Statement')} className="text-gold hover:underline">Download CSR Statement</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Stock Information */}
        {activeTab === 'stock-info' && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Market Exchange Quotations"
              title="Stock Listing Information"
              description="Trading information on India’s national exchanges."
              alignment="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* BSE Card */}
              <div className="p-8 bg-ivory border border-line rounded-sm space-y-5">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <h3 className="font-display text-2xl text-ink font-medium">BSE Limited</h3>
                    <span className="text-xs text-stone">Bombay Stock Exchange</span>
                  </div>
                  <span className="px-3 py-1 bg-ink text-gold font-mono text-xs font-bold rounded-xs">
                    {COMPANY_DETAILS.bseCode}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-stone">
                  <div className="flex justify-between py-1.5 border-b border-line/60">
                    <span>Security ID / Scrip Name</span>
                    <strong className="text-ink">OMAXE</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-line/60">
                    <span>ISIN (International Securities Id)</span>
                    <strong className="text-ink font-mono">INE800H01012</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-line/60">
                    <span>Face Value per Share</span>
                    <strong className="text-ink">₹ 10.00</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Trading Group / Settlement</span>
                    <strong className="text-ink">T+1 Rolling Settlement (Group B)</strong>
                  </div>
                </div>

                <a
                  href="https://www.bseindia.com/stock-share-price/omaxe-ltd/omaxe/532880/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-ink text-cream hover:text-gold text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
                >
                  <span>View Live Quotes on BSE India</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold" />
                </a>
              </div>

              {/* NSE Card */}
              <div className="p-8 bg-ivory border border-line rounded-sm space-y-5">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <h3 className="font-display text-2xl text-ink font-medium">National Stock Exchange</h3>
                    <span className="text-xs text-stone">NSE India</span>
                  </div>
                  <span className="px-3 py-1 bg-gold text-ink font-mono text-xs font-bold rounded-xs">
                    {COMPANY_DETAILS.nseSymbol}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-stone">
                  <div className="flex justify-between py-1.5 border-b border-line/60">
                    <span>Symbol</span>
                    <strong className="text-ink">OMAXE</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-line/60">
                    <span>Series</span>
                    <strong className="text-ink font-mono">EQ (Equity)</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-line/60">
                    <span>Listing Date</span>
                    <strong className="text-ink">August 09, 2007</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Industry Classification</span>
                    <strong className="text-ink">Real Estate / Construction &amp; Development</strong>
                  </div>
                </div>

                <a
                  href="https://www.nseindia.com/get-quotes/equity?symbol=OMAXE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-ink text-cream hover:text-gold text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
                >
                  <span>View Live Quotes on NSE India</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Investor Contacts & Grievances */}
        {activeTab === 'contact' && (
          <div className="space-y-12">
            <SectionHeading
              eyebrow="Shareholder Assistance"
              title="Investor Contacts &amp; Grievance Redressal"
              description="Dedicated helplines and statutory liaison for equity shareholders, depository participants, and institutional analysts."
              alignment="left"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Directory Column */}
              <div className="lg:col-span-6 space-y-6">
                {/* Company Secretary Card */}
                <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
                  <span className="text-[10px] text-gold uppercase tracking-wider block">Compliance &amp; Secretarial</span>
                  <h4 className="font-display text-lg text-ink font-medium">Company Secretary &amp; Compliance Officer</h4>
                  <div className="text-xs text-stone space-y-1.5">
                    <p className="font-medium text-ink">Mr. Navin Jain</p>
                    <p>Omaxe Limited, Corporate Office</p>
                    <p>Omaxe House, 7, LSC, Kalkaji, New Delhi - 110019, India</p>
                    <p className="pt-2"><strong>Email: </strong><a href="mailto:investorrelations@omaxe.com" className="text-gold hover:underline">investorrelations@omaxe.com</a></p>
                    <p><strong>Direct Desk: </strong>+91-11-41856780 / 41856781</p>
                  </div>
                </div>

                {/* Registrar & Share Transfer Agent */}
                <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
                  <span className="text-[10px] text-gold uppercase tracking-wider block">Registrar &amp; Share Transfer Agent (RTA)</span>
                  <h4 className="font-display text-lg text-ink font-medium">Link Intime India Pvt. Ltd.</h4>
                  <div className="text-xs text-stone space-y-1.5">
                    <p>Noble Heights, 1st Floor, Plot No. NH 2, LSC, C-1 Block, Near Savitri Market, Janakpuri, New Delhi - 110058</p>
                    <p className="pt-2"><strong>Phone: </strong>+91-11-49411000</p>
                    <p><strong>Email: </strong>delhi@linkintime.co.in</p>
                    <p><strong>Website: </strong><a href="https://www.linkintime.co.in" target="_blank" rel="noreferrer" className="text-gold hover:underline">www.linkintime.co.in</a></p>
                  </div>
                </div>

                {/* Nodal Officer for IEPF */}
                <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
                  <span className="text-[10px] text-gold uppercase tracking-wider block">IEPF Authority Matters</span>
                  <h4 className="font-display text-lg text-ink font-medium">Nodal Officer (IEPF)</h4>
                  <div className="text-xs text-stone space-y-1">
                    <p>In accordance with Rule 7(2A) of Investor Education and Protection Fund Authority (Accounting, Audit, Transfer and Refund) Rules, 2016:</p>
                    <p className="pt-1"><strong>Nodal Officer: </strong>Company Secretary, Omaxe Ltd.</p>
                    <p><strong>Dedicated Email: </strong><a href="mailto:iepf@omaxe.com" className="text-gold hover:underline">iepf@omaxe.com</a></p>
                  </div>
                </div>
              </div>

              {/* Online Grievance Form */}
              <div className="lg:col-span-6">
                <div className="p-8 bg-ivory border border-line rounded-sm space-y-6">
                  <div>
                    <h3 className="font-display text-2xl text-ink font-medium">
                      Submit a Shareholder Grievance
                    </h3>
                    <p className="text-xs text-stone mt-1">
                      Our secretarial team investigates and provides written resolution within 7 working days.
                    </p>
                  </div>

                  {grievanceSubmitted ? (
                    <div className="p-6 bg-cream border border-gold text-ink rounded-sm space-y-2">
                      <div className="flex items-center gap-2 text-gold font-medium">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Grievance Registered Successfully</span>
                      </div>
                      <p className="text-xs text-stone">
                        Reference Ticket: <strong>OMAXE-IR-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>. A confirmation has been transmitted to your registered email address.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleGrievanceSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                            Folio No. / DP ID &amp; Client ID *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.folioNo}
                            onChange={(e) => setFormData({ ...formData, folioNo: e.target.value })}
                            placeholder="e.g. IN30012312345678"
                            className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                            Shareholder Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Full name as in Demat"
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
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@domain.com"
                            className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                            Contact Phone *
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
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                          Grievance Nature / Subject *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                        >
                          <option>Dividend / Warrant Query</option>
                          <option>Non-Receipt of Annual Report</option>
                          <option>Transfer / Transmission of Shares</option>
                          <option>Change of Address or Bank Mandate</option>
                          <option>Dematerialization / Rematerialization</option>
                          <option>IEPF Claim Assistance</option>
                          <option>Other Secretarial Correspondence</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                          Detailed Description *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Provide all relevant certificate numbers, dates, or prior correspondence details..."
                          className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="gold"
                        size="md"
                        className="w-full text-xs uppercase tracking-wider font-medium"
                      >
                        Submit Official Shareholder Grievance
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
