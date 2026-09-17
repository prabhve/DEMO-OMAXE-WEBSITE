import { useEffect } from 'react';
import { Project } from '../types';

/**
 * Custom hook to dynamically update document head tags (title, meta, OpenGraph,
 * Twitter cards, Geo tags, canonical link, and Schema.org JSON-LD)
 * for project detail pages to boost search engine indexing and social link previews.
 */
export function useProjectSEO(project: Project | undefined) {
  useEffect(() => {
    if (!project) return;

    // Cache original head state for full restoration upon unmount
    const originalTitle = document.title;
    const originalMetaTags: Array<{ selector: string; attribute: string; value: string | null }> = [];
    const dynamicallyAddedElements: HTMLElement[] = [];

    // Helper to get or create a meta/link tag
    const setMetaTag = (
      selector: string,
      createTag: () => HTMLElement,
      attribute: string,
      value: string
    ) => {
      let element = document.head.querySelector(selector) as HTMLElement | null;
      if (element) {
        // Record original value for restore
        originalMetaTags.push({
          selector,
          attribute,
          value: element.getAttribute(attribute),
        });
        element.setAttribute(attribute, value);
      } else {
        element = createTag();
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
        dynamicallyAddedElements.push(element);
      }
    };

    // Helper to map state to Indian ISO 3166-2 code
    const getGeoRegionCode = (state: string): string => {
      if (state.includes('Delhi')) return 'IN-DL';
      if (state.includes('Punjab')) return 'IN-PB';
      if (state.includes('Haryana')) return 'IN-HR';
      if (state.includes('Uttar')) return 'IN-UP';
      if (state.includes('Madhya')) return 'IN-MP';
      return 'IN';
    };

    // 1. Precise Location & Name Formatting
    const locationDisplay = project.location
      ? `${project.location}, ${project.city}`
      : `${project.city}, ${project.state}`;

    const canonicalUrl = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : '';

    // 2. Dynamic Title
    // Fits ~50-60 chars for high Google SERP click-through
    const pageTitle = `${project.title} in ${locationDisplay} | Omaxe Limited`;
    document.title = pageTitle;

    // 3. Meta Description & Keywords
    const metaDescription = `Discover ${project.title} by Omaxe at ${locationDisplay}, ${project.state}. ${project.type} offering ${project.configuration}. Status: ${project.status}. Starting ${project.priceStarting}. RERA: ${project.reraNo}.`;

    const metaKeywords = [
      project.title,
      `${project.title} ${project.city}`,
      project.location ? `${project.title} ${project.location}` : '',
      `Omaxe ${project.city}`,
      `luxury ${project.category} in ${project.city}`,
      project.location ? `property in ${project.location}` : '',
      `${project.category} real estate India`,
      'Omaxe Limited',
    ]
      .filter(Boolean)
      .join(', ');

    setMetaTag(
      'meta[name="description"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'description');
        return el;
      },
      'content',
      metaDescription
    );

    setMetaTag(
      'meta[name="keywords"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'keywords');
        return el;
      },
      'content',
      metaKeywords
    );

    setMetaTag(
      'meta[name="author"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'author');
        return el;
      },
      'content',
      'Omaxe Limited'
    );

    // 4. OpenGraph Tags (Facebook, LinkedIn, Slack, WhatsApp)
    setMetaTag(
      'meta[property="og:title"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:title');
        return el;
      },
      'content',
      `${project.title} | ${locationDisplay} – Omaxe`
    );

    setMetaTag(
      'meta[property="og:description"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:description');
        return el;
      },
      'content',
      metaDescription
    );

    setMetaTag(
      'meta[property="og:image"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:image');
        return el;
      },
      'content',
      project.image
    );

    setMetaTag(
      'meta[property="og:image:alt"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:image:alt');
        return el;
      },
      'content',
      `${project.title} architectural landmark in ${locationDisplay}`
    );

    if (canonicalUrl) {
      setMetaTag(
        'meta[property="og:url"]',
        () => {
          const el = document.createElement('meta');
          el.setAttribute('property', 'og:url');
          return el;
        },
        'content',
        canonicalUrl
      );
    }

    setMetaTag(
      'meta[property="og:type"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:type');
        return el;
      },
      'content',
      'place'
    );

    setMetaTag(
      'meta[property="og:site_name"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:site_name');
        return el;
      },
      'content',
      'Omaxe Limited'
    );

    setMetaTag(
      'meta[property="og:locale"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:locale');
        return el;
      },
      'content',
      'en_IN'
    );

    // 5. Twitter / X Card Tags
    setMetaTag(
      'meta[name="twitter:card"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'twitter:card');
        return el;
      },
      'content',
      'summary_large_image'
    );

    setMetaTag(
      'meta[name="twitter:title"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'twitter:title');
        return el;
      },
      'content',
      `${project.title} | ${locationDisplay}`
    );

    setMetaTag(
      'meta[name="twitter:description"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'twitter:description');
        return el;
      },
      'content',
      metaDescription
    );

    setMetaTag(
      'meta[name="twitter:image"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'twitter:image');
        return el;
      },
      'content',
      project.image
    );

    setMetaTag(
      'meta[name="twitter:image:alt"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'twitter:image:alt');
        return el;
      },
      'content',
      `${project.title} in ${locationDisplay}`
    );

    // 6. Geographic / Local Search Engine Optimization Tags
    setMetaTag(
      'meta[name="geo.placename"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'geo.placename');
        return el;
      },
      'content',
      `${locationDisplay}, India`
    );

    setMetaTag(
      'meta[name="geo.region"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('name', 'geo.region');
        return el;
      },
      'content',
      getGeoRegionCode(project.state)
    );

    if (project.coordinates) {
      setMetaTag(
        'meta[name="geo.position"]',
        () => {
          const el = document.createElement('meta');
          el.setAttribute('name', 'geo.position');
          return el;
        },
        'content',
        `${project.coordinates.lat};${project.coordinates.lng}`
      );

      setMetaTag(
        'meta[name="ICBM"]',
        () => {
          const el = document.createElement('meta');
          el.setAttribute('name', 'ICBM');
          return el;
        },
        'content',
        `${project.coordinates.lat}, ${project.coordinates.lng}`
      );
    }

    // 7. Canonical URL Link
    if (canonicalUrl) {
      setMetaTag(
        'link[rel="canonical"]',
        () => {
          const el = document.createElement('link');
          el.setAttribute('rel', 'canonical');
          return el;
        },
        'href',
        canonicalUrl
      );
    }

    // 8. Schema.org Real Estate Structured Data (JSON-LD)
    const schemaScriptId = 'omaxe-project-schema-jsonld';
    let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaScriptId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
      dynamicallyAddedElements.push(schemaScript);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': project.category === 'residential' ? 'ApartmentComplex' : 'CommercialBuilding',
      '@id': `${canonicalUrl}#property`,
      name: project.title,
      alternateName: `${project.title} by Omaxe`,
      description: project.description,
      url: canonicalUrl,
      image: [project.image, ...(project.gallery || [])],
      telephone: '+91-11-41856780',
      address: {
        '@type': 'PostalAddress',
        streetAddress: project.location || project.city,
        addressLocality: project.city,
        addressRegion: project.state,
        addressCountry: 'IN',
      },
      ...(project.coordinates
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: project.coordinates.lat,
              longitude: project.coordinates.lng,
            },
          }
        : {}),
      amenityFeature: (project.amenities || []).map((amenity) => ({
        '@type': 'LocationFeatureSpecification',
        name: amenity.name,
        value: true,
      })),
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        price: project.priceStarting,
        availability:
          project.status === 'Ready to Move'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
      },
      identifier: project.reraNo,
      branchCode: project.id,
    };

    schemaScript.textContent = JSON.stringify(schemaData, null, 2);

    // 9. Clean-up & restoration when leaving project page
    return () => {
      // Revert title
      document.title = originalTitle;

      // Restore previously existing meta attributes
      originalMetaTags.forEach(({ selector, attribute, value }) => {
        const el = document.head.querySelector(selector);
        if (el) {
          if (value !== null) {
            el.setAttribute(attribute, value);
          } else {
            el.removeAttribute(attribute);
          }
        }
      });

      // Remove any tags that were created exclusively for this project
      dynamicallyAddedElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, [project]);
}
