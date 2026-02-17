import React from 'react';

const AlfredAssistant = ({ currentStep }) => {
  const messages = {
    auth: "Register your presence, sir. I'll be here if you need assistance.",
    info: "I require your details to populate the Fortress Manifest.",
    kyc: "A simple identity scan is all that stands between you and the engine.",
    buy: "A $1.00 minimum activation fee keeps the Shards running smoothly.",
    access: "Welcome home, sir. All systems are operational."
  };

  return (
    <div className="alfred-container">
      <div className="alfred-bubble">
        {messages[currentStep] || "How may I assist you?"}
      </div>
      <div className="alfred-avatar">A</div>
    </div>
  );
};

export default AlfredAssistant;
