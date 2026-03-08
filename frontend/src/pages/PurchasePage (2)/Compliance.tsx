import React from 'react';

const Compliance: React.FC = () => {
  return (
    <div style={{ padding: '20px', color: '#e5e5e5' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#c9a86a' }}>
        Compliance & Regulatory Alignment
      </h1>

      <p style={{ lineHeight: 1.6 }}>
        The Fortress operates with explicit respect for global regulatory frameworks.
        Every user, every transaction, and every subsystem is designed to meet or exceed
        compliance expectations.
      </p>

      <h2 style={{ marginTop: '2rem', color: '#c9a86a' }}>Core Principles</h2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Full KYC/AML onboarding</li>
        <li>Transparent operator identity</li>
        <li>Audit‑ready transaction logs</li>
        <li>Zero‑tolerance for ambiguity or obfuscation</li>
      </ul>

      <h2 style={{ marginTop: '2rem', color: '#c9a86a' }}>User Protection</h2>
      <p style={{ lineHeight: 1.6 }}>
        The Fortress is built to protect users, preserve integrity, and ensure that every
        action is traceable, accountable, and compliant.
      </p>
    </div>
  );
};

export default Compliance;
