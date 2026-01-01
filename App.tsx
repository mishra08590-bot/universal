
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './views/Dashboard';
import ProjectCreator from './views/ProjectCreator';
import AiStrategist from './views/AiStrategist';
import CampaignManager from './views/CampaignManager';
import Settings from './views/Settings';

const App: React.FC = () => {
  const [currentView, setView] = useState('dashboard');

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'creator': return <ProjectCreator />;
      case 'strategy': return <AiStrategist />;
      case 'campaigns': return <CampaignManager />;
      case 'settings': return <Settings />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold mb-2">Module Under Construction</h2>
          <p className="text-slate-400">The {currentView} module is being optimized for production.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar currentView={currentView} setView={setView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {/* Header Bar */}
        <header className="h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="md:hidden w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold text-white text-xs">U</div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest font-black">NODE: ASIA-SOUTH-1</span>
              <div className="h-4 w-px bg-slate-800"></div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-tighter">Live Sync</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
               <span className="text-[10px] font-black text-slate-500">WALLET</span>
               <span className="text-xs font-bold text-indigo-400">₹14,290.00</span>
            </div>
            <button 
              onClick={() => setView('settings')}
              className="p-2 text-slate-400 hover:text-white transition-colors relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <div className="flex items-center gap-2 md:pl-4 md:border-l md:border-slate-800">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-8 h-8 rounded-full border border-slate-700 shadow-sm bg-slate-800" />
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {renderView()}
        </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-900 p-6 flex flex-col items-center text-center text-slate-500 text-[10px] md:text-xs">
          <p className="font-bold tracking-widest uppercase">Global Monetization & Ads Engine v2.5</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-indigo-400">API Documentation</a>
            <a href="#" className="hover:text-indigo-400">Billing Policy</a>
            <a href="#" className="hover:text-indigo-400">Support</a>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav currentView={currentView} setView={setView} />
    </div>
  );
};

export default App;
