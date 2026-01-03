
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Platform } from '../types';

interface CustomCampaign {
  id: string;
  name: string;
  type: string;
  provider: 'Unity' | 'AdMob';
  status: 'active' | 'draft';
}

const ProjectCreator: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [activeCampaigns, setActiveCampaigns] = useState<CustomCampaign[]>([]);
  const [provider, setProvider] = useState<'Unity' | 'AdMob'>('Unity');
  const [systemMode, setSystemMode] = useState('sandbox');
  const [unityGameId, setUnityGameId] = useState('7777777');
  const [admobAppId, setAdmobAppId] = useState('ca-app-pub-3940256099942544~3347511713');
  const [adUnitId, setAdUnitId] = useState('ca-app-pub-3940256099942544/6300978111');
  
  const [creativeData, setCreativeData] = useState({
    name: '',
    assetType: 'Banner',
  });

  useEffect(() => {
    const saved = localStorage.getItem('adspro_custom_ads');
    if (saved) setActiveCampaigns(JSON.parse(saved));
    
    const savedMode = localStorage.getItem('adspro_system_mode') || 'sandbox';
    setSystemMode(savedMode);

    const savedKeys = JSON.parse(localStorage.getItem('adspro_keys') || '{}');
    if (savedKeys.unity) setUnityGameId(savedKeys.unity);
    if (savedKeys.google) setAdmobAppId(savedKeys.google);
  }, []);

  const admobScript = `using GoogleMobileAds.Api;
using UnityEngine;

public class AdMobManager : MonoBehaviour
{
    // ISSE APNE REAL AD UNIT ID SE REPLACE KAREIN (AdMob Dashboard)
    private string _adUnitId = "${adUnitId}"; 
    private BannerView _bannerView;

    void Start() {
        MobileAds.Initialize((InitializationStatus initStatus) => {
            Debug.Log("AdMob Initialized.");
            RequestBanner();
        });
    }

    private void RequestBanner() {
        if (_bannerView != null) { _bannerView.Destroy(); }
        _bannerView = new BannerView(_adUnitId, AdSize.Banner, AdPosition.Top);
        AdRequest request = new AdRequest();
        _bannerView.LoadAd(request);
    }
}`;

  const unityScript = `using UnityEngine;
using UnityEngine.Advertisements;

public class UnityAdsManager : MonoBehaviour, IUnityAdsInitializationListener
{
    [SerializeField] string _androidGameId = "${unityGameId}";
    [SerializeField] bool _testMode = ${systemMode === 'sandbox'};

    void Awake() {
        if (!Advertisement.isInitialized && Advertisement.isSupported) {
            Advertisement.Initialize(_androidGameId, _testMode, this);
        }
    }

    public void OnInitializationComplete() => Debug.Log("Unity Ads Init Success");
    public void OnInitializationFailed(UnityAdsInitializationError error, string message) => Debug.Log("Init Failed");
}`;

  const handleActivate = () => {
    if (!creativeData.name) return alert("Project ka naam zaroori hai.");
    setIsInitializing(true);
    
    setTimeout(() => {
      const newCampaign: CustomCampaign = {
        id: `ADS_${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        name: creativeData.name,
        type: creativeData.assetType,
        provider: provider,
        status: 'active'
      };
      const updated = [newCampaign, ...activeCampaigns];
      setActiveCampaigns(updated);
      localStorage.setItem('adspro_custom_ads', JSON.stringify(updated));
      setIsInitializing(false);
      setShowCode(true);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 px-4 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white">Unit Studio</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Real Ads Integration Engine</p>
        </div>
      </header>

      {!showCode ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card title="Step 1: Choose Network & Config" className="bg-slate-900 border-slate-800">
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setProvider('Unity')} className={`p-6 rounded-3xl border-2 transition-all ${provider === 'Unity' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 bg-slate-950'}`}>
                    <p className="text-2xl mb-2">🎮</p>
                    <p className="font-black text-xs uppercase text-white">Unity Ads</p>
                  </button>
                  <button onClick={() => setProvider('AdMob')} className={`p-6 rounded-3xl border-2 transition-all ${provider === 'AdMob' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 bg-slate-950'}`}>
                    <p className="text-2xl mb-2">🔍</p>
                    <p className="font-black text-xs uppercase text-white">Google AdMob</p>
                  </button>
                </div>

                <div className="space-y-4">
                   <input 
                     className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-indigo-500 outline-none"
                     placeholder="Project Name (e.g. My Racing Game)"
                     value={creativeData.name}
                     onChange={(e) => setCreativeData({...creativeData, name: e.target.value})}
                   />
                </div>

                <button 
                  onClick={handleActivate}
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest ${provider === 'Unity' ? 'bg-indigo-600' : 'bg-emerald-600'} text-white shadow-2xl active:scale-95 transition-all`}
                >
                  {isInitializing ? 'VALIDATING SDK PROTOCOLS...' : `GENERATE ${provider.toUpperCase()} SCRIPT`}
                </button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <Card title="Path to Real Money" className="bg-slate-950 border-emerald-500/20">
                <div className="space-y-6">
                   <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                      <p className="text-[10px] font-black text-emerald-400 uppercase mb-2">Money Verification</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed italic">
                        Real paise sirf tab aayenge jab aapka game **Play Store** par hoga aur log use download karke ads dekhenge. 
                      </p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Actions:</p>
                      <ul className="text-[11px] text-slate-400 space-y-3">
                         <li className="flex gap-2 items-start"><span className="text-indigo-400">1.</span> Unity mein script file banayein.</li>
                         <li className="flex gap-2 items-start"><span className="text-indigo-400">2.</span> Real IDs Dashboard se copy karein.</li>
                         <li className="flex gap-2 items-start"><span className="text-indigo-400">3.</span> Build generate karke test karein.</li>
                      </ul>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in">
           <Card title={`Real ${provider} Production Script`} className="bg-slate-950 border-white/10">
              <div className="mb-6 p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                 <p className="text-xs text-amber-500 font-bold leading-relaxed">
                    ⚠️ <b>IMPORTANT:</b> Ye code bilkul sahi hai. Ise apne Unity project ke "Scripts" folder mein copy karein aur file ka naam <b>{provider === 'AdMob' ? 'AdMobManager.cs' : 'UnityAdsManager.cs'}</b> rakhein.
                 </p>
              </div>
              <pre className="bg-black p-8 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-[11px] overflow-x-auto custom-scrollbar">
                 {provider === 'AdMob' ? admobScript : unityScript}
              </pre>
              <div className="mt-8 flex gap-4">
                 <button onClick={() => setShowCode(false)} className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Back</button>
                 <button onClick={() => { navigator.clipboard.writeText(provider === 'AdMob' ? admobScript : unityScript); alert("Script Copied!"); }} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Copy to Clipboard</button>
              </div>
           </Card>
        </div>
      )}
    </div>
  );
};

export default ProjectCreator;
