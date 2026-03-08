// Save to /var/www/phoenix/frontend/src/pages/AuthPage.tsx
import React, { useState } from 'react';

interface Props {
  onAuthComplete: (userData: any) => void;
}

const AuthPage: React.FC<Props> = ({ onAuthComplete }) => {
  const [view, setView] = useState<'login' | 'register' | 'verify'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 1. Registration Handler
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    // Simulate sending an email verification
    setView('verify');
    setError('');
  };

  // 2. Verification Handler (Simulated Email Click)
  const handleVerify = () => {
    // In production, this happens when they click the link in their email
    setView('login');
    setError('');
    alert("Email Verified. You may now access the Gate.");
  };

  // 3. Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Invalid Credentials.");
      return;
    }
    // Simulate successful login and pass to next step (InfoPage)
    onAuthComplete({ email });
  };

  return (
    <div className="gate-container fade-in">
      <div className="auth-box">
        
        {/* LOGIN VIEW */}
        {view === 'login' && (
          <>
            <h2 className="gate-title">System Access</h2>
            <p className="gate-sub">Enter your credentials to access the Shards.</p>
            {error && <div className="error-msg">{error}</div>}
            
            <form onSubmit={handleLogin} className="auth-form">
              <input 
                type="email" 
                placeholder="Secure Email Address" 
                className="auth-input"
                value={email}
                onChange={e => setEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Passphrase" 
                className="auth-input"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
              <button type="submit" className="gold-btn w-full">INITIALIZE LOGIN</button>
            </form>
            <button className="text-btn" onClick={() => {setView('register'); setError('');}}>
              No clearance? Request Access (Register)
            </button>
          </>
        )}

        {/* REGISTER VIEW */}
        {view === 'register' && (
          <>
            <h2 className="gate-title">Request Clearance</h2>
            <p className="gate-sub">Create an identity within The Fortress.</p>
            {error && <div className="error-msg">{error}</div>}
            
            <form onSubmit={handleRegister} className="auth-form">
              <input 
                type="email" 
                placeholder="Primary Email Address" 
                className="auth-input"
                value={email}
                onChange={e => setEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Create Passphrase" 
                className="auth-input"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
              <button type="submit" className="gold-btn w-full">GENERATE IDENTITY</button>
            </form>
            <button className="text-btn" onClick={() => {setView('login'); setError('');}}>
              Already have clearance? Return to Login
            </button>
          </>
        )}

        {/* VERIFICATION VIEW (The Holding Area) */}
        {view === 'verify' && (
          <div className="verify-box">
            <h2 className="gate-title" style={{color: '#ffd700'}}>Verification Required</h2>
            <p className="gate-sub">
              An encrypted packet has been sent to <strong>{email}</strong>. 
              <br/><br/>
              You must verify your transmission origin before entering the terminal.
            </p>
            
            {/* This button simulates the user clicking the link in their email */}
            <button className="outline-btn" onClick={handleVerify} style={{marginTop: '30px'}}>
              [DEBUG: SIMULATE EMAIL VERIFICATION CLICK]
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthPage;
