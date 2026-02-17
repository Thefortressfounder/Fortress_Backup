import { useState } from 'react';

export default function Wallet() {
  const [activeAsset, setActiveAsset] = useState<string | null>(null);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  // NATIVE ASSET LIST
  const assets = [
    { id: 'CVT', name: 'Fortress Conviction', balance: '50,000,000.00', value: '50,000,000.00', type: 'Native', icon: 'π', color: '#cfa86b' },
    { id: 'BTC', name: 'Bitcoin', balance: '0.00000000', value: '0.00', type: 'Native UTXO', icon: '₿', color: '#f7931a' },
    { id: 'ETH', name: 'Ethereum', balance: '0.00000000', value: '0.00', type: 'Native EVM', icon: 'Ξ', color: '#627eea' },
    { id: 'SOL', name: 'Solana', balance: '0.00000000', value: '0.00', type: 'Native SPL', icon: '◎', color: '#14f195' },
    { id: 'XRP', name: 'XRP', balance: '0.00000000', value: '0.00', type: 'Native', icon: '✕', color: '#ffffff' },
    { id: 'USDT', name: 'Tether', balance: '0.00', value: '0.00', type: 'Stablecoin', icon: '₮', color: '#26a17b' },
  ];

  const handleAction = (assetId: string, action: 'deposit' | 'withdraw') => {
    setActiveAsset(assetId);
    if (action === 'deposit') setShowDeposit(true);
    if (action === 'withdraw') setShowWithdraw(true);
  };

  return (
    <div className="min-h-full font-sans text-gray-300 relative">
      <div className="border-b border-[#333] pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Unified Sovereign Vault</h1>
          <p className="text-xs text-[#cfa86b] font-mono mt-1 uppercase tracking-widest">// UFOS CORE: Multi-Chain Custody</p>
        </div>
        <div className="text-right">
             <div className="text-[10px] text-gray-500 uppercase tracking-wider">Total Vault Value</div>
             <div className="text-2xl font-bold text-white">$50,000,000.00</div>
        </div>
      </div>

      <div className="bg-[#050505] border border-[#333] rounded-lg overflow-hidden">
        <div className="p-4 bg-[#111] border-b border-[#333] grid grid-cols-12 text-[10px] text-gray-500 uppercase tracking-widest">
            <div className="col-span-4">Asset Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-3 text-right">Balance</div>
            <div className="col-span-3 text-right">Actions</div>
        </div>
        <div className="divide-y divide-[#222]">
            {assets.map((asset) => (
                <div key={asset.id} className="grid grid-cols-12 items-center p-4 hover:bg-[#111] transition-colors group">
                    <div className="col-span-4 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-black" style={{ backgroundColor: asset.color }}>{asset.icon}</div>
                        <div><div className="text-white font-bold text-sm">{asset.name}</div><div className="text-[10px] text-gray-500 font-mono">{asset.id}</div></div>
                    </div>
                    <div className="col-span-2"><span className="bg-[#1a1a1a] border border-[#333] text-gray-400 px-2 py-1 rounded text-[10px] uppercase">{asset.type}</span></div>
                    <div className="col-span-3 text-right"><div className="text-white font-mono text-sm">{asset.balance}</div><div className="text-[10px] text-gray-500">${asset.value}</div></div>
                    <div className="col-span-3 flex justify-end gap-2">
                        <button onClick={() => handleAction(asset.id, 'deposit')} className="bg-[#111] border border-[#333] text-white text-[10px] font-bold px-3 py-2 rounded hover:border-[#cfa86b] hover:text-[#cfa86b] transition-colors uppercase">Deposit</button>
                        <button onClick={() => handleAction(asset.id, 'withdraw')} className="bg-[#111] border border-[#333] text-gray-500 text-[10px] font-bold px-3 py-2 rounded hover:bg-[#222] transition-colors uppercase">Send</button>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {showDeposit && activeAsset && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="bg-[#111] border border-[#cfa86b] p-8 rounded-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold uppercase mb-4">Deposit {activeAsset}</h2>
                <div className="bg-white p-4 rounded-lg mb-6 flex justify-center"><div className="w-48 h-48 bg-black"></div></div>
                <input readOnly value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" className="w-full bg-[#050505] border border-[#333] text-[#cfa86b] font-mono text-xs p-3 rounded mb-4" />
                <button onClick={() => setShowDeposit(false)} className="w-full bg-[#222] text-white py-3 rounded uppercase text-xs font-bold">Close</button>
            </div>
        </div>
      )}

       {showWithdraw && activeAsset && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="bg-[#111] border border-[#333] p-8 rounded-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold uppercase mb-4">Send {activeAsset}</h2>
                <input type="text" placeholder="Recipient Address" className="w-full bg-[#050505] border border-[#333] text-white p-3 rounded mb-4" />
                <input type="number" placeholder="Amount" className="w-full bg-[#050505] border border-[#333] text-white p-3 rounded mb-4" />
                <div className="flex gap-4">
                    <button onClick={() => setShowWithdraw(false)} className="flex-1 bg-[#222] text-white py-3 rounded uppercase text-xs font-bold">Cancel</button>
                    <button className="flex-1 bg-[#cfa86b] text-black py-3 rounded uppercase text-xs font-bold">Confirm</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
