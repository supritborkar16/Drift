import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/layouts/AppShell";
import { ArchivePage } from "@/pages/ArchivePage";
import { BinPage } from "@/pages/BinPage";
import { DashboardPage } from "@/pages/DashboardPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="ideas" element={<DashboardPage activeCategory="idea" />} />
        <Route path="problems" element={<DashboardPage activeCategory="problem" />} />
        <Route path="tasks" element={<DashboardPage activeCategory="task" />} />
        <Route path="research" element={<DashboardPage activeCategory="research" />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="bin" element={<BinPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
