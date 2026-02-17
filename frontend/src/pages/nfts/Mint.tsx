import { useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../state/auth";

export default function Mint() {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function mint() {
    setError(null);
    setResult(null);

    if (!token) return setError("Not authenticated.");
    if (!name.trim()) return setError("Name is required.");
    if (!imageUrl.trim()) return setError("Image URL is required.");

    setBusy(true);
    try {
      const res = await api("/api/nfts/mint", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { name: name.trim(), imageUrl: imageUrl.trim(), description: description.trim() },
      });
      setResult(res);
      setName("");
      setImageUrl("");
      setDescription("");
    } catch (e: any) {
      setError(e?.message || "Mint failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 28 }}>
      <h2 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Mint NFT</h2>
      <p style={{ marginTop: 10, opacity: 0.85 }}>Create a new NFT. This action requires KYC approval.</p>

      {error && (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid rgba(255,80,80,0.6)" }}>
          <div style={{ fontWeight: 900 }}>Error</div>
          <div style={{ marginTop: 6 }}>{error}</div>
        </div>
      )}

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 900 }}>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 900 }}>Image URL</span>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={inputStyle} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontWeight: 900 }}>Description</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={textAreaStyle} />
        </label>

        <button disabled={busy} onClick={mint} style={{ ...btnPrimary, opacity: busy ? 0.65 : 1 }}>
          {busy ? "Minting..." : "Mint"}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)" }}>
          <div style={{ fontWeight: 900 }}>Mint Result</div>
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
};

const textAreaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 120,
  resize: "vertical",
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
