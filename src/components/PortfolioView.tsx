import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem } from '../types';
import { SEOHead } from './SEOHead';

// Convert YouTube watch/short URL to embed URL
function toYouTubeEmbed(url: string): string {
  try {
    const u = new URL(url);
    let id = '';
    if (u.hostname.includes('youtu.be')) {
      id = u.pathname.slice(1).split('?')[0];
    } else {
      id = u.searchParams.get('v') || '';
    }
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : '';
  } catch {
    return '';
  }
}

export function PortfolioView({ items }: { items: PortfolioItem[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = items.map(item => item.category).filter(c => c && c !== '-');
    return ['All', ...Array.from(new Set(cats))];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter(item => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <SEOHead 
        title="Portfolio"
        description="Explore the Grand Archives — a collection of games, 3D models, AR/VR experiences, and creative works forged by Jasuke Studio."
        canonicalPath="/portfolio"
      />
      <div className="text-center mb-16">
        <span className="inline-block mb-4 px-4 py-1.5 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest bg-primary/5">
          The Guild Archives
        </span>
        <h1 className="text-5xl font-bold mb-4">The Grand Archives</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          A collection of artifacts and realms forged by Jasuke Studio. Each piece is a testament to our technical mastery and creative vision.
        </p>
      </div>

      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-surface-high text-on-surface-variant border border-outline/10 hover:border-primary/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <p className="text-center text-on-surface-variant">No items found.</p>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-surface rounded-sm overflow-hidden border border-outline/10 hover:border-primary/30 transition-all duration-500 flex flex-col"
              >
              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden relative flex-shrink-0">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-background/80 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-widest rounded-sm border border-primary/20">
                    {item.category}
                  </span>
                </div>

                {/* Video teaser overlay */}
                {item.video_url && (
                  <button
                    onClick={() => setActiveVideo(item.video_url!)}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-500 cursor-pointer"
                    aria-label={`Watch ${item.title} teaser`}
                  >
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                      <span className="text-primary-foreground text-2xl ml-1">▶</span>
                    </div>
                  </button>
                )}

                {/* Bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-surface to-transparent" />
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-2 border-t border-outline/10 flex-wrap">
                  {item.video_url && (
                    <button
                      onClick={() => setActiveVideo(item.video_url!)}
                      className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest hover:text-primary/70 transition-colors"
                    >
                      ▶ Video Teaser
                    </button>
                  )}
                  {item.project_link && (
                    <a
                      href={item.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors ml-auto"
                    >
                      View Project ↗
                    </a>
                  )}
                </div>
              </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Video Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {toYouTubeEmbed(activeVideo) ? (
                <iframe
                  src={toYouTubeEmbed(activeVideo)}
                  title="Video Teaser"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video src={activeVideo} controls autoPlay className="w-full h-full" />
              )}

              {/* Close button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/60 hover:bg-black/90 rounded-full flex items-center justify-center text-white text-lg transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
