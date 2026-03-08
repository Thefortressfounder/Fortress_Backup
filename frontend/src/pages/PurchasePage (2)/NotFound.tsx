import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 28 }}>
      <h2 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Page not found</h2>
      <p style={{ marginTop: 10, opacity: 0.85 }}>The page you requested does not exist.</p>
      <div style={{ marginTop: 12 }}>
        <Link to="/" style={{ fontWeight: 900 }}>
          Return to home
        </Link>
      </div>
    </div>
  );
}
