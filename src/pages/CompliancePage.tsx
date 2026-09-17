import React, { useState, useMemo } from 'react';
import { FileText, Download, Search, Filter, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { COMPLIANCE_DOCUMENTS, GROUP_COMPANIES } from '../data/documents';
import { ComplianceCategory } from '../types';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';

const CATEGORIES: ('All' | ComplianceCategory)[] = [
  'All',
  'Environment Clearance',
  'Layout Approval',
  'EWS/LIG Allotment',
  'Compliance Report',
];

export const CompliancePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ComplianceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = useMemo(() => {
    return COMPLIANCE_DOCUMENTS.filter((doc) => {
      const matchesCategory =
        selectedCategory === 'All' || doc.category === selectedCategory;
      const q = (searchQuery || '').toLowerCase();
      const matchesSearch =
        !q ||
        (doc.document || '').toLowerCase().includes(q) ||
        (doc.project || '').toLowerCase().includes(q) ||
        (doc.category || '').toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleDownload = (doc: typeof COMPLIANCE_DOCUMENTS[0]) => {
    trackEvent(ANALYTICS_EVENTS.BROCHURE_DOWNLOAD, {
      documentName: doc.document,
      project: doc.project,
      category: doc.category,
    });
    // Create a virtual file download simulation for verified statutory compliance
    const blob = new Blob(
      [
        `OMAXE LIMITED - STATUTORY COMPLIANCE ARCHIVE\nDocument: ${doc.document}\nProject: ${doc.project}\nCategory: ${doc.category}\nDate of Issuance: ${doc.date}\nStatus: Verified Regulatory Filing`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.project.replace(/[^a-zA-Z0-9]/g, '_')}_${doc.category.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Compliance & Disclosures' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block mb-3">
              Statutory Governance &amp; Regulatory Filings
            </span>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-[72px] font-light text-ink leading-[1.05] tracking-[-0.03em]">
              Compliance &amp; Disclosures
            </h1>
            <p className="mt-6 text-stone text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
              As a publicly listed developer on BSE and NSE, Omaxe Limited maintains unwavering transparency. Access official environmental clearances, municipal approvals, layout sanctions, and compliance certifications across all active developments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Table Content */}
      <section className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16">
        <div className="max-w-[1360px] mx-auto space-y-12">
          {/* Controls: Search and Filter Tabs */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[44px] px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-light transition-colors cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-ivory text-stone border-line hover:border-ink hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
              <input
                type="text"
                placeholder="Search documents or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-[44px] pl-11 pr-4 py-2.5 bg-ivory border border-line text-sm text-ink placeholder:text-stone/60 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Filterable Document Table */}
          <div className="bg-ivory border border-line overflow-hidden shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-line bg-cream/60">
                    <th className="py-4 px-6 text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
                      Document Title
                    </th>
                    <th className="py-4 px-6 text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
                      Project
                    </th>
                    <th className="py-4 px-6 text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
                      Category
                    </th>
                    <th className="py-4 px-6 text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
                      Date
                    </th>
                    <th className="py-4 px-6 text-[11px] font-normal uppercase tracking-[0.18em] text-gold text-right">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredDocuments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-stone text-sm">
                        No compliance documents found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredDocuments.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-cream/40 transition-colors group"
                      >
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-gold shrink-0" />
                            <span className="font-display text-base font-normal text-ink group-hover:text-gold transition-colors">
                              {item.document}
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-sm text-stone font-light">
                          {item.project}
                        </td>
                        <td className="py-5 px-6">
                          <span className="inline-block px-3 py-1 bg-cream border border-line text-[10px] uppercase font-normal tracking-wider text-ink">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-5 px-6 font-mono text-xs text-stone">
                          {item.date}
                        </td>
                        <td className="py-5 px-6 text-right">
                          <button
                            onClick={() => handleDownload(item)}
                            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-ink text-ink hover:text-cream border border-line hover:border-ink text-xs uppercase tracking-[0.18em] font-light transition-all cursor-pointer"
                            title={`Download ${item.document}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF ({item.fileSize || '2.4 MB'})</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Group Entities Section */}
          <div className="mt-20 pt-16 border-t border-line space-y-8">
            <div>
              <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block mb-2">
                Corporate Architecture
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">
                Group Companies &amp; Project SPVs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {GROUP_COMPANIES.map((company) => (
                <div
                  key={company.name}
                  className="bg-ivory border border-line p-6 sm:p-8 space-y-4"
                >
                  <ShieldCheck className="w-6 h-6 text-gold" />
                  <h3 className="font-display text-lg font-normal text-ink leading-snug">
                    {company.name}
                  </h3>
                  <p className="text-xs text-stone font-light leading-relaxed">
                    {company.role}
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-gold font-mono block">
                      Key Assets:
                    </span>
                    <p className="text-xs text-ink font-light mt-1">
                      {company.projects.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
