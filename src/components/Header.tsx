import React from 'react';
import { DeviceType } from '../types';
import { Smartphone, Monitor, ShieldCheck, HeartPulse, ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  deviceType: DeviceType;
  setDeviceType: (device: DeviceType) => void;
  cartCount: number;
  openCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  deviceType,
  setDeviceType,
  cartCount,
  openCart
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 text-slate-950">
            <HeartPulse className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">MedPulse AI</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Expo Mobile + Fastify
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Clinical Telehealth & Pharmacy E-Commerce with Claude UX</p>
          </div>
        </div>

        {/* Frame Switcher & Quick Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Device Mode Selector */}
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setDeviceType('iphone')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceType === 'iphone'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="iPhone 16 Pro Viewport"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">iPhone 16</span>
            </button>
            <button
              onClick={() => setDeviceType('pixel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceType === 'pixel'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Google Pixel 9 Pro Viewport"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Pixel 9</span>
            </button>
            <button
              onClick={() => setDeviceType('fullscreen')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceType === 'fullscreen'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Full Responsive Web Mode"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full Web</span>
            </button>
          </div>

          {/* Store Ready Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span className="text-[11px] font-medium">HIPAA & Store Ready</span>
          </div>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-teal-400" />
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
