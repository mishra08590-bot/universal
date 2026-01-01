
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './views/Dashboard';
import ProjectCreator from './views/ProjectCreator';
import AiStrategist from './views/AiStrategist';
import CampaignManager from './views/CampaignManager';
import Settings from './views/Settings';
import Analytics from './views/Analytics';
import SupportAi from './views/SupportAi';

const App: React.FC = () => {
  const [currentView, setView] = useState('dashboard');
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    const checkKey = () => {
      const saved = localStorage.getItem('adspro_keys');
      if (!saved || !JSON.parse(saved).google_ai) {
        setHasKey(false);
      } else {
        setHasKey(true);
      }
    };
    checkKey();
    // Check again when storage changes or view changes
    window.addEventListener('storage', checkKey);
    return () => window.removeEventListener('storage', checkKey);
  }, [currentView]);

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'creator': return <ProjectCreator />;
      case 'strategy': return <AiStrategist />;
      case 'campaigns': return <CampaignManager />;
      case 'analytics': return <Analytics />;
      case 'support': return <SupportAi />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden flex-col md:flex-row">
      <Sidebar currentView={currentView} setView={setView} />
      
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {!hasKey && currentView !== 'settings' && (
          <div className="bg-indigo-600 px-4 py-2 flex items-center justify-between animate-pulse sticky top-0 z-50">
             <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">
               ⚠️ AI DISCONNECTED: Go to Settings and add your Gemini API Key to enable AI features.
             </p>
             <button 
               onClick={() => setView('settings')}
               className="bg-white text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase"
             >
               Fix Now
             </button>
          </div>
        )}

        <header className="h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em]">AdsPro Studio</h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setView('support')} className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-800 font-bold transition-colors">
              💬 AI SUPPORT
            </button>
            <button onClick={() => setView('settings')} className={`p-2 rounded-full transition-all ${currentView === 'settings' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white'}`}>⚙️</button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      <MobileNav currentView={currentView} setView={setView} />
    </div>
  );
};

export default App;
