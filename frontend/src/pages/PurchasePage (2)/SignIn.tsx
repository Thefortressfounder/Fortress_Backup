import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [signInIdentity, setSignInIdentity] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const id = signInIdentity.toLowerCase().trim();
    const key = signInPassword.trim();

    // SIMPLE CHECK (Hardcoded for now)
    if (id === "james" && key === "founder") {
        navigate("/founder");
        return;
    }
    // Default fallback
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex justify-center items-center px-4 font-sans">
      <div className="w-full max-w-5xl bg-[#0b0e11] border border-[#222] flex flex-col lg:flex-row shadow-2xl rounded-sm overflow-hidden">
        
        {/* LEFT: ALFRED STATUS */}
        <div className="lg:w-1/3 bg-[#080a0c] p-8 border-r border-[#222] flex flex-col justify-between">
          <div>
            <div className="text-[#fcd535] font-black tracking-widest text-2xl mb-2">ALFRED</div>
            <div className="h-1 w-10 bg-[#fcd535] mb-6"></div>
            <p className="text-gray-500 font-mono text-xs leading-relaxed mb-6">
              "System perimeter secure. Biometric scanners active. Welcome back, Sir."
            </p>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#222] pb-1">
                <span className="text-gray-600">SYSTEM</span>
                <span className="text-green-500">ONLINE</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-1">
                <span className="text-gray-600">SECURITY</span>
                <span className="text-[#fcd535]">GOD MODE</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-1">
                <span className="text-gray-600">ENCRYPTION</span>
                <span className="text-blue-500">QUANTUM-SAFE</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-gray-700 uppercase tracking-widest mt-10">
            Fortress OS v2.4.0
          </div>
        </div>

        {/* RIGHT: LOGIN FORM */}
        <div className="lg:w-2/3 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-1">Identify Yourself</h2>
          <p className="text-gray-500 text-sm mb-8">Enter your sovereign credentials.</p>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wider">Identity</label>
              <input 
                type="text" 
                value={signInIdentity}
                onChange={(e) => setSignInIdentity(e.target.value)}
                className="w-full bg-[#161a1e] border border-[#333] text-white p-3 focus:border-[#fcd535] focus:outline-none transition-colors"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wider">Key</label>
              <input 
                type="password" 
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="w-full bg-[#161a1e] border border-[#333] text-white p-3 focus:border-[#fcd535] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-[#fcd535] text-black font-bold py-4 uppercase tracking-widest hover:bg-[#e0bd2f] transition-all">
              Initiate Access
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
