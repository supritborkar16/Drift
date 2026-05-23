import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { AppShell } from "@/layouts/AppShell";

import { ArchivePage } from "@/pages/ArchivePage";
import { BinPage } from "@/pages/BinPage";
import { DashboardPage } from "@/pages/DashboardPage";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import { ProfilePage } from "@/pages/ProfilePage";
import { SettingsPage } from "@/pages/SettingsPage";

export function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route
            index
            element={<DashboardPage />}
          />

          <Route
            path="ideas"
            element={
              <DashboardPage activeCategory="idea" />
            }
          />

          <Route
            path="problems"
            element={
              <DashboardPage activeCategory="problem" />
            }
          />

          <Route
            path="tasks"
            element={
              <DashboardPage activeCategory="task" />
            }
          />

          <Route
            path="research"
            element={
              <DashboardPage activeCategory="research" />
            }
          />

          <Route
            path="archive"
            element={<ArchivePage />}
          />

          <Route
            path="bin"
            element={<BinPage />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
