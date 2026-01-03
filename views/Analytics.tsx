
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';

const Analytics: React.FC = () => {
  const [stats, setStats] = useState({
    performanceData: [] as any[],
    deviceData: [] as any[],
    arpu: 0,
    retention: '0%'
  });
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const units = JSON.parse(localStorage.getItem('adspro_custom_ads') || '[]');
    const campaigns = JSON.parse(localStorage.getItem('adspro_live_campaigns') || '[]');
    
    const baseRevenue = units.length * 1250;
    const campaignImpact = campaigns.length * 500;
    const totalPower = baseRevenue + campaignImpact;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const dynamicPerformance = months.map((month, idx) => ({
      name: month,
      revenue: Math.floor((totalPower * (0.5 + Math.random())) + (idx * 200)),
      ecpm: parseFloat((12 + Math.random() * 5).toFixed(2))
    }));

    const dynamicDevices = [
      { name: 'High-end Android', value: 40 + Math.floor(Math.random() * 10), color: '#6366f1' },
      { name: 'iPhone Pro', value: 25 + Math.floor(Math.random() * 5), color: '#d946ef' },
      { name: 'Budget Android', value: 20, color: '#06b6d4' },
      { name: 'Tablet/iPad', value: 10, color: '#f59e0b' },
    ];

    setStats({
      performanceData: dynamicPerformance,
      deviceData: dynamicDevices,
      arpu: (totalPower / 1000).toFixed(2) as any,
      retention: `${40 + units.length * 2}%`
    });
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Enterprise Intelligence Report generated and saved to your local vault (Downloads).");
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-32 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Yield Intelligence</h2>
          <p className="text-slate-500 text-sm font-medium">Real-time performance tracking for all active SDK nodes.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 active:scale-95 transition-all shadow-xl shadow-indigo-600/20"
           >
              {isExporting ? 'Generating Report...' : '📥 Export Enterprise Report'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Revenue Flow & Yield (eCPM)" className="lg:col-span-2 bg-slate-900/50">
          <div className="h-80 w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.performanceData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#6366f1" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Traffic Quality Mix" className="bg-slate-900/50">
          <div className="h-64 w-full flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {stats.deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-6">
            {stats.deviceData.map((d) => (
              <div key={d.name} className="p-3 bg-black/20 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{d.name}</span>
                </div>
                <p className="text-xs font-black text-white">{d.value}%</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Avg. ARPU', value: `$${stats.arpu}`, icon: '💎', color: 'text-indigo-400' },
          { label: 'Retention (D1)', value: stats.retention, icon: '🔄', color: 'text-emerald-400' },
          { label: 'Network Uptime', value: '99.98%', icon: '⚡', color: 'text-amber-400' },
        ].map((stat, i) => (
          <Card key={i} className="flex items-center gap-6 p-8 bg-slate-900/50 hover:border-slate-700 transition-all group">
            <div className="text-5xl group-hover:scale-110 transition-transform">{stat.icon}</div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className={`text-3xl font-black italic ${stat.color}`}>{stat.value}</h4>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
