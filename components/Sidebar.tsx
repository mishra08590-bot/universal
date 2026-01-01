
import React from 'react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'creator', label: 'Integration', icon: '🔌' },
    { id: 'campaigns', label: 'Campaigns', icon: '📢' },
    { id: 'strategy', label: 'AI Strategist', icon: '🤖' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 h-full flex-col p-4 shrink-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/40">U</div>
        <h1 className="text-xl font-bold tracking-tight">UnityAds Pro</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
        <p className="text-[10px] text-slate-400 mb-2 uppercase font-black tracking-widest">Global Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-slate-200 font-bold">All Networks Active</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
