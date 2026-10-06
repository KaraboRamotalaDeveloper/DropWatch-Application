export const getStatusStyle = (status) => {
  const base = {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "bold",
  };

  switch (status) {
    case "FIXED":
      return {
        ...base,
        backgroundColor: "#dcfce7",
        color: "#15803d",
      };

    case "IN_PROGRESS":
      return {
        ...base,
        backgroundColor: "#e0f2fe",
        color: "#0369a1",
      };

    case "ASSIGNED":
      return {
        ...base,
        backgroundColor: "#fef3c7",
        color: "#b45309",
      };

    default:
      return {
        ...base,
        backgroundColor: "#f3f4f6",
        color: "#374151",
      };
  }
};

export const getPriorityStyle = (priority) => {
  const base = {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
  };

  switch (priority) {
    case "CRITICAL":
      return {
        ...base,
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
      };

    case "HIGH":
      return {
        ...base,
        backgroundColor: "#ffedd5",
        color: "#c2410c",
      };

    case "MEDIUM":
      return {
        ...base,
        backgroundColor: "#fef9c3",
        color: "#a16207",
      };

    default:
      return {
        ...base,
        backgroundColor: "#f3f4f6",
        color: "#4b5563",
      };
  }
};

export const styles = {
  appLayout: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f8fafc",
    fontFamily: "Inter, sans-serif",
    color: "#1e293b",
    overflow: "hidden",
  },

  sidebar: {
    width: "240px",
    minWidth: "240px",
    flexShrink: 0,
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    boxSizing: "border-box",
  },

  sidebarBrand: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "32px",
    paddingLeft: "8px",
    whiteSpace: "nowrap",
  },

  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#475569",
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  navItemActive: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    fontWeight: "600",
  },

  mainContainer: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: "16px 32px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    boxSizing: "border-box",
    minWidth: 0,
  },

  roleBadge: {
    fontSize: "11px",
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    padding: "2px 6px",
    borderRadius: "4px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    fontSize: "14px",
    minWidth: 0,
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    border: "1px solid #cbd5e1",
    background: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  contentArea: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "32px 16px",
    boxSizing: "border-box",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },

  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    padding: "20px",
    borderRadius: "8px",
    boxSizing: "border-box",
    minWidth: 0,
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    fontSize: "13px",
    color: "#64748b",
  },

  cardValue: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "8px",
  },

  analyticsSection: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "24px",
    boxSizing: "border-box",
    minWidth: 0,
  },

  progressTrack: {
    display: "flex",
    height: "12px",
    borderRadius: "6px",
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
    margin: "12px 0",
    width: "100%",
  },

  progressBar: {
    height: "100%",
    transition: "width 0.3s ease",
  },

  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    fontSize: "12px",
    color: "#64748b",
  },

  dot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "6px",
  },

  tableCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    overflow: "hidden",
    width: "100%",
    boxSizing: "border-box",
  },

  tableControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },

  selectInput: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    maxWidth: "100%",
    boxSizing: "border-box",
  },

  primaryBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  },

  secondaryBtn: {
    backgroundColor: "#f1f5f9",
    color: "#334155",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  table: {
    width: "100%",
    minWidth: "700px",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "14px",
  },

  th: {
    padding: "12px 16px",
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    color: "#64748b",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  tr: {
    borderBottom: "1px solid #f1f5f9",
  },

  td: {
    padding: "12px 16px",
    verticalAlign: "middle",
  },

  actionBtn: {
    border: "1px solid #e2e8f0",
    background: "#fff",
    padding: "6px",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#475569",
    flexShrink: 0,
  },

  upvoteBtn: {
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    padding: "4px 8px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    whiteSpace: "nowrap",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "16px",
    boxSizing: "border-box",
  },

  modal: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "450px",
    maxHeight: "calc(100vh - 32px)",
    overflowY: "auto",
    boxSizing: "border-box",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "16px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    maxWidth: "100%",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "12px",
    flexWrap: "wrap",
  },
};
