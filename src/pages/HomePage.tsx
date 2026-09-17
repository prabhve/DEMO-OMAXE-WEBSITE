import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SearchBar } from '../components/home/SearchBar';
import { IntroSection } from '../components/home/IntroSection';
import { StatsBand } from '../components/home/StatsBand';
import { WhyChooseOmaxe } from '../components/home/WhyChooseOmaxe';
import { SignatureProjects } from '../components/home/SignatureProjects';
import { PresenceMap } from '../components/home/PresenceMap';
import { LeadershipSection } from '../components/home/LeadershipSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { AwardsMarquee } from '../components/home/AwardsMarquee';
import { InTheNewsStrip } from '../components/home/InTheNewsStrip';
import { JournalSection } from '../components/home/JournalSection';
import { CtaBand } from '../components/home/CtaBand';
import { SeoCopyBlock } from '../components/home/SeoCopyBlock';
import { COMPANY_DETAILS } from '../data/company';

interface HomePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  // Inject Organization JSON-LD on Home Page
  useEffect(() => {
    document.title = 'Omaxe Limited | Luxury Real Estate, Townships & Commercial Landmarks';

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: COMPANY_DETAILS.name,
      legalName: 'Omaxe Limited',
      description:
        'One of India’s leading real estate developers with 39+ years of legacy, delivering landmark townships and iconic commercial destinations across 31 cities.',
      url: window.location.origin,
      telephone: COMPANY_DETAILS.salesPhone,
      email: COMPANY_DETAILS.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Omaxe House, 7, LSC, Kalkaji',
        addressLocality: 'New Delhi',
        postalCode: '110019',
        addressCountry: 'IN',
      },
      foundingDate: '1987',
      founder: {
        '@type': 'Person',
        name: 'Mr. Rohtaas Goel',
      },
      sameAs: [
        COMPANY_DETAILS.social.facebook,
        COMPANY_DETAILS.social.linkedin,
        COMPANY_DETAILS.social.x,
        COMPANY_DETAILS.social.youtube,
        COMPANY_DETAILS.social.instagram,
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'organization-jsonld';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('organization-jsonld');
      if (existing) document.head.removeChild(existing);
    };
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero Showcase */}
      <HeroSection onOpenEnquiry={onOpenEnquiry} />

      {/* 2. Floating Search Bar */}
      <SearchBar />

      {/* 3. Introduction & Legacy */}
      <IntroSection />

      {/* 4. Stats Band */}
      <StatsBand />

      {/* 4b. Why Choose Omaxe (Editorial Rows) */}
      <WhyChooseOmaxe />

      {/* 5. Signature Developments */}
      <SignatureProjects />

      {/* 6. Presence Map & City Network */}
      <PresenceMap />

      {/* 7. Leadership & Governance */}
      <LeadershipSection />

      {/* 8. Client & Resident Video Testimonials */}
      <TestimonialsSection />

      {/* 9. Awards Continuous Marquee Strip */}
      <AwardsMarquee />

      {/* 9b. In The News Strip */}
      <InTheNewsStrip />

      {/* 10. Omaxe Journal Editorial */}
      <JournalSection />

      {/* 11. Full-Bleed Call to Action Band */}
      <CtaBand onOpenEnquiry={onOpenEnquiry} />

      {/* 12. Editorial SEO Heritage Block */}
      <SeoCopyBlock />
    </div>
  );
};
