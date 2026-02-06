import React from 'react';
import { RiskLevel } from '../types';
import clsx from 'clsx';

interface TrafficLightProps {
  level: RiskLevel;
  className?: string;
}

export const TrafficLight: React.FC<TrafficLightProps> = ({ level, className }) => {
  return (
    <div className={clsx("flex flex-col gap-3 bg-slate-800 p-3 rounded-2xl shadow-inner border-2 border-slate-700 w-fit", className)}>
      {/* RED LIGHT */}
      <div 
        className={clsx(
          "w-12 h-12 rounded-full border-2 transition-all duration-500 ease-in-out shadow-lg",
          level === RiskLevel.RED 
            ? "bg-red-600 border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.7)] scale-105" 
            : "bg-red-950 border-red-900 opacity-30"
        )}
      />
      {/* AMBER LIGHT */}
      <div 
        className={clsx(
          "w-12 h-12 rounded-full border-2 transition-all duration-500 ease-in-out shadow-lg",
          level === RiskLevel.AMBER 
            ? "bg-amber-500 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.7)] scale-105" 
            : "bg-amber-950 border-amber-900 opacity-30"
        )}
      />
      {/* GREEN LIGHT */}
      <div 
        className={clsx(
          "w-12 h-12 rounded-full border-2 transition-all duration-500 ease-in-out shadow-lg",
          level === RiskLevel.GREEN 
            ? "bg-green-500 border-green-300 shadow-[0_0_20px_rgba(34,197,94,0.7)] scale-105" 
            : "bg-green-950 border-green-900 opacity-30"
        )}
      />
    </div>
  );
};
