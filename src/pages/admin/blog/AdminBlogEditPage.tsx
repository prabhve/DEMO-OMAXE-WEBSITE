import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Calendar,
  Clock,
  Tag,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { AdminBlogPost } from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { Button, Badge } from '../../../components/admin/ui/BasicPrimitives';

export const AdminBlogEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Market Trends');
  const [authorName, setAuthorName] = useState('Omaxe Editorial Team');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [readTimeMinutes, setReadTimeMinutes] = useState(5);
  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled'>('published');
  const [featured, setFeatured] = useState(false);
  const [tagsInput, setTagsInput] = useState('Real Estate, Luxury Living, Investment');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const addToast = useAdminStore((s) => s.addToast);
  const setHasUnsavedChanges = useAdminStore((s) => s.setHasUnsavedChanges);

  useEffect(() => {
    if (!isNew && id) {
      setIsLoading(true);
      api.blog
        .getById(id)
        .then((post) => {
          if (post) {
            setTitle(post.title);
            setSlug(post.slug);
            setCategory(post.category);
            setAuthorName(post.authorName);
            setExcerpt(post.excerpt);
            setContent(post.content);
            setFeaturedImage(post.featuredImage);
            setReadTimeMinutes(post.readTimeMinutes);
            setStatus(post.status);
            setFeatured(post.featured);
            setTagsInput((post.tags || []).join(', '));
            setMetaTitle(post.seo?.metaTitle || '');
            setMetaDescription(post.seo?.metaDescription || '');
          } else {
            addToast({ title: 'Not Found', description: 'Article does not exist', type: 'error' });
            navigate('/admin/blog');
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, isNew, navigate, addToast]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setHasUnsavedChanges(true);
    if (isNew) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleSave = async (overrideStatus?: 'published' | 'draft') => {
    if (!title.trim() || !slug.trim()) {
      addToast({ title: 'Required Fields', description: 'Title and URL slug are required', type: 'error' });
      return;
    }

    setIsSaving(true);
    try {
      const finalStatus = overrideStatus || status;
      const tagsArray = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

      const payload: Partial<AdminBlogPost> = {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        category,
        authorName,
        excerpt: excerpt.trim(),
        content: content.trim(),
        featuredImage,
        readTimeMinutes: Number(readTimeMinutes) || 5,
        status: finalStatus,
        featured,
        tags: tagsArray,
        seo: {
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt,
          keywords: tagsArray,
          noIndex: false,
        },
        publishedDate: new Date().toISOString(),
      };

      if (isNew) {
        const created = await api.blog.create(payload as any);
        addToast({ title: 'Article Created', description: `Saved as ${finalStatus}`, type: 'success' });
        setHasUnsavedChanges(false);
        navigate(`/admin/blog/${created.id}`);
      } else {
        await api.blog.update(id!, payload);
        addToast({ title: 'Article Updated', description: `Saved changes to "${title}"`, type: 'success' });
        setHasUnsavedChanges(false);
      }
    } catch {
      addToast({ title: 'Error', description: 'Failed to save article', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-xs text-neutral-500">
        Loading article data...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/blog"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              {isNew ? 'Write New Article' : `Edit: ${title || 'Untitled'}`}
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              The Omaxe Journal editorial management system
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && slug && (
            <Link
              to={`/blog/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Preview on Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave('draft')}
            isLoading={isSaving}
          >
            Save Draft
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSave('published')}
            isLoading={isSaving}
            className="flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Publish Article
          </Button>
        </div>
      </div>

      {/* Main Form Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Editorial Content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Article Headline <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Why New Chandigarh is Emerging as North India's Premier Luxury Real Estate Hub"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 text-sm font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                URL Slug <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center">
                <span className="text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-2 border border-r-0 border-neutral-200 dark:border-neutral-700 rounded-l font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setHasUnsavedChanges(true); }}
                  className="flex-1 px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-r focus:border-amber-600 outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Short Lead Excerpt
              </label>
              <textarea
                rows={2}
                placeholder="A compelling 1-2 sentence introduction summary shown in cards and previews..."
                value={excerpt}
                onChange={(e) => { setExcerpt(e.target.value); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Full Article Content (Markdown / Editorial Prose)
              </label>
              <textarea
                rows={16}
                placeholder="Write the complete article content here using markdown formatting..."
                value={content}
                onChange={(e) => { setContent(e.target.value); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none font-mono leading-relaxed"
              />
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Search Engine Optimization (SEO)
            </h3>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                placeholder={title || 'Page title in Google search results'}
                value={metaTitle}
                onChange={(e) => { setMetaTitle(e.target.value); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                placeholder={excerpt || 'Meta description snippet under 160 characters'}
                value={metaDescription}
                onChange={(e) => { setMetaDescription(e.target.value); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Publishing Meta & Image */}
        <div className="space-y-5">
          {/* Status Card */}
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Publishing Options
            </h3>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value as any); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              >
                <option value="Market Trends">Market Trends</option>
                <option value="Architecture & Design">Architecture & Design</option>
                <option value="Township Living">Township Living</option>
                <option value="Investor Insights">Investor Insights</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Heritage & Culture">Heritage & Culture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Author Byline
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => { setAuthorName(e.target.value); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Reading Time (Minutes)
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={readTimeMinutes}
                onChange={(e) => { setReadTimeMinutes(Number(e.target.value)); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isFeaturedArticle"
                checked={featured}
                onChange={(e) => { setFeatured(e.target.checked); setHasUnsavedChanges(true); }}
                className="rounded border-neutral-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="isFeaturedArticle" className="text-xs text-neutral-700 dark:text-neutral-300 select-none cursor-pointer">
                Feature prominently on Journal home
              </label>
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Featured Hero Cover Image
            </h3>

            {featuredImage && (
              <img
                src={featuredImage}
                alt="Preview"
                className="w-full h-36 object-cover rounded border border-neutral-200 dark:border-neutral-800"
                referrerPolicy="no-referrer"
              />
            )}

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Image CDN URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => { setFeaturedImage(e.target.value); setHasUnsavedChanges(true); }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-md border border-neutral-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Topic Tags
            </h3>
            <input
              type="text"
              placeholder="Real Estate, Luxury Living, NCR..."
              value={tagsInput}
              onChange={(e) => { setTagsInput(e.target.value); setHasUnsavedChanges(true); }}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
            />
            <span className="text-[10px] text-neutral-400">Separate multiple tags with commas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
