import React from 'react';
import { motion } from 'motion/react';
import { IPReadyItem, IPInProgressStage } from '../types';
import { cn } from '@/src/lib/utils';

const statusColors: Record<string, string> = {
  completed:    'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  'in progress':'bg-amber-500/10  border-amber-500/30  text-amber-400',
  'not started':'bg-stone-500/10  border-stone-500/30  text-stone-400',
};

function getStatusClass(status: string) {
  return statusColors[status.toLowerCase()] ?? 'bg-primary/10 border-primary/20 text-primary';
}

// Convert YouTube URL to embed
function toYouTubeEmbed(url: string): string {
  try {
    const u = new URL(url);
    let id = '';
    if (u.hostname.includes('youtu.be')) id = u.pathname.slice(1).split('?')[0];
    else id = u.searchParams.get('v') || '';
    return id ? `https://www.youtube.com/embed/${id}` : '';
  } catch { return ''; }
}

interface IPViewProps {
  ipReady: IPReadyItem[];
  ipInProgress: IPInProgressStage[];
}

export function IPView({ ipReady, ipInProgress }: IPViewProps) {
  // Derive project title & description from the first stage row
  const projectTitle = ipInProgress.find(s => s.project_title?.trim())?.project_title?.trim()
    || 'Original Chronicles';
  const projectDescription = ipInProgress.find(s => s.project_description?.trim())?.project_description?.trim()
    || 'The chronicles that are still being written — progress etched in fire and ink.';

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 space-y-32">

      {/* ── Section 1 : See our IP (IP Ready) ─────────────────── */}
      <section>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest bg-primary/5">
            The Archives
          </span>
          <h1 className="text-5xl font-bold mb-4">See our IP</h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Worlds forged within the Hearth — each a living chronicle, waiting to be explored.
          </p>
        </motion.div>

        {ipReady.length === 0 ? (
          <p className="text-center text-on-surface-variant">No IP found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ipReady.map((item, i) => {
              const embedUrl = item.teaser_url ? toYouTubeEmbed(item.teaser_url) : '';
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative bg-surface border border-secondary/30 rounded-sm overflow-hidden hover:border-primary/40 transition-all duration-500 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <h2 className="text-lg font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-on-surface-variant leading-relaxed flex-1 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Action links */}
                    <div className="flex items-center gap-3 pt-2 border-t border-secondary/20 flex-wrap">
                      {item.teaser_url && (
                        <a
                          href={item.teaser_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-primary uppercase tracking-widest hover:underline"
                        >
                          ▶ Watch Teaser
                        </a>
                      )}
                      {item.download_link && (
                        <a
                          href={item.download_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors ml-auto"
                        >
                          Try it ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Animated bottom accent */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Section 2 : In the Forge (IP In Progress) ─────────── */}
      <section>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest bg-primary/5">
            In the Forge
          </span>
          {/* Project title — dynamic from spreadsheet col A */}
          <h2 className="text-5xl font-bold mb-4">{projectTitle}</h2>
          {/* Project description — dynamic from spreadsheet col B */}
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            {projectDescription}
          </p>
        </motion.div>

        <div className="space-y-20">
          {ipInProgress.map((stage, i) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cn(
                'flex flex-col md:flex-row gap-10 items-center',
                i % 2 !== 0 && 'md:flex-row-reverse'
              )}
            >
              {/* Image — 50% smaller (max-height 220px) */}
              <div className="w-full md:w-2/5 relative group flex-shrink-0">
                <div className="absolute -inset-3 border-2 border-primary/20 rounded-sm group-hover:border-primary/40 transition-all" />
                <img
                  src={stage.image_url}
                  alt={stage.stage_name}
                  className="relative z-10 w-full rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
                  style={{ maxHeight: '220px', objectFit: 'cover' }}
                />
              </div>

              {/* Text */}
              <div className="flex-1 space-y-4">
                <span className="text-xs font-bold text-primary/50 uppercase tracking-widest">
                  Stage {i + 1}
                </span>
                <div className={cn(
                  'inline-block px-3 py-1 border text-xs font-bold uppercase tracking-widest',
                  getStatusClass(stage.status)
                )}>
                  {stage.status}
                </div>
                <h3 className="text-3xl font-bold">{stage.stage_name}</h3>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  {stage.progress_note}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-px flex-1 bg-surface-high" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Target: {stage.target_date}
                  </span>
                  <div className="h-px flex-1 bg-surface-high" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
