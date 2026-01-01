
import React, { useState } from 'react';
import Card from '../components/Card';

const Settings: React.FC = () => {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const toggleKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const networks = [
    { id: 'unity', name: 'Unity Ads', icon: '🎮', env: 'UNITY_GAME_ID' },
    { id: 'google', name: 'Google AdMob', icon: '🔍', env: 'ADMOB_APP_ID' },
    { id: 'propeller', name: 'Propeller Ads', icon: '🚀', env: 'PROPELLER_ZONE_ID' },
    { id: 'meta', name: 'Meta Audience', icon: '📱', env: 'META_PLACEMENT_ID' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-black">Control Center</h2>
        <p className="text-slate-400 text-sm">Real ads se connect karne ke liye apni API Keys yahan configure karein.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card title="Network API Configurations">
          <div className="space-y-6">
            {networks.map((net) => (
              <div key={net.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="text-2xl w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">{net.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-200">{net.name}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{net.env}</p>
                  </div>
                </div>
                <div className="flex-1 max-w-md relative">
                  <input 
                    type={showKeys[net.id] ? "text" : "password"}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm font-mono text-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter API Key..."
                    defaultValue="sk_live_sample_key_12345"
                  />
                  <button 
                    onClick={() => toggleKey(net.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showKeys[net.id] ? '🔒' : '👁️'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="App Preferences">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold">Simulation Mode</h5>
                  <p className="text-xs text-slate-500">Show mock data for testing UI.</p>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold">Auto-Optimization</h5>
                  <p className="text-xs text-slate-500">Let AI adjust bidding automatically.</p>
                </div>
                <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
              <h5 className="text-[10px] font-black text-amber-500 uppercase mb-2">Security Warning</h5>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "API keys are stored locally in your browser. Clearing cache will reset these settings. For production, use an environment variables (.env) file."
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <button className="px-8 py-3 rounded-xl font-bold bg-slate-900 text-slate-400">Reset All</button>
          <button className="px-10 py-3 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
