// src/shared/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import DashboardHeader from "../ui/DashboardHeader";
import Footer from "../ui/Footer";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-udo-ink">
      {/* 🔹 Header exclusivo del dashboard */}
      <DashboardHeader />

      {/* 🔹 Contenido central */}
      <main className="flex-1 container-narrow px-4 py-8">
        <Outlet />
      </main>

      {/* 🔹 Footer opcional */}
      <Footer />
    </div>
  );
}
