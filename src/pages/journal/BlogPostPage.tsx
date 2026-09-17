import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, Tag, BookOpen, Quote } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { BLOG_POSTS } from '../../data/blog';
import { Button } from '../../components/ui/Button';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} | The Omaxe Journal`;
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div className="flex-1 bg-cream text-ink py-32 px-5 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="font-display text-4xl font-light text-ink">Article Not Found</h1>
          <p className="text-stone text-sm">The journal article you requested could not be located.</p>
          <Button to="/blog" variant="solid">Return to The Journal</Button>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex-1 bg-cream text-ink">
      {/* Header Banner */}
      <section className="bg-ivory border-b border-line py-16 sm:py-24 px-5 sm:px-8 lg:px-16">
        <div className="max-w-[1080px] mx-auto space-y-8">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'The Journal', path: '/blog' },
              { label: post.title },
            ]}
          />

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.18em]">
              <span className="px-3 py-1 bg-cream border border-line text-gold font-medium">
                {post.category}
              </span>
              <span className="text-stone flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="text-line">·</span>
              <span className="text-stone flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-display text-[40px] sm:text-5xl lg:text-[64px] font-light text-ink leading-[1.08] tracking-[-0.03em]">
              {post.title}
            </h1>

            <p className="text-stone text-lg sm:text-xl font-light leading-relaxed max-w-[65ch]">
              {post.excerpt}
            </p>

            <div className="pt-6 border-t border-line flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone font-light block">Author</span>
                <span className="font-display text-base font-normal text-ink">{post.author}</span>
              </div>
              <button
                onClick={handleShare}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 border border-line hover:border-gold text-xs uppercase tracking-wider text-stone hover:text-ink transition-colors cursor-pointer"
                title="Share this article"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Visual Image */}
      <section className="max-w-[1080px] mx-auto px-5 sm:px-8 -mt-6">
        <div className="relative aspect-[21/10] bg-ink-soft border border-line shadow-soft overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Body Content */}
      <article className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-[760px] mx-auto space-y-10 text-ink">
          {/* Rich content parsed into stylized paragraphs */}
          <div className="space-y-8 font-light text-base sm:text-lg leading-[1.85] text-stone">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={idx}
                    className="font-display text-2xl sm:text-3xl text-ink font-light mt-12 mb-4 pt-6 border-t border-line"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }

              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote
                    key={idx}
                    className="my-8 pl-6 border-l-2 border-gold italic font-display text-xl sm:text-2xl text-ink leading-relaxed"
                  >
                    &ldquo;{paragraph.replace('> ', '')}&rdquo;
                  </blockquote>
                );
              }

              // First paragraph gets a drop-cap style
              if (idx === 0) {
                const firstLetter = paragraph.charAt(0);
                const restOfText = paragraph.slice(1);
                return (
                  <p key={idx} className="first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-gold first-letter:font-light text-ink">
                    {paragraph}
                  </p>
                );
              }

              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="pt-10 border-t border-line flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-stone font-mono mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-ivory border border-line text-xs font-light text-ink"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-16 bg-ivory border-t border-line">
        <div className="max-w-[1080px] mx-auto space-y-12">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-normal uppercase tracking-[0.18em] text-gold block">
                Continue Reading
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-ink">
                Related Articles
              </h3>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold hover:text-ink font-light transition-colors"
            >
              <span>All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                to={`/blog/${related.slug}`}
                className="bg-cream border border-line p-6 group hover:border-gold transition-colors space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono text-gold tracking-wider">{related.category}</span>
                  <h4 className="font-display text-xl font-light text-ink group-hover:text-gold transition-colors leading-snug">
                    {related.title}
                  </h4>
                  <p className="text-xs text-stone font-light line-clamp-2">
                    {related.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-stone pt-4 border-t border-line">
                  <span>{related.author}</span>
                  <span className="text-gold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
