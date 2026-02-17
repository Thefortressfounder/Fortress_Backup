import { useEffect, useState } from "react";
import { api } from "../lib/api";

type UfosPublicHealth = {
  status: string;
  service: string;
  time: string;
  cmds: Array<{ chain: string; id: string; supports: string[]; status: string }>;
};

export default function Ufos() {
  const [data, setData] = useState<UfosPublicHealth | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const d = await api<UfosPublicHealth>("/ufos/public/health");
      setData(d);
    } catch (e: any) {
      setError(e?.message || "Failed to load UFOS public health");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>UFOS Console</h2>
          <p style={{ marginTop: 8, opacity: 0.8 }}>Public UFOS status (safe for website).</p>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <button onClick={load} style={{ padding: "10px 14px", fontWeight: 700 }}>
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #a33", borderRadius: 10 }}>
          <div style={{ fontWeight: 800 }}>Error</div>
          <div style={{ marginTop: 6 }}>{error}</div>
        </div>
      )}

      {!data ? (
        <div style={{ marginTop: 16, opacity: 0.9 }}>Loading...</div>
      ) : (
        <div style={{ marginTop: 16 }}>
          <div style={{ padding: 14, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14 }}>
            <div style={{ fontWeight: 800 }}>Overview</div>
            <div style={{ marginTop: 8, opacity: 0.9 }}>
              Status: <b>{data.status}</b> — Service: <b>{data.service}</b>
            </div>
            <div style={{ marginTop: 6, opacity: 0.8 }}>Time: {data.time}</div>
          </div>

          <div style={{ marginTop: 14, padding: 14, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14 }}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Chains</div>
            <div style={{ display: "grid", gap: 10 }}>
              {data.cmds.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: 12,
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{c.chain}</div>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>
                      supports: {c.supports.join(", ")}
                    </div>
                  </div>
                  <div style={{ fontWeight: 800 }}>{c.status}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14, opacity: 0.75, fontSize: 12 }}>
            Private UFOS endpoint <code>/ufos/health</code> is restricted by design (API key or localhost).
          </div>
        </div>
      )}
    </div>
  );
}
