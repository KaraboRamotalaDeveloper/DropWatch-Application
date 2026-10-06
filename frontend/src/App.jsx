// App.jsx
import React from "react";
import "./Responsiveness.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from "./components/auth/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useAuth();
  const normalizedRole = user?.role?.toUpperCase() || "CITIZEN";

  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Routes */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />

          <Route
            path="/users"
            element={
              normalizedRole === "ADMIN" ? (
                <UsersPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
