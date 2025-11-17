import React from 'react';
import { NEW_GAMES } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { ChevronRight, Play, ShoppingBag } from 'lucide-react';

export const GameCards: React.FC = () => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">New Games</h3>
        <span className="text-sm text-nexus-muted cursor-pointer hover:text-white transition-colors">See More</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NEW_GAMES.slice(0, 2).map((game, index) => (
          <GlassCard key={game.id} className="p-6 group !rounded-[2rem] h-64 flex flex-col justify-end relative" hoverEffect>
             {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                src={game.imageUrl} 
                alt={game.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg via-nexus-bg/40 to-transparent" />
            </div>

            <div className="relative z-10">
                {index === 0 && (
                    <div className="absolute -top-48 left-0 flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-nexus-accent text-white flex items-center justify-center shadow-glow hover:scale-110 transition-transform">
                            <Play size={16} fill="currentColor" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white text-nexus-bg flex items-center justify-center hover:scale-110 transition-transform">
                            <ShoppingBag size={16} />
                        </button>
                    </div>
                )}

                <h4 className="text-2xl font-bold text-white mb-1">{game.title}</h4>
                <p className="text-nexus-muted text-sm line-clamp-2 mb-2">{game.description}</p>
                
                {/* Decoration for card 2 */}
                {index === 1 && (
                   <div className="absolute bottom-2 right-0 bg-white/10 p-2 rounded-full backdrop-blur-md">
                       <ChevronRight className="text-white" />
                   </div>
                )}
            </div>
          </GlassCard>
        ))}
        
        {/* See All / More Card Placeholder */}
        <div className="hidden md:flex items-center justify-center">
           <button className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5">
               <ChevronRight className="text-white" />
           </button>
        </div>
      </div>
    </div>
  );
};