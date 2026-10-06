import React from "react";
import { LogOut } from "lucide-react";
import { styles } from "../../styles/dashboardStyles";

export default function Header({ user, role, onLogout }) {
  return (
    <header style={styles.header} className="header">
      <div className="header-title">
        <h1 style={{ margin: 0, fontSize: "20px" }}>DropWatch</h1>

        <span style={styles.roleBadge} className="role-badge">
          {role} DASHBOARD
        </span>
      </div>

      <div style={styles.userInfo} className="user-info">
        <span className="header-username">
          <strong>{user?.username}</strong>
        </span>

        <button
          onClick={onLogout}
          style={styles.logoutBtn}
          className="logout-btn"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
