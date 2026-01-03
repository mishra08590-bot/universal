
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './views/Dashboard';
import ProjectCreator from './views/ProjectCreator';
import TestingLab from './views/DemoSandbox';
import AiStrategist from './views/AiStrategist';
import CampaignManager from './views/CampaignManager';
import Settings from './views/Settings';
import Analytics from './views/Analytics';
import SupportAi from './views/SupportAi';
import Finance from './views/Finance';

const App: React.FC = () => {
  const [currentView, setView] = useState('dashboard');

  const renderView = () => {
    const viewMap: Record<string, React.ReactNode> = {
      dashboard: <Dashboard />,
      creator: <ProjectCreator />,
      demo: <TestingLab />,
      strategy: <AiStrategist />,
      campaigns: <CampaignManager />,
      analytics: <Analytics />,
      support: <SupportAi />,
      finance: <Finance />,
      settings: <Settings />
    };
    return (
      <div key={currentView} className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
        {viewMap[currentView] || <Dashboard />}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden flex-col md:flex-row font-inter selection:bg-indigo-500/30">
      <Sidebar currentView={currentView} setView={setView} />
      
      <main className="flex-1 overflow-y-auto pb-32 md:pb-0 bg-[radial-gradient(circle_at_top_right,#1e1b4b,transparent_60%)] scroll-smooth touch-pan-y">
        <header className="h-20 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h2 className="text-[11px] md:text-sm font-black text-indigo-400 uppercase tracking-[0.3em] italic truncate">Ops Terminal</h2>
              <p className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] -mt-0.5">SENSE Digital Infrastructure</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('finance')} 
              className="hidden sm:flex items-center text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl font-black uppercase tracking-widest active:scale-95 transition-all"
            >
              💰 Earnings
            </button>
            <button 
              onClick={() => setView('settings')} 
              className={`p-3 rounded-2xl transition-all border active:scale-90 ${currentView === 'settings' ? 'bg-indigo-600 border-indigo-400 text-white' : 'text-slate-500 border-white/5'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-10 max-w-full overflow-hidden">
          {renderView()}
        </div>
      </main>

      <MobileNav currentView={currentView} setView={setView} />
    </div>
  );
};

export default App;
