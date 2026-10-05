import React from "react";
import { styles } from "../../styles/dashboardStyles";

export default function AnalyticsBar({ stats }) {
  const getWidth = (count) => (stats.total ? (count / stats.total) * 100 : 0);

  return (
    <div style={styles.analyticsSection}>
      <h3 style={{ marginTop: 0, fontSize: "16px", color: "#374151" }}>
        Resolution Distribution
      </h3>
      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressBar,
            width: `${getWidth(stats.reported)}%`,
            backgroundColor: "#f59e0b",
          }}
          title="Reported"
        />
        <div
          style={{
            ...styles.progressBar,
            width: `${getWidth(stats.inProgress)}%`,
            backgroundColor: "#3b82f6",
          }}
          title="In Progress"
        />
        <div
          style={{
            ...styles.progressBar,
            width: `${getWidth(stats.fixed)}%`,
            backgroundColor: "#22c55e",
          }}
          title="Fixed"
        />
      </div>
      <div style={styles.legend}>
        <span>
          <span style={{ ...styles.dot, backgroundColor: "#f59e0b" }} />{" "}
          Reported
        </span>
        <span>
          <span style={{ ...styles.dot, backgroundColor: "#3b82f6" }} /> In
          Progress
        </span>
        <span>
          <span style={{ ...styles.dot, backgroundColor: "#22c55e" }} /> Fixed
        </span>
      </div>
    </div>
  );
}
