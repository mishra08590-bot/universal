
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Card from '../components/Card';

const mockData = [
  { name: 'Mon', unity: 400, propeller: 240, meta: 180, google: 500 },
  { name: 'Tue', unity: 300, propeller: 450, meta: 320, google: 550 },
  { name: 'Wed', unity: 900, propeller: 600, meta: 550, google: 700 },
  { name: 'Thu', unity: 800, propeller: 550, meta: 480, google: 680 },
  { name: 'Fri', unity: 600, propeller: 900, meta: 750, google: 850 },
  { name: 'Sat', unity: 1100, propeller: 850, meta: 950, google: 1100 },
  { name: 'Sun', unity: 1300, propeller: 1100, meta: 1200, google: 1400 },
];

const providerStats = [
  { name: 'Google', value: 35, color: '#4285F4' },
  { name: 'Unity', value: 25, color: '#6366f1' },
  { name: 'Meta', value: 20, color: '#d946ef' },
  { name: 'Propeller', value: 20, color: '#06b6d4' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Global Ads Universe</h2>
            <span className="px-2 py-0.5 bg-slate-800 text-[9px] font-black text-slate-500 rounded border border-slate-700">SIMULATION MODE</span>
          </div>
          <p className="text-slate-400 text-sm italic">"Kahi Bhi, Kabhi Bhi" - Ads reaching every app & web globally.</p>
        </div>
        <div className="flex flex-wrap gap-2">
           {providerStats.map(p => (
             <div key={p.name} className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                <span className="text-[10px] font-bold uppercase tracking-widest">{p.name}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Global eCPM', value: '$18.42', trend: '+12%', color: 'text-blue-400' },
          { label: 'Total Revenue', value: '$42.9K', trend: '+28%', color: 'text-emerald-400' },
          { label: 'Total Impressions', value: '1.2M', trend: '+45%', color: 'text-amber-400' },
          { label: 'Network Health', value: 'Optimal', trend: '99.9%', color: 'text-indigo-400' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 md:p-6 hover:border-slate-600 transition-colors cursor-pointer group">
            <p className="text-[10px] md:text-sm text-slate-500 font-bold uppercase tracking-wider mb-1 group-hover:text-slate-300">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <h4 className="text-xl md:text-3xl font-black">{stat.value}</h4>
              <span className={`text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded bg-slate-800 ${stat.color}`}>{stat.trend}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Revenue Distribution Across Networks" className="lg:col-span-2">
          <div className="h-64 md:h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gGoogle" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4285F4" stopOpacity={0.4}/><stop offset="95%" stopColor="#4285F4" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gUnity" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gMeta" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#d946ef" stopOpacity={0.4}/><stop offset="95%" stopColor="#d946ef" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gProp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Area type="monotone" dataKey="google" stroke="#4285F4" fill="url(#gGoogle)" strokeWidth={3} />
                <Area type="monotone" dataKey="unity" stroke="#6366f1" fill="url(#gUnity)" strokeWidth={2} />
                <Area type="monotone" dataKey="meta" stroke="#d946ef" fill="url(#gMeta)" strokeWidth={2} />
                <Area type="monotone" dataKey="propeller" stroke="#06b6d4" fill="url(#gProp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Traffic by Platform">
          <div className="h-64 md:h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { platform: 'Android', value: 85 },
                { platform: 'iOS', value: 65 },
                { platform: 'Web', value: 95 },
                { platform: 'Social', value: 120 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis dataKey="platform" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#1e293b' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  { [0, 1, 2, 3].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#d946ef', '#06b6d4', '#fbbf24'][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
             <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Reach Index</span>
                <span className="text-xs font-bold text-emerald-400">9.4/10</span>
             </div>
             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full w-[94%]"></div>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
