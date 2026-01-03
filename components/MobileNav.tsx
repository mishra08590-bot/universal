
import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface MobileNavProps {
  currentView: string;
  setView: (view: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: '📊' },
    { id: 'demo', label: 'Test', icon: '🕹️' },
    { id: 'creator', label: 'Setup', icon: '🔌' },
    { id: 'finance', label: 'Money', icon: '💰' },
    { id: 'support', label: 'Chat', icon: '💬' },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black/50 px-2 py-2 flex justify-around items-center h-20 overflow-hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full rounded-3xl transition-all duration-300 relative active:scale-90 ${
              currentView === item.id 
                ? 'bg-indigo-600/20 text-indigo-400' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {/* Active Glow Indicator */}
            {currentView === item.id && (
              <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full"></div>
            )}
            
            <span className={`text-2xl transition-transform duration-300 ${currentView === item.id ? '-translate-y-1 scale-110' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[9px] font-black mt-1 uppercase tracking-tighter transition-all duration-300 ${currentView === item.id ? 'opacity-100' : 'opacity-60'}`}>
              {item.label}
            </span>

            {/* Bottom dot */}
            <div className={`mt-1 h-1 rounded-full transition-all duration-300 ${currentView === item.id ? 'w-4 bg-indigo-500' : 'w-0 bg-transparent'}`}></div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Fix: Add default export to resolve import error in App.tsx
export default MobileNav;
