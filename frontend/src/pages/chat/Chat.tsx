import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../state/auth";

type Msg = { id: string; at: string; from: string; text: string };

export default function Chat() {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!token) return;
    setError(null);
    try {
      const res = await api<{ messages: Msg[] }>("/api/chat/room/global/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.messages || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load chat.");
    }
  }

  async function send() {
    if (!token) return;
    const t = text.trim();
    if (!t) return;

    setBusy(true);
    setError(null);
    try {
      await api("/api/chat/room/global/messages", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { text: t },
      });
      setText("");
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to send message.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 28 }}>
      <h2 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Community Chat</h2>
      <p style={{ marginTop: 10, opacity: 0.85 }}>
        Global room. You are posting as <b>{user?.email}</b>.
      </p>

      {error && (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid rgba(255,80,80,0.6)" }}>
          <div style={{ fontWeight: 900 }}>Error</div>
          <div style={{ marginTop: 6 }}>{error}</div>
        </div>
      )}

      <div style={{ marginTop: 14, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: 12, borderBottom: "1px solid rgba(255,255,255,0.10)", opacity: 0.85 }}>
          Global • refreshes every 5s
        </div>

        <div style={{ padding: 12, maxHeight: 420, overflow: "auto", display: "grid", gap: 10 }}>
          {messages.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No messages yet.</div>
          ) : (
            messages.map((m) => (
              <div key={m.id} style={{ padding: 10, borderRadius: 14, border: "1px solid rgba(255,255,255,0.10)" }}>
                <div style={{ fontWeight: 900, fontSize: 13 }}>
                  {m.from} <span style={{ opacity: 0.7, fontWeight: 700 }}>• {m.at}</span>
                </div>
                <div style={{ marginTop: 6, opacity: 0.9, lineHeight: 1.55 }}>{m.text}</div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.10)", display: "flex", gap: 10 }}>
          <input value={text} onChange={(e) => setText(e.target.value)} style={inputStyle} placeholder="Write a message..." />
          <button disabled={busy} onClick={send} style={btn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(0,0,0,0.15)",
  color: "inherit",
  outline: "none",
};

const btn: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "inherit",
  fontWeight: 950,
  cursor: "pointer",
};
