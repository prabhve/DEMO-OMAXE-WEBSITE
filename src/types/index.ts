export type ProjectCategory = 'residential' | 'commercial';

export type ProjectStatus = 'Ready to Move' | 'Under Construction' | 'Newly Launched' | 'Delivered';

export interface Project {
  id: string;
  slug: string;
  title: string;
  city: string;
  state: string;
  location?: string;
  coordinates?: { lat: number; lng: number };
  category: ProjectCategory;
  type: string;
  configuration: string;
  priceStarting: string;
  area: string;
  status: ProjectStatus;
  reraNo: string;
  possession: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  amenities: { name: string; icon: string }[];
  isSignature?: boolean;
  isFeatured?: boolean;
}

export interface CityData {
  id?: number;
  name: string;
  slug: string;
  state: string;
  projectCount: number;
  residentialCount: number;
  commercialCount: number;
  mapCoords: { x: number; y: number }; // Percentage on 0-100 coordinate map
  description: string;
}

export interface VideoTestimonial {
  id: string;
  name: string;
  descriptor: string;
  project?: string;
  youtubeUrl: string;
  videoId: string;
  quote?: string;
  avatar?: string;
}

export interface NewsItem {
  id: string;
  publication: string;
  headline: string;
  date?: string;
  url: string;
}

export type ComplianceCategory =
  | 'Environment Clearance'
  | 'Layout Approval'
  | 'EWS/LIG Allotment'
  | 'Compliance Report';

export interface ComplianceDocument {
  id: string;
  document: string;
  project: string;
  category: ComplianceCategory;
  date: string;
  fileUrl: string;
  fileSize?: string;
}

export type BlogPostCategory = 'Market Insight' | 'Buyer Guide' | 'Living' | string;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: BlogPostCategory;
  excerpt: string;
  content: string;
  pullQuote?: string;
  image: string;
  readTime: string;
  author?: string;
  tags?: string[];
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  designation?: string;
  tenure?: string;
  fullBio?: string[];
  education?: string[];
  keyAchievements?: string[];
  quote?: string;
  areasOfFocus?: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  project: string;
  year: string;
  organization: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
  avatar: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
  link: string;
  category: ProjectCategory;
}

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sublabel?: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  project: string;
  residentType: 'Resident Indian' | 'NRI';
  message: string;
  consent: boolean;
}
