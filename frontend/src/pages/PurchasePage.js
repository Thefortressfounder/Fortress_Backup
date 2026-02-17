// Save to /var/www/phoenix/frontend/src/pages/PurchasePage.tsx
import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
}

const PurchasePage: React.FC<Props> = ({ onComplete }) => {
  const [amount, setAmount] = useState('1.00');
  const [processing, setProcessing] = useState(false);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // This is where you will integrate the Stripe API or MoneyGram Anchor
    setTimeout(() => {
      setProcessing(false);
      onComplete(); // Unlocks full access
    }, 2000);
  };

  return (
    <div className="gate-container fade-in">
      <div className="auth-box">
        <h2 className="gate-title" style={{color: '#ffd700'}}>Network Activation</h2>
        <p className="gate-sub">
          To finalize your Trustline on the Stellar network and prevent Sybil attacks, 
          a minimum deposit of <strong>$1.00 USD</strong> is required.
        </p>

        <div className="exchange-rate-box">
          <p>CURRENT RATE: 1 CVT = $0.10 USD</p>
        </div>

        <form onSubmit={handlePurchase} className="auth-form" style={{marginTop: '20px'}}>
          <label style={{textAlign: 'left', color: '#888', fontSize: '0.8rem'}}>USD AMOUNT</label>
          <input 
            type="number" 
            min="1.00" 
            step="0.01" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            className="auth-input"
            style={{fontSize: '1.5rem', textAlign: 'center'}}
          />
          
          <p className="gate-sub" style={{marginTop: '10px', marginBottom: '10px'}}>
            YOU WILL RECEIVE: <strong style={{color: '#fff'}}>{(parseFloat(amount) * 10).toFixed(2)} CVT</strong>
          </p>

          <button type="submit" className="gold-btn w-full" disabled={processing}>
            {processing ? "SECURING ASSETS..." : "PURCHASE VIA SECURE RELAY"}
          </button>
        </form>

        <div className="payment-methods" style={{marginTop: '20px', fontSize: '0.8rem', color: '#555'}}>
          ACCEPTED: CREDIT/DEBIT • ACH • CRYPTO
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
