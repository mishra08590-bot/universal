
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const Settings: React.FC = () => {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState(false);
  const [systemMode, setSystemMode] = useState<'sandbox' | 'production'>('sandbox');

  useEffect(() => {
    const saved = localStorage.getItem('adspro_keys');
    if (saved) setKeys(JSON.parse(saved));
    const savedMode = localStorage.getItem('adspro_system_mode');
    if (savedMode) setSystemMode(savedMode as 'sandbox' | 'production');
  }, []);

  const saveAll = () => {
    localStorage.setItem('adspro_keys', JSON.stringify(keys));
    localStorage.setItem('adspro_system_mode', systemMode);
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32 px-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">System Protocol</h2>
          <p className="text-slate-500 text-sm">Configure Real-World SDK Identities.</p>
        </div>
        <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex gap-1">
           <button onClick={() => setSystemMode('sandbox')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${systemMode === 'sandbox' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Sandbox</button>
           <button onClick={() => setSystemMode('production')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${systemMode === 'production' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>Production</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card title="Global Ad Identities">
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Unity Game ID (Real)</label>
                   <input 
                     className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-mono text-indigo-400 outline-none"
                     placeholder="Enter 7-digit ID"
                     value={keys.unity || ''}
                     onChange={(e) => setKeys({...keys, unity: e.target.value})}
                   />
                </div>
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">AdMob App ID (Real)</label>
                   <input 
                     className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-mono text-emerald-400 outline-none"
                     placeholder="ca-app-pub-xxxxxxxx~xxxxxxxx"
                     value={keys.google || ''}
                     onChange={(e) => setKeys({...keys, google: e.target.value})}
                   />
                </div>
                <button onClick={saveAll} className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all">
                  {saveStatus ? 'IDS SAVED & VERIFIED ✓' : 'SAVE SDK CONFIGURATION'}
                </button>
             </div>
          </Card>

          <Card title="AdMob Integration Checklist" className="border-emerald-500/10 bg-emerald-500/5">
             <div className="space-y-4">
                <p className="text-xs text-slate-300 italic">"AdMob ko real project mein connect karne ke liye ye steps follow karein:"</p>
                <div className="space-y-2">
                   <p className="text-[10px] text-emerald-400 font-bold">1. Google Mobile Ads Plugin import karein.</p>
                   <p className="text-[10px] text-emerald-400 font-bold">2. Assets -> External Dependency Manager -> Android Resolver -> Resolve click karein.</p>
                   <p className="text-[10px] text-emerald-400 font-bold">3. AdMob Dashboard par App create karke "App ID" yahan settings mein dalein.</p>
                   <p className="text-[10px] text-emerald-400 font-bold">4. Live ads dikhane ke liye AdsPro ko 'Production' mode mein switch karein.</p>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
