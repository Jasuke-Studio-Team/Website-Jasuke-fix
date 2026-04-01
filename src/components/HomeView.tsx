import React from 'react';
import { motion } from 'motion/react';
import { VideoPlayer } from './VideoPlayer';
import { PortfolioItem, Article, OriginalIP } from '../types';
import { ArrowRight, Star, Book } from 'lucide-react';

export function HomeView({ portfolio, articles, original_ip }: { 
  portfolio: PortfolioItem[], 
  articles: Article[], 
  original_ip: OriginalIP[] 
}) {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 tavern-embers opacity-40 z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs tracking-widest uppercase font-bold">
            <Star className="w-3 h-3 fill-current" />
            Establishment of Legends
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-none">
            Crafting Legends, <br/>
            <span className="text-primary italic">One Frame</span> at a Time
          </h1>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg mb-12 font-medium">
            Where high-end visual storytelling meets technical mastery. We forge digital worlds for brands that refuse to be forgotten.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20">
              Enter the Tavern
            </button>
            <button className="border border-outline text-on-surface font-bold px-8 py-4 rounded-sm hover:bg-surface-high transition-all">
              Our Portfolio
            </button>
          </div>
        </motion.div>
      </section>

      {/* Featured Video */}
      <section className="max-w-6xl mx-auto px-6">
        <VideoPlayer 
          videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
          className="shadow-primary/10"
        />
      </section>

      {/* Services / Guild Master's Services */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl text-on-surface mb-2">Guild Master's Services</h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <p className="text-on-surface-variant max-w-md md:text-right">
            Select your path to glory. Our artisans specialize in the alchemy of modern technology and classic storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Game Dev', desc: 'Forging complete interactive experiences from mechanics to multiplayer architecture.', icon: '⚔️' },
            { title: 'AR/VR', desc: 'Manifesting the ethereal into the physical realm. High-fidelity immersive solutions.', icon: '👁️' },
            { title: 'Art Outsourcing', desc: 'A battalion of master scribes and sculptors ready to bolster your creative ranks.', icon: '🖌️' }
          ].map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative bg-secondary p-8 rounded-sm overflow-hidden flex flex-col h-full border border-outline/20 hover:border-primary/40 transition-all duration-500"
            >
              <div className="absolute inset-0 wood-grain" />
              <div className="relative z-10">
                <div className="mb-8 w-16 h-16 rounded-sm bg-background border border-primary/30 flex items-center justify-center text-3xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-on-surface-variant mb-8 text-sm leading-relaxed">{service.desc}</p>
                <button className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                  Unlock Path <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Original IP */}
      <section className="bg-surface-high py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary italic mb-4 block">The Ledger of Deeds</span>
              <h2 className="text-5xl text-on-surface mb-8 leading-tight">Legends We've Helped Forge</h2>
              <p className="text-on-surface-variant mb-12">
                Our vault is filled with the stories of guilds and kingdoms we've elevated through digital alchemy. From independent champions to global empires.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-sm hover:brightness-110 active:scale-95 transition-all">
                  View The Archive
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src="https://picsum.photos/seed/game1/400/500" alt="Work 1" className="rounded-sm border-2 border-secondary shadow-xl" />
                <img src="https://picsum.photos/seed/game2/400/400" alt="Work 2" className="rounded-sm border-2 border-secondary shadow-xl" />
              </div>
              <div className="space-y-4">
                <img src="https://picsum.photos/seed/game3/400/400" alt="Work 3" className="rounded-sm border-2 border-secondary shadow-xl" />
                <img src="https://picsum.photos/seed/game4/400/500" alt="Work 4" className="rounded-sm border-2 border-secondary shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
