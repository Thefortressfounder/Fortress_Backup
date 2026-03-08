import React, { useState, useEffect, useRef } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'alfred', text: 'Secure Channel Established. I am ready to execute server commands.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    // 1. Add User Message to screen
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);

    try {
      // 2. REAL CONNECTION: Send data to the Server
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();

      // 3. Add Alfred's Response to screen
      setMessages(prev => [...prev, { 
        sender: 'alfred', 
        text: data.reply || "I heard you, but my response was empty." 
      }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        sender: 'alfred', 
        text: "ERROR: I cannot reach the backend server. Is 'server.js' running?" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-[#050505] rounded-lg border border-[#333] overflow-hidden font-sans">
      
      {/* HEADER */}
      <div className="bg-[#111] p-4 border-b border-[#333] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-ping' : 'bg-green-500'}`}></div>
          <span className="text-[#cfa86b] font-mono tracking-widest text-sm uppercase">ALFRED CORE // {loading ? 'PROCESSING' : 'ONLINE'}</span>
        </div>
        <div className="text-xs text-gray-500 font-mono">ENCRYPTION: AES-256</div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#050505]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-lg text-sm border ${
              msg.sender === 'user' 
                ? 'bg-[#111] border-[#cfa86b]/50 text-[#cfa86b] font-mono' 
                : 'bg-[#111] border-[#333] text-gray-300 font-sans leading-relaxed'
            }`}>
              {msg.sender === 'alfred' && <div className="text-[10px] text-green-500 mb-1 uppercase tracking-wider font-mono">System</div>}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-[#111] border border-[#333] p-4 rounded-lg text-gray-500 text-xs font-mono animate-pulse">
               Thinking...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 bg-[#111] border-t border-[#333]">
        <form onSubmit={handleSend} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command or query..."
            className="flex-1 bg-[#050505] border border-[#333] text-white p-3 rounded font-mono text-sm focus:outline-none focus:border-[#cfa86b] transition-colors"
          />
          <button type="submit" disabled={loading} className="bg-[#cfa86b] text-black font-bold px-6 rounded hover:bg-[#e0bd2f] transition-colors disabled:opacity-50">
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
}
