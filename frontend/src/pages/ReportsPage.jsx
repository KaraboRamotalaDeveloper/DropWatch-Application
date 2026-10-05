import React, { useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../api/axios";
import ReportsTable from "../components/reports/ReportsTable";
import CreateReportModal from "../components/modals/CreateReportModal";
import RoleActionModal from "../components/modals/RoleActionModal";
import ViewReportModal from "../components/modals/ViewReportModal";

export default function ReportsPage() {
  const { role } = useOutletContext();
  const [reports, setReports] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionType, setActionType] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photoUrl: "",
    address: "",
    status: "",
    priority: "",
    assignedTo: "",
    upVotes: 0, // Added upVotes to formData for consistency
  });

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    setLoading(true);
    try {
      const reportsRes = await api.get("/reports/fetchreports");

      setReports(reportsRes.data.reports || []);

      if (role === "ADMIN") {
        const workersRes = await api.get("/users?role=WORKER");
        setWorkers(workersRes.data.users || []);
      }
    } catch (err) {
      console.error("Reports loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = useMemo(() => {
    if (filterStatus === "ALL") return reports;
    return reports.filter((r) => r.status === filterStatus);
  }, [reports, filterStatus]);

  // 1. Updated for File Uploads (multipart/form-data)
  // CORRECT
  const handleCreateSubmit = async (payload) => {
    console.log("Payload received in handleCreateSubmit:", payload);
    for (let [key, value] of payload.entries()) {
      console.log(`${key}:`, value);
    } // Debugging line to check the file in FormData
    try {
      const response = await api.post("/reports/logreport", payload); // Axios sets header & boundary automatically
      setShowCreateModal(false);
      await fetchReportsData();
      console.log("Report created successfully:", response.data);
      return true; // Indicate success to the caller
    } catch (err) {
      console.log("Full Error Object:", err);
      console.log("Response Data:", err.response?.data);
      console.log("Response Status:", err.response?.status);
      console.error("===== REPORT ERROR =====");
      console.error("Message:", err.message);
      console.error("Name:", err.name);
      console.error("Stack:", err.stack);
      console.error("Full error:", err);
      console.error("========================");
      alert(err.response?.data?.message || "Failed to create report");
    }
  };

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedReport) return;

    try {
      let payload = {};
      if (actionType === "ASSIGN")
        payload = { assignedTo: formData.assignedTo };
      if (actionType === "UPDATE_STATUS")
        payload = { status: formData.status, priority: formData.priority };
      if (actionType === "EDIT") {
        payload = {
          title: formData.title,
          description: formData.description,
          photoUrl: formData.photoUrl,
          address: formData.address,
        };
      }
      console.log("Payload for action submit:", payload);
      console.log("Selected Report ID:", selectedReport._id);
      await api.patch(`/reports/updatereport/${selectedReport._id}`, payload);
      closeActionModal();
      fetchReportsData();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleUpvote = async (reportId) => {
    try {
      console.log("Upvoting report with ID:", reportId);
      await api.patch(`/reports/updatereport/${reportId}`);
      fetchReportsData();
    } catch (err) {
      console.log("Upvote error:", err);
      console.log("Response Data:", err.response?.data);
      console.log("Response Status:", err.response?.status);
      alert(err.response?.data?.message || "Failed to upvote report");
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await api.delete(`/reports/delreport/${reportId}/`);
      fetchReportsData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete report");
    }
  };

  const openActionModal = (report, type) => {
    setSelectedReport(report);
    setActionType(type);
    setFormData({
      title: report.title || "",
      description: report.description || "",
      photoUrl: report.photoUrl || "",
      address: report.address || "",
      status: report.status || "REPORTED",
      priority: report.priority || "MEDIUM",
      assignedTo: report.assignedTo?._id || report.assignedTo || "",
    });
  };

  const closeActionModal = () => {
    setSelectedReport(null);
    setActionType(null);
  };

  // 2. Activated view handler for row clicks
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setViewModalOpen(true);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Reports Management</h2>
      <ReportsTable
        reports={filteredReports}
        loading={loading}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        role={role}
        onOpenCreate={() => setShowCreateModal(true)}
        onViewReport={handleViewReport} // Active handler for row click
        onOpenAction={openActionModal}
        onUpvote={handleUpvote}
        onDelete={handleDelete}
      />

      <CreateReportModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSubmit}
      />

      <RoleActionModal
        selectedReport={selectedReport}
        actionType={actionType}
        formData={formData}
        setFormData={setFormData}
        workers={workers}
        role={role}
        onClose={closeActionModal}
        onSubmit={handleActionSubmit}
      />

      <ViewReportModal
        isOpen={viewModalOpen}
        report={selectedReport}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedReport(null);
        }}
        onUpvote={handleUpvote}
      />
    </div>
  );
}
