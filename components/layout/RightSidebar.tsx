import React from 'react';
import { Bell, ShoppingCart, ExternalLink, Code } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface RightSidebarProps {
    onProfileClick?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onProfileClick }) => {
  const handleBuyProject = () => {
      // In a real app this would open Stripe/Payment gateway
      alert("Redirecting to Secure Checkout for Redline Galaxy Project Source Code ($699)");
  };

  return (
    <div className="hidden lg:flex flex-col w-80 h-full py-6 pr-6 pl-2 gap-6">
      {/* Top Actions */}
      <div className="flex items-center justify-end gap-4">
        <button className="p-3 rounded-full bg-nexus-glass hover:bg-white/10 text-white transition-colors relative group">
          <ShoppingCart size={20} />
          {/* Tooltip */}
          <span className="absolute top-full mt-2 right-0 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Store</span>
        </button>
        
        <button className="p-3 rounded-full bg-nexus-glass hover:bg-white/10 text-white transition-colors relative group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-accent rounded-full animate-pulse"></span>
          
          {/* Notification Dropdown Mock */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-[#230F12] border border-white/10 rounded-xl p-3 shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
             <h4 className="text-white text-xs font-bold uppercase mb-2 border-b border-white/10 pb-1">Notifications</h4>
             <div className="flex items-start gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-nexus-accent mt-1.5 shrink-0"></div>
                <div>
                    <p className="text-white text-sm font-medium">New Game Coming Soon!</p>
                    <p className="text-nexus-muted text-xs">Prepare for 'CyberDrift'</p>
                </div>
             </div>
          </div>
        </button>

        <div 
            onClick={onProfileClick}
            className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-nexus-glassBorder cursor-pointer hover:border-nexus-accent transition-colors relative group"
        >
          <img 
            src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" 
            alt="Guest" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] uppercase font-bold">
              Login
          </div>
        </div>
      </div>

      {/* Buy Source Code Card */}
      <div 
        onClick={handleBuyProject}
        className="flex-1 w-full relative rounded-[2rem] overflow-hidden border border-nexus-glassBorder bg-[#0f0505] group cursor-pointer"
      >
         {/* Ad Image */}
         <img 
           src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"
           alt="Code"
           className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-30"
         />
         
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nexus-bg/50 to-nexus-bg" />
         
         {/* Badge */}
         <div className="absolute top-3 right-3 px-2 py-1 bg-nexus-accent rounded text-[10px] font-bold text-white border border-white/10 shadow-glow">
             FOR SALE
         </div>

         {/* Content */}
         <div className="absolute bottom-0 left-0 right-0 p-6 w-full">
            <div className="flex items-center gap-2 mb-2 text-nexus-accent">
                <Code size={16} />
                <span className="text-xs font-bold tracking-widest uppercase">Developer License</span>
            </div>
            <h4 className="text-2xl font-bold text-white leading-tight mb-2">Own This <br/>Entire Project</h4>
            <p className="text-nexus-muted text-xs mb-4">Get the full React source code, assets, and setup guide.</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg group-hover:bg-nexus-accent group-hover:border-nexus-accent">
               Buy Now - $699 <ExternalLink size={14} />
            </button>
         </div>
      </div>

      {/* Quick Chat / Group Area */}
      <GlassCard className="p-4 mt-auto !rounded-[1.5rem]">
        <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-nexus-card" src="https://picsum.photos/100?1" alt=""/>
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-nexus-card" src="https://picsum.photos/100?2" alt=""/>
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-nexus-card" src="https://picsum.photos/100?3" alt=""/>
            </div>
            <span className="text-sm font-medium text-nexus-muted">+4 online</span>
        </div>
        <button className="w-full py-3 bg-nexus-accent rounded-xl text-white font-semibold shadow-glow hover:opacity-90 transition-opacity">
          Start Party
        </button>
      </GlassCard>
    </div>
  );
};