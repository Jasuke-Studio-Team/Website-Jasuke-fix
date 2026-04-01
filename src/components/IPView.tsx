import React from 'react';
import { motion } from 'motion/react';
import { OriginalIP } from '../types';
import { cn } from '@/src/lib/utils';

export function IPView({ ips }: { ips: OriginalIP[] }) {
  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Original Chronicles</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          From the ink-stained parchment of our master scribes, legends take flight. Witness the chronicles of worlds born within the Hearth.
        </p>
      </div>

      <div className="space-y-24">
        {ips.map((ip, i) => (
          <motion.div
            key={ip.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn(
              "flex flex-col md:flex-row gap-12 items-center",
              i % 2 !== 0 && "md:flex-row-reverse"
            )}
          >
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 border-4 border-primary/20 rounded-sm group-hover:border-primary/40 transition-all" />
              <img 
                src={ip.image_url} 
                alt={ip.title} 
                className="relative z-10 w-full rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                {ip.status}
              </div>
              <h2 className="text-4xl font-bold">{ip.title}</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {ip.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-surface-high rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: ip.lore_index }}
                    className="h-full bg-primary"
                  />
                </div>
                <span className="text-xs font-bold text-primary">LORE INDEX: {ip.lore_index}</span>
              </div>
              <button className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-sm">
                Read Scroll
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
