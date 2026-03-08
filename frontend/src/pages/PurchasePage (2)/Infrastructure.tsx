import React from 'react';

const Infrastructure: React.FC = () => {
  return (
    <div style={{ padding: '20px', color: '#e5e5e5' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#c9a86a' }}>
        The Fortress Infrastructure
      </h1>

      <p style={{ lineHeight: 1.6 }}>
        CONVICTION…by James Lambert is engineered as a multi‑chain, regulator‑aligned
        digital asset infrastructure designed for durability, auditability, and operational
        permanence. Every component is built with explicit accountability and zero ambiguity.
      </p>

      <h2 style={{ marginTop: '2rem', color: '#c9a86a' }}>Architecture</h2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Multi‑chain settlement with deterministic transaction flows</li>
        <li>Backend enforcement via Node + Express + Postgres</li>
        <li>Frontend integrity via React + Vite + TypeScript</li>
        <li>Operator‑controlled infrastructure with no third‑party dependencies</li>
      </ul>

      <h2 style={{ marginTop: '2rem', color: '#c9a86a' }}>Durability</h2>
      <p style={{ lineHeight: 1.6 }}>
        Every subsystem is designed to survive failure, maintain continuity, and preserve
        institutional trust. Nothing is ephemeral. Nothing is casual. Everything is deliberate.
      </p>
    </div>
  );
};

export default Infrastructure;
