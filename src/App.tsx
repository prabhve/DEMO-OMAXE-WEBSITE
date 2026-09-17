import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/global/Header';
import { Footer } from './components/global/Footer';
import { EnquiryPanel } from './components/global/EnquiryPanel';
import { WhatsAppPill } from './components/global/WhatsAppPill';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { CityShowcasePage } from './pages/CityShowcasePage';
import { AboutUsPage } from './pages/about/AboutUsPage';
import { LeadershipPage } from './pages/about/LeadershipPage';
import { CmdMessagePage } from './pages/about/CmdMessagePage';
import { MissionVisionPage } from './pages/about/MissionVisionPage';
import { QualityPolicyPage } from './pages/about/QualityPolicyPage';
import { AwardsPage } from './pages/about/AwardsPage';
import { SuccessStoryPage } from './pages/about/SuccessStoryPage';
import { InvestorHubPage } from './pages/investor/InvestorHubPage';
import { NriCornerPage } from './pages/nri/NriCornerPage';
import { MediaHubPage } from './pages/media/MediaHubPage';
import { LifeAtOmaxePage } from './pages/career/LifeAtOmaxePage';
import { CurrentOpeningsPage } from './pages/career/CurrentOpeningsPage';
import { OmaxeCarePage } from './pages/care/OmaxeCarePage';
import { BuyersGuidePage } from './pages/care/BuyersGuidePage';
import { VendorEmpanelmentPage } from './pages/care/VendorEmpanelmentPage';
import { BusinessAssociatePage } from './pages/partners/BusinessAssociatePage';
import { BlogPage } from './pages/journal/BlogPage';
import { BlogPostPage } from './pages/journal/BlogPostPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { CompliancePage } from './pages/CompliancePage';
import { CsrPage } from './pages/CsrPage';
import { CityPropertiesPage } from './pages/CityPropertiesPage';
import { ContactUsPage } from './pages/contact/ContactUsPage';
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/legal/TermsConditionsPage';
import { DisclaimerPage } from './pages/legal/DisclaimerPage';
import { SitemapPage } from './pages/legal/SitemapPage';
import { DisclosuresPage } from './pages/disclosures/DisclosuresPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Breadcrumb } from './components/ui/Breadcrumb';
import { SectionHeading } from './components/ui/SectionHeading';
import { Button } from './components/ui/Button';

// Admin Suite Imports
import { AdminLayout } from './components/admin/layout/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProjectsListPage } from './pages/admin/projects/AdminProjectsListPage';
import { AdminProjectEditPage } from './pages/admin/projects/AdminProjectEditPage';
import { AdminMediaLibraryPage } from './pages/admin/media/AdminMediaLibraryPage';
import { AdminLeadsListPage } from './pages/admin/leads/AdminLeadsListPage';
import { AdminPagesListPage } from './pages/admin/pages/AdminPagesListPage';
import { AdminPageEditPage } from './pages/admin/pages/AdminPageEditPage';
import { AdminBlogListPage } from './pages/admin/blog/AdminBlogListPage';
import { AdminBlogEditPage } from './pages/admin/blog/AdminBlogEditPage';
import { AdminContentModulesPage } from './pages/admin/content/AdminContentModulesPage';
import { AdminAnalyticsPage } from './pages/admin/analytics/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/settings/AdminSettingsPage';
import { AdminUsersPage } from './pages/admin/users/AdminUsersPage';
import { AdminSystemPage } from './pages/admin/system/AdminSystemPage';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProject, setEnquiryProject] = useState('');

  const handleOpenEnquiry = (project?: string) => {
    if (project) setEnquiryProject(project);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  // Dedicated Admin Suite Router
  if (location.pathname.startsWith('/admin')) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="projects" element={<AdminProjectsListPage />} />
            <Route path="projects/new" element={<AdminProjectEditPage />} />
            <Route path="projects/:id" element={<AdminProjectEditPage />} />
            <Route path="media" element={<AdminMediaLibraryPage />} />
            <Route path="leads" element={<AdminLeadsListPage />} />
            <Route path="pages" element={<AdminPagesListPage />} />
            <Route path="pages/:id" element={<AdminPageEditPage />} />
            <Route path="blog" element={<AdminBlogListPage />} />
            <Route path="blog/new" element={<AdminBlogEditPage />} />
            <Route path="blog/:id" element={<AdminBlogEditPage />} />
            <Route path="content" element={<AdminContentModulesPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="system" element={<AdminSystemPage />} />
          </Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />

      {/* Skip to Content for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-ink text-cream px-5 py-3 text-xs uppercase tracking-btn font-medium border border-gold rounded-sm shadow-lift"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex flex-col bg-cream text-ink antialiased">
        {/* Global Luxury Header */}
        <Header onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* Main Content Viewport with Framer Motion Route Transitions */}
        <main id="main-content" className="flex-1 flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex-1 flex flex-col"
            >
              <Routes location={location}>
            <Route path="/" element={<HomePage onOpenEnquiry={handleOpenEnquiry} />} />

            {/* Project & City Routes */}
            <Route
              path="/projects"
              element={<ProjectsPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/projects/:category/:city/:slug"
              element={<ProjectDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/projects/:slug"
              element={<ProjectDetailPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/properties-in/:city"
              element={<CityPropertiesPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Testimonials, CSR & Compliance */}
            <Route
              path="/testimonials"
              element={<TestimonialsPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/csr"
              element={<CsrPage />}
            />
            <Route
              path="/compliance"
              element={<CompliancePage />}
            />

            {/* About Us Routes */}
            <Route
              path="/about-us"
              element={<AboutUsPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/about-us/leadership-team"
              element={<LeadershipPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/about-us/leadership-team/:leaderId"
              element={<LeadershipPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/about-us/cmd-message"
              element={<CmdMessagePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/about-us/mission-and-vision"
              element={<MissionVisionPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/about-us/quality-policy"
              element={<QualityPolicyPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/about-us/awards-and-honors"
              element={<AwardsPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/about-us/success-story"
              element={<SuccessStoryPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Investor Relations Hub & All 7 Sub-Pages */}
            <Route
              path="/investor"
              element={<InvestorHubPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/investor/:tab"
              element={<InvestorHubPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/investor-relations"
              element={<InvestorHubPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/investor-relations/:tab"
              element={<InvestorHubPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* NRI Corner */}
            <Route
              path="/nri-corner"
              element={<NriCornerPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Media Center & All 6 Sub-Sections */}
            <Route
              path="/media"
              element={<MediaHubPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/media/:section"
              element={<MediaHubPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Careers */}
            <Route
              path="/career"
              element={<LifeAtOmaxePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/careers"
              element={<LifeAtOmaxePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/career/life-at-omaxe"
              element={<LifeAtOmaxePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/careers/life-at-omaxe"
              element={<LifeAtOmaxePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/career/current-openings"
              element={<CurrentOpeningsPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/careers/current-openings"
              element={<CurrentOpeningsPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Care & Guides */}
            <Route
              path="/care/omaxe-care"
              element={<OmaxeCarePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/care/customer-care"
              element={<OmaxeCarePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/omaxe-care"
              element={<OmaxeCarePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/care/vendors"
              element={<VendorEmpanelmentPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/care/vendor-empanelment"
              element={<VendorEmpanelmentPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/care/buyers-guide"
              element={<BuyersGuidePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/buyers-guide"
              element={<BuyersGuidePage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Business Associate / Channel Partner */}
            <Route
              path="/business-associate"
              element={<BusinessAssociatePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/channel-partner"
              element={<BusinessAssociatePage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Journal Blog */}
            <Route
              path="/blog"
              element={<BlogPage />}
            />
            <Route
              path="/blog/:slug"
              element={<BlogPostPage />}
            />
            <Route
              path="/journal"
              element={<BlogPage />}
            />
            <Route
              path="/journal/:slug"
              element={<BlogPostPage />}
            />

            {/* Contact */}
            <Route
              path="/contact-us"
              element={<ContactUsPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/contact"
              element={<ContactUsPage onOpenEnquiry={handleOpenEnquiry} />}
            />

            {/* Statutory Disclosures & RERA */}
            <Route
              path="/disclosures"
              element={<DisclosuresPage />}
            />
            <Route
              path="/rera-disclosures"
              element={<DisclosuresPage />}
            />

            {/* Legal */}
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicyPage />}
            />
            <Route
              path="/terms-conditions"
              element={<TermsConditionsPage />}
            />
            <Route
              path="/terms-and-conditions"
              element={<TermsConditionsPage />}
            />
            <Route
              path="/disclaimer"
              element={<DisclaimerPage />}
            />
            <Route
              path="/sitemap"
              element={<SitemapPage />}
            />

            {/* Bespoke 404 Error Page */}
            <Route
              path="*"
              element={<NotFoundPage onOpenEnquiry={handleOpenEnquiry} />}
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </main>

    {/* Global Luxury Footer */}
    <Footer />

    {/* Global Floating WhatsApp Pill (Only floating element allowed) */}
    <WhatsAppPill />

    {/* Slide-In Enquiry Panel */}
    <EnquiryPanel
      isOpen={isEnquiryOpen}
      onClose={handleCloseEnquiry}
      preselectedProject={enquiryProject}
    />
  </div>
  </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
