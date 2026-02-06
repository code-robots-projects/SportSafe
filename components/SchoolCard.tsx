
import React from 'react';
import { SchoolStatus, RiskLevel } from '../types';
import { TrafficLight } from './TrafficLight';
import { Thermometer, Droplets, Sun, AlertTriangle, RefreshCw, Timer } from 'lucide-react';
import clsx from 'clsx';

interface SchoolCardProps {
  data: SchoolStatus;
  onRetry: () => void;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ data, onRetry }) => {
  const { school, weather, status, loading, error } = data;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 animate-pulse h-96 flex flex-col justify-center items-center">
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-slate-100 rounded w-full mb-4"></div>
        <span className="text-slate-400 text-sm">Loading 12:30 Forecast...</span>
      </div>
    );
  }

  if (error || !weather || !status) {
    return (
      <div className="bg-red-50 rounded-xl shadow-sm p-6 border border-red-100 h-96 flex flex-col justify-center items-center text-center">
        <AlertTriangle className="w-10 h-10 text-red-400 mb-2" />
        <h3 className="text-red-800 font-semibold text-lg">{school.name}</h3>
        <p className="text-red-600 mb-4 text-sm">Unable to load data.</p>
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  const getBorderColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.RED: return 'border-red-500 bg-red-50';
      case RiskLevel.AMBER: return 'border-amber-500 bg-amber-50';
      case RiskLevel.GREEN: return 'border-green-500 bg-green-50';
      default: return 'border-slate-200 bg-white';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row relative">
      {/* Left Strip - Traffic Light Visual */}
      <div className="p-6 md:w-32 flex flex-col items-center justify-center bg-slate-50 border-r border-slate-100">
         <TrafficLight level={status.level} />
         <span className={clsx(
           "mt-4 font-bold text-sm uppercase tracking-wider",
           status.level === RiskLevel.RED ? "text-red-600" : 
           status.level === RiskLevel.AMBER ? "text-amber-600" : "text-green-600"
         )}>
           {status.level}
         </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{school.name}</h2>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              {school.location}
            </p>
          </div>
          <div className="text-right">
             <div className="text-3xl font-light text-slate-900">{Math.round(weather.temperature)}°C</div>
             <div className="text-xs text-slate-500 text-nowrap">Forecast at 12:30 SAST</div>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-slate-50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
             <Thermometer className="w-5 h-5 text-blue-500 mb-1" />
             <span className="text-xs text-slate-500">Feels Like</span>
             <span className="font-semibold text-slate-700">{Math.round(weather.apparentTemperature)}°C</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
             <Droplets className="w-5 h-5 text-cyan-500 mb-1" />
             <span className="text-xs text-slate-500">Humidity</span>
             <span className="font-semibold text-slate-700">{weather.humidity}%</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
             <Sun className="w-5 h-5 text-orange-500 mb-1" />
             <span className="text-xs text-slate-500">UV Index</span>
             <span className="font-semibold text-slate-700">{weather.uvIndex}</span>
          </div>
        </div>

        {/* Safe Exposure Warning */}
        <div className="bg-orange-50 rounded-lg p-3 flex items-center justify-between border border-orange-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Timer className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex flex-col">
               <span className="text-xs font-bold uppercase text-orange-800">Safe Exposure (Age 10)</span>
               <span className="text-[10px] text-orange-600 uppercase">Unprotected Skin</span>
            </div>
          </div>
          <span className="text-lg font-bold text-orange-900">{status.safeExposureDuration}</span>
        </div>

        {/* Advice Section */}
        <div className={clsx("rounded-lg p-4 border-l-4 flex-1", getBorderColor(status.level))}>
          <h4 className="font-bold text-slate-800 mb-1">{status.title}</h4>
          <p className="text-slate-700 text-sm mb-3">{status.safetyStatus}</p>
          
          <div className="mt-2 pt-3 border-t border-black/5">
            <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Required Modifications</span>
            <p className="text-sm font-medium text-slate-800">{status.modifications}</p>
          </div>

          <div className="mt-4 bg-white/60 p-3 rounded text-sm italic text-slate-600">
             " {status.generatedAdvice} "
          </div>
        </div>
      </div>
    </div>
  );
};
