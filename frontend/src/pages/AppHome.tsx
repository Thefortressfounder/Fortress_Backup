import { Link } from "react-router-dom";
import { useAuth } from "../state/auth";

export default function AppHome() {
  const { kyc } = useAuth();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 28 }}>
      <h2 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Dashboard</h2>
      <p style={{ marginTop: 10, opacity: 0.85 }}>
        Your control center. KYC status determines participation features.
      </p>

      <div style={{ marginTop: 16, padding: 14, borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)" }}>
        <div style={{ fontWeight: 950 }}>
          Participation status: <b>{kyc}</b>
        </div>
        <div style={{ marginTop: 8, opacity: 0.85 }}>
          {kyc === "approved"
            ? "You can mint, list, buy/sell, chat, DM, and access DeFi actions."
            : "You can browse. Complete KYC to participate in NFTs, marketplace actions, chat posting/DMs, and DeFi."}
        </div>
        <div style={{ marginTop: 10 }}>
          <Link to="/kyc" style={{ fontWeight: 900 }}>
            Go to KYC
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card title="NFT Mint" href="/app/nfts/mint" locked={kyc !== "approved"} />
        <Card title="Marketplace" href="/app/nfts/market" locked={false} />
        <Card title="Community Chat" href="/app/chat" locked={kyc !== "approved"} />
        <Card title="DeFi" href="/app/defi" locked={kyc !== "approved"} />
      </div>
    </div>
  );
}

function Card({ title, href, locked }: { title: string; href: string; locked: boolean }) {
  return (
    <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontWeight: 950 }}>{title}</div>
        {locked ? (
          <span style={{ fontSize: 12, opacity: 0.8 }}>KYC Required</span>
        ) : (
          <span style={{ fontSize: 12, opacity: 0.8 }}>Open</span>
        )}
      </div>
      <div style={{ marginTop: 12, opacity: locked ? 0.6 : 1, fontWeight: 900 }}>
        <Link to={href}>{locked ? "Go (KYC needed)" : "Go"}</Link>
      </div>
    </div>
  );
}
