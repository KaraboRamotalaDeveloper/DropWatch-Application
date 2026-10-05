import React from "react";
import { useOutletContext } from "react-router-dom";
import { styles } from "../styles/dashboardStyles";

export default function SettingsPage() {
  const { user, role } = useOutletContext();

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Account Settings</h2>
      <div style={{ ...styles.card, maxWidth: "600px" }}>
        <h3>Profile Details</h3>
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Assigned Role:</strong> {role}
        </p>
      </div>
    </div>
  );
}
