
export default function Founder() {
  return (
    <div className="min-h-full font-sans text-gray-300">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 pb-6 border-b border-[#222]">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fcd535] to-[#cfa86b] tracking-tight uppercase">
            Command Center
          </h1>
          <p className="text-gray-500 text-xs font-mono mt-2 tracking-[0.2em] uppercase">
            // System Administrator: James Lambert
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="px-3 py-1 bg-[#111] border border-[#333] rounded text-xs font-mono text-green-500 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
          <div className="px-3 py-1 bg-[#111] border border-[#333] rounded text-xs font-mono text-[#fcd535]">
            V.2.4.0
          </div>
        </div>
      </div>

      {/* --- KPI GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* CARD 1: TREASURY (GOLD) */}
        <div className="relative overflow-hidden bg-[#0b0e11] p-6 rounded-lg border border-[#222] group hover:border-[#fcd535] transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fcd535] to-transparent"></div>
          <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-2">Total Treasury</div>
          <div className="text-3xl font-bold text-white tracking-tight">50.0M <span className="text-sm text-[#fcd535]">CVT</span></div>
          <div className="mt-4 text-xs text-gray-600 font-mono">Vault Status: <span className="text-green-500">LOCKED</span></div>
        </div>

        {/* CARD 2: USERS (BLUE) */}
        <div className="relative overflow-hidden bg-[#0b0e11] p-6 rounded-lg border border-[#222] group hover:border-blue-500 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-2">Active Citizens</div>
          <div className="text-3xl font-bold text-white tracking-tight">1</div>
          <div className="mt-4 text-xs text-gray-600 font-mono">Growth: <span className="text-blue-500">+100%</span></div>
        </div>

        {/* CARD 3: SERVER (GREEN) */}
        <div className="relative overflow-hidden bg-[#0b0e11] p-6 rounded-lg border border-[#222] group hover:border-green-500 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent"></div>
          <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-2">System Load</div>
          <div className="text-3xl font-bold text-white tracking-tight">0.2%</div>
          <div className="mt-4 text-xs text-gray-600 font-mono">CPU: <span className="text-green-500">OPTIMAL</span></div>
        </div>

        {/* CARD 4: NETWORK (PURPLE) */}
        <div className="relative overflow-hidden bg-[#0b0e11] p-6 rounded-lg border border-[#222] group hover:border-purple-500 transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
          <div className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-2">Block Height</div>
          <div className="text-3xl font-bold text-white tracking-tight">#891,02</div>
          <div className="mt-4 text-xs text-gray-600 font-mono">Sync: <span className="text-purple-500">12ms</span></div>
        </div>
      </div>

      {/* --- SPLIT SECTION: CONTROLS & LOGS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        
        {/* LEFT: ADMIN ACTIONS */}
        <div className="bg-[#0b0e11] border border-[#222] rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Server Override</h3>
            <p className="text-xs text-gray-500 mb-6">Direct kernel access controls.</p>
            
            <div className="space-y-3">
              <button className="w-full flex justify-between items-center px-4 py-3 bg-[#161a1e] border border-[#333] rounded hover:bg-[#222] hover:border-[#fcd535] transition-all group">
                <span className="text-sm font-bold text-gray-300 group-hover:text-white">RESTART CORE</span>
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </button>
              
              <button className="w-full flex justify-between items-center px-4 py-3 bg-[#161a1e] border border-[#333] rounded hover:bg-[#222] hover:border-blue-500 transition-all group">
                <span className="text-sm font-bold text-gray-300 group-hover:text-white">FLUSH CACHE</span>
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              </button>

               <button className="w-full flex justify-between items-center px-4 py-3 bg-[#161a1e] border border-[#333] rounded hover:bg-[#3f1111] hover:border-red-500 transition-all group">
                <span className="text-sm font-bold text-gray-300 group-hover:text-red-200">LOCKDOWN PROTOCOL</span>
                <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[#222]">
            <div className="text-[10px] text-gray-600 font-mono uppercase">Auth Token: valid</div>
          </div>
        </div>

        {/* RIGHT: LIVE TERMINAL (Takes up 2 cols) */}
        <div className="lg:col-span-2 bg-[#050505] border border-[#222] rounded-lg p-6 font-mono text-xs overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-[#111] border-b border-[#222] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            <span className="ml-2 text-gray-500">root@fortress-main:~</span>
          </div>
          
          <div className="mt-8 space-y-2 text-gray-400 h-full overflow-y-auto pb-4">
            <div className="flex">
              <span className="text-[#fcd535] w-24">[12:01:45]</span>
              <span>ACCESS_GRANTED: User 'James Lambert' identified via Founder Key.</span>
            </div>
            <div className="flex">
               <span className="text-blue-500 w-24">[12:01:46]</span>
               <span>INIT: Dashboard components loaded successfully in 12ms.</span>
            </div>
             <div className="flex">
               <span className="text-green-500 w-24">[12:00:22]</span>
               <span>NETWORK: Node connection established. Peers: 0/12.</span>
            </div>
             <div className="flex">
               <span className="text-gray-600 w-24">[11:59:01]</span>
               <span>SYSTEM: Garbage collection run complete. Freed 40mb.</span>
            </div>
            <div className="flex animate-pulse">
               <span className="text-[#fcd535] w-24">[ NOW ]</span>
               <span className="text-white">Waiting for command input_</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
