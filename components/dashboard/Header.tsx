import React from 'react';
import { Search } from 'lucide-react';
import { APP_NAME } from '../../constants';

export const Header: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {APP_NAME}
        </h1>
        {/* Subtitle removed as requested */}
      </div>

      <div className="relative w-48 md:w-96 group">
        <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
          <Search className="text-nexus-muted group-focus-within:text-nexus-accent transition-colors" size={16} />
        </div>
        <input
          type="text"
          placeholder="Search games, players..."
          className="w-full py-2 md:py-3 pl-9 md:pl-12 pr-4 bg-nexus-glass border border-nexus-glassBorder rounded-full text-white placeholder-nexus-muted focus:outline-none focus:ring-2 focus:ring-nexus-accent/50 focus:bg-white/10 transition-all text-sm md:text-base"
        />
      </div>
    </div>
  );
};