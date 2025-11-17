import React from 'react';
import { HUB_GAMES } from '../../constants';
import { PlayableGame } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Play, Gamepad2 } from 'lucide-react';

interface HubLibraryProps {
  onPlayGame: (game: PlayableGame) => void;
}

export const HubLibrary: React.FC<HubLibraryProps> = ({ onPlayGame }) => {
  return (
    <div className="col-span-12 mt-2 md:mt-6">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
          <Gamepad2 className="text-nexus-accent" size={20} />
          Arcade Hub
        </h3>
        <span className="text-xs md:text-sm text-nexus-muted">Premium Mini-Games</span>
      </div>

      {/* Adjusted grid to be 2 cols on small screens (landscape mobile) and up to 3 on large */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {HUB_GAMES.map((game) => (
          <GlassCard 
            key={game.id} 
            className="group relative overflow-hidden !rounded-[1.5rem] md:!rounded-[2rem] h-48 md:h-64 border-opacity-50 hover:border-nexus-accent/50"
            hoverEffect
          >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                  src={game.thumbnailUrl} 
                  alt={game.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#230F12] via-[#230F12]/50 to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-10">
                <div className="flex justify-end">
                    <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-nexus-glass backdrop-blur-md text-[10px] md:text-xs font-bold text-white border border-white/10">
                        INSTANT PLAY
                    </span>
                </div>

                <div>
                    <h4 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 tracking-tight">{game.title}</h4>
                    <p className="text-nexus-muted text-xs md:text-sm line-clamp-2 mb-2 md:mb-4">{game.description}</p>
                    
                    <button 
                        onClick={() => onPlayGame(game)}
                        className="w-full py-2 md:py-3 bg-nexus-accent text-white rounded-lg md:rounded-xl font-bold shadow-glow flex items-center justify-center gap-2 text-xs md:text-sm transform translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300"
                    >
                        <Play size={16} fill="currentColor" />
                        PLAY NOW
                    </button>
                </div>
            </div>
          </GlassCard>
        ))}

        {/* Coming Soon Placeholder */}
        <GlassCard className="flex flex-col items-center justify-center p-4 md:p-6 !rounded-[1.5rem] md:!rounded-[2rem] h-48 md:h-64 border-dashed border-nexus-muted/30">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mb-2 md:mb-4">
                <Gamepad2 className="text-nexus-muted" size={24} />
            </div>
            <span className="text-nexus-muted font-medium text-xs md:text-base text-center">More Games Coming Soon</span>
        </GlassCard>
      </div>
    </div>
  );
};