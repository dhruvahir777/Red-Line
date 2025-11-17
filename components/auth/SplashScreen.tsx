import React, { useEffect, useState } from 'react';
import { APP_NAME, STUDIO_NAME } from '../../constants';
import { Zap } from 'lucide-react';

// Critical assets to preload during splash screen to prevent popping/loading later
const PRELOAD_ASSETS = [
    // Thumbnails
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIfpd1_lg-5VwR3_OmEpJBz70z2w38Zk4umw&s',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    'https://assets.gqindia.com/photos/6708f08f701071b230ad5006/16:9/w_2560%2Cc_limit/Amitabh-bachchan.jpg',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    // Game Character & BG Assets
    'https://res.cloudinary.com/du7i7bqna/image/upload/v1763376201/devayt_pvksfi.png',
    'https://images.unsplash.com/photo-1532979494617-42f869a1919e?q=80&w=2670&auto=format&fit=crop',
    'https://res.cloudinary.com/du7i7bqna/image/upload/v1763367714/Adobe_Express_-_file_v5et7y.png',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop'
];

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // 0 = Studio Reveal, 1 = Game Reveal, 2 = Exit
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Start Preloading Assets
    PRELOAD_ASSETS.forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    // 2. Timeline Management
    
    // Phase 1: Show Dhruv Studios for 2 seconds
    const studioTimer = setTimeout(() => {
      setStage(1);
    }, 2000);

    // Phase 2: Start Progress Bar (runs for approx 5 seconds total)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Linear progression to fill ~5 seconds
        // 50ms interval * 100 steps = 5000ms
        return prev + 1; 
      });
    }, 50);

    // Phase 3: Finish after approx 5.5 seconds total (buffer for animation)
    const completionTimer = setTimeout(() => {
      setStage(2); // Trigger fade out
      setTimeout(onComplete, 800); // Wait for exit animation then unmount
    }, 6000);

    return () => {
      clearTimeout(studioTimer);
      clearInterval(progressInterval);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${stage === 2 ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0505] to-black"></div>
      
      {/* STAGE 0: DHRUV STUDIOS REVEAL */}
      {stage === 0 && (
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000 fill-mode-forwards">
          <div className="mb-4 opacity-0 animate-[fadeIn_0.5s_ease-out_0.5s_forwards]">
             <Zap size={40} className="text-white fill-white drop-shadow-[0_0_15px_white]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em] uppercase drop-shadow-2xl">
            {STUDIO_NAME}
          </h1>
          <div className="h-px w-0 bg-nexus-accent mt-4 animate-[expandWidth_1s_ease-out_0.5s_forwards]"></div>
          <p className="text-gray-500 text-xs mt-2 tracking-widest uppercase opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
            Presents
          </p>
        </div>
      )}

      {/* STAGE 1: REDLINE GALAXY REVEAL */}
      {stage === 1 && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6 h-full py-20">
          
          {/* Title with Glitch Effect Idea */}
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500 animate-[slideUp_0.8s_ease-out] drop-shadow-[0_0_30px_rgba(255,76,41,0.4)] text-center leading-tight">
              {APP_NAME.toUpperCase()}
            </h1>
            
            <div className="flex items-center gap-3 mb-12 opacity-80 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
               <span className="h-px w-12 bg-nexus-accent"></span>
               <span className="text-nexus-accent text-sm font-bold tracking-[0.3em] uppercase">POWERED BY DHRUV STUDIOS</span>
               <span className="h-px w-12 bg-nexus-accent"></span>
            </div>
          </div>

          {/* High Tech Loading Bar - Positioned at bottom area */}
          <div className="w-full max-w-md relative mt-auto">
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-2 uppercase">
               <span className="animate-pulse">System Initializing...</span>
               <span>{Math.min(100, Math.floor(progress))}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-gray-900/50 rounded-full overflow-hidden border border-gray-800 relative backdrop-blur-sm">
               {/* Scanline effect inside bar */}
               <div className="absolute inset-0 bg-white/5 z-10 w-full h-full animate-[shimmer_1s_infinite]"></div>
               
               {/* The Bar */}
               <div 
                 className="h-full bg-gradient-to-r from-nexus-accent to-[#ff2e00] shadow-[0_0_15px_#FF4C29] transition-all duration-100 ease-linear relative"
                 style={{ width: `${progress}%` }}
               >
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white]"></div>
               </div>
            </div>
          </div>

        </div>
      )}

      {/* CSS Animations needed for this component specifically */}
      <style>{`
        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to { width: 100px; opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; scale: 0.9; }
          to { transform: translateY(0); opacity: 1; scale: 1; }
        }
      `}</style>
    </div>
  );
};