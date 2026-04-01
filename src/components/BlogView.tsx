import React from 'react';
import { motion } from 'motion/react';
import { Article } from '../types';

export function BlogView({ articles }: { articles: Article[] }) {
  return (
    <div className="max-w-5xl mx-auto px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">The Imperial Library</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Behold the Scrolls of Knowledge. A curated collection of ancient wisdom, arcane insights, and legendary crafts.
        </p>
      </div>

      <div className="space-y-16">
        {articles.map((article) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-[#FAFAFA] text-stone-900 rounded-sm parchment-texture shadow-xl overflow-hidden flex flex-col md:flex-row"
          >
            <div className="md:w-1/3 overflow-hidden">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-2/3 p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3 text-stone-500 text-xs font-bold uppercase tracking-widest">
                <span>{article.date}</span>
                <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                <span>{article.category}</span>
              </div>
              <h2 className="text-3xl font-headline font-bold text-stone-950 leading-tight">
                {article.title}
              </h2>
              <p className="text-stone-600 leading-relaxed italic">
                {article.excerpt}
              </p>
              <button className="text-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-4 transition-all">
                Read Scroll →
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
