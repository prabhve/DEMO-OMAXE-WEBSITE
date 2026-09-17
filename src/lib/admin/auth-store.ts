import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminUser, Role, AdminModule, AdminAction } from '../api/types';
import { SEED_USERS } from '../api/seed-data';

// Role permission matrix mapping
export const DEFAULT_ROLE_PERMISSIONS: Record<Role, Record<AdminModule, Record<AdminAction, boolean>>> = {
  'Super Admin': {
    dashboard: { view: true, create: true, edit: true, publish: true, delete: true },
    projects: { view: true, create: true, edit: true, publish: true, delete: true },
    media: { view: true, create: true, edit: true, publish: true, delete: true },
    pages: { view: true, create: true, edit: true, publish: true, delete: true },
    blog: { view: true, create: true, edit: true, publish: true, delete: true },
    leads: { view: true, create: true, edit: true, publish: true, delete: true },
    content: { view: true, create: true, edit: true, publish: true, delete: true },
    analytics: { view: true, create: true, edit: true, publish: true, delete: true },
    navigation: { view: true, create: true, edit: true, publish: true, delete: true },
    settings: { view: true, create: true, edit: true, publish: true, delete: true },
    users: { view: true, create: true, edit: true, publish: true, delete: true },
    audit: { view: true, create: true, edit: true, publish: true, delete: true },
    seo: { view: true, create: true, edit: true, publish: true, delete: true },
  },
  'Admin': {
    dashboard: { view: true, create: true, edit: true, publish: true, delete: true },
    projects: { view: true, create: true, edit: true, publish: true, delete: true },
    media: { view: true, create: true, edit: true, publish: true, delete: true },
    pages: { view: true, create: true, edit: true, publish: true, delete: true },
    blog: { view: true, create: true, edit: true, publish: true, delete: true },
    leads: { view: true, create: true, edit: true, publish: true, delete: true },
    content: { view: true, create: true, edit: true, publish: true, delete: true },
    analytics: { view: true, create: true, edit: true, publish: true, delete: true },
    navigation: { view: true, create: true, edit: true, publish: true, delete: false },
    settings: { view: true, create: false, edit: true, publish: false, delete: false },
    users: { view: false, create: false, edit: false, publish: false, delete: false },
    audit: { view: true, create: false, edit: false, publish: false, delete: false },
    seo: { view: true, create: true, edit: true, publish: true, delete: false },
  },
  'Content Editor': {
    dashboard: { view: true, create: false, edit: false, publish: false, delete: false },
    projects: { view: true, create: true, edit: true, publish: false, delete: false },
    media: { view: true, create: true, edit: true, publish: false, delete: false },
    pages: { view: true, create: true, edit: true, publish: false, delete: false },
    blog: { view: true, create: true, edit: true, publish: false, delete: false },
    leads: { view: false, create: false, edit: false, publish: false, delete: false },
    content: { view: true, create: true, edit: true, publish: false, delete: false },
    analytics: { view: false, create: false, edit: false, publish: false, delete: false },
    navigation: { view: false, create: false, edit: false, publish: false, delete: false },
    settings: { view: false, create: false, edit: false, publish: false, delete: false },
    users: { view: false, create: false, edit: false, publish: false, delete: false },
    audit: { view: false, create: false, edit: false, publish: false, delete: false },
    seo: { view: true, create: false, edit: true, publish: false, delete: false },
  },
  'Project Manager': {
    dashboard: { view: true, create: false, edit: false, publish: false, delete: false },
    projects: { view: true, create: true, edit: true, publish: true, delete: true },
    media: { view: true, create: true, edit: true, publish: true, delete: true },
    pages: { view: false, create: false, edit: false, publish: false, delete: false },
    blog: { view: false, create: false, edit: false, publish: false, delete: false },
    leads: { view: true, create: false, edit: false, publish: false, delete: false },
    content: { view: false, create: false, edit: false, publish: false, delete: false },
    analytics: { view: false, create: false, edit: false, publish: false, delete: false },
    navigation: { view: false, create: false, edit: false, publish: false, delete: false },
    settings: { view: false, create: false, edit: false, publish: false, delete: false },
    users: { view: false, create: false, edit: false, publish: false, delete: false },
    audit: { view: false, create: false, edit: false, publish: false, delete: false },
    seo: { view: true, create: false, edit: true, publish: false, delete: false },
  },
  'Sales Manager': {
    dashboard: { view: true, create: false, edit: false, publish: false, delete: false },
    projects: { view: true, create: false, edit: false, publish: false, delete: false },
    media: { view: false, create: false, edit: false, publish: false, delete: false },
    pages: { view: false, create: false, edit: false, publish: false, delete: false },
    blog: { view: false, create: false, edit: false, publish: false, delete: false },
    leads: { view: true, create: true, edit: true, publish: true, delete: true },
    content: { view: false, create: false, edit: false, publish: false, delete: false },
    analytics: { view: true, create: false, edit: false, publish: false, delete: false },
    navigation: { view: false, create: false, edit: false, publish: false, delete: false },
    settings: { view: false, create: false, edit: false, publish: false, delete: false },
    users: { view: false, create: false, edit: false, publish: false, delete: false },
    audit: { view: false, create: false, edit: false, publish: false, delete: false },
    seo: { view: false, create: false, edit: false, publish: false, delete: false },
  },
  'Analyst': {
    dashboard: { view: true, create: false, edit: false, publish: false, delete: false },
    projects: { view: true, create: false, edit: false, publish: false, delete: false },
    media: { view: false, create: false, edit: false, publish: false, delete: false },
    pages: { view: true, create: false, edit: false, publish: false, delete: false },
    blog: { view: true, create: false, edit: false, publish: false, delete: false },
    leads: { view: true, create: false, edit: false, publish: false, delete: false },
    content: { view: true, create: false, edit: false, publish: false, delete: false },
    analytics: { view: true, create: true, edit: true, publish: false, delete: false },
    navigation: { view: false, create: false, edit: false, publish: false, delete: false },
    settings: { view: false, create: false, edit: false, publish: false, delete: false },
    users: { view: false, create: false, edit: false, publish: false, delete: false },
    audit: { view: true, create: false, edit: false, publish: false, delete: false },
    seo: { view: true, create: false, edit: false, publish: false, delete: false },
  },
};

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  twoFactorPending: boolean;
  pendingEmail: string | null;
  sessionExpiresAt: number | null;
  rolePermissions: typeof DEFAULT_ROLE_PERMISSIONS;
  
  // Actions
  login: (email: string, password?: string) => Promise<{ requires2FA?: boolean; success: boolean }>;
  verify2FA: (code: string) => boolean;
  logout: () => void;
  refreshSession: () => void;
  switchDemoUser: (email: string) => void;
  updateRolePermissions: (matrix: typeof DEFAULT_ROLE_PERMISSIONS) => void;
  hasPermission: (module: AdminModule, action?: AdminAction) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: SEED_USERS[0], // Default logged in as Prabhdeep Singh (Super Admin) for seamless exploration
      token: 'mock-jwt-token-superadmin-2026',
      isAuthenticated: true,
      twoFactorPending: false,
      pendingEmail: null,
      sessionExpiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
      rolePermissions: DEFAULT_ROLE_PERMISSIONS,

      login: async (email: string) => {
        const found = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!found) {
          throw new Error('No admin user account found with this email.');
        }

        if (found.twoFactorEnabled) {
          set({ twoFactorPending: true, pendingEmail: email });
          return { requires2FA: true, success: false };
        }

        set({
          user: found,
          token: `mock-jwt-token-${found.id}-${Date.now()}`,
          isAuthenticated: true,
          twoFactorPending: false,
          pendingEmail: null,
          sessionExpiresAt: Date.now() + 60 * 60 * 1000,
        });
        return { requires2FA: false, success: true };
      },

      verify2FA: (code: string) => {
        const { pendingEmail } = get();
        if (!pendingEmail) return false;
        if (code === '123456' || code.length === 6) {
          const found = SEED_USERS.find((u) => u.email.toLowerCase() === pendingEmail.toLowerCase()) || SEED_USERS[0];
          set({
            user: found,
            token: `mock-jwt-token-${found.id}-${Date.now()}`,
            isAuthenticated: true,
            twoFactorPending: false,
            pendingEmail: null,
            sessionExpiresAt: Date.now() + 60 * 60 * 1000,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          twoFactorPending: false,
          pendingEmail: null,
          sessionExpiresAt: null,
        });
      },

      refreshSession: () => {
        set({ sessionExpiresAt: Date.now() + 60 * 60 * 1000 });
      },

      switchDemoUser: (email: string) => {
        const found = SEED_USERS.find((u) => u.email === email);
        if (found) {
          set({
            user: found,
            token: `mock-jwt-token-${found.id}-${Date.now()}`,
            isAuthenticated: true,
            twoFactorPending: false,
            sessionExpiresAt: Date.now() + 60 * 60 * 1000,
          });
        }
      },

      updateRolePermissions: (matrix) => {
        set({ rolePermissions: matrix });
      },

      hasPermission: (module: AdminModule, action: AdminAction = 'view') => {
        const { user, rolePermissions } = get();
        if (!user) return false;
        if (user.role === 'Super Admin') return true;
        const perms = rolePermissions[user.role];
        if (!perms || !perms[module]) return false;
        return perms[module][action] ?? false;
      },
    }),
    {
      name: 'omaxe_admin_auth_store',
    }
  )
);
