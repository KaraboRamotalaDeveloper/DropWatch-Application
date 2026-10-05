import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles/dashboardStyles";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1>404 - Page Not Found</h1>
      <p style={{ color: "#64748b", margin: "16px 0" }}>
        The page you are looking for does not exist.
      </p>
      <Link
        to="/dashboard"
        style={{ ...styles.primaryBtn, display: "inline-flex" }}
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
