import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Calendar, ArrowRight, Tag } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../../data/blog';
import { BlogPostCategory } from '../../types';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogPostCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        !q ||
        (post.title || '').toLowerCase().includes(q) ||
        (post.excerpt || '').toLowerCase().includes(q) ||
        (post.tags || []).some((tag) => (tag || '').toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'The Omaxe Journal' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block mb-3">
              Editorial Insights &amp; Market Intelligence
            </span>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-[72px] font-light text-ink leading-[1.05] tracking-[-0.03em]">
              The Omaxe Journal
            </h1>
            <p className="mt-6 text-stone text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
              Thought leadership, market analyses, urban architecture essays, and living guides from India’s foremost real estate and infrastructure visionaries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-[72px] px-5 sm:py-72 sm:px-8 lg:py-80 lg:px-16">
        <div className="max-w-[1360px] mx-auto space-y-16">
          {/* Controls: Category Filter Chips & Search Bar */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`min-h-[44px] px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-light transition-colors cursor-pointer border ${
                  selectedCategory === 'All'
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-ivory text-stone border-line hover:border-ink hover:text-ink'
                }`}
              >
                All Articles
              </button>
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[44px] px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-light transition-colors cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-ivory text-stone border-line hover:border-ink hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
              <input
                type="text"
                placeholder="Search articles, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-[44px] pl-11 pr-4 py-2.5 bg-ivory border border-line text-sm text-ink placeholder:text-stone/60 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Featured Hero Article (when showing all and no search) */}
          {selectedCategory === 'All' && !searchQuery && (
            <div className="bg-ivory border border-line overflow-hidden shadow-soft group hover:border-gold transition-colors duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto bg-ink-soft overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-ink/90 text-gold text-[10px] uppercase tracking-widest font-mono">
                    Featured Editorial
                  </div>
                </div>
                <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-stone font-light">
                      <span className="text-gold font-mono uppercase tracking-wider">{featuredPost.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-4xl font-light text-ink leading-tight group-hover:text-gold transition-colors">
                      <Link to={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-stone text-base font-light leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-line flex items-center justify-between">
                    <div>
                      <p className="text-xs font-normal text-ink">{featuredPost.author}</p>
                      <p className="text-[10px] text-stone font-mono uppercase tracking-wider">{featuredPost.date}</p>
                    </div>
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-3 bg-ink text-cream hover:bg-gold hover:text-cream transition-colors"
                      aria-label={`Read ${featuredPost.title}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-ivory border border-line flex flex-col justify-between group hover:border-gold transition-colors duration-300 shadow-soft"
              >
                <div className="relative aspect-[16/10] bg-ink-soft overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-ink/85 text-gold text-[10px] uppercase font-mono tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-stone font-light">
                      <span className="flex items-center gap-1 font-mono text-[11px]"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono text-[11px]"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>

                    <h3 className="font-display text-xl font-light text-ink leading-snug group-hover:text-gold transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-stone font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-line flex items-center justify-between">
                    <span className="text-xs text-ink font-light">{post.author}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-gold hover:text-ink font-light transition-colors"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center text-stone">
              <p className="text-base font-light">No articles found matching your criteria.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 text-xs uppercase tracking-wider text-gold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
