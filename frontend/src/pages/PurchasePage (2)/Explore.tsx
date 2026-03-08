export default function Explore() {
  return (
    <div className="min-h-full font-sans text-gray-300">
      <div className="border-b border-[#333] pb-6 mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Live Markets</h1>
        <p className="text-xs text-[#cfa86b] font-mono mt-1 uppercase tracking-widest">// Global Tickers</p>
      </div>
      
      <div className="space-y-4">
        {/* CVT */}
        <div className="bg-[#050505] border border-[#cfa86b]/30 p-4 rounded flex justify-between items-center hover:bg-[#111] transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#cfa86b] flex items-center justify-center text-black font-bold">π</div>
            <div>
              <div className="text-white font-bold">Fortress Convictionion</div>
              <div className="text-xs text-[#cfa86b]">CVT</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-mono">$0.10</div>
            <div className="text-green-500 text-xs">+0.00%</div>
          </div>
        </div>

        {/* BTC */}
        <div className="bg-[#050505] border border-[#333] p-4 rounded flex justify-between items-center hover:bg-[#111] transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-gray-400 font-bold">₿</div>
            <div>
              <div className="text-gray-300 font-bold">Bitcoin</div>
              <div className="text-xs text-gray-500">BTC</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-300 font-mono">$96,420.00</div>
            <div className="text-green-500 text-xs">+2.4%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
