import React, { useEffect, useState } from 'react';
import { APP_NAME, STUDIO_NAME } from '../../constants';
import { Gamepad2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setOpacity(0); // Fade out
            setTimeout(onComplete, 500); // Wait for fade out then unmount
          }, 200);
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1A090C] text-white transition-opacity duration-500"
      style={{ opacity: opacity / 100 }}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexus-accent/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-nexus-accent/20 blur-2xl rounded-full"></div>
          <Gamepad2 size={80} className="text-nexus-accent relative z-10 drop-shadow-[0_0_15px_rgba(255,76,41,0.6)]" />
        </div>

        {/* App Name with Glitch Effect Idea or simple fade */}
        <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-nexus-text to-gray-400 animate-pulse">
          {APP_NAME.toUpperCase()}
        </h1>
        
        <p className="text-nexus-muted text-sm tracking-[0.3em] uppercase mb-12">
          by {STUDIO_NAME}
        </p>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-nexus-accent shadow-[0_0_10px_#FF4C29] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-nexus-muted font-mono">
          INITIALIZING SYSTEM... {progress}%
        </div>
      </div>
    </div>
  );
};