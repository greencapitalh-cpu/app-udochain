// [12] src/shared/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { AuthProvider, useAuth } from "../context/AuthContext";

function Gate() {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="animate-pulse text-udo-steel">Loading…</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-narrow py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
