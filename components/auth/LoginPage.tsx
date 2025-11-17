import React, { useState } from 'react';
import { APP_NAME, STUDIO_NAME } from '../../constants';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRight, Gamepad2, Lock, Mail, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-nexus-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nexus-bg/20 via-nexus-bg/80 to-nexus-bg"></div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-nexus-accent/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <GlassCard className="w-full max-w-md mx-4 p-8 md:p-10 z-10 !rounded-[2.5rem] border-nexus-glassBorder/30 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-nexus-card to-nexus-bg border border-nexus-glassBorder mb-4 shadow-glow">
            <Gamepad2 size={32} className="text-nexus-accent" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{APP_NAME}</h2>
          <p className="text-nexus-muted text-sm">Welcome back, Commander. Please identify yourself.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-nexus-muted font-semibold ml-1">Email / ID</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="text-nexus-muted group-focus-within:text-nexus-accent transition-colors" size={20} />
              </div>
              <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-4 pl-12 pr-4 bg-black/20 border border-nexus-glassBorder rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-nexus-accent/50 focus:bg-black/40 transition-all"
                placeholder="player@dhruvstudios.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-nexus-muted font-semibold ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-nexus-muted group-focus-within:text-nexus-accent transition-colors" size={20} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-4 pl-12 pr-12 bg-black/20 border border-nexus-glassBorder rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-nexus-accent/50 focus:bg-black/40 transition-all"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-nexus-muted hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-nexus-muted cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="rounded bg-white/10 border-nexus-glassBorder text-nexus-accent focus:ring-0" />
              <span>Keep me logged in</span>
            </label>
            <button type="button" className="text-nexus-accent hover:text-white transition-colors">Forgot Password?</button>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-nexus-accent to-[#FF2E00] rounded-2xl text-white font-bold shadow-glow hover:shadow-[0_0_30px_rgba(255,76,41,0.5)] transform hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="animate-pulse">AUTHENTICATING...</span>
            ) : (
              <>
                ENTER GALAXY <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="bg-[#2f1519] px-4 text-nexus-muted rounded-full">Or connect with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
           <button className="py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-white font-medium">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.94 10.32a7.43 7.43 0 0 0-3.62-4.57c.2.51.31 1.06.31 1.64a4.4 4.4 0 0 1-4.38 4.38c-.59 0-1.14-.11-1.65-.31a7.42 7.42 0 0 0 4.57 3.62l1.57 4.57 3.75 1.11 1.11-3.75-1.66-6.69zm-10.2 1.42l-4.69-1.39-1.42-4.69a7.43 7.43 0 0 0 1.39 10.2l4.57-3.62a4.38 4.38 0 0 1 .15-1.65v1.15zM5.48 6.58l6.69 1.66 1.39 4.69a7.41 7.41 0 0 0-3.62-4.57l-4.46-1.78zM1.15 13.62l4.57 3.62c.51-.2.96-.49 1.36-.84l-4.57-3.62a7.4 7.4 0 0 0-1.36.84z"/></svg>
             STEAM
           </button>
           <button className="py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-white font-medium">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
             DISCORD
           </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
           <p className="text-nexus-muted text-xs">
             By logging in, you agree to {STUDIO_NAME}'s <span className="text-white underline cursor-pointer">Terms of Service</span> & <span className="text-white underline cursor-pointer">Privacy Policy</span>.
           </p>
        </div>
      </GlassCard>
    </div>
  );
};