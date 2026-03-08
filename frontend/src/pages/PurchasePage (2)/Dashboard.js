import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('trade');
  const [orderSide, setOrderSide] = useState('BUY');
  const [price, setPrice] = useState('0.105');
  const [amount, setAmount] = useState('1000');
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const generateBook = () => {
      const newBids = Array.from({length: 8}, (_, i) => ({
        price: (0.104 - (i * 0.001)).toFixed(3),
        size: Math.floor(Math.random() * 50000) + 1000
      }));
      const newAsks = Array.from({length: 8}, (_, i) => ({
        price: (0.106 + (i * 0.001)).toFixed(3),
        size: Math.floor(Math.random() * 50000) + 1000
      })).reverse();
      setBids(newBids);
      setAsks(newAsks);
    };
    generateBook();
    const interval = setInterval(generateBook, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = (e) => {
    e.preventDefault();
    alert(`[SIGNATURE REQUIRED] Executing ${orderSide} of ${amount} CVT at ${price} XLM...`);
  };

  return (
    <div className="fintech-dashboard fade-in">
      <nav className="dash-nav">
        <div className="dash-brand">
          <span className="logo-text">THE FORTRESS</span>
          <span className="badge-pro">PRO</span>
        </div>
        <div className="dash-tabs">
          <button className={activeTab === 'trade' ? 'tab active' : 'tab'} onClick={() => setActiveTab('trade')}>TERMINAL</button>
          <button className={activeTab === 'forge' ? 'tab active' : 'tab'} onClick={() => setActiveTab('forge')}>THE FORGE</button>
          <button className={activeTab === 'aegis' ? 'tab active' : 'tab'} onClick={() => setActiveTab('aegis')}>AEGIS SHIELDS</button>
        </div>
        <div className="dash-telemetry">
          <div className="stat-group"><label>NETWORK TPS</label><span className="neon-green">3,000,000</span></div>
          <div className="stat-group"><label>LATENCY</label><span className="neon-green">12ms</span></div>
          <div className="stat-group"><label>CVT / XLM</label><span className="gold">0.105</span></div>
        </div>
      </nav>

      {activeTab === 'trade' && (
        <div className="trade-grid">
          <div className="panel chart-panel">
            <div className="panel-header">CVT/XLM MARKET DEPTH</div>
            <div className="chart-placeholder">
               <div className="mock-chart-line"></div>
               <p className="chart-watermark">FORTRESS SECURE FEED</p>
            </div>
          </div>

          <div className="panel book-panel">
            <div className="panel-header">ORDER BOOK</div>
            <div className="book-headers"><span>PRICE (XLM)</span><span>SIZE (CVT)</span></div>
            <div className="book-asks">{asks.map((ask, i) => (<div className="book-row" key={`ask-${i}`}><span className="ask-price">{ask.price}</span><span className="book-size">{ask.size.toLocaleString()}</span></div>))}</div>
            <div className="book-spread"><span className="spread-price">0.105</span><span className="spread-label">SPREAD 0.001</span></div>
            <div className="book-bids">{bids.map((bid, i) => (<div className="book-row" key={`bid-${i}`}><span className="bid-price">{bid.price}</span><span className="book-size">{bid.size.toLocaleString()}</span></div>))}</div>
          </div>

          <div className="panel exec-panel">
            <div className="panel-header">EXECUTION</div>
            <div className="order-toggles">
              <button className={orderSide === 'BUY' ? 'toggle-btn buy active' : 'toggle-btn'} onClick={() => setOrderSide('BUY')}>BUY</button>
              <button className={orderSide === 'SELL' ? 'toggle-btn sell active' : 'toggle-btn'} onClick={() => setOrderSide('SELL')}>SELL</button>
            </div>
            <form className="exec-form" onSubmit={handleTrade}>
              <div className="input-group"><label>Limit Price</label><div className="input-wrapper"><input type="number" step="0.001" value={price} onChange={e => setPrice(e.target.value)} /><span className="asset-tag">XLM</span></div></div>
              <div className="input-group"><label>Amount</label><div className="input-wrapper"><input type="number" value={amount} onChange={e => setAmount(e.target.value)} /><span className="asset-tag">CVT</span></div></div>
              <div className="order-summary"><span>TOTAL:</span><span>{(parseFloat(price) * parseFloat(amount)).toFixed(2)} XLM</span></div>
              <button type="submit" className={`exec-btn ${orderSide.toLowerCase()}`}>{orderSide} CVT</button>
            </form>
            <div className="wallet-balances">
              <div className="balance-row"><span>AVAIL XLM:</span> <span className="gold">10,450.00</span></div>
              <div className="balance-row"><span>AVAIL CVT:</span> <span className="gold">500,000.00</span></div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'forge' && <div className="panel standby-panel"><h2 className="gold">THE FORGE: STANDBY</h2><p>3M TPS Minting interface loading...</p></div>}
      {activeTab === 'aegis' && <div className="panel standby-panel" style={{borderColor: '#00ff00'}}><h2 className="neon-green">AEGIS SHIELDS: OPTIMAL</h2><p>No DDoS anomalies detected on the current shard.</p></div>}
    </div>
  );
};
export default Dashboard;
