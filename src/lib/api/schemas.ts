import { z } from 'zod';

// ============================================================================
// 1. AUTH & USER SCHEMAS
// ============================================================================

export const RoleEnum = z.enum([
  'Super Admin',
  'Admin',
  'Content Editor',
  'Project Manager',
  'Sales Manager',
  'Analyst',
]);

export const ModuleEnum = z.enum([
  'dashboard',
  'projects',
  'media',
  'pages',
  'blog',
  'leads',
  'content',
  'analytics',
  'navigation',
  'settings',
  'users',
  'audit',
  'seo',
]);

export const ActionEnum = z.enum(['view', 'create', 'edit', 'publish', 'delete']);

export const PermissionMatrixSchema = z.record(
  ModuleEnum,
  z.record(ActionEnum, z.boolean())
);

export const UserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: RoleEnum,
  avatar: z.string().optional(),
  status: z.enum(['active', 'suspended', 'invited']),
  assignedCities: z.array(z.string()).optional(),
  lastLogin: z.string().optional(),
  twoFactorEnabled: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
  twoFactorCode: z.string().length(6, 'Code must be 6 digits').optional(),
});

// ============================================================================
// 2. PROJECT SCHEMAS
// ============================================================================

export const ProjectCategoryEnum = z.enum(['residential', 'commercial', 'hospitality', 'mixed-use']);

export const ProjectStatusEnum = z.enum([
  'Upcoming',
  'New Launch',
  'Under Construction',
  'Ready to Move',
  'Sold Out',
  'Delivered',
]);

export const ConfigurationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Configuration name is required (e.g. 3 BHK + Servant)'),
  carpetArea: z.number().min(0),
  builtUpArea: z.number().min(0),
  superArea: z.number().min(0),
  unit: z.enum(['sq.ft.', 'sq.yd.', 'sq.m.']).default('sq.ft.'),
  priceFrom: z.number().min(0),
  priceTo: z.number().min(0).optional(),
  priceOnRequest: z.boolean().default(false),
  availabilityCount: z.number().default(1),
  floorPlanImage: z.string().optional(),
  floorPlanPdf: z.string().optional(),
  isProtected: z.boolean().default(false),
});

export const PaymentPlanMilestoneSchema = z.object({
  id: z.string(),
  milestone: z.string(),
  percentage: z.number(),
  amountEstimate: z.string().optional(),
  dueDateInfo: z.string().optional(),
});

export const PaymentPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  milestones: z.array(PaymentPlanMilestoneSchema),
});

export const ProjectHighlightSchema = z.object({
  id: z.string(),
  icon: z.string().default('Sparkles'),
  title: z.string().min(1),
  description: z.string(),
});

export const ProjectAmenityItemSchema = z.object({
  amenityId: z.string(),
  isFeatured: z.boolean().default(false),
});

export const GalleryImageSchema = z.object({
  id: z.string(),
  url: z.string().url().or(z.string().startsWith('/')),
  caption: z.string().optional(),
  altText: z.string().optional(),
  category: z.enum(['Exterior', 'Interior', 'Amenities', 'Construction Progress', 'Location', 'Night View', 'Master Plan']).default('Exterior'),
  isCover: z.boolean().default(false),
  isHero: z.boolean().default(false),
  progressDate: z.string().optional(), // For construction progress e.g. "2026-03"
  order: z.number().default(0),
});

export const VideoItemSchema = z.object({
  id: z.string(),
  type: z.enum(['youtube', 'vimeo', 'upload', 'virtual_tour_360']),
  url: z.string().min(1),
  title: z.string().min(1),
  posterUrl: z.string().optional(),
  tag: z.enum(['Walkthrough', 'Drone View', 'Testimonial', '360 Tour', 'Architect Note']).default('Walkthrough'),
});

export const LocationAdvantageSchema = z.object({
  id: z.string(),
  landmarkName: z.string().min(1),
  category: z.enum(['School', 'Hospital', 'Metro', 'Airport', 'Mall', 'Highway', 'Railway', 'Commercial Hub']),
  distanceValue: z.number(),
  distanceUnit: z.enum(['km', 'meters', 'mins drive']).default('km'),
  travelTime: z.string().optional(), // e.g. "10 mins"
});

export const SpecificationRowSchema = z.object({
  id: z.string(),
  roomType: z.string(), // 'Living Room', 'Master Bedroom', etc.
  flooring: z.string().optional(),
  walls: z.string().optional(),
  fittings: z.string().optional(),
  doorsWindows: z.string().optional(),
  electrical: z.string().optional(),
  description: z.string().optional(),
});

export const ProjectDocumentSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  type: z.enum(['Brochure', 'Price List', 'RERA Certificate', 'EC Clearance', 'Layout Plan', 'Other']),
  fileUrl: z.string().min(1),
  fileSize: z.string().optional(),
  accessLevel: z.enum(['public', 'requires_lead']).default('public'),
});

export const DEFAULT_SEO = {
  metaTitle: '',
  metaDescription: '',
  keywords: [],
  noIndex: false,
};

export const SeoSchema = z.object({
  metaTitle: z.string().max(70, 'Meta title should be under 70 characters').optional().default(''),
  metaDescription: z.string().max(160, 'Meta description should be under 160 characters').optional().default(''),
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),
  keywords: z.array(z.string()).optional().default([]),
  jsonLdOverride: z.string().optional(),
  noIndex: z.boolean().optional().default(false),
});

export const RevisionHistoryItemSchema = z.object({
  id: z.string(),
  authorName: z.string(),
  authorEmail: z.string(),
  timestamp: z.string(),
  summary: z.string(),
  snapshot: z.record(z.string(), z.any()),
});

export const ProjectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2, 'Project name is required'),
  slug: z.string().min(2, 'Valid URL slug is required'),
  category: ProjectCategoryEnum,
  propertyTypes: z.array(z.string()).min(1, 'Select at least one property type'),
  city: z.string().min(1, 'City is required'),
  locality: z.string().min(1, 'Locality is required'),
  fullAddress: z.string().optional(),
  lat: z.number().default(28.6139),
  lng: z.number().default(77.209),
  status: ProjectStatusEnum,
  possessionDate: z.string().optional(),
  launchDate: z.string().optional(),
  
  // Editorial & Copy
  shortSummary: z.string().max(200, 'Summary must be 200 chars max'),
  descriptionHtml: z.string(),
  
  // Price & Units
  startingPrice: z.number().min(0),
  pricePerSqFt: z.number().optional(),
  currency: z.string().default('INR'),
  bookingAmount: z.number().optional(),
  priceOnRequest: z.boolean().default(false),
  paymentPlans: z.array(PaymentPlanSchema).default([]),
  
  // Modules
  configurations: z.array(ConfigurationSchema).default([]),
  highlights: z.array(ProjectHighlightSchema).default([]),
  amenities: z.array(ProjectAmenityItemSchema).default([]),
  gallery: z.array(GalleryImageSchema).default([]),
  videos: z.array(VideoItemSchema).default([]),
  locationAdvantages: z.array(LocationAdvantageSchema).default([]),
  specifications: z.array(SpecificationRowSchema).default([]),
  documents: z.array(ProjectDocumentSchema).default([]),
  
  // Legal & RERA
  reraNumber: z.string().optional(),
  reraAuthority: z.string().optional(),
  reraQrCode: z.string().optional(),
  approvalAuthority: z.string().optional(),
  totalLandArea: z.string().optional(),
  numberOfTowers: z.number().optional(),
  numberOfFloors: z.number().optional(),
  numberOfUnits: z.number().optional(),
  openAreaPercent: z.number().optional(),
  legalDisclaimer: z.string().optional(),
  
  // Settings & Visibility
  publishedState: z.enum(['draft', 'published', 'scheduled', 'archived']).default('draft'),
  scheduledPublishAt: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isHero: z.boolean().default(false),
  displayOrder: z.number().default(0),
  showEnquiryForm: z.boolean().default(true),
  customCtaLabel: z.string().optional(),
  customCtaLink: z.string().optional(),
  
  // SEO & Metrics
  seo: SeoSchema.default(DEFAULT_SEO),
  viewsCount: z.number().default(0),
  enquiriesCount: z.number().default(0),
  
  // History & Auditing
  revisions: z.array(RevisionHistoryItemSchema).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ============================================================================
// 3. MEDIA LIBRARY SCHEMAS
// ============================================================================

export const MediaVariantSchema = z.object({
  width: z.number(),
  url: z.string(),
  sizeBytes: z.number(),
});

export const MediaAssetSchema = z.object({
  id: z.string(),
  fileName: z.string().min(1),
  title: z.string().optional(),
  altText: z.string().optional(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  url: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number(),
  width: z.number().optional(),
  height: z.number().optional(),
  durationSeconds: z.number().optional(),
  folderPath: z.string().default('/'),
  tags: z.array(z.string()).default([]),
  usedIn: z.array(z.object({
    entityType: z.string(),
    entityId: z.string(),
    title: z.string(),
  })).default([]),
  editRecipeJson: z.string().optional(), // Non-destructive image edit recipe
  variants: z.array(MediaVariantSchema).default([]),
  uploadedBy: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ============================================================================
// 4. PAGE BUILDER & BLOCKS SCHEMAS
// ============================================================================

export const BlockTypeEnum = z.enum([
  'Hero',
  'HeroSlider',
  'SplitIntro',
  'StatsBand',
  'StatRow',
  'WhyChooseOmaxe',
  'ProjectCarousel',
  'ProjectGrid',
  'ProjectShowcase',
  'FeatureGrid',
  'PresenceMap',
  'LeadershipGrid',
  'TestimonialSlider',
  'AwardsMarquee',
  'JournalRow',
  'InTheNewsStrip',
  'CtaBand',
  'RichText',
  'TextContent',
  'Quote',
  'ImageAndText',
  'FullBleedImage',
  'VideoBand',
  'Gallery',
  'AccordionFaq',
  'FaqAccordion',
  'Timeline',
  'DocumentTable',
  'ContactForm',
  'MapSection',
  'LogoStrip',
  'Spacer',
  'CustomHtml',
]);

export const BlockSchema = z.object({
  id: z.string(),
  type: BlockTypeEnum,
  name: z.string(),
  isHidden: z.boolean().default(false),
  settings: z.record(z.string(), z.any()), // Typed payload per block type
  styles: z.object({
    background: z.enum(['cream', 'ivory', 'ink', 'gold-tint', 'image', 'white']).default('cream'),
    bgImageUrl: z.string().optional(),
    paddingTop: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
    paddingBottom: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
    containerWidth: z.enum(['narrow', 'normal', 'wide', 'full']).default('normal'),
    textAlign: z.enum(['left', 'center', 'right']).default('left'),
  }).default({
    background: 'cream',
    paddingTop: 'md',
    paddingBottom: 'md',
    containerWidth: 'normal',
    textAlign: 'left',
  }),
});

export const PageSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Page title is required'),
  slug: z.string().min(1, 'Slug is required'),
  template: z.enum(['blank', 'home', 'about', 'project-showcase', 'contact', 'legal', 'custom']).default('custom'),
  blocks: z.array(BlockSchema).default([]),
  seo: SeoSchema.default(DEFAULT_SEO),
  status: z.enum(['draft', 'published', 'scheduled']).default('draft'),
  scheduledAt: z.string().optional(),
  includeInNavigation: z.boolean().default(false),
  navigationLabel: z.string().optional(),
  authorName: z.string().optional(),
  revisions: z.array(RevisionHistoryItemSchema).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ============================================================================
// 5. CRM & LEADS SCHEMAS
// ============================================================================

export const LeadStatusEnum = z.enum([
  'New',
  'Contacted',
  'Qualified',
  'Site Visit Scheduled',
  'Negotiation',
  'Won',
  'Lost',
]);

export const LeadNoteSchema = z.object({
  id: z.string(),
  authorName: z.string(),
  authorAvatar: z.string().optional(),
  text: z.string(),
  mentions: z.array(z.string()).default([]),
  createdAt: z.string(),
});

export const LeadActivitySchema = z.object({
  id: z.string(),
  type: z.enum(['status_change', 'note_added', 'call_logged', 'email_sent', 'whatsapp_sent', 'assigned', 'site_visit']),
  description: z.string(),
  actorName: z.string(),
  timestamp: z.string(),
});

export const LeadSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  city: z.string().optional(),
  projectName: z.string().optional(),
  residentType: z.enum(['Indian Resident', 'Non-Resident Indian (NRI)', 'Corporate / Institutional']).default('Indian Resident'),
  message: z.string().optional(),
  budgetBand: z.string().optional(),
  budgetRange: z.string().optional(),
  projectInterest: z.string().optional(),
  preferredConfiguration: z.string().optional(),
  source: z.string().optional(),
  leadScore: z.number().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  sourcePage: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
  device: z.enum(['Desktop', 'Mobile', 'Tablet']).default('Desktop'),
  ipLocation: z.string().optional(),
  status: LeadStatusEnum.default('New'),
  assignedToUser: z.string().optional(), // User ID or Name
  assignedUserEmail: z.string().optional(),
  scheduledFollowUpAt: z.string().optional(),
  notes: z.array(LeadNoteSchema).default([]),
  activityLog: z.array(LeadActivitySchema).default([]),
  isDuplicate: z.boolean().default(false),
  mergedIntoId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ============================================================================
// 6. CONTENT MODULE SCHEMAS
// ============================================================================

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  slug: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.string(),
  coverImage: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().default('Market Insight'),
  tags: z.array(z.string()).default([]),
  author: z.string().default('Omaxe Editorial Team'),
  authorName: z.string().optional(),
  readTime: z.string().default('5 min read'),
  readTimeMinutes: z.number().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published', 'scheduled']).default('published'),
  publishedDate: z.string().optional(),
  seo: SeoSchema.default(DEFAULT_SEO),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AwardSchema = z.object({
  id: z.string(),
  title: z.string().min(2),
  organization: z.string().min(2),
  year: z.number().int().min(1987),
  category: z.string(),
  linkedProject: z.string().optional(),
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().default(false),
  order: z.number().default(0),
  createdAt: z.string(),
});

export const TestimonialSchema = z.object({
  id: z.string(),
  clientName: z.string().min(2),
  designationOrProject: z.string(),
  city: z.string().optional(),
  quoteText: z.string().min(10),
  videoUrl: z.string().optional(),
  photoUrl: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
  isFeatured: z.boolean().default(false),
  status: z.enum(['approved', 'pending_review', 'rejected']).default('approved'),
  createdAt: z.string(),
});

export const LeadershipSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  designation: z.string().min(2),
  shortBio: z.string(),
  longBio: z.string().optional(),
  photoUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  displayOrder: z.number().default(0),
  createdAt: z.string(),
});

export const CareerOpeningSchema = z.object({
  id: z.string(),
  title: z.string().min(2),
  department: z.string().min(2),
  location: z.string().min(2),
  type: z.enum(['Full-Time', 'Part-Time', 'Contract']).default('Full-Time'),
  experienceRange: z.string(),
  description: z.string(),
  responsibilities: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  salaryBand: z.string().optional(),
  openingsCount: z.number().default(1),
  status: z.enum(['active', 'closed', 'draft']).default('active'),
  closingDate: z.string().optional(),
  createdAt: z.string(),
});

export const CareerApplicantSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  jobTitle: z.string(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  resumeUrl: z.string(),
  currentCompany: z.string().optional(),
  noticePeriod: z.string().optional(),
  status: z.enum(['Applied', 'Screening', 'Interview', 'Offered', 'Rejected']).default('Applied'),
  appliedAt: z.string(),
});

export const InvestorDocSchema = z.object({
  id: z.string(),
  category: z.enum([
    'Annual Reports',
    'Quarterly Results',
    'Shareholding Pattern',
    'Corporate Governance',
    'Policies',
    'Notices',
  ]),
  title: z.string().min(2),
  financialYear: z.string(), // e.g. "FY 2025-26"
  quarter: z.enum(['Q1', 'Q2', 'Q3', 'Q4', 'Annual']).default('Annual'),
  fileUrl: z.string().min(1),
  fileSize: z.string().optional(),
  publishDate: z.string(),
  createdAt: z.string(),
});

export const NewsItemSchema = z.object({
  id: z.string(),
  type: z.enum(['press_release', 'e_coverage', 'print_coverage', 'event', 'video']),
  title: z.string().min(3),
  sourcePublication: z.string().optional(),
  externalLink: z.string().optional(),
  summary: z.string(),
  imageUrl: z.string().optional(),
  date: z.string(),
  createdAt: z.string(),
});

export const FaqItemSchema = z.object({
  id: z.string(),
  question: z.string().min(5),
  answer: z.string().min(5),
  category: z.string().default('General'),
  displayOrder: z.number().default(0),
  isPublished: z.boolean().default(true),
  createdAt: z.string(),
});

export const CityItemSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  slug: z.string().min(2),
  state: z.string().min(2),
  heroImage: z.string().optional(),
  introCopy: z.string(),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
  seo: SeoSchema.default(DEFAULT_SEO),
  createdAt: z.string(),
});

export const AmenityItemSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  icon: z.string().default('Sparkles'),
  category: z.enum(['Recreation', 'Security', 'Convenience', 'Wellness', 'Sustainability']).default('Convenience'),
  description: z.string().optional(),
  createdAt: z.string(),
});

// ============================================================================
// 7. NAVIGATION & GLOBAL SETTINGS SCHEMAS
// ============================================================================

export const NavigationItemSchema = z.object({
  id: z.string(),
  label: z.string().min(1),
  linkType: z.enum(['internal_page', 'project', 'city', 'external_url', 'anchor']),
  targetUrl: z.string(),
  iconName: z.string().optional(),
  badgeText: z.string().optional(),
  openInNewTab: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  children: z.lazy(() => z.array(NavigationItemSchema)).default([]),
});

export const GlobalSettingsSchema = z.object({
  brand: z.object({
    siteName: z.string().default('Omaxe Limited'),
    tagline: z.string().default('Turning Dreams into Reality'),
    logoLight: z.string().default('/images/omaxe-logo-white.svg'),
    logoDark: z.string().default('/images/omaxe-logo-dark.svg'),
    favicon: z.string().default('/favicon.ico'),
    ogDefaultImage: z.string().default('/images/hero-home.jpg'),
    primaryGoldColor: z.string().default('#A8823C'),
    primaryInkColor: z.string().default('#131616'),
  }),
  contact: z.object({
    headquartersAddress: z.string().default('Omaxe City Centre, Sector 11, Faridabad, Haryana 121006'),
    registeredOffice: z.string().default('Omaxe House, 7 Local Shopping Centre, Kalkaji, New Delhi 110019'),
    tollFreeNumber: z.string().default('1800-102-0064'),
    salesNumber: z.string().default('+91-11-41893100'),
    whatsappNumber: z.string().default('+91-99999-06293'),
    generalEmail: z.string().default('info@omaxe.com'),
    salesEmail: z.string().default('sales@omaxe.com'),
    investorEmail: z.string().default('investors@omaxe.com'),
  }),
  social: z.object({
    facebook: z.object({ url: z.string(), isVisible: z.boolean().default(true) }),
    instagram: z.object({ url: z.string(), isVisible: z.boolean().default(true) }),
    linkedin: z.object({ url: z.string(), isVisible: z.boolean().default(true) }),
    youtube: z.object({ url: z.string(), isVisible: z.boolean().default(true) }),
    x: z.object({ url: z.string(), isVisible: z.boolean().default(true) }),
  }),
  footer: z.object({
    disclaimerText: z.string().default('Disclaimer: The information provided on this website is for informational purposes only and does not constitute an offer or guarantee.'),
    copyrightText: z.string().default('© 1987–2026 Omaxe Limited. All Rights Reserved. CIN: L74899DL1989PLC038050'),
    newsletterHeading: z.string().default('Subscribe to The Omaxe Journal'),
    consentCopy: z.string().default('I consent to receive privileged investor updates and portfolio invitations from Omaxe Limited.'),
  }),
  bannersAndPopups: z.array(z.object({
    id: z.string(),
    title: z.string(),
    type: z.enum(['announcement_bar', 'lead_modal', 'exit_intent']),
    content: z.string(),
    ctaLabel: z.string().optional(),
    ctaUrl: z.string().optional(),
    isActive: z.boolean().default(false),
    targetPages: z.array(z.string()).default(['all']),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })).default([]),
  forms: z.object({
    enquiryFields: z.object({
      requireCity: z.boolean().default(true),
      requireProject: z.boolean().default(false),
      requireBudget: z.boolean().default(false),
      requireResidentType: z.boolean().default(true),
      consentNoticeText: z.string().default('I authorize Omaxe Limited to contact me via phone, email, and WhatsApp.'),
      successMessage: z.string().default('Thank you for connecting. An Omaxe Relationship Partner will contact you shortly.'),
      notificationRecipients: z.array(z.string()).default(['leads@omaxe.com']),
    }),
  }),
  integrations: z.object({
    gtmId: z.string().default('GTM-WB4F8MS'),
    ga4Id: z.string().optional(),
    metaPixelId: z.string().optional(),
    googleMapsApiKey: z.string().optional(),
    recaptchaSiteKey: z.string().optional(),
    crmWebhookUrl: z.string().optional(),
    smtpHost: z.string().optional(),
  }),
  maintenance: z.object({
    isEnabled: z.boolean().default(false),
    message: z.string().default('Our systems are undergoing scheduled maintenance. Please check back shortly or reach our concierge at 1800-102-0064.'),
    allowedIps: z.array(z.string()).default([]),
  }),
});

// ============================================================================
// 8. AUDIT, NOTIFICATIONS & SYSTEM SCHEMAS
// ============================================================================

export const AuditLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  actorName: z.string().optional(),
  actorEmail: z.string().optional(),
  module: z.string().optional(),
  targetTitle: z.string().optional(),
  entityType: z.string(), // 'project', 'page', 'lead', 'settings', etc.
  entityId: z.string(),
  action: z.enum(['create', 'update', 'delete', 'publish', 'unpublish', 'archive', 'login', 'export']),
  ipAddress: z.string().default('127.0.0.1'),
  summary: z.string(),
  diff: z.object({
    before: z.record(z.string(), z.any()).optional(),
    after: z.record(z.string(), z.any()).optional(),
  }).optional(),
  timestamp: z.string(),
});

export const NotificationItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
  type: z.enum(['lead', 'review_request', 'system', 'publish', 'warning']),
  link: z.string().optional(),
  isRead: z.boolean().default(false),
  createdAt: z.string(),
});

export const RedirectRuleSchema = z.object({
  id: z.string(),
  fromPath: z.string().min(1),
  toPath: z.string().min(1),
  statusCode: z.enum(['301', '302']).default('301'),
  hitCount: z.number().default(0),
  createdAt: z.string(),
});
