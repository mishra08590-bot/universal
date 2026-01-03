
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

interface BankDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  accountType: 'Savings' | 'Current';
  status: 'unverified' | 'verifying' | 'verified';
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  method: string;
  refNo: string;
  fee: number;
  status: 'Processing' | 'Completed' | 'Settling';
}

const Finance: React.FC = () => {
  const [bank, setBank] = useState<BankDetails>({
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    accountType: 'Savings',
    status: 'unverified'
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showBankForm, setShowBankForm] = useState(false);
  const [activeUnitsCount, setActiveUnitsCount] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [accumulatedRevenue, setAccumulatedRevenue] = useState(0);
  const [systemMode, setSystemMode] = useState('sandbox');

  useEffect(() => {
    const savedBank = localStorage.getItem('adspro_bank_details');
    if (savedBank) setBank(JSON.parse(savedBank));

    const savedTxns = localStorage.getItem('adspro_transactions');
    if (savedTxns) setTransactions(JSON.parse(savedTxns));

    const ads = JSON.parse(localStorage.getItem('adspro_custom_ads') || '[]');
    setActiveUnitsCount(ads.length);

    const savedRev = localStorage.getItem('adspro_total_accumulated');
    if (savedRev) setAccumulatedRevenue(parseFloat(savedRev));

    const savedMode = localStorage.getItem('adspro_system_mode') || 'sandbox';
    setSystemMode(savedMode);
  }, []);

  const withdrawnTotal = transactions.reduce((acc, t) => acc + (t.status === 'Completed' || t.status === 'Processing' ? t.amount : 0), 0);
  const availableBalance = Math.max(0, accumulatedRevenue - withdrawnTotal);

  const startVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      const updatedBank: BankDetails = { ...bank, status: 'verified' };
      setBank(updatedBank);
      localStorage.setItem('adspro_bank_details', JSON.stringify(updatedBank));
      setIsVerifying(false);
      setShowBankForm(false);
    }, 2500);
  };

  const handleWithdraw = () => {
    if (systemMode === 'sandbox') {
      alert("⚠️ NOTICE: Sandbox mode active. Ye withdrawal sirf testing ke liye hai.");
    }
    
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount < 500) return alert("Minimum withdrawal ₹500 required.");
    if (amount > availableBalance) return alert("Insufficient balance.");
    if (bank.status !== 'verified') return alert("Pehle Bank Account Verify karein.");

    const fee = amount * 0.02;
    const newTxn: Transaction = {
      id: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN'),
      amount: amount,
      method: `${bank.bankName} Account`,
      refNo: `ADS${Math.random().toString(36).toUpperCase().slice(2, 10)}`,
      fee: fee,
      status: systemMode === 'sandbox' ? 'Settling' : 'Processing'
    };

    const updatedTxns = [newTxn, ...transactions];
    setTransactions(updatedTxns);
    localStorage.setItem('adspro_transactions', JSON.stringify(updatedTxns));
    setWithdrawAmount('');
    alert(systemMode === 'production' ? "Payout Request Received. Settlement cycle: 24-48 Hours." : "Demo Payout Recorded (Sandbox).");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white tracking-tighter leading-none">Payout Terminal</h2>
          <div className="flex items-center gap-3 mt-4">
            <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full border tracking-[0.2em] ${systemMode === 'production' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
              {systemMode === 'production' ? 'VERIFIED PRODUCTION NODE' : 'SANDBOX SIMULATOR'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className={`rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border ${systemMode === 'production' ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-slate-900 border-slate-800'}`}>
            <div className={`absolute top-0 right-0 p-12 opacity-5 text-[12rem] pointer-events-none italic font-black -rotate-12 translate-x-12 ${systemMode === 'production' ? 'text-emerald-500' : 'text-white'}`}>₹</div>
            
            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Net Settled Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl md:text-4xl font-bold ${systemMode === 'production' ? 'text-emerald-500' : 'text-slate-500'}`}>₹</span>
                  <h3 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter tabular-nums leading-none">
                    {availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] space-y-6 shadow-2xl">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Withdrawal Amount</p>
                      <input 
                         type="number" 
                         className="w-full bg-transparent border-b border-slate-700 text-3xl font-black text-white py-2 outline-none focus:border-emerald-500 transition-all placeholder:text-slate-800"
                         placeholder="₹0.00"
                         value={withdrawAmount}
                         onChange={(e) => setWithdrawAmount(e.target.value)}
                       />
                   </div>
                   <button 
                    onClick={handleWithdraw}
                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl ${systemMode === 'production' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'}`}
                   >
                     Initiate Payout
                   </button>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-8 rounded-[2rem] space-y-6 shadow-2xl flex flex-col justify-between">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Payout Cycle</p>
                      <p className="text-sm font-bold text-white">Next Settlement: <span className="text-emerald-500">Wednesday</span></p>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">
                        All production earnings are processed via secure direct bank transfer.
                      </p>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                      <span>Gateway Fee: 2%</span>
                      <span className="text-emerald-500">Secure ✅</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <Card title="Payment History & Audit">
             <div className="overflow-x-auto mt-4">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-slate-800">
                         <th className="py-4">Transaction ID</th>
                         <th className="py-4">Status</th>
                         <th className="py-4 text-right">Amount</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800">
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-20 text-center text-[10px] font-black text-slate-600 uppercase italic tracking-widest">No payout history found.</td>
                        </tr>
                      ) : (
                        transactions.map(t => (
                          <tr key={t.id} className="group">
                             <td className="py-6">
                                <p className="text-xs font-black text-white">{t.id}</p>
                                <p className="text-[10px] text-slate-500 font-medium">{t.date} • Ref: {t.refNo}</p>
                             </td>
                             <td className="py-6">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${t.status === 'Processing' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                                   {t.status}
                                </span>
                             </td>
                             <td className="py-6 text-right font-black text-white text-sm">₹{t.amount.toLocaleString()}</td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
             </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card title="Payout Identity" className="bg-slate-900 border-slate-800 shadow-xl">
             {bank.status === 'verified' ? (
               <div className="space-y-6">
                  <div className="p-8 bg-gradient-to-br from-slate-800 to-black rounded-[2.5rem] border border-slate-700 relative shadow-2xl group overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl italic font-black group-hover:scale-125 transition-transform">BANK</div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Production Account</p>
                     <h4 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter italic">{bank.bankName}</h4>
                     <p className="text-lg font-mono text-slate-400 tracking-[0.2em] mb-10">**** **** {bank.accountNumber.slice(-4)}</p>
                     <div className="flex justify-between items-end">
                        <p className="text-[10px] font-black text-white uppercase">{bank.accountHolder}</p>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full font-black tracking-widest border border-emerald-500/30">VERIFIED</span>
                     </div>
                  </div>
                  <button onClick={() => setShowBankForm(true)} className="w-full py-4 border border-slate-800 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white hover:text-black transition-all">Change Linked Account</button>
               </div>
             ) : (
               <form onSubmit={startVerification} className="space-y-4">
                  <div className="space-y-4">
                    <input required value={bank.bankName} onChange={e => setBank({...bank, bankName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-emerald-500" placeholder="Bank Name" />
                    <input required value={bank.accountHolder} onChange={e => setBank({...bank, accountHolder: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-emerald-500" placeholder="Holder Legal Name" />
                    <input required type="password" value={bank.accountNumber} onChange={e => setBank({...bank, accountNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-emerald-500 font-mono" placeholder="Account Number" />
                    <input required value={bank.ifsc} onChange={e => setBank({...bank, ifsc: e.target.value.toUpperCase()})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-emerald-500 font-mono" placeholder="IFSC Code" />
                  </div>
                  <button disabled={isVerifying} className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                    {isVerifying ? 'VERIFYING BANK NODE...' : 'SECURE SAVE IDENTITY'}
                  </button>
               </form>
             )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Finance;
