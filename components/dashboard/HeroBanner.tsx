import React, { useState, useEffect } from 'react';
import { FEATURED_GAME } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { ThumbsUp } from 'lucide-react';

const CHARACTER_IMAGES = [
  "https://res.cloudinary.com/du7i7bqna/image/upload/v1763362638/dhruv_qfaaii.png",
  "https://res.cloudinary.com/du7i7bqna/image/upload/v1763364090/Adobe_Express_-_file_qdpj3k.png"
];

export const HeroBanner: React.FC = () => {
  const game = FEATURED_GAME;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CHARACTER_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="col-span-12 p-0 min-h-[280px] lg:h-[400px] group !rounded-[2rem] md:!rounded-[2.5rem] overflow-hidden relative">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
        />
        {/* Gradient to darken background for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-nexus-bg via-nexus-bg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg/80 via-transparent to-transparent" />
      </div>

      {/* Featured Character Images (Slider) */}
      <div className="block absolute right-[10px] md:right-[20px] bottom-0 h-[90%] md:h-[100%] w-[50%] md:w-[55%] pointer-events-none z-0">
        {CHARACTER_IMAGES.map((img, index) => (
          <img 
            key={img}
            src={img} 
            alt="Featured Character" 
            className={`
              absolute bottom-0 right-0 w-full h-full object-contain object-right-bottom 
              drop-shadow-[0_0_50px_rgba(255,76,41,0.3)] filter brightness-110 contrast-110
              transition-opacity duration-1000 ease-in-out
              ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-12 max-w-lg">
        <div className="flex gap-2 mb-2 md:mb-4">
          <span className="px-2 md:px-3 py-1 rounded-full bg-[#FFF0E6] text-nexus-bg text-[10px] md:text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(255,255,255,0.5)]">
             🔥 Popular
          </span>
          <span className="px-2 md:px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] md:text-xs font-medium border border-white/10">
            Steam
          </span>
          <span className="px-2 md:px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] md:text-xs font-medium border border-white/10">
            Epic
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight drop-shadow-lg">
          {game.title}
        </h2>
        
        <p className="text-nexus-muted mb-6 md:mb-8 line-clamp-2 md:line-clamp-3 text-sm md:text-lg leading-relaxed drop-shadow-md max-w-[80%] md:max-w-full">
          {game.description}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
             {[1,2,3].map(i => (
               <img key={i} src={`https://picsum.photos/100?random=${i+10}`} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-nexus-bg shadow-lg" alt="user" />
             ))}
          </div>
          
          <button className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 shadow-glass text-sm md:text-base">
            <ThumbsUp size={16} />
            <span className="font-semibold">+53 Reviews</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};