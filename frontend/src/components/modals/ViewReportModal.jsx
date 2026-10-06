import React from "react";
import { X, MapPin, Calendar, User } from "lucide-react";

import {
  styles,
  getStatusStyle,
  getPriorityStyle,
} from "../../styles/dashboardStyles";

export default function ViewReportModal({ isOpen, report, onClose, onUpvote }) {
  console.log(report);

  if (!isOpen || !report) return null;

  const formattedDate = report.createdAt
    ? new Date(report.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div
      style={styles.modalOverlay}
      className="modal-overlay view-report-overlay"
      onClick={onClose}
    >
      <div
        style={{
          ...styles.modal,
          maxWidth: "560px",
          width: "90%",
        }}
        className="modal view-report-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="view-report-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "12px",
            gap: "12px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              color: "#111827",
            }}
          >
            Incident Details
          </h3>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="report-image-container"
          style={{
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {report.photoUrl ? (
            <img
              src={report.photoUrl}
              alt={report.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  report.photoUrl ||
                  "https://via.placeholder.com/400x200?text=No+Image";
              }}
              style={{
                width: "100%",
                maxHeight: "180px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
          ) : (
            <div
              style={{
                height: "180px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                fontSize: "14px",
              }}
            >
              No Image Provided
            </div>
          )}
        </div>

        <div style={{ marginBottom: "14px" }}>
          <h4
            style={{
              margin: "0 0 6px 0",
              fontSize: "18px",
              color: "#1f2937",
              overflowWrap: "anywhere",
            }}
          >
            {report.title}
          </h4>

          <p
            style={{
              margin: 0,
              color: "#4b5563",
              fontSize: "14px",
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              overflowWrap: "anywhere",
            }}
          >
            <MapPin size={16} color="#6b7280" style={{ flexShrink: 0 }} />

            {report.address || "No address provided"}
          </p>
        </div>

        <div
          className="report-meta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "10px",
            margin: "16px 0",
            padding: "12px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "1px solid #f3f4f6",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              Status
            </div>

            <span style={getStatusStyle(report.status)}>{report.status}</span>
          </div>

          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              Priority
            </div>

            <span style={getPriorityStyle(report.priority)}>
              {report.priority}
            </span>
          </div>

          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              Assigned To
            </div>

            <strong
              style={{
                fontSize: "13px",
                color: "#1f2937",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "4px",
                overflowWrap: "anywhere",
              }}
            >
              <User size={14} color="#6b7280" />

              {report.assignedTo?.username || report.assignedTo || "Unassigned"}
            </strong>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <strong
            style={{
              fontSize: "14px",
              color: "#374151",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Description
          </strong>

          <p
            style={{
              margin: 0,
              padding: "12px",
              backgroundColor: "#f3f4f6",
              borderRadius: "6px",
              fontSize: "14px",
              color: "#1f2937",
              whiteSpace: "pre-wrap",
              lineHeight: "1.5",
              overflowWrap: "anywhere",
            }}
          >
            {report.description || "No description provided."}
          </p>
        </div>

        <div
          className="view-report-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            paddingTop: "12px",
            borderTop: "1px solid #e5e7eb",
            gap: "12px",
          }}
        >
          <div
            className="reported-date"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#6b7280",
              minWidth: 0,
            }}
          >
            <Calendar size={14} style={{ flexShrink: 0 }} />

            <span
              style={{
                overflowWrap: "anywhere",
              }}
            >
              Reported on: {formattedDate}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <button type="button" onClick={onClose} style={styles.primaryBtn}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
