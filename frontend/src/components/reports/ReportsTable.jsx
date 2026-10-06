import React from "react";
import {
  Filter,
  PlusCircle,
  UserCheck,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";
import {
  styles,
  getStatusStyle,
  getPriorityStyle,
} from "../../styles/dashboardStyles";
import { useAuth } from "../../context/AuthContext";

export default function ReportsTable({
  reports = [],
  loading,
  filterStatus,
  setFilterStatus,
  onOpenCreate,
  onOpenAction,
  onViewReport,
  onDelete,
}) {
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();

  return (
    <div style={styles.tableCard} className="table-card">
      <div style={styles.tableControls} className="table-controls">
        <div
          className="table-filter"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Filter size={18} color="#6b7280" />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.selectInput}
          >
            <option value="ALL">All Statuses</option>
            <option value="REPORTED">REPORTED</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="FIXED">FIXED</option>
          </select>
        </div>

        {role === "CITIZIEN" && (
          <button
            onClick={onOpenCreate}
            style={styles.primaryBtn}
            className="primary-btn"
          >
            <PlusCircle size={18} />
            New Issue Report
          </button>
        )}
      </div>

      {loading ? (
        <div
          className="table-message"
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Loading dashboard records...
        </div>
      ) : reports.length === 0 ? (
        <div
          className="table-message"
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          No incident reports found.
        </div>
      ) : (
        <div
          className="table-scroll"
          style={{
            overflowX: "auto",
            width: "100%",
          }}
        >
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Issue</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Assigned To</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr
                  key={report._id}
                  style={{
                    ...styles.tr,
                    cursor: "pointer",
                  }}
                  onClick={() => onViewReport(report)}
                >
                  <td style={styles.td}>
                    <strong>{report.title}</strong>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      {report.description?.slice(0, 40) || ""}
                      ...
                    </div>
                  </td>

                  <td style={styles.td}>{report.address}</td>

                  <td style={styles.td}>
                    <span style={getPriorityStyle(report.priority)}>
                      {report.priority}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span style={getStatusStyle(report.status)}>
                      {report.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {report.assignedTo?.username ||
                      report.assignedTo ||
                      "Unassigned"}
                  </td>

                  <td style={styles.td}>
                    <div
                      className="action-buttons"
                      style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "nowrap",
                      }}
                    >
                      <button
                        title="View Details"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewReport(report);
                        }}
                        style={styles.actionBtn}
                      >
                        <Eye size={16} />
                      </button>

                      {role === "ADMIN" && (
                        <button
                          title="Assign Worker"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAction(report, "ASSIGN");
                          }}
                          style={styles.actionBtn}
                        >
                          <UserCheck size={16} />
                        </button>
                      )}

                      {(role === "WORKER" || role === "ADMIN") && (
                        <button
                          title="Update Status"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAction(report, "UPDATE_STATUS");
                          }}
                          style={styles.actionBtn}
                        >
                          <Edit3 size={16} />
                        </button>
                      )}

                      {role === "CITIZIEN" && (
                        <>
                          <button
                            title="Edit Report"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenAction(report, "EDIT");
                            }}
                            style={styles.actionBtn}
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            title="Delete Report"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(report._id);
                            }}
                            style={{
                              ...styles.actionBtn,
                              color: "#dc2626",
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
