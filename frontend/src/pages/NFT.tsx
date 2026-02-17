import { useState } from 'react';

export default function NFT() {
  const [activeTab, setActiveTab] = useState('mint');
  
  // MOCK: In the real app, we check userRole === 'founder'
  const isFounder = true; 

  return (
    <div className="min-h-full font-sans text-gray-300">
      
      {/* HEADER */}
      <div className="border-b border-[#333] pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Artifact Forge</h1>
          <p className="text-xs text-[#cfa86b] font-mono mt-1 uppercase tracking-widest">// NFT Minting & Gallery</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-2 text-xs font-bold uppercase rounded border ${activeTab === 'gallery' ? 'bg-[#cfa86b] text-black border-[#cfa86b]' : 'bg-[#111] text-gray-500 border-[#333]'}`}
            >
                Gallery
            </button>
            <button 
                onClick={() => setActiveTab('mint')}
                className={`px-4 py-2 text-xs font-bold uppercase rounded border ${activeTab === 'mint' ? 'bg-[#cfa86b] text-black border-[#cfa86b]' : 'bg-[#111] text-gray-500 border-[#333]'}`}
            >
                Mint New
            </button>
        </div>
      </div>

      {activeTab === 'mint' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* PUBLIC MINTING INTERFACE (Everyone sees this) */}
            <div className="bg-[#050505] border border-[#333] rounded-lg p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-[#cfa86b]">✦</span> Mint Standard NFT
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Asset Name</label>
                        <input type="text" placeholder="e.g. Fortress Badge #001" className="w-full bg-[#111] border border-[#333] text-white p-3 rounded focus:border-[#cfa86b] focus:outline-none" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Description</label>
                        <textarea rows={3} placeholder="Describe the utility or art..." className="w-full bg-[#111] border border-[#333] text-white p-3 rounded focus:border-[#cfa86b] focus:outline-none"></textarea>
                    </div>
                    <div className="border-2 border-dashed border-[#333] rounded-lg p-8 text-center hover:border-[#cfa86b] transition-colors cursor-pointer group">
                        <div className="text-gray-500 group-hover:text-[#cfa86b]">
                            <div className="mb-2">Drag & Drop Image</div>
                            <div className="text-[10px] uppercase tracking-widest">JPG, PNG, GIF (Max 10MB)</div>
                        </div>
                    </div>
                    <button className="w-full bg-[#cfa86b] text-black font-bold py-3 rounded hover:bg-[#e0bd2f] transition-colors uppercase tracking-wider">
                        Mint to Blockchain (50 CVT Fee)
                    </button>
                </div>
            </div>

            {/* FOUNDER OVERRIDE (Only YOU see this) */}
            {isFounder && (
                <div className="bg-[#1a0f0f] border border-red-900/30 rounded-lg p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-32 h-32 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                    </div>
                    
                    <h2 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
                        <span className="animate-pulse">⚠️</span> Founder Override
                    </h2>
                    <p className="text-xs text-gray-500 mb-6">
                        This terminal allows the creation of non-standard assets (Deeds, Access Keys, Gov Tokens).
                        <br/><span className="text-red-400">RESTRICTED: JAMES LAMBERT ONLY.</span>
                    </p>

                    <div className="space-y-4 relative z-10">
                        <div>
                            <label className="text-xs text-red-900 uppercase tracking-wider block mb-2">Asset Type</label>
                            <select className="w-full bg-[#3f1111] border border-[#5c1c1c] text-red-100 p-3 rounded focus:outline-none">
                                <option>Special Access Key (NFT)</option>
                                <option>Real Estate Deed (Tokenized)</option>
                                <option>Governance Rights</option>
                            </select>
                        </div>
                        <button className="w-full bg-[#3f1111] text-red-400 border border-[#5c1c1c] font-bold py-3 rounded hover:bg-[#5c1c1c] transition-colors uppercase tracking-wider">
                            Execute Special Mint
                        </button>
                    </div>
                </div>
            )}
        </div>
      ) : (
        /* GALLERY VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3].map((i) => (
                <div key={i} className="bg-[#050505] border border-[#333] rounded-lg overflow-hidden group hover:border-[#cfa86b] transition-all">
                    <div className="h-48 bg-[#111] flex items-center justify-center text-gray-600">
                        <span className="font-mono text-xs">[ ASSET_IMG_{i} ]</span>
                    </div>
                    <div className="p-4">
                        <div className="text-white font-bold">Genesis Key #{i}</div>
                        <div className="text-xs text-gray-500 mt-1">Founder Collection</div>
                    </div>
                </div>
            ))}
        </div>
      )}

    </div>
  );
}
