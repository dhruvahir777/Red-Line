import React from 'react';
import { SIDEBAR_ITEMS } from '../../constants';
import { Plus } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [active, setActive] = React.useState('home');

  return (
    <div className="flex flex-col items-center justify-between w-20 md:w-24 h-full py-4 md:py-8 pl-2 md:pl-4 shrink-0 z-40 bg-nexus-bg/50 backdrop-blur-sm md:bg-transparent">
      {/* Logo Area */}
      <div className="w-10 h-10 md:w-12 md:h-12 bg-nexus-text rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 shadow-glow shrink-0">
        <span className="text-nexus-bg font-bold text-lg md:text-xl">N</span>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-3 md:gap-6 w-full items-center flex-1 justify-center overflow-y-auto no-scrollbar">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`
                relative group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl transition-all duration-300 shrink-0
                ${isActive ? 'text-nexus-accent bg-nexus-glass' : 'text-nexus-muted hover:text-white hover:bg-white/5'}
              `}
            >
              {/* Clone element to adjust icon size for mobile if needed, or just rely on lucide default */}
              <div className="scale-75 md:scale-100 transform transition-transform">
                 {item.icon}
              </div>
              {isActive && (
                <span className="absolute -left-2 w-1 h-4 md:h-5 bg-nexus-accent rounded-r-full shadow-[0_0_10px_#FF4C29]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Add Button */}
      <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-nexus-card to-nexus-bg border border-nexus-glassBorder flex items-center justify-center text-nexus-accent hover:scale-110 transition-transform shadow-lg mt-2 md:mt-4 shrink-0">
        <Plus size={20} className="md:w-6 md:h-6" />
      </button>
    </div>
  );
};