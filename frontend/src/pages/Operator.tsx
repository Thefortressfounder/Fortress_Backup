import React from 'react';

const Operator: React.FC = () => {
  return (
    <div style={{ padding: '20px', color: '#e5e5e5' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#c9a86a' }}>
        The Operator
      </h1>

      <p style={{ lineHeight: 1.6 }}>
        The Fortress is operated by James Lambert — founder, architect, and accountable
        steward of the platform. Every subsystem, every design choice, and every operational
        standard reflects his commitment to durability, integrity, and institutional rigor.
      </p>

      <h2 style={{ marginTop: '2rem', color: '#c9a86a' }}>Responsibilities</h2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>End‑to‑end technical architecture</li>
        <li>Operational oversight and compliance enforcement</li>
        <li>Security, auditability, and infrastructure integrity</li>
        <li>Long‑term platform stewardship</li>
      </ul>

      <p style={{ marginTop: '2rem', lineHeight: 1.6 }}>
        The Operator is not a figurehead — he is the accountable authority behind every
        component of The Fortress.
      </p>
    </div>
  );
};

export default Operator;
