import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuthStore } from './auth-store';
import { AdminModule, AdminAction } from '../api/types';

interface PermissionGuardProps {
  module: AdminModule;
  action?: AdminAction;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  module,
  action = 'view',
  children,
  fallback,
}) => {
  const hasPermission = useAuthStore((s) => s.hasPermission(module, action as any));
  const user = useAuthStore((s) => s.user);

  if (!hasPermission) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md">
        <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Access Restricted
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-md">
          Your assigned role (<strong>{user?.role || 'Guest'}</strong>) does not have sufficient permissions to <strong>{action}</strong> the <strong>{module}</strong> module.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Go Back
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
