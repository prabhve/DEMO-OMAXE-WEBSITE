import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  Plus,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Check,
  Send,
  UserCheck,
  Tag,
  Flame,
  LayoutGrid,
  List as ListIcon,
  X,
  FileText,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { LeadEntity, AdminUser } from '../../../lib/api/types';
import { useAuthStore } from '../../../lib/admin/auth-store';
import { useAdminStore } from '../../../lib/admin/admin-store';
import {
  DataTable,
  Column,
  Pagination,
} from '../../../components/admin/ui/DataTable';
import {
  Badge,
  Button,
  Input,
  Select,
  Modal,
  Tabs,
  Skeleton,
} from '../../../components/admin/ui/BasicPrimitives';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  New: {
    label: 'New',
    color: 'text-blue-700 dark:text-blue-200',
    bg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
  },
  Contacted: {
    label: 'Contacted',
    color: 'text-amber-700 dark:text-amber-200',
    bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-500',
  },
  'Site Visit Scheduled': {
    label: 'Site Visit',
    color: 'text-purple-700 dark:text-purple-200',
    bg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
    dot: 'bg-purple-500',
  },
  Negotiation: {
    label: 'Negotiation',
    color: 'text-indigo-700 dark:text-indigo-200',
    bg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
    dot: 'bg-indigo-500',
  },
  'Closed - Won': {
    label: 'Closed - Won',
    color: 'text-emerald-700 dark:text-emerald-200',
    bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
  },
  Lost: {
    label: 'Lost',
    color: 'text-neutral-700 dark:text-neutral-300',
    bg: 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700',
    dot: 'bg-neutral-400',
  },
};

interface LeadStatusDropdownProps {
  leadId: string;
  currentStatus: string;
  onStatusChange: (leadId: string, newStatus: string) => void;
}

const LeadStatusDropdown: React.FC<LeadStatusDropdownProps> = ({
  leadId,
  currentStatus,
  onStatusChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const conf = STATUS_CONFIG[currentStatus] || {
    label: currentStatus,
    color: 'text-neutral-700 dark:text-neutral-300',
    bg: 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700',
    dot: 'bg-neutral-400',
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className={`inline-flex items-center justify-between gap-1.5 px-2.5 py-1 text-xs font-semibold rounded border transition-all cursor-pointer shadow-sm ${conf.color} ${conf.bg} hover:brightness-95 dark:hover:brightness-110 min-w-[140px]`}
      >
        <span className="flex items-center gap-1.5 truncate">
          <span className={`w-2 h-2 rounded-full shrink-0 ${conf.dot}`} />
          <span className="truncate">{currentStatus}</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 opacity-70 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1.5 w-56 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800">
            Pipeline Stage
          </div>
          <div className="py-1">
            {Object.entries(STATUS_CONFIG).map(([st, c]) => {
              const isSelected = st === currentStatus;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    onStatusChange(leadId, st);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                      : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/70'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                    <span className="truncate">{st}</span>
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};


const PRIORITY_BADGES: Record<string, { label: string; badgeVariant: 'danger' | 'warning' | 'neutral' | 'success' }> = {
  Urgent: { label: 'Urgent', badgeVariant: 'danger' },
  High: { label: 'High', badgeVariant: 'warning' },
  Medium: { label: 'Medium', badgeVariant: 'neutral' },
  Low: { label: 'Low', badgeVariant: 'neutral' },
};

export const AdminLeadsListPage: React.FC = () => {
  const [leads, setLeads] = useState<LeadEntity[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<LeadEntity | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // Assignees & Users
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const addToast = useAdminStore((s) => s.addToast);
  const currentUser = useAuthStore((s) => s.user);
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const filters: any = {};
      if (statusFilter !== 'all') filters.status = statusFilter;
      if (priorityFilter !== 'all') filters.priority = priorityFilter;
      if (sourceFilter !== 'all') filters.source = sourceFilter;
      if (searchQuery) filters.search = searchQuery;

      const res = await api.leads.list({
        page,
        limit: pageSize,
        filter: filters,
        sort: { field: 'createdAt', direction: 'desc' },
      });

      setLeads(res.data);
      setTotalCount(res.total);
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', description: 'Failed to load leads', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, statusFilter, priorityFilter, sourceFilter, searchQuery]);

  useEffect(() => {
    api.users.list().then((res) => setUsers(res.data || [])).catch(() => {});
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: any) => {
    try {
      const updated = await api.leads.updateStatus(leadId, newStatus);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
      if (selectedLead?.id === leadId) setSelectedLead(updated);
      addToast({ title: 'Status Updated', description: `Lead marked as ${newStatus}`, type: 'success' });
    } catch {
      addToast({ title: 'Update Failed', description: 'Could not change lead status', type: 'error' });
    }
  };

  const handleAssignUser = async (leadId: string, userId: string) => {
    try {
      const assigned = users.find((u) => u.id === userId);
      const updated = await api.leads.assignTo(leadId, userId, assigned?.email);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
      if (selectedLead?.id === leadId) setSelectedLead(updated);
      addToast({ title: 'Lead Assigned', description: `Assigned to ${assigned?.name || userId}`, type: 'success' });
    } catch {
      addToast({ title: 'Assignment Failed', description: 'Could not assign lead', type: 'error' });
    }
  };

  const handleAddNote = async () => {
    if (!selectedLead || !newNote.trim()) return;
    setIsSubmittingNote(true);
    try {
      const author = currentUser?.name || 'Admin User';
      const updated = await api.leads.addNote(selectedLead.id, newNote.trim(), author);
      setSelectedLead(updated);
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      setNewNote('');
      addToast({ title: 'Note Saved', description: 'Internal team note added to timeline', type: 'success' });
    } catch {
      addToast({ title: 'Error', description: 'Could not add note', type: 'error' });
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Phone', 'Email', 'City', 'Project', 'Status', 'Priority', 'Source', 'Score', 'Created At'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.city || ''}"`,
      `"${l.projectInterest || ''}"`,
      l.status,
      l.priority,
      l.source,
      l.leadScore,
      l.createdAt,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `omaxe-leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    addToast({ title: 'Export Complete', description: `${leads.length} leads exported to CSV`, type: 'success' });
  };

  const columns: Column<LeadEntity>[] = [
    {
      id: 'name',
      header: 'Prospect Dossier',
      cell: (lead) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 hover:text-amber-600 transition-colors cursor-pointer" onClick={() => { setSelectedLead(lead); setIsDetailOpen(true); }}>
              {lead.name}
            </span>
            {lead.leadScore >= 80 && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                <Flame className="w-2.5 h-2.5 fill-current" /> Hot {lead.leadScore}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-neutral-800 dark:hover:text-neutral-200">
              <Phone className="w-3 h-3 text-neutral-400" /> {lead.phone}
            </a>
            <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-neutral-800 dark:hover:text-neutral-200">
              <Mail className="w-3 h-3 text-neutral-400" /> {lead.email}
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 'project',
      header: 'Project & Preference',
      cell: (lead) => (
        <div className="flex flex-col text-xs">
          <span className="font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-neutral-400" />
            {lead.projectInterest || 'General Portfolio Enquiry'}
          </span>
          <span className="text-neutral-500 mt-0.5">
            {lead.city || 'Pan-India'} • {lead.preferredConfiguration || 'Any Unit'} • {lead.budgetRange || 'Flexible'}
          </span>
        </div>
      ),
    },
    {
      id: 'source',
      header: 'Source & Channel',
      cell: (lead) => (
        <div className="flex flex-col text-xs">
          <span className="inline-block font-medium text-neutral-700 dark:text-neutral-300">
            {lead.source}
          </span>
          {lead.utmCampaign && (
            <span className="text-[11px] text-neutral-400 font-mono">
              cmp: {lead.utmCampaign}
            </span>
          )}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (lead) => (
        <LeadStatusDropdown
          leadId={lead.id}
          currentStatus={lead.status}
          onStatusChange={handleStatusChange}
        />
      ),
    },
    {
      id: 'priority',
      header: 'Priority',
      cell: (lead) => {
        const p = PRIORITY_BADGES[lead.priority] || { label: lead.priority, badgeVariant: 'neutral' };
        return <Badge variant={p.badgeVariant}>{p.label}</Badge>;
      },
    },
    {
      id: 'assigned',
      header: 'Assigned Partner',
      cell: (lead) => (
        <select
          value={lead.assignedToUser || ''}
          onChange={(e) => handleAssignUser(lead.id, e.target.value)}
          className="text-xs text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2.5 py-1 focus:border-amber-600 outline-none max-w-[145px] truncate cursor-pointer shadow-sm"
        >
          <option value="" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            Unassigned
          </option>
          {users.map((u) => (
            <option
              key={u.id}
              value={u.id}
              className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            >
              {u.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: (lead) => (
        <div className="flex items-center gap-1 justify-end">
          <a
            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20thank%20you%20for%20your%20interest%20in%20Omaxe%20Properties.`}
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp"
            className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => { setSelectedLead(lead); setIsDetailOpen(true); }}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
            title="Open Dossier"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" /> Leads & CRM Directory
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Omnichannel luxury enquiry management, automatic SLA routing, and investor relationship activity tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded flex items-center gap-1 font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500'
              }`}
            >
              <ListIcon className="w-3.5 h-3.5" /> Table
            </button>
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded flex items-center gap-1 font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Pipeline
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={handleExportCsv} className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-md border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by prospect name, phone, email, project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAFAFA] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none text-neutral-900 dark:text-neutral-100"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-3 py-2 text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-600 cursor-pointer shadow-sm"
          >
            <option value="all" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">All Stages</option>
            {Object.keys(STATUS_CONFIG).map((st) => (
              <option key={st} value={st} className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">{st}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
            className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-3 py-2 text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-600 cursor-pointer shadow-sm"
          >
            <option value="all" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">All Priorities</option>
            <option value="Urgent" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Urgent</option>
            <option value="High" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">High</option>
            <option value="Medium" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Medium</option>
            <option value="Low" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Low</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
            className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-3 py-2 text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-600 cursor-pointer shadow-sm"
          >
            <option value="all" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">All Channels</option>
            <option value="Website Form" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Website Form</option>
            <option value="WhatsApp" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">WhatsApp</option>
            <option value="Brochure Download" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Brochure Download</option>
            <option value="Google Ads" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Google Ads</option>
            <option value="Meta Ads" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Meta Ads</option>
            <option value="Channel Partner" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Channel Partner</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'table' ? (
        <div className="space-y-4">
          <DataTable
            data={leads}
            columns={columns}
            keyField="id"
            isLoading={isLoading}
            selectable
            selectedIds={selectedIds}
            onSelectRow={(id) => setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))}
            onSelectAll={(allSelected) => setSelectedIds(allSelected ? leads.map((l) => l.id) : [])}
            emptyMessage="No leads found matching your search and filter criteria."
          />

          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / pageSize) || 1}
            totalItems={totalCount}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      ) : (
        /* Kanban Pipeline View */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {Object.keys(STATUS_CONFIG).map((stage) => {
            const stageLeads = leads.filter((l) => l.status === stage);
            const conf = STATUS_CONFIG[stage];
            return (
              <div
                key={stage}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md p-3 min-w-[260px] flex flex-col h-[680px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800 mb-3">
                  <span className={`text-xs font-semibold ${conf.color}`}>
                    {stage}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-bold">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => { setSelectedLead(lead); setIsDetailOpen(true); }}
                      className="p-3 bg-[#FAFAFA] dark:bg-neutral-800/60 rounded border border-neutral-200/80 dark:border-neutral-700/80 hover:border-amber-500/80 cursor-pointer transition-all shadow-2xs hover:shadow-xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 line-clamp-1">
                          {lead.name}
                        </span>
                        {lead.leadScore >= 80 && (
                          <span className="text-[9px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-1 py-0.5 rounded">
                            {lead.leadScore}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-neutral-500 line-clamp-1">
                        {lead.projectInterest || 'General Enquiry'}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-400 border-t border-neutral-200/40 dark:border-neutral-700/40">
                        <span>{lead.city || 'Pan-India'}</span>
                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="h-24 flex items-center justify-center text-xs text-neutral-400 italic">
                      No leads in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Slide-over Dossier Modal for Selected Lead */}
      {selectedLead && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Prospect Dossier: ${selectedLead.name}`}
          size="xl"
        >
          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            {/* Top Stat Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400">Current Stage</span>
                <div className="mt-1">
                  <LeadStatusDropdown
                    leadId={selectedLead.id}
                    currentStatus={selectedLead.status}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400">Priority Level</span>
                <div className="mt-1">
                  <Badge variant={PRIORITY_BADGES[selectedLead.priority]?.badgeVariant || 'neutral'}>
                    {selectedLead.priority}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400">Lead Score</span>
                <div className="mt-1 text-sm font-bold text-amber-600 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> {selectedLead.leadScore}/100
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400">Assigned Partner</span>
                <div className="mt-1">
                  <select
                    value={selectedLead.assignedToUser || ''}
                    onChange={(e) => handleAssignUser(selectedLead.id, e.target.value)}
                    className="text-xs text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2.5 py-1.5 w-full truncate cursor-pointer focus:border-amber-600 outline-none shadow-sm"
                  >
                    <option value="" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Unassigned</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id} className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">{u.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact & Preference Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Contact Channels</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Phone:</span>
                    <a href={`tel:${selectedLead.phone}`} className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1 hover:underline">
                      <Phone className="w-3 h-3 text-neutral-400" /> {selectedLead.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Email:</span>
                    <a href={`mailto:${selectedLead.email}`} className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1 hover:underline">
                      <Mail className="w-3 h-3 text-neutral-400" /> {selectedLead.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Location:</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{selectedLead.city || 'Delhi NCR'}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedLead.name)},%20this%20is%20Omaxe%20Luxury%20Developments.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Message
                  </a>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="py-1.5 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Direct Call
                  </a>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Property Requirements</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Target Project:</span>
                    <span className="font-semibold text-amber-600">{selectedLead.projectInterest || 'Portfolio Consultation'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Configuration:</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{selectedLead.preferredConfiguration || '3 / 4 BHK Luxury'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Estimated Budget:</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{selectedLead.budgetRange || '₹2 Cr - ₹5 Cr'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Source / Campaign:</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{selectedLead.source} ({selectedLead.utmCampaign || 'Organic'})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note Composer & Internal Timeline */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>Internal Notes & History Timeline</span>
                <span className="text-[11px] font-normal text-neutral-500">
                  {selectedLead.notes?.length || 0} notes logged
                </span>
              </h4>

              {/* Note input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type an internal note regarding phone call, site visit feedback..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddNote(); }}
                  className="flex-1 px-3 py-2 text-xs bg-[#FAFAFA] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none text-neutral-900 dark:text-neutral-100"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddNote}
                  isLoading={isSubmittingNote}
                  className="flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> Add Note
                </Button>
              </div>

              {/* Timeline List */}
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
                {selectedLead.notes && selectedLead.notes.length > 0 ? (
                  selectedLead.notes.map((n) => (
                    <div key={n.id} className="p-3 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 rounded text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">{n.authorName}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-neutral-800 dark:text-neutral-200">{n.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-400 italic py-2">No internal notes logged yet.</p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
