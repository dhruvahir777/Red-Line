import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false 
}) => {
  return (
    <div className={`
      relative overflow-hidden
      bg-nexus-glass backdrop-blur-xl border border-nexus-glassBorder
      rounded-[2rem] shadow-glass
      transition-all duration-300 ease-out
      ${hoverEffect ? 'hover:bg-white/10 hover:scale-[1.01] hover:shadow-glow cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};