
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

interface Campaign {
  id: string;
  name: string;
  budget: number;
  target: string;
  platform: string;
  status: 'Review' | 'Active' | 'Paused';
  timestamp: string;
}

const CampaignManager: React.FC = () => {
  const [budget, setBudget] = useState(1500);
  const [target, setTarget] = useState('Global (Recommended)');
  const [platform, setPlatform] = useState('Unity Video');
  const [campaignName, setCampaignName] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('adspro_live_campaigns');
    if (saved) setActiveCampaigns(JSON.parse(saved));
  }, []);

  const handleLaunch = () => {
    if (!campaignName) return alert("Pehle Campaign ka naam rakhein.");
    setIsLaunching(true);
    
    setTimeout(() => {
      const newCampaign: Campaign = {
        id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
        name: campaignName,
        budget: budget,
        target: target,
        platform: platform,
        status: 'Review',
        timestamp: new Date().toLocaleDateString('en-IN')
      };
      
      const updated = [newCampaign, ...activeCampaigns];
      setActiveCampaigns(updated);
      localStorage.setItem('adspro_live_campaigns', JSON.stringify(updated));
      
      setIsLaunching(false);
      setCampaignName('');
      alert("Campaign Deployed! SENSE Group Security Team ab ise 2-4 ghanton mein approve karegi.");
    }, 2500);
  };

  const platforms = [
    { name: 'Unity Video', icon: '🎮', cost: '₹1.1 / view' },
    { name: 'Meta Network', icon: '📱', cost: '₹2.4 / click' },
    { name: 'Google Ads', icon: '🔍', cost: '₹4.8 / click' },
    { name: 'Social Reels', icon: '⚡', cost: '₹0.9 / view' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-32 animate-in fade-in duration-500 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">Ad Deployment Console</h2>
          <p className="text-slate-500 text-sm font-medium">Production scale ad traffic management & global bidding.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-full">
           <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Verified Ad-Network Node</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card title="Deploy New Global Campaign" className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Campaign Identity</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-5 text-sm focus:border-emerald-500 outline-none transition-all text-white font-bold placeholder:text-slate-800"
                      placeholder="e.g. Summer_Sale_Global_Traffic"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Daily Budget Allocation (₹)</label>
                    <div className="space-y-4">
                       <input 
                        type="range" min="500" max="50000" step="100"
                        className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                        value={budget}
                        onChange={(e) => setBudget(parseInt(e.target.value))}
                       />
                       <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-2xl font-black text-white italic">₹{budget.toLocaleString()}</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Limit: ₹50k/day</span>
                       </div>
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Target Network</label>
                    <select 
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-5 text-sm text-white font-bold outline-none focus:border-emerald-500 appearance-none"
                    >
                      {platforms.map(p => <option key={p.name} value={p.name}>{p.icon} {p.name}</option>)}
                    </select>
                 </div>
              </div>

              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-2xl">🛡️</div>
                  <div className="flex-1">
                    <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-1 italic">Enterprise Fraud Protection</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      SENSE AI algorithms are currently monitoring for invalid traffic. Your campaign will use <b>SENSE Guard</b> to filter out bot clicks, ensuring 100% human reach.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
                 <div className="flex gap-4">
                    <div className="text-center">
                       <p className="text-[9px] font-black text-slate-500 uppercase">Est. Reach</p>
                       <p className="text-sm font-black text-white">{(budget * 12.5).toLocaleString()}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-800"></div>
                    <div className="text-center">
                       <p className="text-[9px] font-black text-slate-500 uppercase">Est. Conversions</p>
                       <p className="text-sm font-black text-white">{(budget * 0.4).toFixed(0)}</p>
                    </div>
                 </div>
                 <button 
                  onClick={handleLaunch}
                  disabled={isLaunching}
                  className={`w-full md:w-auto px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 ${isLaunching ? 'bg-slate-800 text-slate-600' : 'bg-emerald-600 text-white shadow-emerald-600/30'}`}
                 >
                   {isLaunching ? 'SYNCING TARGET NODES...' : 'DEPLOY LIVE CAMPAIGN 🚀'}
                 </button>
              </div>
            </div>
          </Card>
          
          <Card title="Global Deployment Logs">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-[10px] font-black text-slate-600 uppercase border-b border-slate-800">
                         <th className="py-4 px-4">Cluster ID</th>
                         <th className="py-4 px-4">Deployment Platform</th>
                         <th className="py-4 px-4">Allocated Budget</th>
                         <th className="py-4 px-4 text-right">Verification</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800/50">
                      {activeCampaigns.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-24 text-center text-slate-700 text-[10px] font-black italic uppercase tracking-[0.4em]">Zero Active Deployments Detected</td>
                        </tr>
                      ) : (
                        activeCampaigns.map(cmp => (
                          <tr key={cmp.id} className="text-xs group hover:bg-white/5 transition-colors">
                             <td className="py-6 px-4">
                                <p className="font-bold text-white group-hover:text-emerald-400 transition-colors uppercase italic">{cmp.name}</p>
                                <p className="text-[9px] font-mono text-slate-600 tracking-tighter">{cmp.id}</p>
                             </td>
                             <td className="py-6 px-4">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{cmp.platform}</span>
                             </td>
                             <td className="py-6 px-4 font-black text-white italic">₹{cmp.budget.toLocaleString()}</td>
                             <td className="py-6 px-4 text-right">
                                <span className="px-4 py-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                                   {cmp.status}
                                </span>
                             </td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
             </div>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
           <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 border-none shadow-2xl shadow-emerald-600/20 p-8">
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">Revenue Forecast</p>
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                 </div>
                 <h4 className="text-5xl font-black text-white tabular-nums italic tracking-tighter">₹{(budget * 1.85).toLocaleString()}</h4>
                 <p className="text-[10px] text-white/70 italic leading-relaxed">
                   "Expected ROI (Return on Investment) is currently trending at +85% for {platform} in Tier 1 regions."
                 </p>
                 <div className="pt-6 border-t border-white/20">
                    <div className="flex justify-between text-[9px] font-black text-white/60 uppercase">
                       <span>Market Index: Bullish</span>
                       <span>Yield: 1.4x</span>
                    </div>
                 </div>
              </div>
           </Card>

           <Card title="Ad Preview Lab" className="bg-slate-900 border-slate-800">
              <div className="space-y-4">
                 <p className="text-[9px] font-black text-slate-500 uppercase mb-2">Live Rendering Mockup</p>
                 <div className="aspect-[4/5] bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden relative shadow-inner group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                    <img 
                      src={`https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=400&q=80`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
                       <span className="bg-emerald-600 text-[8px] font-black text-white px-2 py-0.5 rounded uppercase tracking-widest">Sponsored</span>
                       <h5 className="text-white font-black text-sm uppercase italic">{campaignName || 'Ad Title Here'}</h5>
                       <button className="w-full py-2.5 bg-white text-black text-[9px] font-black uppercase rounded-lg">Learn More</button>
                    </div>
                 </div>
                 <p className="text-[8px] text-slate-500 italic text-center">Visual representation of the {platform} unit.</p>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignManager;
