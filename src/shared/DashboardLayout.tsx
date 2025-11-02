import { Outlet } from "react-router-dom";
import DashboardHeader from "../ui/DashboardHeader";
import Footer from "../ui/Footer";
import { AuthProvider } from "../context/AuthContext";

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-white text-udo-ink">
        {/* 🔹 Header responsive exclusivo del dashboard */}
        <DashboardHeader />

        {/* 🔹 Contenido central */}
        <main className="flex-1 container-narrow px-4 py-8">
          <Outlet />
        </main>

        {/* 🔹 Footer opcional */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
