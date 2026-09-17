import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { CommandPalette } from './CommandPalette';
import { NotificationDrawer } from './NotificationDrawer';
import { SessionTimeoutModal } from './SessionTimeoutModal';
import { ToastContainer } from '../ui/Toast';
import { AuthGuard } from '../../../lib/admin/permission-guard';
import { useAdminStore } from '../../../lib/admin/admin-store';

export const AdminLayout: React.FC = () => {
  const isSidebarCollapsed = useAdminStore((s) => s.isSidebarCollapsed);
  const hasUnsavedChanges = useAdminStore((s) => s.hasUnsavedChanges);
  const unsavedWarningMessage = useAdminStore((s) => s.unsavedWarningMessage);
  const theme = useAdminStore((s) => s.theme);
  const location = useLocation();

  // Apply dark mode class on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Window beforeunload check for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = unsavedWarningMessage;
        return unsavedWarningMessage;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, unsavedWarningMessage]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased">
        {/* Fixed Navigation Sidebar */}
        <AdminSidebar />

        {/* Top Header */}
        <AdminTopBar />

        {/* Main Content Viewport */}
        <main
          className={`pt-14 min-h-screen transition-all duration-200 ${
            isSidebarCollapsed ? 'pl-16' : 'pl-64'
          }`}
        >
          {/* Responsive Warning for Small Screens */}
          <div className="lg:hidden p-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 text-center font-medium">
            Note: The Admin Control Suite is optimized for desktop displays (1024px+). Some dense table and studio controls may require scrolling.
          </div>

          {location.pathname.startsWith('/admin/pages/') && location.pathname !== '/admin/pages' ? (
            <Outlet />
          ) : (
            <div className="p-6 max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          )}
        </main>

        {/* Overlays & Utilities */}
        <CommandPalette />
        <NotificationDrawer />
        <SessionTimeoutModal />
        <ToastContainer />
      </div>
    </AuthGuard>
  );
};
