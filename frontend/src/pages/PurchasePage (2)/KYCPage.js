// Save to /var/www/phoenix/frontend/src/pages/KYCPage.tsx
import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
}

const KYCPage: React.FC<Props> = ({ onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'verified'>('idle');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleScan = () => {
    setScanState('scanning');
    // Simulate a 3-second biometric/document scan via the backend
    setTimeout(() => {
      setScanState('verified');
    }, 3000);
  };

  return (
    <div className="gate-container fade-in">
      <div className="auth-box kyc-box">
        <h2 className="gate-title">Identity Verification</h2>
        <p className="gate-sub">Federal regulations require a valid government ID to access the decentralized network.</p>
        
        {scanState === 'idle' && (
          <div className="upload-section">
            <div className="file-drop-area">
              <input type="file" accept="image/*,.pdf" onChange={handleUpload} className="file-input" />
              <p>{file ? file.name : "DRAG & DROP SECURE ID HERE OR CLICK TO BROWSE"}</p>
            </div>
            <button 
              className={file ? "gold-btn w-full" : "disabled-btn w-full"} 
              disabled={!file} 
              onClick={handleScan}
              style={{marginTop: '20px'}}
            >
              INITIATE SECURE SCAN
            </button>
          </div>
        )}

        {scanState === 'scanning' && (
          <div className="scanning-section">
            <div className="scanner-line"></div>
            <p className="neon-text">ALFRED IS ANALYZING CREDENTIALS...</p>
            <p className="gate-sub">Cross-referencing global databases. Please wait.</p>
          </div>
        )}

        {scanState === 'verified' && (
          <div className="verified-section">
            <h3 style={{color: '#00ff00', letterSpacing: '2px'}}>IDENTITY CONFIRMED</h3>
            <p className="gate-sub">Your clearance level has been upgraded.</p>
            <button className="gold-btn w-full" onClick={onComplete}>PROCEED TO VAULT</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCPage;
