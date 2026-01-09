import React from 'react';
import { HassEntity } from '../types';

interface StatCardProps {
  entity?: HassEntity;
  icon: React.ElementType;
  labelOverride?: string;
  colorClass?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  entity, 
  icon: Icon, 
  labelOverride, 
  colorClass = "text-blue-500",
  trend 
}) => {
  if (!entity) return null;

  const unit = entity.attributes.unit_of_measurement || "";
  const name = labelOverride || entity.attributes.friendly_name?.replace('Withings ', '') || "Unknown";

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:bg-gray-800/80 transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg bg-gray-900/50 ${colorClass}`}>
          <Icon size={20} />
        </div>
        {trend && (
           <span className={`text-xs px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
             {trend === 'up' ? '↗' : '↘'}
           </span>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-wider font-medium truncate">{name}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-bold text-white">{entity.state}</span>
          <span className="text-sm text-gray-500 font-medium">{unit}</span>
        </div>
      </div>
    </div>
  );
};