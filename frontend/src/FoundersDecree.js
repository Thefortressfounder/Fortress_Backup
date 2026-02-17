import React from 'react';
import './App.css'; // Explicitly importing the styles

const FoundersDecree = ({ onAccept }) => {
  return (
    <div className="decree-overlay fade-in">
      <div className="parchment">
        
        <h1>The Founder's Decree</h1>
        
        <div className="decree-text">
          <p>
            Thank You for choosing The Fortress. Here you can find all your financial to-dos whether it's investing, staking, borrowing, or minting NFTs. You will be safe and secure in an environment that will always respect you and your business, be transparent, so you as the user always know what is going on.
          </p>

          <p>
            Also if things happens to go wrong <span className="highlight">I James Lambert personally will be held accountable</span> and I personally promise and guarantee that I will give every user 110% of my drive determination and effort.
          </p>

          <p>
            The whole basis for this exchange is because I personally have been Rug-Pulled and I know what it's like. I lost 22 BTC which at the time was worth 2.26 million dollars. So I decided since no one is accountable and in a simple keystroke I lost a small fortune to not let that happen to me or anyone else ever again.
          </p>

          <p>
            The Fortress will always be a place of honesty integrity and <span className="highlight">CONVICTION</span>. There will never be any simulated placards with big numbers or any of the ridiculous "features" you see on other exchanges.
          </p>

          <p>
            I built this exchange all by myself so there are no engineers or development teams that stand between me as The Founder and you as the user. I have added native support for the top 104 cryptos so there is no bridging and wrapping non-sense.
          </p>

          <p>
            I am using <span className="highlight">ALFRED and UFOS</span> (UNIVERSAL FINANCIAL OPERATING SYSTEM), a system I created that will allow you as the user to buy sell trade the top 105 cryptos natively with proof of transmission.
          </p>

          <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '30px', color: '#8b0000'}}>
            All that changes now......
          </p>
        </div>

        <div className="signature-block">
          <span className="sig">James Lambert</span>
          <span className="role">Founder, The Fortress</span>
          <div className="seal">VERIFIED</div>
        </div>

        <button className="enter-btn" onClick={onAccept}>
          ENTER THE FORTRESS
        </button>
      </div>
    </div>
  );
};

export default FoundersDecree;
