import { useState } from 'react';

export default function Trade() {
  const [fromAsset, setFromAsset] = useState('BTC');
  const [toAsset, setToAsset] = useState('CVT');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('IDLE'); // IDLE, PROCESSING, SUCCESS, ERROR

  const handleTrade = async () => {
    if (!amount) return;
    setStatus('PROCESSING');

    try {
      // COMMAND: EXECUTE SWAP ON BACKEND
      const res = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: 'James Lambert', // In production, this pulls the logged-in user
          pair: `${fromAsset}-${toAsset}`,
          amount: amount,
          type: 'MARKET_ORDER'
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setStatus('SUCCESS');
        setTimeout(() => setStatus('IDLE'), 3000); 
      } else {
        setStatus('ERROR');
      }

    } catch (err) {
      console.error(err);
      setStatus('ERROR');
    }
  };

  return (
    <div className="min-h-full font-sans text-gray-300 flex items-center justify-center relative">
      
      <div className="w-full max-w-lg bg-[#050505] border border-[#333] rounded-lg p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* HEADER */}
        <div className="mb-8 text-center border-b border-[#333] pb-6">
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Stellar Swap</h1>
          <p className="text-xs text-[#cfa86b] font-mono mt-2 uppercase tracking-widest">// LIVE NETWORK EXECUTION</p>
        </div>

        {/* TRADING FORM */}
        <div className="space-y-6 relative z-10">
          
          {/* FROM (SELL) */}
          <div className="bg-[#111] p-4 rounded border border-[#333] group hover:border-[#cfa86b] transition-colors">
            <div className="flex justify-between text-xs text-gray-500 uppercase mb-2">
              <span>Selling (Native)</span>
              <span>Available: 1.2450</span>
            </div>
            <div className="flex gap-4">
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-2xl font-bold text-white focus:outline-none w-full font-mono"
              />
              <select 
                value={fromAsset}
                onChange={(e) => setFromAsset(e.target.value)}
                className="bg-[#222] text-white font-bold rounded px-2 py-1 border border-[#333] focus:outline-none uppercase"
              >
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>

          {/* SWAP INDICATOR */}
          <div className="flex justify-center -my-5 relative z-20">
            <div className="bg-[#050505] border border-[#333] rounded-full p-2 text-[#cfa86b] shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
          </div>

          {/* TO (BUY) */}
          <div className="bg-[#111] p-4 rounded border border-[#333] group hover:border-[#cfa86b] transition-colors">
            <div className="flex justify-between text-xs text-gray-500 uppercase mb-2">
              <span>Buying (Stellar)</span>
              <span>Liquidity: HIGH</span>
            </div>
            <div className="flex gap-4">
              <input 
                readOnly
                type="number" 
                placeholder="0.00" 
                value={amount ? (parseFloat(amount) * 96420).toFixed(2) : ''} // MOCK LIVE RATE
                className="bg-transparent text-2xl font-bold text-[#cfa86b] focus:outline-none w-full font-mono"
              />
              <select 
                value={toAsset}
                onChange={(e) => setToAsset(e.target.value)}
                className="bg-[#222] text-white font-bold rounded px-2 py-1 border border-[#333] focus:outline-none uppercase"
              >
                <option value="CVT">CVT</option>
                <option value="XLM">XLM</option>
              </select>
            </div>
          </div>

          {/* EXECUTE BUTTON */}
          <button 
            onClick={handleTrade}
            disabled={status === 'PROCESSING'}
            className={`w-full py-4 rounded font-bold text-sm uppercase tracking-widest transition-all shadow-lg ${
              status === 'SUCCESS' ? 'bg-green-500 text-black' :
              status === 'ERROR' ? 'bg-red-500 text-white' :
              'bg-[#cfa86b] text-black hover:bg-[#e0bd2f] hover:shadow-[0_0_20px_rgba(207,168,107,0.4)]'
            }`}
          >
            {status === 'IDLE' && 'CONFIRM SWAP'}
            {status === 'PROCESSING' && (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    EXECUTING ON LEDGER...
                </div>
            )}
            {status === 'SUCCESS' && 'ASSETS SECURED'}
            {status === 'ERROR' && 'TRANSACTION FAILED'}
          </button>
          
          <div className="text-center text-[10px] text-gray-600 font-mono mt-4">
            <div className="mb-1">SETTLEMENT LAYER: STELLAR NETWORK</div>
            <div>0% GAS FEES • INSTANT FINALITY</div>
          </div>

        </div>
      </div>
    </div>
  );
}
