
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
    { id: 'campaigns', label: 'Ads', icon: '📢' },
    { id: 'strategy', label: 'AI', icon: '🤖' },
    { id: 'creator', label: 'Setup', icon: '🔌' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center flex-1 transition-all relative ${
              currentView === item.id ? 'text-indigo-400 scale-110' : 'text-slate-500'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{item.label}</span>
            {currentView === item.id && (
              <div className="absolute -bottom-1 w-1 h-1 bg-indigo-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
