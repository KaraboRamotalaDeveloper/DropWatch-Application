import React from "react";
import {
  Clock,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  AlertOctagon,
} from "lucide-react";
import { styles } from "../../styles/dashboardStyles";

export default function StatsOverview({ stats }) {
  return (
    <div style={styles.statsGrid} className="stats-grid">
      <div style={styles.card} className="card">
        <div style={styles.cardHeader}>
          <span>Total Reports</span>
          <Clock color="#2563eb" size={20} />
        </div>

        <div style={styles.cardValue}>{stats.total}</div>
      </div>

      <div style={styles.card} className="card">
        <div style={styles.cardHeader}>
          <span>Pending Action</span>
          <AlertTriangle color="#d97706" size={20} />
        </div>

        <div style={styles.cardValue}>{stats.reported}</div>
      </div>

      <div style={styles.card} className="card">
        <div style={styles.cardHeader}>
          <span>In Progress</span>
          <UserCheck color="#0284c7" size={20} />
        </div>

        <div style={styles.cardValue}>{stats.inProgress}</div>
      </div>

      <div style={styles.card} className="card">
        <div style={styles.cardHeader}>
          <span>Resolved</span>
          <CheckCircle color="#16a34a" size={20} />
        </div>

        <div style={styles.cardValue}>{stats.fixed}</div>
      </div>

      <div style={styles.card} className="card">
        <div style={styles.cardHeader}>
          <span>Critical Priority</span>
          <AlertOctagon color="#dc2626" size={20} />
        </div>

        <div style={styles.cardValue}>{stats.critical}</div>
      </div>
    </div>
  );
}
