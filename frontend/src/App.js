import React, { useState, useRef, useEffect } from 'react';
import FoundersDecree from './FoundersDecree';
import './App.css';

function App() {
  const [view, setView] = useState('decree');
  
  // Login Inputs
  const [loginIdentity, setLoginIdentity] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Registration Inputs
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');

  // ALFRED Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ALFRED', text: 'Secure channel established. Awaiting your command, Sir.' }
  ]);
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Navigation Helpers
  const logout = () => {
    setLoginIdentity('');
    setLoginPassword('');
    setChatHistory([{ sender: 'ALFRED', text: 'Secure channel established. Awaiting your command, Sir.' }]);
    setView('login');
  };

  // --- LOGIN LOGIC (THE MASTER KEY) ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Simple check for the Founder (You can expand this later)
    if (loginIdentity === 'TheFounder' && loginPassword === 'Thefounder1') {
      setView('dashboard');
    } else if (loginIdentity && loginPassword) {
      // Allow general entry for now for testing
      setView('dashboard');
    } else {
      alert("Identity verification failed.");
    }
  };

  // --- REGISTRATION LOGIC ---
  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Identity Packet Sent to ${regEmail}. Verification Required.`);
    setView('login');
  };

  // --- CHAT LOGIC ---
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newHistory = [...chatHistory, { sender: 'COMMANDER', text: chatInput }];
    setChatHistory(newHistory);
    setChatInput('');

    // Simulated ALFRED Response
    setTimeout(() => {
      let response = "I am processing your request on the Stellar Network.";
      if (chatInput.toLowerCase().includes('status')) response = "All systems operational. 3M TPS capacity available.";
      if (chatInput.toLowerCase().includes('balance')) response = "Vault reserves: 50,000,000 CVT. User balance: 0.00 CVT.";
      
      setChatHistory(prev => [...prev, { sender: 'ALFRED', text: response }]);
    }, 800);
  };

  return (
    <div className="fortress-app">
      
      {/* 1. THE DECREE GATE */}
      {view === 'decree' && (
        <FoundersDecree onAccept={() => setView('login')} />
      )}

      {/* 2. THE LOGIN GATE */}
      {view === 'login' && (
        <div className="login-container fade-in">
          <div className="login-card">
            <div className="alfred-panel">
              <div className="alfred-avatar">A</div>
              <p className="alfred-text">"Welcome back, Sir. The shards are spinning at optimal efficiency."</p>
              <div className="alfred-subtext">
                <span>SYSTEM: ONLINE</span>
                <span>SECURITY: MAX</span>
              </div>
            </div>
            <div className="form-panel">
              <h2>IDENTITY VERIFICATION</h2>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label>Identity / Email</label>
                  <input 
                    type="text" 
                    value={loginIdentity} 
                    onChange={e => setLoginIdentity(e.target.value)}
                    placeholder="Enter Identity"
                  />
                </div>
                <div className="input-group">
                  <label>Passphrase</label>
                  <input 
                    type="password" 
                    value={loginPassword} 
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Enter Passphrase"
                  />
                </div>
                <button type="submit" className="btn-gold">ACCESS VAULT</button>
              </form>
              <div className="switch-mode">
                <p>New to The Fortress?</p>
                <button className="btn-link" onClick={() => setView('register')}>Request Clearance</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. THE REGISTER GATE */}
      {view === 'register' && (
        <div className="login-container fade-in">
          <div className="login-card">
            <div className="alfred-panel">
              <div className="alfred-avatar">A</div>
              <p className="alfred-text">"A new identity? I shall prepare a secure ledger entry."</p>
            </div>
            <div className="form-panel">
              <h2>REQUEST CLEARANCE</h2>
              <form onSubmit={handleRegister}>
                <div className="input-group">
                  <label>Secure Email</label>
                  <input 
                    type="email" 
                    value={regEmail} 
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="user@secure.net"
                  />
                </div>
                <div className="input-group">
                  <label>Set Passphrase</label>
                  <input 
                    type="password" 
                    value={regPass} 
                    onChange={e => setRegPass(e.target.value)}
                    placeholder="Create Password"
                  />
                </div>
                <button type="submit" className="btn-gold">GENERATE IDENTITY</button>
              </form>
              <div className="switch-mode">
                <button className="btn-link" onClick={() => setView('login')}>Return to Login</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. THE DASHBOARD (COMMAND CENTER) */}
      {view === 'dashboard' && (
        <div className="dashboard-container fade-in">
          <nav className="dashboard-nav">
            <div className="nav-logo">THE FORTRESS</div>
            <div className="nav-user">
              <span className="user-role">FOUNDER</span>
              {loginIdentity || 'James Lambert'}
            </div>
            <button className="btn-logout" onClick={logout}>DISCONNECT</button>
          </nav>

          <div className="dashboard-content">
            <h1>COMMAND DECK</h1>
            
            {/* TOP ROW: STATS */}
            <div className="status-grid">
              <div className="status-card">
                <h3>Total Liquidity</h3>
                <div className="big-number">$50,000,000</div>
                <span className="sub-text">CVT Market Cap (Fixed)</span>
              </div>
              <div className="status-card">
                <h3>Network Traffic</h3>
                <div className="medium-number">3.2M <span className="trend-up">TPS</span></div>
                <span className="sub-text">Load: 12%</span>
              </div>
              <div className="status-card">
                <h3>System Health</h3>
                <p className="status-ok">OPTIMAL</p>
                <span className="sub-text">UFOS Latency: 12ms</span>
              </div>
            </div>

            {/* BOTTOM ROW: CHAT INTERFACE */}
            <div className="comms-section">
              <h2 className="section-title">Secure Comms Link // ALFRED</h2>
              <div className="chat-interface">
                <div className="chat-window">
                  {chatHistory.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender === 'ALFRED' ? 'msg-alfred' : 'msg-user'}`}>
                      <span className="msg-sender">[{msg.sender}]:</span> {msg.text}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <form className="chat-input-area" onSubmit={handleChatSubmit}>
                  <span className="prompt">{'>'}</span>
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)} 
                    placeholder="Enter command..."
                    autoFocus
                  />
                  <button type="submit" className="btn-send">TRANSMIT</button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
