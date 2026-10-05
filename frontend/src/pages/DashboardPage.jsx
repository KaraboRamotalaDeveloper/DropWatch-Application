import React, { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../api/axios";
import StatsOverview from "../components/stats/StatsOverview";
import AnalyticsBar from "../components/stats/AnalyticsBar";

export default function DashboardPage() {
  const { role } = useOutletContext();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/reports/fetchreports");
        setReports(res.data.reports || []);
        console.log("Fetched reports:", res.data.reports);
      } catch (err) {
        console.error("Error loading metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = useMemo(() => {
    return {
      total: reports.length,
      reported: reports.filter((r) => r.status === "REPORTED").length,
      inProgress: reports.filter((r) =>
        ["ASSIGNED", "IN_PROGRESS"].includes(r.status),
      ).length,
      fixed: reports.filter((r) => r.status === "FIXED").length,
      critical: reports.filter((r) => r.priority === "CRITICAL").length,
    };
  }, [reports]);

  if (loading) return <div>Loading statistics overview...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>{role}</h2>
      <StatsOverview stats={stats} />
      <AnalyticsBar stats={stats} />
    </div>
  );
}
