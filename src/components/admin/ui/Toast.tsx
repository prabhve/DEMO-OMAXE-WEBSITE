import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, RotateCcw } from 'lucide-react';
import { useAdminStore } from '../../../lib/admin/admin-store';

export const ToastContainer: React.FC = () => {
  const toasts = useAdminStore((s) => s.toasts);
  const removeToast = useAdminStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="assertive"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((t) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
          info: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
        };

        return (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg shadow-xl border border-neutral-800 dark:border-neutral-200 animate-in slide-in-from-bottom-2 duration-150"
          >
            {icons[t.type || 'info']}
            <div className="flex-1 min-w-0 space-y-0.5">
              <p className="text-xs font-semibold">{t.title}</p>
              {t.description && (
                <p className="text-[11px] text-neutral-400 dark:text-neutral-600 leading-snug">
                  {t.description}
                </p>
              )}
            </div>

            {t.undoAction && (
              <button
                type="button"
                onClick={() => {
                  t.undoAction?.();
                  removeToast(t.id);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 dark:text-amber-700 hover:underline px-1 py-0.5"
              >
                <RotateCcw className="w-3 h-3" />
                Undo
              </button>
            )}

            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="p-1 rounded text-neutral-400 hover:text-white dark:hover:text-neutral-900 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
