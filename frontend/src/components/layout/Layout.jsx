import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../context/AuthContext";
import { styles } from "../../styles/dashboardStyles";

export default function Layout() {
  const { user, logoutUser } = useAuth();
  const normalizedRole = user?.role?.toUpperCase() || "CITIZEN";

  return (
    <div style={styles.appLayout} className="app-layout">
      <Sidebar role={normalizedRole} />

      <div style={styles.mainContainer} className="main-container">
        <Header user={user} role={normalizedRole} onLogout={logoutUser} />

        <main style={styles.contentArea} className="content-area">
          <Outlet context={{ user, role: normalizedRole }} />
        </main>
      </div>
    </div>
  );
}
