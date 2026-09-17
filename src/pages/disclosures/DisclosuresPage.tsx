import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, ExternalLink, Search } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { PROJECTS } from '../../data/projects';

export const DisclosuresPage: React.FC = () => {
  const [filterCity, setFilterCity] = useState('All');
  const [search, setSearch] = useState('');

  const cities = ['All', 'Delhi', 'Chandigarh', 'Lucknow', 'Faridabad', 'Ludhiana', 'Indore'];

  const filteredProjects = PROJECTS.filter((p) => {
    const q = (search || '').toLowerCase();
    const cityFilter = (filterCity || 'All').toLowerCase();
    const matchesCity = filterCity === 'All' || (p.city && p.city.toLowerCase().includes(cityFilter));
    const matchesSearch = 
      (p.title ? p.title.toLowerCase().includes(q) : false) || 
      (p.reraNo ? p.reraNo.toLowerCase().includes(q) : false) ||
      (p.location ? p.location.toLowerCase().includes(q) : false);
    return matchesCity && matchesSearch;
  });

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Statutory Disclosures' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Transparency, RERA Registrations &amp; Environmental Clearances
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              RERA &amp; Statutory Disclosures
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Under Section 4(2)(l) and Section 11 of the Real Estate (Regulation and Development) Act, 2016, all project approvals, sanctioned master layouts, and environmental NOCs are made publicly accessible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 space-y-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-ivory border border-line rounded-sm">
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCity(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                  filterCity === c
                    ? 'bg-ink text-gold'
                    : 'bg-cream text-stone hover:text-ink border border-line'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by project or RERA No..."
              className="w-full bg-cream border border-line pl-9 pr-4 py-2 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
            />
          </div>
        </div>

        {/* Project RERA Table */}
        <div className="bg-ivory border border-line rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream border-b border-line text-stone uppercase tracking-wider font-medium text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Project Name</th>
                  <th className="py-3.5 px-4">State &amp; City</th>
                  <th className="py-3.5 px-4">RERA Registration ID</th>
                  <th className="py-3.5 px-4">Authority Status</th>
                  <th className="py-3.5 px-4 text-right">RERA Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-cream/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-ink">
                      <div>{proj.title}</div>
                      <div className="text-[11px] text-stone font-light">{proj.location}</div>
                    </td>
                    <td className="py-4 px-4 text-stone whitespace-nowrap">{proj.city}, India</td>
                    <td className="py-4 px-4 font-mono text-gold whitespace-nowrap font-medium">
                      {proj.reraNo}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium rounded-xs">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Registered &amp; Approved</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <a
                        href="#download"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading RERA Certificate for ${proj.title} (${proj.reraNo})`);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-gold font-medium hover:text-ink transition-colors"
                      >
                        <span>PDF Certificate</span>
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Environmental Clearances & Statutory Filings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
            <h4 className="font-display text-lg text-ink font-medium">Ministry of Environment &amp; Forests (MoEF) Clearances</h4>
            <p className="text-xs text-stone leading-relaxed font-light">
              Environmental Clearance (EC) compliance reports submitted half-yearly to the State Environment Impact Assessment Authority (SEIAA) for all major township developments.
            </p>
            <button
              onClick={() => alert('Opening Environmental Compliance Directory')}
              className="inline-flex items-center gap-1.5 text-xs text-gold font-medium hover:underline pt-1"
            >
              <span>View Half-Yearly Compliance Reports</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="p-6 bg-ivory border border-line rounded-sm space-y-3">
            <h4 className="font-display text-lg text-ink font-medium">NOCs from Fire Department &amp; Airport Authority</h4>
            <p className="text-xs text-stone leading-relaxed font-light">
              Height clearance certificates from the Airports Authority of India (AAI) and provisional/final fire safety certificates from state fire departments.
            </p>
            <button
              onClick={() => alert('Opening Civic Approvals Archive')}
              className="inline-flex items-center gap-1.5 text-xs text-gold font-medium hover:underline pt-1"
            >
              <span>View Civic Approvals Archive</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
