import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  FileText,
  Users,
  Image as ImageIcon,
  Sliders,
  BarChart3,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useAdminStore } from '../../../lib/admin/admin-store';
import { SEED_PROJECTS, SEED_LEADS, SEED_BLOG_POSTS } from '../../../lib/api/seed-data';

export const CommandPalette: React.FC = () => {
  const isOpen = useAdminStore((s) => s.isCommandPaletteOpen);
  const setOpen = useAdminStore((s) => s.setCommandPaletteOpen);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Handle Cmd+K global keybind
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  const quickPages = [
    { label: 'Dashboard Overview', path: '/admin', icon: <BarChart3 className="w-4 h-4" />, category: 'Pages' },
    { label: 'Projects & Developments', path: '/admin/projects', icon: <Building2 className="w-4 h-4" />, category: 'Pages' },
    { label: 'Media Library & Editors', path: '/admin/media', icon: <ImageIcon className="w-4 h-4" />, category: 'Pages' },
    { label: 'Page Builder / CMS', path: '/admin/pages', icon: <FileText className="w-4 h-4" />, category: 'Pages' },
    { label: 'Leads & Enquiries (CRM)', path: '/admin/leads', icon: <Users className="w-4 h-4" />, category: 'Pages' },
    { label: 'Global Brand & Settings', path: '/admin/settings', icon: <Sliders className="w-4 h-4" />, category: 'Pages' },
  ];

  const matchedProjects = SEED_PROJECTS.filter((p) => {
    const q = (query || '').toLowerCase();
    return (p.name || '').toLowerCase().includes(q) || (p.city || '').toLowerCase().includes(q);
  }).slice(0, 4).map((p) => ({
    label: `${p.name} (${p.city})`,
    path: `/admin/projects/${p.id}`,
    icon: <Building2 className="w-4 h-4 text-amber-600" />,
    category: 'Projects',
  }));

  const matchedLeads = SEED_LEADS.filter((l) => {
    const q = (query || '').toLowerCase();
    return (l.name || '').toLowerCase().includes(q) || (l.email || '').toLowerCase().includes(q);
  }).slice(0, 3).map((l) => ({
    label: `${l.name} · ${l.projectName || 'Lead'}`,
    path: `/admin/leads`,
    icon: <Users className="w-4 h-4 text-blue-600" />,
    category: 'Leads',
  }));

  const matchedPosts = SEED_BLOG_POSTS.filter((b) => {
    const q = (query || '').toLowerCase();
    return (b.title || '').toLowerCase().includes(q);
  }).slice(0, 3).map((b) => ({
    label: b.title,
    path: `/admin/blog`,
    icon: <FileText className="w-4 h-4 text-emerald-600" />,
    category: 'Articles',
  }));

  const results = query
    ? [...matchedProjects, ...matchedLeads, ...matchedPosts]
    : quickPages;

  const handleSelect = (item: (typeof results)[0]) => {
    navigate(item.path);
    setOpen(false);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-100">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-4 h-4 text-neutral-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, leads, blog posts, pages, or commands (Cmd+K)..."
            className="w-full text-sm bg-transparent border-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No matching records or commands found for "{query}"
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${item.category}-${item.label}`}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <span>Navigate with</span>
            <kbd className="font-mono bg-neutral-200 dark:bg-neutral-800 px-1 rounded">↑</kbd>
            <kbd className="font-mono bg-neutral-200 dark:bg-neutral-800 px-1 rounded">↓</kbd>
            <span>Select with</span>
            <kbd className="font-mono bg-neutral-200 dark:bg-neutral-800 px-1 rounded">↵</kbd>
          </div>
          <span className="text-[10px] text-amber-600 font-medium">Omaxe Master Command</span>
        </div>
      </div>
    </div>
  );
};
