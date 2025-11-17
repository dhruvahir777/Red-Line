import React, { useState } from 'react';
import { LEADERBOARD_DATA, FRIENDS_LIST } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { Trophy, User, X, Crown, Medal } from 'lucide-react';

export const Community: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="text-yellow-400 fill-yellow-400" size={24} />;
    if (index === 1) return <Medal className="text-gray-300 fill-gray-300" size={24} />;
    if (index === 2) return <Medal className="text-orange-500 fill-orange-500" size={24} />;
    return <span className="text-nexus-muted font-bold text-lg">#{index + 1}</span>;
  };

  const getRankStyle = (index: number) => {
      if (index === 0) return "bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]";
      if (index === 1) return "bg-gray-400/10 border-gray-400/50";
      if (index === 2) return "bg-orange-500/10 border-orange-500/50";
      return "bg-nexus-glass border-nexus-glassBorder";
  };

  return (
    <div className="col-span-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Leaderboard Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-lg">Global <span className="text-nexus-accent">Legends</span></h2>
        <p className="text-nexus-muted">The elite players of Redline Galaxy</p>
      </div>

      {/* Top 3 Podium Display (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8">
        {/* 2nd Place */}
        <div 
            onClick={() => setSelectedProfile(LEADERBOARD_DATA[1])}
            className="order-2 md:order-1 cursor-pointer group"
        >
            <GlassCard className="flex flex-col items-center p-6 !bg-gradient-to-b from-gray-900/80 to-gray-800/50 border-gray-600/30 relative overflow-hidden hover:scale-105 transition-transform">
                <div className="absolute top-0 inset-x-0 h-1 bg-gray-400 shadow-[0_0_20px_gray]"></div>
                <div className="w-20 h-20 rounded-full border-4 border-gray-400 p-1 mb-4">
                    <img src={LEADERBOARD_DATA[1].avatar} className="w-full h-full rounded-full object-cover" alt="" />
                </div>
                <div className="text-2xl font-bold text-gray-300 mb-1">{LEADERBOARD_DATA[1].name}</div>
                <div className="text-gray-500 font-mono mb-4">{LEADERBOARD_DATA[1].score.toLocaleString()} XP</div>
                <div className="bg-gray-400/20 px-4 py-1 rounded-full text-gray-300 text-xs font-bold">RANK 2</div>
            </GlassCard>
        </div>

        {/* 1st Place (Center, Bigger) */}
        <div 
            onClick={() => setSelectedProfile(LEADERBOARD_DATA[0])}
            className="order-1 md:order-2 cursor-pointer group -mt-8 z-10"
        >
            <GlassCard className="flex flex-col items-center p-8 !bg-gradient-to-b from-yellow-900/80 to-nexus-bg border-yellow-500/50 relative overflow-hidden hover:scale-105 transition-transform shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                 <div className="absolute top-0 inset-x-0 h-1 bg-yellow-500 shadow-[0_0_20px_gold]"></div>
                 <div className="absolute -top-10 inset-x-0 flex justify-center">
                     <div className="bg-yellow-500/20 blur-3xl w-full h-32"></div>
                 </div>
                 <Crown className="text-yellow-500 fill-yellow-500 mb-4 animate-bounce" size={40} />
                <div className="w-28 h-28 rounded-full border-4 border-yellow-500 p-1 mb-4 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                    <img src={LEADERBOARD_DATA[0].avatar} className="w-full h-full rounded-full object-cover" alt="" />
                </div>
                <div className="text-3xl font-black text-white mb-1">{LEADERBOARD_DATA[0].name}</div>
                <div className="text-yellow-500 font-mono font-bold text-xl mb-6">{LEADERBOARD_DATA[0].score.toLocaleString()} XP</div>
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 px-6 py-2 rounded-full text-black font-black text-sm shadow-lg">CHAMPION</div>
            </GlassCard>
        </div>

        {/* 3rd Place */}
        <div 
            onClick={() => setSelectedProfile(LEADERBOARD_DATA[2])}
            className="order-3 md:order-3 cursor-pointer group"
        >
            <GlassCard className="flex flex-col items-center p-6 !bg-gradient-to-b from-orange-900/80 to-orange-800/50 border-orange-600/30 relative overflow-hidden hover:scale-105 transition-transform">
                <div className="absolute top-0 inset-x-0 h-1 bg-orange-500 shadow-[0_0_20px_orange]"></div>
                <div className="w-20 h-20 rounded-full border-4 border-orange-600 p-1 mb-4">
                    <img src={LEADERBOARD_DATA[2].avatar} className="w-full h-full rounded-full object-cover" alt="" />
                </div>
                <div className="text-2xl font-bold text-orange-200 mb-1">{LEADERBOARD_DATA[2].name}</div>
                <div className="text-orange-500/70 font-mono mb-4">{LEADERBOARD_DATA[2].score.toLocaleString()} XP</div>
                <div className="bg-orange-500/20 px-4 py-1 rounded-full text-orange-400 text-xs font-bold">RANK 3</div>
            </GlassCard>
        </div>
      </div>

      {/* Rest of the Leaderboard List */}
      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {LEADERBOARD_DATA.slice(3).map((player, index) => (
             <div 
                key={player.id}
                onClick={() => setSelectedProfile(player)}
                className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-nexus-accent/50 hover:scale-[1.01] transition-all cursor-pointer"
             >
                 <div className="w-12 text-center font-bold text-nexus-muted">#{index + 4}</div>
                 <img src={player.avatar} className="w-12 h-12 rounded-full border border-white/10" alt="" />
                 <div className="flex-1">
                     <h4 className="text-white font-bold text-lg">{player.name}</h4>
                     <span className="text-xs text-nexus-muted uppercase tracking-widest">Elite Member</span>
                 </div>
                 <div className="text-right px-4">
                     <span className="block text-white font-mono font-bold">{player.score.toLocaleString()}</span>
                 </div>
             </div>
          ))}
      </div>
      
      {/* Friends Online Section (Bonus) */}
      <div className="mt-12 pt-8 border-t border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Friends Online</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {FRIENDS_LIST.map(friend => (
                 <GlassCard key={friend.id} className="p-3 flex items-center gap-3" hoverEffect>
                     <div className="relative">
                         <img src={friend.avatarUrl} className="w-10 h-10 rounded-full" alt=""/>
                         <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${friend.status === 'online' ? 'bg-green-500' : friend.status === 'in-game' ? 'bg-nexus-accent' : 'bg-gray-500'}`}></div>
                     </div>
                     <div className="overflow-hidden">
                         <div className="text-sm font-bold text-white truncate">{friend.name}</div>
                         <div className="text-[10px] text-nexus-muted truncate">
                             {friend.status === 'in-game' ? `Playing ${friend.game}` : friend.status}
                         </div>
                     </div>
                 </GlassCard>
             ))}
          </div>
      </div>

      {/* Profile Modal (Reused logic) */}
      {selectedProfile && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setSelectedProfile(null)}>
              <div className="w-full max-w-md transform transition-all scale-100" onClick={e => e.stopPropagation()}>
                <GlassCard className="!rounded-[2.5rem] p-0 relative overflow-hidden border-nexus-accent/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {/* Close */}
                    <button 
                        onClick={() => setSelectedProfile(null)}
                        className="absolute top-6 right-6 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white z-20 backdrop-blur-md"
                    >
                        <X size={20} />
                    </button>

                    {/* Header BG */}
                    <div className="h-40 bg-gradient-to-br from-nexus-accent to-purple-900 relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                    </div>

                    {/* Profile Info */}
                    <div className="relative flex flex-col items-center -mt-20 px-8 pb-8">
                        <div className="w-32 h-32 rounded-full p-1.5 bg-[#230F12] shadow-2xl mb-4 relative">
                            <img src={selectedProfile.avatar} alt={selectedProfile.name} className="w-full h-full rounded-full object-cover" />
                            <div className="absolute bottom-2 right-2 bg-nexus-accent text-white text-[10px] font-bold px-2 py-0.5 rounded border border-[#230F12]">PRO</div>
                        </div>
                        
                        <h2 className="text-3xl font-black text-white mb-1">{selectedProfile.name}</h2>
                        <p className="text-nexus-muted text-sm mb-8 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Online Now
                        </p>

                        <div className="grid grid-cols-3 gap-3 w-full mb-8">
                            <div className="text-center p-4 rounded-2xl bg-[#2f1519] border border-white/5">
                                <span className="block text-2xl font-bold text-white">{selectedProfile.score > 8000 ? '52' : '12'}</span>
                                <span className="text-[10px] text-nexus-muted uppercase tracking-wider">Games</span>
                            </div>
                            <div className="text-center p-4 rounded-2xl bg-[#2f1519] border border-white/5">
                                <span className="block text-2xl font-bold text-nexus-accent">#{selectedProfile.id}</span>
                                <span className="text-[10px] text-nexus-muted uppercase tracking-wider">Rank</span>
                            </div>
                            <div className="text-center p-4 rounded-2xl bg-[#2f1519] border border-white/5">
                                <span className="block text-2xl font-bold text-white">98%</span>
                                <span className="text-[10px] text-nexus-muted uppercase tracking-wider">Win Rate</span>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full">
                            <button className="flex-1 py-4 bg-white text-black rounded-xl font-bold shadow-glow hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                <User size={18} /> ADD FRIEND
                            </button>
                            <button className="flex-1 py-4 bg-nexus-glass border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                                MESSAGE
                            </button>
                        </div>
                    </div>
                </GlassCard>
              </div>
          </div>
      )}
    </div>
  );
};