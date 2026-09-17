import { z } from 'zod';
import * as S from './schemas';

// ============================================================================
// DERIVED TYPES FROM ZOD SCHEMAS (Never write types twice)
// ============================================================================

export type Role = z.infer<typeof S.RoleEnum>;
export type AdminModule = z.infer<typeof S.ModuleEnum>;
export type AdminAction = z.infer<typeof S.ActionEnum>;
export type PermissionMatrix = z.infer<typeof S.PermissionMatrixSchema>;
export type AdminUser = z.infer<typeof S.UserSchema>;
export type LoginCredentials = z.infer<typeof S.LoginSchema>;

// Projects
export type ProjectCategory = z.infer<typeof S.ProjectCategoryEnum>;
export type ProjectStatus = z.infer<typeof S.ProjectStatusEnum>;
export type Configuration = z.infer<typeof S.ConfigurationSchema>;
export type PaymentPlanMilestone = z.infer<typeof S.PaymentPlanMilestoneSchema>;
export type PaymentPlan = z.infer<typeof S.PaymentPlanSchema>;
export type ProjectHighlight = z.infer<typeof S.ProjectHighlightSchema>;
export type ProjectAmenityItem = z.infer<typeof S.ProjectAmenityItemSchema>;
export type GalleryImage = z.infer<typeof S.GalleryImageSchema>;
export type VideoItem = z.infer<typeof S.VideoItemSchema>;
export type LocationAdvantage = z.infer<typeof S.LocationAdvantageSchema>;
export type SpecificationRow = z.infer<typeof S.SpecificationRowSchema>;
export type ProjectDocument = z.infer<typeof S.ProjectDocumentSchema>;
export type SeoMetadata = z.infer<typeof S.SeoSchema>;
export type RevisionHistoryItem = z.infer<typeof S.RevisionHistoryItemSchema>;
export type AdminProject = z.infer<typeof S.ProjectSchema>;
export type ProjectEntity = AdminProject;

// Media
export type MediaVariant = z.infer<typeof S.MediaVariantSchema>;
export type MediaAsset = z.infer<typeof S.MediaAssetSchema>;

// Page Builder
export type BlockType = z.infer<typeof S.BlockTypeEnum>;
export type PageBlock = z.infer<typeof S.BlockSchema>;
export type AdminPage = z.infer<typeof S.PageSchema>;

// CRM & Leads
export type LeadStatus = z.infer<typeof S.LeadStatusEnum>;
export type LeadNote = z.infer<typeof S.LeadNoteSchema>;
export type LeadActivity = z.infer<typeof S.LeadActivitySchema>;
export type AdminLead = z.infer<typeof S.LeadSchema>;
export type LeadEntity = AdminLead;

// Content Modules
export type AdminBlogPost = z.infer<typeof S.BlogPostSchema>;
export type AdminAward = z.infer<typeof S.AwardSchema>;
export type AdminTestimonial = z.infer<typeof S.TestimonialSchema>;
export type AdminLeadership = z.infer<typeof S.LeadershipSchema>;
export type CareerOpening = z.infer<typeof S.CareerOpeningSchema>;
export type CareerApplicant = z.infer<typeof S.CareerApplicantSchema>;
export type InvestorDoc = z.infer<typeof S.InvestorDocSchema>;
export type AdminNewsItem = z.infer<typeof S.NewsItemSchema>;
export type AdminFaqItem = z.infer<typeof S.FaqItemSchema>;
export type AdminCity = z.infer<typeof S.CityItemSchema>;
export type MasterAmenity = z.infer<typeof S.AmenityItemSchema>;

// Navigation & Settings
export type NavigationItem = z.infer<typeof S.NavigationItemSchema>;
export type GlobalSettings = z.infer<typeof S.GlobalSettingsSchema>;

// System & Auditing
export type AuditLog = z.infer<typeof S.AuditLogSchema>;
export type NotificationItem = z.infer<typeof S.NotificationItemSchema>;
export type RedirectRule = z.infer<typeof S.RedirectRuleSchema>;

// ============================================================================
// API FILTER & QUERY ENVELOPES
// ============================================================================

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  folder?: string;
  status?: string;
  city?: string;
  propertyType?: string;
  category?: string;
  publishedState?: string;
  [key: string]: any;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  search?: string;
  status?: string;
  category?: string;
  city?: string;
  publishedState?: string;
  [key: string]: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Analytics Metrics
export interface KpiMetric {
  id: string;
  label: string;
  currentValue: number;
  previousValue: number;
  format: 'number' | 'currency' | 'percent' | 'duration';
  sparklineData: number[];
}

export interface DateRangeOption {
  key: 'today' | '7d' | '30d' | '90d' | 'ytd' | 'custom';
  label: string;
  startDate: string;
  endDate: string;
}
