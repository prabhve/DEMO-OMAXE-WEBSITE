import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  Send, 
  FileCheck
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { JOB_OPENINGS, JobOpening } from '../../data/careers';

interface CurrentOpeningsPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const CurrentOpeningsPage: React.FC<CurrentOpeningsPageProps> = ({ onOpenEnquiry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [activeJob, setActiveJob] = useState<JobOpening | null>(null);
  const [applyingJob, setApplyingJob] = useState<JobOpening | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const [applicantForm, setApplicantForm] = useState({
    name: '',
    email: '',
    phone: '',
    currentOrg: '',
    experienceYears: '5-8 Years',
    noticePeriod: '30 Days',
    linkedinUrl: '',
    coverNote: '',
  });

  const departments = ['All Departments', ...Array.from(new Set(JOB_OPENINGS.map((j) => j.department)))];
  const locations = ['All Locations', ...Array.from(new Set(JOB_OPENINGS.map((j) => j.location)))];

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const q = (searchTerm || '').toLowerCase();
    const matchesSearch = 
      !q ||
      (job.title || '').toLowerCase().includes(q) ||
      (job.description || '').toLowerCase().includes(q);
    const matchesDept = selectedDept === 'All Departments' || job.department === selectedDept;
    const matchesLocation = selectedLocation === 'All Locations' || job.location === selectedLocation;
    return matchesSearch && matchesDept && matchesLocation;
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setApplyingJob(null);
      setApplicantForm({
        name: '',
        email: '',
        phone: '',
        currentOrg: '',
        experienceYears: '5-8 Years',
        noticePeriod: '30 Days',
        linkedinUrl: '',
        coverNote: '',
      });
    }, 4500);
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      {/* Hero Header */}
      <div className="bg-ink text-cream py-16 border-b border-ink-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink-soft/40 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Careers', href: '/career/life-at-omaxe' },
              { label: 'Current Opportunities' },
            ]}
          />
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium block">
              Join the Vanguard of Real Estate Engineering
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-cream font-normal">
              Current Openings
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed font-light">
              Explore rewarding leadership and operational career opportunities across our project sites, regional branch offices, and corporate headquarters.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12 space-y-10">
        {/* Filters and Search */}
        <div className="p-6 bg-ivory border border-line rounded-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job title, skills, or role..."
                className="w-full bg-cream border border-line pl-9 pr-4 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
              />
            </div>

            {/* Department Select */}
            <div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Location Select */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-cream border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone pt-2 border-t border-line/60">
            <span>Showing <strong>{filteredJobs.length}</strong> opportunities matching criteria</span>
            {(searchTerm || selectedDept !== 'All Departments' || selectedLocation !== 'All Locations') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDept('All Departments');
                  setSelectedLocation('All Locations');
                }}
                className="text-gold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center bg-ivory border border-line rounded-sm space-y-3">
              <Briefcase className="w-8 h-8 text-stone mx-auto" />
              <h3 className="font-display text-xl text-ink">No Openings Match the Selected Filters</h3>
              <p className="text-xs text-stone max-w-md mx-auto">
                Try broadening your filter criteria or submit a spontaneous resume directly to <a href="mailto:careers@omaxe.com" className="text-gold hover:underline">careers@omaxe.com</a>.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 bg-ivory border border-line rounded-sm hover:border-gold/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone">
                    <span className="px-2.5 py-0.5 bg-cream border border-line text-[10px] uppercase font-mono tracking-wider text-ink rounded-xs">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {job.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone" />
                      Exp: {job.experience}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-ink font-medium">
                    {job.title}
                  </h3>

                  <p className="text-xs text-stone leading-relaxed font-light line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveJob(job)}
                    className="text-xs uppercase tracking-wider"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => {
                      setApplyingJob(job);
                      setActiveJob(null);
                    }}
                    className="text-xs uppercase tracking-wider"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal: Job Details */}
      {activeJob && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-cream border border-line rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActiveJob(null)}
              className="absolute top-4 right-4 p-2 text-stone hover:text-ink cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <span className="text-xs text-gold uppercase tracking-widest font-mono">
                {activeJob.department} · {activeJob.location}
              </span>
              <h2 className="font-display text-2xl text-ink font-normal">
                {activeJob.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-stone">
                <span>Experience: <strong>{activeJob.experience}</strong></span>
                <span>Type: <strong>{activeJob.type}</strong></span>
              </div>
            </div>

            <div className="border-t border-line pt-4 space-y-4 text-xs text-stone leading-relaxed">
              <div>
                <h4 className="font-display text-sm text-ink font-medium mb-1">Position Overview</h4>
                <p>{activeJob.description}</p>
              </div>

              <div>
                <h4 className="font-display text-sm text-ink font-medium mb-1">Key Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1">
                  {activeJob.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display text-sm text-ink font-medium mb-1">Candidate Profile &amp; Qualifications</h4>
                <ul className="list-disc list-inside space-y-1">
                  {activeJob.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-line pt-4 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveJob(null)}
                className="text-xs"
              >
                Close
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => {
                  setApplyingJob(activeJob);
                  setActiveJob(null);
                }}
                className="text-xs uppercase tracking-wider"
              >
                Apply for this Position
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Application Form */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-cream border border-line rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-4 right-4 p-2 text-stone hover:text-ink cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-8 space-y-1">
              <span className="text-[10px] text-gold uppercase tracking-wider font-mono block">
                Official Job Application
              </span>
              <h2 className="font-display text-2xl text-ink font-normal">
                {applyingJob.title}
              </h2>
              <p className="text-xs text-stone">{applyingJob.department} · {applyingJob.location}</p>
            </div>

            {applicationSubmitted ? (
              <div className="p-8 bg-ivory border border-gold text-ink rounded-sm space-y-3">
                <div className="flex items-center gap-2 text-gold font-medium text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Application Submitted Successfully</span>
                </div>
                <p className="text-xs text-stone leading-relaxed">
                  Thank you, <strong>{applicantForm.name}</strong>. Your application dossier has been forwarded to the Talent Acquisition team at Omaxe Corporate HR. A confirmation has been sent to <strong>{applicantForm.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4 border-t border-line pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-ivory border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantForm.email}
                      onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-ivory border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantForm.phone}
                      onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-ivory border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Total Work Experience
                    </label>
                    <select
                      value={applicantForm.experienceYears}
                      onChange={(e) => setApplicantForm({ ...applicantForm, experienceYears: e.target.value })}
                      className="w-full bg-ivory border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                    >
                      <option>1–3 Years</option>
                      <option>3–5 Years</option>
                      <option>5–8 Years</option>
                      <option>8–12 Years</option>
                      <option>12+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Current Employer / Organization
                    </label>
                    <input
                      type="text"
                      value={applicantForm.currentOrg}
                      onChange={(e) => setApplicantForm({ ...applicantForm, currentOrg: e.target.value })}
                      placeholder="Current company"
                      className="w-full bg-ivory border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                      Notice Period
                    </label>
                    <select
                      value={applicantForm.noticePeriod}
                      onChange={(e) => setApplicantForm({ ...applicantForm, noticePeriod: e.target.value })}
                      className="w-full bg-ivory border border-line px-3.5 py-2.5 text-xs text-ink focus:border-gold outline-none rounded-sm"
                    >
                      <option>Immediate / 15 Days</option>
                      <option>30 Days</option>
                      <option>60 Days</option>
                      <option>90 Days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    LinkedIn Profile or Portfolio Link
                  </label>
                  <input
                    type="url"
                    value={applicantForm.linkedinUrl}
                    onChange={(e) => setApplicantForm({ ...applicantForm, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full bg-ivory border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-ink mb-1">
                    Brief Statement of Purpose / Cover Note
                  </label>
                  <textarea
                    rows={3}
                    value={applicantForm.coverNote}
                    onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                    placeholder="Briefly state your key achievements and why you wish to join Omaxe..."
                    className="w-full bg-ivory border border-line px-3.5 py-2.5 text-xs text-ink placeholder:text-stone focus:border-gold outline-none rounded-sm resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setApplyingJob(null)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="gold"
                    size="md"
                    className="text-xs uppercase tracking-wider font-medium"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
