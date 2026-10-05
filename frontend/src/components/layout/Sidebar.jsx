import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react";
import { styles } from "../../styles/dashboardStyles";

export default function Sidebar({ role }) {
  const getNavStyle = ({ isActive }) => ({
    ...styles.navItem,
    ...(isActive ? styles.navItemActive : {}),
  });

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarBrand}>DropWatch</div>
      <nav style={styles.sidebarNav}>
        <NavLink to="/dashboard" style={getNavStyle}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink to="/reports" style={getNavStyle}>
          <FileText size={18} /> Reports
        </NavLink>

        {role === "ADMIN" && (
          <NavLink to="/users" style={getNavStyle}>
            <Users size={18} /> Manage Users
          </NavLink>
        )}

        <NavLink to="/settings" style={getNavStyle}>
          <Settings size={18} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
