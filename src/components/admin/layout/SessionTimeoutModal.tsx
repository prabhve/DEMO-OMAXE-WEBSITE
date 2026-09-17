import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useAuthStore } from '../../../lib/admin/auth-store';

export const SessionTimeoutModal: React.FC = () => {
  const sessionExpiresAt = useAuthStore((s) => s.sessionExpiresAt);
  const refreshSession = useAuthStore((s) => s.refreshSession);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !sessionExpiresAt) return;

    const checkInterval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((sessionExpiresAt - now) / 1000);

      if (diff <= 0) {
        logout();
        setSecondsRemaining(null);
      } else if (diff <= 120) {
        // Less than 2 minutes remaining
        setSecondsRemaining(diff);
      } else {
        setSecondsRemaining(null);
      }
    }, 1000);

    return () => clearInterval(checkInterval);
  }, [isAuthenticated, sessionExpiresAt, logout]);

  if (secondsRemaining === null || secondsRemaining <= 0) return null;

  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      title="Session Expiring Soon"
      maxWidth="sm"
      footer={
        <>
          <button
            type="button"
            onClick={logout}
            className="px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
          >
            Log Out Now
          </button>
          <button
            type="button"
            onClick={() => {
              refreshSession();
              setSecondsRemaining(null);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Stay Logged In
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 shrink-0">
          <Clock className="w-5 h-5 animate-spin" />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-neutral-700 dark:text-neutral-300">
            For your security, your session will automatically end in{' '}
            <strong className="text-rose-600 font-mono text-sm">
              {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}
            </strong>
            .
          </p>
          <p className="text-[11px] text-neutral-500">
            Click "Stay Logged In" to extend your active administrator credentials.
          </p>
        </div>
      </div>
    </Modal>
  );
};
