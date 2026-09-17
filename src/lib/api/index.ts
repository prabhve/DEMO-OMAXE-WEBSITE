import { IApiAdapter } from './repository';
import { mockApiAdapter } from './mock-adapter';

// Singleton API adapter instance.
// To switch to a real production backend (Supabase, Strapi, Custom REST),
// simply export the real adapter implementation here.
export const api: IApiAdapter = {
  ...mockApiAdapter,
  blog: mockApiAdapter.content.blog,
  awards: mockApiAdapter.content.awards,
  testimonials: mockApiAdapter.content.testimonials,
  leadership: mockApiAdapter.content.leadership,
  cities: mockApiAdapter.content.cities,
  investorDocs: mockApiAdapter.content.investorDocs,
  settings: {
    ...mockApiAdapter.settings,
    get: () => mockApiAdapter.settings.getSettings(),
    update: (s: any) => mockApiAdapter.settings.updateSettings(s),
  },
  audit: {
    list: (p?: any, f?: any) => mockApiAdapter.system.getAuditLogs(p, f),
    create: (l: any) => mockApiAdapter.system.logAudit(l),
  },
  redirects: {
    list: () => mockApiAdapter.system.getRedirects(),
    create: (r: any) => mockApiAdapter.system.saveRedirect(r),
    delete: (id: string) => mockApiAdapter.system.deleteRedirect(id),
  },
  users: {
    list: async () => ({
      data: await mockApiAdapter.system.getUsers(),
      total: 0,
      page: 1,
      pageSize: 50,
      totalPages: 1,
    }),
    create: (u: any) => mockApiAdapter.system.saveUser(u),
    update: (id: string, u: any) => mockApiAdapter.system.saveUser({ ...u, id }),
    delete: (id: string) => mockApiAdapter.system.deleteUser(id),
  },
};

export * from './schemas';
export * from './types';
export * from './repository';
