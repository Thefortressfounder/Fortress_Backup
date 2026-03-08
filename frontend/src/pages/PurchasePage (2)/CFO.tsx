import { useState } from 'react';

export default function CFO() {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [saleDetails, setSaleDetails] = useState({ user: '', amount: '' });

  return (
    <div className="min-h-full text-gray-300 font-sans relative">
      <div className="flex justify-between items-end mb-8 border-b border-[#333] pb-6">
        <div>
          <h1 className="text-4xl font-black text-[#cfa86b] tracking-tighter uppercase">Fortress Treasury</h1>
          <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-[0.3em]">// Asset Class: CONVICTION (CVT)</p>
        </div>
        <div className="bg-[#111] border border-[#333] px-3 py-1 text-green-500 text-xs font-bold rounded flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             MULTISIG ACTIVE (3/3)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#050505] border border-[#cfa86b]/30 rounded-lg p-8">
          <div className="text-xs text-[#cfa86b] font-mono tracking-widest uppercase mb-2">Founder Allocation (Locked)</div>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black text-white tracking-tighter">50,000,000</span>
            <span className="text-2xl font-bold text-[#cfa86b]">CVT</span>
          </div>
          <div className="mt-6 flex gap-8 text-xs font-mono text-gray-500">
            <div><span className="block text-gray-400">VALUE</span>$50,000,000.00</div>
            <div><span className="block text-gray-400">PEG</span>$1.00 USD</div>
            <div><span className="block text-red-500">POLICY</span>NO BURN</div>
          </div>
        </div>

        <div className="bg-[#050505] border border-[#333] rounded-lg p-6 flex flex-col justify-between">
           <div className="space-y-3">
             <div className="p-3 bg-[#111] border border-[#222] rounded text-center mb-4">
                <div className="text-[10px] text-gray-500 uppercase">Public Price</div>
                <div className="text-xl font-bold text-white">$1.00 USD</div>
             </div>
             <button onClick={() => setShowSaleModal(true)} className="w-full bg-[#cfa86b] text-black font-bold py-3 rounded text-sm hover:bg-[#e0bd2f] transition-colors uppercase tracking-wider flex justify-between px-4 items-center">
               <span>Authorize Sale</span>
               <span>$ →</span>
             </button>
             <div className="text-[10px] text-center text-red-500 font-mono mt-4 pt-4 border-t border-[#222]">⚠ MINTING LOCKED</div>
           </div>
        </div>
      </div>

      {showSaleModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="bg-[#111] border border-[#cfa86b] p-8 rounded-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold mb-6 uppercase border-b border-[#333] pb-4">New CVT Sale</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Buyer Username</label>
                        <input type="text" className="w-full bg-[#050505] border border-[#333] text-white p-3 rounded" placeholder="username" onChange={(e) => setSaleDetails({...saleDetails, user: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Amount (CVT)</label>
                        <input type="number" className="w-full bg-[#050505] border border-[#333] text-white p-3 rounded" placeholder="1000" onChange={(e) => setSaleDetails({...saleDetails, amount: e.target.value})} />
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => setShowSaleModal(false)} className="flex-1 bg-[#222] text-white py-3 rounded uppercase text-xs font-bold">Cancel</button>
                        <button className="flex-1 bg-[#cfa86b] text-black py-3 rounded uppercase text-xs font-bold">Generate Invoice</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="bg-[#050505] border border-[#333] rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#111] text-gray-500 border-b border-[#333]">
            <tr><th className="p-4">TX ID</th><th className="p-4">TYPE</th><th className="p-4 text-right">AMOUNT</th></tr>
          </thead>
          <tbody className="divide-y divide-[#222] text-gray-300">
            <tr>
              <td className="p-4 text-gray-500">TX_GENESIS_001</td>
              <td className="p-4 text-[#cfa86b]">FOUNDER MINT</td>
              <td className="p-4 text-right">+50,000,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
