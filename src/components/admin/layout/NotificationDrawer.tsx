import React, { useEffect, useState } from 'react';
import { Bell, Check, CheckCheck, ExternalLink, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react';
import { Drawer } from '../ui/Modal';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { api } from '../../../lib/api';
import { NotificationItem } from '../../../lib/api/types';

export const NotificationDrawer: React.FC = () => {
  const isOpen = useAdminStore((s) => s.isNotificationDrawerOpen);
  const setOpen = useAdminStore((s) => s.setNotificationDrawerOpen);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const loadNotifications = async () => {
    const list = await api.system.getNotifications();
    setNotifications(list);
  };

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const handleMarkAll = async () => {
    await api.system.markAllNotificationsRead();
    loadNotifications();
  };

  const handleMarkOne = async (id: string) => {
    await api.system.markNotificationRead(id);
    loadNotifications();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      title="Notification Centre"
      description="Live updates on leads, editorial review requests, and system alerts."
      width="md"
      footer={
        <button
          type="button"
          onClick={handleMarkAll}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 rounded"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Mark all as read
        </button>
      }
    >
      <div className="space-y-2.5">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-400">
            No active notifications.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-lg border text-xs transition-colors ${
                n.isRead
                  ? 'bg-neutral-50/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  : 'bg-white dark:bg-neutral-800 border-amber-200 dark:border-amber-900/50 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />}
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {n.title}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-snug">
                    {n.message}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(n.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {!n.isRead && (
                  <button
                    type="button"
                    onClick={() => handleMarkOne(n.id)}
                    title="Mark as read"
                    className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Drawer>
  );
};
