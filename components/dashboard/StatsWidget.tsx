import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassCard } from '../ui/GlassCard';
import { STATS_DATA } from '../../constants';
import { ArrowRight } from 'lucide-react';

export const StatsWidget: React.FC = () => {
  const totalHours = STATS_DATA.reduce((acc, curr) => acc + curr.value, 0);
  const formattedHours = totalHours.toLocaleString();

  return (
    <GlassCard className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col p-6 min-h-[300px]" hoverEffect>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Your Statistic</h3>
        <ArrowRight className="text-nexus-muted cursor-pointer hover:text-white" size={20} />
      </div>

      <div className="relative flex-1 w-full min-h-[200px]">
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span className="text-nexus-muted text-xs uppercase tracking-wider">Total hours</span>
          <span className="text-3xl font-bold text-white">{formattedHours}h</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={STATS_DATA}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              {STATS_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ backgroundColor: '#230F12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
               itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-around mt-4">
        {STATS_DATA.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: `${item.fill}20` }}>
               {/* Icon placeholder, usually specific game icons */}
               <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
            </div>
            <span className="text-xs text-nexus-muted font-medium">{item.value}h</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};