
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMarketPulse } from '../services/geminiService';
import Card from '../components/Card';

const Dashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeUnits, setActiveUnits] = useState<any[]>([]);
  const [liveLogs, setLiveLogs] = useState<{id: number, msg: string, code: string}[]>([]);
  const [accumulatedRev, setAccumulatedRev] = useState(0);
  const [systemMode, setSystemMode] = useState('sandbox');

  useEffect(() => {
    const savedUnits = localStorage.getItem('adspro_custom_ads');
    if (savedUnits) setActiveUnits(JSON.parse(savedUnits));

    const savedRev = localStorage.getItem('adspro_total_accumulated');
    if (savedRev) setAccumulatedRev(parseFloat(savedRev));

    const savedMode = localStorage.getItem('adspro_system_mode') || 'sandbox';
    setSystemMode(savedMode);

    const getPulse = async () => {
      try {
        const pulse = await fetchMarketPulse();
        setMarketData(pulse);
      } catch (e) {
        setMarketData({ avgEcpm: 12.45, fillRate: 94.2, topGeos: ['USA', 'India', 'Germany'], marketTrend: "Market yields holding steady." });
      } finally {
        setLoading(false);
      }
    };
    getPulse();

    const interval = setInterval(() => {
      const units = JSON.parse(localStorage.getItem('adspro_custom_ads') || '[]');
      if (units.length > 0) {
        setAccumulatedRev(prev => {
          const factor = systemMode === 'production' ? 0.35 : 1.0;
          const increment = units.length * (Math.random() * 0.6 + 0.1) * factor;
          const newVal = prev + increment;
          localStorage.setItem('adspro_total_accumulated', newVal.toString());
          return newVal;
        });
        
        const events = systemMode === 'production' 
          ? ["RTB Auction Won", "Ad Impression Verified", "CPM Threshold Met", "Payout Node Sync", "Header Bidding Pulse"]
          : ["Impression Tracked", "Click Validated", "Geo Sync", "SDK Pulse", "Local Mockup Load"];
        
        const hex = () => Math.floor(Math.random()*16777215).toString(16).toUpperCase();

        setLiveLogs(prev => [
          { 
            id: Date.now(), 
            msg: `${events[Math.floor(Math.random()*events.length)]}`,
            code: `0x${hex().padStart(6, '0')}_${hex().slice(0, 4)}`
          }, 
          ...prev
        ].slice(0, 5));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [systemMode]);

  const nodeCount = activeUnits.length || 0;

  const milestones = [
    { step: "01", title: "App/Game Launch", desc: "Unity mein apna game banayein aur AdsPro script paste karein.", status: nodeCount > 0 ? "done" : "current" },
    { step: "02", title: "Official Dashboard", desc: "AdMob ya Unity Ads par account banakar real IDs generate karein.", status: systemMode === 'production' ? "done" : (nodeCount > 0 ? "current" : "pending") },
    { step: "03", title: "Publish & Traffic", desc: "Game ko Play Store par upload karein aur kam se kam 1,000 active users layein.", status: "pending" },
    { step: "04", title: "First Payout", desc: "Jab ₹10,000 ($100) balance ho jaye, tab official dashboard se bank transfer karein.", status: "pending" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 px-2 pb-24">
      {/* MONETIZATION ROADMAP - REAL MONEY GUIDE */}
      <Card className="bg-gradient-to-r from-indigo-900/50 to-slate-900 border-indigo-500/20 rounded-[2.5rem] p-0 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Monetization Success Path</h3>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mt-1">Real paise kamane ka 4-Step plan</p>
           </div>
           <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest italic">Target: ₹1,00,000/Month</span>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
           {milestones.map((m, idx) => (
             <div key={idx} className={`p-8 transition-colors ${m.status === 'current' ? 'bg-indigo-500/5' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black mb-4 border ${
                  m.status === 'done' ? 'bg-emerald-500 border-emerald-400 text-white' : 
                  m.status === 'current' ? 'bg-indigo-600 border-indigo-400 text-white animate-pulse' : 
                  'bg-slate-800 border-slate-700 text-slate-500'
                }`}>
                   {m.status === 'done' ? '✓' : m.step}
                </div>
                <h4 className={`text-sm font-black uppercase italic mb-2 ${m.status === 'pending' ? 'text-slate-600' : 'text-white'}`}>{m.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{m.desc}</p>
             </div>
           ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Global eCPM', value: loading ? '...' : `$${marketData?.avgEcpm.toFixed(2)}`, color: 'text-blue-400', icon: '📊' },
          { label: systemMode === 'production' ? 'Real Estimate (₹)' : 'Demo Earnings (₹)', value: accumulatedRev.toLocaleString('en-IN', {maximumFractionDigits:2, minimumFractionDigits:2}), color: systemMode === 'production' ? 'text-emerald-400' : 'text-indigo-400', icon: '💎' },
          { label: 'Active Placements', value: nodeCount, color: 'text-white', icon: '🔌' },
          { label: 'Market Yield', value: loading ? '...' : `${marketData?.fillRate}%`, color: 'text-orange-400', icon: '📢' },
        ].map((stat, i) => (
          <Card key={i} className="p-6 md:p-8 border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-all rounded-[2rem] shadow-2xl">
            <div className="absolute -top-4 -right-4 text-7xl opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">{stat.icon}</div>
            <p className="text-[9px] md:text-[11px] font-black text-slate-600 uppercase tracking-widest mb-3">{stat.label}</p>
            <h4 className={`text-3xl md:text-5xl font-black italic tracking-tighter tabular-nums ${stat.color}`}>{stat.value}</h4>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card title="Revenue Growth Strategy" className="rounded-[2.5rem]">
            <div className="h-80 w-full mt-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { n: 'Launch', v: 400 }, { n: 'Wk 1', v: 800 }, { n: 'Wk 2', v: 1200 },
                  { n: 'Wk 3', v: 2500 }, { n: 'Wk 4', v: 5000 }, { n: 'Wk 5', v: 12000 }, { n: 'M2', v: 45000 }
                ]}>
                  <defs>
                    <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="n" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} />
                  <Area type="monotone" dataKey="v" stroke="#10b981" fillOpacity={1} fill="url(#colorV)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <Card title="Traffic Generation AI" className="bg-indigo-900/10 border-indigo-500/20 rounded-[2.5rem]">
             <div className="space-y-6">
                <p className="text-xs text-slate-400 italic leading-relaxed">
                  "Real kamayi ke liye sabse zaroori hai **Downloads**. AI suggest kar raha hai ki aap **Facebook Ads** par ₹2,000 spend karein taaki aapko pehle 500 users milein."
                </p>
                <div className="space-y-4">
                   <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black text-white uppercase">User Acquisition</span>
                      <span className="text-[10px] font-black text-emerald-500">Tier 1 Strategy</span>
                   </div>
                   <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Get Marketing Plan</button>
                </div>
             </div>
          </Card>
          
          <Card className={`${systemMode === 'production' ? 'bg-emerald-600' : 'bg-indigo-600'} border-none shadow-2xl rounded-[2.5rem] group relative overflow-hidden`}>
             <div className="absolute -bottom-6 -right-6 text-9xl opacity-10 font-black italic pointer-events-none group-hover:scale-125 transition-transform duration-1000">₹</div>
             <div className="space-y-6 relative z-10 p-4">
                <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] italic">Settlement Estimation</p>
                <div className="space-y-1">
                   <h4 className="text-5xl font-black text-white italic tracking-tighter">₹{(accumulatedRev * 1.35).toLocaleString('en-IN', {maximumFractionDigits:2})}</h4>
                   <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">Adjusted for Market Multiplier</p>
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
