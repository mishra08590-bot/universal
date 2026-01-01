
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const Settings: React.FC = () => {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('adspro_keys');
    if (saved) setKeys(JSON.parse(saved));
  }, []);

  const handleKeyChange = (id: string, value: string) => {
    setKeys(prev => ({ ...prev, [id]: value }));
  };

  const saveAll = () => {
    localStorage.setItem('adspro_keys', JSON.stringify(keys));
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const toggleKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const networks = [
    { 
      id: 'google_ai', 
      name: '1. Google Gemini AI (MANDATORY)', 
      icon: '🤖', 
      env: 'process.env.API_KEY',
      helpUrl: 'https://aistudio.google.com/app/apikey',
      placeholder: 'Yahan apni Gemini API Key paste karein...',
      highlight: true
    },
    { 
      id: 'unity', 
      name: '2. Unity Ads Game ID', 
      icon: '🎮', 
      env: 'UNITY_GAME_ID', 
      helpUrl: 'https://dashboard.unity3d.com/',
      placeholder: 'Unity Dashboard se Game ID lein...'
    },
    { 
      id: 'google', 
      name: '3. Google AdMob App ID', 
      icon: '🔍', 
      env: 'ADMOB_APP_ID', 
      helpUrl: 'https://apps.admob.com/',
      placeholder: 'ca-app-pub-xxx~yyy'
    },
    { 
      id: 'meta', 
      name: '4. Meta Placement ID', 
      icon: '📱', 
      env: 'META_PLACEMENT_ID', 
      helpUrl: 'https://developers.facebook.com/',
      placeholder: 'Facebook/Meta ID...'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black">Control Center</h2>
          <p className="text-slate-400 text-sm">Pehle Gemini AI key dalein taaki Strategy aur Expert Chat kaam kar sake.</p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Setup Status: {Object.keys(keys).length > 0 ? 'Active' : 'Pending'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card title="API Keys & Integrations">
          <div className="space-y-6">
            {networks.map((net) => (
              <div 
                key={net.id} 
                className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all ${
                  net.highlight && !keys[net.id] 
                    ? 'bg-indigo-500/10 border-indigo-500 animate-pulse' 
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 shadow-inner">
                      {net.icon}
                    </div>
                    <div>
                      <h4 className={`font-bold ${net.highlight ? 'text-indigo-400' : 'text-slate-200'}`}>{net.name}</h4>
                      <div className="flex items-center gap-2">
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{net.env}</p>
                         <a href={net.helpUrl} target="_blank" rel="noopener noreferrer" className="text-[9px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold">GET KEY ↗</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 max-w-md relative">
                    <input 
                      type={showKeys[net.id] ? "text" : "password"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder={net.placeholder}
                      value={keys[net.id] || ''}
                      onChange={(e) => handleKeyChange(net.id, e.target.value)}
                    />
                    <button onClick={() => toggleKey(net.id)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                      {showKeys[net.id] ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
                {net.highlight && !keys[net.id] && (
                  <p className="text-[10px] text-indigo-400 font-bold italic animate-bounce">
                    ↑ Is key ke bina AI Strategist kaam nahi karega!
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-900">
          <button 
            className={`px-10 py-3 rounded-xl font-black text-white shadow-lg active:scale-95 transition-all ${
              saveStatus ? 'bg-emerald-600' : 'bg-gradient-to-r from-indigo-600 to-blue-600'
            }`} 
            onClick={saveAll}
          >
            {saveStatus ? '✅ SETTINGS SAVED' : 'SAVE CONFIGURATION'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
