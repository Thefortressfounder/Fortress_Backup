import { useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../state/auth";

export default function Defi() {
  const { token } = useAuth();
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function stake() {
    setError(null);
    setResult(null);
    if (!token) return setError("Not authenticated.");
    if (!amount.trim()) return setError("Amount is required.");

    setBusy(true);
    try {
      const res = await api("/api/defi/stake", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { amount: amount.trim() },
      });
      setResult(res);
    } catch (e: any) {
      setError(e?.message || "Stake failed.");
    } finally {
      setBusy(false);
    }
  }

  async function borrow() {
    setError(null);
    setResult(null);
    if (!token) return setError("Not authenticated.");
    if (!amount.trim()) return setError("Amount is required.");

    setBusy(true);
    try {
      const res = await api("/api/defi/borrow", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { amount: amount.trim() },
      });
      setResult(res);
    } catch (e: any) {
      setError(e?.message || "Borrow failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 28 }}>
      <h2 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>DeFi</h2>
      <p style={{ marginTop: 10, opacity: 0.85 }}>
        Staking, borrowing, lending, and other financial actions live here. KYC-approved users can participate.
      </p>

      {error && (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid rgba(255,80,80,0.6)" }}>
          <div style={{ fontWeight: 900 }}>Error</div>
          <div style={{ marginTop: 6 }}>{error}</div>
        </div>
      )}

      <div style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)" }}>
        <div style={{ fontWeight: 950 }}>Quick Actions</div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} style={inputStyle} placeholder="Amount" />
          <button disabled={busy} onClick={stake} style={btnPrimary}>
            Stake
          </button>
          <button disabled={busy} onClick={borrow} style={btnPrimary}>
            Borrow
          </button>
        </div>
      </div>

      {result && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)" }}>
          <div style={{ fontWeight: 900 }}>Result</div>
          <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", wordBreak: "break-word", opacity: 0.9 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(0,0,0,0.15)",
  color: "inherit",
  outline: "none",
  minWidth: 220,
};

const btnPrimary: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "inherit",
  fontWeight: 950,
  cursor: "pointer",
};
