import React from 'react';
import { RECENT_DOWNLOADS } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { Pause, X } from 'lucide-react';

export const Downloads: React.FC = () => {
  const download = RECENT_DOWNLOADS[0];

  return (
    <div className="col-span-12 mt-2">
      <h3 className="text-xl font-bold text-white mb-4">Last Downloads</h3>
      
      <GlassCard className="p-4 flex flex-col md:flex-row items-center gap-6 !rounded-[2rem] bg-gradient-to-r from-[#35151a] to-nexus-glass">
        {/* Game Icon */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-lg shrink-0">
            <img src={download.imageUrl} alt={download.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white">{download.title}</span>
            <span className="text-xs text-nexus-muted px-2 py-0.5 rounded-full bg-white/10 w-fit mt-1">Sports simulator</span>
          </div>
        </div>

        {/* Progress Bar Area */}
        <div className="flex-1 w-full md:px-4">
           <div className="flex justify-between text-xs text-nexus-muted mb-2">
             <span>Downloading...</span>
             <span>{download.size} of 60GB</span>
           </div>
           {/* Custom Wave Progress Bar Simulation */}
           <div className="h-16 relative w-full overflow-hidden rounded-xl bg-[#230F12]">
              {/* Background Wave */}
              <div className="absolute inset-0 opacity-30">
                 <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d">
                    <path fill="#FF4C29" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                 </svg>
              </div>
               {/* Foreground Progress Fill */}
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-nexus-accent/20 to-nexus-accent/80 transition-all duration-1000"
                style={{ width: `${download.progress}%` }}
              >
                 <div className="absolute right-0 top-0 bottom-0 w-1 bg-nexus-accent shadow-[0_0_15px_#FF4C29]"></div>
              </div>
           </div>
        </div>

        {/* Stats & Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-8">
          <div className="flex flex-col items-end">
            <span className="font-bold text-white">1 hour 23 min.</span>
            <span className="text-xs text-nexus-muted">{download.speed}</span>
          </div>

          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-nexus-accent text-white flex items-center justify-center shadow-glow hover:opacity-90">
               <Pause size={18} fill="currentColor" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
               <X size={18} />
            </button>
          </div>
        </div>

      </GlassCard>
    </div>
  );
};