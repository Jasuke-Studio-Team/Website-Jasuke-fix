import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Article } from '../types';
import { SEOHead } from './SEOHead';

// Convert a YouTube watch URL to embed URL
function toYouTubeEmbed(url: string): string {
  try {
    const u = new URL(url);
    let id = '';
    if (u.hostname.includes('youtu.be')) {
      id = u.pathname.slice(1);
    } else {
      id = u.searchParams.get('v') || '';
    }
    return id ? `https://www.youtube.com/embed/${id}` : '';
  } catch {
    return '';
  }
}

// Simple paragraph renderer — splits content by double newlines into <p> blocks
function renderContent(text: string) {
  return text
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((para, i) => (
      <p key={i} className="leading-[1.85] text-stone-700 text-[17px]">
        {para.trim()}
      </p>
    ));
}

interface ArticleViewProps {
  allArticles: Article[];
}

export function ArticleView({ allArticles }: ArticleViewProps) {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();

  const article = allArticles.find((a) => a.id === articleId);
  const related = allArticles.filter((a) => a.id !== articleId).slice(0, 4);

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold text-on-surface">Scroll Not Found</h1>
        <p className="text-on-surface-variant">The ancient scroll you seek does not exist in our archives.</p>
        <Link
          to="/blog"
          className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-sm hover:brightness-110 transition-all"
        >
          Return to the Library
        </Link>
      </div>
    );
  }

  const embedUrl = article.video_url ? toYouTubeEmbed(article.video_url) : '';

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title={article.title}
        description={article.excerpt}
        canonicalPath={`/article/${article.id}`}
        ogImage={article.image_url}
      />

      {/* ── Left Sidebar: Related Articles ─────────────────────── */}
      <aside className="hidden xl:flex flex-col h-screen fixed left-0 top-0 z-40 w-72 border-r border-stone-800 bg-stone-950/95 backdrop-blur-xl pt-24 overflow-y-auto">
        <div className="px-6 mb-6">
          {/* Back button */}
          <Link
            to="/blog"
            className="flex items-center gap-2 text-xs text-amber-500/70 hover:text-amber-400 uppercase tracking-widest font-bold mb-6 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Scrolls
          </Link>
          <h3 className="text-amber-500 text-xs tracking-widest uppercase font-bold">The Archives</h3>
          <p className="text-stone-200 text-xl font-headline mt-1">More to Read</p>
        </div>

        <nav className="flex flex-col gap-6 px-6">
          {related.map((rel) => (
            <Link
              key={rel.id}
              to={`/article/${rel.id}`}
              className="group flex flex-col gap-3 text-left transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded border border-stone-800 group-hover:border-amber-500/40 transition-all duration-500">
                <img
                  src={rel.image_url}
                  alt={rel.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-amber-500/70 uppercase tracking-tighter">
                  {rel.category}
                </span>
                <h4 className="text-stone-300 group-hover:text-amber-400 text-sm font-bold leading-tight transition-colors">
                  {rel.title}
                </h4>
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-6">
          <Link
            to="/blog"
            className="text-xs text-stone-500 hover:text-amber-500 transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            View All Scrolls →
          </Link>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────── */}
      <main className="xl:ml-72">
        {/* Mobile back button */}
        <div className="xl:hidden px-6 pt-6">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-xs text-amber-500/70 hover:text-amber-400 uppercase tracking-widest font-bold transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Scrolls
          </Link>
        </div>

        {/* Article Hero Header */}
        <header className="relative h-[540px] flex items-end justify-center overflow-hidden bg-stone-950">
          <div className="absolute inset-0 z-0">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover grayscale opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl px-8 pb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="bg-primary/10 text-primary px-3 py-1 text-xs tracking-widest uppercase font-bold border border-primary/20">
                {article.category}
              </span>
              <span className="text-stone-500 text-xs tracking-widest uppercase">{article.date}</span>
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="font-serif italic text-on-surface-variant text-sm">
              Authored by {article.author}
            </p>
          </motion.div>
        </header>

        {/* Article Body — light cream background for readability */}
        <article className="w-full py-20" style={{ backgroundColor: '#FAFAF8', color: '#1B1B1C' }}>
          <div className="max-w-3xl mx-auto px-6">

            {/* Lead / Excerpt */}
            <p className="text-xl md:text-2xl font-headline italic mb-12 text-stone-600 leading-relaxed border-l-4 border-amber-500 pl-8">
              {article.excerpt}
            </p>

            {/* Body paragraphs */}
            <div className="space-y-7 font-body">
              {renderContent(article.content)}
            </div>

            {/* YouTube embed (if available) */}
            {embedUrl && (
              <div className="my-16 group relative">
                <div className="absolute -inset-4 bg-amber-500/5 rounded-3xl blur-2xl group-hover:bg-amber-500/10 transition-all duration-700" />
                <div className="relative aspect-video w-full overflow-hidden shadow-2xl rounded-xl">
                  <iframe
                    src={embedUrl}
                    title={article.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-center text-sm text-stone-400 mt-4 font-serif italic">
                  Watch: {article.title}
                </p>
              </div>
            )}

            {/* Tags & Share */}
            <div className="mt-20 pt-10 border-t border-stone-200 flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-stone-100 text-stone-600 px-4 py-1 text-xs font-bold rounded-sm uppercase tracking-wide">
                  #{article.category}
                </span>
                <span className="bg-stone-100 text-stone-600 px-4 py-1 text-xs font-bold rounded-sm uppercase tracking-wide">
                  #Jasuke
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                }}
                className="text-xs text-stone-400 hover:text-amber-600 uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
              >
                Share Scroll ↗
              </button>
            </div>
          </div>
        </article>

        {/* Mobile Related Articles */}
        {related.length > 0 && (
          <section className="xl:hidden bg-stone-950 py-16 border-t border-stone-800">
            <div className="max-w-3xl mx-auto px-6">
              <h3 className="text-amber-500 text-xs tracking-widest uppercase font-bold mb-2">The Archives</h3>
              <p className="text-on-surface text-2xl font-headline mb-8">More to Read</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/article/${rel.id}`}
                    className="group text-left flex flex-col gap-3 transition-all"
                  >
                    <div className="aspect-video overflow-hidden rounded border border-stone-800 group-hover:border-amber-500/40 transition-all">
                      <img src={rel.image_url} alt={rel.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-500/70 uppercase tracking-tighter">{rel.category}</span>
                      <h4 className="text-stone-300 group-hover:text-amber-400 text-sm font-bold leading-tight transition-colors mt-1">{rel.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="bg-stone-950 py-20 border-t border-amber-500/10">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-4">
              Enjoyed the Scroll?
            </h2>
            <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
              Return to the Imperial Library and discover more chronicles from the Hearth.
            </p>
            <Link
              to="/blog"
              className="inline-block bg-primary text-primary-foreground font-bold px-8 py-3 rounded-sm hover:scale-105 transition-transform"
            >
              Back to All Scrolls
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
