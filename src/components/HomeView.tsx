import React from 'react';
import { motion } from 'motion/react';
import { VideoPlayer } from './VideoPlayer';
import { PortfolioItem, Article, TeamMember } from '../types';
import { ArrowRight, Star, Mail } from 'lucide-react';

export function HomeView({ portfolio, articles, team, onContactClick, onPortfolioClick }: { 
  portfolio: PortfolioItem[], 
  articles: Article[],
  team: TeamMember[],
  onContactClick: () => void,
  onPortfolioClick: () => void,
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
            <button 
              onClick={onContactClick}
              className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              Enter the Tavern
            </button>
            <button 
              onClick={onPortfolioClick}
              className="border border-outline text-on-surface font-bold px-8 py-4 rounded-sm hover:bg-surface-high transition-all"
            >
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

      {/* Contact Form Section */}
      <section id="contact-form" className="max-w-4xl mx-auto px-8 py-24 bg-surface-high/50 rounded-2xl border border-primary/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 opacity-5 pointer-events-none">
           <Mail className="w-64 h-64 text-primary" />
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Send a Raven</h2>
            <p className="text-on-surface-variant italic">Have a quest for us? Our master artisans are ready to forge your vision.</p>
            <div className="h-1 w-24 bg-primary mx-auto mt-6"></div>
          </div>

          <form 
            action="https://formsubmit.co/Jasukestd@gmail.com" 
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="_subject" value="New Quest from Jasuke Studio!" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-primary/80">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full bg-background border border-outline/30 rounded-sm px-4 py-3 focus:border-primary transition-colors outline-none text-on-surface"
                  placeholder="Artisan Name..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-primary/80">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full bg-background border border-outline/30 rounded-sm px-4 py-3 focus:border-primary transition-colors outline-none text-on-surface"
                  placeholder="Scroll@kingdom.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-primary/80">Subject</label>
              <input 
                type="text" 
                name="subject" 
                required 
                className="w-full bg-background border border-outline/30 rounded-sm px-4 py-3 focus:border-primary transition-colors outline-none text-on-surface"
                placeholder="The Nature of your Quest..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-primary/80">Message</label>
              <textarea 
                name="message" 
                required 
                rows={5}
                className="w-full bg-background border border-outline/30 rounded-sm px-4 py-3 focus:border-primary transition-colors outline-none text-on-surface resize-none"
                placeholder="Describe the legend you wish to forge..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 uppercase tracking-widest"
            >
              Dispatch Raven
            </button>
          </form>
        </div>
      </section>
      {/* The Team / The Guild Artisans */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="text-center mb-16">
          <span className="text-primary italic mb-2 block font-medium">The High Council</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Guild Artisans</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-[#1a1a1a] rounded-t-full rounded-b-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl w-full max-w-[260px] flex flex-col items-center text-center"
            >
              {/* Photo Container */}
              <div className="relative h-64 w-full overflow-hidden rounded-t-full">
                <img 
                  src={member.photo_url} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60"></div>
                
                {/* Role Badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-4">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm">
                    {member.role === '-' ? 'Artisan' : member.role}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-on-surface-variant text-xs leading-relaxed mb-6 line-clamp-3">
                  {member.description}
                </p>
                
                {member.portfolio && member.portfolio !== '-' && (
                  <a 
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/0 hover:border-primary transition-all group/link underline decoration-primary/20 underline-offset-8"
                  >
                    View Scroll <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                  </a>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 right-8 p-0 opacity-10 group-hover:opacity-100 transition-opacity">
                <Star className="w-5 h-5 text-primary fill-current" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
