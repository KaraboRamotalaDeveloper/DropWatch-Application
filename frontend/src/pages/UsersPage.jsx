import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { styles } from "../styles/dashboardStyles";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>User Directory</h2>
      <div style={styles.tableCard}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            Loading users...
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{u.username}</strong>
                  </td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>
                    <span style={styles.roleBadge}>{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
