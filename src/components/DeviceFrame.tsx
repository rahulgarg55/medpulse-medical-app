import React from 'react';
import { DeviceType } from '../types';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface DeviceFrameProps {
  deviceType: DeviceType;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ deviceType, children }) => {
  if (deviceType === 'fullscreen') {
    return (
      <div className="w-full max-w-7xl mx-auto min-h-[calc(100vh-65px)] bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {children}
      </div>
    );
  }

  const isIphone = deviceType === 'iphone';

  return (
    <div className="flex justify-center items-center py-6 px-2 min-h-[calc(100vh-65px)]">
      {/* Phone Outer Bezel */}
      <div
        className={`relative w-full max-w-[412px] h-[860px] bg-slate-950 rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_8px_#1e293b,0_0_0_10px_#0f172a] border-[3px] border-slate-700/60 flex flex-col overflow-hidden transition-all duration-300`}
      >
        {/* Dynamic Island / Punch Hole Header */}
        <div className="relative pt-2 pb-1 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-30 select-none bg-slate-950">
          <span>9:41</span>

          {isIphone ? (
            /* iPhone Dynamic Island */
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-slate-800/80">
              <div className="w-2 h-2 rounded-full bg-teal-500/80 animate-pulse"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
            </div>
          ) : (
            /* Android Pixel Camera Punch Hole */
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-3.5 h-3.5 bg-black rounded-full border border-slate-800"></div>
          )}

          <div className="flex items-center gap-1.5 text-slate-400">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Inner Screen Content */}
        <div className="relative flex-1 bg-slate-900 overflow-y-auto overflow-x-hidden flex flex-col rounded-[38px] custom-scrollbar">
          {children}
        </div>

        {/* Phone Home Indicator Bar */}
        <div className="pt-2 pb-1 flex justify-center bg-slate-950">
          <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
