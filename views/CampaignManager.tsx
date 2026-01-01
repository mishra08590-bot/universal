
import React, { useState } from 'react';
import Card from '../components/Card';

const CampaignManager: React.FC = () => {
  const [budget, setBudget] = useState(1000);
  const [target, setTarget] = useState('Global');
  const [isLaunching, setIsLaunching] = useState(false);

  const estimateReach = Math.floor(budget * 12.5);
  const estimateClicks = Math.floor(budget * 0.85);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      alert("Campaign launched! Your ad is now undergoing global compliance review.");
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black">Ad Campaign Manager</h2>
          <p className="text-slate-400 text-sm font-medium italic">Configure budget & reach for your global promotion.</p>
        </div>
        <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 text-[10px] font-black uppercase tracking-widest">
          Spending Mode Enabled
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Campaign Budget" className="md:col-span-2">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Daily Limit (INR)</label>
                <span className="text-2xl font-black text-white">₹{budget.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="50000" 
                step="500"
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
              />
              <div className="flex justify-between mt-2 text-[10px] text-slate-600 font-bold">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Geo Targeting</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                >
                  <option>Global (Recommended)</option>
                  <option>South Asia (High Volume)</option>
                  <option>Tier 1 (High Revenue)</option>
                  <option>Europe & Nordics</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase mb-2">Ad Asset Type</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm">
                  <option>Short-form Video (Reels)</option>
                  <option>Native Card</option>
                  <option>Interactive Playable</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Reach Predictor" className="bg-indigo-600/5 border-indigo-500/20">
          <div className="space-y-6">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl group-hover:scale-110 transition-transform">📈</div>
              <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Daily Impressions</p>
              <h4 className="text-3xl font-black text-indigo-400">~{estimateReach.toLocaleString()}</h4>
              <p className="text-[10px] text-slate-600 mt-1">Eye-balls reached</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl group-hover:scale-110 transition-transform">📥</div>
              <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Estimated Conversions</p>
              <h4 className="text-3xl font-black text-emerald-400">~{estimateClicks.toLocaleString()}</h4>
              <p className="text-[10px] text-slate-600 mt-1">Installs / Signups</p>
            </div>
            <div className="text-[9px] text-slate-500 bg-slate-900/50 p-3 rounded-xl border border-slate-800 leading-tight">
              <strong>Note:</strong> Predictions are based on current network eCPM averages for {target}.
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Meta Network', icon: '📱', cost: '₹2.4 / click' },
          { name: 'Google Ads', icon: '🔍', cost: '₹4.8 / click' },
          { name: 'Unity Video', icon: '🎮', cost: '₹1.1 / view' },
          { name: 'Social Reels', icon: '⚡', cost: '₹0.9 / view' },
        ].map((platform) => (
          <div key={platform.name} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 hover:border-slate-700 transition-all cursor-pointer group">
            <div className="text-2xl group-hover:scale-110 transition-transform">{platform.icon}</div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">{platform.name}</h5>
              <p className="text-[10px] text-slate-500 font-black uppercase">{platform.cost}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all">Draft Save</button>
        <button 
          onClick={handleLaunch}
          disabled={isLaunching}
          className={`w-full sm:w-auto px-12 py-3.5 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
            isLaunching ? 'bg-slate-800 cursor-not-allowed' : 'bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-red-500/20'
          }`}
        >
          {isLaunching ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">DEPLOYING...</span>
            </>
          ) : (
            <>
              <span className="text-sm uppercase tracking-wider">LAUNCH CAMPAIGN</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CampaignManager;
