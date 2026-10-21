import React from 'react';
import { TabType } from '../types';
import { Home, Pill, ScanLine, Bot, Activity, Sparkles } from 'lucide-react';

interface BottomTabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'pharmacy' as TabType, label: 'Pharmacy', icon: Pill },
    { id: 'scanner' as TabType, label: 'Scan Rx', icon: ScanLine },
    { id: 'claude_ai' as TabType, label: 'Claude AI', icon: Bot },
    { id: 'vitals' as TabType, label: 'Vitals', icon: Activity },
    { id: 'claude_ux' as TabType, label: 'Claude UX', icon: Sparkles },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              isActive
                ? 'text-teal-400 font-bold'
                : 'text-slate-400 hover:text-slate-200 font-medium'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-teal-500/15 shadow-sm shadow-teal-500/20 scale-105'
                  : 'hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
