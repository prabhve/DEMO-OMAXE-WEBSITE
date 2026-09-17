export interface PressRelease {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  pdfUrl?: string;
}

export interface PrintCoverageItem {
  id: string;
  publication: string;
  headline: string;
  date: string;
  edition: string;
  snippet: string;
  image: string;
}

export interface VideoMediaItem {
  id: string;
  title: string;
  channel: string;
  date: string;
  duration: string;
  thumbnail: string;
  summary: string;
  videoUrl: string;
}

export interface CampaignItem {
  id: string;
  title: string;
  medium: string;
  tagline: string;
  year: string;
  image: string;
  description: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  attendance: string;
  image: string;
  description: string;
}

export const PRESS_RELEASES_DATA: PressRelease[] = [
  {
    id: 'pr-1',
    title: 'Omaxe Ltd reports strong operational momentum with ₹1,250 Cr booking value in 9M FY26',
    date: 'February 14, 2026',
    category: 'Financial Performance',
    summary: 'Driven by buoyant residential demand across New Chandigarh and Lucknow, combined with retail leasing inflows at Omaxe Chowk and The Omaxe State.',
  },
  {
    id: 'pr-2',
    title: 'The Omaxe State in Dwarka, New Delhi crosses 65% retail pre-leasing milestone ahead of schedule',
    date: 'January 22, 2026',
    category: 'Commercial Development',
    summary: 'Global athletic apparel flagships, multi-cuisine culinary conglomerates, and boutique hotel operators sign long-term commitments for India’s first sports-led commercial hub.',
  },
  {
    id: 'pr-3',
    title: 'Omaxe partners with leading sustainability consortium to achieve Net Zero Carbon benchmarks across Tier II Townships',
    date: 'December 18, 2025',
    category: 'ESG & Sustainability',
    summary: 'Master-plan integrates 4.2 MW rooftop solar installations, decentralized zero-liquid-discharge sewage treatment, and extensive indigenous Miyawaki forest corridors.',
  },
  {
    id: 'pr-4',
    title: 'Handover ceremony of 1,200 luxury homes commenced at "The Lake", New Chandigarh',
    date: 'November 05, 2025',
    category: 'Project Delivery',
    summary: 'Residents receive possession of waterfront sky residences and penthouses overlooking 5 acres of shimmering water and landscaped Shivalik vistas.',
  },
  {
    id: 'pr-5',
    title: 'Omaxe Chowk in Old Delhi wins "Iconic Public-Private Partnership Infrastructure Project of the Year"',
    date: 'September 28, 2025',
    category: 'Accolades',
    summary: 'Conferred at the National Urban Mobility & Retail Excellence Summit in recognition of solving historic traffic congestion and reviving Chandni Chowk commerce.',
  },
];

export const PRINT_COVERAGE_DATA: PrintCoverageItem[] = [
  {
    id: 'print-1',
    publication: 'The Economic Times',
    headline: 'How Omaxe Turned Tier-II Indian Cities into High-Yield Real Estate Powerhouses',
    date: 'February 08, 2026',
    edition: 'National Page 4',
    snippet: 'By recognizing the rising aspiration of non-metro Bharat early in 2003, Omaxe built an unassailable first-mover advantage that continues to deliver double-digit capital growth.',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'print-2',
    publication: 'Mint',
    headline: 'Sports Infrastructure as Real Estate Catalyst: The Omaxe State Case Study',
    date: 'January 15, 2026',
    edition: 'Mint Wealth & Urbanism',
    snippet: 'Dwarka’s 50.4-acre public-private partnership between DDA and Omaxe establishes a new template for integrating Olympic-level sports facilities with luxury retail and hospitality.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'print-3',
    publication: 'Business Standard',
    headline: 'Chandni Chowk’s Historic Retail Revival: Footfalls Surge at Omaxe Chowk',
    date: 'December 04, 2025',
    edition: 'Retail & Commerce',
    snippet: 'With over 2,100 automated parking spots and air-conditioned heritage jewellery arcades, footfalls have exceeded 85,000 visitors per weekend in historic Old Delhi.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'print-4',
    publication: 'Financial Express',
    headline: 'Township Living: Why Families in Punjab and UP Are Moving to Integrated Green Enclaves',
    date: 'October 19, 2025',
    edition: 'Property Express',
    snippet: 'A deep dive into how Omaxe’s integrated master-plans in Lucknow, New Chandigarh, and Ludhiana are altering long-term quality-of-life expectations.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
  },
];

export const VIDEO_MEDIA_DATA: VideoMediaItem[] = [
  {
    id: 'vid-1',
    title: 'MD Mohit Goel on CNBC-TV18: India’s Urban Infrastructure Super-Cycle and Regional Growth',
    channel: 'CNBC-TV18',
    date: 'February 18, 2026',
    duration: '14:22 mins',
    thumbnail: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80',
    summary: 'Executive dialogue on balance sheet deleveraging, commercial asset monetization, and upcoming launches in North India.',
    videoUrl: 'https://www.youtube.com',
  },
  {
    id: 'vid-2',
    title: 'Architectural Walkthrough: The Engineering Feat Behind "The Lake" in New Chandigarh',
    channel: 'Architectural Digest India (Feature)',
    date: 'January 10, 2026',
    duration: '09:45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
    summary: 'A visual exploration of the 5-acre central water body, waterfront boardwalks, and sky villas framing the Shivalik foothills.',
    videoUrl: 'https://www.youtube.com',
  },
  {
    id: 'vid-3',
    title: 'Ground Progress & Drone Tour: The Omaxe State, Sector 19B, Dwarka, New Delhi',
    channel: 'Omaxe Official Media',
    date: 'December 20, 2025',
    duration: '06:18 mins',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
    summary: 'Live aerial footage capturing foundation works, stadium superstructure progress, and multi-tier retail boulevard casting.',
    videoUrl: 'https://www.youtube.com',
  },
];

export const CAMPAIGNS_DATA: CampaignItem[] = [
  {
    id: 'camp-1',
    title: 'Turning Dreams into Reality — 39 Years of Trust',
    medium: 'National Print & Digital Campaign',
    tagline: 'Built on Enduring Foundations',
    year: '2025-2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    description: 'Celebrating 150,000+ happy homeowner families across 31 cities, highlighting architectural dignity and generational wealth creation.',
  },
  {
    id: 'camp-2',
    title: 'The New Face of Delhi — The Omaxe State',
    medium: 'Outdoor Transit, OOH & Digital Immersion',
    tagline: 'Where Champions Play & Celebrations Begin',
    year: '2024-2025',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    description: 'A tribute to the capital city’s sporting and cosmopolitan pride, introducing the 50.4-acre sports and entertainment landmark.',
  },
  {
    id: 'camp-3',
    title: 'World Street — The Romance of Europe in Faridabad',
    medium: 'Experiential High-Street Campaign',
    tagline: 'Live the Grand Boulevards of Paris, London & Athens',
    year: '2023-2024',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    description: 'Showcasing the historic charm of classical European open-air high street promenades in the heart of Greater Faridabad.',
  },
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'event-1',
    title: 'Foundation Stone Laying of The Omaxe State with Union Ministers & DDA Officials',
    date: 'February 2024',
    location: 'Sector 19B, Dwarka, New Delhi',
    attendance: '2,500+ Distinguished Dignitaries & Media',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    description: 'Official commencement of the ₹2,500 Cr flagship sports complex and retail city, blessed with Vedic rituals and high-level government address.',
  },
  {
    id: 'event-2',
    title: 'Omaxe Annual Channel Partner Conclave & Excellence Awards',
    date: 'November 2025',
    location: 'The Oberoi, New Delhi',
    attendance: '800+ Top Real Estate Wealth Advisors & Brokers',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    description: 'Recognizing outstanding business associates from across India with luxury automobile rewards, certificates of excellence, and 2026 priority inventory allotments.',
  },
  {
    id: 'event-3',
    title: 'Grand Inauguration of Omaxe Chowk Heritage Food Court — "Dawatpur"',
    date: 'April 2024',
    location: 'Chandni Chowk, Central Old Delhi',
    attendance: '10,000+ Visitors on Inaugural Weekend',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    description: 'Unveiling India’s largest organized heritage food court, uniting iconic century-old Delhi culinary masters under one air-conditioned roof.',
  },
];
