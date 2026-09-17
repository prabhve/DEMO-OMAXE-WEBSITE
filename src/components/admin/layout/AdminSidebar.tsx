import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Image as ImageIcon,
  FileCode2,
  BookOpen,
  Users,
  Briefcase,
  Award,
  MessageSquareQuote,
  ShieldCheck,
  BarChart3,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  UserCheck,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { useAuthStore } from '../../../lib/admin/auth-store';
import { AdminModule } from '../../../lib/api/types';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  module: AdminModule;
  badge?: string | number;
}

export const AdminSidebar: React.FC = () => {
  const isCollapsed = useAdminStore((s) => s.isSidebarCollapsed);
  const toggleSidebar = useAdminStore((s) => s.toggleSidebar);
  const hasPermission = useAuthStore((s) => s.hasPermission);
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" />, module: 'dashboard' },
    { label: 'Project Manager', path: '/admin/projects', icon: <Building2 className="w-4 h-4" />, module: 'projects', badge: '31' },
    { label: 'Media Library', path: '/admin/media', icon: <ImageIcon className="w-4 h-4" />, module: 'media' },
    { label: 'Page Builder / CMS', path: '/admin/pages', icon: <FileCode2 className="w-4 h-4" />, module: 'pages' },
    { label: 'Leads & CRM', path: '/admin/leads', icon: <Users className="w-4 h-4" />, module: 'leads', badge: 'New' },
    { label: 'Journal & Blog', path: '/admin/blog', icon: <BookOpen className="w-4 h-4" />, module: 'blog' },
    { label: 'Content Modules', path: '/admin/content', icon: <Award className="w-4 h-4" />, module: 'content' },
    { label: 'Analytics & Insights', path: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" />, module: 'analytics' },
    { label: 'Global Settings', path: '/admin/settings', icon: <Sliders className="w-4 h-4" />, module: 'settings' },
    { label: 'User Management', path: '/admin/users', icon: <UserCheck className="w-4 h-4" />, module: 'users' },
    { label: 'System & Auditing', path: '/admin/system', icon: <ShieldCheck className="w-4 h-4" />, module: 'audit' },
  ];

  // Filter by permission
  const allowedNav = navItems.filter((item) => hasPermission(item.module, 'view'));

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-30 flex flex-col bg-[#FFFFFF] dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-serif font-bold text-sm tracking-wider">
              O
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider uppercase text-neutral-900 dark:text-white">
                OMAXE ADMIN
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                Enterprise Suite
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-7 h-7 mx-auto rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-serif font-bold text-sm">
            O
          </div>
        )}

        <button
          type="button"
          onClick={toggleSidebar}
          className={`p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
            isCollapsed ? 'hidden' : 'block'
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {allowedNav.map((item) => {
          const isActive =
            item.path === '/admin'
              ? location.pathname === '/admin'
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <div className={isActive ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-500'}>
                {item.icon}
              </div>
              {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
              {!isCollapsed && item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom User / Quick Public Link */}
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-50/50 dark:bg-neutral-900/50">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
          {!isCollapsed && <span>View Live Site</span>}
        </a>

        {!isCollapsed && (
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-200 shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xs text-neutral-700">
                  {user?.name.charAt(0) || 'A'}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-neutral-400 truncate">{user?.role || 'Super Admin'}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
