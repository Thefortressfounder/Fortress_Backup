import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth";
import type { KycStatus } from "../state/auth";

type Props = {};

/**
 * Kyc page
 *
 * - Uses `useAuth()` for auth state and actions.
 * - `KycStatus` is imported as a type only so it will not be emitted at runtime.
 * - This component renders a simple, production-ready KYC status UI.
 */

const Kyc: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { user, kycStatus, requestKycRefresh } = useAuth();

  const statusLabel = (status: KycStatus) => {
    switch (status) {
      case "not_started":
        return "Not started";
      case "pending":
        return "Pending review";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <main style={styles.container}>
      <section style={styles.card}>
        <h1 style={styles.h1}>Identity Verification</h1>

        <div style={styles.row}>
          <strong>Account</strong>
          <span>{user?.email ?? "Not signed in"}</span>
        </div>

        <div style={styles.row}>
          <strong>KYC Status</strong>
          <span>{kycStatus ? statusLabel(kycStatus) : "Unknown"}</span>
        </div>

        <div style={styles.actions}>
          {kycStatus === "not_started" && (
            <button style={styles.primary} onClick={() => navigate("/kyc/start")}>
              Start KYC
            </button>
          )}

          {kycStatus === "pending" && (
            <>
              <button style={styles.secondary} onClick={() => requestKycRefresh()}>
                Refresh Status
              </button>
              <button style={styles.link} onClick={() => navigate("/support")}>
                Contact Support
              </button>
            </>
          )}

          {kycStatus === "approved" && (
            <button style={styles.primary} onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          )}

          {kycStatus === "rejected" && (
            <>
              <button style={styles.primary} onClick={() => navigate("/kyc/retry")}>
                Retry KYC
              </button>
              <button style={styles.link} onClick={() => navigate("/support")}>
                Contact Support
              </button>
            </>
          )}
        </div>

        <p style={styles.note}>
          If you need help with KYC or your CVT distribution, contact support or
          check your Stellar distributor account for transaction history.
        </p>
      </section>
    </main>
  );
};

export default Kyc;

/* Minimal inline styles so this file is self-contained and production-ready. */
const styles: { [k: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "48px 16px",
    background: "#f7f8fa",
    minHeight: "100vh",
  },
  card: {
    width: 760,
    maxWidth: "100%",
    background: "#ffffff",
    borderRadius: 12,
    padding: 28,
    boxShadow: "0 6px 24px rgba(16,24,40,0.08)",
  },
  h1: {
    margin: 0,
    marginBottom: 18,
    fontSize: 22,
    color: "#0f172a",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eef2f7",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    gap: 12,
    marginTop: 18,
    flexWrap: "wrap",
  },
  primary: {
    background: "#0b74ff",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
  },
  secondary: {
    background: "#eef2ff",
    color: "#0b74ff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
  },
  link: {
    background: "transparent",
    color: "#0b74ff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
    textDecoration: "underline",
  },
  note: {
    marginTop: 18,
    color: "#475569",
    fontSize: 13,
  },
};
