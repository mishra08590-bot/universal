
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';

const performanceData = [
  { name: 'Jan', revenue: 4000, ecpm: 12.5 },
  { name: 'Feb', revenue: 3000, ecpm: 11.2 },
  { name: 'Mar', revenue: 5000, ecpm: 15.8 },
  { name: 'Apr', revenue: 4500, ecpm: 14.1 },
  { name: 'May', revenue: 6000, ecpm: 18.4 },
];

const deviceData = [
  { name: 'High-end Android', value: 45, color: '#6366f1' },
  { name: 'iPhone Pro', value: 30, color: '#d946ef' },
  { name: 'Budget Android', value: 15, color: '#06b6d4' },
  { name: 'Tablet/iPad', value: 10, color: '#f59e0b' },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black">Performance Analytics</h2>
          <p className="text-slate-400 text-sm">Deep dive into your global ad revenue stream.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
          EXPORT CSV ↓
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Revenue vs eCPM Trend" className="lg:col-span-2">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#6366f1" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="ecpm" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Traffic by Device Quality">
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {deviceData.map((d) => (
              <div key={d.name} className="flex justify-between items-center text-[10px] font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-slate-400 uppercase tracking-wider">{d.name}</span>
                </div>
                <span>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Avg. Session', value: '4m 12s', icon: '⏱️' },
          { label: 'Retention (D1)', value: '42.8%', icon: '🔄' },
          { label: 'ARPU', value: '$0.85', icon: '💎' },
        ].map((stat, i) => (
          <Card key={i} className="flex items-center gap-6 p-6 bg-slate-900/40">
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-white">{stat.value}</h4>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
