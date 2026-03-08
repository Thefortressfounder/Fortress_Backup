import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../state/auth";

type Listing = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  currency: string;
  seller: string;
};

export default function Marketplace() {
  const { token, kyc } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const res = await api<{ listings: Listing[] }>("/api/market/listings");
      setListings(res.listings || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load listings.");
    }
  }

  async function buy(id: string) {
    if (!token) return setError("Not authenticated.");
    if (kyc !== "approved") return setError("KYC is required to buy.");

    setError(null);
    try {
      await api("/api/market/buy", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { listingId: id },
      });
      await load();
    } catch (e: any) {
      setError(e?.message || "Buy failed.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 28 }}>
      <h2 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Marketplace</h2>
      <p style={{ marginTop: 10, opacity: 0.85 }}>Browse listings. Buying/listing requires KYC approval.</p>

      {error && (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, border: "1px solid rgba(255,80,80,0.6)" }}>
          <div style={{ fontWeight: 900 }}>Notice</div>
          <div style={{ marginTop: 6 }}>{error}</div>
        </div>
      )}

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {listings.length === 0 ? (
          <div style={{ opacity: 0.85 }}>No listings yet.</div>
        ) : (
          listings.map((x) => (
            <div key={x.id} style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(255,255,255,0.14)" }}>
              <div style={{ fontWeight: 950 }}>{x.name}</div>
              <div style={{ marginTop: 10, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)" }}>
                <img
                  src={x.imageUrl}
                  alt={x.name}
                  style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ marginTop: 10, opacity: 0.9 }}>
                Price: <b>{x.price} {x.currency}</b>
              </div>
              <div style={{ marginTop: 6, opacity: 0.8, fontSize: 12 }}>Seller: {x.seller}</div>

              <button
                onClick={() => buy(x.id)}
                style={{ marginTop: 10, ...btnPrimary, opacity: kyc === "approved" ? 1 : 0.6 }}
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "inherit",
  fontWeight: 950,
  cursor: "pointer",
  width: "100%",
};
