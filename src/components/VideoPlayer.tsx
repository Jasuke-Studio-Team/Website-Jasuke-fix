import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
  className?: string;
}

export function VideoPlayer({ videoUrl, thumbnail, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(videoUrl);

  if (!videoId) return <div className="bg-surface-high p-4 text-center">Invalid Video URL</div>;

  return (
    <div className={cn("relative w-full aspect-video group overflow-hidden rounded-sm border-[12px] border-secondary shadow-2xl", className)}>
      <div className="absolute inset-0 wood-grain pointer-events-none z-10" />
      
      {!isPlaying ? (
        <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-surface-container-lowest flex items-center justify-center">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Youtube Thumbnail"
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-[0_0_30px_rgba(255,179,0,0.5)] group-hover:scale-110 transition-transform duration-300">
              <Play className="fill-current w-8 h-8 ml-1" />
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 z-20">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase rounded-sm">
              Master's Insight
            </span>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full relative z-20"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {/* Corner Filigree */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 z-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 z-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 z-30 pointer-events-none" />
    </div>
  );
}
