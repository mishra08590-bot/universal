
import React, { useState, useRef, useEffect } from 'react';
import { getAiSupportResponse } from '../services/geminiService';
import Card from '../components/Card';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const SupportAi: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Welcome to AdsPro Expert Support. I have full access to current monetization trends. How can I help you scale your global revenue today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    const historyForAi = messages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await getAiSupportResponse(userMsg, historyForAi);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', text: "TECHNICAL ERROR: I was unable to connect to the reasoning engine. Please verify your API Key in Settings." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-14rem)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Advanced AI Consultant</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Scalable Monetization Intelligence</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
           <span className="text-[10px] font-black text-indigo-400 uppercase">Enterprise Reasoning Active</span>
        </div>
      </div>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-slate-900/30 border-slate-800 backdrop-blur-xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed shadow-xl ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700 font-medium'
              }`}>
                {m.text.split('\n').map((line, idx) => (
                  <p key={idx} className={line.startsWith('-') ? 'ml-4' : 'mb-2 last:mb-0'}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 p-5 rounded-2xl rounded-tl-none border border-slate-700/50 flex gap-3 items-center">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Consulting Neural Engine...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-slate-950/50 border-t border-slate-800">
          <div className="flex gap-3">
            <input 
              type="text" 
              className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 font-medium"
              placeholder="Query: How to increase eCPM for Tier 3 traffic in India?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 shadow-xl shadow-indigo-600/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SupportAi;
