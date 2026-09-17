import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  durationMs?: number;
  undoAction?: () => void;
}

interface AdminUIState {
  isSidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  isCommandPaletteOpen: boolean;
  isNotificationDrawerOpen: boolean;
  hasUnsavedChanges: boolean;
  unsavedWarningMessage: string;
  toasts: ToastItem[];
  
  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setNotificationDrawerOpen: (open: boolean) => void;
  setHasUnsavedChanges: (hasChanges: boolean, message?: string) => void;
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useAdminStore = create<AdminUIState>()(
  persist(
    (set, get) => ({
      isSidebarCollapsed: false,
      theme: 'light',
      isCommandPaletteOpen: false,
      isNotificationDrawerOpen: false,
      hasUnsavedChanges: false,
      unsavedWarningMessage: 'You have unsaved changes. Are you sure you want to discard them?',
      toasts: [],

      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
      
      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: nextTheme });
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
      setNotificationDrawerOpen: (open) => set({ isNotificationDrawerOpen: open }),
      
      setHasUnsavedChanges: (hasChanges, message) =>
        set({
          hasUnsavedChanges: hasChanges,
          unsavedWarningMessage: message || 'You have unsaved modifications on this entity.',
        }),

      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newToast: ToastItem = { ...toast, id, durationMs: toast.durationMs || 4000 };
        set((state) => ({ toasts: [newToast, ...state.toasts] }));

        if (newToast.durationMs && newToast.durationMs > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.durationMs);
        }
      },

      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'omaxe_admin_ui_store',
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
);
