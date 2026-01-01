
import React, { useState } from 'react';
import { generateHybridStrategy } from '../services/geminiService';
import { Platform, HybridStrategyResponse, AdProvider } from '../types';
import Card from '../components/Card';

const AiStrategist: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [gameName, setGameName] = useState('');
  const [genre, setGenre] = useState('Utility App');
  const [platform, setPlatform] = useState(Platform.Android);
  const [strategy, setStrategy] = useState<HybridStrategyResponse | null>(null);

  const handleGenerate = async () => {
    if (!gameName) return alert('Kripya project ka naam enter karein.');
    setLoading(true);
    try {
      const result = await generateHybridStrategy(gameName, genre, platform);
      setStrategy(result);
    } catch (err) {
      console.error(err);
      alert('AI Strategist could not connect. Check API key.');
    } finally {
      setLoading(false);
    }
  };

  const getProviderColor = (p: string) => {
    if (p.includes('Google')) return 'text-blue-400 border-blue-500/30 bg-blue-500/5';
    if (p.includes('Unity')) return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5';
    if (p.includes('Meta')) return 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/5';
    if (p.includes('Propeller')) return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5';
    return 'text-slate-400 border-slate-500/30 bg-slate-500/5';
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-20">
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
          AI-Powered Global Revenue
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-500">
          Global Distribution Strategist
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
          Duniya ke har kone me, har app aur web par apni ads dikhane ka master plan taiyar karein. 
        </p>
      </div>

      <Card className="max-w-5xl mx-auto bg-slate-900/80 border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl pointer-events-none font-black">AI</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end relative z-10">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Project/App Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. My Global Website"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Universal Category</label>
            <select 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option>Web Blog / Portal</option>
              <option>Mobile App (Utility)</option>
              <option>Casual Game</option>
              <option>Social Network</option>
              <option>E-commerce</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-white text-slate-950 hover:bg-slate-200 disabled:opacity-50 font-black h-[54px] rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>SIMULATING...</span>
              </div>
            ) : 'CALCULATE REACH'}
          </button>
        </div>
      </Card>

      {strategy && (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Overview Card */}
            <Card className="lg:col-span-4 bg-indigo-600/10 border-indigo-500/20">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-xl">🎯</div>
                <div className="flex-1">
                  <h3 className="text-xl font-black mb-2 uppercase tracking-tight">The "Everywhere" Masterplan</h3>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base italic">{strategy.overview}</p>
                </div>
              </div>
            </Card>

            {/* Provider Breakdown */}
            {strategy.channelBreakdown.map((channel, i) => (
              <div key={i} className="space-y-4">
                <div className={`flex items-center justify-between px-2 py-1 border-b ${getProviderColor(channel.provider)}`}>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.1em]">{channel.provider}</h4>
                  <span className="text-[9px] font-bold px-1.5 rounded bg-slate-800">Priority: {channel.priority}</span>
                </div>
                {channel.placements.map((p, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl hover:border-slate-700 transition-all group">
                    <h5 className="font-bold text-xs text-white mb-1 group-hover:text-indigo-400">{p.name}</h5>
                    <p className="text-[10px] text-slate-500 mb-2 leading-tight">Trigger: {p.trigger}</p>
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                       <p className="text-[9px] text-emerald-500 font-bold mb-0.5 uppercase">Pro Tip</p>
                       <p className="text-[10px] text-slate-400 italic leading-snug">{p.optimizationTip}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Timeline Phase */}
          <Card title="Global Deployment Roadmap">
            <div className="relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-800"></div>
              <div className="space-y-8 relative">
                {strategy.globalReachPlan.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start pl-8 relative">
                    <div className="absolute left-[-23px] top-1 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] border-4 border-slate-900 z-10"></div>
                    <div className="flex-1">
                      <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{step.phase}</h4>
                      <h5 className="text-sm font-bold text-white mb-1">{step.action}</h5>
                      <p className="text-xs text-slate-500">Target: {step.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AiStrategist;
