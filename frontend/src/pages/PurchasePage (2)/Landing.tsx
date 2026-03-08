import { Link } from "react-router-dom";
import { useAuth } from "../state/auth";

export default function Landing() {
  const { isAuthed, kyc } = useAuth();

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 28 }}>
      <div
        style={{
          padding: 22,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 950, letterSpacing: 0.2 }}>
          Welcome to The Fortress
        </h1>
        <p style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.6, maxWidth: 820 }}>
          Registration is required before you can explore. After registration, you may browse the site.
          To participate in anything (chat posting/DMs, minting/listing/buying, DeFi actions), you must complete KYC.
        </p>

        {!isAuthed ? (
          <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              to="/register"
              style={primaryLink}
            >
              Register (Required)
            </Link>
            <Link
              to="/signin"
              style={secondaryLink}
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/explore" style={primaryLink}>
              Enter Explore Mode
            </Link>
            <Link to="/kyc" style={{ ...secondaryLink, opacity: kyc === "approved" ? 0.7 : 1 }}>
              {kyc === "approved" ? "KYC Approved" : "Complete KYC to Participate"}
            </Link>
          </div>
        )}
      </div>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FeatureCard
          title="NFT Mint + Marketplace"
          body="Browse after registration. Minting, listing, and buying requires KYC."
        />
        <FeatureCard
          title="Community Chat + Private Messaging"
          body="Posting and DMs require KYC. (You can expand to read-only browsing if desired.)"
        />
        <FeatureCard
          title="DeFi: Staking, Borrowing, Lending"
          body="Actions require KYC. This is where staking/borrowing modules live."
        />
        <FeatureCard
          title="Unified Finance"
          body="Crypto and fiat flows can live behind the same account + permissions system."
        />
      </div>

      <p style={{ marginTop: 18, opacity: 0.75, fontSize: 13 }}>
        Participation requires identity verification (KYC). This protects the ecosystem and supports compliance expectations.
      </p>
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)" }}>
      <div style={{ fontWeight: 950, fontSize: 16 }}>{title}</div>
      <div style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}

const primaryLink: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  fontWeight: 900,
  textDecoration: "none",
  display: "inline-block",
};

const secondaryLink: React.CSSProperties = {
  ...primaryLink,
  opacity: 0.9,
};
