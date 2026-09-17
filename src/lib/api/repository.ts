import {
  AdminProject,
  MediaAsset,
  AdminPage,
  AdminLead,
  AdminBlogPost,
  AdminAward,
  AdminTestimonial,
  AdminLeadership,
  CareerOpening,
  CareerApplicant,
  InvestorDoc,
  AdminNewsItem,
  AdminFaqItem,
  AdminCity,
  MasterAmenity,
  NavigationItem,
  GlobalSettings,
  AuditLog,
  NotificationItem,
  RedirectRule,
  AdminUser,
  PaginationParams,
  PaginatedResult,
  FilterOptions,
} from './types';

export interface IBaseRepository<T> {
  list(params?: PaginationParams, filters?: FilterOptions): Promise<PaginatedResult<T>>;
  getById(id: string): Promise<T | null>;
  get?(id: string): Promise<T | null>;
  create(payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'> | T): Promise<T>;
  update(id: string, payload: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  bulkDelete?(ids: string[]): Promise<boolean>;
  duplicate?(id: string): Promise<T>;
  reorder?(orderedIds: string[]): Promise<boolean>;
}

export interface IProjectRepository extends IBaseRepository<AdminProject> {
  getBySlug(slug: string): Promise<AdminProject | null>;
  publish(id: string): Promise<AdminProject>;
  unpublish(id: string): Promise<AdminProject>;
  archive(id: string): Promise<AdminProject>;
  getFeatured(): Promise<AdminProject[]>;
  bulkUpdateStatus(ids: string[], status: string): Promise<boolean>;
  bulkPublish(ids: string[]): Promise<boolean>;
}

export interface IMediaRepository extends IBaseRepository<MediaAsset> {
  upload(file: File, folderOrMeta?: string | { title?: string; folder?: string; tags?: string[] }): Promise<MediaAsset>;
  bulkTag(ids: string[], tags: string[]): Promise<boolean>;
  bulkMove(ids: string[], targetFolder: string): Promise<boolean>;
  getUnusedAssets(): Promise<MediaAsset[]>;
  replaceFile(id: string, file: File): Promise<MediaAsset>;
  getFolders?(): Promise<string[]>;
}

export interface IPageRepository extends IBaseRepository<AdminPage> {
  getBySlug(slug: string): Promise<AdminPage | null>;
  publish(id: string): Promise<AdminPage>;
  saveDraft(id: string, blocks: any[]): Promise<AdminPage>;
  getReusableBlocks?(): Promise<any[]>;
}

export interface ILeadRepository extends IBaseRepository<AdminLead> {
  updateStatus(id: string, status: AdminLead['status']): Promise<AdminLead>;
  assignTo(id: string, userId: string, userEmail?: string): Promise<AdminLead>;
  addNote(id: string, noteText: string, authorName: string): Promise<AdminLead>;
  logActivity(id: string, activity: any): Promise<AdminLead>;
  bulkAssign(ids: string[], userId: string, userEmail?: string): Promise<boolean>;
  bulkUpdateStatus(ids: string[], status: AdminLead['status']): Promise<boolean>;
  mergeLeads(primaryId: string, secondaryId: string): Promise<AdminLead>;
}

export interface IContentRepository {
  blog: IBaseRepository<AdminBlogPost> & { getBySlug(slug: string): Promise<AdminBlogPost | null> };
  awards: IBaseRepository<AdminAward>;
  testimonials: IBaseRepository<AdminTestimonial>;
  leadership: IBaseRepository<AdminLeadership>;
  careers: IBaseRepository<CareerOpening>;
  applicants: IBaseRepository<CareerApplicant>;
  investorDocs: IBaseRepository<InvestorDoc>;
  news: IBaseRepository<AdminNewsItem>;
  faqs: IBaseRepository<AdminFaqItem>;
  cities: IBaseRepository<AdminCity>;
  amenities: IBaseRepository<MasterAmenity>;
}

export interface INavigationRepository {
  getHeaderMenu(): Promise<NavigationItem[]>;
  updateHeaderMenu(items: NavigationItem[]): Promise<boolean>;
  getFooterMenu(): Promise<NavigationItem[]>;
  updateFooterMenu(items: NavigationItem[]): Promise<boolean>;
}

export interface ISettingsRepository {
  getSettings(): Promise<GlobalSettings>;
  updateSettings(settings: Partial<GlobalSettings>): Promise<GlobalSettings>;
}

export interface ISystemRepository {
  getAuditLogs(params?: PaginationParams, filters?: FilterOptions): Promise<PaginatedResult<AuditLog>>;
  logAudit(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog>;
  getNotifications(): Promise<NotificationItem[]>;
  markNotificationRead(id: string): Promise<boolean>;
  markAllNotificationsRead(): Promise<boolean>;
  getRedirects(): Promise<RedirectRule[]>;
  saveRedirect(rule: Omit<RedirectRule, 'id' | 'createdAt' | 'hitCount'>): Promise<RedirectRule>;
  deleteRedirect(id: string): Promise<boolean>;
  getUsers(): Promise<AdminUser[]>;
  saveUser(user: Partial<AdminUser>): Promise<AdminUser>;
  deleteUser(id: string): Promise<boolean>;
}

export interface IApiAdapter {
  projects: IProjectRepository;
  media: IMediaRepository;
  pages: IPageRepository;
  leads: ILeadRepository;
  content: IContentRepository;
  navigation: INavigationRepository;
  settings: ISettingsRepository & {
    get?: () => Promise<GlobalSettings>;
    update?: (settings: Partial<GlobalSettings>) => Promise<GlobalSettings>;
  };
  system: ISystemRepository;
  analytics: {
    getDashboardKpis(dateRangeKey: string): Promise<any>;
    getTrafficSeries(dateRangeKey: string): Promise<any[]>;
    getTopProjects(limit?: number): Promise<any[]>;
    getEnquiriesByCity(): Promise<any[]>;
    getTrafficSources(): Promise<any[]>;
    getDeviceSplit(): Promise<any[]>;
    getRecentActivity(): Promise<any[]>;
    getNeedsAttention(): Promise<any[]>;
  };
  blog?: any;
  awards?: any;
  testimonials?: any;
  leadership?: any;
  cities?: any;
  investorDocs?: any;
  audit?: any;
  redirects?: any;
  users?: any;
}
