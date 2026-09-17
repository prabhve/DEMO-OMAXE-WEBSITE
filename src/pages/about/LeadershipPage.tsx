import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Award,
  GraduationCap,
  Briefcase,
  Quote,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  ChevronRight,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { LEADERSHIP } from '../../data/company';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';

interface LeadershipPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onOpenEnquiry }) => {
  const { leaderId } = useParams<{ leaderId?: string }>();
  const navigate = useNavigate();

  const selectedLeader = leaderId
    ? LEADERSHIP.find((l) => l.id === leaderId)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedLeader) {
      document.title = `${selectedLeader.name} - ${selectedLeader.role} | Omaxe Leadership`;
    } else {
      document.title = 'Leadership Team & Board of Directors | Omaxe Limited';
    }
  }, [selectedLeader, leaderId]);

  // If leaderId is provided in URL but doesn't exist, redirect to leadership list
  useEffect(() => {
    if (leaderId && !selectedLeader) {
      navigate('/about-us/leadership-team', { replace: true });
    }
  }, [leaderId, selectedLeader, navigate]);

  // If a specific leader is selected, render the dedicated Full Profile Sub-Page
  if (selectedLeader) {
    const otherLeaders = LEADERSHIP.filter((l) => l.id !== selectedLeader.id);

    return (
      <div className="pt-28 pb-24 bg-cream text-ink min-h-screen">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-12">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: 'Corporate Heritage', to: '/about-us' },
              { label: 'Leadership Team', to: '/about-us/leadership-team' },
              { label: selectedLeader.name },
            ]}
          />

          {/* Top Bar with Back Link and Quick Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <Link
              to="/about-us/leadership-team"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone hover:text-gold transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Leadership Overview</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone font-light hidden md:inline">
                View Other Directors:
              </span>
              <div className="flex items-center gap-1.5">
                {otherLeaders.map((other) => (
                  <Link
                    key={other.id}
                    to={`/about-us/leadership-team/${other.id}`}
                    className="text-xs px-2.5 py-1 rounded-sm bg-ivory border border-line text-stone hover:text-ink hover:border-gold transition-colors"
                  >
                    {other.name.replace('Mr. ', '')}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Leader Hero Profile Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-ivory border border-line rounded-sm p-6 sm:p-10 lg:p-12 shadow-soft">
            {/* Portrait Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-ink-soft border border-line shadow-lift">
                <img
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-cream">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-gold">
                    {selectedLeader.designation || selectedLeader.role}
                  </div>
                  <div className="text-xs text-cream/80 font-light">
                    {selectedLeader.tenure}
                  </div>
                </div>
              </div>

              {/* Quick Contact & Info Card */}
              <div className="p-4 bg-cream border border-line rounded-sm space-y-3 text-xs">
                <div className="text-[10px] uppercase tracking-wider text-gold font-mono font-semibold">
                  Executive Office
                </div>
                <div className="text-stone font-light leading-relaxed">
                  Omaxe House, 7, Local Shopping Centre, Kalkaji, New Delhi – 110019
                </div>
                <button
                  onClick={() => onOpenEnquiry(`Meeting with Office of ${selectedLeader.name}`)}
                  className="w-full py-2 px-3 rounded-sm bg-ink text-cream hover:bg-gold hover:text-ink text-xs font-medium transition-colors text-center block"
                >
                  Request Executive Meeting
                </button>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-gold/10 border border-gold/30 text-gold text-[11px] font-mono uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Board of Directors · Executive Profile</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-ink">
                  {selectedLeader.name}
                </h1>
                <p className="text-base text-gold font-serif italic">
                  {selectedLeader.role}
                </p>
                <p className="text-xs sm:text-sm text-stone font-light max-w-2xl leading-relaxed">
                  {selectedLeader.bio}
                </p>
              </div>

              {/* Executive Pullquote */}
              {selectedLeader.quote && (
                <div className="relative p-6 sm:p-8 bg-cream border-l-2 border-gold rounded-r-sm space-y-2">
                  <Quote className="w-7 h-7 text-gold/30 absolute top-4 right-4" />
                  <p className="font-serif italic text-base sm:text-lg text-ink leading-relaxed">
                    "{selectedLeader.quote}"
                  </p>
                  <div className="text-xs text-stone font-medium pt-1">
                    — {selectedLeader.name}, {selectedLeader.designation || selectedLeader.role}
                  </div>
                </div>
              )}

              {/* Strategic Areas of Focus */}
              {selectedLeader.areasOfFocus && (
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-stone">
                    Strategic Portfolios &amp; Key Focus Areas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedLeader.areasOfFocus.map((area, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-sm bg-cream border border-line/80 text-xs text-ink"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="font-light">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Narrative Biography & Track Record */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 space-y-8">
              {selectedLeader.fullBio && (
                <div className="bg-ivory border border-line rounded-sm p-6 sm:p-10 space-y-6">
                  <div className="flex items-center gap-2 border-b border-line pb-3">
                    <Briefcase className="w-4 h-4 text-gold" />
                    <h2 className="font-display text-2xl font-normal text-ink">
                      Biography &amp; Leadership Journey
                    </h2>
                  </div>

                  <div className="space-y-4 text-sm text-stone font-light leading-relaxed">
                    {selectedLeader.fullBio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Achievements */}
              {selectedLeader.keyAchievements && (
                <div className="bg-ivory border border-line rounded-sm p-6 sm:p-10 space-y-6">
                  <div className="flex items-center gap-2 border-b border-line pb-3">
                    <Award className="w-4 h-4 text-gold" />
                    <h2 className="font-display text-2xl font-normal text-ink">
                      Key Career Milestones &amp; Impact
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {selectedLeader.keyAchievements.map((achieve, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 bg-cream border border-line rounded-sm"
                      >
                        <span className="w-6 h-6 rounded-full bg-gold/15 text-gold flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-ink font-light leading-relaxed">
                          {achieve}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column: Education, Directorship & Related Directors */}
            <div className="lg:col-span-4 space-y-6">
              {selectedLeader.education && (
                <div className="bg-ivory border border-line rounded-sm p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-line pb-3">
                    <GraduationCap className="w-4 h-4 text-gold" />
                    <h3 className="font-display text-lg font-normal text-ink">
                      Education &amp; Credentials
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {selectedLeader.education.map((edu, idx) => (
                      <li key={idx} className="text-xs text-stone font-light flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Other Directors Roster Cards */}
              <div className="bg-ivory border border-line rounded-sm p-6 space-y-4">
                <h3 className="font-display text-lg font-normal text-ink border-b border-line pb-3">
                  Other Board Executives
                </h3>
                <div className="space-y-4">
                  {otherLeaders.map((other) => (
                    <Link
                      key={other.id}
                      to={`/about-us/leadership-team/${other.id}`}
                      className="group flex items-center gap-3.5 p-2.5 rounded-sm bg-cream border border-line hover:border-gold transition-colors"
                    >
                      <img
                        src={other.image}
                        alt={other.name}
                        className="w-12 h-12 rounded-sm object-cover object-top shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-ink group-hover:text-gold truncate">
                          {other.name}
                        </div>
                        <div className="text-[11px] text-stone truncate font-light">
                          {other.role}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone group-hover:text-gold shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the Main Leadership Overview Page
  return (
    <div className="pt-28 pb-24 bg-cream text-ink min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-16">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Corporate Heritage', to: '/about-us' },
            { label: 'Leadership Team' },
          ]}
        />

        {/* Hero Section */}
        <div className="relative rounded-sm overflow-hidden bg-ink text-cream border border-cream/10 p-8 sm:p-14 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(#A8823C_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gold/15 border border-gold/40 text-gold text-xs font-medium uppercase tracking-[0.2em]">
              <Users className="w-3.5 h-3.5" />
              <span>Corporate Governance &amp; Executive Stewardship</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-cream leading-tight">
              Visionary Leadership Steering Indian Real Estate
            </h1>

            <p className="text-sm sm:text-base text-stone leading-relaxed font-light">
              Guided by nearly four decades of hands-on civil engineering mastery and progressive corporate governance, Omaxe’s Board of Directors has turned emerging Indian regions into flourishing modern communities.
            </p>
          </div>
        </div>

        {/* Core Directors Section with Links to Full Profile Sub-Pages */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold block">
                Executive Leadership
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                Board of Directors
              </h2>
            </div>
            <p className="text-xs text-stone max-w-md font-light">
              Select any director below to inspect their full biographical sub-page, educational credentials, and milestone contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.id}
                className="group bg-ivory border border-line rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-gold hover:shadow-lift"
              >
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-cream">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-gold">
                        {leader.designation || 'Board Member'}
                      </div>
                      <h3 className="font-display text-xl text-cream font-normal">
                        {leader.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="text-xs font-serif italic text-gold">
                      {leader.role}
                    </div>
                    <p className="text-xs text-stone font-light leading-relaxed line-clamp-3">
                      {leader.bio}
                    </p>

                    {leader.areasOfFocus && (
                      <div className="pt-2 border-t border-line/60 space-y-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-stone/80 font-mono block">
                          Key Focus:
                        </span>
                        <div className="text-[11px] text-ink font-light line-clamp-2">
                          {leader.areasOfFocus.slice(0, 2).join(' · ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/about-us/leadership-team/${leader.id}`}
                    className="w-full py-2.5 px-4 rounded-sm bg-cream border border-line text-ink group-hover:bg-ink group-hover:text-cream group-hover:border-ink transition-colors flex items-center justify-between text-xs font-medium"
                  >
                    <span>View Full Executive Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Governance Pillars */}
        <div className="bg-ivory border border-line rounded-sm p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold block">
              Ethical Architecture
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
              Principles of Corporate Governance
            </h2>
            <p className="text-xs text-stone font-light">
              Upholding exemplary fiduciary accountability, independent audits, SEBI LODR compliance, and transparent stakeholder communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 bg-cream border border-line/80 rounded-sm space-y-2">
              <h4 className="font-display text-base text-ink font-medium">
                Independent Board Oversight
              </h4>
              <p className="text-xs text-stone font-light leading-relaxed">
                A well-balanced board comprising seasoned independent directors from judicial, financial, and engineering backgrounds ensuring rigorous checks.
              </p>
            </div>

            <div className="p-5 bg-cream border border-line/80 rounded-sm space-y-2">
              <h4 className="font-display text-base text-ink font-medium">
                Full Statutory Compliance
              </h4>
              <p className="text-xs text-stone font-light leading-relaxed">
                Strict adherence to Real Estate (Regulation and Development) Act (RERA), Companies Act 2013, and SEBI listing guidelines across all operating states.
              </p>
            </div>

            <div className="p-5 bg-cream border border-line/80 rounded-sm space-y-2">
              <h4 className="font-display text-base text-ink font-medium">
                ESG &amp; Sustainability Mandate
              </h4>
              <p className="text-xs text-stone font-light leading-relaxed">
                Proactive deployment of water recycling, solar arrays, native green foliage, and local artisan empowerment in all master-planned communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
