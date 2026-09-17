import { get, set } from 'idb-keyval';
import {
  IApiAdapter,
  IBaseRepository,
  IProjectRepository,
  IMediaRepository,
  IPageRepository,
  ILeadRepository,
  IContentRepository,
  INavigationRepository,
  ISettingsRepository,
  ISystemRepository,
} from './repository';
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
import {
  SEED_USERS,
  SEED_PROJECTS,
  SEED_LEADS,
  SEED_MEDIA,
  SEED_BLOG_POSTS,
  SEED_AWARDS,
  SEED_TESTIMONIALS,
  SEED_LEADERSHIP,
  SEED_CITIES,
  SEED_MASTER_AMENITIES,
  SEED_GLOBAL_SETTINGS,
  SEED_PAGES,
  SEED_AUDIT_LOGS,
  SEED_NOTIFICATIONS,
} from './seed-data';

// Helper to paginate and filter in memory
function paginateAndFilter<T extends { id: string }>(
  items: T[],
  params: PaginationParams = {},
  filterFn?: (item: T) => boolean
): PaginatedResult<T> {
  let filtered = filterFn ? items.filter(filterFn) : [...items];
  const page = Math.max(1, params.page || 1);
  const pageSize = Math.max(1, params.pageSize || 10);

  if (params.sortBy) {
    const key = params.sortBy as keyof T;
    const order = params.sortOrder === 'desc' ? -1 : 1;
    filtered.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * order;
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * order;
      }
      return 0;
    });
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
  };
}

// Generic Storage Helper for IndexedDB with Seed Fallback
class StorageTable<T extends { id: string; createdAt?: string; updatedAt?: string }> {
  private key: string;
  private seedData: T[];

  constructor(key: string, seedData: T[]) {
    this.key = `omaxe_admin_${key}`;
    this.seedData = seedData;
  }

  async getAll(): Promise<T[]> {
    try {
      const existing = await get<T[]>(this.key);
      if (existing && Array.isArray(existing) && existing.length > 0) {
        return existing;
      }
      // Initialize seed
      await set(this.key, this.seedData);
      return this.seedData;
    } catch {
      return this.seedData;
    }
  }

  async setAll(items: T[]): Promise<void> {
    await set(this.key, items);
  }

  async getById(id: string): Promise<T | null> {
    const all = await this.getAll();
    return all.find((item) => item.id === id) || null;
  }

  async create(payload: any): Promise<T> {
    const all = await this.getAll();
    const id = payload.id || `id-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const newItem = {
      ...payload,
      id,
      createdAt: payload.createdAt || now,
      updatedAt: now,
    } as T;
    const updated = [newItem, ...all];
    await this.setAll(updated);
    return newItem;
  }

  async update(id: string, payload: Partial<T>): Promise<T> {
    const all = await this.getAll();
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found in ${this.key}`);
    }
    const updatedItem = {
      ...all[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    all[index] = updatedItem;
    await this.setAll(all);
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((item) => item.id !== id);
    await this.setAll(filtered);
    return true;
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const idSet = new Set(ids);
    const all = await this.getAll();
    const filtered = all.filter((item) => !idSet.has(item.id));
    await this.setAll(filtered);
    return true;
  }

  async duplicate(id: string): Promise<T> {
    const item = await this.getById(id);
    if (!item) throw new Error(`Item with id ${id} not found to duplicate`);
    const { id: _, ...rest } = item;
    const duplicatedName = (rest as any).name ? `${(rest as any).name} (Copy)` : (rest as any).title ? `${(rest as any).title} (Copy)` : 'Copy';
    const duplicatedSlug = (rest as any).slug ? `${(rest as any).slug}-copy-${Date.now().toString().slice(-4)}` : undefined;
    return this.create({
      ...rest,
      ...((rest as any).name ? { name: duplicatedName } : {}),
      ...((rest as any).title ? { title: duplicatedName } : {}),
      ...(duplicatedSlug ? { slug: duplicatedSlug } : {}),
      publishedState: 'draft',
      status: 'draft',
    });
  }

  async reorder(orderedIds: string[]): Promise<boolean> {
    const all = await this.getAll();
    const map = new Map(all.map((item) => [item.id, item]));
    const reordered: T[] = [];
    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        (item as any).displayOrder = idx;
        reordered.push(item);
        map.delete(id);
      }
    });
    // Append remaining
    map.forEach((item) => reordered.push(item));
    await this.setAll(reordered);
    return true;
  }
}

// Initialise storage tables
const usersStore = new StorageTable<AdminUser>('users', SEED_USERS);
const projectsStore = new StorageTable<AdminProject>('projects', SEED_PROJECTS);
const leadsStore = new StorageTable<AdminLead>('leads', SEED_LEADS);
const mediaStore = new StorageTable<MediaAsset>('media', SEED_MEDIA);
const pagesStore = new StorageTable<AdminPage>('pages', SEED_PAGES);
const blogStore = new StorageTable<AdminBlogPost>('blog', SEED_BLOG_POSTS);
const awardsStore = new StorageTable<AdminAward>('awards', SEED_AWARDS);
const testimonialsStore = new StorageTable<AdminTestimonial>('testimonials', SEED_TESTIMONIALS);
const leadershipStore = new StorageTable<AdminLeadership>('leadership', SEED_LEADERSHIP);
const citiesStore = new StorageTable<AdminCity>('cities', SEED_CITIES);
const amenitiesStore = new StorageTable<MasterAmenity>('amenities', SEED_MASTER_AMENITIES);
const auditStore = new StorageTable<AuditLog>('audit_logs', SEED_AUDIT_LOGS);
const notificationsStore = new StorageTable<NotificationItem>('notifications', SEED_NOTIFICATIONS);

// Create Generic CRUD wrapper
function createGenericRepository<T extends { id: string }>(store: StorageTable<T>): IBaseRepository<T> {
  return {
    async list(params?: PaginationParams, filters?: FilterOptions) {
      const all = await store.getAll();
      const combinedFilters = { ...(filters || {}), ...(params || {}) };
      return paginateAndFilter(all, params, (item) => {
        if (combinedFilters.search) {
          const q = combinedFilters.search.toLowerCase();
          const str = JSON.stringify(item).toLowerCase();
          if (!str.includes(q)) return false;
        }
        if (combinedFilters.folder && (item as any).folderPath && !(item as any).folderPath.includes(combinedFilters.folder)) {
          return false;
        }
        if (combinedFilters.status && (item as any).status !== combinedFilters.status && (item as any).publishedState !== combinedFilters.status) {
          return false;
        }
        if (combinedFilters.category && (item as any).category !== combinedFilters.category) return false;
        if (combinedFilters.city && (item as any).city !== combinedFilters.city) return false;
        return true;
      });
    },
    getById: (id: string) => store.getById(id),
    get: (id: string) => store.getById(id),
    create: (payload: any) => store.create(payload),
    update: (id: string, payload: any) => store.update(id, payload),
    delete: (id: string) => store.delete(id),
    bulkDelete: (ids: string[]) => store.bulkDelete(ids),
    duplicate: (id: string) => store.duplicate(id),
    reorder: (ids: string[]) => store.reorder(ids),
  };
}

// ----------------------------------------------------------------------------
// PROJECT REPOSITORY IMPLEMENTATION
// ----------------------------------------------------------------------------
const projectRepository: IProjectRepository = {
  ...createGenericRepository(projectsStore),
  async getBySlug(slug: string) {
    if (!slug) return null;
    const all = await projectsStore.getAll();
    return all.find((p) => (p.slug || '').toLowerCase() === slug.toLowerCase()) || null;
  },
  async publish(id: string) {
    return projectsStore.update(id, { publishedState: 'published' });
  },
  async unpublish(id: string) {
    return projectsStore.update(id, { publishedState: 'draft' });
  },
  async archive(id: string) {
    return projectsStore.update(id, { publishedState: 'archived' });
  },
  async getFeatured() {
    const all = await projectsStore.getAll();
    return all.filter((p) => p.isFeatured && p.publishedState === 'published').sort((a, b) => a.displayOrder - b.displayOrder);
  },
  async bulkUpdateStatus(ids: string[], status: any) {
    const all = await projectsStore.getAll();
    const idSet = new Set(ids);
    const updated = all.map((p) => (idSet.has(p.id) ? { ...p, status, updatedAt: new Date().toISOString() } : p));
    await projectsStore.setAll(updated);
    return true;
  },
  async bulkPublish(ids: string[]) {
    const all = await projectsStore.getAll();
    const idSet = new Set(ids);
    const updated = all.map((p) => (idSet.has(p.id) ? { ...p, publishedState: 'published' as const, updatedAt: new Date().toISOString() } : p));
    await projectsStore.setAll(updated);
    return true;
  },
};

// ----------------------------------------------------------------------------
// MEDIA REPOSITORY IMPLEMENTATION
// ----------------------------------------------------------------------------
const mediaRepository: IMediaRepository = {
  ...createGenericRepository(mediaStore),
  async upload(file: File, folderOrMeta?: string | { title?: string; folder?: string; tags?: string[] }): Promise<MediaAsset> {
    const url = URL.createObjectURL(file);
    const folderPath = typeof folderOrMeta === 'string' ? folderOrMeta : (folderOrMeta?.folder || '/');
    const title = typeof folderOrMeta === 'object' && folderOrMeta?.title ? folderOrMeta.title : file.name.replace(/\.[^/.]+$/, '');
    const tags = typeof folderOrMeta === 'object' && folderOrMeta?.tags ? folderOrMeta.tags : ['upload'];
    return mediaStore.create({
      fileName: file.name,
      title,
      altText: title,
      url,
      mimeType: file.type || 'image/jpeg',
      sizeBytes: file.size,
      folderPath,
      tags,
      variants: [],
    });
  },
  async getFolders(): Promise<string[]> {
    const all = await mediaStore.getAll();
    const set = new Set<string>();
    all.forEach((m) => {
      if (m.folderPath) {
        const clean = m.folderPath.replace(/^\/+|\/+$/g, '') || 'General';
        set.add(clean);
      }
    });
    if (set.size === 0) set.add('General');
    return Array.from(set).sort();
  },
  async bulkTag(ids: string[], tags: string[]) {
    const all = await mediaStore.getAll();
    const idSet = new Set(ids);
    const updated = all.map((m) => {
      if (!idSet.has(m.id)) return m;
      const combined = Array.from(new Set([...(m.tags || []), ...tags]));
      return { ...m, tags: combined, updatedAt: new Date().toISOString() };
    });
    await mediaStore.setAll(updated);
    return true;
  },
  async bulkMove(ids: string[], targetFolder: string) {
    const all = await mediaStore.getAll();
    const idSet = new Set(ids);
    const updated = all.map((m) => (idSet.has(m.id) ? { ...m, folderPath: targetFolder, updatedAt: new Date().toISOString() } : m));
    await mediaStore.setAll(updated);
    return true;
  },
  async getUnusedAssets() {
    const all = await mediaStore.getAll();
    return all.filter((m) => !m.usedIn || m.usedIn.length === 0);
  },
  async replaceFile(id: string, file: File) {
    const url = URL.createObjectURL(file);
    return mediaStore.update(id, {
      fileName: file.name,
      url,
      mimeType: file.type,
      sizeBytes: file.size,
    });
  },
};

// ----------------------------------------------------------------------------
// PAGE REPOSITORY IMPLEMENTATION
// ----------------------------------------------------------------------------
const pageRepository: IPageRepository = {
  ...createGenericRepository(pagesStore),
  async getBySlug(slug: string) {
    const all = await pagesStore.getAll();
    return all.find((p) => p.slug === slug) || null;
  },
  async publish(id: string) {
    return pagesStore.update(id, { status: 'published' });
  },
  async saveDraft(id: string, blocks: any[]) {
    return pagesStore.update(id, { blocks, status: 'draft' });
  },
};

// ----------------------------------------------------------------------------
// LEADS REPOSITORY IMPLEMENTATION
// ----------------------------------------------------------------------------
const leadRepository: ILeadRepository = {
  ...createGenericRepository(leadsStore),
  async updateStatus(id: string, status: any) {
    const lead = await leadsStore.getById(id);
    if (!lead) throw new Error('Lead not found');
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'status_change' as const,
      description: `Status changed from ${lead.status} to ${status}`,
      actorName: 'Admin User',
      timestamp: new Date().toISOString(),
    };
    return leadsStore.update(id, {
      status,
      activityLog: [newActivity, ...(lead.activityLog || [])],
    });
  },
  async assignTo(id: string, userId: string, userEmail?: string) {
    const lead = await leadsStore.getById(id);
    if (!lead) throw new Error('Lead not found');
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'assigned' as const,
      description: `Assigned lead to ${userEmail || userId}`,
      actorName: 'Admin User',
      timestamp: new Date().toISOString(),
    };
    return leadsStore.update(id, {
      assignedToUser: userId,
      assignedUserEmail: userEmail,
      activityLog: [newActivity, ...(lead.activityLog || [])],
    });
  },
  async addNote(id: string, noteText: string, authorName: string) {
    const lead = await leadsStore.getById(id);
    if (!lead) throw new Error('Lead not found');
    const note = {
      id: `note-${Date.now()}`,
      authorName,
      text: noteText,
      mentions: [],
      createdAt: new Date().toISOString(),
    };
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'note_added' as const,
      description: `Added internal note`,
      actorName: authorName,
      timestamp: new Date().toISOString(),
    };
    return leadsStore.update(id, {
      notes: [note, ...(lead.notes || [])],
      activityLog: [newActivity, ...(lead.activityLog || [])],
    });
  },
  async logActivity(id: string, activity: any) {
    const lead = await leadsStore.getById(id);
    if (!lead) throw new Error('Lead not found');
    return leadsStore.update(id, {
      activityLog: [{ ...activity, id: `act-${Date.now()}`, timestamp: new Date().toISOString() }, ...(lead.activityLog || [])],
    });
  },
  async bulkAssign(ids: string[], userId: string, userEmail?: string) {
    const all = await leadsStore.getAll();
    const idSet = new Set(ids);
    const updated = all.map((l) => (idSet.has(l.id) ? { ...l, assignedToUser: userId, assignedUserEmail: userEmail, updatedAt: new Date().toISOString() } : l));
    await leadsStore.setAll(updated);
    return true;
  },
  async bulkUpdateStatus(ids: string[], status: any) {
    const all = await leadsStore.getAll();
    const idSet = new Set(ids);
    const updated = all.map((l) => (idSet.has(l.id) ? { ...l, status, updatedAt: new Date().toISOString() } : l));
    await leadsStore.setAll(updated);
    return true;
  },
  async mergeLeads(primaryId: string, secondaryId: string) {
    const primary = await leadsStore.getById(primaryId);
    const secondary = await leadsStore.getById(secondaryId);
    if (!primary || !secondary) throw new Error('One or both leads not found for merging');
    
    const mergedNotes = [...(primary.notes || []), ...(secondary.notes || [])];
    const mergedActivity: any[] = [
      {
        id: `act-${Date.now()}`,
        type: 'note_added' as const,
        description: `Merged details from duplicate lead #${secondary.id}`,
        actorName: 'Admin User',
        timestamp: new Date().toISOString(),
      },
      ...(primary.activityLog || []),
      ...(secondary.activityLog || []),
    ];

    await leadsStore.update(secondaryId, { isDuplicate: true, mergedIntoId: primaryId, status: 'Lost' });
    return leadsStore.update(primaryId, {
      notes: mergedNotes,
      activityLog: mergedActivity,
    });
  },
};

// ----------------------------------------------------------------------------
// CONTENT REPOSITORIES
// ----------------------------------------------------------------------------
const blogRepository = {
  ...createGenericRepository(blogStore),
  async getBySlug(slug: string) {
    if (!slug) return null;
    const all = await blogStore.getAll();
    return all.find((b) => (b.slug || '').toLowerCase() === slug.toLowerCase()) || null;
  },
};

const contentRepository: IContentRepository = {
  blog: blogRepository,
  awards: createGenericRepository(awardsStore),
  testimonials: createGenericRepository(testimonialsStore),
  leadership: createGenericRepository(leadershipStore),
  careers: createGenericRepository(new StorageTable('careers', [])),
  applicants: createGenericRepository(new StorageTable('applicants', [])),
  investorDocs: createGenericRepository(new StorageTable('investor_docs', [])),
  news: createGenericRepository(new StorageTable('news', [])),
  faqs: createGenericRepository(new StorageTable('faqs', [])),
  cities: createGenericRepository(citiesStore),
  amenities: createGenericRepository(amenitiesStore),
};

// ----------------------------------------------------------------------------
// NAVIGATION & SETTINGS
// ----------------------------------------------------------------------------
const navigationRepository: INavigationRepository = {
  async getHeaderMenu() {
    const menu = await get<NavigationItem[]>('omaxe_admin_nav_header');
    return menu || [
      { id: 'nav-1', label: 'Projects', linkType: 'internal_page', targetUrl: '/projects', isVisible: true, openInNewTab: false, children: [] },
      { id: 'nav-2', label: 'About Us', linkType: 'internal_page', targetUrl: '/about', isVisible: true, openInNewTab: false, children: [] },
      { id: 'nav-3', label: 'Investor Relations', linkType: 'internal_page', targetUrl: '/investor', isVisible: true, openInNewTab: false, children: [] },
      { id: 'nav-4', label: 'Journal', linkType: 'internal_page', targetUrl: '/blog', isVisible: true, openInNewTab: false, children: [] },
      { id: 'nav-5', label: 'Contact', linkType: 'internal_page', targetUrl: '/contact', isVisible: true, openInNewTab: false, children: [] },
    ];
  },
  async updateHeaderMenu(items: NavigationItem[]) {
    await set('omaxe_admin_nav_header', items);
    return true;
  },
  async getFooterMenu() {
    const menu = await get<NavigationItem[]>('omaxe_admin_nav_footer');
    return menu || [];
  },
  async updateFooterMenu(items: NavigationItem[]) {
    await set('omaxe_admin_nav_footer', items);
    return true;
  },
};

const settingsRepository: ISettingsRepository = {
  async getSettings() {
    const saved = await get<GlobalSettings>('omaxe_admin_global_settings');
    return saved || SEED_GLOBAL_SETTINGS;
  },
  async updateSettings(settings: Partial<GlobalSettings>) {
    const current = await this.getSettings();
    const merged = { ...current, ...settings };
    await set('omaxe_admin_global_settings', merged);
    return merged;
  },
};

// ----------------------------------------------------------------------------
// SYSTEM REPOSITORY
// ----------------------------------------------------------------------------
const systemRepository: ISystemRepository = {
  async getAuditLogs(params, filters) {
    const all = await auditStore.getAll();
    return paginateAndFilter(all, params, (item) => {
      if (!filters) return true;
      if (filters.search) {
        const q = String(filters.search).toLowerCase();
        const summary = (item.summary || '').toLowerCase();
        const userName = (item.userName || item.actorName || '').toLowerCase();
        const target = (item.targetTitle || '').toLowerCase();
        if (!summary.includes(q) && !userName.includes(q) && !target.includes(q)) return false;
      }
      if (filters.action && item.action !== filters.action) return false;
      if (filters.entityType && item.entityType !== filters.entityType) return false;
      return true;
    });
  },
  async logAudit(log) {
    return auditStore.create(log);
  },
  async getNotifications() {
    return notificationsStore.getAll();
  },
  async markNotificationRead(id: string) {
    await notificationsStore.update(id, { isRead: true });
    return true;
  },
  async markAllNotificationsRead() {
    const all = await notificationsStore.getAll();
    const updated = all.map((n) => ({ ...n, isRead: true }));
    await notificationsStore.setAll(updated);
    return true;
  },
  async getRedirects() {
    const r = await get<RedirectRule[]>('omaxe_admin_redirects');
    return r || [
      { id: 'red-1', fromPath: '/old-lake-project', toPath: '/projects/the-lake-luxury-towers', statusCode: '301', hitCount: 142, createdAt: '2025-01-01T00:00:00Z' },
    ];
  },
  async saveRedirect(rule) {
    const list = await this.getRedirects();
    const newRule: RedirectRule = { ...rule, id: `red-${Date.now()}`, hitCount: 0, createdAt: new Date().toISOString() };
    await set('omaxe_admin_redirects', [newRule, ...list]);
    return newRule;
  },
  async deleteRedirect(id: string) {
    const list = await this.getRedirects();
    await set('omaxe_admin_redirects', list.filter((r) => r.id !== id));
    return true;
  },
  async getUsers() {
    return usersStore.getAll();
  },
  async saveUser(user) {
    if (user.id) {
      return usersStore.update(user.id, user as any);
    }
    return usersStore.create(user as any);
  },
  async deleteUser(id: string) {
    return usersStore.delete(id);
  },
};

// ----------------------------------------------------------------------------
// ANALYTICS ENGINE WITH REALISTIC TIME-SERIES & SPARKLINE DATA
// ----------------------------------------------------------------------------
const analyticsEngine = {
  async getDashboardKpis(dateRangeKey: string) {
    const multiplier = dateRangeKey === 'today' ? 0.08 : dateRangeKey === '7d' ? 0.35 : dateRangeKey === '90d' ? 2.8 : 1.0;
    return [
      {
        id: 'total_visitors',
        label: 'Total Page Views',
        currentValue: Math.round(184250 * multiplier),
        previousValue: Math.round(162100 * multiplier),
        format: 'number',
        sparklineData: [42, 48, 55, 50, 62, 70, 85, 92, 88, 105, 118, 130],
      },
      {
        id: 'unique_visitors',
        label: 'Unique Visitors',
        currentValue: Math.round(78420 * multiplier),
        previousValue: Math.round(71300 * multiplier),
        format: 'number',
        sparklineData: [20, 24, 28, 25, 31, 35, 41, 46, 44, 52, 59, 65],
      },
      {
        id: 'enquiries',
        label: 'Qualified Enquiries',
        currentValue: Math.round(1248 * multiplier),
        previousValue: Math.round(1085 * multiplier),
        format: 'number',
        sparklineData: [12, 15, 18, 14, 22, 26, 31, 28, 35, 42, 48, 54],
      },
      {
        id: 'brochure_downloads',
        label: 'Brochure Downloads',
        currentValue: Math.round(3840 * multiplier),
        previousValue: Math.round(3410 * multiplier),
        format: 'number',
        sparklineData: [45, 52, 60, 58, 68, 75, 82, 90, 88, 102, 115, 128],
      },
      {
        id: 'conversion_rate',
        label: 'Lead Conversion Rate',
        currentValue: 3.42,
        previousValue: 3.18,
        format: 'percent',
        sparklineData: [2.8, 2.9, 3.1, 3.0, 3.2, 3.3, 3.4, 3.3, 3.5, 3.4, 3.42, 3.45],
      },
      {
        id: 'avg_session',
        label: 'Avg. Session Duration',
        currentValue: 254, // in seconds
        previousValue: 238,
        format: 'duration',
        sparklineData: [210, 215, 225, 230, 240, 238, 245, 250, 248, 252, 254, 258],
      },
    ];
  },
  async getTrafficSeries(dateRangeKey: string) {
    const days = dateRangeKey === '7d' ? 7 : dateRangeKey === 'today' ? 24 : 30;
    const series = [];
    for (let i = 1; i <= days; i++) {
      const current = Math.round(4500 + Math.sin(i / 2) * 1200 + Math.random() * 800);
      const previous = Math.round(4000 + Math.sin(i / 2) * 1000 + Math.random() * 600);
      series.push({
        name: dateRangeKey === 'today' ? `${i}:00` : `Day ${i}`,
        current,
        previous,
      });
    }
    return series;
  },
  async getTopProjects(limit: number = 10) {
    const projects = await projectsStore.getAll();
    return projects
      .map((p) => ({
        id: p.id,
        name: p.name,
        city: p.city,
        views: p.viewsCount || 12000,
        enquiries: p.enquiriesCount || 110,
        conversion: ((p.enquiriesCount || 100) / (p.viewsCount || 10000) * 100).toFixed(2),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },
  async getEnquiriesByCity() {
    const leads = await leadsStore.getAll();
    const cityCounts: Record<string, number> = {};
    leads.forEach((l) => {
      const c = l.city || 'New Delhi';
      cityCounts[c] = (cityCounts[c] || 0) + 1;
    });
    // Add default popular cities
    ['New Delhi', 'Lucknow', 'Chandigarh', 'Faridabad', 'Indore', 'Ludhiana'].forEach((c) => {
      if (!cityCounts[c]) cityCounts[c] = Math.floor(Math.random() * 45) + 15;
    });
    return Object.entries(cityCounts).map(([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count);
  },
  async getTrafficSources() {
    return [
      { name: 'Organic Search (Google)', channel: 'Organic Search (Google)', value: 48, percentage: 48, fill: '#171717' },
      { name: 'Direct Traffic', channel: 'Direct Traffic', value: 24, percentage: 24, fill: '#A8823C' },
      { name: 'Paid Search & Meta Ads', channel: 'Paid Search & Meta Ads', value: 16, percentage: 16, fill: '#525252' },
      { name: 'Social & YouTube', channel: 'Social & YouTube', value: 8, percentage: 8, fill: '#A3A3A3' },
      { name: 'Referral & PR Portals', channel: 'Referral & PR Portals', value: 4, percentage: 4, fill: '#D4D4D4' },
    ];
  },
  async getDeviceSplit() {
    return [
      { name: 'Mobile', channel: 'Mobile', value: 62, percentage: 62, fill: '#A8823C' },
      { name: 'Desktop', channel: 'Desktop', value: 34, percentage: 34, fill: '#171717' },
      { name: 'Tablet', channel: 'Tablet', value: 4, percentage: 4, fill: '#737373' },
    ];
  },
  async getRecentActivity() {
    const leads = await leadsStore.getAll();
    const audit = await auditStore.getAll();
    const combined = [
      ...leads.slice(0, 4).map((l) => ({
        id: `act-lead-${l.id}`,
        title: `New Lead: ${l.name}`,
        subtitle: `${l.projectName || 'General'} · ${l.city || 'India'} (${l.budgetBand || 'Luxury'})`,
        time: l.createdAt,
        type: 'lead',
      })),
      ...audit.slice(0, 4).map((a) => ({
        id: `act-aud-${a.id}`,
        title: a.summary,
        subtitle: `By ${a.userName} (${a.userEmail})`,
        time: a.timestamp,
        type: a.action,
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    return combined.slice(0, 6);
  },
  async getNeedsAttention() {
    const projects = await projectsStore.getAll();
    const leads = await leadsStore.getAll();
    const unassignedLeads = leads.filter((l) => !l.assignedToUser).length;
    const missingImages = projects.filter((p) => !p.gallery || p.gallery.length < 2).length;
    const missingSeo = projects.filter((p) => !p.seo || !p.seo.metaDescription).length;
    return [
      { id: 'na-1', title: `${unassignedLeads} Unassigned VIP Leads`, desc: 'Leads received in the last 24 hours requiring relationship manager assignment.', severity: 'high', link: '/admin/leads' },
      { id: 'na-2', title: `${missingImages} Projects Missing High-Res Gallery`, desc: 'Developments with fewer than 2 high-resolution architectural images.', severity: 'medium', link: '/admin/projects' },
      { id: 'na-3', title: `${missingSeo} Pages with Incomplete Meta Descriptions`, desc: 'SEO audits show missing meta description tags affecting SERP CTR.', severity: 'low', link: '/admin/seo' },
    ];
  },
};

// ----------------------------------------------------------------------------
// EXPORT UNIFIED API ADAPTER (SWAPPABLE TO REST / SUPABASE / STRAPI)
// ----------------------------------------------------------------------------
export const mockApiAdapter: IApiAdapter = {
  projects: projectRepository,
  media: mediaRepository,
  pages: pageRepository,
  leads: leadRepository,
  content: contentRepository,
  navigation: navigationRepository,
  settings: settingsRepository,
  system: systemRepository,
  analytics: analyticsEngine,
};
