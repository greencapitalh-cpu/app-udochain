import { Outlet } from "react-router-dom";
import DashboardHeader from "../ui/DashboardHeader";
import Footer from "../ui/Footer";
import { AuthProvider } from "../context/AuthContext";

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container-narrow py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
