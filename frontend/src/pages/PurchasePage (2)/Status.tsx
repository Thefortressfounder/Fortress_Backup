import { useEffect, useState } from "react";
import { api } from "../lib/api";

type Simple = { status: string; service?: string; time?: string };
type UfosPublicHealth = {
  status: string;
  service: string;
  time: string;
  cmds: Array<{ chain: string; id: string; supports: string[]; status: string }>;
};

export default function Status() {
  const [ready, setReady] = useState<Simple | null>(null);
  const [alfred, setAlfred] = useState<any | null>(null);
  const [ufosHealth, setUfosHealth] = useState<UfosPublicHealth | null>(null);
  const [ufosReady, setUfosReady] = useState<Simple | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      // Backend root readiness (from index.js)
      const r = await api<Simple>("/ready");

      // Alfred public health
      const a = await api<any>("/alfred/health");

      // UFOS PUBLIC endpoints (safe for website)
      const uh = await api<UfosPublicHealth>("/ufos/public/health");
      const ur = await api<Simple>("/ufos/public/ready");

      setReady(r);
      setAlfred(a);
      setUfosHealth(uh);
      setUfosReady(ur);
    } catch (e: any) {
      setError(e?.message || "Failed to load status");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>System Status</h2>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Website-safe health checks (UFOS uses public endpoints).
          </p>
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

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card title="Backend /ready" data={ready} />
        <Card title="Alfred /alfred/health" data={alfred} />
        <Card title="UFOS /ufos/public/ready" data={ufosReady} />
        <UfosCard title="UFOS /ufos/public/health" data={ufosHealth} />
      </div>
    </div>
  );
}

function Card({ title, data }: { title: string; data: any }) {
  return (
    <div style={{ padding: 14, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14 }}>
      <div style={{ fontWeight: 800 }}>{title}</div>
      <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", wordBreak: "break-word", opacity: 0.9 }}>
        {data ? JSON.stringify(data, null, 2) : "Loading..."}
      </pre>
    </div>
  );
}

function UfosCard({ title, data }: { title: string; data: UfosPublicHealth | null }) {
  return (
    <div style={{ padding: 14, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14 }}>
      <div style={{ fontWeight: 800 }}>{title}</div>

      {!data ? (
        <div style={{ marginTop: 10, opacity: 0.9 }}>Loading...</div>
      ) : (
        <>
          <div style={{ marginTop: 10, opacity: 0.9 }}>
            Status: <b>{data.status}</b> — {data.service} — {data.time}
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Chains</div>
            <div style={{ display: "grid", gap: 8 }}>
              {data.cmds.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{c.chain}</div>
                    <div style={{ opacity: 0.8, fontSize: 12 }}>supports: {c.supports.join(", ")}</div>
                  </div>
                  <div style={{ fontWeight: 800 }}>{c.status}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
