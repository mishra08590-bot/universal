
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const TestingLab: React.FC = () => {
  const [activeAd, setActiveAd] = useState<'none' | 'interstitial' | 'rewarded'>('none');
  const [showBanner, setShowBanner] = useState(false);
  const [rewardProgress, setRewardProgress] = useState(0);
  const [customAds, setCustomAds] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('adspro_custom_ads');
    if (saved) setCustomAds(JSON.parse(saved));
  }, []);

  const triggerInterstitial = () => {
    setActiveAd('interstitial');
  };

  const triggerRewarded = () => {
    setActiveAd('rewarded');
    setRewardProgress(0);
    const interval = setInterval(() => {
      setRewardProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const currentBanner = customAds[0] || { 
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80',
    name: 'Standard Placement'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">Placement Integration Lab</h2>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Verify SDK responses before production push.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Debug Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card title="Signal Generators" className="bg-slate-900/40 border-slate-800">
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-3">Banner Controls</p>
                <button 
                  onClick={() => setShowBanner(!showBanner)}
                  className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 transition-all ${showBanner ? 'bg-indigo-600 border-indigo-400 shadow-xl' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'}`}
                >
                  {showBanner ? 'Disable Placement' : 'Inject Banner Unit'}
                </button>
              </div>
              
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-3">Fullscreen Overlays</p>
                <div className="grid grid-cols-1 gap-2">
                  <button 
                    onClick={triggerInterstitial}
                    className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:border-fuchsia-500 hover:text-fuchsia-400 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                  >
                    Test Interstitial
                  </button>
                  <button 
                    onClick={triggerRewarded}
                    className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                  >
                    Test Rewarded Unit
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Live Logger" className="bg-black/40 border-slate-800">
            <div className="font-mono text-[10px] space-y-2 text-indigo-400">
              <p className="opacity-40">{`[${new Date().toLocaleTimeString()}] SDK_LISTENER: READY`}</p>
              {showBanner && <p className="text-emerald-400">{`[${new Date().toLocaleTimeString()}] UNIT_LOADED: ${currentBanner.name}`}</p>}
              {activeAd !== 'none' && <p className="text-fuchsia-400 animate-pulse">{`[${new Date().toLocaleTimeString()}] OVERLAY_ACTIVE: ${activeAd.toUpperCase()}`}</p>}
              {rewardProgress === 100 && <p className="text-emerald-500 font-bold">{`[${new Date().toLocaleTimeString()}] REWARD_CALLBACK: GRANTED`}</p>}
            </div>
          </Card>
        </div>

        {/* Real Device Frame */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="relative w-full max-w-[340px] aspect-[9/19.5] bg-slate-900 rounded-[3.5rem] border-[14px] border-slate-800 shadow-[0_0_120px_rgba(99,102,241,0.1)] overflow-hidden flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-[1.5rem] z-[60] flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
            </div>
            
            <div className="flex-1 bg-gradient-to-b from-slate-900 via-indigo-950 to-black p-6 flex flex-col pt-16">
               <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-indigo-500/30">⚡</div>
                    <div>
                      <p className="text-[10px] font-black text-white leading-none uppercase">PRO_USER</p>
                      <p className="text-[8px] text-indigo-400 font-bold">PREMIUM LEVEL</p>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-2 border border-white/10 shadow-xl">
                    <span className="text-xs">💰</span>
                    <span className="text-[10px] font-black">24,500</span>
                  </div>
               </div>

               <div className="flex-1 flex flex-col items-center justify-center space-y-10">
                  <div className="w-28 h-28 bg-indigo-500/10 rounded-full border-2 border-indigo-500/40 flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                    🚀
                  </div>
                  <div className="text-center space-y-2">
                    <h4 className="text-2xl font-black text-white italic tracking-tighter">APP INTERFACE</h4>
                    <div className="inline-block px-3 py-1 bg-indigo-500 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">Deployment View</div>
                  </div>
               </div>

               {showBanner && (
                 <div className="mt-auto -mx-6 bg-black border-t border-indigo-500/50 h-14 relative animate-in slide-in-from-bottom duration-500 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                    <img src={currentBanner.imageUrl} className="w-full h-full object-cover opacity-90" alt="Banner Unit" />
                    <div className="absolute top-1 left-1 bg-indigo-600 text-[6px] px-1.5 py-0.5 rounded-sm font-black text-white shadow-lg">AD SPONSORED</div>
                 </div>
               )}
            </div>

            {/* FULL SCREEN PRODUCTION OVERLAYS */}
            {activeAd !== 'none' && (
              <div className="absolute inset-0 z-50 bg-slate-950/98 animate-in fade-in zoom-in duration-300 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md">
                 <button 
                  onClick={() => { setActiveAd('none'); setRewardProgress(0); }}
                  className="absolute top-12 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center font-bold text-slate-400 border border-white/10 transition-all"
                 >✕</button>

                 <div className="w-full max-w-[220px] aspect-square bg-slate-900 rounded-[2.5rem] mb-8 overflow-hidden shadow-2xl border-2 border-white/5 ring-4 ring-indigo-500/10">
                    <img src={currentBanner.imageUrl} className="w-full h-full object-cover" />
                 </div>

                 <h3 className="text-xl font-black text-white mb-2 uppercase italic">
                    {activeAd === 'rewarded' ? 'Unlock Premium Tier' : 'Official Sponsor'}
                 </h3>
                 <p className="text-xs text-slate-400 mb-10 leading-relaxed font-medium">
                   {activeAd === 'rewarded' ? 'Your currency reward will be processed instantly after the completion signal.' : 'Professional partnership program. Deploy high-yield units in minutes.'}
                 </p>

                 {activeAd === 'rewarded' && (
                   <div className="w-full space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase italic">
                        <span className={rewardProgress < 100 ? 'text-indigo-400' : 'text-emerald-400'}>{rewardProgress < 100 ? 'Processing SDK Signal...' : 'Validation Complete'}</span>
                        <span className="text-white">{rewardProgress}%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(99,102,241,0.8)]" 
                          style={{ width: `${rewardProgress}%` }}
                        ></div>
                     </div>
                   </div>
                 )}

                 <button className={`mt-10 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl ${rewardProgress === 100 || activeAd === 'interstitial' ? 'bg-indigo-600 text-white shadow-indigo-600/30 active:scale-95' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>
                    {activeAd === 'rewarded' ? (rewardProgress === 100 ? 'CLAIM REWARD' : 'AWAITING CALLBACK') : 'VISIT CLIENT SITE'}
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingLab;
