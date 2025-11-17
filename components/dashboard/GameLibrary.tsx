import React from 'react';
import { HUB_GAMES, NEW_GAMES, FEATURED_GAME } from '../../constants';
import { PlayableGame } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Play, Star, Zap, Info } from 'lucide-react';

interface GameLibraryProps {
  onPlayGame: (game: PlayableGame) => void;
}

export const GameLibrary: React.FC<GameLibraryProps> = ({ onPlayGame }) => {
  return (
    <div className="col-span-12 animate-in fade-in zoom-in duration-300">
      {/* Header text block removed as requested */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {/* 1. INSTANT PLAY GAMES (HUB_GAMES) */}
        {HUB_GAMES.map((game) => (
            <GlassCard key={game.id} className="group overflow-hidden !rounded-[2rem] min-h-[320px] flex flex-col" hoverEffect>
                <div className="relative h-48 overflow-hidden">
                    <img src={game.thumbnailUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={game.title} />
                    <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full bg-nexus-accent text-white text-[10px] font-bold shadow-glow flex items-center gap-1">
                            <Zap size={12} fill="currentColor"/> INSTANT
                        </span>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-nexus-muted text-sm line-clamp-2 mb-4 flex-1">{game.description}</p>
                    <button 
                        onClick={() => onPlayGame(game)}
                        className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                        <Play size={18} fill="currentColor" /> PLAY NOW
                    </button>
                </div>
            </GlassCard>
        ))}

        {/* 2. FEATURED GAME (Non-playable link) */}
        <GlassCard className="group overflow-hidden !rounded-[2rem] min-h-[320px] flex flex-col border-nexus-accent/50" hoverEffect>
             <div className="relative h-48 overflow-hidden">
                <img src={FEATURED_GAME.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={FEATURED_GAME.title} />
                <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                        ECOSYSTEM
                    </span>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">{FEATURED_GAME.title}</h3>
                <p className="text-nexus-muted text-sm line-clamp-2 mb-4 flex-1">{FEATURED_GAME.description}</p>
                <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-nexus-glass border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/5">
                        <Info size={18} /> DETAILS
                    </button>
                </div>
            </div>
        </GlassCard>

        {/* 3. OTHER GAMES (NEW_GAMES) */}
        {NEW_GAMES.map((game) => (
             <GlassCard key={game.id} className="group overflow-hidden !rounded-[2rem] min-h-[320px] flex flex-col" hoverEffect>
                <div className="relative h-48 overflow-hidden">
                    <img src={game.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={game.title} />
                    <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                            <Star size={10} className="text-yellow-400 fill-yellow-400" /> {game.rating}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-nexus-muted text-sm line-clamp-2 mb-4 flex-1">{game.description}</p>
                    <button className="w-full py-3 bg-nexus-glass border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                         BUY NOW
                    </button>
                </div>
            </GlassCard>
        ))}
      </div>
    </div>
  );
};