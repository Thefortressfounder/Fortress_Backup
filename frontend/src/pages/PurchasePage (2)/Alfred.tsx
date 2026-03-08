import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

type Msg = { role: "user" | "alfred"; text: string; t: string };

function extractText(resp: any): string {
  if (!resp) return "";
  if (typeof resp === "string") return resp;
  if (typeof resp.text === "string") return resp.text;
  if (typeof resp.message === "string") return resp.message;
  if (resp.output && typeof resp.output.text === "string") return resp.output.text;
  return JSON.stringify(resp, null, 2);
}

export default function Alfred() {
  const [health, setHealth] = useState<any | null>(null);
  const [healthErr, setHealthErr] = useState<string | null>(null);

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [msgs, setMsgs] = useState<Msg[]>(() => [
    { role: "alfred", text: "Good evening. How may I assist you?", t: new Date().toISOString() },
  ]);

  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  async function loadHealth() {
    setHealthErr(null);
    try {
      const h = await api<any>("/alfred/health");
      setHealth(h);
    } catch (e: any) {
      setHealthErr(e?.message || "Failed to load Alfred health");
    }
  }

  useEffect(() => {
    loadHealth();
  }, []);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    setErr(null);
    setBusy(true);
    setInput("");

    setMsgs((m) => [...m, { role: "user", text, t: new Date().toISOString() }]);

    try {
      const resp = await api<any>("/alfred/chat", {
        method: "POST",
        body: { message: text },
      });

      const replyText = extractText(resp) || "(no response)";
      setMsgs((m) => [...m, { role: "alfred", text: replyText, t: new Date().toISOString() }]);
    } catch (e: any) {
      setErr(e?.message || "Alfred chat failed");
    } finally {
      setBusy(false);
      loadHealth();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Alfred Console</h2>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Endpoint: <code>/alfred/chat</code>
          </p>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button onClick={loadHealth} style={{ padding: "10px 14px", fontWeight: 700 }}>
            Refresh Health
          </button>
        </div>
      </div>

      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ padding: 14, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14 }}>
          <div style={{ fontWeight: 800 }}>Health</div>
          {healthErr ? (
            <div style={{ marginTop: 10 }}>{healthErr}</div>
          ) : (
            <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", wordBreak: "break-word", opacity: 0.9 }}>
              {health ? JSON.stringify(health, null, 2) : "Loading..."}
            </pre>
          )}
        </div>

        <div style={{ padding: 14, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14 }}>
          <div style={{ fontWeight: 800 }}>Chat</div>

          <div
            style={{
              marginTop: 10,
              height: 320,
              overflow: "auto",
              padding: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
            }}
          >
            {msgs.map((m, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 800, opacity: 0.85 }}>
                  {m.role === "user" ? "You" : "Alfred"}{" "}
                  <span style={{ fontWeight: 400, opacity: 0.6, marginLeft: 8, fontSize: 12 }}>
                    {new Date(m.t).toLocaleString()}
                  </span>
                </div>
                <pre style={{ marginTop: 6, whiteSpace: "pre-wrap", wordBreak: "break-word", opacity: 0.95 }}>
                  {m.text}
                </pre>
              </div>
            ))}
          </div>

          {err && (
            <div style={{ marginTop: 10, padding: 10, border: "1px solid #a33", borderRadius: 10 }}>
              {err}
            </div>
          )}

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={busy ? "Waiting for Alfred..." : "Ask Alfred..."}
              style={{ flex: 1, padding: 12 }}
              disabled={busy}
            />
            <button onClick={send} disabled={!canSend} style={{ padding: "12px 14px", fontWeight: 800 }}>
              {busy ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
