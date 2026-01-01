
import React, { useState } from 'react';
import Card from '../components/Card';
import { Platform, AdType, AdProvider } from '../types';

const ProjectCreator: React.FC = () => {
  const [provider, setProvider] = useState<AdProvider>(AdProvider.Google);
  const [isInitializing, setIsInitializing] = useState(false);
  const [showCode, setShowCode] = useState(false);
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
      default: return [AdType.Banner, AdType.Interstitial];
    }
  };

  const getIntegrationCode = (p: AdProvider) => {
    if (p === AdProvider.Unity) {
      return `// Unity Ads Initialization C#\nAdvertisement.Initialize("GAME_ID_HERE", testMode, this);\n\n// Show Rewarded Ad\nAdvertisement.Show("rewardedVideo");`;
    }
    if (p === AdProvider.Propeller) {
      return `<!-- PropellerAds Web Tag -->\n<script>\n  (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);\n  })(document.createElement('script'),'https://iclickcdn.com/tag.min.js',ZONE_ID,document.body);\n</script>`;
    }
    return `// Global Ad SDK Init\nconst adConfig = { appId: 'APP_ID', provider: '${p}' };\nAdSDK.init(adConfig).then(() => console.log("Ads Ready!"));`;
  };

  const handleInitialize = () => {
    if (!formData.name) return alert("Please enter project name.");
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      setShowCode(true);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Universal Connector</h2>
          <p className="text-slate-400 text-sm font-medium">Deploy ads on any Website, Mobile App, or Social Media.</p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global CDN Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card title="Select Network" className="lg:col-span-1">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {[AdProvider.Google, AdProvider.Unity, AdProvider.Meta, AdProvider.Propeller].map((p) => (
              <button
                key={p}
                onClick={() => { setProvider(p); setShowCode(false); }}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  provider === p 
                    ? `border-indigo-500 bg-indigo-500/10` 
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold block">{p}</span>
              </button>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          {!showCode ? (
            <>
              <Card title="Project Definition">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Project Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. My Global App"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Platform Reach</label>
                      <select 
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={formData.platform}
                        onChange={(e) => setFormData({...formData, platform: e.target.value as Platform})}
                      >
                        {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                      <h4 className="text-[10px] font-bold text-indigo-400 uppercase mb-2">Integration Preview</h4>
                      <p className="text-xs text-slate-400">Initialize <strong>{provider}</strong> SDK for <strong>{formData.platform}</strong> to start earning revenue from global traffic.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleInitialize}
                  disabled={isInitializing}
                  className="w-full sm:w-auto px-12 py-3.5 rounded-2xl font-black text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-xl transition-all active:scale-95 disabled:opacity-50"
                >
                  {isInitializing ? 'GENERATING SDK CONFIG...' : 'INITIALIZE GLOBAL SDK'}
                </button>
              </div>
            </>
          ) : (
            <Card title="🚀 Integration Ready!" className="border-emerald-500/30 bg-emerald-500/5 animate-in zoom-in duration-300">
              <div className="space-y-4">
                <p className="text-sm text-slate-300">Copy this code and paste it into your project to activate <strong>{provider}</strong>:</p>
                <div className="relative group">
                  <pre className="bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-400 overflow-x-auto">
                    {getIntegrationCode(provider)}
                  </pre>
                  <button 
                    onClick={() => alert("Code copied to clipboard!")}
                    className="absolute top-4 right-4 px-3 py-1 bg-slate-800 text-[10px] font-bold rounded hover:bg-indigo-600 transition-colors"
                  >
                    COPY CODE
                  </button>
                </div>
                <div className="flex gap-3">
                   <button onClick={() => setShowCode(false)} className="px-6 py-2 bg-slate-800 rounded-xl text-xs font-bold">Back to Edit</button>
                   <button className="px-6 py-2 bg-indigo-600 rounded-xl text-xs font-bold">View Docs</button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCreator;
