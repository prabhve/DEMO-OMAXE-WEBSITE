import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Download,
  Copy,
  Trash2,
  Edit,
  Eye,
  Building2,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  Archive,
  Star,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { ProjectEntity } from '../../../lib/api/types';
import { DataTable, ColumnDef } from '../../../components/admin/ui/DataTable';
import { Badge, Tabs } from '../../../components/admin/ui/BasicPrimitives';
import { ConfirmDialog } from '../../../components/admin/ui/ConfirmDialog';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { useAuthStore } from '../../../lib/admin/auth-store';

export const AdminProjectsListPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // Modals state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');

  const addToast = useAdminStore((s) => s.addToast);
  const hasPermission = useAuthStore((s) => s.hasPermission);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await api.projects.list({
        search: search || undefined,
        city: cityFilter !== 'ALL' ? cityFilter : undefined,
        propertyType: typeFilter !== 'ALL' ? typeFilter : undefined,
        status: activeTab !== 'ALL' ? activeTab : undefined,
        page,
        limit: pageSize,
      });
      setProjects(res.data);
      setTotal(res.total);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search, cityFilter, typeFilter, activeTab, page, pageSize]);

  const handleDuplicate = async (id: string, name: string) => {
    try {
      const duplicated = await api.projects.duplicate(id);
      addToast({
        title: 'Project Duplicated',
        description: `Created clone "${duplicated.name}"`,
        type: 'success',
      });
      fetchProjects();
    } catch (err: any) {
      addToast({ title: 'Duplicate Failed', description: err.message, type: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await api.projects.delete(deleteId);
      addToast({
        title: 'Project Removed',
        description: `Project has been archived and removed from public listings.`,
        type: 'success',
      });
      fetchProjects();
    } catch (err: any) {
      addToast({ title: 'Delete Failed', description: err.message, type: 'error' });
    }
  };

  const handleBulkStatus = async (status: 'Published' | 'Draft' | 'Archived') => {
    try {
      const state = status.toLowerCase() as any;
      await Promise.all(selectedIds.map((id) => api.projects.update(id, { publishedState: state })));
      addToast({
        title: `Updated ${selectedIds.length} Projects`,
        description: `Status changed to ${status}`,
        type: 'success',
      });
      setSelectedIds([]);
      fetchProjects();
    } catch (err: any) {
      addToast({ title: 'Bulk Update Failed', description: err.message, type: 'error' });
    }
  };

  const handleExportCsv = () => {
    const csvContent =
      'id,name,city,propertyType,status,startingPrice,reraNumber\n' +
      projects
        .map(
          (p) =>
            `"${p.id}","${p.name}","${p.city}","${p.propertyTypes?.join('/') || ''}","${p.publishedState || p.status}","${p.startingPrice}","${p.reraNumber || ''}"`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omaxe-projects-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const columns: ColumnDef<ProjectEntity>[] = [
    {
      id: 'name',
      header: 'Development / Title',
      sortable: true,
      cell: (p) => {
        const coverImg = p.gallery?.find((g) => g.isCover || g.isHero)?.url || p.gallery?.[0]?.url;
        const bhkDesc = p.configurations?.map((c) => c.name).join(', ') || 'Luxury Units';
        return (
          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-10 rounded bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700">
              {coverImg ? (
                <img src={coverImg} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <Building2 className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                  {p.name}
                </span>
                {p.isFeatured && (
                  <span title="Featured on Homepage">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 truncate">
                {bhkDesc} · {p.possessionDate || 'Upcoming'}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: 'city',
      header: 'Location',
      accessorKey: 'city',
      sortable: true,
      cell: (p) => (
        <div className="text-xs">
          <span className="font-medium text-neutral-900 dark:text-neutral-100">{p.city}</span>
          <p className="text-[11px] text-neutral-400 truncate max-w-[120px]">{p.locality || p.city}</p>
        </div>
      ),
    },
    {
      id: 'propertyType',
      header: 'Type',
      sortable: true,
      cell: (p) => (
        <Badge variant="neutral" size="sm">
          {p.propertyTypes?.[0] || 'Residential'}
        </Badge>
      ),
    },
    {
      id: 'startingPrice',
      header: 'Starting Price',
      sortable: true,
      cell: (p) => {
        const formatted = p.priceOnRequest
          ? 'Price on Request'
          : `₹${(p.startingPrice / 10000000).toFixed(2)} Cr`;
        return (
          <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100">
            {formatted}
          </span>
        );
      },
    },
    {
      id: 'status',
      header: 'Status',
      sortable: true,
      cell: (p) => {
        const st = p.publishedState || 'draft';
        const variantMap: Record<string, 'success' | 'warning' | 'neutral' | 'danger'> = {
          published: 'success',
          draft: 'warning',
          archived: 'neutral',
          scheduled: 'neutral',
        };
        return (
          <Badge variant={variantMap[st] || 'neutral'}>
            {st.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (p) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Link
            to={`/admin/projects/${p.id}`}
            title="Edit Project"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => handleDuplicate(p.id, p.name)}
            title="Duplicate Project"
            className="p-1.5 text-neutral-500 hover:text-[#A8823C] hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <a
            href={`/projects/${p.slug}`}
            target="_blank"
            rel="noreferrer"
            title="Preview Live"
            className="p-1.5 text-neutral-500 hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {hasPermission('projects', 'delete') && (
            <button
              type="button"
              onClick={() => {
                setDeleteId(p.id);
                setDeleteName(p.name);
              }}
              title="Delete Project"
              className="p-1.5 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header with Title and Create Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Project & Township Portfolio
          </h1>
          <p className="text-xs text-neutral-500">
            Manage commercial and residential real estate listings, pricing models, RERA registrations, and units.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-md shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {hasPermission('projects', 'create') && (
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#A8823C] hover:bg-[#8e6d2f] rounded-md transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Project</span>
            </Link>
          )}
        </div>
      </div>

      {/* Tabs Filter Bar (All / Published / Draft / Archived) */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={[
            { id: 'ALL', label: 'All Developments', badge: total },
            { id: 'Published', label: 'Published' },
            { id: 'Draft', label: 'Drafts' },
            { id: 'Archived', label: 'Archived' },
          ]}
        />
      </div>

      {/* Filter Bar: Search, City Filter, Property Type Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search projects by name, locality..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-md focus:ring-1 focus:ring-[#A8823C]"
          />
        </div>

        <div>
          <select
            value={cityFilter}
            onChange={(e) => {
              setCityFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-md focus:ring-1 focus:ring-[#A8823C] cursor-pointer"
          >
            <option value="ALL" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">All Cities (31 Operational Hubs)</option>
            <option value="Delhi NCR" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Delhi NCR</option>
            <option value="Noida" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Noida</option>
            <option value="Greater Noida" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Greater Noida</option>
            <option value="Chandigarh" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Chandigarh</option>
            <option value="Lucknow" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Lucknow</option>
            <option value="Ludhiana" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Ludhiana</option>
            <option value="Indore" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Indore</option>
            <option value="Faridabad" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Faridabad</option>
            <option value="Sonipat" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Sonipat</option>
          </select>
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-md focus:ring-1 focus:ring-[#A8823C] cursor-pointer"
          >
            <option value="ALL" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">All Categories</option>
            <option value="Residential" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Residential</option>
            <option value="Commercial" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Commercial</option>
            <option value="Integrated Township" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Integrated Township</option>
            <option value="Hi-Street Retail" className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">Hi-Street Retail</option>
          </select>
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={projects}
        totalCount={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        isLoading={isLoading}
        selectable={true}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onRowClick={(p) => navigate(`/admin/projects/${p.id}`)}
        bulkActions={[
          {
            label: 'Publish Selected',
            variant: 'success',
            onClick: () => handleBulkStatus('Published'),
          },
          {
            label: 'Set as Draft',
            onClick: () => handleBulkStatus('Draft'),
          },
          {
            label: 'Archive',
            variant: 'danger',
            onClick: () => handleBulkStatus('Archived'),
          },
        ]}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Development Listing"
        description={`Are you sure you want to delete "${deleteName}"? This action cannot be reversed and will remove it from live visitor queries.`}
        confirmText="Confirm Delete"
        requireTypedConfirmation={true}
        expectedText="DELETE"
      />
    </div>
  );
};
