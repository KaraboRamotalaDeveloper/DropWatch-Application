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
    <aside style={styles.sidebar} className="sidebar">
      <div style={styles.sidebarBrand} className="sidebar-brand">
        DropWatch
      </div>

      <nav style={styles.sidebarNav} className="sidebar-nav">
        <NavLink to="/dashboard" style={getNavStyle} className="nav-item">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/reports" style={getNavStyle} className="nav-item">
          <FileText size={18} />
          Reports
        </NavLink>

        {role === "ADMIN" && (
          <NavLink to="/users" style={getNavStyle} className="nav-item">
            <Users size={18} />
            Manage Users
          </NavLink>
        )}

        <NavLink to="/settings" style={getNavStyle} className="nav-item">
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
