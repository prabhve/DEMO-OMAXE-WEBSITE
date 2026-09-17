import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
  Sparkles,
  Layers,
  Settings,
  History,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Layout,
  Image as ImageIcon,
} from 'lucide-react';
import { api } from '../../../lib/api';
import { AdminPage, PageBlock, BlockType } from '../../../lib/api/types';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { Button, Badge, Modal } from '../../../components/admin/ui/BasicPrimitives';

const AVAILABLE_BLOCK_TYPES: { type: BlockType; name: string; description: string }[] = [
  { type: 'Hero', name: 'Hero Banner', description: 'Full-bleed high-impact luxury banner with headline and CTA' },
  { type: 'FeatureGrid', name: 'Feature / Amenity Grid', description: 'Multi-column cards with icons, titles, and descriptions' },
  { type: 'ProjectShowcase', name: 'Project Showcase', description: 'Dynamic curated grid of flagship Omaxe developments' },
  { type: 'StatRow', name: 'Key Statistics Row', description: 'Impressive metrics (sq.ft delivered, cities, awards)' },
  { type: 'TextContent', name: 'Rich Text / Editorial Body', description: 'Formatted prose, headings, and pullquotes' },
  { type: 'Quote', name: 'Executive Quote / Callout', description: 'Highlighted leadership statement with author bio' },
  { type: 'FaqAccordion', name: 'FAQ Accordion', description: 'Expandable frequently asked questions list' },
  { type: 'ContactForm', name: 'Enquiry / Lead Form', description: 'Interactive luxury enquiry capture form' },
  { type: 'MapSection', name: 'Interactive Location Map', description: 'Geographic map with office/site location pin' },
  { type: 'LogoStrip', name: 'Partner / Banking Logos', description: 'Approved banking partners and institutional logos' },
];

export const AdminPageEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [page, setPage] = useState<AdminPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'builder' | 'seo' | 'revisions'>('builder');
  const [isBlockPickerOpen, setIsBlockPickerOpen] = useState(false);

  const addToast = useAdminStore((s) => s.addToast);
  const setHasUnsavedChanges = useAdminStore((s) => s.setHasUnsavedChanges);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    api.pages
      .getById(id)
      .then((data) => {
        if (data) {
          setPage(data);
          if (data.blocks && data.blocks.length > 0) {
            setSelectedBlockId(data.blocks[0].id);
          }
        } else {
          addToast({ title: 'Not Found', description: 'Page does not exist', type: 'error' });
          navigate('/admin/pages');
        }
      })
      .finally(() => setIsLoading(false));
  }, [id, navigate, addToast]);

  const handleSave = async (statusOverride?: 'draft' | 'published') => {
    if (!page) return;
    setIsSaving(true);
    try {
      const payload: AdminPage = {
        ...page,
        status: statusOverride || page.status,
      };
      const updated = await api.pages.update(page.id, payload);
      setPage(updated);
      setHasUnsavedChanges(false);
      addToast({
        title: 'Saved Successfully',
        description: `Page is currently saved as ${payload.status}`,
        type: 'success',
      });
    } catch {
      addToast({ title: 'Error', description: 'Failed to save page changes', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  // Block manipulation methods
  const selectedBlock = page?.blocks.find((b) => b.id === selectedBlockId) || null;

  const updateSelectedBlock = (updates: Partial<PageBlock>) => {
    if (!page || !selectedBlockId) return;
    const newBlocks = page.blocks.map((b) => (b.id === selectedBlockId ? { ...b, ...updates } : b));
    setPage({ ...page, blocks: newBlocks });
    setHasUnsavedChanges(true);
  };

  const updateBlockSettings = (key: string, value: any) => {
    if (!selectedBlock) return;
    updateSelectedBlock({
      settings: { ...selectedBlock.settings, [key]: value },
    });
  };

  const updateBlockStyles = (key: string, value: any) => {
    if (!selectedBlock) return;
    updateSelectedBlock({
      styles: { ...selectedBlock.styles, [key]: value },
    });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (!page) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= page.blocks.length) return;
    const blocks = [...page.blocks];
    const [moved] = blocks.splice(index, 1);
    blocks.splice(newIndex, 0, moved);
    setPage({ ...page, blocks });
    setHasUnsavedChanges(true);
  };

  const deleteBlock = (blockId: string) => {
    if (!page) return;
    const newBlocks = page.blocks.filter((b) => b.id !== blockId);
    setPage({ ...page, blocks: newBlocks });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(newBlocks.length > 0 ? newBlocks[0].id : null);
    }
    setHasUnsavedChanges(true);
  };

  const duplicateBlock = (block: PageBlock) => {
    if (!page) return;
    const newBlock: PageBlock = {
      ...block,
      id: `blk-${Date.now()}`,
      name: `${block.name} (Copy)`,
    };
    setPage({ ...page, blocks: [...page.blocks, newBlock] });
    setSelectedBlockId(newBlock.id);
    setHasUnsavedChanges(true);
  };

  const addBlockOfType = (type: BlockType) => {
    if (!page) return;
    const baseDef = AVAILABLE_BLOCK_TYPES.find((b) => b.type === type);
    const newBlock: PageBlock = {
      id: `blk-${Date.now()}`,
      type,
      name: baseDef?.name || `${type} Section`,
      isHidden: false,
      settings: {
        heading: `New ${type} Section`,
        subheading: 'Enter custom section subtitle or description text here.',
      },
      styles: {
        background: 'cream',
        paddingTop: 'md',
        paddingBottom: 'md',
        containerWidth: 'normal',
        textAlign: 'left',
      },
    };

    setPage({ ...page, blocks: [...page.blocks, newBlock] });
    setSelectedBlockId(newBlock.id);
    setIsBlockPickerOpen(false);
    setHasUnsavedChanges(true);
    addToast({ title: 'Block Added', description: `Added ${baseDef?.name}`, type: 'success' });
  };

  if (isLoading || !page) {
    return (
      <div className="p-8 text-center text-xs text-neutral-500">
        Loading CMS Page Builder...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#FAFAFA] dark:bg-neutral-950">
      {/* Top Navigation & Action Header */}
      <div className="h-14 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/pages"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Back to Pages"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                {page.title}
              </span>
              <Badge variant={page.status === 'published' ? 'success' : 'neutral'}>
                {page.status}
              </Badge>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">
              /{page.slug}
            </span>
          </div>
        </div>

        {/* Device Preview Toggle & View Switcher */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded border border-neutral-200 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => setPreviewDevice('desktop')}
            className={`p-1.5 rounded transition-colors ${
              previewDevice === 'desktop' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-400'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setPreviewDevice('tablet')}
            className={`p-1.5 rounded transition-colors ${
              previewDevice === 'tablet' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-400'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setPreviewDevice('mobile')}
            className={`p-1.5 rounded transition-colors ${
              previewDevice === 'mobile' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-400'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Save & Publish Actions */}
        <div className="flex items-center gap-2">
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
            <CheckCircle2 className="w-4 h-4" /> Publish Live
          </Button>
        </div>
      </div>

      {/* Main 3-Column Studio Workstation */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Reorderable Block Tree */}
        <div className="w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col shrink-0">
          <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-600" /> Section Blocks ({page.blocks.length})
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBlockPickerOpen(true)}
              className="text-[11px] py-1 px-2 h-7"
            >
              <Plus className="w-3 h-3" /> Add Section
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {page.blocks.map((block, idx) => {
              const isSelected = block.id === selectedBlockId;
              return (
                <div
                  key={block.id}
                  onClick={() => setSelectedBlockId(block.id)}
                  className={`group p-2.5 rounded border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-500/80 text-neutral-900 dark:text-white font-medium shadow-2xs'
                      : 'bg-[#FAFAFA] dark:bg-neutral-800/40 border-neutral-200/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  } ${block.isHidden ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-neutral-400">{idx + 1}</span>
                    <div className="truncate">
                      <div className="truncate font-semibold">{block.name}</div>
                      <div className="text-[10px] text-neutral-400 capitalize">{block.type}</div>
                    </div>
                  </div>

                  {/* Ordering & Quick Actions */}
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'up'); }}
                      className="p-1 hover:text-amber-600 disabled:opacity-20"
                      title="Move Up"
                    >
                      <MoveUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === page.blocks.length - 1}
                      onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'down'); }}
                      className="p-1 hover:text-amber-600 disabled:opacity-20"
                      title="Move Down"
                    >
                      <MoveDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateSelectedBlock({ isHidden: !block.isHidden });
                      }}
                      className="p-1 hover:text-amber-600"
                      title={block.isHidden ? 'Show Section' : 'Hide Section'}
                    >
                      {block.isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                      className="p-1 hover:text-rose-600"
                      title="Delete Section"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Live Device Interactive Canvas Preview */}
        <div className="flex-1 bg-neutral-100 dark:bg-neutral-900/50 overflow-y-auto p-6 flex flex-col items-center justify-start">
          <div
            className={`transition-all duration-300 bg-white dark:bg-neutral-950 rounded-md shadow-sm border border-neutral-300/80 dark:border-neutral-800 overflow-hidden min-h-[600px] ${
              previewDevice === 'desktop'
                ? 'w-full max-w-4xl'
                : previewDevice === 'tablet'
                ? 'w-[768px]'
                : 'w-[375px]'
            }`}
          >
            {/* Mock Browser Frame Header */}
            <div className="h-7 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-3 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
              <span>https://omaxe.com/{page.slug}</span>
              <span className="text-[10px] text-amber-600 font-bold uppercase">{previewDevice}</span>
            </div>

            {/* Rendered Live Visual Blocks */}
            <div className="divide-y divide-neutral-100 dark:divide-neutral-900">
              {page.blocks.map((b) => {
                if (b.isHidden) return null;
                const isSelected = b.id === selectedBlockId;
                const s = b.settings || {};
                const styles = b.styles || {};

                return (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBlockId(b.id)}
                    className={`relative p-8 transition-all cursor-pointer ${
                      isSelected
                        ? 'outline-2 outline-amber-500 -outline-offset-2 bg-amber-50/10'
                        : 'hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30'
                    } ${
                      styles.background === 'ink'
                        ? 'bg-neutral-900 text-white'
                        : styles.background === 'cream'
                        ? 'bg-[#FAFAFA] text-neutral-900'
                        : 'bg-white text-neutral-900'
                    }`}
                  >
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        Editing {b.name}
                      </div>
                    )}

                    {/* Block Content Renderers */}
                    {b.type === 'Hero' && (
                      <div className="space-y-4 py-8 text-center max-w-2xl mx-auto">
                        {s.eyebrow && (
                          <span className="text-xs tracking-wider uppercase font-semibold text-amber-600">
                            {s.eyebrow}
                          </span>
                        )}
                        <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight leading-tight">
                          {s.heading || 'Hero Section Heading'}
                        </h2>
                        <p className="text-sm opacity-80 max-w-xl mx-auto leading-relaxed">
                          {s.subheading || 'Hero subtitle text describing key value propositions.'}
                        </p>
                        {s.primaryCtaText && (
                          <div className="pt-2">
                            <button className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold tracking-wider uppercase rounded transition-colors">
                              {s.primaryCtaText}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {b.type === 'TextContent' && (
                      <div className="max-w-2xl mx-auto space-y-3 py-4">
                        {s.heading && <h3 className="text-xl font-serif font-semibold">{s.heading}</h3>}
                        <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line">
                          {s.content || 'Content paragraph text here.'}
                        </p>
                      </div>
                    )}

                    {b.type === 'Quote' && (
                      <div className="max-w-xl mx-auto text-center py-6 space-y-3 border-y border-amber-600/30">
                        <blockquote className="font-serif italic text-lg opacity-90">
                          &ldquo;{s.quoteText || 'Exemplary architectural standards delivered with integrity.'}&rdquo;
                        </blockquote>
                        <div className="text-xs font-semibold tracking-wider uppercase text-amber-600">
                          {s.authorName || 'Rohtas Goel'} &mdash; {s.authorTitle || 'Founder & Chairman'}
                        </div>
                      </div>
                    )}

                    {b.type === 'StatRow' && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-4">
                        <div className="space-y-1">
                          <div className="text-2xl font-serif font-bold text-amber-600">132M+</div>
                          <div className="text-xs opacity-70">Sq.Ft Delivered</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-serif font-bold text-amber-600">31+</div>
                          <div className="text-xs opacity-70">Cities Pan-India</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-serif font-bold text-amber-600">130K+</div>
                          <div className="text-xs opacity-70">Happy Families</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-serif font-bold text-amber-600">38+</div>
                          <div className="text-xs opacity-70">Years Legacy</div>
                        </div>
                      </div>
                    )}

                    {!['Hero', 'TextContent', 'Quote', 'StatRow'].includes(b.type) && (
                      <div className="py-6 text-center space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                          {b.type} Component
                        </div>
                        <h4 className="font-serif text-lg font-semibold">{s.heading || b.name}</h4>
                        <p className="text-xs opacity-70 max-w-md mx-auto">{s.subheading || 'Configured via section settings inspector.'}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Block Settings Inspector */}
        <div className="w-80 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 flex flex-col shrink-0">
          <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-amber-600" /> Section Inspector
            </span>
            {selectedBlock && (
              <span className="text-[10px] font-mono text-neutral-400 uppercase">
                {selectedBlock.type}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedBlock ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Section Name
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.name}
                    onChange={(e) => updateSelectedBlock({ name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                  />
                </div>

                {/* Block-specific fields */}
                <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Content Settings
                  </span>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Main Heading
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.settings?.heading || ''}
                      onChange={(e) => updateBlockSettings('heading', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Eyebrow / Category Tag
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.settings?.eyebrow || ''}
                      onChange={(e) => updateBlockSettings('eyebrow', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Subheading / Body Text
                    </label>
                    <textarea
                      rows={4}
                      value={selectedBlock.settings?.subheading || selectedBlock.settings?.content || ''}
                      onChange={(e) => {
                        updateBlockSettings('subheading', e.target.value);
                        updateBlockSettings('content', e.target.value);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.settings?.primaryCtaText || ''}
                      onChange={(e) => updateBlockSettings('primaryCtaText', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      CTA Link URL
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.settings?.primaryCtaLink || ''}
                      onChange={(e) => updateBlockSettings('primaryCtaLink', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Styling & Layout Settings */}
                <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Visual & Style Theme
                  </span>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Background Palette
                    </label>
                    <select
                      value={selectedBlock.styles?.background || 'cream'}
                      onChange={(e) => updateBlockStyles('background', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                    >
                      <option value="cream">Warm Cream (#FAFAFA)</option>
                      <option value="white">Pure White (#FFFFFF)</option>
                      <option value="ink">Ink Charcoal (#131616)</option>
                      <option value="gold-tint">Subtle Gold Tint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Vertical Padding
                    </label>
                    <select
                      value={selectedBlock.styles?.paddingTop || 'md'}
                      onChange={(e) => {
                        updateBlockStyles('paddingTop', e.target.value);
                        updateBlockStyles('paddingBottom', e.target.value);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded focus:border-amber-600 outline-none"
                    >
                      <option value="sm">Compact (32px)</option>
                      <option value="md">Balanced (64px)</option>
                      <option value="lg">Spacious (96px)</option>
                      <option value="xl">Hero Dramatic (128px)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Text Alignment
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {['left', 'center', 'right'].map((align) => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => updateBlockStyles('textAlign', align)}
                          className={`py-1 text-xs capitalize rounded border font-medium ${
                            selectedBlock.styles?.textAlign === align
                              ? 'bg-amber-500 text-white border-amber-600'
                              : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-neutral-400 italic">
                Select a section block from the left tree to inspect and configure its settings.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Block Catalog Picker Modal */}
      <Modal
        isOpen={isBlockPickerOpen}
        onClose={() => setIsBlockPickerOpen(false)}
        title="Add New Visual Section"
        size="lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {AVAILABLE_BLOCK_TYPES.map((block) => (
            <div
              key={block.type}
              onClick={() => addBlockOfType(block.type)}
              className="p-3.5 bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/80 hover:border-amber-500 rounded-md cursor-pointer transition-all space-y-1 hover:shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-neutral-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  {block.name}
                </span>
                <Plus className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-600" />
              </div>
              <p className="text-[11px] text-neutral-500 leading-snug">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
