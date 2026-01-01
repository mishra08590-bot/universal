
import React, { useState } from 'react';
import Card from '../components/Card';
import { Platform, AdType, AdProvider } from '../types';

const ProjectCreator: React.FC = () => {
  const [provider, setProvider] = useState<AdProvider>(AdProvider.Google);
  const [isInitializing, setIsInitializing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    genre: 'Hyper-Casual',
    platform: Platform.Android,
  });

  const getProviderAds = (p: AdProvider): AdType[] => {
    switch(p) {
      case AdProvider.Google: return [AdType.AppOpen, AdType.Native, AdType.Banner, AdType.Search];
      case AdProvider.Unity: return [AdType.Rewarded, AdType.Interstitial, AdType.Banner, AdType.MREC];
      case AdProvider.Propeller: return [AdType.Popunder, AdType.Push, AdType.InPagePush, AdType.DirectLink];
      case AdProvider.Meta: return [AdType.MetaStories, AdType.MetaReels, AdType.MetaFeed];
      case AdProvider.AppLovin: return [AdType.MREC, AdType.Native, AdType.Banner, AdType.Interstitial];
      default: return [AdType.Banner, AdType.Interstitial];
    }
  };

  const getProviderColor = (p: AdProvider) => {
    switch(p) {
      case AdProvider.Google: return 'blue';
      case AdProvider.Unity: return 'indigo';
      case AdProvider.Propeller: return 'cyan';
      case AdProvider.Meta: return 'fuchsia';
      case AdProvider.AppLovin: return 'amber';
      default: return 'slate';
    }
  };

  const handleInitialize = () => {
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      alert(`${provider} SDK initialized successfully for ${formData.name}!`);
    }, 2000);
  };

  const pColor = getProviderColor(provider);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Universal Connector</h2>
          <p className="text-slate-400 text-sm font-medium">Deploy ads on any Website, Mobile App, Social Media, or Connected Device.</p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global CDN Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card title="Select Network" className="lg:col-span-1">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {[AdProvider.Google, AdProvider.Unity, AdProvider.Meta, AdProvider.Propeller, AdProvider.AppLovin, AdProvider.Custom].map((p) => (
              <button
                key={p}
                onClick={() => setProvider(p)}
                className={`p-3 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                  provider === p 
                    ? `border-${getProviderColor(p)}-500 bg-${getProviderColor(p)}-500/10 shadow-[0_0_15px_rgba(0,0,0,0.2)]` 
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${provider === p ? `text-${getProviderColor(p)}-400` : 'text-slate-500'}`}>
                    {p === AdProvider.Google ? 'Premium Choice' : 'Network'}
                  </span>
                  <span className={`text-xs md:text-sm font-bold truncate ${provider === p ? 'text-white' : 'text-slate-400'}`}>{p}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card title="Project Definition">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Platform Reach</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value as Platform})}
                  >
                    {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Project Category</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. Finance Blog, RPG Game"
                    value={formData.genre}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Global ID / Key</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                </div>
                <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <h4 className="text-[10px] font-bold text-indigo-400 uppercase mb-1">AI Recommendation</h4>
                    <p className="text-xs text-slate-400">Combine <strong>{provider}</strong> with mediation to increase fill rate to 98.2%.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title={`Units for ${provider}`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {getProviderAds(provider).map((type) => (
                <button
                  key={type}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group active:scale-95"
                >
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📦</span>
                  <span className="text-[10px] font-black uppercase text-slate-500 text-center leading-tight group-hover:text-indigo-400">{type}</span>
                </button>
              ))}
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-800 bg-slate-800/20 hover:bg-slate-800/40 transition-all border-dashed">
                <span className="text-2xl mb-2">➕</span>
                <span className="text-[10px] font-black uppercase text-slate-600">Add Unit</span>
              </button>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
             <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all">Clear Form</button>
             <button 
              onClick={handleInitialize}
              disabled={isInitializing}
              className={`w-full sm:w-auto px-12 py-3.5 rounded-2xl font-black text-white shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 disabled:opacity-70`}
             >
                <span className="text-sm uppercase">{isInitializing ? 'Connecting SDK...' : 'INITIALIZE GLOBAL SDK'}</span>
                {!isInitializing && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreator;
