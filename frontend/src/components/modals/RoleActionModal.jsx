import React from "react";
import { styles } from "../../styles/dashboardStyles";

export default function RoleActionModal({
  selectedReport,
  actionType,
  formData,
  setFormData,
  workers,
  onClose,
  onSubmit,
}) {
  if (!selectedReport || !actionType) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h3>
          {actionType === "ASSIGN" && "Assign Field Worker"}
          {actionType === "UPDATE_STATUS" && "Update Issue Status"}
          {actionType === "EDIT" && "Edit Report Details"}
        </h3>
        <form onSubmit={onSubmit} style={styles.form}>
          {actionType === "ASSIGN" && (
            <select
              value={formData.assignedTo}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  assignedTo: e.target.value,
                  status: "ASSIGNED", // Automatically set status to ASSIGNED when assigning a worker
                });
              }}
              style={styles.input}
              required
            >
              <option value="">-- Select Worker --</option>
              {workers
                .filter((w) => w.role?.toUpperCase() === "WORKER")
                .map((w) => (
                  <option key={w._id} value={w._id}>
                    {w.username} - ({w.email})
                  </option>
                ))}
            </select>
          )}

          {actionType === "UPDATE_STATUS" && (
            <>
              <label style={{ fontSize: "12px", color: "#374151" }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => {
                  if (e.target.value !== "REPORTED" && !formData.assignedTo) {
                    alert(
                      `Please assign a worker before setting status to ${e.target.value}`,
                    );
                  } else {
                    setFormData({ ...formData, status: e.target.value });
                  }
                }}
                style={styles.input}
              >
                <option value="REPORTED">REPORTED</option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="FIXED">FIXED</option>
              </select>

              <label style={{ fontSize: "12px", color: "#374151" }}>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                style={styles.input}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </>
          )}

          {actionType === "EDIT" && (
            <>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                style={styles.input}
              />
              <input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                style={styles.input}
              />
              <input
                value={formData.photoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, photoUrl: e.target.value })
                }
                style={styles.input}
              />
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={{ ...styles.input, minHeight: "80px" }}
              />
            </>
          )}

          <div style={styles.modalActions}>
            <button type="button" onClick={onClose} style={styles.secondaryBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.primaryBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
