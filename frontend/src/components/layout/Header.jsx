import React from "react";
import { LogOut } from "lucide-react";
import { styles } from "../../styles/dashboardStyles";

export default function Header({ user, role, onLogout }) {
  return (
    <header style={styles.header}>
      <div>
        <h1 style={{ margin: 0, fontSize: "20px" }}>DropWatch</h1>
        <span style={styles.roleBadge}>{role} DASHBOARD</span>
      </div>
      <div style={styles.userInfo}>
        <span>
          <strong>{user?.username}</strong>
        </span>
        <button onClick={onLogout} style={styles.logoutBtn}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
}
