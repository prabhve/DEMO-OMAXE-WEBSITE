import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Tag,
  Share2,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { AdminBlogPost } from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import {
  DataTable,
  Column,
  Pagination,
} from '../../../components/admin/ui/DataTable';
import {
  Badge,
  Button,
} from '../../../components/admin/ui/BasicPrimitives';

export const AdminBlogListPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const addToast = useAdminStore((s) => s.addToast);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const res = await api.blog.list({ limit: 100 });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', description: 'Failed to load journal articles', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.blog.delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      addToast({ title: 'Article Deleted', description: `Article "${title}" removed`, type: 'info' });
    } catch {
      addToast({ title: 'Error', description: 'Failed to delete article', type: 'error' });
    }
  };

  const filteredPosts = posts.filter((p) => {
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      (p.title || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  const columns: Column<AdminBlogPost>[] = [
    {
      id: 'title',
      header: 'Article Title & Excerpt',
      cell: (post) => (
        <div className="flex items-start gap-3">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-14 h-11 object-cover rounded border border-neutral-200 dark:border-neutral-800 shrink-0"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <Link
                to={`/admin/blog/${post.id}`}
                className="font-semibold text-neutral-900 dark:text-neutral-100 hover:text-amber-600 transition-colors line-clamp-1"
              >
                {post.title}
              </Link>
              {post.featured && (
                <Badge variant="warning" className="text-[10px] py-0">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
              {post.excerpt}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      cell: (post) => (
        <Badge variant="neutral">
          {post.category}
        </Badge>
      ),
    },
    {
      id: 'author',
      header: 'Author & Read Time',
      cell: (post) => (
        <div className="text-xs">
          <div className="font-medium text-neutral-800 dark:text-neutral-200">
            {post.authorName}
          </div>
          <div className="text-neutral-400 text-[11px]">
            {post.readTimeMinutes} min read
          </div>
        </div>
      ),
    },
    {
      id: 'publishedDate',
      header: 'Date',
      cell: (post) => (
        <span className="text-xs text-neutral-500">
          {new Date(post.publishedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (post) => {
        if (post.status === 'published') {
          return (
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Published
            </Badge>
          );
        }
        if (post.status === 'scheduled') {
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
      cell: (post) => (
        <div className="flex items-center gap-1.5 justify-end">
          <Link
            to={`/blog/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            title="View Live Article"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            to={`/admin/blog/${post.id}`}
            title="Edit Article"
            className="p-1.5 text-neutral-600 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-neutral-800 rounded transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(post.id, post.title)}
            title="Delete Article"
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
            <BookOpen className="w-5 h-5 text-amber-600" /> The Omaxe Journal & Insights
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Publish real estate thought leadership, architectural insights, market updates, and township stories.
          </p>
        </div>

        <Link to="/admin/blog/new">
          <Button variant="primary" size="sm" className="flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Write New Article
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-md border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-3 py-2 text-neutral-800 dark:text-neutral-200 outline-none focus:border-amber-600 cursor-pointer shadow-sm"
          >
            <option value="all" className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c} className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={filteredPosts}
        columns={columns}
        keyField="id"
        isLoading={isLoading}
        emptyMessage="No articles found matching your criteria."
      />
    </div>
  );
};
