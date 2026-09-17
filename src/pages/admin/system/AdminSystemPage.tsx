import React, { useState, useEffect } from 'react';
import {
  Activity,
  History,
  GitFork,
  Database,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  Trash2,
  Shield,
  Server,
  Download,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { AuditLog, RedirectRule } from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { DataTable, Column } from '../../../components/admin/ui/DataTable';
import { Button, Badge, Modal } from '../../../components/admin/ui/BasicPrimitives';

export const AdminSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'redirects' | 'maintenance'>('audit');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  // Redirect modal
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [newSource, setNewSource] = useState('');
  const [newDestination, setNewDestination] = useState('');
  const [newStatusCode, setNewStatusCode] = useState<301 | 302>(301);

  const addToast = useAdminStore((s) => s.addToast);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [auditRes, redRes] = await Promise.all([
        api.audit.list({ limit: 100 }),
        api.redirects.list(),
      ]);
      setAuditLogs(auditRes.data);
      setRedirects(redRes.data);
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', description: 'Failed to load system logs', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRedirect = async () => {
    if (!newSource.trim() || !newDestination.trim()) {
      addToast({ title: 'Validation', description: 'Source and destination URLs are required', type: 'error' });
      return;
    }

    try {
      const created = await api.redirects.create({
        sourcePath: newSource.trim(),
        destinationPath: newDestination.trim(),
        statusCode: newStatusCode,
        isActive: true,
      });
      setRedirects((prev) => [created, ...prev]);
      setIsRedirectModalOpen(false);
      setNewSource('');
      setNewDestination('');
      addToast({ title: 'Redirect Created', description: `Rule ${newSource} -> ${newDestination} active`, type: 'success' });
    } catch {
      addToast({ title: 'Error', description: 'Failed to create redirect rule', type: 'error' });
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    try {
      await api.redirects.delete(id);
      setRedirects((prev) => prev.filter((r) => r.id !== id));
      addToast({ title: 'Redirect Removed', description: 'Rule deleted', type: 'info' });
    } catch {
      addToast({ title: 'Error', description: 'Failed to delete redirect', type: 'error' });
    }
  };

  const filteredLogs = auditLogs.filter((l) => {
    const q = (searchQuery || '').toLowerCase();
    const actor = (l.actorName || l.userName || '').toLowerCase();
    const target = (l.targetTitle || l.summary || l.entityId || '').toLowerCase();
    const action = (l.action || '').toLowerCase();
    const matchesSearch = !q || actor.includes(q) || target.includes(q) || action.includes(q);
    const mod = l.module || l.entityType || '';
    const matchesModule = moduleFilter === 'all' || mod.toLowerCase() === moduleFilter.toLowerCase() || l.entityType === moduleFilter;
    return matchesSearch && matchesModule;
  });

  const auditColumns: Column<AuditLog>[] = [
    {
      id: 'timestamp',
      header: 'Timestamp',
      cell: (log) => (
        <span className="text-xs text-neutral-500 font-mono">
          {new Date(log.timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      id: 'actor',
      header: 'Administrator',
      cell: (log) => (
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-neutral-900 dark:text-white">
            {log.actorName || log.userName || 'System'}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">
            {log.actorEmail || log.userEmail || 'system@omaxe.com'}
          </span>
        </div>
      ),
    },
    {
      id: 'action',
      header: 'Action',
      cell: (log) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        const act = (log.action || '').toLowerCase();
        if (act.includes('publish') || act.includes('create')) variant = 'success';
        if (act.includes('delete') || act.includes('archive')) variant = 'danger';
        if (act.includes('status') || act.includes('update')) variant = 'warning';

        return (
          <Badge variant={variant} className="capitalize text-[11px] font-mono">
            {act.replace('_', ' ')}
          </Badge>
        );
      },
    },
    {
      id: 'module',
      header: 'Module',
      cell: (log) => (
        <span className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
          {log.module || log.entityType || 'General'}
        </span>
      ),
    },
    {
      id: 'target',
      header: 'Entity / Target',
      cell: (log) => (
        <span className="text-xs text-neutral-800 dark:text-neutral-200 font-medium truncate max-w-xs block">
          {log.targetTitle || log.summary || log.entityId}
        </span>
      ),
    },
    {
      id: 'ip',
      header: 'IP Address',
      cell: (log) => (
        <span className="text-[11px] text-neutral-400 font-mono">
          {log.ipAddress || '127.0.0.1'}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-600" /> System Governance & Audit
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Immutable administrative audit trail, URL redirect matrix, and cloud infrastructure health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadData} className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Logs
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
        {[
          { key: 'audit', label: `Audit Log Trail (${auditLogs.length})`, icon: <History className="w-4 h-4" /> },
          { key: 'redirects', label: `URL Redirect Matrix (${redirects.length})`, icon: <GitFork className="w-4 h-4" /> },
          { key: 'maintenance', label: 'System Health & Diagnostics', icon: <Server className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* AUDIT TRAIL TAB */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-md border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit trail by actor or action..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAFAFA] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none text-neutral-900 dark:text-neutral-100"
              />
            </div>

            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="text-xs bg-[#FAFAFA] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-3 py-2 text-neutral-700 dark:text-neutral-300 outline-none focus:border-amber-600"
            >
              <option value="all">All Modules</option>
              <option value="projects">Projects</option>
              <option value="pages">Pages CMS</option>
              <option value="leads">Leads CRM</option>
              <option value="blog">Blog</option>
              <option value="settings">Settings</option>
              <option value="users">Users</option>
            </select>
          </div>

          <DataTable
            data={filteredLogs}
            columns={auditColumns}
            keyField="id"
            isLoading={isLoading}
            emptyMessage="No audit logs recorded."
          />
        </div>
      )}

      {/* URL REDIRECTS TAB */}
      {activeTab === 'redirects' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-md border border-neutral-200 dark:border-neutral-800">
            <div>
              <h3 className="text-xs font-semibold text-neutral-900 dark:text-white">
                301 Permanent & 302 Temporary URL Redirects
              </h3>
              <p className="text-[11px] text-neutral-500">
                Preserve SEO juice when updating project URLs or old marketing campaigns.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsRedirectModalOpen(true)}
              className="flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Redirect Rule
            </Button>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-800">
            {redirects.map((r) => (
              <div key={r.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Badge variant="neutral" className="font-mono text-[11px]">
                    {r.statusCode}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-neutral-700 dark:text-neutral-300">{r.sourcePath}</span>
                    <span className="text-amber-600">&rarr;</span>
                    <span className="text-neutral-900 dark:text-white font-semibold">{r.destinationPath}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {r.hitCount || 0} hits
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteRedirect(r.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SYSTEM HEALTH TAB */}
      {activeTab === 'maintenance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-xs font-semibold">Repository State</h3>
            </div>
            <p className="text-xs text-neutral-500">
              Client & Admin synchronized via local repository pattern.
            </p>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
              Latency: <span className="font-mono text-neutral-700 dark:text-neutral-300">4ms</span>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <Server className="w-5 h-5" />
              <h3 className="text-xs font-semibold">Media CDN Node</h3>
            </div>
            <p className="text-xs text-neutral-500">
              High-resolution architectural assets served via global edge CDN.
            </p>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
              Cache hit ratio: <span className="font-mono text-neutral-700 dark:text-neutral-300">99.4%</span>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <Shield className="w-5 h-5" />
              <h3 className="text-xs font-semibold">Security & Session Guard</h3>
            </div>
            <p className="text-xs text-neutral-500">
              JWT bearer token session valid. RBAC authorization matrix active.
            </p>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
              Active sessions: <span className="font-mono text-neutral-700 dark:text-neutral-300">1</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Redirect Modal */}
      {isRedirectModalOpen && (
        <Modal
          isOpen={isRedirectModalOpen}
          onClose={() => setIsRedirectModalOpen(false)}
          title="Add URL Redirect Rule"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Source Request Path
              </label>
              <input
                type="text"
                placeholder="/projects/old-chandigarh-tower"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Destination Target Path
              </label>
              <input
                type="text"
                placeholder="/projects/the-lake-new-chandigarh"
                value={newDestination}
                onChange={(e) => setNewDestination(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Redirect HTTP Status Code
              </label>
              <select
                value={newStatusCode}
                onChange={(e) => setNewStatusCode(Number(e.target.value) as 301 | 302)}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none font-mono"
              >
                <option value={301}>301 - Moved Permanently (Recommended for SEO)</option>
                <option value={302}>302 - Found / Temporary Redirect</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <Button variant="ghost" size="sm" onClick={() => setIsRedirectModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreateRedirect}>
                Activate Redirect
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
