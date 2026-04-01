import React from 'react';
import { motion } from 'motion/react';
import { PortfolioItem } from '../types';
import { VideoPlayer } from './VideoPlayer';

export function PortfolioView({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">The Grand Archives</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          A collection of artifacts and realms forged by Jasuke Studio. Each piece is a testament to our technical mastery and creative vision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group bg-surface rounded-sm overflow-hidden border border-outline/10 hover:border-primary/30 transition-all"
          >
            <div className="aspect-video overflow-hidden relative">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-widest rounded-sm border border-primary/20">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-6 parchment-texture">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-on-surface-variant text-sm mb-4">{item.description}</p>
              {item.video_url && (
                <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">
                  View Reel
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
