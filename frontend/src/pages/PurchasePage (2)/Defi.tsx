import { useState } from 'react';

export default function Defi() {
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState(0);

  const handleStake = () => {
    if (!stakeAmount) return;
    setStakedBalance(prev => prev + parseFloat(stakeAmount));
    setStakeAmount('');
  };

  return (
    <div className="min-h-full font-sans text-gray-300">
      <div className="border-b border-[#333] pb-6 mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight uppercase">DeFi Protocol</h1>
        <p className="text-xs text-[#cfa86b] font-mono mt-1 uppercase tracking-widest">// Staking & Yield Generation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* STAKING POOL */}
        <div className="lg:col-span-2 bg-[#050505] border border-[#cfa86b]/30 rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-32 h-32 text-[#cfa86b]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5 10 5 10-5-5-2.5-5 2.5z"/></svg>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-[#cfa86b]">⚡</span> Fortress Core Pool
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-[#111] p-4 rounded border border-[#333]">
              <div className="text-[10px] text-gray-500 uppercase">APY Rate</div>
              <div className="text-2xl font-bold text-[#cfa86b]">12.5%</div>
            </div>
            <div className="bg-[#111] p-4 rounded border border-[#333]">
              <div className="text-[10px] text-gray-500 uppercase">Total Staked</div>
              <div className="text-2xl font-bold text-white">4.2M <span className="text-xs text-gray-600">CVT</span></div>
            </div>
            <div className="bg-[#111] p-4 rounded border border-[#333]">
              <div className="text-[10px] text-gray-500 uppercase">Your Stake</div>
              <div className="text-2xl font-bold text-white">{stakedBalance.toLocaleString()} <span className="text-xs text-gray-600">CVT</span></div>
            </div>
          </div>

          <div className="bg-[#111] p-6 rounded border border-[#333]">
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Stake Amount</label>
            <div className="flex gap-4">
              <input 
                type="number" 
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-[#050505] border border-[#333] text-white p-3 rounded font-mono focus:border-[#cfa86b] focus:outline-none transition-colors"
              />
              <button 
                onClick={handleStake}
                className="bg-[#cfa86b] text-black font-bold px-8 rounded hover:bg-[#e0bd2f] transition-colors uppercase tracking-wider"
              >
                STAKE
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-600 flex justify-between">
              <span>Available: 0.00 CVT</span>
              <span>Lock Period: 7 Days</span>
            </div>
          </div>
        </div>

        {/* REWARDS PANEL */}
        <div className="bg-[#050505] border border-[#333] rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm">Yield Generator</h3>
            <div className="bg-[#111] rounded p-4 border border-[#222] mb-4">
              <div className="text-gray-500 text-[10px] uppercase">Unclaimed Rewards</div>
              <div className="text-3xl font-bold text-white mt-1">0.000 <span className="text-[#cfa86b] text-sm">CVT</span></div>
              <div className="text-green-500 text-xs mt-1">+$0.00 USD</div>
            </div>
          </div>
          <button className="w-full bg-[#111] text-gray-400 border border-[#333] font-bold py-3 rounded hover:bg-[#222] transition-colors uppercase tracking-wider">
            Claim Rewards
          </button>
        </div>

      </div>
    </div>
  );
}
