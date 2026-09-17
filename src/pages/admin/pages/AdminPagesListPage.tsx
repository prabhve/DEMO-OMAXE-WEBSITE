import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCode2,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Copy,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Eye,
  Sliders,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { AdminPage } from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { useAuthStore } from '../../../lib/admin/auth-store';
import {
  DataTable,
  Column,
  Pagination,
} from '../../../components/admin/ui/DataTable';
import {
  Badge,
  Button,
  Modal,
} from '../../../components/admin/ui/BasicPrimitives';

export const AdminPagesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<AdminPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // New Page Dialog
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newTemplate, setNewTemplate] = useState<any>('custom');

  const addToast = useAdminStore((s) => s.addToast);
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const res = await api.pages.list({ limit: 100 });
      setPages(res.data);
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', description: 'Failed to load CMS pages', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleCreatePage = async () => {
    if (!newTitle.trim() || !newSlug.trim()) {
      addToast({ title: 'Validation', description: 'Page title and slug are required', type: 'error' });
      return;
    }

    try {
      const created = await api.pages.create({
        title: newTitle.trim(),
        slug: newSlug.trim().toLowerCase().replace(/[^a-z0-9-/]+/g, '-'),
        template: newTemplate,
        blocks: [
          {
            id: `blk-${Date.now()}-1`,
            type: 'Hero',
            name: 'Hero Banner Section',
            isHidden: false,
            settings: {
              eyebrow: 'Omaxe Developments',
              heading: newTitle.trim(),
              subheading: 'Crafting exemplary residential and integrated township landmarks across India.',
              primaryCtaText: 'Explore Opportunities',
              primaryCtaLink: '#explore',
            },
            styles: {
              background: 'ink',
              paddingTop: 'xl',
              paddingBottom: 'xl',
              containerWidth: 'normal',
              textAlign: 'center',
            },
          },
          {
            id: `blk-${Date.now()}-2`,
            type: 'TextContent',
            name: 'Main Content Body',
            isHidden: false,
            settings: {
              heading: 'Overview & Vision',
              content: 'Welcome to this custom page. You can customize this layout by adding, reordering, and configuring blocks in the Page Builder.',
            },
            styles: {
              background: 'cream',
              paddingTop: 'lg',
              paddingBottom: 'lg',
              containerWidth: 'narrow',
              textAlign: 'left',
            },
          },
        ],
        status: 'draft',
        includeInNavigation: false,
        revisions: [],
        seo: {
          metaTitle: newTitle.trim(),
          metaDescription: 'Omaxe Developments Page',
          keywords: [],
          noIndex: false,
        },
      });

      addToast({ title: 'Page Created', description: `Draft page "${newTitle}" created`, type: 'success' });
      setIsCreateModalOpen(false);
      navigate(`/admin/pages/${created.id}`);
    } catch {
      addToast({ title: 'Error', description: 'Failed to create page', type: 'error' });
    }
  };

  const handleDuplicate = async (page: AdminPage) => {
    try {
      const duplicated = await api.pages.create({
        ...page,
        id: `pg-${Date.now()}`,
        title: `${page.title} (Copy)`,
        slug: `${page.slug}-copy`,
        status: 'draft',
      });
      setPages((prev) => [duplicated, ...prev]);
      addToast({ title: 'Page Duplicated', description: `Created copy of "${page.title}"`, type: 'success' });
    } catch {
      addToast({ title: 'Error', description: 'Could not duplicate page', type: 'error' });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the page "${title}"? This cannot be undone.`)) return;
    try {
      await api.pages.delete(id);
      setPages((prev) => prev.filter((p) => p.id !== id));
      addToast({ title: 'Page Deleted', description: `Page "${title}" removed`, type: 'info' });
    } catch {
      addToast({ title: 'Error', description: 'Could not delete page', type: 'error' });
    }
  };

  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTemplate = templateFilter === 'all' || p.template === templateFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesTemplate && matchesStatus;
  });

  const columns: Column<AdminPage>[] = [
    {
      id: 'title',
      header: 'Page Title & Slug',
      cell: (page) => (
        <div className="flex flex-col">
          <Link
            to={`/admin/pages/${page.id}`}
            className="font-semibold text-neutral-900 dark:text-neutral-100 hover:text-amber-600 transition-colors flex items-center gap-1.5"
          >
            {page.title}
          </Link>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-500 font-mono">
            <span>/{page.slug}</span>
            {page.includeInNavigation && (
              <span className="text-[10px] text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                In Nav
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'template',
      header: 'Template',
      cell: (page) => (
        <Badge variant="neutral" className="capitalize">
          {page.template}
        </Badge>
      ),
    },
    {
      id: 'blocks',
      header: 'Blocks',
      cell: (page) => (
        <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
          {page.blocks?.length || 0} blocks configured
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Publish Status',
      cell: (page) => {
        if (page.status === 'published') {
          return (
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Published
            </Badge>
          );
        }
        if (page.status === 'scheduled') {
          return (
            <Badge variant="warning" className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Scheduled
            </Badge>
          );
        }
        return <Badge variant="neutral">Draft</Badge>;
      },
    },
    {
      id: 'actions',
      header: '',
      cell: (page) => (
        <div className="flex items-center gap-1.5 justify-end">
          <Link
            to={`/${page.slug}`}
            target="_blank"
            rel="noreferrer"
            title="View Live Page"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            to={`/admin/pages/${page.id}`}
            title="Edit in Page Builder"
            className="p-1.5 text-neutral-600 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => handleDuplicate(page)}
            title="Duplicate Page"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(page.id, page.title)}
            title="Delete Page"
            className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
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
            <FileCode2 className="w-5 h-5 text-amber-600" /> Page Builder & CMS
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Build, edit, and reorder modular visual sections across all public website pages with live device preview.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Page
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-md border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages by title or URL slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAFAFA] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none text-neutral-900 dark:text-neutral-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-3 py-2 text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-600 cursor-pointer shadow-sm"
          >
            <option value="all" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">All Statuses</option>
            <option value="published" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Published</option>
            <option value="draft" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Draft</option>
            <option value="scheduled" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Scheduled</option>
          </select>

          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-3 py-2 text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-600 cursor-pointer shadow-sm"
          >
            <option value="all" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">All Templates</option>
            <option value="home" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Home</option>
            <option value="about" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">About</option>
            <option value="project-showcase" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Showcase</option>
            <option value="contact" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Contact</option>
            <option value="legal" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Legal</option>
            <option value="custom" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">Custom</option>
          </select>
        </div>
      </div>

      {/* Pages Table */}
      <DataTable
        data={filteredPages}
        columns={columns}
        keyField="id"
        isLoading={isLoading}
        emptyMessage="No pages found matching your search."
      />

      {/* Create New Page Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New CMS Page"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Page Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Sustainable Living Initiative"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
              }}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              URL Slug <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-2 border border-r-0 border-neutral-200 dark:border-neutral-700 rounded-l font-mono">
                /
              </span>
              <input
                type="text"
                placeholder="sustainable-living"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-r focus:border-amber-600 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Base Template
            </label>
            <select
              value={newTemplate}
              onChange={(e) => setNewTemplate(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
            >
              <option value="custom">Blank Custom Page</option>
              <option value="about">About & Heritage Template</option>
              <option value="project-showcase">Project Showcase Template</option>
              <option value="contact">Contact & Enquiry Template</option>
              <option value="legal">Legal & Policy Template</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <Button variant="ghost" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreatePage}>
              Initialize in Builder
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
