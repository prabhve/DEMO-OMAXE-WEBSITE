import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  UserCheck,
  Shield,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { useAuthStore } from '../../../lib/admin/auth-store';
import { SEED_USERS } from '../../../lib/api/seed-data';

export const AdminTopBar: React.FC = () => {
  const isSidebarCollapsed = useAdminStore((s) => s.isSidebarCollapsed);
  const theme = useAdminStore((s) => s.theme);
  const toggleTheme = useAdminStore((s) => s.toggleTheme);
  const setCommandPaletteOpen = useAdminStore((s) => s.setCommandPaletteOpen);
  const setNotificationDrawerOpen = useAdminStore((s) => s.setNotificationDrawerOpen);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const switchDemoUser = useAuthStore((s) => s.switchDemoUser);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Generate breadcrumb from path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, idx) => {
    const url = `/${pathSegments.slice(0, idx + 1).join('/')}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { name, url };
  });

  return (
    <header
      className={`h-14 fixed top-0 right-0 z-20 flex items-center justify-between px-6 bg-[#FFFFFF] dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-all duration-200 ${
        isSidebarCollapsed ? 'left-16' : 'left-64'
      }`}
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs">
        <Link
          to="/admin"
          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium"
        >
          Admin
        </Link>
        {breadcrumbs.slice(1).map((crumb, idx) => (
          <React.Fragment key={crumb.url}>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            {idx === breadcrumbs.length - 2 ? (
              <span className="text-neutral-900 dark:text-neutral-100 font-semibold">
                {crumb.name}
              </span>
            ) : (
              <Link
                to={crumb.url}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              >
                {crumb.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Global Search & Action Group */}
      <div className="flex items-center gap-3">
        {/* Command Palette Trigger */}
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-400 bg-neutral-100/70 dark:bg-neutral-800/70 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md transition-colors w-60 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span>Search admin or hit</span>
          </div>
          <kbd className="text-[10px] font-mono bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-600">
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
          className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={() => setNotificationDrawerOpen(true)}
          className="relative p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-600 rounded-full ring-2 ring-white dark:ring-neutral-900" />
        </button>

        <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800" />

        {/* User Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-semibold text-xs text-neutral-700 dark:text-neutral-300">
                  {user?.name.charAt(0) || 'A'}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 hidden md:inline-block">
              {user?.name.split(' ')[0]}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl z-40 space-y-1 text-xs">
              <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-700">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{user?.name}</p>
                <p className="text-[11px] text-neutral-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                  {user?.role}
                </span>
              </div>

              {/* Role Impersonation Switcher for testing */}
              <div className="px-3 py-1.5 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                Switch Demo Role
              </div>
              {SEED_USERS.map((u) => (
                <button
                  key={u.email}
                  type="button"
                  onClick={() => {
                    switchDemoUser(u.email);
                    setShowUserMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-left transition-colors ${
                    user?.email === u.email
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span className="truncate">{u.name}</span>
                  <span className="text-[10px] text-neutral-400">{u.role.split(' ')[0]}</span>
                </button>
              ))}

              <div className="pt-1 border-t border-neutral-100 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/admin/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
