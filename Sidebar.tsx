
import React from 'react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: '📊' },
    { id: 'creator', label: 'Unit Studio', icon: '🔌' },
    { id: 'demo', label: 'Testing Lab', icon: '🕹️' },
    { id: 'campaigns', label: 'Deploy Ads', icon: '📢' },
    { id: 'strategy', label: 'Global Planner', icon: '🤖' },
    { id: 'support', label: 'Expert Chat', icon: '💬' },
    { id: 'analytics', label: 'Intelligence', icon: '📈' },
    { id: 'settings', label: 'Config', icon: '⚙️' },
  ];

  return (
    <div className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 h-full flex-col p-5 shrink-0">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/20 text-xl italic">A</div>
        <div className="leading-none">
          <h1 className="text-lg font-black tracking-tight text-white uppercase italic">AdsPro</h1>
          <p className="text-[9px] font-black text-indigo-500 tracking-widest uppercase">Global SDK</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${
              currentView === item.id 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 font-bold' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-md">
        <p className="text-[10px] text-slate-500 mb-3 uppercase font-black tracking-widest">Global Network</p>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <span className="text-xs text-slate-200 font-black uppercase tracking-tighter">Endpoints Active</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
