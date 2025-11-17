import React, { useState } from 'react';
import { APP_NAME } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRight, Gamepad2, Lock, Mail, Eye, EyeOff, X } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onClose?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onClose }) => {
  // Pre-filled credentials for development convenience
  const [email, setEmail] = useState('player@dhruvstudios.com');
  const [password, setPassword] = useState('password123');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="w-full flex items-center justify-center relative overflow-hidden p-4 md:p-0">
      
      {/* Main Card - Responsive Layout for Landscape */}
      <GlassCard className="w-full max-w-md md:max-w-4xl mx-auto p-6 md:p-10 z-10 !rounded-[2rem] border-nexus-glassBorder/30 shadow-2xl landscape:max-w-3xl landscape:flex landscape:gap-8 landscape:items-center landscape:p-6 relative bg-[#230F12]/95 backdrop-blur-xl">
        
        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors z-50"
          >
            <X size={20} />
          </button>
        )}

        {/* Left Side (Branding) - Visible differently in Landscape */}
        <div className="text-center landscape:text-left landscape:w-1/2 landscape:flex landscape:flex-col landscape:justify-center mb-6 landscape:mb-0">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-nexus-card to-nexus-bg border border-nexus-glassBorder mb-4 shadow-glow landscape:w-12 landscape:h-12 landscape:mb-2">
            <Gamepad2 size={32} className="text-nexus-accent landscape:w-6 landscape:h-6" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 landscape:text-2xl">{APP_NAME}</h2>
          <p className="text-nexus-muted text-sm landscape:text-xs">Welcome back, Commander. <br/>Identify yourself to enter the system.</p>
          
          {/* Socials moved here for landscape layout */}
          <div className="hidden landscape:block mt-6">
             <div className="grid grid-cols-2 gap-3">
                <button type="button" className="py-2 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white text-xs font-medium">
                    STEAM
                </button>
                <button type="button" className="py-2 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white text-xs font-medium">
                    DISCORD
                </button>
             </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <form onSubmit={handleSubmit} className="space-y-4 landscape:w-1/2 landscape:space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-nexus-muted font-semibold ml-1">Email / ID</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="text-nexus-muted group-focus-within:text-nexus-accent transition-colors" size={18} />
              </div>
              <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-black/20 border border-nexus-glassBorder rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-nexus-accent/50 focus:bg-black/40 transition-all text-sm"
                placeholder="player@dhruvstudios.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-nexus-muted font-semibold ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-nexus-muted group-focus-within:text-nexus-accent transition-colors" size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-12 pr-12 bg-black/20 border border-nexus-glassBorder rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-nexus-accent/50 focus:bg-black/40 transition-all text-sm"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-nexus-muted hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-nexus-muted cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="rounded bg-white/10 border-nexus-glassBorder text-nexus-accent focus:ring-0 w-3 h-3" />
              <span>Keep logged in</span>
            </label>
            <button type="button" className="text-nexus-accent hover:text-white transition-colors">Forgot?</button>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-nexus-accent to-[#FF2E00] rounded-xl text-white font-bold shadow-glow hover:shadow-[0_0_30px_rgba(255,76,41,0.5)] transform hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <>
                ENTER GALAXY <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Mobile Portrait Socials (Hidden on Landscape to save space) */}
          <div className="landscape:hidden pt-4">
             <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-[#2f1519] px-2 text-nexus-muted rounded-full">Or</span></div>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <button type="button" className="py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-medium">STEAM</button>
                <button type="button" className="py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-medium">DISCORD</button>
             </div>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};