import React from 'react';
import { motion } from 'motion/react';
import { Article } from '../types';

interface BlogViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export function BlogView({ articles, onSelectArticle }: BlogViewProps) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-24">
      <div className="text-center mb-16">
        <span className="inline-block mb-4 px-4 py-1.5 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest bg-primary/5">
          The Imperial Library
        </span>
        <h1 className="text-5xl font-bold mb-4">The Scrolls</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Behold the Scrolls of Knowledge. A curated collection of ancient wisdom, arcane insights, and legendary crafts.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-on-surface-variant">No scrolls found.</p>
      ) : (
        <div className="space-y-12">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer bg-[#FAFAF8] text-stone-900 rounded-sm parchment-texture shadow-xl overflow-hidden flex flex-col md:flex-row hover:shadow-amber-500/10 hover:shadow-2xl transition-all duration-500"
            >
              {/* Thumbnail */}
              <div className="md:w-2/5 overflow-hidden relative flex-shrink-0">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-56 md:h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Category overlay */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 md:p-10 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-stone-400 text-xs font-bold uppercase tracking-widest">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 bg-stone-300 rounded-full" />
                    <span>{article.author}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold text-stone-950 leading-tight group-hover:text-amber-800 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-stone-500 leading-relaxed italic line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-amber-600 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                  Read Scroll
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>

                {/* Animated bottom border */}
                <div className="h-0.5 w-0 bg-amber-500 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
